'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // 本地


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mockConfig = require('./../mock/mockConfig.js');

var _mockConfig2 = _interopRequireDefault(_mockConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    isCheckLogin = false;
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
  // var deviceInfo = getApp().getDeviceInfo()
  var deviceInfo = {};
  console.log(deviceInfo);
  var cookieObj = {
    // 'tg_auth': token,
    // '_v': config._v,
    // 'wxv': deviceInfo.version,
    // '_s': `${deviceInfo.platform.toLowerCase()}_wxminiprogram`,
    // '_sys': deviceInfo.system.toLowerCase(),
    // '_gps': deviceInfo.gps || ''
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
    if (token || !option.isCheckLogin) {
      LOG('get token', token);
      requestBefore(option, token);
      if (isMock) {
        console.log(option.url, _mockConfig2.default[option.url]);
        option.success(require('../mock/' + _mockConfig2.default[option.url]));
        console.log(require('../mock/' + _mockConfig2.default[option.url]));
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
  mockConfig: _mockConfig2.default,
  DOMAIN: DOMAIN,
  isMock: isMock,
  wxPromisify: wxPromisify,
  request: wxPromisify(request)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsIm1ldGhvZCIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMs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QWlDSSxVQUFDQyxLQUFELEVBQVc7QUFDbEJwRCxRQUFJLGFBQUosRUFBbUJvRCxLQUFuQjtBQUNELEdBbkNJLENBQVA7QUFvQ0QsQ0EvQ0Q7O0FBaURBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGtDQURlO0FBRWYzRCxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmUSwwQkFKZTtBQUtmOEIsV0FBUzlCLFlBQVk4QixPQUFaO0FBTE0sQ0FBakIiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmnKzlnLBcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgbW9ja0NvbmZpZyBmcm9tICcuLi9tb2NrL21vY2tDb25maWcnXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKVxudmFyIGlzTW9jayA9IGNvbmZpZy5pc01vY2sgfHwgZmFsc2VcbnZhciBET01BSU4gPSBjb25maWcuRE9NQUlOIHx8ICcnXG52YXIgY29kZSA9ICcnXG52YXIgaXNMb2dpbkluZyA9IGZhbHNlXG52YXIgbG9naW5Db2xsZWN0T3B0aW9ucyA9IFtdIC8vIOivt+axguaQnOmbhuWZqFxudmFyIExPRyA9IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSlcblxuLyoqXG4gKiDlsIHoo4V3eFByb21pc2VmeVxuICovXG52YXIgd3hQcm9taXNpZnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSwgaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja0xvZ2luID0gZmFsc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzQ2hlY2tMb2dpbiA9IGlzQ2hlY2tMb2dpblxuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICAgIGZuKG9iailcbiAgICB9KVxuICB9XG59XG4vKipcbiAqIOeZu+mZhuWJjeeahOWHhuWkh1xuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqIEBwYXJhbSB7Kn0gdG9rZW5cbiAqL1xudmFyIHJlcXVlc3RCZWZvcmUgPSAob3B0aW9uLCB0b2tlbikgPT4ge1xuICAhb3B0aW9uLmRhdGEgJiYgKG9wdGlvbi5kYXRhID0ge30pXG5cbiAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICAvLyB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICB2YXIgZGV2aWNlSW5mbyA9IHt9XG4gIGNvbnNvbGUubG9nKGRldmljZUluZm8pXG4gIHZhciBjb29raWVPYmogPSB7XG4gICAgLy8gJ3RnX2F1dGgnOiB0b2tlbixcbiAgICAvLyAnX3YnOiBjb25maWcuX3YsXG4gICAgLy8gJ3d4dic6IGRldmljZUluZm8udmVyc2lvbixcbiAgICAvLyAnX3MnOiBgJHtkZXZpY2VJbmZvLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCl9X3d4bWluaXByb2dyYW1gLFxuICAgIC8vICdfc3lzJzogZGV2aWNlSW5mby5zeXN0ZW0udG9Mb3dlckNhc2UoKSxcbiAgICAvLyAnX2dwcyc6IGRldmljZUluZm8uZ3BzIHx8ICcnXG4gIH1cbiAgb3B0aW9uLmRhdGEgPSB7XG4gICAgLi4ub3B0aW9uLmRhdGEsXG4gICAgLi4uY29va2llT2JqXG4gIH1cbiAgb3B0aW9uLmhlYWRlciA9IHtcbiAgICAnQ29va2llJzogT2JqZWN0LmtleXMoY29va2llT2JqKS5tYXAoKGtleSkgPT4ge1xuICAgICAgcmV0dXJuIGAke2tleX09JHtjb29raWVPYmpba2V5XX1gXG4gICAgfSkuam9pbignOycpXG4gIH1cbiAgLy8g5pSv5LuY572R5YWz5b+F6aG75Yqg5LiK5b+F6KaB5a2X5q61X3Rva2VuXG4gIGlmICgvcGF5bWVudFxcL3NpZ25hdHVyZS8udGVzdChvcHRpb24udXJsKSkge1xuICAgIG9wdGlvbi5kYXRhLl90b2tlbiA9IHRva2VuXG4gIH1cbiAgKG9wdGlvbi5tZXRob2QgIT09ICdQT1NUJykgJiYgKG9wdGlvbi5kYXRhLnByaXZhdGVLZXkgPSB0b2tlbilcbiAgLy8g6K+35rGC5bim5LiK5p2l5rqQXG4gIG9wdGlvbi5kYXRhLmZyb20gPSB3eC5nZXRTdG9yYWdlU3luYygnZnJvbScpXG59XG5cbi8qKlxuICog6K+35rGC5Ye95pWwXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG5cbnZhciByZXF1ZXN0ID0gKG9wdGlvbikgPT4ge1xuICB2YXIgaXNDaGVja1Byb21pc2UgPSBudWxsXG4gIGlmICghb3B0aW9uLmlzQ2hlY2tMb2dpbikge1xuICAgIGlzQ2hlY2tQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCcnKVxuICB9IGVsc2Uge1xuICAgIGlzQ2hlY2tQcm9taXNlID0gd3hDaGVja0xvZ2luKG9wdGlvbilcbiAgfVxuICBpc0NoZWNrUHJvbWlzZS50aGVuKCh0b2tlbikgPT4ge1xuICAgIC8vIHZhciB0b2tlbiA9ICcwNWI4MWFiMmY4ZjZjNmQxNDU4YTBmNTliMjJlOGM5YidcbiAgICBpZiAodG9rZW4gfHwgIW9wdGlvbi5pc0NoZWNrTG9naW4pIHtcbiAgICAgIExPRygnZ2V0IHRva2VuJywgdG9rZW4pXG4gICAgICByZXF1ZXN0QmVmb3JlKG9wdGlvbiwgdG9rZW4pXG4gICAgICBpZiAoaXNNb2NrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbi51cmwsIG1vY2tDb25maWdbb3B0aW9uLnVybF0pXG4gICAgICAgIG9wdGlvbi5zdWNjZXNzKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgICAgIHdlcHkucmVxdWVzdChvcHRpb24pXG4gICAgICB3eC5yZXF1ZXN0KG9wdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgTE9HKCfmnKrnmbvpmYYuLi4nKVxuICAgIH1cbiAgfSwgKCkgPT4ge1xuICAgIExPRygn55m76ZmG5LitLi4uJylcbiAgfSlcbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX3Rva2VuKVxuICB9XG4gIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gIHJldHVybiB3eExvZ2luKG9wdGlvbilcbn1cblxudmFyIGxvZ2luUmVxdWVzdCA9ICgpID0+IHtcbiAgaWYgKCFsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aCkgcmV0dXJuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHJlcXVlc3QobG9naW5Db2xsZWN0T3B0aW9uc1tpXSlcbiAgfVxuICBsb2dpbkNvbGxlY3RPcHRpb25zID0gW11cbn1cblxuLyoqXG4gKiDnmbvlvZVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cbnZhciB3eExvZ2luID0gb3B0aW9uID0+IHtcbiAgLy8g5pCc6ZuG55m75b2V55qEcmVxdWVzdCDov5nmoLfpmLLmraLor7fmsYLlvojlpJrmrKFjb2RlIOmHjeWkjeWkmuasoeeZu+W9lVxuICBsb2dpbkNvbGxlY3RPcHRpb25zLnB1c2gob3B0aW9uKVxuICBpZiAoaXNMb2dpbkluZykge1xuICAgIExPRygn5q2j5Zyo55m76ZmGJylcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0gZWxzZSB7XG4gICAgTE9HKCflvIDlp4vnmbvpmYYnKVxuICAgIGlzTG9naW5JbmcgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gd3hQcm9taXNpZnkod3gubG9naW4pKClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29kZSA9IHJlcy5jb2RlXG4gICAgICBMT0coJ2dldCBjb2RlJywgY29kZSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5nZXRVc2VySW5mbykoe1xuICAgICAgICBsYW5nOiAnemhfQ04nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBMT0coJ2dldCB1c2VySW5mbycsIHJlcylcbiAgICAgIGxldCBfZGF0YSA9IHtcbiAgICAgICAgdXJsOiBET01BSU4gKyAnL3BhcnR5L2xvZ2luJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgZW5jcnlwdGVkRGF0YTogcmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgaXY6IHJlcy5pdlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gICAgICByZXR1cm4gd3hQcm9taXNpZnkod3gucmVxdWVzdCkoX2RhdGEpXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgTE9HKCdsb2dpbiBzdWNjJywgcmVzKVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YSlcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICAgIGxvZ2luUmVxdWVzdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0coJ2xvZ2luIGZhaWwnLCByZXMpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBMT0coJ2xvZ2luIGVycm9yJywgZXJyb3IpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vY2tDb25maWcsXG4gIERPTUFJTixcbiAgaXNNb2NrLFxuICB3eFByb21pc2lmeSxcbiAgcmVxdWVzdDogd3hQcm9taXNpZnkocmVxdWVzdClcbn1cbiJdfQ==