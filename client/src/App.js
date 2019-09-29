import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useStore } from '@config';
import {ME_QUERY} from '@graphql'


import { Header, Footer, NotFound, SignOutBtn, LoginedRoute} from '@components';
import Login from '@pages/login/login';
import Register from '@pages/register/register';
import newArtTicle from '@pages/newArticle/newArticle'

function App() {
  const { data } = useQuery(ME_QUERY);
  const { isLogin, changeLoginStatus } = useStore('user');
  if (data && data.me && data.me.code === 0 && !isLogin) {
    changeLoginStatus(data.isAdmin, true);
  }
  return (
    <Router>
      <div className="main">
        <Header></Header>
        <Switch>
          {/* <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <LoginedRoute path="/new-art" component={newArtTicle}></LoginedRoute>
          <Route component={NotFound}></Route> */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
