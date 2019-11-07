import { ApolloError } from 'apollo-server-koa';
import { getUser, isLogin } from '../../config/utils'

/**
 * 获取用户列表
 * @param {*} root 
 * @param {*} args 
 * @param {*} param2 
 */
async function users(root, args, { ctx, User }) {
  const user = await isLogin(ctx)
  // const isAdmin = user.isAdmin
  // if (!isAdmin) {
  //   throw new ValidationError({
  //     key: 'createUser',
  //     message: '你不是管理员,无法创建新用户,请使用注册通道'
  //   })
  // }

  return User.find()
}

/**
 * me 检测是否登录
 * @param {*} root 
 * @param {*} args 
 * @param {*} param2 
 */
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

/**
 * 获取个人的日志列表
 */
async function ownArticles(root, args, { Article, ctx }) {
  const { user } = await getUser(ctx);
  if (user) {
    const articles = await Article.find({
      userId: user._id
    }).sort({ createdAt: -1 })
    // const total = await Article.find({ userId: user._id }).countDocuments();
    return articles;
  } else {
    throw new ApolloError(`用户未登录`, 'ownArticles')
  }
}
// async function ownArticles(root, { filter, page, pageSize = 10 }, { Article, ctx }) {
//   const { user } = await getUser(ctx);
//   if (user) {
//     const skip = (page - 1) * pageSize
//     const regex = new RegExp(filter, 'i')
//     const articles = await Article.find({
//       $or: [{ title: regex }, { content: regex }],
//       userId: user._id
//     })
//       .sort({ createdAt: -1 })
//       .limit(~~pageSize)
//       .skip(~~skip)

//     const total = await Article.find({ userId: user._id }).countDocuments()
//     return {
//       articles,
//       total,
//       current: page,
//       totalPage: Math.ceil(total / pageSize)
//     }
//   } else {
//     throw new ApolloError(`用户未登录`, 'ownArticles')
//   }
// }

/**
 * ownArticleDetail 获取文章详情
 */
async function ownArticleDetail(root, { id }, { Article, ctx }) {
  const { user } = await getUser(ctx);
  if (user) {
    let articles = await Article.find({_id: id, userId: user._id});
    if (articles) {
      let article = articles[0];
      return article;
    } else {
      throw new ApolloError(`未能查询到该日志`, 'ownArticleDetail');
    }
  } else {
    throw new ApolloError(`用户未登录`, 'ownArticleDetail');
  }
}

/**
 * tags 获取标签列表
 */
async function tags (root, data, {Tag}) {
  const tags = await Tag.find();
  return tags;
}

export default { users, me, ownArticles, ownArticleDetail, tags }