const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express()

const user = require('./routes/user')
const spectacles = require('./routes/spectacle')

mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

//middleware

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', user)
app.use('/api/spectacles', spectacles)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('server running')
})
