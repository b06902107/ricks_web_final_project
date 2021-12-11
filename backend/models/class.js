import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ClassSchema = Schema({
  name: {type: String, required: true, unique: true},
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
})
const exportSchema = mongoose.model('Class', ClassSchema)

export default exportSchema