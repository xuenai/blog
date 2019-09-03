import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import client from '@graphql'
import './App.css';

import {HeEditor} from '@components'

import Home from '@pages/home';
import Counter from '@pages/counter';

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <div style={{maxWidth: '640px', margin:'100px auto 0'}}>
        <HeEditor></HeEditor>
      </div> */}
      <Router>
        <>
          <header>
            <NavLink to="/" exact activeClassName="active">home</NavLink>
            <NavLink to="/counter" activeClassName="active">counter</NavLink>
          </header>
          <Route path="/" component={Home} exact></Route>
          <Route path="/counter" component={Counter}></Route>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
