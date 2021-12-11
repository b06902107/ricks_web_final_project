import mongoose from 'mongoose'
const Schema = mongoose.Schema

const departmentSchema = Schema({
  name: {type: String, required: true, unique: true},
  classes: [{type: Schema.Types.ObjectId, ref: 'Class'}]
})

const exportSchema = mongoose.model('Department', departmentSchema)

export default exportSchema
