import express from "express"
import {DidDht} from "@web5/dids"
import fs from "fs"
import crypto from "crypto"
import {Jwt} from '@web5/credentials'

const app = express()
const PORT = 3001

const bearerDid = await DidDht.import({portableDid: JSON.parse(fs.readFileSync("./portable-did.json"))})

app.use(express.json())

app.get('/idv', (_, res) => {
  const siopv2AuthRequest = {
    client_id: bearerDid.uri,
    response_type: 'id_token', // NOTE: we don't support vp_token in this proto-exemplar
    nonce: crypto.randomBytes(16).toString('hex'),
    scope: 'openid',
    response_mode: 'direct_post',
    response_uri: `http://localhost:${PORT}/idv`
  }

  res.status(200).json(siopv2AuthRequest)
})

app.post('/idv', async (req, res) => {
  const requestBody = req.body

  const {payload} = await Jwt.verify({ jwt: requestBody.id_token })
  if (!payload.nonce) {
    // todo implement your nonce verification logic
    console.error('Nonce invalid')
    res.status(403).end()
    return
  }

  const credentialOffer = {
    credential_issuer: `http://localhost:${PORT}/credentials`,
    credential_configuration_ids: ['KnownCustomerCredential'],
    grants: {
      'urn:ietf:params:oauth:grant-type:pre-authorized_code': {
        'pre-authorized_code': crypto.randomBytes(16).toString('hex')
      }
    }
  }

  /** TODO at this point we may prepare the IDV vendor for a submission, depending on the IDV integration requirements */

  const idvRequest = {
    credential_offer: credentialOffer,
    url: 'http://localhost:3002/idv-html-form' // the url for the idv-vendor/ project
  }
  res.status(201).json(idvRequest)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
