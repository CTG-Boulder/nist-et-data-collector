import express from 'express'
import logger from '~/services/logger'
import pinoHttp from 'pino-http'
// const secrets = require('@/secrets')
import upload from '~/routes/upload.js'

// Constants
const PORT = 8000
const HOST = '0.0.0.0'

// App
const app = express()
app.use(pinoHttp({ logger }))
app.use('/upload', upload)
app.get('/', (req, res, next) => {
  res.send(`
  <html>
    <body>
      <form ref='uploadForm'
        id='uploadForm'
        action='http://localhost:8000/upload'
        method='post'
        encType="multipart/form-data">
          <input type="file" name="dataFile" />
          <input type='submit' value='Upload!' />
      </form>
      <button id="tester">Send Test File</button>
      <script>
      document.getElementById('tester').addEventListener('click', function(e){
        e.preventDefault()
        var formData = new FormData()
        var blob = new Blob(['hello world'], { type: "text/plain"})
        formData.append('dataFile', blob, "test.txt")
        fetch("http://localhost:8000/upload", { method: "POST", body: formData })
      })
      </script>
    </body>
  </html>
  `)
})
app.listen(PORT, HOST)
logger.info(`Running on http://${HOST}:${PORT}`)
