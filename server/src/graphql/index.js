import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription'
import typeDefs from './typeDefs';

const resolvers = {
  Mutation,
  Query,
  Subscription
}

// const schema = fs.readFileSync(
//   path.join(__dirname, './schema.graphql'),
//   'utf8'
// )

// const typeDefs = gql(schema);

export { resolvers, typeDefs }