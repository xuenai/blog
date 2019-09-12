const typeDefs = `
  type User {
    id: ID!
    username: String!
    isAdmin: Boolean!
    isDelete: Boolean!
    password: String!
  }
  # code的值可以为0/1,0时证明没有错误，1时有错误，msg是错误提示信息
  type UserResponse {
    code: Int!
    msg: String
    isAdmin: Boolean
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(
      username: String!
      password: String!
      isAdmin: Boolean
    ): UserResponse!

    signup(
      username: String!
      password: String!
    ): UserResponse!
  }
`
export default typeDefs;