const express = require('express')
const router = express.Router()

const { Spectacle } = require('../models/spectacle')
const { auth } = require('../middleware/auth')

//for images
const formidable = require('express-formidable')
const cloudinary = require('cloudinary')
const multer = require('multer')
require('dotenv').config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

router
  .route('/spectacle')
  .get((req, res) => {
    let id = req.query.id

    Spectacle.find({ _id: id })
      .populate('createdBy', 'name')
      .exec((err, doc) => {
        if (err) return res.status(400).send(err)
        res.send(...doc)
      })
  })
  .post(auth, (req, res) => {
    const spectacle = new Spectacle({
      ...req.body,
      createdBy: req.user._id,
    })
    spectacle.save((err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({
        post: true,
        spectacleId: doc._id,
      })
    })
  })
  .patch(auth, (req, res) => {
    Spectacle.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err)
        res.json({
          success: true,
          doc,
        })
      }
    )
  })
  .delete(auth, (req, res) => {
    let id = req.query.id

    Spectacle.findByIdAndRemove(id, (err, doc) => {
      if (err) return res.status(400).send(err)
      res.json(true)
    })
  })

//all spectacles

router.route('/all_spectacles').get((req, res) => {
  let order = req.query.order ? req.query.order : 1

  Spectacle.find()
    .sort({ date: order })
    .sort({ time: order })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      res.send(doc)
    })
})

//images

router.route('/uploadimage').post(auth, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      console.log(result)
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      })
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    }
  )
})

router.route('/removeimage').get(auth, (req, res) => {
  let image_id = req.query.public_id

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error })
    res.status(200).send('OK')
  })
})

module.exports = router
