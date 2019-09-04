import counterModule from './modules/counterModule'
import {initStore} from '@config'

const store = () => {
  initStore(counterModule)
}
export default store;