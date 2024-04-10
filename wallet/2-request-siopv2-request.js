import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv
const idvEndpoint = argv._[0]

if (!idvEndpoint) {
  console.log("Usage: node 2-request-siopv2-request.js <idvEndpoint>")
  process.exit(1)
}

const res = await fetch(idvEndpoint)
const body = await res.json()
if (argv.noindent) console.log(JSON.stringify(body))
else console.log(JSON.stringify(body, null, 2))
