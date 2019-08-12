import Koa from 'koa';
import cors from 'koa2-cors'
import { ApolloServer, gql } from 'apollo-server-koa';
import database from './mongodb'
import { resolvers, typeDefs } from './graphql'
import * as mongo from './mongodb/schema'
import formatError from './config/formatError'
import buildDataloader from './config/dataloader'


const context = async ({ ctx }) => {
  return { ...mongo, ctx, dataloaders: buildDataloader(mongo) }
}

const server = new ApolloServer({ typeDefs, resolvers, context, formatError });
const app = new Koa();
app.use(cors({
  credentials: true,
}))
let koaServer = app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);

server.applyMiddleware({ app });
server.installSubscriptionHandlers(koaServer);

database();
