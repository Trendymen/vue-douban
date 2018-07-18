export default function requestPromiseExist (variable) {
  return variable && (variable instanceof Promise || typeof variable.then === 'function')
}
