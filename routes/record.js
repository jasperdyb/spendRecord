const express = require('express')
const router = express.Router()

router.get('/new', (req, res, next) => {
  res.render('new')
})

router.post('/new', (req, res, next) => {
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