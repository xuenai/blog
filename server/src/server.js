import Koa from 'koa';
import cors from 'koa2-cors'
import { ApolloServer } from 'apollo-server-koa';
import database from './mongodb'
import { resolvers, typeDefs } from './graphql'
import * as mongo from './mongodb/schema'
import buildDataloader from './config/dataloader'
 
const context = async ({ ctx }) => {
  return { ...mongo, ctx, dataloaders: buildDataloader(mongo) }
}

const app = new Koa();
app.use(cors({
  origin: () => 'http://192.168.2.158:3000',
  credentials: true,
}))
let hpptServer = app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
const server = new ApolloServer({ typeDefs, resolvers, context});
server.applyMiddleware({ app });
server.installSubscriptionHandlers(hpptServer);
database();
