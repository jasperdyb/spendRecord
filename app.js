const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = 3000

//Database connection
mongoose.connect('mongodb://localhost/record', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//middleware
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use('/', require('./routes/home.js'))
app.use('/record', require('./routes/record.js'))


app.listen(port)