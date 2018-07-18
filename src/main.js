// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'intersection-observer'
import 'es6-promise/auto'

import Vue from 'vue'
import router from './router'
import store from './store/index'

import vueResource from 'vue-resource'
import lazyLoad from 'vue-lazyload/vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

Vue.use(vueResource)
Vue.use(lazyLoad, {
  preLoad: 1.5,
  attempt: 5
  // lazyComponent:true
})
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App}
})

