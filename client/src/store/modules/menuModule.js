export default {
  name: 'menu',
  model: {
    state: {
      // 是否是第一次加载
      firstLoad: true,
      // 头部动画是否完成了
      headerReady: false,
    },
    actions: ({ model, setState }) => ({
      /**
       * 切换第一次加载状态
       */
      changeFirstLoad() {
        setState({
          firstLoad: false
        })
      },
      /**
       * 切换动画完成情况
       */
      changeHeaderReady() {
        setState({
          headerReady: true
        })
      }
    })
  }
};