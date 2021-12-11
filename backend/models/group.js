import mongoose from 'mongoose'
const Schema = mongoose.Schema

const groupSchema = Schema({
  member: [{type: Schema.Types.ObjectId, ref: 'Student'}]
})

const exportSchema = mongoose.model('Group', groupSchema)

export default exportSchema