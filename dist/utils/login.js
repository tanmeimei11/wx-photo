'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mockConfig = require('./../mock/mockConfig.js');

var _mockConfig2 = _interopRequireDefault(_mockConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 本地
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
  var cookieObj = {
    'tg_auth': token
    // '_v': config._v,
    // 'wxv': deviceInfo.version,
    // '_s': `${deviceInfo.platform.toLowerCase()}_wxminiprogram`,
    // '_sys': deviceInfo.system.toLowerCase(),
    // '_gps': deviceInfo.gps || ''

    // option.data = {
    //   ...option.data,
    //   ...cookieObj
    // }
  };if (!option.header) {
    option.header = {};
  }
  option.header.Cookie = Object.keys(cookieObj).map(function (key) {
    return key + '=' + cookieObj[key];
  }).join(';');
  // 支付网关必须
  // 支付网关必须加上必要字段_token
  if (/payment\/signature/.test(option.url)) {
    option.data._token = token;
  }
  option.data.privateKey = token;
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
    // token = '56ac3adda81246472308cf4351e7ef77'
    token = 'caf11677dbed0fdcd95476d99a936ae5'; // 香香 token
    // token = '8d3c12936d21114f3fe218af9bf9ce76'
    if (token || !option.isCheckLogin) {
      LOG('get token', token);
      requestBefore(option, token);
      if (isMock) {
        option.success(require('../mock/' + _mockConfig2.default[option.url]));
        return;
      }
      LOG('start request option:', option);
      console.log(option);
      // wepy.request(option)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGQTtBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMsR0FB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QjtBQUNmQyxrQ0FEZTtBQUVmM0QsZ0JBRmU7QUFHZkQsZ0JBSGU7QUFJZlEsMEJBSmU7QUFLZjhCLFdBQVM5QixZQUFZOEIsT0FBWjtBQUxNLENBQWpCIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5pys5ZywXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IG1vY2tDb25maWcgZnJvbSAnLi4vbW9jay9tb2NrQ29uZmlnJ1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJylcbnZhciBpc01vY2sgPSBjb25maWcuaXNNb2NrIHx8IGZhbHNlXG52YXIgRE9NQUlOID0gY29uZmlnLkRPTUFJTiB8fCAnJ1xudmFyIGNvZGUgPSAnJ1xudmFyIGlzTG9naW5JbmcgPSBmYWxzZVxudmFyIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXSAvLyDor7fmsYLmkJzpm4blmahcbnZhciBMT0cgPSBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pXG5cbi8qKlxuICog5bCB6KOFd3hQcm9taXNlZnlcbiAqL1xudmFyIHd4UHJvbWlzaWZ5ID0gKGZuKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30sIGlzQ2hlY2tMb2dpbikge1xuICAgIGlzQ2hlY2tMb2dpbiA9IGZhbHNlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG9iai5pc0NoZWNrTG9naW4gPSBpc0NoZWNrTG9naW5cbiAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfVxuICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlamVjdChyZXMpXG4gICAgICB9XG4gICAgICBmbihvYmopXG4gICAgfSlcbiAgfVxufVxuLyoqXG4gKiDnmbvpmYbliY3nmoTlh4blpIdcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKiBAcGFyYW0geyp9IHRva2VuXG4gKi9cbnZhciByZXF1ZXN0QmVmb3JlID0gKG9wdGlvbiwgdG9rZW4pID0+IHtcbiAgIW9wdGlvbi5kYXRhICYmIChvcHRpb24uZGF0YSA9IHt9KVxuXG4gICAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICAvLyB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICB2YXIgZGV2aWNlSW5mbyA9IHt9XG4gIHZhciBjb29raWVPYmogPSB7XG4gICAgJ3RnX2F1dGgnOiB0b2tlblxuICAgIC8vICdfdic6IGNvbmZpZy5fdixcbiAgICAvLyAnd3h2JzogZGV2aWNlSW5mby52ZXJzaW9uLFxuICAgIC8vICdfcyc6IGAke2RldmljZUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKX1fd3htaW5pcHJvZ3JhbWAsXG4gICAgLy8gJ19zeXMnOiBkZXZpY2VJbmZvLnN5c3RlbS50b0xvd2VyQ2FzZSgpLFxuICAgIC8vICdfZ3BzJzogZGV2aWNlSW5mby5ncHMgfHwgJydcbiAgfVxuICAvLyBvcHRpb24uZGF0YSA9IHtcbiAgLy8gICAuLi5vcHRpb24uZGF0YSxcbiAgLy8gICAuLi5jb29raWVPYmpcbiAgLy8gfVxuICBpZiAoIW9wdGlvbi5oZWFkZXIpIHtcbiAgICBvcHRpb24uaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb24uaGVhZGVyLkNvb2tpZSA9IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICByZXR1cm4gYCR7a2V5fT0ke2Nvb2tpZU9ialtrZXldfWBcbiAgfSkuam9pbignOycpXG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu1xuICAvLyDmlK/ku5jnvZHlhbPlv4XpobvliqDkuIrlv4XopoHlrZfmrrVfdG9rZW5cbiAgaWYgKC9wYXltZW50XFwvc2lnbmF0dXJlLy50ZXN0KG9wdGlvbi51cmwpKSB7XG4gICAgb3B0aW9uLmRhdGEuX3Rva2VuID0gdG9rZW5cbiAgfVxuICBvcHRpb24uZGF0YS5wcml2YXRlS2V5ID0gdG9rZW5cbiAgLy8g6K+35rGC5bim5LiK5p2l5rqQXG4gIG9wdGlvbi5kYXRhLmZyb20gPSB3eC5nZXRTdG9yYWdlU3luYygnZnJvbScpXG59XG5cbi8qKlxuICog6K+35rGC5Ye95pWwXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG5cbnZhciByZXF1ZXN0ID0gKG9wdGlvbikgPT4ge1xuICB2YXIgaXNDaGVja1Byb21pc2UgPSBudWxsXG4gIGlmICghb3B0aW9uLmlzQ2hlY2tMb2dpbikge1xuICAgIGlzQ2hlY2tQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCcnKVxuICB9IGVsc2Uge1xuICAgIGlzQ2hlY2tQcm9taXNlID0gd3hDaGVja0xvZ2luKG9wdGlvbilcbiAgfVxuICBpc0NoZWNrUHJvbWlzZS50aGVuKCh0b2tlbikgPT4ge1xuICAgIC8vIHRva2VuID0gJzU2YWMzYWRkYTgxMjQ2NDcyMzA4Y2Y0MzUxZTdlZjc3J1xuICAgIHRva2VuID0gJ2NhZjExNjc3ZGJlZDBmZGNkOTU0NzZkOTlhOTM2YWU1JyAvLyDpppnpppkgdG9rZW5cbiAgICAvLyB0b2tlbiA9ICc4ZDNjMTI5MzZkMjExMTRmM2ZlMjE4YWY5YmY5Y2U3NidcbiAgICBpZiAodG9rZW4gfHwgIW9wdGlvbi5pc0NoZWNrTG9naW4pIHtcbiAgICAgIExPRygnZ2V0IHRva2VuJywgdG9rZW4pXG4gICAgICByZXF1ZXN0QmVmb3JlKG9wdGlvbiwgdG9rZW4pXG4gICAgICBpZiAoaXNNb2NrKSB7XG4gICAgICAgIG9wdGlvbi5zdWNjZXNzKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIExPRygnc3RhcnQgcmVxdWVzdCBvcHRpb246Jywgb3B0aW9uKVxuICAgICAgY29uc29sZS5sb2cob3B0aW9uKVxuICAgICAgLy8gd2VweS5yZXF1ZXN0KG9wdGlvbilcbiAgICAgIHd4LnJlcXVlc3Qob3B0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBMT0coJ+acqueZu+mZhi4uLicpXG4gICAgfVxuICB9LCAoKSA9PiB7XG4gICAgTE9HKCfnmbvpmYbkuK0uLi4nKVxuICB9KVxufVxuXG4vKipcbiAqIOajgOafpeeZu+mZhuaAgeWSjHRva2VuXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAg6K+35rGC5a2X5q61IOW9k+ebkea1i+WIsOayoeacieeZu+W9leaXtiDkv53lrZhvcHRpb24g55m76ZmG5a6M5oiQ5ZCO57un57ut6K+35rGCXG4gKiDnlLHkuo5jaGVja3NzaW9u5o6l5Y+jIOacieeahOaXtuWAmSDkuIDnm7Tov5vljrtmYWlsIOaJgOS7pSDlj5bmtojmjonmo4Dmn6XnmoTov5nkuIDmraVcbiAqL1xudmFyIHd4Q2hlY2tMb2dpbiA9IG9wdGlvbiA9PiB7XG4gIExPRygnY2hlY2sgdG9rZW4nKVxuICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgaWYgKF90b2tlbikge1xuICAgIExPRygndG9rZW4gc3VjYzonLCBfdG9rZW4pXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfdG9rZW4pXG4gIH1cbiAgTE9HKCd0b2tlbiBmYWlsOicsIF90b2tlbilcbiAgcmV0dXJuIHd4TG9naW4ob3B0aW9uKVxufVxuXG52YXIgbG9naW5SZXF1ZXN0ID0gKCkgPT4ge1xuICBpZiAoIWxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoKSByZXR1cm5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVxdWVzdChsb2dpbkNvbGxlY3RPcHRpb25zW2ldKVxuICB9XG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXVxufVxuXG4vKipcbiAqIOeZu+W9lVxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xudmFyIHd4TG9naW4gPSBvcHRpb24gPT4ge1xuICAvLyDmkJzpm4bnmbvlvZXnmoRyZXF1ZXN0IOi/meagt+mYsuatouivt+axguW+iOWkmuasoWNvZGUg6YeN5aSN5aSa5qyh55m75b2VXG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMucHVzaChvcHRpb24pXG4gIGlmIChpc0xvZ2luSW5nKSB7XG4gICAgTE9HKCfmraPlnKjnmbvpmYYnKVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSBlbHNlIHtcbiAgICBMT0coJ+W8gOWni+eZu+mZhicpXG4gICAgaXNMb2dpbkluZyA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB3eFByb21pc2lmeSh3eC5sb2dpbikoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb2RlID0gcmVzLmNvZGVcbiAgICAgIExPRygnZ2V0IGNvZGUnLCBjb2RlKVxuICAgICAgcmV0dXJuIHd4UHJvbWlzaWZ5KHd4LmdldFVzZXJJbmZvKSh7XG4gICAgICAgIGxhbmc6ICd6aF9DTidcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIExPRygnZ2V0IHVzZXJJbmZvJywgcmVzKVxuICAgICAgbGV0IF9kYXRhID0ge1xuICAgICAgICB1cmw6IERPTUFJTiArICcvcGFydHkvbG9naW4nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhOiByZXMuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICBpdjogcmVzLml2XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIExPRygnbG9naW4nLCBfZGF0YSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5yZXF1ZXN0KShfZGF0YSlcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICBMT0coJ2xvZ2luIHN1Y2MnLCByZXMpXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhKVxuICAgICAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgICAgICAgbG9naW5SZXF1ZXN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIExPRygnbG9naW4gZmFpbCcsIHJlcylcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIExPRygnbG9naW4gZXJyb3InLCBlcnJvcilcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0OiB3eFByb21pc2lmeShyZXF1ZXN0KVxufVxuIl19