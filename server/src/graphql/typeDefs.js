const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    isDelete: Boolean!
    password: String!
  }
  type UserResponse {
    ok: Boolean!
    error: String
    isAdmin: Boolean
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): UserResponse!
    signup(
      username: String!
      email: String!
      password: String!
    ): UserResponse!
  }
`
export default typeDefs;