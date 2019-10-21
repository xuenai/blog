import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';

import './dashboard.scss';

import { DashboardHeader, LoginedRoute } from '@components';
import {DashboardLogin} from '@pages';
import { useStore } from '@config';

const Dashboard = () => {
  const { isLogin } = useStore('user');
  let { path, url } = useRouteMatch();
  return (
    <div className="dashboard">
      <DashboardHeader url={url} />
      <Switch>
        <LoginedRoute exact path={path} render={() => <Redirect to={`${path}/archives`} />}></LoginedRoute>
        <Route path={`${path}/login`}>
          <DashboardLogin />
        </Route>
      </Switch>
    </div>
  )
};

export default Dashboard;