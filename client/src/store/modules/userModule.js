export default {
  name: 'user',
  model: {
    state: {
      isAdmin: false,
      isLogin: false,
    },
    actions: ({ model, setState }) => ({
      /**
       * 转换开启关闭状态
       */
      changeLoginStatus(isAdmin, isLogin) {
        setState({
          isAdmin,
          isLogin
        })
      },
    })
  }
};