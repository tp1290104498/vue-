import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
import mutations from './mutations'
import state from './state'
import modules from './modules'
Vue.use(Vuex)
// export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  //
  // },
  // modules: {
  // }
// })
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  modules
})
export default store
