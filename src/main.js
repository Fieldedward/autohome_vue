import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 定义全局样式
import '@/assets/css/global.css'
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 配置全局自定义设置
import settings from "@/assets/js/settings";
Vue.prototype.$settings = settings;

import axios from "axios";
Vue.prototype.$axios = axios;


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
