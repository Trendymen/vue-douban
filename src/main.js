// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import 'intersection-observer'

import Vue from 'vue'
import store from './store/index'
import router from './router'

import vueResource from 'vue-resource'
import lazyLoad from 'vue-lazyload/vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

import './assets/scss/common.scss'

import App from './App'

Vue.use(vueResource)
Vue.use(infiniteScroll)
Vue.use(lazyLoad, {
  preLoad: 1.5,
  attempt: 5,
  observer: true
  // lazyComponent:true
})
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App}
})
