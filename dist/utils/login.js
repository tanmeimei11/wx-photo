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
        option.success(require('../mock/' + _mockConfig2.default[option.url]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsIm1ldGhvZCIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJpc0NoZWNrUHJvbWlzZSIsInd4Q2hlY2tMb2dpbiIsInRoZW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImdldFVzZXJJbmZvIiwibGFuZyIsImUiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMsR0FBUixJQUFnQixZQUFNLENBQUUsQ0FBbEM7O0FBRUE7OztBQUdBLElBQUlDLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxFQUFELEVBQVE7QUFDeEIsU0FBTyxZQUFrQztBQUFBLFFBQXhCQyxHQUF3Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkQyxZQUFjOztBQUN2Q0EsbUJBQWUsS0FBZjtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0osVUFBSUMsWUFBSixHQUFtQkEsWUFBbkI7QUFDQUQsVUFBSUssT0FBSixHQUFjLFVBQVVDLEdBQVYsRUFBZTtBQUMzQixZQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWkosa0JBQVFHLElBQUlDLElBQVo7QUFDRDtBQUNESixnQkFBUUcsR0FBUjtBQUNELE9BTEQ7QUFNQU4sVUFBSVEsSUFBSixHQUFXLFVBQVVGLEdBQVYsRUFBZTtBQUN4QkYsZUFBT0UsR0FBUDtBQUNELE9BRkQ7QUFHQVAsU0FBR0MsR0FBSDtBQUNELEtBWk0sQ0FBUDtBQWFELEdBZkQ7QUFnQkQsQ0FqQkQ7QUFrQkE7Ozs7O0FBS0EsSUFBSVMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDckMsR0FBQ0QsT0FBT0gsSUFBUixLQUFpQkcsT0FBT0gsSUFBUCxHQUFjLEVBQS9COztBQUVBLEdBQUMsUUFBUUssSUFBUixDQUFhRixPQUFPRyxHQUFwQixDQUFELEtBQThCSCxPQUFPRyxHQUFQLEdBQWF0QixTQUFTbUIsT0FBT0csR0FBM0Q7QUFDQTtBQUNBO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBLE1BQUlDLFlBQVk7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOYyxHQUFoQjtBQVFBTCxTQUFPSCxJQUFQLGdCQUNLRyxPQUFPSCxJQURaLEVBRUtRLFNBRkw7QUFJQUwsU0FBT00sTUFBUCxHQUFnQjtBQUNkLGNBQVVDLE9BQU9DLElBQVAsQ0FBWUgsU0FBWixFQUF1QkksR0FBdkIsQ0FBMkIsVUFBQ0MsR0FBRCxFQUFTO0FBQzVDLGFBQVVBLEdBQVYsU0FBaUJMLFVBQVVLLEdBQVYsQ0FBakI7QUFDRCxLQUZTLEVBRVBDLElBRk8sQ0FFRixHQUZFO0FBSVo7QUFMZ0IsR0FBaEIsQ0FNQSxJQUFJLHFCQUFxQlQsSUFBckIsQ0FBMEJGLE9BQU9HLEdBQWpDLENBQUosRUFBMkM7QUFDekNILFdBQU9ILElBQVAsQ0FBWWUsTUFBWixHQUFxQlgsS0FBckI7QUFDRDtBQUNBRCxTQUFPYSxNQUFQLEtBQWtCLE1BQW5CLEtBQStCYixPQUFPSCxJQUFQLENBQVlpQixVQUFaLEdBQXlCYixLQUF4RDtBQUNBO0FBQ0FELFNBQU9ILElBQVAsQ0FBWWtCLElBQVosR0FBbUJDLEdBQUdDLGNBQUgsQ0FBa0IsTUFBbEIsQ0FBbkI7QUFDRCxDQS9CRDs7QUFpQ0E7Ozs7O0FBS0EsSUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQUNsQixNQUFELEVBQVk7QUFDeEIsTUFBSW1CLGlCQUFpQixJQUFyQjtBQUNBLE1BQUksQ0FBQ25CLE9BQU9ULFlBQVosRUFBMEI7QUFDeEI0QixxQkFBaUIzQixRQUFRQyxPQUFSLENBQWdCLEVBQWhCLENBQWpCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wwQixxQkFBaUJDLGFBQWFwQixNQUFiLENBQWpCO0FBQ0Q7QUFDRG1CLGlCQUFlRSxJQUFmLENBQW9CLFVBQUNwQixLQUFELEVBQVc7QUFDN0I7QUFDQSxRQUFJQSxTQUFTLENBQUNELE9BQU9ULFlBQXJCLEVBQW1DO0FBQ2pDTixVQUFJLFdBQUosRUFBaUJnQixLQUFqQjtBQUNBRixvQkFBY0MsTUFBZCxFQUFzQkMsS0FBdEI7QUFDQSxVQUFJckIsTUFBSixFQUFZO0FBQ1ZvQixlQUFPTCxPQUFQLENBQWVoQixRQUFRLGFBQWEscUJBQVdxQixPQUFPRyxHQUFsQixDQUFyQixDQUFmO0FBQ0E7QUFDRDtBQUNEbEIsVUFBSSx1QkFBSixFQUE2QmUsTUFBN0I7QUFDQSxxQkFBS2tCLE9BQUwsQ0FBYWxCLE1BQWI7QUFDQWdCLFNBQUdFLE9BQUgsQ0FBV2xCLE1BQVg7QUFDRCxLQVZELE1BVU87QUFDTGYsVUFBSSxRQUFKO0FBQ0Q7QUFDRixHQWZELEVBZUcsWUFBTTtBQUNQQSxRQUFJLFFBQUo7QUFDRCxHQWpCRDtBQWtCRCxDQXpCRDs7QUEyQkE7Ozs7O0FBS0EsSUFBSW1DLGVBQWUsU0FBZkEsWUFBZSxTQUFVO0FBQzNCbkMsTUFBSSxhQUFKO0FBQ0EsTUFBSTJCLFNBQVNJLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBYjtBQUNBLE1BQUlMLE1BQUosRUFBWTtBQUNWM0IsUUFBSSxhQUFKLEVBQW1CMkIsTUFBbkI7QUFDQSxXQUFPcEIsUUFBUUMsT0FBUixDQUFnQm1CLE1BQWhCLENBQVA7QUFDRDtBQUNEM0IsTUFBSSxhQUFKLEVBQW1CMkIsTUFBbkI7QUFDQSxTQUFPVSxRQUFRdEIsTUFBUixDQUFQO0FBQ0QsQ0FURDs7QUFXQSxJQUFJdUIsZUFBZSxTQUFmQSxZQUFlLEdBQU07QUFDdkIsTUFBSSxDQUFDdkMsb0JBQW9Cd0MsTUFBekIsRUFBaUM7QUFDakMsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUl6QyxvQkFBb0J3QyxNQUF4QyxFQUFnREMsR0FBaEQsRUFBcUQ7QUFDbkRQLFlBQVFsQyxvQkFBb0J5QyxDQUFwQixDQUFSO0FBQ0Q7QUFDRHpDLHdCQUFzQixFQUF0QjtBQUNELENBTkQ7O0FBUUE7Ozs7QUFJQSxJQUFJc0MsVUFBVSxTQUFWQSxPQUFVLFNBQVU7QUFDdEI7QUFDQXRDLHNCQUFvQjBDLElBQXBCLENBQXlCMUIsTUFBekI7QUFDQSxNQUFJakIsVUFBSixFQUFnQjtBQUNkRSxRQUFJLE1BQUo7QUFDQSxXQUFPTyxRQUFRRSxNQUFSLEVBQVAsQ0FGYyxDQUVVO0FBQ3pCLEdBSEQsTUFHTztBQUNMVCxRQUFJLE1BQUo7QUFDQUYsaUJBQWEsSUFBYjtBQUNEOztBQUVELFNBQU9LLFlBQVk0QixHQUFHVyxLQUFmLElBQ0pOLElBREksQ0FDQyxlQUFPO0FBQ1h2QyxXQUFPYyxJQUFJZCxJQUFYO0FBQ0FHLFFBQUksVUFBSixFQUFnQkgsSUFBaEI7QUFDQSxXQUFPTSxZQUFZNEIsR0FBR1ksV0FBZixFQUE0QjtBQUNqQ0MsWUFBTTtBQUQyQixLQUE1QixFQUVKUixJQUZJLENBRUMsZUFBTztBQUNiLGFBQU96QixHQUFQO0FBQ0QsS0FKTSxFQUlKLFVBQUNrQyxDQUFELEVBQU87QUFDUi9DLG1CQUFhLEtBQWI7QUFDRCxLQU5NLENBQVA7QUFPRCxHQVhJLEVBWUpzQyxJQVpJLENBWUMsZUFBTztBQUNYcEMsUUFBSSxjQUFKLEVBQW9CVyxHQUFwQjtBQUNBLFFBQUltQyxRQUFRO0FBQ1Y1QixXQUFLdEIsU0FBUyxjQURKO0FBRVZnQixZQUFNO0FBQ0pmLGNBQU1BLElBREY7QUFFSmtELHVCQUFlcEMsSUFBSW9DLGFBRmY7QUFHSkMsWUFBSXJDLElBQUlxQztBQUhKO0FBRkksS0FBWjtBQVFBaEQsUUFBSSxPQUFKLEVBQWE4QyxLQUFiO0FBQ0EsV0FBTzNDLFlBQVk0QixHQUFHRSxPQUFmLEVBQXdCYSxLQUF4QixDQUFQO0FBQ0QsR0F4QkksRUF3QkZWLElBeEJFLENBd0JHLFVBQUN6QixHQUFELEVBQVM7QUFDZixRQUFJQSxJQUFJc0MsSUFBSixJQUFZdEMsSUFBSUMsSUFBcEIsRUFBMEI7QUFDeEJaLFVBQUksWUFBSixFQUFrQlcsR0FBbEI7QUFDQW9CLFNBQUdtQixjQUFILENBQWtCLE9BQWxCLEVBQTJCdkMsSUFBSUMsSUFBL0I7QUFDQWQsbUJBQWEsS0FBYjtBQUNBd0M7QUFDRCxLQUxELE1BS087QUFDTHRDLFVBQUksWUFBSixFQUFrQlcsR0FBbEI7QUFDRDtBQUNGLEdBakNJLEVBaUNGd0MsS0FqQ0UsQ0FpQ0ksVUFBQ0MsS0FBRCxFQUFXO0FBQ2xCcEQsUUFBSSxhQUFKLEVBQW1Cb0QsS0FBbkI7QUFDRCxHQW5DSSxDQUFQO0FBb0NELENBL0NEOztBQWlEQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxrQ0FEZTtBQUVmM0QsZ0JBRmU7QUFHZkQsZ0JBSGU7QUFJZlEsMEJBSmU7QUFLZjhCLFdBQVM5QixZQUFZOEIsT0FBWjtBQUxNLENBQWpCIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5pys5ZywXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IG1vY2tDb25maWcgZnJvbSAnLi4vbW9jay9tb2NrQ29uZmlnJ1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJylcbnZhciBpc01vY2sgPSBjb25maWcuaXNNb2NrIHx8IGZhbHNlXG52YXIgRE9NQUlOID0gY29uZmlnLkRPTUFJTiB8fCAnJ1xudmFyIGNvZGUgPSAnJ1xudmFyIGlzTG9naW5JbmcgPSBmYWxzZVxudmFyIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXSAvLyDor7fmsYLmkJzpm4blmahcbnZhciBMT0cgPSBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pXG5cbi8qKlxuICog5bCB6KOFd3hQcm9taXNlZnlcbiAqL1xudmFyIHd4UHJvbWlzaWZ5ID0gKGZuKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30sIGlzQ2hlY2tMb2dpbikge1xuICAgIGlzQ2hlY2tMb2dpbiA9IGZhbHNlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG9iai5pc0NoZWNrTG9naW4gPSBpc0NoZWNrTG9naW5cbiAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfVxuICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlamVjdChyZXMpXG4gICAgICB9XG4gICAgICBmbihvYmopXG4gICAgfSlcbiAgfVxufVxuLyoqXG4gKiDnmbvpmYbliY3nmoTlh4blpIdcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKiBAcGFyYW0geyp9IHRva2VuXG4gKi9cbnZhciByZXF1ZXN0QmVmb3JlID0gKG9wdGlvbiwgdG9rZW4pID0+IHtcbiAgIW9wdGlvbi5kYXRhICYmIChvcHRpb24uZGF0YSA9IHt9KVxuXG4gICEvXmh0dHAvLnRlc3Qob3B0aW9uLnVybCkgJiYgKG9wdGlvbi51cmwgPSBET01BSU4gKyBvcHRpb24udXJsKVxuICAvLyDmt7vliqDlv4XopoHnmoTovoXliqnlrZfmlq1cbiAgLy8gdmFyIGRldmljZUluZm8gPSBnZXRBcHAoKS5nZXREZXZpY2VJbmZvKClcbiAgdmFyIGRldmljZUluZm8gPSB7fVxuICB2YXIgY29va2llT2JqID0ge1xuICAgIC8vICd0Z19hdXRoJzogdG9rZW4sXG4gICAgLy8gJ192JzogY29uZmlnLl92LFxuICAgIC8vICd3eHYnOiBkZXZpY2VJbmZvLnZlcnNpb24sXG4gICAgLy8gJ19zJzogYCR7ZGV2aWNlSW5mby5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpfV93eG1pbmlwcm9ncmFtYCxcbiAgICAvLyAnX3N5cyc6IGRldmljZUluZm8uc3lzdGVtLnRvTG93ZXJDYXNlKCksXG4gICAgLy8gJ19ncHMnOiBkZXZpY2VJbmZvLmdwcyB8fCAnJ1xuICB9XG4gIG9wdGlvbi5kYXRhID0ge1xuICAgIC4uLm9wdGlvbi5kYXRhLFxuICAgIC4uLmNvb2tpZU9ialxuICB9XG4gIG9wdGlvbi5oZWFkZXIgPSB7XG4gICAgJ0Nvb2tpZSc6IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICAgIHJldHVybiBgJHtrZXl9PSR7Y29va2llT2JqW2tleV19YFxuICAgIH0pLmpvaW4oJzsnKVxuICB9XG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu+WKoOS4iuW/heimgeWtl+autV90b2tlblxuICBpZiAoL3BheW1lbnRcXC9zaWduYXR1cmUvLnRlc3Qob3B0aW9uLnVybCkpIHtcbiAgICBvcHRpb24uZGF0YS5fdG9rZW4gPSB0b2tlblxuICB9XG4gIChvcHRpb24ubWV0aG9kICE9PSAnUE9TVCcpICYmIChvcHRpb24uZGF0YS5wcml2YXRlS2V5ID0gdG9rZW4pXG4gIC8vIOivt+axguW4puS4iuadpea6kFxuICBvcHRpb24uZGF0YS5mcm9tID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2Zyb20nKVxufVxuXG4vKipcbiAqIOivt+axguWHveaVsFxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xuXG52YXIgcmVxdWVzdCA9IChvcHRpb24pID0+IHtcbiAgdmFyIGlzQ2hlY2tQcm9taXNlID0gbnVsbFxuICBpZiAoIW9wdGlvbi5pc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgnJylcbiAgfSBlbHNlIHtcbiAgICBpc0NoZWNrUHJvbWlzZSA9IHd4Q2hlY2tMb2dpbihvcHRpb24pXG4gIH1cbiAgaXNDaGVja1Byb21pc2UudGhlbigodG9rZW4pID0+IHtcbiAgICAvLyB2YXIgdG9rZW4gPSAnMDViODFhYjJmOGY2YzZkMTQ1OGEwZjU5YjIyZThjOWInXG4gICAgaWYgKHRva2VuIHx8ICFvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgICBMT0coJ2dldCB0b2tlbicsIHRva2VuKVxuICAgICAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICAgICAgaWYgKGlzTW9jaykge1xuICAgICAgICBvcHRpb24uc3VjY2VzcyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgICAgIHdlcHkucmVxdWVzdChvcHRpb24pXG4gICAgICB3eC5yZXF1ZXN0KG9wdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgTE9HKCfmnKrnmbvpmYYuLi4nKVxuICAgIH1cbiAgfSwgKCkgPT4ge1xuICAgIExPRygn55m76ZmG5LitLi4uJylcbiAgfSlcbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX3Rva2VuKVxuICB9XG4gIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gIHJldHVybiB3eExvZ2luKG9wdGlvbilcbn1cblxudmFyIGxvZ2luUmVxdWVzdCA9ICgpID0+IHtcbiAgaWYgKCFsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aCkgcmV0dXJuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHJlcXVlc3QobG9naW5Db2xsZWN0T3B0aW9uc1tpXSlcbiAgfVxuICBsb2dpbkNvbGxlY3RPcHRpb25zID0gW11cbn1cblxuLyoqXG4gKiDnmbvlvZVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cbnZhciB3eExvZ2luID0gb3B0aW9uID0+IHtcbiAgLy8g5pCc6ZuG55m75b2V55qEcmVxdWVzdCDov5nmoLfpmLLmraLor7fmsYLlvojlpJrmrKFjb2RlIOmHjeWkjeWkmuasoeeZu+W9lVxuICBsb2dpbkNvbGxlY3RPcHRpb25zLnB1c2gob3B0aW9uKVxuICBpZiAoaXNMb2dpbkluZykge1xuICAgIExPRygn5q2j5Zyo55m76ZmGJylcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0gZWxzZSB7XG4gICAgTE9HKCflvIDlp4vnmbvpmYYnKVxuICAgIGlzTG9naW5JbmcgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gd3hQcm9taXNpZnkod3gubG9naW4pKClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29kZSA9IHJlcy5jb2RlXG4gICAgICBMT0coJ2dldCBjb2RlJywgY29kZSlcbiAgICAgIHJldHVybiB3eFByb21pc2lmeSh3eC5nZXRVc2VySW5mbykoe1xuICAgICAgICBsYW5nOiAnemhfQ04nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBMT0coJ2dldCB1c2VySW5mbycsIHJlcylcbiAgICAgIGxldCBfZGF0YSA9IHtcbiAgICAgICAgdXJsOiBET01BSU4gKyAnL3BhcnR5L2xvZ2luJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgZW5jcnlwdGVkRGF0YTogcmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgaXY6IHJlcy5pdlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gICAgICByZXR1cm4gd3hQcm9taXNpZnkod3gucmVxdWVzdCkoX2RhdGEpXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgTE9HKCdsb2dpbiBzdWNjJywgcmVzKVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YSlcbiAgICAgICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgICAgIGxvZ2luUmVxdWVzdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0coJ2xvZ2luIGZhaWwnLCByZXMpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBMT0coJ2xvZ2luIGVycm9yJywgZXJyb3IpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vY2tDb25maWcsXG4gIERPTUFJTixcbiAgaXNNb2NrLFxuICB3eFByb21pc2lmeSxcbiAgcmVxdWVzdDogd3hQcm9taXNpZnkocmVxdWVzdClcbn1cbiJdfQ==