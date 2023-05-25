import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from '@/store'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import './assets/css/variable.css'
import { Empty, Dialog, Button, Form, FormItem, Input } from 'element-ui';
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Empty)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(VueParticles)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
