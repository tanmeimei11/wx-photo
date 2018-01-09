'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mockConfig = require('./../mock/mockConfig.js');

var _mockConfig2 = _interopRequireDefault(_mockConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // 本地


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

var request = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option, isCheckLogin) {
    var token, reqRes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // isCheckLogin = option.isCheck
            isCheckLogin = false;
            console.log(option, isCheckLogin);
            try {
              token = wx.getStorageSync('token');
              // if (isCheckLogin === true) {
              //   token = await wxCheckLogin(option)
              // }
              // LOG('get token', token)
            } catch (e) {
              LOG('未登陆...');
            }

            // if (token || !isCheckLogin) {
            requestBefore(option, token);

            if (!isMock) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', require('../mock/' + _mockConfig2.default[option.url]).data);

          case 6:
            LOG('start request option:', option);
            _context.next = 9;
            return _wepy2.default.request(option);

          case 9:
            reqRes = _context.sent;

            console.log(reqRes);
            return _context.abrupt('return', reqRes.data);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function request(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 检查登陆态和token
 * @param {*} option  请求字段 当监测到没有登录时 保存option 登陆完成后继续请求
 * 由于checkssion接口 有的时候 一直进去fail 所以 取消掉检查的这一步
 */
var wxCheckLogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(option) {
    var _token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            LOG('check token');
            _token = wx.getStorageSync('token');

            if (!_token) {
              _context2.next = 7;
              break;
            }

            LOG('token succ:', _token);
            return _context2.abrupt('return', _token);

          case 7:
            LOG('token fail:', _token);
            _context2.next = 10;
            return wxLogin(option);

          case 10:
            return _context2.abrupt('return', _context2.sent);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function wxCheckLogin(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loginRequest = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (loginCollectOptions.length) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return');

          case 2:
            i = 0;

          case 3:
            if (!(i < loginCollectOptions.length)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return request(loginCollectOptions[i]);

          case 6:
            i++;
            _context3.next = 3;
            break;

          case 9:
            loginCollectOptions = [];

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function loginRequest() {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 登录
 * @param {*} option
 */
var wxLogin = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(option) {
    var loginRes, userInfoRes, _data, reqRes;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // 搜集登录的request 这样防止请求很多次code 重复多次登录
            loginCollectOptions.push(option);

            if (!isLoginIng) {
              _context4.next = 6;
              break;
            }

            LOG('正在登陆');
            return _context4.abrupt('return', '');

          case 6:
            LOG('开始登陆');
            isLoginIng = true;

          case 8:
            _context4.next = 10;
            return _wepy2.default.login();

          case 10:
            loginRes = _context4.sent;

            code = loginRes.code;
            LOG('get code', code);

            _context4.prev = 13;
            _context4.next = 16;
            return _wepy2.default.getUserInfo({
              lang: 'zh_CN'
            });

          case 16:
            userInfoRes = _context4.sent;

            LOG('get userInfo', userInfoRes);
            _context4.next = 23;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4['catch'](13);

            isLoginIng = false;

          case 23:
            _data = {
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
            };

            LOG('login', _data);
            _context4.next = 27;
            return _wepy2.default.request(_data);

          case 27:
            reqRes = _context4.sent;

            reqRes = reqRes.data;

            if (!(reqRes.succ && reqRes.data)) {
              _context4.next = 36;
              break;
            }

            LOG('login succ', reqRes);
            wx.setStorageSync('token', reqRes.data);
            isLoginIng = false;
            // await loginRequest()
            return _context4.abrupt('return', reqRes.data);

          case 36:
            LOG('login fail', reqRes);
            return _context4.abrupt('return', '');

          case 38:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[13, 20]]);
  }));

  return function wxLogin(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  mockConfig: _mockConfig2.default,
  DOMAIN: DOMAIN,
  isMock: isMock,
  wxPromisify: wxPromisify,
  request: request,
  wxCheckLogin: wxCheckLogin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJlIiwicmVxUmVzIiwid3hDaGVja0xvZ2luIiwid3hMb2dpbiIsImxvZ2luUmVxdWVzdCIsImxlbmd0aCIsImkiLCJwdXNoIiwibG9naW4iLCJsb2dpblJlcyIsImdldFVzZXJJbmZvIiwibGFuZyIsInVzZXJJbmZvUmVzIiwiX2RhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzdWNjIiwic2V0U3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBRkE7OztBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFB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QUFDQUosZUFBR3FCLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMkJqQixPQUFPdkIsSUFBbEM7QUFDQWQseUJBQWEsS0FBYjtBQUNBO0FBNUNVLDhDQTZDSHFDLE9BQU92QixJQTdDSjs7QUFBQTtBQStDVlosZ0JBQUksWUFBSixFQUFrQm1DLE1BQWxCO0FBL0NVLDhDQWdESCxFQWhERzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7O0FBb0RBa0IsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxrQ0FEZTtBQUVmM0QsZ0JBRmU7QUFHZkQsZ0JBSGU7QUFJZlEsMEJBSmU7QUFLZjhCLFdBQVNBLE9BTE07QUFNZkcsZ0JBQWNBO0FBTkMsQ0FBakIiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmnKzlnLBcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgbW9ja0NvbmZpZyBmcm9tICcuLi9tb2NrL21vY2tDb25maWcnXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKVxudmFyIGlzTW9jayA9IGNvbmZpZy5pc01vY2sgfHwgZmFsc2VcbnZhciBET01BSU4gPSBjb25maWcuRE9NQUlOIHx8ICcnXG52YXIgY29kZSA9ICcnXG52YXIgaXNMb2dpbkluZyA9IGZhbHNlXG52YXIgbG9naW5Db2xsZWN0T3B0aW9ucyA9IFtdIC8vIOivt+axguaQnOmbhuWZqFxudmFyIExPRyA9IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSlcblxuLyoqXG4gKiDlsIHoo4V3eFByb21pc2VmeVxuICovXG52YXIgd3hQcm9taXNpZnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSwgaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja0xvZ2luID0gZmFsc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzQ2hlY2tMb2dpbiA9IGlzQ2hlY2tMb2dpblxuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICAgIGZuKG9iailcbiAgICB9KVxuICB9XG59XG4vKipcbiAqIOeZu+mZhuWJjeeahOWHhuWkh1xuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqIEBwYXJhbSB7Kn0gdG9rZW5cbiAqL1xudmFyIHJlcXVlc3RCZWZvcmUgPSAob3B0aW9uLCB0b2tlbikgPT4ge1xuICAhb3B0aW9uLmRhdGEgJiYgKG9wdGlvbi5kYXRhID0ge30pXG5cbiAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICAvLyB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICB2YXIgZGV2aWNlSW5mbyA9IHt9XG4gIHZhciBjb29raWVPYmogPSB7XG4gICAgJ3RnX2F1dGgnOiB0b2tlblxuICAgIC8vICdfdic6IGNvbmZpZy5fdixcbiAgICAvLyAnd3h2JzogZGV2aWNlSW5mby52ZXJzaW9uLFxuICAgIC8vICdfcyc6IGAke2RldmljZUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKX1fd3htaW5pcHJvZ3JhbWAsXG4gICAgLy8gJ19zeXMnOiBkZXZpY2VJbmZvLnN5c3RlbS50b0xvd2VyQ2FzZSgpLFxuICAgIC8vICdfZ3BzJzogZGV2aWNlSW5mby5ncHMgfHwgJydcbiAgfVxuICAvLyBvcHRpb24uZGF0YSA9IHtcbiAgLy8gICAuLi5vcHRpb24uZGF0YSxcbiAgLy8gICAuLi5jb29raWVPYmpcbiAgLy8gfVxuICBpZiAoIW9wdGlvbi5oZWFkZXIpIHtcbiAgICBvcHRpb24uaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb24uaGVhZGVyLkNvb2tpZSA9IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICByZXR1cm4gYCR7a2V5fT0ke2Nvb2tpZU9ialtrZXldfWBcbiAgfSkuam9pbignOycpXG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu1xuICAvLyDmlK/ku5jnvZHlhbPlv4XpobvliqDkuIrlv4XopoHlrZfmrrVfdG9rZW5cbiAgaWYgKC9wYXltZW50XFwvc2lnbmF0dXJlLy50ZXN0KG9wdGlvbi51cmwpKSB7XG4gICAgb3B0aW9uLmRhdGEuX3Rva2VuID0gdG9rZW5cbiAgfVxuICBvcHRpb24uZGF0YS5wcml2YXRlS2V5ID0gdG9rZW5cbiAgLy8g6K+35rGC5bim5LiK5p2l5rqQXG4gIG9wdGlvbi5kYXRhLmZyb20gPSB3eC5nZXRTdG9yYWdlU3luYygnZnJvbScpXG59XG5cbi8qKlxuICog6K+35rGC5Ye95pWwXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG5cbnZhciByZXF1ZXN0ID0gYXN5bmMgZnVuY3Rpb24gKG9wdGlvbiwgaXNDaGVja0xvZ2luKSB7XG4gIC8vIGlzQ2hlY2tMb2dpbiA9IG9wdGlvbi5pc0NoZWNrXG4gIGlzQ2hlY2tMb2dpbiA9IGZhbHNlXG4gIGNvbnNvbGUubG9nKG9wdGlvbiwgaXNDaGVja0xvZ2luKVxuICB0cnkge1xuICAgIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgLy8gaWYgKGlzQ2hlY2tMb2dpbiA9PT0gdHJ1ZSkge1xuICAgIC8vICAgdG9rZW4gPSBhd2FpdCB3eENoZWNrTG9naW4ob3B0aW9uKVxuICAgIC8vIH1cbiAgICAvLyBMT0coJ2dldCB0b2tlbicsIHRva2VuKVxuICB9IGNhdGNoIChlKSB7XG4gICAgTE9HKCfmnKrnmbvpmYYuLi4nKVxuICB9XG5cbiAgLy8gaWYgKHRva2VuIHx8ICFpc0NoZWNrTG9naW4pIHtcbiAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICBpZiAoaXNNb2NrKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pLmRhdGFcbiAgfVxuICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgdmFyIHJlcVJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdChvcHRpb24pXG4gIGNvbnNvbGUubG9nKHJlcVJlcylcbiAgcmV0dXJuIHJlcVJlcy5kYXRhXG4gIC8vIH1cbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBhc3luYyBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBfdG9rZW5cbiAgfSBlbHNlIHtcbiAgICBMT0coJ3Rva2VuIGZhaWw6JywgX3Rva2VuKVxuICAgIHJldHVybiBhd2FpdCB3eExvZ2luKG9wdGlvbilcbiAgfVxufVxuXG52YXIgbG9naW5SZXF1ZXN0ID0gYXN5bmMoKSA9PiB7XG4gIGlmICghbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGgpIHJldHVyblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBhd2FpdCByZXF1ZXN0KGxvZ2luQ29sbGVjdE9wdGlvbnNbaV0pXG4gIH1cbiAgbG9naW5Db2xsZWN0T3B0aW9ucyA9IFtdXG59XG5cbi8qKlxuICog55m75b2VXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG52YXIgd3hMb2dpbiA9IGFzeW5jIG9wdGlvbiA9PiB7XG4gIC8vIOaQnOmbhueZu+W9leeahHJlcXVlc3Qg6L+Z5qC36Ziy5q2i6K+35rGC5b6I5aSa5qyhY29kZSDph43lpI3lpJrmrKHnmbvlvZVcbiAgbG9naW5Db2xsZWN0T3B0aW9ucy5wdXNoKG9wdGlvbilcbiAgaWYgKGlzTG9naW5JbmcpIHtcbiAgICBMT0coJ+ato+WcqOeZu+mZhicpXG4gICAgcmV0dXJuICcnXG4gIH0gZWxzZSB7XG4gICAgTE9HKCflvIDlp4vnmbvpmYYnKVxuICAgIGlzTG9naW5JbmcgPSB0cnVlXG4gIH1cblxuICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKClcbiAgY29kZSA9IGxvZ2luUmVzLmNvZGVcbiAgTE9HKCdnZXQgY29kZScsIGNvZGUpXG5cbiAgdHJ5IHtcbiAgICB2YXIgdXNlckluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIGxhbmc6ICd6aF9DTidcbiAgICB9KVxuICAgIExPRygnZ2V0IHVzZXJJbmZvJywgdXNlckluZm9SZXMpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgfVxuXG4gIGxldCBfZGF0YSA9IHtcbiAgICB1cmw6IERPTUFJTiArICcvZ2cvbG9naW4nLFxuICAgIGhlYWRlcjoge1xuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgfSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiB7XG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogdXNlckluZm9SZXMuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiB1c2VySW5mb1Jlcy5pdlxuICAgIH1cbiAgfVxuICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gIHZhciByZXFSZXMgPSBhd2FpdCB3ZXB5LnJlcXVlc3QoX2RhdGEpXG4gIHJlcVJlcyA9IHJlcVJlcy5kYXRhXG5cbiAgaWYgKHJlcVJlcy5zdWNjICYmIHJlcVJlcy5kYXRhKSB7XG4gICAgTE9HKCdsb2dpbiBzdWNjJywgcmVxUmVzKVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcVJlcy5kYXRhKVxuICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICAgIC8vIGF3YWl0IGxvZ2luUmVxdWVzdCgpXG4gICAgcmV0dXJuIHJlcVJlcy5kYXRhXG4gIH0gZWxzZSB7XG4gICAgTE9HKCdsb2dpbiBmYWlsJywgcmVxUmVzKVxuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2NrQ29uZmlnLFxuICBET01BSU4sXG4gIGlzTW9jayxcbiAgd3hQcm9taXNpZnksXG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpbjogd3hDaGVja0xvZ2luXG59XG4iXX0=