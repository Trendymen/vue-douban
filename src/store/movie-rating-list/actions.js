import {doubanRequest, APILimitError} from '../../jsModule/jsonPrequest'
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
    if (type === 'in_theaters' || 'coming_soon') {
      params = {
        city: await dispatch('getCityName', null, {root: true}),
        ...params
      }
    }
    isPromise(isRequesting[type]) && !refresh && await isRequesting[type]
    const beforeCount = state[type].length
    isRequesting[type] = doubanRequest(`/movie/${type}`, {
      params: {
        ...params,
        start: refresh ? 0 : state[type].length,
        count: params.count || 10
      }
    })
    try {
      const {body: {total, subjects: {length: resNum}, subjects: subjects}} = await isRequesting[type]
      commit('setRatingList', {type, refresh, data: subjects})
      isRequesting[type] = undefined
      return {
        isEnd: !(state[type].length < total)
      }
    } catch (e) {
      isRequesting[type] = undefined
      if (e instanceof APILimitError) {
        console.log(e)
        return {
          error: true,
          isEnd: false
        }
      }
    }
  }
}
