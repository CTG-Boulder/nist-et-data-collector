import config from '~/config'
import Router from 'express-promise-router'
import fileUpload from 'express-fileupload'
import path from 'path'

const route = new Router()

// this must be first
route.use(fileUpload())

route.post('/', (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({
      error: {
        message: 'No files were uploaded.'
      }
    })
    return
  }

  const dataFile = req.files.dataFile
  const filename = dataFile.name

  // Use the mv() method to place the file somewhere on your server
  dataFile.mv(path.join(config.fileUploadDirectory, filename), (err) => {
    if (err){
      res.status(500).send({
        error: {
          message: err.message
        }
      })
      return
    }

    res.json({ ok: true })
  })
})

export default route
