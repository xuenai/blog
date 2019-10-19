import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useStore } from '@config';
import {ME_QUERY} from '@graphql'


import { Header, Footer, NotFound, SignOutBtn, LoginedRoute} from '@components';

import {Home, Detail, Tags, Archive, NewArticle, Login, Register} from '@pages';


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
          <Route path="/" exact component={Home}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/tags" component={Tags}></Route>
          <Route path='/archive' component={Archive}></Route>
          <Route path='/new' component={NewArticle}></Route>
          {/* <LoginedRoute path="/new-art" component={newArtTicle}></LoginedRoute> */}
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
