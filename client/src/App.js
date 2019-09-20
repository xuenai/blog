import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import client from '@graphql';

import './App.css';

import { Menu, NotFound } from '@components';
import Login from '@pages/login/login';
import Register from '@pages/register/register';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Menu />
        <div className="main">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
