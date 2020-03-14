const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const { authenticated } = require('./config/auth')


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

// Session設定
app.use(session({
  secret: 'the special key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

//middleware
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()

  next()
})


//routes
app.use('/', require('./routes/home.js'))
app.use('/record', authenticated, require('./routes/record.js'))
app.use('/users', require('./routes/user.js'))


app.listen(port)