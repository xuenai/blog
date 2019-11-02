import { initStore } from '@config';
import counterModule from './modules/counterModule';
import menuModule from './modules/menuModule';
import userModule from './modules/userModule'

const store = () => {
  initStore(counterModule, menuModule, userModule)
}
export default store;