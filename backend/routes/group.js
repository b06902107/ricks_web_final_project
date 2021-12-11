import express from 'express'
const route = express.Router()
import Class from '../models/class'
import Group from '../models/group'
import Student from '../models/student'
route.post('/new', async function(req, res){
  let data = req.body
  const essential_key = ['className','user']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    const student = await Student.findOne({email: data.user})
    let newGroup = await Group.create({
      member: [student]
    })
    student.groups.push({
      name: data.className,
      group: newGroup
    })
    await student.save()
    Class.findOne({name: data.className}).then(async (result) => {
      result.groups.push(newGroup)
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

route.post('/join', async function(req, res){
  let data = req.body
  const essential_key = ['className','groupId', 'user']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    let student = await Student.findOne({email: data.user})


    Group.findOne({_id: data.groupId}).then(async (result) => {
      result.member.push(student)
      await result.save()
      student.groups.push({
        name: data.className,
        group: result
      })
      await student.save()
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

route.post('/all', async function(req, res){
  let data = req.body
  const essential_key = ['className']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }

  Class.findOne({name: data.className}).then( async (result) => {
    let ret = []
    await Promise.all(result.groups.map(async (id) => {
      const group = await Group.findOne({_id: id})
      console.log(group)
      let allmember = []
      await Promise.all(group.member.map(async (mem) => {
        const temp = await Student.findOne({_id: mem})
        allmember.push({
          name: temp.username,
          email: temp.email,
          score: temp.score,
          department: temp.department,
          grade: temp.grade
        })
      }))
      ret.push({id: id,member: allmember})
    }))
    res.send({
      success: true,
      error: null,
      data: ret
    })
  }).catch((err) => {
    res.send({
      success: false,
      error: err
    })
  })
})

route.post('/info', async function(req, res){
  let data = req.body
  const essential_key = ['groupId']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    const g = await Group.findOne({_id: data.groupId})
    let ret = []
    await Promise.all(g.member.map(async (item) => {
      const s = await Student.findOne({_id: item})
      ret.push({
        username: s.username,
        grade: s.grade,
        department: s.department,
        score: s.score,
        email: s.email
      })
    }))
    res.send({
      success: true,
      error: null,
      data: ret
    })
  }catch(err){
    res.send({
      success: false,
      error: err
    })
  }

})
module.exports = route