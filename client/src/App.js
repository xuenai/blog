import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { NotFound } from '@components';
import { Blog, Dashboard } from '@pages';

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
