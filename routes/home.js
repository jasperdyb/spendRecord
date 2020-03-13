const express = require('express')
const router = express.Router()
const Record = require("../models/record.js")

router.get('/', (req, res, next) => {
  let category = 'default'
  let method = {}

  if (req.query.category) {
    console.log(req.query)
    category = req.query.category
  }

  if (category != 'default') {
    method = { category: category }
    console.log(category, method)
  }


  Record.find(method)
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err)

      let totalAmount = 0

      for (var i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      // console.log(records)
      //TODO Add message to note there's no record in the account or category
      return res.render('index', { records, totalAmount, category }) // 將資料傳給 index 樣板
    })
})

module.exports = router