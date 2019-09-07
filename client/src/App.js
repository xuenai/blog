import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import client from '@graphql'
import './App.css';

import {Menu, Search} from '@components'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <Menu /> */}
          <Search></Search>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
