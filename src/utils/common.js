/**
 * 封装wxPromisefy
 */
var wxPromisify = (fn) => {
  return function (obj = {}, isNotCheck) {
    return new Promise((resolve, reject) => {
      obj.isNotCheck = isNotCheck
      obj.success = function (res) {
        if (res.data) {
          resolve(res.data)
        }
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}
export {
  wxPromisify
}
