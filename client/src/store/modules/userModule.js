export default {
  name: 'user',
  model: {
    state: {
      loginStatus: 'default',  // 值为 'default' 未验证是否登录 'logined' 已登录  'unlogin' 未登录；
    },
    actions: ({ model, setState }) => ({
      /**
       * 转换开启关闭状态
       */
      changeLoginStatus(loginStatus) {
        setState({
          loginStatus
        })
      },
    })
  }
};