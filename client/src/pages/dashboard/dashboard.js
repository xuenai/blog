import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import './dashboard.scss';

import { DashboardHeader, LoginedRoute, NotFound, NetError, Loading } from '@components';
import { DashboardLogin, DashboardArchives, DashboardTags, DashboardRegister, NewArticle, ArticleDetail, ArticleEdit } from '@pages';
import { useStore, areEqual } from '@config';
import { ME_QUERY } from '@graphql'

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { data, error } = useQuery(ME_QUERY);
  const { loginStatus, changeLoginStatus } = useStore('user');
  // 验证登录状态
  if (data && data.me && loginStatus === 'default') {
    if (data.me.code === 0) {
      changeLoginStatus('logined');
    } else {
      changeLoginStatus('unlogin');
    }
  }
  // 是否有错误
  if (error) {
    return <NetError description={error.message}></NetError>
  }

  // 默认进来不显示页面 先验证登录
  if (loginStatus === 'default') {
    return <Loading title="验证登录中..."></Loading>
  }

  return (
    <div className="dashboard">
      <DashboardHeader url={url} />
      <Switch>
        <LoginedRoute exact path={path} render={() => <Redirect to={`${path}/archives`} />}></LoginedRoute>
        <Route path={`${path}/login`}>
          <DashboardLogin />
        </Route>
        <Route path={`${path}/register`}>
          <DashboardRegister />
        </Route>
        <LoginedRoute path={`${path}/archives`} component={DashboardArchives}></LoginedRoute>
        <LoginedRoute path={`${path}/tags`} component={DashboardTags}></LoginedRoute>
        <LoginedRoute path={`${path}/new`} component={NewArticle}></LoginedRoute>
        <LoginedRoute path={`${path}/detail/:id`} component={ArticleDetail}></LoginedRoute>
        <LoginedRoute path={`${path}/edit/:id`} component={ArticleEdit}></LoginedRoute>
        <Route component={NotFound} />
      </Switch>
    </div>
  )
};

export default React.memo(Dashboard, areEqual);