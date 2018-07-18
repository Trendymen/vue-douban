import getCityInfo from '../jsModule/getCityName'
import isPromise from '../jsModule/isPromise'

let getCityPromise = null

export default {
  async getCityName ({commit, dispatch, state}, refresh = false) {
    if (state.city !== undefined && !refresh) return Promise.resolve({city: state.city})
    if (!isPromise(getCityPromise)) getCityPromise = getCityInfo()
    const city = await getCityPromise
    commit('changeCity', { city: String(city).slice(-1) === '市' ? city.slice(0, -1) : city })
    getCityPromise = null
    return city
  }
}
