import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription'
import typeDefs from './typeDefs';

const resolvers = {
  Mutation,
  Query,
  Subscription
}

export { resolvers, typeDefs }