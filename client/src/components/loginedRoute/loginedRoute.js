import React from "react";
import {Route, Redirect} from 'react-router-dom';
import { useStore } from '@config';

function LoginedRoute ({ component: Component, ...rest }) {
  const { isLogin } = useStore('user');
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default LoginedRoute;