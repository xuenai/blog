import mongoose from 'mongoose';
import moment from 'moment'; 

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  // 日志标题
  title: {
    type: String,
    minlength: 2
  },
  // 日志简介
  summary: {
    type: String
  },
  // 日志富文本内容
  content: {
    type: String,
    minlength: 2
  },
  // 用户id
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  // 创建日期
  createdAt: {
    type: Date
  },
  // 更新日期
  updatedAt: {
    type: Date
  },
  // 格式化后的创建日期或者更新日期
  formatDate: {
    type: String
  },
  // 文章标签
  tags: {
    type: String,
  }
})

ArticleSchema.pre('save', function() {
  const time = Date.now()
  if (this.isNew) {
    this.createdAt = time;
  }
  this.updatedAt = time;
  this.formatDate = moment().format('MMM Do YYYY');
})

export default mongoose.model('Article', ArticleSchema)
