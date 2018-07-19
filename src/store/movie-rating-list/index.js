import actions from './actions'
import type from '../../assets/json/movie-rating-type'
import Vue from 'vue'

const makeListState = (type) => {
  const obj = {}
  type.forEach(item => {
    obj[item] = []
  })
  return obj
}

export default {
  namespaced: true,
  state: {
    ...makeListState(type)
  },

  mutations: {
    setRatingList (state, {type, data, refresh}) {
      refresh ? state[type] = data
        : state[type].push(...data)
    }
  },
  actions
}
