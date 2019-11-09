import { ApolloClient, InMemoryCache, split } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";
// 设置订阅
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { Message } from '@components';

export * from './queries';
export * from './mutations';
export * from './subscription';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});
const errorLink = onError(({ networkError, response }) => {
  if (networkError) {
    Message.error({content: `网络连接出错`, key: 'graphql-error'})
  }
  if (response) {
    let { errors } = response;
    if (errors) {
      errors.map((error, index) => Message.error({content: error.message, key: `graphql-error-${index}`}))
    }
  }
});


// 订阅设置
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {}
  }
})

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
  cache: new InMemoryCache()
});

export default client
