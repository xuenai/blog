import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Message } from '@components';
import { LOGOUT_MOTATION } from '@graphql';
import { useStore } from '@config';
import styles from './signOut.module.scss';

const SignOutBtn = () => {
  const { loginStatus, changeLoginStatus } = useStore('user');
  const [logout, { data }] = useMutation(LOGOUT_MOTATION);
  if (loginStatus && data && data.logout && data.logout.code === 0) {
    changeLoginStatus(false)
    Message.success('退出登录成功')
  }
  return loginStatus ? (
    <div className={styles.signout}>
      <button>
        <Link to="/new-art">
          <i class="iconfont icon-shu"></i>
        </Link>
      </button>
      <button onClick={() => {
        logout()
      }}>
        <span data-title="登出">Sign Out</span>
      </button>
    </div>
  ) : null
}

export default SignOutBtn;