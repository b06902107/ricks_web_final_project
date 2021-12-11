import mongoose from 'mongoose'

const Schema = mongoose.Schema

const studentSchema = Schema({
  username: {type: String, required: true},
  department: {type: String, required: true},
  grade: {type: String, required: true},
  score: [{type: Number}],
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  groups: [{
    name: {type: String},
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
  }]
})

const exportSchema = mongoose.model('Student', studentSchema)

export default exportSchema