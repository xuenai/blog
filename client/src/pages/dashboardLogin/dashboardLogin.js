import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {Redirect} from 'react-router-dom';
import './dashboardLogin.scss';

import {Input, Button} from '@components';
import {LOGIN_MUTATUIION} from '@graphql';
import { Toast } from '@components';
import { useStore } from '@config';

let handleLoading;
const DashboardLogin = () => {
  let [username, setUsername] = useState('');
  let [pwd, setPwd] = useState('');
  let { isLogin, changeLoginStatus } = useStore('user');
  const [login, { loading, data }] = useMutation(LOGIN_MUTATUIION);
  if (loading) {
    handleLoading = null;
    handleLoading = Toast.loading('登录中。。。')
  }
  if (!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (data && data.login.code === 0 && !isLogin) {
    changeLoginStatus(data.login, true);
    Toast.success('登录成功')
  }
  return (
    isLogin ? <Redirect to='/dashboard'></Redirect> :
      <div className="d-login">
        <div className="d-login-container">
          <h2>Sign in</h2>
          <form onSubmit={event => {
            event.preventDefault();
            event.persist()
            if (!username || !pwd) {
              Toast.error('请将信息补充完整！');
              return false;
            }
            login({ variables: { username, password: pwd } })
          }}>
            <Input placeholder="Your username" className="mb-16" onChange={e => setUsername(e)}/>
            <Input placeholder="Your password" type="password" className="mb-16" onChange={e => setPwd(e)}/>
            <Button className="mb-16" type="submit">Login</Button>
          </form>
        </div>
      </div>
  )
};

export default DashboardLogin;