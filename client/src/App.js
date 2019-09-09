import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from "react-router-dom";
import client from '@graphql';
import clsx from 'clsx';
import { useStore } from '@config';
import './App.css';

import {Menu, Search, NotFound} from '@components'

function App() {
  const {isOpen} = useStore('menu');
  let mianCls = clsx({
    main: true,
    'main--disabled': isOpen
  })
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Menu />
          <div className={mianCls}>
            <Search></Search>
            <Route component={NotFound}></Route>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
