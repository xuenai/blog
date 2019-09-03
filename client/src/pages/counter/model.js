export default {
  state: {
    count: 0
  },
  actions: ({ model, setState }) => ({
    increment() {
      const { count } = model();
      setState({ count: count + 1 });
    },
    decrement() {
      const { count } = model();
      setState({ count: count - 1 });
    },
    async incrementAsync() {
      const { increment } = model();
      await new Promise(resolve => setTimeout(resolve, 1000));
      increment();
    }
  })
};