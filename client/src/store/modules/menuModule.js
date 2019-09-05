export default {
  name: 'menu',
  model: {
    state: {
      isAinimate: false,
      isOpen: false,
      morphOpen: 'M300-10c0,0,295,164,295,410c0,232-295,410-295,410',
      morphClose: 'M300-10C300-10,5,154,5,400c0,232,295,410,295,410'
    },
    actions: ({ model, setState }) => ({
      /**
       * 转换开启关闭状态
       */
      toggle() {
        const { isAinimate, isOpen } = model();
        setState({
          isAinimate: !isAinimate
        })
        setTimeout(() => {
          setState({
            isOpen: !isOpen
          })
        }, 250)
      },
    })
  }
};