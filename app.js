const express = require('express')
const app = express()


const port = 3000

//middleware
app.set('view engine', 'pug')
app.use(express.static('public'))

//routes
app.use('/', require('./routes/home.js'))
app.use('/record', require('./routes/record.js'))


app.listen(port)