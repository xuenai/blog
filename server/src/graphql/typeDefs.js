const { gql } = require('apollo-server-koa');

export default gql`
"用户信息"
type User {
  "id用户id"
  id: ID!
  "username用户名"
  username: String!
  "isAdmin是否是管理员"
  isAdmin: Boolean!
  "isDelete账号是否冻结"
  isDelete: Boolean!
  "password账号密码"
  password: String!
}
"日志信息"
type Article {
  "日志id"
  id: ID!
  "标题"
  title: String!
  "概要"
  summary: String!
  "内容"
  content: String!
  "创建时间"
  createdAt: String!
  "更新时间"
  updatedAt: String!
  "用户id"
  userId: ID!
  "格式化后的时间"
  formatDate: String!
  "标签"
  tags: [Tag!]!
}

"用户信息的response"
type UserResponse {
  "状态码 可以为0/1,0时证明没有错误，1时有错误"
  code: Int!
  "是否是管理员"
  isAdmin: Boolean
}

"标签"
type Tag {
  "标签id"
  id: ID!
  "标签名字"
  name: String!
}

"日志归档"
type Archive {
  "年份"
  _id: String!,
  "日志列表"
  articles: [ArchiveArticle!]!
}
"日志归档下的日志"
type ArchiveArticle {
  "日志id"
  id: ID!
  "日志标题"
  title: String!
  "日志下的标签"
  tags: [ArchiveArticleTag!]!
  "日志更新时间"
  updatedAt: String!
  "简介"
  summary: String!
}
"日志归档下的日志的标签"
type ArchiveArticleTag {
  "标签id"
  _id: ID!
  "标签名字"
  name: String!
}

"所有的查询接口"
type Query {
  "查询所有用户"
  users: [User!]!
  "检测用户是否登录"
  me: UserResponse!
  "按年查询日志"
  archives: [Archive!]!
  "获取日志列表"
  articles(
    "关键词 会检索 标题、摘要、内容"
    filter: String,
    "标签id"
    tag: ID
    ): [Article!]!
  "获取日志详情"
  article(
    "日志id"
    id: ID!
    ): Article
  "获取所有标签"
  tags: [Tag!]!
}

# 所有的涉及到增删改的接口
type Mutation {
  "管理员创建用户"
  createUser(
    "账号"
    username: String!
    "密码"
    password: String!
    "是否是密码"
    isAdmin: Boolean
  ): UserResponse!
  "注册"
  signup(
    "账号"
    username: String!,
    "密码"
    password: String!
    ): UserResponse!
  "登录"
  login(
    "账号"
    username: String!,
    "密码"
    password: String!
    ): UserResponse!
  "退出登录"
  logout: UserResponse!
  "新增日志"
  addArticle(
    "日志标题"
    title: String!,
    "日志摘要"
    summary: String!,
    "日志内容"
    content: String!,
    "日志标签id"
    tags: [ID!]
    ): Article!
  # 编辑日志
  editArticle(
    "日志id"
    id: ID!,
    "日志标题"
    title: String!,
    "日志摘要"
    summary: String!,
    "日志内容"
    content: String!,
    "日志标签id"
    tags: [ID!]
    ): Article!
  # 删除日志
  deleteArticle(
    "日志id"
    id: ID!
    ): Article!
  # 新增标签
  addTag(
    "标签名称"
    name: String!
    ): Tag!
  # 编辑标签
  editTag(
    "标签名称"
    name: String!,
    "标签id"
    id: ID!
    ): Tag!
  # 删除标签
  deleteTag(
    "标签id"
    id: ID!
    ): Tag!
}
#订阅相关
type Subscription {
  "新增文章的订阅"
  newArticle: Article
  "新增标签的订阅"
  newTag: Tag
  "编辑标签的订阅"
  editedTag: Tag
  "删除的订阅"
  deletedTag: Tag
}
`;