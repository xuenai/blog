import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import client from '@graphql';
import clsx from 'clsx';
import { useStore } from '@config';
import './App.css';

import { Menu, NotFound } from '@components';
import Login from '@pages/login/login'

function App() {
  const { isOpen } = useStore('menu');
  let mianCls = clsx({
    main: true,
    'main--disabled': isOpen
  })
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Menu />
          <div className={mianCls}>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
