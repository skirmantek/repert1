const express = require('express')
const router = express.Router()

const { User } = require('../models/user')

const { auth } = require('../middleware/auth')

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) return res.json({ success: false })
    res.status(200).json({
      success: true,
      user: doc,
    })
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        auth: false,
        message: 'Auth failed, email not found',
        userData: false,
      })

    user.comparePass(req.body.password, (err, matched) => {
      if (!matched)
        return res.json({
          auth: false,
          message: 'Wrong password',
          userData: false,
        })

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie('auth', user.token).json({
          auth: true,
          userData: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        })
      })
    })
  })
})

router.get('/auth', auth, (req, res) => {
  res.json({
    auth: true,
    userData: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    },
  })
})

router.get('/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err)
    res.status(200).send('Logged out')
  })
})

module.exports = router
