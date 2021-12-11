import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teacherSchema = Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
},{
  collection: 'Teacher'
})

const exportSchema = mongoose.model('Teacher', teacherSchema)

export default exportSchema