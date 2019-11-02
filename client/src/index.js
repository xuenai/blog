import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Prism from 'prismjs';
import client from '@graphql';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.scss';

import store from '@store';
store();

Prism.hooks.add('before-highlight', function (env) {
  env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
  env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
