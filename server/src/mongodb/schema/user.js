import mongoose from 'mongoose';
import uuidV4 from 'uuid/v4';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // 账号
  username: {
    type: String,
    minlength: 2,
    maxlength: 20
  },
  // 密码
  password: {
    type: String
  },
  // 是否是管理员
  isAdmin: {
    type: Boolean
  },
  // 创建时间
  createdAt: {
    type: Date
  },
  // 信息更新时间
  updatedAt: {
    type: Date
  },
  // 刷新token秘钥
  refreshSecret: {
    type: String
  }
});

UserSchema.pre('save', function () {
  const time = Date.now()
  if (this.isNew) {
    this.createdAt = time
    this.refreshSecret = uuidV4()
  }
  this.updatedAt = time
});

export default mongoose.model("User", UserSchema);
