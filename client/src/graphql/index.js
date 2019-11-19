import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";
// 设置订阅
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { Message } from '@components';

export * from './queries';
export * from './mutations';
export * from './subscription';

let uri = process.env.NODE_ENV === 'production' ? 'api.justpeth.com' : 'localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: `http://${uri}`,
  credentials: 'include',
});

// 订阅设置
const wsLink = new WebSocketLink({
  uri: `ws://${uri}`,
  options: {
    reconnect: true,
    connectionParams: {}
  }
})

const errorLink = onError(({ networkError, response }) => {
  if (networkError) {
    Message.error({ content: `网络连接出错`, key: 'graphql-error' })
  }
  if (response) {
    let { errors } = response;
    if (errors) {
      errors.map((error, index) => Message.error({ content: error.message, key: `graphql-error-${index}` }))
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  errorLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        article: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Article', id: args.id }),
      },
    },
  })
});

export default client
