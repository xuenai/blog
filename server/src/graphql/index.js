import fs from 'fs'
import path from 'path'
import { gql } from 'apollo-server-koa'

import User from "./resolvers/User";
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription'

const resolvers = {
  Mutation,
  User,
  Query,
  Subscription
}

const schema = fs.readFileSync(
  path.join(__dirname, './schema.graphql'),
  'utf8'
)

const typeDefs = gql(schema);

export { resolvers, typeDefs }