import Koa from 'koa';
import cors from 'koa2-cors'
import { ApolloServer } from 'apollo-server-koa';
import database from './mongodb'
import { resolvers, typeDefs } from './graphql'
import * as mongo from './mongodb/schema'

const context = async ({ ctx }) => {
  return { ...mongo, ctx }
}
const PORT =  4000;
const app = new Koa();
app.use(cors({
  // origin: () => 'http://localhost:3000',
  credentials: true,
}))
let hpptServer = app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  )

});
const server = new ApolloServer({ typeDefs, resolvers, context});
server.applyMiddleware({ app });
server.installSubscriptionHandlers(hpptServer);
database();
