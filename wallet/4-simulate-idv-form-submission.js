// this script simulates the user going to the HTML form page and submitting their PIIimport {Jwt} from '@web5/credentials'

const idvFormURL = process.argv[2]

await fetch(idvFormURL, {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify({
    firstName: 'Joe',
    lastName: 'Shmoe',
    veryPrivateDataBeCareful: 'tractor123'
  })
})
