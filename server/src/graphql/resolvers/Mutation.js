import bcrypt from 'bcrypt'
import {
  APP_SECRET,
  isLogin,
  setCookie
} from '../../config/utils' 
import { createTokens } from '../../config/auth'
import { pubsub, NEW_ARTICLE, NEW_VOTE } from '../subscriptionName'

import {ApolloError} from 'apollo-server-koa'

// 注册
async function signup(root, args, { User }) {
  const u = await User.findOne({ username: args.username })
  if (u) {
    throw new ApolloError(`用户名已被注册`, 'signup')
  }
  const hashedPassword = await bcrypt.hash(args.password, 12)
  try {
    const newUser = Object.assign(args, { password: hashedPassword , isAdmin: false})
    const response = await User.create(newUser)
    return {
      code: 0
    }
  } catch (error) {
    throw new ApolloError(`${error.message}`, 'signup')
  }
}

// 登录
async function login(root, { username, password }, { User, ctx }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new ApolloError(`用户不存在`, 'login')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new ApolloError(`密码不正确`, 'login')
  }

  if (user.isDelete) {
    throw new ApolloError(`该用户已被冻结`, 'login')
  }

  const [token, refreshToken] = await createTokens(
    user,
    APP_SECRET,
    user.refreshSecret
  )

  setCookie(ctx, token, refreshToken)
  return {
    code: 0,
    isAdmin: user.isAdmin
  }
}

// 退出登录
async function logout(root, args, { ctx }) {
  setCookie(ctx, '', '', -1, -1)
  return {
    code: 0
  }
}

// 创建用户
async function createUser(root, args, context) {
  // const user = await isLogin(context.ctx)
  // const isAdmin = user.isAdmin
  const isAdmin = args.isAdmin
  if (!isAdmin) {
    // throw new ValidationError({
    //   key: 'createUser',
    //   message: '你不是管理员,无法创建新用户,请使用注册通道'
    // })
  }
  return signup(root, args, context)
}


export default {
  createUser,
  signup,
  login,
  logout,
}
