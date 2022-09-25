import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import MainView from './components/MainView.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueRouter,axios,VueAxios)

const router = new VueRouter({
  routes: [
   {
    path : '/',
    component :  MainView
   }
  ]
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
