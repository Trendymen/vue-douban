import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import home from '../pages/home/home'
import allMovieList from '../pages/movies-explore/movies-explore.vue'
import notFound from '../pages/404/404.vue'
import movieRatingType from '../assets/json/movie-rating-type'

Vue.use(Router)

function getAbsolutePath () {
  const matchString = ['/vue-douban/', '/vue-douban/dist/', '/douban/dist/']
  let path = location.pathname
  return matchString.find((item) => path.includes(item)) || '/'
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        toHome: false
      }
    },
    {
      path: `/explore/:type(${movieRatingType.join('|')})`,
      name: 'movies-explore',
      component: allMovieList,
      props: (route) => ({
        type: route.params.type
      })
    },
    {
      name: 'not-found',
      path: '*',
      component: notFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(savedPosition)
        resolve(savedPosition || {x: 0, y: 0})
      }, 400)
    })
  },
  mode: 'hash',
  base: getAbsolutePath()
})

router.beforeEach((to, from, next) => {
  const {name, path} = from
  store.commit('changeBackUrl', {path: !name || path === '/' ? '/' : ''})
  next()
})

export default router
