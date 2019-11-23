import { ApolloError } from 'apollo-server-koa';
import mongoose from 'mongoose';
import { getUser, isLogin } from '../../config/utils'

/**
 * 获取用户列表
 * @param {*} root 
 * @param {*} args 
 * @param {*} param2 
 */
async function users(root, args, { ctx, User }) {
  const user = await isLogin(ctx)
  const { isAdmin } = user
  if (!isAdmin) {
    throw new ApolloError(`你不是管理员,不能查询用户信息`, 'users');
  }

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

async function archives(root, args, { Article }) {
  const res = await Article.aggregate([
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags"
      },
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $group: {
        _id: { $year: '$updatedAt' },
        count: {$sum: 1},
        articles: {
          $push: {
            id: '$_id',
            title: '$title',
            summary: '$summary',
            updatedAt: '$updatedAt',
            tags: '$tags'
          }
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ])

  return res
}

/**
 * 获取所有日志 使用find和populate
 */
async function articles(root, { filter, tag }, { Article }) {
  const regex = new RegExp(filter, 'i');
  let params = {};
  if (filter) {
    params.$or = [{ title: regex }, { content: regex }]
  }
  if (tag) {
    params.tags = { $elemMatch: { $eq: tag } }
  }
  const articles = await Article.find(params)
    .sort({ createdAt: -1 })
    .populate('tags', 'id name')
  return articles;
}

/**
 * 获取所有日志 使用aggregate方法
 */
// async function articles(root, { filter, tag }, { Article }) {
//   const regex = new RegExp(filter, 'i');
//   let params = {};
//   if (filter) {
//     params.$or = [{ title: regex }, { content: regex }]
//   }
//   if (tag) {
//     params.tags = { $elemMatch: { $eq: new mongoose.Types.ObjectId(tag) } }
//   }
//   let articles = Article.aggregate([
//     {
//       $match: params
//     },
//     {
//       $lookup: {
//         from: "tags",
//         localField: "tags",
//         foreignField: "_id",
//         as: "tags"
//       },
//     },
//     {
//       $project: {
//         id: "$_id",
//         title: 1,
//         summary: 1,
//         content: 1,
//         createdAt: 1,
//         updatedAt: 1,
//         userId: 1,
//         formatDate: 1,
//         tags: {
//           id: "$_id",
//           name: 1,
//         },
//       }
//     },
//     {
//       $sort: {
//         createdAt: -1
//       }
//     },
//   ]);
//   return articles;
// }

/**
 * 获取个人的日志列表
 */
// async function ownArticles(root, args, { Article }) {
//   const articles = await Article.find().sort({ createdAt: -1 }).populate('tags', 'id name');
//   // await Article.fetch();
//   return articles;
// }
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
 * article 获取文章详情
 */
async function article(root, { id }, { Article, ctx }) {
  let articles = await Article.find({ _id: id }).populate('tags', 'id name');
  if (articles) {
    let article = articles[0];
    return article;
  } else {
    throw new ApolloError(`未能查询到该日志`, 'article');
  }
}

/**
 * tags 获取标签列表
 */
async function tags(root, data, { Tag }) {
  const tags = await Tag.find();
  return tags;
}
/**
 * tag 获取标签详情
 */
async function tag(root, { id }, { Tag }) {
  const tag = await Tag.findOne({ _id: id });
  return tag;
}

export default { users, me, archives, articles, article, tags, tag }