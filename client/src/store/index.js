import {initStore} from '@config';
import counterModule from './modules/counterModule';
import menuModule from './modules/menuModule';
import searchModule from './modules/searchModule';
const store = () => {
  initStore(counterModule, menuModule, searchModule)
}
export default store;