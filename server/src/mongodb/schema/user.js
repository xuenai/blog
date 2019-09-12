import mongoose from 'mongoose';
import uuidV4 from 'uuid/v4';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 20
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
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
