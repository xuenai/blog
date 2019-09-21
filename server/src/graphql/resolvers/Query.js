import {ApolloError} from 'apollo-server-koa'
import { getUser, isLogin } from '../../config/utils'
// import { ValidationError } from '../../config/formatError'

async function users(root, args, { ctx, User }) {
  const user = await isLogin(ctx)
  const isAdmin = user.isAdmin
  if (!isAdmin) {
    // throw new ValidationError({
    //   key: 'createUser',
    //   message: '你不是管理员,无法创建新用户,请使用注册通道'
    // })
  }

  return User.find()
}

async function me(root, args, { ctx }) {
  const { user } = await getUser(ctx)
  if (user && user._id !== undefined) {
    return {
      code: 0,
      isAdmin: user.isAdmin
    }
  }
  return {
    code: 1
  }
}

export default { users, me }