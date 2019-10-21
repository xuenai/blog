import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { useStore } from '@config';

function LoginedRoute({ component: Component, render, ...rest }) {
  const { isLogin } = useStore('user');
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          Component ? <Component {...props} /> : render()
        ) : (
            <Redirect
              to={{
                pathname: `/dashboard/login`,
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default LoginedRoute;