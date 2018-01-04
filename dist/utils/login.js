'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // 本地


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockConfig = require('./../mock/mockConfig.js');
var config = require('./config.js');
var isMock = config.isMock || false;
var DOMAIN = config.DOMAIN || '';
var code = '';
var isLoginIng = false;
var loginCollectOptions = []; // 请求搜集器
var LOG = console.log || function () {};

/**
 * 封装wxPromisefy
 */
var wxPromisify = function wxPromisify(fn) {
  return function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isCheckLogin = arguments[1];

    return new Promise(function (resolve, reject) {
      obj.isCheckLogin = isCheckLogin;
      obj.success = function (res) {
        if (res.data) {
          resolve(res.data);
        }
        resolve(res);
      };
      obj.fail = function (res) {
        reject(res);
      };
      fn(obj);
    });
  };
};
/**
 * 登陆前的准备
 * @param {*} option
 * @param {*} token
 */
var requestBefore = function requestBefore(option, token) {
  !option.data && (option.data = {});
  !/^http/.test(option.url) && (option.url = DOMAIN + option.url);
  // 添加必要的辅助字断
  var deviceInfo = getApp().getDeviceInfo();
  console.log(deviceInfo);
  var cookieObj = {
    'tg_auth': token,
    '_v': config._v,
    'wxv': deviceInfo.version,
    '_s': deviceInfo.platform.toLowerCase() + '_wxminiprogram',
    '_sys': deviceInfo.system.toLowerCase(),
    '_gps': deviceInfo.gps || ''
  };
  option.data = _extends({}, option.data, cookieObj);
  option.header = {
    'Cookie': Object.keys(cookieObj).map(function (key) {
      return key + '=' + cookieObj[key];
    }).join(';')
    // 支付网关必须加上必要字段_token
  };if (/payment\/signature/.test(option.url)) {
    option.data._token = token;
  }
  option.method !== 'POST' && (option.data.privateKey = token);
  // 请求带上来源
  option.data.from = wx.getStorageSync('from');
};

/**
 * 请求函数
 * @param {*} option
 */

var request = function request(option) {
  var isCheckPromise = null;
  if (!option.isCheckLogin) {
    isCheckPromise = Promise.resolve('');
  } else {
    isCheckPromise = wxCheckLogin(option);
  }
  isCheckPromise.then(function (token) {
    // var token = '05b81ab2f8f6c6d1458a0f59b22e8c9b'
    if (token || option.isCheckLogin) {
      LOG('get token', token);
      requestBefore(option, token);
      if (isMock) {
        option.success(require('../mock/' + mockConfig[option.url]));
        return;
      }
      LOG('start request option:', option);
      _wepy2.default.request(option);
      wx.request(option);
    } else {
      LOG('未登陆...');
    }
  }, function () {
    LOG('登陆中...');
  });
};

/**
 * 检查登陆态和token
 * @param {*} option  请求字段 当监测到没有登录时 保存option 登陆完成后继续请求
 * 由于checkssion接口 有的时候 一直进去fail 所以 取消掉检查的这一步
 */
var wxCheckLogin = function wxCheckLogin(option) {
  LOG('check token');
  var _token = wx.getStorageSync('token');
  if (_token) {
    LOG('token succ:', _token);
    return Promise.resolve(_token);
  }
  LOG('token fail:', _token);
  return wxLogin(option);
};

var loginRequest = function loginRequest() {
  if (!loginCollectOptions.length) return;
  for (var i = 0; i < loginCollectOptions.length; i++) {
    request(loginCollectOptions[i]);
  }
  loginCollectOptions = [];
};

/**
 * 登录
 * @param {*} option
 */
var wxLogin = function wxLogin(option) {
  // 搜集登录的request 这样防止请求很多次code 重复多次登录
  loginCollectOptions.push(option);
  if (isLoginIng) {
    LOG('正在登陆');
    return Promise.reject(); // eslint-disable-line
  } else {
    LOG('开始登陆');
    isLoginIng = true;
  }

  return wxPromisify(wx.login)().then(function (res) {
    code = res.code;
    LOG('get code', code);
    return wxPromisify(wx.getUserInfo)({
      lang: 'zh_CN'
    }).then(function (res) {
      return res;
    }, function (e) {
      isLoginIng = false;
    });
  }).then(function (res) {
    LOG('get userInfo', res);
    var _data = {
      url: DOMAIN + '/party/login',
      data: {
        code: code,
        encryptedData: res.encryptedData,
        iv: res.iv
      }
    };
    LOG('login', _data);
    return wxPromisify(wx.request)(_data);
  }).then(function (res) {
    if (res.succ && res.data) {
      LOG('login succ', res);
      wx.setStorageSync('token', res.data);
      isLoginIng = false;
      loginRequest();
    } else {
      LOG('login fail', res);
    }
  }).catch(function (error) {
    LOG('login error', error);
  });
};

module.exports = {
  mockConfig: mockConfig,
  DOMAIN: DOMAIN,
  isMock: isMock,
  wxPromisify: wxPromisify,
  requestPromisify: wxPromisify(request)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIm1vY2tDb25maWciLCJyZXF1aXJlIiwiY29uZmlnIiwiaXNNb2NrIiwiRE9NQUlOIiwiY29kZSIsImlzTG9naW5JbmciLCJsb2dpbkNvbGxlY3RPcHRpb25zIiwiTE9HIiwiY29uc29sZSIsImxvZyIsInd4UHJvbWlzaWZ5IiwiZm4iLCJvYmoiLCJpc0NoZWNrTG9naW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwiZmFpbCIsInJlcXVlc3RCZWZvcmUiLCJvcHRpb24iLCJ0b2tlbiIsInRlc3QiLCJ1cmwiLCJkZXZpY2VJbmZvIiwiZ2V0QXBwIiwiZ2V0RGV2aWNlSW5mbyIsImNvb2tpZU9iaiIsIl92IiwidmVyc2lvbiIsInBsYXRmb3JtIiwidG9Mb3dlckNhc2UiLCJzeXN0ZW0iLCJncHMiLCJoZWFkZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsIm1ldGhvZCIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWVzdFByb21pc2lmeSJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7OztBQUNBOzs7Ozs7QUFDQSxJQUFJQSxhQUFhQyxRQUFRLG9CQUFSLENBQWpCO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxVQUFSLENBQWI7QUFDQSxJQUFJRSxTQUFTRCxPQUFPQyxNQUFQLElBQWlCLEtBQTlCO0FBQ0EsSUFBSUMsU0FB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T0FBbEIsRUFBMkIvQyxJQUFJQyxJQUEvQjtBQUNBZCxtQkFBYSxLQUFiO0FBQ0FnRDtBQUNELEtBTEQsTUFLTztBQUNMOUMsVUFBSSxZQUFKLEVBQWtCVyxHQUFsQjtBQUNEO0FBQ0YsR0FqQ0ksRUFpQ0ZnRCxLQWpDRSxDQWlDSSxVQUFDQyxLQUFELEVBQVc7QUFDbEI1RCxRQUFJLGFBQUosRUFBbUI0RCxLQUFuQjtBQUNELEdBbkNJLENBQVA7QUFvQ0QsQ0EvQ0Q7O0FBaURBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Z0RSx3QkFEZTtBQUVmSSxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmUSwwQkFKZTtBQUtmNEQsb0JBQWtCNUQsWUFBWXNDLE9BQVo7QUFMSCxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmxldCBtb2NrQ29uZmlnID0gcmVxdWlyZSgnLi4vbW9jay9tb2NrQ29uZmlnJylcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBpc0xvZ2luSW5nID0gZmFsc2VcbnZhciBsb2dpbkNvbGxlY3RPcHRpb25zID0gW10gLy8g6K+35rGC5pCc6ZuG5ZmoXG52YXIgTE9HID0gY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KVxuXG4vKipcbiAqIOWwgeijhXd4UHJvbWlzZWZ5XG4gKi9cbnZhciB3eFByb21pc2lmeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9LCBpc0NoZWNrTG9naW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzQ2hlY2tMb2dpbiA9IGlzQ2hlY2tMb2dpblxuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICAgIGZuKG9iailcbiAgICB9KVxuICB9XG59XG4vKipcbiAqIOeZu+mZhuWJjeeahOWHhuWkh1xuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqIEBwYXJhbSB7Kn0gdG9rZW5cbiAqL1xudmFyIHJlcXVlc3RCZWZvcmUgPSAob3B0aW9uLCB0b2tlbikgPT4ge1xuICAhb3B0aW9uLmRhdGEgJiYgKG9wdGlvbi5kYXRhID0ge30pXG4gICEvXmh0dHAvLnRlc3Qob3B0aW9uLnVybCkgJiYgKG9wdGlvbi51cmwgPSBET01BSU4gKyBvcHRpb24udXJsKVxuICAvLyDmt7vliqDlv4XopoHnmoTovoXliqnlrZfmlq1cbiAgdmFyIGRldmljZUluZm8gPSBnZXRBcHAoKS5nZXREZXZpY2VJbmZvKClcbiAgY29uc29sZS5sb2coZGV2aWNlSW5mbylcbiAgdmFyIGNvb2tpZU9iaiA9IHtcbiAgICAndGdfYXV0aCc6IHRva2VuLFxuICAgICdfdic6IGNvbmZpZy5fdixcbiAgICAnd3h2JzogZGV2aWNlSW5mby52ZXJzaW9uLFxuICAgICdfcyc6IGAke2RldmljZUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKX1fd3htaW5pcHJvZ3JhbWAsXG4gICAgJ19zeXMnOiBkZXZpY2VJbmZvLnN5c3RlbS50b0xvd2VyQ2FzZSgpLFxuICAgICdfZ3BzJzogZGV2aWNlSW5mby5ncHMgfHwgJydcbiAgfVxuICBvcHRpb24uZGF0YSA9IHtcbiAgICAuLi5vcHRpb24uZGF0YSxcbiAgICAuLi5jb29raWVPYmpcbiAgfVxuICBvcHRpb24uaGVhZGVyID0ge1xuICAgICdDb29raWUnOiBPYmplY3Qua2V5cyhjb29raWVPYmopLm1hcCgoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gYCR7a2V5fT0ke2Nvb2tpZU9ialtrZXldfWBcbiAgICB9KS5qb2luKCc7JylcbiAgfVxuICAvLyDmlK/ku5jnvZHlhbPlv4XpobvliqDkuIrlv4XopoHlrZfmrrVfdG9rZW5cbiAgaWYgKC9wYXltZW50XFwvc2lnbmF0dXJlLy50ZXN0KG9wdGlvbi51cmwpKSB7XG4gICAgb3B0aW9uLmRhdGEuX3Rva2VuID0gdG9rZW5cbiAgfVxuICAob3B0aW9uLm1ldGhvZCAhPT0gJ1BPU1QnKSAmJiAob3B0aW9uLmRhdGEucHJpdmF0ZUtleSA9IHRva2VuKVxuICAvLyDor7fmsYLluKbkuIrmnaXmupBcbiAgb3B0aW9uLmRhdGEuZnJvbSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdmcm9tJylcbn1cblxuLyoqXG4gKiDor7fmsYLlh73mlbBcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cblxudmFyIHJlcXVlc3QgPSAob3B0aW9uKSA9PiB7XG4gIHZhciBpc0NoZWNrUHJvbWlzZSA9IG51bGxcbiAgaWYgKCFvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoJycpXG4gIH0gZWxzZSB7XG4gICAgaXNDaGVja1Byb21pc2UgPSB3eENoZWNrTG9naW4ob3B0aW9uKVxuICB9XG4gIGlzQ2hlY2tQcm9taXNlLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgLy8gdmFyIHRva2VuID0gJzA1YjgxYWIyZjhmNmM2ZDE0NThhMGY1OWIyMmU4YzliJ1xuICAgIGlmICh0b2tlbiB8fCBvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgICBMT0coJ2dldCB0b2tlbicsIHRva2VuKVxuICAgICAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICAgICAgaWYgKGlzTW9jaykge1xuICAgICAgICBvcHRpb24uc3VjY2VzcyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgICAgIHdlcHkucmVxdWVzdChvcHRpb24pXG4gICAgICB3eC5yZXF1ZXN0KG9wdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgTE9HKCfmnKrnmbvpmYYuLi4nKVxuICAgIH1cbiAgfSwgKCkgPT4ge1xuICAgIExPRygn55m76ZmG5LitLi4uJylcbiAgfSlcbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX3Rva2VuKVxuICB9XG4gIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gIHJldHVybiB3eExvZ2luKG9wdGlvbilcbn1cblxudmFyIGxvZ2luUmVxdWVzdCA9ICgpID0+IHtcbiAgaWYgKCFsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aCkgcmV0dXJuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHJlcXVlc3QobG9naW5Db2xsZWN0T3B0aW9uc1tpXSlcbiAgfVxuICBsb2dpbkNvbGxlY3RPcHRpb25zID0gW11cbn1cblxuLyoqXG4gKiDnmbvlvZVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cbnZhciB3eExvZ2luID0gb3B0aW9uID0+IHtcbiAgLy8g5pCc6ZuG55m75b2V55qEcmVxdWVzdCDov5nmoLfpmLLmraLor7fmsYLlvojlpJrmrKFjb2RlIOmHjeWkjeWkmuasoeeZu+W9lVxuICBsb2dpbkNvbGxlY3RPcHRpb25zLnB1c2gob3B0aW9uKVxuICBpZiAoaXNMb2dpbkluZykge1xuICAgIExPRygn5q2j5Zyo55m76ZmGJylcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0gZWxzZSB7XG4gICAgTE9HKCflvIDlp4vnmbvpmYYnKVxuICAgIGlzTG9naW5JbmcgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gd3hQcm9taXNpZnkod3gubG9naW4pKClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29kZSA9IHJlcy5jb2RlXG4gICAgICBMT0coJ2dldCBjb2RlJywgY29kZSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5nZXRVc2VySW5mbykoe1xuICAgICAgICBsYW5nOiAnemhfQ04nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBMT0coJ2dldCB1c2VySW5mbycsIHJlcylcbiAgICAgIGxldCBfZGF0YSA9IHtcbiAgICAgICAgdXJsOiBET01BSU4gKyAnL3BhcnR5L2xvZ2luJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgZW5jcnlwdGVkRGF0YTogcmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgaXY6IHJlcy5pdlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gICAgICByZXR1cm4gd3hQcm9taXNpZnkod3gucmVxdWVzdCkoX2RhdGEpXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgTE9HKCdsb2dpbiBzdWNjJywgcmVzKVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YSlcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICAgIGxvZ2luUmVxdWVzdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0coJ2xvZ2luIGZhaWwnLCByZXMpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBMT0coJ2xvZ2luIGVycm9yJywgZXJyb3IpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vY2tDb25maWcsXG4gIERPTUFJTixcbiAgaXNNb2NrLFxuICB3eFByb21pc2lmeSxcbiAgcmVxdWVzdFByb21pc2lmeTogd3hQcm9taXNpZnkocmVxdWVzdClcbn1cbiJdfQ==