import React from 'react';
import styles from './login.module.scss'

const Login = () => {
  document.title = '啦啦啦~~~'
  return (
    <div className={styles['login-box']}>
      <div className={styles.login}>
        <h2>welcome!</h2>
        <input type="text" placeholder="enter username"/>
        <input type="password" placeholder="enter password"/>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Login;