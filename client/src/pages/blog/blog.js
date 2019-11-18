import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './blog.scss';

import { Header, Footer, NotFound } from '@components';
import { Home, ArticleDetail, Tags, Archive, TagArticles } from '@pages';

const Blog = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="blog-main">
      <Header url={url} />
      <Switch>
        <Route exact path={path} component={Home}></Route>
        <Route path={`${path}/detail/:id`}>
          <ArticleDetail blog></ArticleDetail>
        </Route>
        <Route path={`${path}/tags`} component={Tags}></Route>
        <Route path={`${path}/tag/:id`} component={TagArticles}></Route>
        <Route path={`${path}/archive`} component={Archive}></Route>
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
};

export default Blog;