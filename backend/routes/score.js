import express from 'express'
const route = express.Router()
import Student from '../models/student'

route.post('/add', async function(req, res){
  let data = req.body
  const essential_key = ['user','score']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    Student.findOne({email: data.user}).then(async (result) => {
      result.score.push(Number(data.score))
      await result.save()
      res.send({
        success: true, 
        error: null
      })
    })
  }catch(err){
    res.send({
      success: false,
      error: err
    })
  }
  
})
module.exports = route