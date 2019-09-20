import React, {useRef} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Toast } from '@components';
import styles from './login.module.scss';

let handleLoading;
const Login = () => {
  document.title = 'Sign in';

  document.title = 'Sign Up';
  const REGITSET_MUTATUIION = gql`
    mutation login($username: String!, $password: String!){
      login(username: $username, password: $password) {
        code,
        msg
      }
    }
  `
  const [login, { loading, data, error }] = useMutation(REGITSET_MUTATUIION);
  if (loading) {
    handleLoading = Toast.loading('登录中。。。')
  }
  if(!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (error) {
    Toast.error(error.message)
  }
  if (data) {
    if (data.login.code === 0) {
      Toast.success(`登录成功`)
    } else {
      Toast.error(data.login.msg)
    }
  }
  const $name = useRef();
  const $pwd = useRef();

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
          <input type="text" autoComplete="on" ref={$name} placeholder="enter username"/>
          <input type="password" autoComplete="on" ref={$pwd} placeholder="enter password"/>
          <button type="submit">sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login;