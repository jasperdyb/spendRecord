const express = require('express')
const router = express.Router()
const Record = require("../models/record.js")

router.get('/new', (req, res, next) => {
  res.render('new')
})

router.post('/new', (req, res, next) => {
  console.log(req.body)
  const record = new Record(req.body)

  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')// 新增完成後，將使用者導回首頁
  })
})

router.get('/:id/edit', (req, res, next) => {
  _id = req.params.id
  res.render('edit', { _id })
})

router.post('/:id/edit', (req, res, next) => {
})

router.post('/:id/delete', (req, res, next) => {
})

module.exports = router