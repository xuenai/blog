import bcrypt from 'bcrypt'
import {
  APP_SECRET,
  isLogin,
  setCookie
} from '../../config/utils';
import { createTokens } from '../../config/auth'
import { pubsub, NEW_ARTICLE, NEW_TAG, EDITED_TAG, DELETED_TAG, } from '../subscription'

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
async function addArticle(root, {title, summary, content, tags}, { Article, LogTag, ctx }) {
  const user = await isLogin(ctx)
  if (!user) {
    throw new ApolloError(`用户不存在`, 'addArticle')
  }
  if (user.isAdmin) {
    // 查找标签 看是否存在相同的标签
    // const oldTags = await Tag.find({name: tags});
    // if (!oldTags.length) {
    //   Tag.create({name: tags});
    // }
    const newArticle = Object.assign({ userId: user._id }, {title, summary, content})
    
    let response = await Article.create(newArticle)
    let newTags = JSON.parse(tags);
    let t = [];
    newTags.map(tag => {
      t.push({
        articleId: response._id,
        tagId: tag.value
      })
    })
    const logTag = await LogTag.insertMany(t)

    response.tags = logTag

    // 发送订阅 NEW_ARTICLE
    pubsub.publish(NEW_ARTICLE, { newArticle: response })
    return response
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
      const res = await Tag.create({name});
      pubsub.publish(NEW_TAG, {newTag: res});
      return res;
    }
    throw new ApolloError(`标签已存在`, 'addTag')
  } else {
    throw new ApolloError(`用户不是管理员，无法新增标签`, 'addTag')
  }
}

/**
 * 编辑标签
 */
async function editTag(root, {name, id}, {Tag, ctx}) {
  const user = await isLogin(ctx)
  if (!user) {
    throw new ApolloError(`用户不存在`, 'editTag')
  }
  if (user.isAdmin) {
    // 查找标签 看是否存在相同的标签
    const oldTag= await Tag.findOne({_id: id});
    if (oldTag) {
      // 更改标签名字
      const res = await Tag.update({_id: id}, {name})
      return {name, id};
    }
    throw new ApolloError(`标签不存在`, 'editTag')
  } else {
    throw new ApolloError(`用户不是管理员，无法编辑标签`, 'editTag')
  }
}

/**
 * 删除标签
 */
async function deleteTag (root, {id}, {Tag, ctx}) {
  const user = await isLogin(ctx)
  if (!user) {
    throw new ApolloError(`用户不存在`, 'deleteTag')
  }
  if (user.isAdmin) {
    // 查找标签 看是否存在相同的标签
    const oldTag = await Tag.findOne({_id: id});
    if (oldTag) {
      // 更改标签名字
      await Tag.deleteOne({_id: id});
      return oldTag;
    }
    throw new ApolloError(`标签不存在`, 'deleteTag')
  } else {
    throw new ApolloError(`用户不是管理员，无法删除标签`, 'deleteTag')
  }
}

export default {
  createUser,
  signup,
  login,
  logout,
  addArticle,
  addTag,
  editTag,
  deleteTag
}
