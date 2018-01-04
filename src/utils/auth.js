var wxPromisify = require('common.js').wxPromisify

/**
 * 方法promise化
 */
var authPromisify = [
  'login', 'getUserInfo', 'authorize', 'getSetting', 'startRecord', 'stopRecord',
  'showModal', 'openSetting'
].reduce((acc, cur) => {
  acc[cur] = wxPromisify(wx[cur])

  return acc
}, {
  wxPromisify: wxPromisify
})

/**
 *
 * @param {*} key  授权的信息
 * @param {*} isforce 强制授权会循环弹窗
 */
function get(key, isforce, gps) {
  var scope = 'scope.' + key
  return new Promise((authRes, authRej) => {
    authPromisify.getSetting().then(res => {
      console.log(res)
      if (res.authSetting[scope]) {
        authRes(true)
      } else {
        console.log(scope)
        authPromisify.authorize({
          scope: scope
        }).then(suc => {
          console.log('suc', suc)
          authRes(suc)
        }, rej => {
          console.log('rej', rej)
          reGet(scope, authRes, isforce, gps)
        })
      }
    })
  })
}

/**
 *
 * @param {*} scope 授权信息
 * @param {*} authRes 回调
 * @param {*} isforce 强制弹窗
 */
function reGet(scope, authRes, isforce, gps) {
  authPromisify.showModal({
    title: gps ? '请在设置中打开地理位置授权' : '请在设置中打开用户信息授权',
    content: gps ? '未获取您的地理位置将无法使用离我最近功能' : '未获取您的公开信息（昵称、头像等）将无法使用鼓励金和报名活动',
    confirmText: '去设置',
    showCancel: true
  }).then((a) => {
    if (a.confirm) {
      authPromisify.openSetting().then((r) => {
        console.log('r', r)
        authPromisify.getSetting().then(res => {
          console.log('res', res)
          if (r.authSetting[scope] || res.authSetting[scope]) {
            console.log('succ')
            authRes()
          } else {
            if (isforce) {
              setTimeout(() => {
                reGet(scope, authRes, isforce)
              }, 100)
            }
          }
        })
      })
    }
  })
}

module.exports = {
  get
}
