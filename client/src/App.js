import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { NotFound } from '@components';
import {loadable} from '@config';

const Blog = loadable(() => import('@pages/blog'));
const Dashboard = loadable(() => import('@pages/dashboard'));

function App() {
  return (
    <Router>
      <div className="line-numbers">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/blog" />} />
          <Route path="/blog" component={Blog} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
