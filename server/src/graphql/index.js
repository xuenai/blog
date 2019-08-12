import User from "./resolvers/User";
import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'

import typeDefs from './typeDefs'

const resolvers = {
  Mutation,
  User,
  Query
}

export { resolvers, typeDefs }