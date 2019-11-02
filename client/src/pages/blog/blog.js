import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './blog.scss';

import { Header, Footer, LoginedRoute } from '@components';
import { Home, Detail, Tags, Archive } from '@pages';

const Blog = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Header url={url} />
      <Switch>
        <Route exact path={path} component={Home}></Route>
        <Route path={`${path}/detail/:id`} component={Detail}></Route>
        <Route path={`${path}/tags`} component={Tags}></Route>
        <Route path={`${path}/archive`} component={Archive}></Route>
      </Switch>
      <Footer />
    </div>
  )
};

export default Blog;