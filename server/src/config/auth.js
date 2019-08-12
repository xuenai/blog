import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { User } from '../mongodb/schema'

/**
 * 创建 token 和 refreshToken
 * @param {Object} user 用户信息集合
 * @param {String} secret token 加密密码
 * @param {String} secret2 refreshToken 加密密码
 */
export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    { user: _.pick(user, ['_id', 'isAdmin']) },
    secret,
    {
      expiresIn: '5m'
    }
  )
  const createRefreshToken = jwt.sign({ user: _.pick(user, '_id') }, secret2, {
    expiresIn: '7d'
  })

  return Promise.all([createToken, createRefreshToken])
}

/**
 * 检测 refreshToken 是否为正确的
 * @param {String} refreshToken refreshToken
 * @param {String} SECRET 用来加密 token 的密码
 * @returns {Object} 返回新的 token 和 refreshToken, 如果有错误则返回错误信息
 */
export const refreshTokens = async (refreshToken, SECRET) => {
  let userId = -1
  try {
    const {
      user: { _id }
    } = jwt.decode(refreshToken)
    userId = _id
  } catch (error) {
    return {
      error: { key: 'refreshToken', message: '错误的 refreshToken, 无法解析' }
    }
  }

  if (!userId) {
    return {
      error: {
        key: 'refreshToken',
        message: '错误的 refreshToken, 获取 userId 失败'
      }
    }
  }

  const user = await User.findById(userId)

  if (!user) {
    return {
      error: {
        key: 'refreshToken',
        message: '错误的 refreshToken, 获取用户失败'
      }
    }
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret)
  } catch (error) {
    return {
      error: {
        key: 'refreshToken',
        message: '错误的 refreshToken, 无法对应用户的加密密码'
      }
    }
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    user.refreshSecret
  )

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  }
}
