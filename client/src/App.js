import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { NotFound } from '@components';
import { Blog, Dashboard } from '@pages';
import { ARTICLES_AND_TAGS } from '@graphql'

function App() {
  useQuery(ARTICLES_AND_TAGS);
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/blog" />} />
          <Route path="/blog" component={Blog} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
