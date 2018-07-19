import vuex from 'vuex'
import Vue from 'vue'

// APP mutations and actions
import mutations from './mutations'
import actions from './actions'

// module
import movieRatingList from './movie-rating-list'

Vue.use(vuex)

export default new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    vmin: 0,
    city: undefined,
    backUrl: ''
  },
  mutations,
  actions,
  modules: {
    movieRatingList
  }
})
