import {DidDht} from '@web5/dids'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv
const didUri = argv._[0]

if (!didUri) {
  console.log("Usage: node 1-resolve-idv-service-endpoint.js <didUri>")
  process.exit(1)
}

const resolution = await DidDht.resolve(didUri)
if (resolution.didResolutionMetadata.error) {
  console.error(`Resolution failed ${JSON.stringify(resolution.didResolutionMetadata, null, 2)}`)
  process.exit(1)
}

const idvService = resolution.didDocument.service.find(x => x.type === "IDV")
console.log(idvService.serviceEndpoint)
