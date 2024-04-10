import express from "express"

const app = express()
const port = 3002

app.use(express.json())

app.get('/idv-html-form', (req, res) => {
  res.status(200).send('GET request to the /idv-html-form endpoint')
})

app.post('/idv-form-data', (req, res) => {
  const requestBody = req.body
  console.log(requestBody)

  res.status(201).send('POST request to the /idv-form-data endpoint with body: ' + JSON.stringify(requestBody))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
