import jwt from 'jsonwebtoken'
import { refreshTokens } from './auth'
import { User } from '../mongodb/schema'
import { ApolloError } from 'apollo-server-koa';

// token 密码
const APP_SECRET = 'Koa-Apollo-GraphQL-Server'
// 5 分钟过期时间
const EXPIRES_TOKEN = 300000
// 7 天过期时间
const EXPIRES_REFRESH_TOKEN = 604800000

/**
 * 返回用户信息
 * @param {Object} ctx koa ctx 参数
 * @returns {Object} 返回用户信息和错误信息
 */
async function getUser(ctx) {
  const token = ctx.cookies.get('x-token')
  const refreshToken = ctx.cookies.get('x-refresh-token')
  let user
  if (token) {
    try {
      const {
        user: { _id }
      } = jwt.verify(token, APP_SECRET)
      user = await User.findById(_id)
    } catch (error) {
      throw new ApolloError(`验证 token 错误, 原因: ${error.message}`, 'login');
    }
  } else if (refreshToken) {
    const newTokens = await refreshTokens(refreshToken, APP_SECRET)
    if (newTokens.error === undefined) {
      setCookie(ctx, newTokens.token, newTokens.refreshToken)
      user = newTokens.user
    }
  }
  return {user}
}

/**
 * 判断是否已经登陆
 * @param {Object} ctx koa ctx 参数
 * @returns {Object} 如果已经登录返回用户信息，否则就抛出一个错误
 */
async function isLogin(ctx) {
  const { user } = await getUser(ctx)
  return user
}

/**
 * 给客户端设置 token 和 refreshToken
 * @param {Object} ctx koa ctx 参数
 * @param {String} token token 字符串
 * @param {String} refreshToken refreshToken 字符串
 * @param {String} tokenTime token 过期时间
 * @param {String} refreshTokenTime refreshToken 过期时间
 */
function setCookie(
  ctx,
  token,
  refreshToken,
  tokenTime = EXPIRES_TOKEN,
  refreshTokenTime = EXPIRES_REFRESH_TOKEN
) {
  ctx.cookies.set('x-token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + tokenTime),
    maxAge: tokenTime
  })
  ctx.cookies.set('x-refresh-token', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenTime),
    maxAge: refreshTokenTime
  })
}

export {
  APP_SECRET,
  getUser,
  EXPIRES_TOKEN,
  EXPIRES_REFRESH_TOKEN,
  setCookie,
  isLogin
}
