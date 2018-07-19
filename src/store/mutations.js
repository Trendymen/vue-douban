export default {
  changeVmin (state) {
    state.vmin = Math.min(window.outerHeight, window.outerWidth) / 100
  },
  changeCity (state, {city}) {
    state.city = city
  },
  changeBackUrl (state, {path}) {
    state.backUrl = path
  }
}
