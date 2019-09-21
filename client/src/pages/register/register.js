import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import styles from '../login/login.module.scss';
import { Toast } from '@components';
import {REGISTER_MUTATUIION} from '@graphql';

let handleLoading;
const Register = () => {
  document.title = 'Sign Up';
  const [signup, { loading, data}] = useMutation(REGISTER_MUTATUIION);
  if (loading) {
    handleLoading = Toast.loading('注册中。。。')
  }
  if(!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (data) {
    if (data.signup.code === 0) {
      Toast.error(`注册成功`);
    }
  }
  const $name = useRef();
  const $pwd = useRef();
  const $pwd1 = useRef();
  return (
    <div className={styles['login-box']}>
      <div className={styles.login}>
        <h2>Sign Up!</h2>
        <form onSubmit={event => {
          event.preventDefault();
          event.persist()
          let name = $name.current.value;
          let pwd = $pwd.current.value;
          let pwd1 = $pwd1.current.value;

          if (!name || !pwd || !pwd1) {
            Toast.error('请将信息补充完整');
            return false;
          }
          if (pwd !== pwd1) {
            Toast.error('两次密码不相等');
            return false;
          }
          signup({ variables: { username: name, password: pwd } })
        }}>
          <input type="text" placeholder="enter username" ref={$name} />
          <input type="password" autoComplete="on" ref={$pwd} placeholder="enter password" />
          <input type="password" autoComplete="on" ref={$pwd1} placeholder="enter repeat password" />
          <button type="submit"><span data-title="点击注册">Sign Up</span></button>
        </form>
      </div>
    </div>
  )
}

export default Register;