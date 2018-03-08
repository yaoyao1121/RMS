// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from "element-ui";
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
//允许跨域访问
Axios.prototype.withCredentials=true
/* eslint-disable no-new */
Vue.prototype.$axios=Axios;   //原型结构  在其他组件中可以直接引用
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
})
