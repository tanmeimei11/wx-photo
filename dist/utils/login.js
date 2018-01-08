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
        console.log('option', option);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGQTtBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMsR0FB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Q0FBUDtBQW9DRCxDQS9DRDs7QUFpREFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsa0NBRGU7QUFFZjNELGdCQUZlO0FBR2ZELGdCQUhlO0FBSWZRLDBCQUplO0FBS2Y4QixXQUFTOUIsWUFBWThCLE9BQVo7QUFMTSxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBtb2NrQ29uZmlnIGZyb20gJy4uL21vY2svbW9ja0NvbmZpZydcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBpc0xvZ2luSW5nID0gZmFsc2VcbnZhciBsb2dpbkNvbGxlY3RPcHRpb25zID0gW10gLy8g6K+35rGC5pCc6ZuG5ZmoXG52YXIgTE9HID0gY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KVxuXG4vKipcbiAqIOWwgeijhXd4UHJvbWlzZWZ5XG4gKi9cbnZhciB3eFByb21pc2lmeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9LCBpc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrTG9naW4gPSBmYWxzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvYmouaXNDaGVja0xvZ2luID0gaXNDaGVja0xvZ2luXG4gICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgIH1cbiAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgIH0pXG4gIH1cbn1cbi8qKlxuICog55m76ZmG5YmN55qE5YeG5aSHXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICogQHBhcmFtIHsqfSB0b2tlblxuICovXG52YXIgcmVxdWVzdEJlZm9yZSA9IChvcHRpb24sIHRva2VuKSA9PiB7XG4gICFvcHRpb24uZGF0YSAmJiAob3B0aW9uLmRhdGEgPSB7fSlcblxuICAgICEvXmh0dHAvLnRlc3Qob3B0aW9uLnVybCkgJiYgKG9wdGlvbi51cmwgPSBET01BSU4gKyBvcHRpb24udXJsKVxuICAvLyDmt7vliqDlv4XopoHnmoTovoXliqnlrZfmlq1cbiAgLy8gdmFyIGRldmljZUluZm8gPSBnZXRBcHAoKS5nZXREZXZpY2VJbmZvKClcbiAgdmFyIGRldmljZUluZm8gPSB7fVxuICB2YXIgY29va2llT2JqID0ge1xuICAgICd0Z19hdXRoJzogdG9rZW5cbiAgICAvLyAnX3YnOiBjb25maWcuX3YsXG4gICAgLy8gJ3d4dic6IGRldmljZUluZm8udmVyc2lvbixcbiAgICAvLyAnX3MnOiBgJHtkZXZpY2VJbmZvLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCl9X3d4bWluaXByb2dyYW1gLFxuICAgIC8vICdfc3lzJzogZGV2aWNlSW5mby5zeXN0ZW0udG9Mb3dlckNhc2UoKSxcbiAgICAvLyAnX2dwcyc6IGRldmljZUluZm8uZ3BzIHx8ICcnXG4gIH1cbiAgLy8gb3B0aW9uLmRhdGEgPSB7XG4gIC8vICAgLi4ub3B0aW9uLmRhdGEsXG4gIC8vICAgLi4uY29va2llT2JqXG4gIC8vIH1cbiAgaWYgKCFvcHRpb24uaGVhZGVyKSB7XG4gICAgb3B0aW9uLmhlYWRlciA9IHt9XG4gIH1cbiAgb3B0aW9uLmhlYWRlci5Db29raWUgPSBPYmplY3Qua2V5cyhjb29raWVPYmopLm1hcCgoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGAke2tleX09JHtjb29raWVPYmpba2V5XX1gXG4gIH0pLmpvaW4oJzsnKVxuICAvLyDmlK/ku5jnvZHlhbPlv4XpobtcbiAgLy8g5pSv5LuY572R5YWz5b+F6aG75Yqg5LiK5b+F6KaB5a2X5q61X3Rva2VuXG4gIGlmICgvcGF5bWVudFxcL3NpZ25hdHVyZS8udGVzdChvcHRpb24udXJsKSkge1xuICAgIG9wdGlvbi5kYXRhLl90b2tlbiA9IHRva2VuXG4gIH1cbiAgb3B0aW9uLmRhdGEucHJpdmF0ZUtleSA9IHRva2VuXG4gIC8vIOivt+axguW4puS4iuadpea6kFxuICBvcHRpb24uZGF0YS5mcm9tID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2Zyb20nKVxufVxuXG4vKipcbiAqIOivt+axguWHveaVsFxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xuXG52YXIgcmVxdWVzdCA9IChvcHRpb24pID0+IHtcbiAgdmFyIGlzQ2hlY2tQcm9taXNlID0gbnVsbFxuICBpZiAoIW9wdGlvbi5pc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgnJylcbiAgfSBlbHNlIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IHd4Q2hlY2tMb2dpbihvcHRpb24pXG4gIH1cbiAgaXNDaGVja1Byb21pc2UudGhlbigodG9rZW4pID0+IHtcbiAgICAvLyB0b2tlbiA9ICc1NmFjM2FkZGE4MTI0NjQ3MjMwOGNmNDM1MWU3ZWY3NydcbiAgICB0b2tlbiA9ICdjYWYxMTY3N2RiZWQwZmRjZDk1NDc2ZDk5YTkzNmFlNScgLy8g6aaZ6aaZIHRva2VuXG4gICAgLy8gdG9rZW4gPSAnOGQzYzEyOTM2ZDIxMTE0ZjNmZTIxOGFmOWJmOWNlNzYnXG4gICAgaWYgKHRva2VuIHx8ICFvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgICBMT0coJ2dldCB0b2tlbicsIHRva2VuKVxuICAgICAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICAgICAgaWYgKGlzTW9jaykge1xuICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9uJywgb3B0aW9uKVxuICAgICAgICBvcHRpb24uc3VjY2VzcyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKG9wdGlvbilcbiAgICAgIC8vIHdlcHkucmVxdWVzdChvcHRpb24pXG4gICAgICB3eC5yZXF1ZXN0KG9wdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgTE9HKCfmnKrnmbvpmYYuLi4nKVxuICAgIH1cbiAgfSwgKCkgPT4ge1xuICAgIExPRygn55m76ZmG5LitLi4uJylcbiAgfSlcbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX3Rva2VuKVxuICB9XG4gIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gIHJldHVybiB3eExvZ2luKG9wdGlvbilcbn1cblxudmFyIGxvZ2luUmVxdWVzdCA9ICgpID0+IHtcbiAgaWYgKCFsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aCkgcmV0dXJuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHJlcXVlc3QobG9naW5Db2xsZWN0T3B0aW9uc1tpXSlcbiAgfVxuICBsb2dpbkNvbGxlY3RPcHRpb25zID0gW11cbn1cblxuLyoqXG4gKiDnmbvlvZVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cbnZhciB3eExvZ2luID0gb3B0aW9uID0+IHtcbiAgLy8g5pCc6ZuG55m75b2V55qEcmVxdWVzdCDov5nmoLfpmLLmraLor7fmsYLlvojlpJrmrKFjb2RlIOmHjeWkjeWkmuasoeeZu+W9lVxuICBsb2dpbkNvbGxlY3RPcHRpb25zLnB1c2gob3B0aW9uKVxuICBpZiAoaXNMb2dpbkluZykge1xuICAgIExPRygn5q2j5Zyo55m76ZmGJylcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0gZWxzZSB7XG4gICAgTE9HKCflvIDlp4vnmbvpmYYnKVxuICAgIGlzTG9naW5JbmcgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gd3hQcm9taXNpZnkod3gubG9naW4pKClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29kZSA9IHJlcy5jb2RlXG4gICAgICBMT0coJ2dldCBjb2RlJywgY29kZSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5nZXRVc2VySW5mbykoe1xuICAgICAgICBsYW5nOiAnemhfQ04nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBMT0coJ2dldCB1c2VySW5mbycsIHJlcylcbiAgICAgIGxldCBfZGF0YSA9IHtcbiAgICAgICAgdXJsOiBET01BSU4gKyAnL3BhcnR5L2xvZ2luJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgZW5jcnlwdGVkRGF0YTogcmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgaXY6IHJlcy5pdlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gICAgICByZXR1cm4gd3hQcm9taXNpZnkod3gucmVxdWVzdCkoX2RhdGEpXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgTE9HKCdsb2dpbiBzdWNjJywgcmVzKVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YSlcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICAgIGxvZ2luUmVxdWVzdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0coJ2xvZ2luIGZhaWwnLCByZXMpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBMT0coJ2xvZ2luIGVycm9yJywgZXJyb3IpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vY2tDb25maWcsXG4gIERPTUFJTixcbiAgaXNNb2NrLFxuICB3eFByb21pc2lmeSxcbiAgcmVxdWVzdDogd3hQcm9taXNpZnkocmVxdWVzdClcbn1cbiJdfQ==