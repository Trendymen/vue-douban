import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/home'
import allMovieList from '../pages/movies-explore/movies-explore.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        toHome: false
      }
    },
    {
      path: '/explore/:type',
      name: 'movies-explore',
      component: allMovieList,
      props: (route) => ({
        type: route.params.type
      })
    }
  ],
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})


export default router
