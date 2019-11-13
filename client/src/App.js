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
      <div className="main">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/blog" />} />
          <Route path="/blog" component={Blog} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
          {/* <Route path="/" exact component={Home}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/tags" component={Tags}></Route>
          <Route path='/archive' component={Archive}></Route>
          <Route path='/new' component={NewArticle}></Route>
          <LoginedRoute path="/new-art" component={newArtTicle}></LoginedRoute>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={NotFound}></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
