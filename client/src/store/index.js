import { initStore } from '@config';
import menuModule from './modules/menuModule';
import userModule from './modules/userModule'

const store = () => {
  initStore(menuModule, userModule)
}
export default store;