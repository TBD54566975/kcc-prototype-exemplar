import {Jwt} from '@web5/credentials'
import {DidDht} from '@web5/dids'
import fs from 'fs'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

const bearerDid = await DidDht.import({portableDid: JSON.parse(fs.readFileSync("./portable-did.json"))})
const argv = yargs(hideBin(process.argv)).argv

if (!argv._[0]) {
  console.log("Usage: node 3-submit-siopv2-respomse.js <siopv2Request as a JSON string>")
  process.exit(1)
}

const siopv2Request = JSON.parse(argv._[0])

// build the SIOPv2 Auth Response
const siopv2Response = {
  id_token: await Jwt.sign({
    signerDid: bearerDid,
    payload: {
      iss: bearerDid.uri,
      sub: bearerDid.uri,
      aud: siopv2Request.client_id,
      nonce: siopv2Request.nonce,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (30 * 60), // plus 30 minutes
    }
  })
}

const res = await fetch(siopv2Request.response_uri, {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(siopv2Response)
})
const body = await res.json()
if (argv.noindent) console.log(JSON.stringify(body))
else console.log(JSON.stringify(body, null, 2))
