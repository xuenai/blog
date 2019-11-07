import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const LogTagSchema = new Schema({
  articleId: {
    type: ObjectId,
    ref: 'Article'
  },
  tagId: {
    type: ObjectId,
    ref: 'Tag'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

LogTagSchema.pre('save', function() {
  const time = Date.now()
  if (this.isNew) {
    this.createdAt = time
  }
  this.updatedAt = time
})

export default mongoose.model('LogTag', LogTagSchema)
