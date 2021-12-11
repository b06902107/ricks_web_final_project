import express from 'express'
const route = express.Router()
import Student from '../models/student'

route.post('/student', async function(req, res){
  let data = req.body
  const essential_key = ['email','password']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }

  const user = await Student.findOne({email: data.email})
  if(!user){
    res.send({
      success: false,
      error: 'no such user'
    })
  }
  if(user.password !== data.password){
    res.send({
      success: false,
      error: 'password incorrect'
    })
  }

  res.send({
    success: true,
    error: null,
    data: {
      username: user.username, 
      department: user.department, 
      grade: user.grade,
      score: user.score, 
      email: user.email}
  })

})

route.post('/register', async function(req, res){
  let data = req.body
  const essential_key = ['username','department','grade','email','password']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  console.log(data)
  data.score = [5]
  Student.create(data).then((user) => {
    console.log(user)
    res.send({
      success: true,
      error: null,
      data: {
        username: user.username, 
        department: user.department, 
        grade: user.grade,
        score: user.score, 
        email: user.email
      }
    })
  }).catch((err) => {
    console.log(err)
    res.send({
      success: false,
      error: err
    })
  })
})

module.exports = route