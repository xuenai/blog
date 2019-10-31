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

// 新增文章
async function addArticle(root, {title, summary, content, tags}, { Article, ctx, Tag }) {
  const user = await isLogin(ctx)
  if (!user) {
    throw new ApolloError(`用户不存在`, 'addArticle')
  }
  if (user.isAdmin) {
    // 查找标签 看是否存在相同的标签
    const oldTags = await Tag.find({name: tags});
    if (!oldTags.length) {
      // 新建标签
      Tag.create({name: tags});
    }
    const newArticle = Object.assign({ userId: user._id }, {title, summary, content, tags})
    const response = await Article.create(newArticle)
    // 发送订阅 NEW_ARTICLE
    // pubsub.publish(NEW_ARTICLE, { newArticle: response })
    return {code: 0}
  } else {
    throw new ApolloError(`用户不是管理员，无法发表日志`, 'addArticle')
  }
}

/**
 * 新增标签
 */
async function addTag(root, {name}, {Tag, ctx}) {
  const user = await isLogin(ctx)
  if (!user) {
    throw new ApolloError(`用户不存在`, 'addTag')
  }
  if (user.isAdmin) {
    // 查找标签 看是否存在相同的标签
    const oldTags = await Tag.find({name});
    if (!oldTags.length) {
      // 新建标签
      Tag.create({name: tags});
      return {code: 0}
    }
    throw new ApolloError(`标签已存在`, 'addTag')
    // 发送订阅 NEW_ARTICLE
    // pubsub.publish(NEW_ARTICLE, { newArticle: response })
  } else {
    throw new ApolloError(`用户不是管理员，无法新增标签`, 'addTag')
  }
}
export default {
  createUser,
  signup,
  login,
  logout,
  addArticle,
  addTag
}
