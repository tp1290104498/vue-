import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home'

Vue.use(VueRouter)

  const routes = [
      ...Home
]

const router = new VueRouter({
    routes
})

export default router
