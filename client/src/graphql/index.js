import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError: (error) => {
    console.log(error)
  },
  clientState: (resolve) => {
    console.log('TCL: resolve', resolve)
    
  }
});

export default client