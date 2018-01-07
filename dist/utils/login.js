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
  console.log(deviceInfo);
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
    // token = '56ac3adda81246472308cf4351e7ef77' // 香香 token
    token = 'caf11677dbed0fdcd95476d99a936ae5';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGQTtBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMsR0FB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a0JXLEdBQWxCO0FBQ0Q7QUFDRixHQWpDSSxFQWlDRndDLEtBakNFLENBaUNJLFVBQUNDLEtBQUQsRUFBVztBQUNsQnBELFFBQUksYUFBSixFQUFtQm9ELEtBQW5CO0FBQ0QsR0FuQ0ksQ0FBUDtBQW9DRCxDQS9DRDs7QUFpREFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsa0NBRGU7QUFFZjNELGdCQUZlO0FBR2ZELGdCQUhlO0FBSWZRLDBCQUplO0FBS2Y4QixXQUFTOUIsWUFBWThCLE9BQVo7QUFMTSxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBtb2NrQ29uZmlnIGZyb20gJy4uL21vY2svbW9ja0NvbmZpZydcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBpc0xvZ2luSW5nID0gZmFsc2VcbnZhciBsb2dpbkNvbGxlY3RPcHRpb25zID0gW10gLy8g6K+35rGC5pCc6ZuG5ZmoXG52YXIgTE9HID0gY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KVxuXG4vKipcbiAqIOWwgeijhXd4UHJvbWlzZWZ5XG4gKi9cbnZhciB3eFByb21pc2lmeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9LCBpc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrTG9naW4gPSBmYWxzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvYmouaXNDaGVja0xvZ2luID0gaXNDaGVja0xvZ2luXG4gICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgIH1cbiAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgIH0pXG4gIH1cbn1cbi8qKlxuICog55m76ZmG5YmN55qE5YeG5aSHXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICogQHBhcmFtIHsqfSB0b2tlblxuICovXG52YXIgcmVxdWVzdEJlZm9yZSA9IChvcHRpb24sIHRva2VuKSA9PiB7XG4gICFvcHRpb24uZGF0YSAmJiAob3B0aW9uLmRhdGEgPSB7fSlcblxuICAhL15odHRwLy50ZXN0KG9wdGlvbi51cmwpICYmIChvcHRpb24udXJsID0gRE9NQUlOICsgb3B0aW9uLnVybClcbiAgLy8g5re75Yqg5b+F6KaB55qE6L6F5Yqp5a2X5patXG4gIC8vIHZhciBkZXZpY2VJbmZvID0gZ2V0QXBwKCkuZ2V0RGV2aWNlSW5mbygpXG4gIHZhciBkZXZpY2VJbmZvID0ge31cbiAgY29uc29sZS5sb2coZGV2aWNlSW5mbylcbiAgdmFyIGNvb2tpZU9iaiA9IHtcbiAgICAndGdfYXV0aCc6IHRva2VuXG4gICAgLy8gJ192JzogY29uZmlnLl92LFxuICAgIC8vICd3eHYnOiBkZXZpY2VJbmZvLnZlcnNpb24sXG4gICAgLy8gJ19zJzogYCR7ZGV2aWNlSW5mby5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpfV93eG1pbmlwcm9ncmFtYCxcbiAgICAvLyAnX3N5cyc6IGRldmljZUluZm8uc3lzdGVtLnRvTG93ZXJDYXNlKCksXG4gICAgLy8gJ19ncHMnOiBkZXZpY2VJbmZvLmdwcyB8fCAnJ1xuICB9XG4gIC8vIG9wdGlvbi5kYXRhID0ge1xuICAvLyAgIC4uLm9wdGlvbi5kYXRhLFxuICAvLyAgIC4uLmNvb2tpZU9ialxuICAvLyB9XG4gIGlmICghb3B0aW9uLmhlYWRlcikge1xuICAgIG9wdGlvbi5oZWFkZXIgPSB7fVxuICB9XG4gIG9wdGlvbi5oZWFkZXIuQ29va2llID0gT2JqZWN0LmtleXMoY29va2llT2JqKS5tYXAoKGtleSkgPT4ge1xuICAgIHJldHVybiBgJHtrZXl9PSR7Y29va2llT2JqW2tleV19YFxuICB9KS5qb2luKCc7JylcbiAgLy8g5pSv5LuY572R5YWz5b+F6aG7XG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu+WKoOS4iuW/heimgeWtl+autV90b2tlblxuICBpZiAoL3BheW1lbnRcXC9zaWduYXR1cmUvLnRlc3Qob3B0aW9uLnVybCkpIHtcbiAgICBvcHRpb24uZGF0YS5fdG9rZW4gPSB0b2tlblxuICB9XG4gIG9wdGlvbi5kYXRhLnByaXZhdGVLZXkgPSB0b2tlblxuICAvLyDor7fmsYLluKbkuIrmnaXmupBcbiAgb3B0aW9uLmRhdGEuZnJvbSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdmcm9tJylcbn1cblxuLyoqXG4gKiDor7fmsYLlh73mlbBcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cblxudmFyIHJlcXVlc3QgPSAob3B0aW9uKSA9PiB7XG4gIHZhciBpc0NoZWNrUHJvbWlzZSA9IG51bGxcbiAgaWYgKCFvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoJycpXG4gIH0gZWxzZSB7XG4gICAgaXNDaGVja1Byb21pc2UgPSB3eENoZWNrTG9naW4ob3B0aW9uKVxuICB9XG4gIGlzQ2hlY2tQcm9taXNlLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgLy8gdG9rZW4gPSAnNTZhYzNhZGRhODEyNDY0NzIzMDhjZjQzNTFlN2VmNzcnIC8vIOmmmemmmSB0b2tlblxuICAgIHRva2VuID0gJ2NhZjExNjc3ZGJlZDBmZGNkOTU0NzZkOTlhOTM2YWU1J1xuICAgIGlmICh0b2tlbiB8fCAhb3B0aW9uLmlzQ2hlY2tMb2dpbikge1xuICAgICAgTE9HKCdnZXQgdG9rZW4nLCB0b2tlbilcbiAgICAgIHJlcXVlc3RCZWZvcmUob3B0aW9uLCB0b2tlbilcbiAgICAgIGlmIChpc01vY2spIHtcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9uLnVybCwgbW9ja0NvbmZpZ1tvcHRpb24udXJsXSlcbiAgICAgICAgb3B0aW9uLnN1Y2Nlc3MocmVxdWlyZSgnLi4vbW9jay8nICsgbW9ja0NvbmZpZ1tvcHRpb24udXJsXSkpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIExPRygnc3RhcnQgcmVxdWVzdCBvcHRpb246Jywgb3B0aW9uKVxuICAgICAgY29uc29sZS5sb2cob3B0aW9uKVxuICAgICAgLy8gd2VweS5yZXF1ZXN0KG9wdGlvbilcbiAgICAgIHd4LnJlcXVlc3Qob3B0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBMT0coJ+acqueZu+mZhi4uLicpXG4gICAgfVxuICB9LCAoKSA9PiB7XG4gICAgTE9HKCfnmbvpmYbkuK0uLi4nKVxuICB9KVxufVxuXG4vKipcbiAqIOajgOafpeeZu+mZhuaAgeWSjHRva2VuXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAg6K+35rGC5a2X5q61IOW9k+ebkea1i+WIsOayoeacieeZu+W9leaXtiDkv53lrZhvcHRpb24g55m76ZmG5a6M5oiQ5ZCO57un57ut6K+35rGCXG4gKiDnlLHkuo5jaGVja3NzaW9u5o6l5Y+jIOacieeahOaXtuWAmSDkuIDnm7Tov5vljrtmYWlsIOaJgOS7pSDlj5bmtojmjonmo4Dmn6XnmoTov5nkuIDmraVcbiAqL1xudmFyIHd4Q2hlY2tMb2dpbiA9IG9wdGlvbiA9PiB7XG4gIExPRygnY2hlY2sgdG9rZW4nKVxuICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgaWYgKF90b2tlbikge1xuICAgIExPRygndG9rZW4gc3VjYzonLCBfdG9rZW4pXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfdG9rZW4pXG4gIH1cbiAgTE9HKCd0b2tlbiBmYWlsOicsIF90b2tlbilcbiAgcmV0dXJuIHd4TG9naW4ob3B0aW9uKVxufVxuXG52YXIgbG9naW5SZXF1ZXN0ID0gKCkgPT4ge1xuICBpZiAoIWxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoKSByZXR1cm5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVxdWVzdChsb2dpbkNvbGxlY3RPcHRpb25zW2ldKVxuICB9XG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXVxufVxuXG4vKipcbiAqIOeZu+W9lVxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xudmFyIHd4TG9naW4gPSBvcHRpb24gPT4ge1xuICAvLyDmkJzpm4bnmbvlvZXnmoRyZXF1ZXN0IOi/meagt+mYsuatouivt+axguW+iOWkmuasoWNvZGUg6YeN5aSN5aSa5qyh55m75b2VXG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMucHVzaChvcHRpb24pXG4gIGlmIChpc0xvZ2luSW5nKSB7XG4gICAgTE9HKCfmraPlnKjnmbvpmYYnKVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSBlbHNlIHtcbiAgICBMT0coJ+W8gOWni+eZu+mZhicpXG4gICAgaXNMb2dpbkluZyA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB3eFByb21pc2lmeSh3eC5sb2dpbikoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb2RlID0gcmVzLmNvZGVcbiAgICAgIExPRygnZ2V0IGNvZGUnLCBjb2RlKVxuICAgICAgcmV0dXJuIHd4UHJvbWlzaWZ5KHd4LmdldFVzZXJJbmZvKSh7XG4gICAgICAgIGxhbmc6ICd6aF9DTidcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIExPRygnZ2V0IHVzZXJJbmZvJywgcmVzKVxuICAgICAgbGV0IF9kYXRhID0ge1xuICAgICAgICB1cmw6IERPTUFJTiArICcvcGFydHkvbG9naW4nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhOiByZXMuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICBpdjogcmVzLml2XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIExPRygnbG9naW4nLCBfZGF0YSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5yZXF1ZXN0KShfZGF0YSlcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICBMT0coJ2xvZ2luIHN1Y2MnLCByZXMpXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhKVxuICAgICAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgICAgICAgbG9naW5SZXF1ZXN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIExPRygnbG9naW4gZmFpbCcsIHJlcylcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIExPRygnbG9naW4gZXJyb3InLCBlcnJvcilcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0OiB3eFByb21pc2lmeShyZXF1ZXN0KVxufVxuIl19