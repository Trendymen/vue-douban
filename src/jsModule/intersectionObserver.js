const IOApi = function () {
  return function (ele, options, callback) {
    const threshold = options.threshold
    if (window.IntersectionObserver) {
      const IO = new IntersectionObserver(callback, options)
      IO.observe(ele)
    } else if (Element.getBoundingClientRect) {
      window.addEventListener('scroll')
    }
  }
}

export default IOApi
