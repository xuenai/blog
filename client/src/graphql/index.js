import ApolloClient from 'apollo-boost';
import { Toast } from '@components';
export * from './queries';
export * from './mutations'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  onError: res => {
    let {errors} = res.response;
    if (errors) {
      errors.map(error => Toast.error(error.message))
    }
  }
});

export default client
