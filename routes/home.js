const express = require('express')
const router = express.Router()
const Record = require("../models/record.js")
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, next) => {
  let category = 'default'
  let method = { userId: req.user._id }

  if (req.query.category) {
    category = req.query.category
  }

  if (category != 'default') {
    method = { category: category, userId: req.user._id }
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
      return res.render('index', { records, totalAmount, category }) // 將資料傳給 index 樣板
    })
})

module.exports = router