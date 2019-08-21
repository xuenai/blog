import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql'
import './App.css';

import Test from './pages/test'


function App() {
  return (
    <ApolloProvider client={client}>
      <h2>My first Apollo app 🚀</h2>
      <Test></Test>
    </ApolloProvider>
  );
}

export default App;
