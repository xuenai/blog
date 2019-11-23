import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import '../dashboardLogin/dashboardLogin.scss';

import { Input, Button, Message } from '@components';
import { REGISTER_MUTATUIION } from '@graphql';
import {areEqual} from '@config';

let handleLoading;
const DashboardRegister = () => {
  let [username, setUsername] = useState('');
  let [pwd, setPwd] = useState('');
  let [repeatPwd, setRepeatPwd] = useState('');
  const [signup, { loading, data }] = useMutation(REGISTER_MUTATUIION);
  if (loading) {
    handleLoading = Message.loading('注册中。。。')
  }
  if (!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (data && data.signup.code === 0) {
    Message.success(`注册成功`);
  }
  return (
    data && data.signup.code === 0 ? <Redirect to='/dashboard/login'></Redirect> :
      <div className="d-login">
        <div className="d-login-container">
          <h2>Sign up</h2>
          <form onSubmit={event => {
            event.preventDefault();
            event.persist()
            if (!username || !pwd || !repeatPwd) {
              Message.error('请将信息补充完整');
              return false;
            }
            if (pwd !== repeatPwd) {
              Message.error('两次密码不相等');
              return false;
            }
            signup({ variables: { username, password: pwd } })
          }}>
            <Input placeholder="Enter your username" className="mb-16" onChange={e => setUsername(e)} />
            <Input placeholder="Enter your password" type="password" className="mb-16" onChange={e => setPwd(e)} />
            <Input placeholder="Enter your repeat password" type="password" className="mb-16" onChange={e => setRepeatPwd(e)} />
            <Button className="mb-16" type="submit">Register</Button>
          </form>
        </div>
      </div>
  )
};

export default React.memo(DashboardRegister, areEqual);