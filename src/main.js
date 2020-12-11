import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'echarts'
import Highcharts from 'highcharts'
import $ from 'jquery'
Vue.prototype.$ = $
Vue.prototype.$Echarts = Echarts
Vue.prototype.$Highcharts = Highcharts
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

