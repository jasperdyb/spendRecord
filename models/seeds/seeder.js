const mongoose = require('mongoose')
const Record = require('../record.js')
const recordList = require('./record.json')

//Database connection
mongoose.connect('mongodb://localhost/record', {
  useNewUrlParser: true,
  useCreateIndex: true,
  // useUnifiedTopology: true
})
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('Database connection error!')
})

// 連線成功
db.once('open', () => {
  console.log('Database connected!')

  for (let i = 0; i < recordList.results.length; i++) {
    console.log(recordList.results[i])
    Record.create(recordList.results[i])
  }
  console.log('done')
})