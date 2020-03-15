const mongoose = require('mongoose')
const Records = require('../record.js')
const User = require('../user.js')
const recordList = require('./record.json')
const userList = require('./user.json')
const bcrypt = require('bcryptjs')

//Database connection
mongoose.connect('mongodb://localhost/record', {
  useNewUrlParser: true,
  useCreateIndex: true
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

  const record = recordList.results
  const user = userList.results

  for (let i = 0; i < user.length; i++) {
    let { name, email, password } = user[i]
    console.log(user[i])

    User.findOne({ email: email }).then(user => {
      if (user) {                                       // 檢查 email 是否存在
        console.log('user already exist!')
      } else {
        let newUser = new User({    // 如果 email 不存在就直接新增
          name,
          email,
          password
        })

        //密碼雜湊
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash

            newUser
              .save()
              .catch(err => console.log(err))

            console.log('User added!')
          })
        )
      }
    })
  }

  User.findOne({ email: 'user1@example.com' })
    .lean()
    .exec((err, user) => {
      for (var i = 0; i < 4; i++) {
        record[i].userId = user._id
        Records.create(record[i])
      }
    })

  User.findOne({ email: 'user2@example.com' })
    .lean()
    .exec((err, user) => {
      for (var i = 4; i < 8; i++) {
        record[i].userId = user._id
        Records.create(record[i])
      }
    })

  console.log('done')
})