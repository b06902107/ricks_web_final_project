const express = require('express');
const route = express.Router();
import College from '../models/college'
import Student from '../models/student'
import Class from '../models/class'
import Department from '../models/department'
import Group from '../models/group'
route.post('/new', async function(req, res){
  let data = req.body
  const essential_key = ['college','department','name','email']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    const user = await Student.findOne({email: data.email})
    const result = await College.findOne({name: data.college})
    let newGroup = await Group.create({member: [user]})
    user.groups.push({
      name: data.name,
      group: newGroup
    })
    await user.save()
    let newClass = await Class.create({name: data.name, groups: [newGroup]})
    if(!result){
      let newDep = await Department.create({name: data.department, classes: [newClass]})
      await College.create({name: data.college, departments: [newDep]})
    }
    else{
      let dep = await Department.findOne({name: data.department})
      if(!dep){
        let newDep = await Department.create({name: data.department, classes: [newClass]})
        result.departments.push(newDep)
        await result.save()
      }
      else{
        console.log(dep)
        dep.classes.push(newClass)
        await dep.save()
      }
    }
    res.send({
      success: true,
      error: null
    })
  }catch(err){
    res.send({
      success: false,
      error: err
    })
  }
  
  
})

route.get('/all', async function(req, res){
  try{
    let college = await College.find()
    let ret = []
    await Promise.all(college.map(async (col) => {
      let college_ret = {name: col.name}
      let top5 = []
      await Promise.all(col.departments.map( async (dep) => {
        dep = await Department.findOne({_id: dep})
        await Promise.all(dep.classes.map( async (cl) => {
          cl = await Class.findOne({_id: cl})
          top5.push({department: dep.name, className: cl.name, groupNum: cl.groups.length})
        }))
      }))
      top5 = top5.sort((a, b) => {
        return b.groupNum - a.groupNum
      })
      top5 = top5.slice(0,5)
      college_ret.hotClass = top5
      ret.push(college_ret)
    }))
    res.send({
      success: true,
      error: null,
      data: ret
    })
  }catch(err){
    console.log(err)
    res.send({
      success: false,
      error: err
    })
  }
  
})
route.post('/college', async function(req, res){
  let data = req.body
  console.log(data)
  if(!data.hasOwnProperty('college')){
    res.send({
      success: false,
      error: 'missing essential key'
    })
  }
  let classes = []
  College.findOne({name: data.college}).then(async (ret) => {
    await Promise.all(ret.departments.map(async (dep) => {
      dep = await Department.findOne({_id: dep})
      await Promise.all(dep.classes.map(async (cl) => {
        cl = await Class.findOne({_id: cl})
        classes.push({depmartment: dep.name, className: cl.name, groupNum: cl.groups.length})
      }))
    }))
    classes = classes.sort((a, b) => {
      return b.groupNum - a.groupNum
    })
    res.send({
      success: true,
      error: null,
      data: classes
    })
  }).catch((err) => {
    res.send({
      success: false,
      error: err
    })
  }) 

})

route.post('/chosen', async function(req, res){
  let data = req.body
  const essential_key = ['email']
  for(const key of essential_key){
    if(!data.hasOwnProperty(key)){
      res.send({
        success: false,
        error: 'missing essential key'
      })
    }
  }
  try{
    const user = await Student.findOne({email: data.email})
    let ret = []
    await Promise.all(user.groups.map( async (item) => {
      const g = await Group.findOne({_id: item.group})
      let mems = []
      await Promise.all(g.member.map(async (mem) => {
        const s = await Student.findOne({_id: mem})
        mems.push({
          username: s.username,
        })
      }))
      ret.push({
        name: item.name,
        id: item.group,
        member: mems
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
module.exports = route;