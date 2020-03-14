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
  Record.findById({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err)
      console.log(record)
      return res.render('edit', { record }) // 利用new頁面編輯資訊
    })
})

router.put('/:id', (req, res, next) => {
  Record.findById({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)

    for (var key in req.body) {
      record[key] = req.body[key]
    }
    console.log(record)
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/`)
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Record.findById({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router