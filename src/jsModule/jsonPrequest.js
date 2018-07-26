import Vue from 'vue'

export function APILimitError (msg) {
  this.name = 'APILimitError'
  this.message = msg
  this.stack = (new Error()).stack
}

APILimitError.prototype = Object.create(Error.prototype)
APILimitError.prototype.constructor = APILimitError

let tryCount = 0

const returnData = data => {
  tryCount = 0
  return data
}

const handleError = error => {
  if (tryCount < 5) {
    tryCount++
  } else {
    setTimeout(() => {
      tryCount = 0
    }, 1000)
  }
  throw new APILimitError('API访问次数达到上限')
}

export function doubanRequest (path, options) {
  return Vue.http.jsonp(`https://api.douban.com/v2${path}`, options)
    .then(returnData, handleError)
}
