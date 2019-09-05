import {initStore} from '@config';
import counterModule from './modules/counterModule';
import menuModule from './modules/menuModule'
const store = () => {
  initStore(counterModule, menuModule)
}
export default store;