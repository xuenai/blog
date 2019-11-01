import ApolloClient from 'apollo-boost';
import { Message } from '@components';
export * from './queries';
export * from './mutations'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  onError: res => {
    let {networkError, response} = res
    if (networkError) {
      console.warn(networkError.message);
      Message.error(`网络连接出错`)
    }
    if (response) {
      let {errors} = response;
      if (errors) {
        errors.map(error => Message.error(error.message))
      }
    }
  }
});

export default client
