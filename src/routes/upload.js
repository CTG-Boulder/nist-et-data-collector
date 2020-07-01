import config from '~/config'
import Router from 'express-promise-router'
// import fileUpload from 'express-fileupload'
import moment from 'moment'
import fs from 'fs'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

const route = new Router()

// this must be first
route.use(cors(), bodyParser.json())

route.get('/', (req, res, next) => {
  res.json({ test: 'hello' })
})

route.post('/', (req, res, next) => {
  if (!req.body.csv){
    res.status(400).send({
      error: {
        message: 'No csv data provided'
      }
    })
    return
  }

  if (!req.body.name){
    res.status(400).send({
      error: {
        message: 'No name specified'
      }
    })
    return
  }

  const deviceName = req.body.name.trim()
  const filename = deviceName + moment().format('YYYY-MM-DDTHH-mm-ss') + '.csv'
  const file = path.join(config.fileUploadDirectory, filename)

  if ( fs.existsSync(file) ){
    res.status(400).send({
      error: {
        message: 'File already exists'
      }
    })
    return
  }

  fs.writeFile(file, req.body.csv, err => {
    if (err){
      res.status(500).send({
        error: {
          message: 'Could not write file'
        }
      })
      return
    }

    res.json({ ok: true })
  })
})

// route.post('/', (req, res, next) => {
//   console.log(req.headers, req.body)
//   if (!req.files || Object.keys(req.files).length === 0) {
//     res.status(400).send({
//       error: {
//         message: 'No files were uploaded.'
//       }
//     })
//     return
//   }

//   const dataFile = req.files.dataFile
//   const filename = dataFile.name

//   // Use the mv() method to place the file somewhere on your server
//   dataFile.mv(path.join(config.fileUploadDirectory, filename), (err) => {
//     if (err){
//       res.status(500).send({
//         error: {
//           message: err.message
//         }
//       })
//       return
//     }

//     res.json({ ok: true })
//   })
// })

route.use((err, req, res, next) => {
  res.status(500).send({
    error: {
      message: err.message
    }
  })
})

export default route
