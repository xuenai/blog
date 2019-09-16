import React, {Component} from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import client from '@graphql';
import clsx from 'clsx';
import { useStore } from '@config';
import './App.css';

import { Menu, NotFound } from '@components';
import Login from '@pages/login/login';
import Register from '@pages/register/register';


class RouterSwitch extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }
  render () {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    )
  }
}

function App() {
  const { isOpen } = useStore('menu');
  let mianCls = clsx({
    main: true,
    'main--disabled': isOpen
  })
  return (
    <ApolloProvider client={client}>
      <Router>
        <Menu />
        <div className={mianCls}>
          <RouterSwitch></RouterSwitch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
