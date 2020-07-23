// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入国际化包:local目录下的index.js
import i18n from './local'
// 引入axios

import axios from 'axios'
import VueAxios from "vue-axios";
// 引入自定义axios配置
import AxiosConfig from "./config/AxiosConfig";

// Vue.prototype.$http = axios
Vue.use(iView)
// 引入view的国际化
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

Vue.use(VueAxios,axios);
AxiosConfig.init(router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})


// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.state.user.username === "") {
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
