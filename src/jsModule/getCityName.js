import AMap from 'AMap'

const Geolocation = new AMap.Geolocation({})

export default function () {
  return new Promise((resolve, reject) => {
    Geolocation.getCityInfo((status, result) => {
      console.log(result)
      status === 'complete' && resolve(result.city)
      status === 'error' && reject(result.message)
    })
  })
}
