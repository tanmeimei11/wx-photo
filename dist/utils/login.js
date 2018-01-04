'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// 本地
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
    var isNotCheck = arguments[1];

    return new Promise(function (resolve, reject) {
      obj.isNotCheck = isNotCheck;
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
  if (option.isNotCheck) {
    isCheckPromise = Promise.resolve('');
  } else {
    isCheckPromise = wxCheckLogin(option);
  }
  isCheckPromise.then(function (token) {
    // var token = '05b81ab2f8f6c6d1458a0f59b22e8c9b'
    if (token || option.isNotCheck) {
      LOG('get token', token);
      requestBefore(option, token);
      if (isMock) {
        option.success(require('../mock/' + mockConfig[option.url]));
        return;
      }
      LOG('start request option:', option);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIm1vY2tDb25maWciLCJyZXF1aXJlIiwiY29uZmlnIiwiaXNNb2NrIiwiRE9NQUlOIiwiY29kZSIsImlzTG9naW5JbmciLCJsb2dpbkNvbGxlY3RPcHRpb25zIiwiTE9HIiwiY29uc29sZSIsImxvZyIsInd4UHJvbWlzaWZ5IiwiZm4iLCJvYmoiLCJpc05vdENoZWNrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdWNjZXNzIiwicmVzIiwiZGF0YSIsImZhaWwiLCJyZXF1ZXN0QmVmb3JlIiwib3B0aW9uIiwidG9rZW4iLCJ0ZXN0IiwidXJsIiwiZGV2aWNlSW5mbyIsImdldEFwcCIsImdldERldmljZUluZm8iLCJjb29raWVPYmoiLCJfdiIsInZlcnNpb24iLCJwbGF0Zm9ybSIsInRvTG93ZXJDYXNlIiwic3lzdGVtIiwiZ3BzIiwiaGVhZGVyIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsImpvaW4iLCJfdG9rZW4iLCJtZXRob2QiLCJwcml2YXRlS2V5IiwiZnJvbSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwiaXNDaGVja1Byb21pc2UiLCJ3eENoZWNrTG9naW4iLCJ0aGVuIiwid3hMb2dpbiIsImxvZ2luUmVxdWVzdCIsImxlbmd0aCIsImkiLCJwdXNoIiwibG9naW4iLCJnZXRVc2VySW5mbyIsImxhbmciLCJlIiwiX2RhdGEiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzdWNjIiwic2V0U3RvcmFnZVN5bmMiLCJjYXRjaCIsImVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVlc3RQcm9taXNpZnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLElBQUlBLGFBQWFDLFFBQVEsb0JBQVIsQ0FBakI7QUFDQSxJQUFJQyxTQUFTRCxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUlFLFNBQVNELE9BQU9DLE1BQVAsSUFBaUIsS0FBOUI7QUFDQSxJQUFJQyxTQUFTRixPQUFPRSxNQUFQ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RDtBQUNELEtBTEQsTUFLTztBQUNMOUMsVUFBSSxZQUFKLEVBQWtCVyxHQUFsQjtBQUNEO0FBQ0YsR0FqQ0ksRUFpQ0ZnRCxLQWpDRSxDQWlDSSxVQUFDQyxLQUFELEVBQVc7QUFDbEI1RCxRQUFJLGFBQUosRUFBbUI0RCxLQUFuQjtBQUNELEdBbkNJLENBQVA7QUFvQ0QsQ0EvQ0Q7O0FBaURBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Z0RSx3QkFEZTtBQUVmSSxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmUSwwQkFKZTtBQUtmNEQsb0JBQWtCNUQsWUFBWXNDLE9BQVo7QUFMSCxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxubGV0IG1vY2tDb25maWcgPSByZXF1aXJlKCcuLi9tb2NrL21vY2tDb25maWcnKVxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJylcbnZhciBpc01vY2sgPSBjb25maWcuaXNNb2NrIHx8IGZhbHNlXG52YXIgRE9NQUlOID0gY29uZmlnLkRPTUFJTiB8fCAnJ1xudmFyIGNvZGUgPSAnJ1xudmFyIGlzTG9naW5JbmcgPSBmYWxzZVxudmFyIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXSAvLyDor7fmsYLmkJzpm4blmahcbnZhciBMT0cgPSBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pXG5cbi8qKlxuICog5bCB6KOFd3hQcm9taXNlZnlcbiAqL1xudmFyIHd4UHJvbWlzaWZ5ID0gKGZuKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30sIGlzTm90Q2hlY2spIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzTm90Q2hlY2sgPSBpc05vdENoZWNrXG4gICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgIH1cbiAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgIH0pXG4gIH1cbn1cbi8qKlxuICog55m76ZmG5YmN55qE5YeG5aSHXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICogQHBhcmFtIHsqfSB0b2tlblxuICovXG52YXIgcmVxdWVzdEJlZm9yZSA9IChvcHRpb24sIHRva2VuKSA9PiB7XG4gICFvcHRpb24uZGF0YSAmJiAob3B0aW9uLmRhdGEgPSB7fSlcbiAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICBjb25zb2xlLmxvZyhkZXZpY2VJbmZvKVxuICB2YXIgY29va2llT2JqID0ge1xuICAgICd0Z19hdXRoJzogdG9rZW4sXG4gICAgJ192JzogY29uZmlnLl92LFxuICAgICd3eHYnOiBkZXZpY2VJbmZvLnZlcnNpb24sXG4gICAgJ19zJzogYCR7ZGV2aWNlSW5mby5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpfV93eG1pbmlwcm9ncmFtYCxcbiAgICAnX3N5cyc6IGRldmljZUluZm8uc3lzdGVtLnRvTG93ZXJDYXNlKCksXG4gICAgJ19ncHMnOiBkZXZpY2VJbmZvLmdwcyB8fCAnJ1xuICB9XG4gIG9wdGlvbi5kYXRhID0ge1xuICAgIC4uLm9wdGlvbi5kYXRhLFxuICAgIC4uLmNvb2tpZU9ialxuICB9XG4gIG9wdGlvbi5oZWFkZXIgPSB7XG4gICAgJ0Nvb2tpZSc6IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICAgIHJldHVybiBgJHtrZXl9PSR7Y29va2llT2JqW2tleV19YFxuICAgIH0pLmpvaW4oJzsnKVxuICB9XG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu+WKoOS4iuW/heimgeWtl+autV90b2tlblxuICBpZiAoL3BheW1lbnRcXC9zaWduYXR1cmUvLnRlc3Qob3B0aW9uLnVybCkpIHtcbiAgICBvcHRpb24uZGF0YS5fdG9rZW4gPSB0b2tlblxuICB9XG4gIChvcHRpb24ubWV0aG9kICE9PSAnUE9TVCcpICYmIChvcHRpb24uZGF0YS5wcml2YXRlS2V5ID0gdG9rZW4pXG4gIC8vIOivt+axguW4puS4iuadpea6kFxuICBvcHRpb24uZGF0YS5mcm9tID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2Zyb20nKVxufVxuXG4vKipcbiAqIOivt+axguWHveaVsFxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xuXG52YXIgcmVxdWVzdCA9IChvcHRpb24pID0+IHtcbiAgdmFyIGlzQ2hlY2tQcm9taXNlID0gbnVsbFxuICBpZiAob3B0aW9uLmlzTm90Q2hlY2spIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgnJylcbiAgfSBlbHNlIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IHd4Q2hlY2tMb2dpbihvcHRpb24pXG4gIH1cbiAgaXNDaGVja1Byb21pc2UudGhlbigodG9rZW4pID0+IHtcbiAgICAvLyB2YXIgdG9rZW4gPSAnMDViODFhYjJmOGY2YzZkMTQ1OGEwZjU5YjIyZThjOWInXG4gICAgaWYgKHRva2VuIHx8IG9wdGlvbi5pc05vdENoZWNrKSB7XG4gICAgICBMT0coJ2dldCB0b2tlbicsIHRva2VuKVxuICAgICAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICAgICAgaWYgKGlzTW9jaykge1xuICAgICAgICBvcHRpb24uc3VjY2VzcyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgICAgIHd4LnJlcXVlc3Qob3B0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBMT0coJ+acqueZu+mZhi4uLicpXG4gICAgfVxuICB9LCAoKSA9PiB7XG4gICAgTE9HKCfnmbvpmYbkuK0uLi4nKVxuICB9KVxufVxuXG4vKipcbiAqIOajgOafpeeZu+mZhuaAgeWSjHRva2VuXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAg6K+35rGC5a2X5q61IOW9k+ebkea1i+WIsOayoeacieeZu+W9leaXtiDkv53lrZhvcHRpb24g55m76ZmG5a6M5oiQ5ZCO57un57ut6K+35rGCXG4gKiDnlLHkuo5jaGVja3NzaW9u5o6l5Y+jIOacieeahOaXtuWAmSDkuIDnm7Tov5vljrtmYWlsIOaJgOS7pSDlj5bmtojmjonmo4Dmn6XnmoTov5nkuIDmraVcbiAqL1xudmFyIHd4Q2hlY2tMb2dpbiA9IG9wdGlvbiA9PiB7XG4gIExPRygnY2hlY2sgdG9rZW4nKVxuICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgaWYgKF90b2tlbikge1xuICAgIExPRygndG9rZW4gc3VjYzonLCBfdG9rZW4pXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfdG9rZW4pXG4gIH1cbiAgTE9HKCd0b2tlbiBmYWlsOicsIF90b2tlbilcbiAgcmV0dXJuIHd4TG9naW4ob3B0aW9uKVxufVxuXG52YXIgbG9naW5SZXF1ZXN0ID0gKCkgPT4ge1xuICBpZiAoIWxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoKSByZXR1cm5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVxdWVzdChsb2dpbkNvbGxlY3RPcHRpb25zW2ldKVxuICB9XG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXVxufVxuXG4vKipcbiAqIOeZu+W9lVxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xudmFyIHd4TG9naW4gPSBvcHRpb24gPT4ge1xuICAvLyDmkJzpm4bnmbvlvZXnmoRyZXF1ZXN0IOi/meagt+mYsuatouivt+axguW+iOWkmuasoWNvZGUg6YeN5aSN5aSa5qyh55m75b2VXG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMucHVzaChvcHRpb24pXG4gIGlmIChpc0xvZ2luSW5nKSB7XG4gICAgTE9HKCfmraPlnKjnmbvpmYYnKVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSBlbHNlIHtcbiAgICBMT0coJ+W8gOWni+eZu+mZhicpXG4gICAgaXNMb2dpbkluZyA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB3eFByb21pc2lmeSh3eC5sb2dpbikoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb2RlID0gcmVzLmNvZGVcbiAgICAgIExPRygnZ2V0IGNvZGUnLCBjb2RlKVxuICAgICAgcmV0dXJuIHd4UHJvbWlzaWZ5KHd4LmdldFVzZXJJbmZvKSh7XG4gICAgICAgIGxhbmc6ICd6aF9DTidcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIExPRygnZ2V0IHVzZXJJbmZvJywgcmVzKVxuICAgICAgbGV0IF9kYXRhID0ge1xuICAgICAgICB1cmw6IERPTUFJTiArICcvcGFydHkvbG9naW4nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhOiByZXMuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICBpdjogcmVzLml2XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIExPRygnbG9naW4nLCBfZGF0YSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5yZXF1ZXN0KShfZGF0YSlcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICBMT0coJ2xvZ2luIHN1Y2MnLCByZXMpXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhKVxuICAgICAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgICAgICAgbG9naW5SZXF1ZXN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIExPRygnbG9naW4gZmFpbCcsIHJlcylcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIExPRygnbG9naW4gZXJyb3InLCBlcnJvcilcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0UHJvbWlzaWZ5OiB3eFByb21pc2lmeShyZXF1ZXN0KVxufVxuIl19