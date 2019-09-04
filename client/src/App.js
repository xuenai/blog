import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import client from '@graphql'
import './App.css';

import {Header} from '@components'

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <div style={{maxWidth: '640px', margin:'100px auto 0'}}>
        <HeEditor></HeEditor>
      </div> */}
      <Router>
        <>
          <Header></Header>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
