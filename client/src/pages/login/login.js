import React from 'react';
import styles from './login.module.scss';

const Login = () => {
  document.title = '啦啦啦~~~'
  return (
    <div className={styles['login-box']}>
      <div className={styles.login}>
        <h2>sign in!</h2>
        <form onSubmit={event => {
          event.preventDefault();
          event.persist()
          // event.target.reset();
          console.log(event)
        }}>
          <input type="text" placeholder="enter username"/>
          <input type="password" autoComplete="on" placeholder="enter password"/>
          <button type="submit">sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login;