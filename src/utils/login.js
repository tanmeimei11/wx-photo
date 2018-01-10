// 本地
import wepy from 'wepy'
import mockConfig from '../mock/mockConfig'
var config = require('./config')
var isMock = config.isMock || false
var DOMAIN = config.DOMAIN || ''
var code = ''
var LOG = console.log || (() => {})
// var LOG = () => {}

/**
 * 封装wxPromisefy
 */
var wxPromisify = (fn) => {
  return function (obj = {}, isCheckLogin) {
    isCheckLogin = false
    return new Promise((resolve, reject) => {
      obj.isCheckLogin = isCheckLogin
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
/**
 * 登陆前的准备
 * @param {*} option
 * @param {*} token
 */
var requestBefore = (option, token) => {
  !option.data && (option.data = {})

  !/^http/.test(option.url) && (option.url = DOMAIN + option.url)
  // 添加必要的辅助字断
  // var deviceInfo = getApp().getDeviceInfo()
  var deviceInfo = {}
  var cookieObj = {
    'tg_auth': token
    // '_v': config._v,
    // 'wxv': deviceInfo.version,
    // '_s': `${deviceInfo.platform.toLowerCase()}_wxminiprogram`,
    // '_sys': deviceInfo.system.toLowerCase(),
    // '_gps': deviceInfo.gps || ''
  }
  // option.data = {
  //   ...option.data,
  //   ...cookieObj
  // }
  if (!option.header) {
    option.header = {}
  }
  option.header.Cookie = Object.keys(cookieObj).map((key) => {
    return `${key}=${cookieObj[key]}`
  }).join(';')
  // 支付网关必须加上必要字段_token
  if (/payment\/signature/.test(option.url)) {
    option.data._token = token
  }
  option.data.privateKey = token
  // 请求带上来源
  option.data.from = wx.getStorageSync('from')
}

/**
 * 请求函数
 * @param {*} option
 */

var request = async function (option) {
  var token = wx.getStorageSync('token') || ''
  requestBefore(option, token)
  if (isMock) {
    return require('../mock/' + mockConfig[option.url]).data
  }
  LOG('start request option:', option)
  var reqRes = await wepy.request(option)
  return reqRes.data
}
/**
 *
 * @param {*} key  授权的信息
 * @param {*} isforce 强制授权会循环弹窗
 */
var getAth = async(key, isforce, gps) => {
  var scope = 'scope.' + key
  var settingRes = await wepy.getSetting()
  console.log(settingRes)
  try {
    if (settingRes.authSetting[scope] === false) { // 拒绝授权
      await showRegetAuthModal(scope, isforce, gps)
    } else if (settingRes.authSetting[scope]) { // 授权成功

    } else { // 从没授权
      await wepy.authorize({
        'scope': scope
      })
    }
  } catch (e) {
    throw new Error()
  }
}

/**
 *
 * @param {*} scope 授权信息
 * @param {*} authRes 回调
 * @param {*} isforce 强制弹窗
 */
var showRegetAuthModal = async(scope, isforce, gps) => {
  try {
    var showModalRes = await wepy.showModal({
      title: gps ? '请在设置中打开地理位置授权' : '请在设置中打开用户信息授权',
      content: gps ? '未获取您的地理位置将无法使用离我最近功能' : '未获取您的公开信息（昵称、头像等）将无法使用鼓励金和报名活动',
      confirmText: '去设置',
      showCancel: true
    })

    if (showModalRes.confirm) {
      var openSettingRes = await wepy.openSetting()
      var settingRes = await wepy.getSetting()
      console.log(openSettingRes, settingRes)
      if (openSettingRes.authSetting[scope] || settingRes.authSetting[scope]) {} else {
        // if (isforce) {
        // setTimeout(() => {
        //   reGet(scope, authRes, isforce)
        // }, 100)
        // }
        throw new Error()
      }
    }
  } catch (e) {
    throw new Error()
  }
}

/**
 * －－－－－－已经废弃－－－－－－－
 * 检查登陆态和token
 * @param {*} option  请求字段 当监测到没有登录时 保存option 登陆完成后继续请求
 * 由于checkssion接口 有的时候 一直进去fail 所以 取消掉检查的这一步
 */
var wxCheckLogin = async option => {
  LOG('check token')
  let _token = wx.getStorageSync('token')
  if (_token) {
    LOG('token succ:', _token)
    return _token
  } else {
    LOG('token fail:', _token)
    return await wxLogin(option)
  }
}
/**
 * 登录
 * @param {*} option
 */
var wxLogin = async option => {
  try {
    // check code
    LOG('check token')
    let _token = wx.getStorageSync('token')
    if (_token) {
      return
    }
    // get code
    var loginRes = await wepy.login()
    code = loginRes.code
    LOG('get code', code)

    // get userInfo
    await getAth('userInfo')
    var userInfoRes = await wepy.getUserInfo({
      lang: 'zh_CN'
    })
    LOG('get userInfo', userInfoRes)

    // get token
    let _data = {
      url: DOMAIN + '/gg/login',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        code: code,
        encryptedData: userInfoRes.encryptedData,
        iv: userInfoRes.iv
      }
    }
    LOG('login', _data)
    var reqRes = await wepy.request(_data)
    reqRes = reqRes.data

    if (reqRes.succ && reqRes.data) {
      LOG('login succ', reqRes)
      wx.setStorageSync('token', reqRes.data)
    } else {
      throw new Error()
    }
  } catch (e) {
    throw new Error()
  }
}

module.exports = {
  mockConfig,
  DOMAIN,
  isMock,
  wxPromisify,
  request: request,
  wxLogin: wxLogin,
  getAth: getAth
}
