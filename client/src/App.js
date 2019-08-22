import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '@graphql'
import './App.css';

import {HeEditor} from '@components'

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{maxWidth: '640px', margin:'100px auto 0'}}>
        <HeEditor></HeEditor>
      </div>
    </ApolloProvider>
  );
}

export default App;
