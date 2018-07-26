import AMap from 'AMap'

let Geolocation

try {
  Geolocation = new AMap.Geolocation({})
}
catch (e) {
  console.log('AMP加载失败')
}

export default function () {
  return new Promise((resolve, reject) => {
    Geolocation.getCityInfo((status, result) => {
      console.log(result)
      status === 'complete' && resolve(result.city)
      status === 'error' && reject(result.message)
    })
  })
}
