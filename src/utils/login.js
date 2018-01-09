// 本地
import wepy from 'wepy'
import mockConfig from '../mock/mockConfig'
var config = require('./config')
var isMock = config.isMock || false
var DOMAIN = config.DOMAIN || ''
var code = ''
var isLoginIng = false
var loginCollectOptions = [] // 请求搜集器
var LOG = console.log || (() => {})

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
  // 支付网关必须
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

var request = async function (option, isCheckLogin) {
  // isCheckLogin = option.isCheck
  isCheckLogin = false
  console.log(option, isCheckLogin)
  try {
    var token = wx.getStorageSync('token')
    // if (isCheckLogin === true) {
    //   token = await wxCheckLogin(option)
    // }
    // LOG('get token', token)
  } catch (e) {
    LOG('未登陆...')
  }

  // if (token || !isCheckLogin) {
  requestBefore(option, token)
  if (isMock) {
    return require('../mock/' + mockConfig[option.url]).data
  }
  LOG('start request option:', option)
  var reqRes = await wepy.request(option)
  console.log(reqRes)
  return reqRes.data
  // }
}

/**
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

var loginRequest = async() => {
  if (!loginCollectOptions.length) return
  for (var i = 0; i < loginCollectOptions.length; i++) {
    await request(loginCollectOptions[i])
  }
  loginCollectOptions = []
}

/**
 * 登录
 * @param {*} option
 */
var wxLogin = async option => {
  // 搜集登录的request 这样防止请求很多次code 重复多次登录
  loginCollectOptions.push(option)
  if (isLoginIng) {
    LOG('正在登陆')
    return ''
  } else {
    LOG('开始登陆')
    isLoginIng = true
  }

  var loginRes = await wepy.login()
  code = loginRes.code
  LOG('get code', code)

  try {
    var userInfoRes = await wepy.getUserInfo({
      lang: 'zh_CN'
    })
    LOG('get userInfo', userInfoRes)
  } catch (e) {
    isLoginIng = false
  }

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
    isLoginIng = false
    // await loginRequest()
    return reqRes.data
  } else {
    LOG('login fail', reqRes)
    return ''
  }
}

module.exports = {
  mockConfig,
  DOMAIN,
  isMock,
  wxPromisify,
  request: request,
  wxCheckLogin: wxCheckLogin
}
