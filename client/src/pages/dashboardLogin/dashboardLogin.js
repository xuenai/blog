import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {Redirect, useLocation} from 'react-router-dom';
import './dashboardLogin.scss';

import {Input, Button} from '@components';
import {LOGIN_MUTATUIION} from '@graphql';
import { Message } from '@components';
import { useStore } from '@config';

const DashboardLogin = () => {
  let locaition = useLocation();
  let from = locaition.state.from.pathname;
  let [username, setUsername] = useState('');
  let [pwd, setPwd] = useState('');
  let { isLogin, changeLoginStatus } = useStore('user');
  const [login, { data }] = useMutation(LOGIN_MUTATUIION);
  
  if (data && data.login.code === 0 && !isLogin) {
    changeLoginStatus(data.login, true);
    Message.success('登录成功');
  }
  return (
    isLogin ? <Redirect to={from}></Redirect> :
      <div className="d-login">
        <div className="d-login-container">
          <h2>Sign in</h2>
          <form onSubmit={event => {
            event.preventDefault();
            event.persist()
            if (!username || !pwd) {
              Message.error('请将信息补充完整！');
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