import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import {LOGIN_MUTATUIION} from '@graphql';

import { useStore } from '@config';
import { Toast } from '@components';
import styles from './login.module.scss';

let handleLoading;
const Login = ({ history }) => {
  const $name = useRef();
  const $pwd = useRef();
  document.title = 'Sign in';
  const { isLogin, changeLoginStatus } = useStore('user');
  const [login, { loading, data }] = useMutation(LOGIN_MUTATUIION);
  if (loading) {
    handleLoading = null;
    handleLoading = Toast.loading('登录中。。。')
  }
  if (!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (data) {
    if (data.login.code === 0) {
      Toast.success(`登录成功`);
      if (!isLogin) {
        history.push('/')
        setTimeout(() => {
          changeLoginStatus(data.login, true);
        })
      }
    }
  }
  return (
    <div className={styles['login-box']}>
      <div className={styles.login}>
        <h2>sign in!</h2>
        <form onSubmit={event => {
          event.preventDefault();
          event.persist()
          let name = $name.current.value;
          let pwd = $pwd.current.value;

          if (!name || !pwd) {
            Toast.error('请将信息补充完整！');
            return false;
          }
          login({ variables: { username: name, password: pwd } })
        }}>
          <input type="text" autoComplete="on" ref={$name} placeholder="enter username" />
          <input type="password" autoComplete="on" ref={$pwd} placeholder="enter password" />
          <button type="submit"><span data-title="点击登录">sign in</span></button>
        </form>
      </div>
    </div>
  )
}

export default Login;