export default {
  name: 'search',
  model: {
    state: {
      animating: false,
    },
    actions: ({ model, setState }) => ({
      /**
       * 转换开启关闭状态
       */
      focus() {
        setState({
          animating: true
        })
      },
      blur () {

      }
    })
  }
};