import mongoose from 'mongoose'
const Schema = mongoose.Schema

const collegeSchema = Schema({
  name: {type: String, required: true, unique: true},
  departments: [{type: Schema.Types.ObjectId, ref: 'Department'}]
})

const exportSchema = mongoose.model('College', collegeSchema)

export default exportSchema