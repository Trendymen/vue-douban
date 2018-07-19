import Vue from 'vue'

export function doubanRequest (path, options) {
  return Vue.http.jsonp(`https://api.douban.com/v2${path}`, options)
    .then((data) => {
      return data
    }, (error) => {
      console.log(error)
    })
}
