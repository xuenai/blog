import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  title: {
    type: String,
    minlength: 2
  },
  summary: {
    type: String
  },
  content: {
    type: String,
    minlength: 2
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

ArticleSchema.pre('save', function() {
  const time = Date.now()
  if (this.isNew) {
    this.createdAt = time
  }
  this.updatedAt = time
})

export default mongoose.model('Article', ArticleSchema)
