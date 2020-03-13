const express = require('express')
const router = express.Router()
const Record = require("../models/record.js")

router.get('/', (req, res, next) => {
  Record.find()
    .lean()
    .exec((err, records) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)

      let totalAmount = 0

      for (var i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }

      return res.render('index', { records, totalAmount }) // 將資料傳給 index 樣板
    })
})

module.exports = router