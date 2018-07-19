import {doubanRequest} from '../../jsModule/jsonPrequest'
import isPromise from '../../jsModule/isPromise'
import type from '../../assets/json/movie-rating-type'

const makeIsRequesting = (type) => {
  const obj = Object.create(null)
  type.forEach(item => {
    obj[item] = null
  })
  return obj
}

const isRequesting = makeIsRequesting(type)

export default {
  // 获取电影排行榜列表
  async getRatingList ({commit, rootState, state, dispatch}, {type, refresh = false, ...params}) {
    const beforeCount = state[type].length;
    (isPromise(isRequesting[type]) && !refresh) || await isRequesting[type]
    if (type === 'in_theaters' || 'coming_soon') {
      params = {
        city: await dispatch('getCityName', null, {root: true}),
        ...params
      }
    }
    isRequesting[type] = doubanRequest(`/movie/${type}`, {
      params: {
        ...params,
        start: refresh ? 0 : state[type].length,
        count: params.count || 10
      }
    })
    const {body: {count, subjects: {length: resNum}, subjects: subjects}} = await isRequesting[type]
    isRequesting[type] = null
    commit('setRatingList', {type, refresh, data: subjects})
    return {
      isEnd: resNum < count
    }
  }
}
