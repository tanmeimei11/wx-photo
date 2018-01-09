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
            console.log(option, isCheckLogin);
            _context.prev = 1;
            token = null;

            if (option.isCheckLogin) {
              _context.next = 7;
              break;
            }

            token = '';
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return wxCheckLogin(option);

          case 9:
            token = _context.sent;

          case 10:
            LOG('get token', token);

            if (!(token || !option.isCheckLogin)) {
              _context.next = 21;
              break;
            }

            requestBefore(option, token);

            if (!isMock) {
              _context.next = 16;
              break;
            }

            option.success(require('../mock/' + _mockConfig2.default[option.url]));
            return _context.abrupt('return');

          case 16:
            LOG('start request option:', option);
            _context.next = 19;
            return _wepy2.default.request(option);

          case 19:
            reqRes = _context.sent;

            console.log(reqRes);
            // wx.request(option)

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](1);

            LOG('未登陆...');

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 23]]);
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
              _context2.next = 5;
              break;
            }

            LOG('token succ:', _token);
            return _context2.abrupt('return', _token);

          case 5:
            LOG('token fail:', _token);
            _context2.next = 8;
            return wxLogin(option);

          case 8:
            return _context2.abrupt('return', _context2.sent);

          case 9:
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
var wxLogin = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(option) {
    var loginRes, userInfoRes, _data, reqRes;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 搜集登录的request 这样防止请求很多次code 重复多次登录
            loginCollectOptions.push(option);

            if (!isLoginIng) {
              _context3.next = 6;
              break;
            }

            LOG('正在登陆');
            return _context3.abrupt('return', Promise.reject());

          case 6:
            LOG('开始登陆');
            isLoginIng = true;

          case 8:
            _context3.next = 10;
            return _wepy2.default.login();

          case 10:
            loginRes = _context3.sent;

            code = loginRes.code;
            LOG('get code', code);

            _context3.prev = 13;
            _context3.next = 16;
            return _wepy2.default.getUserInfo({
              lang: 'zh_CN'
            });

          case 16:
            userInfoRes = _context3.sent;

            LOG('get userInfo', userInfoRes);
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](13);

            isLoginIng = false;

          case 23:
            _data = {
              url: DOMAIN + '/party/login',
              data: {
                code: code,
                encryptedData: userInfoRes.encryptedData,
                iv: userInfoRes.iv
              }
            };

            LOG('login', _data);
            _context3.next = 27;
            return _wepy2.default.request(_data);

          case 27:
            reqRes = _context3.sent;


            if (reqRes.succ && reqRes.data) {
              LOG('login succ', reqRes);
              wx.setStorageSync('token', reqRes.data);
              isLoginIng = false;
              loginRequest();
            } else {
              LOG('login fail', reqRes);
            }

          case 29:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[13, 20]]);
  }));

  return function wxLogin(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  mockConfig: _mockConfig2.default,
  DOMAIN: DOMAIN,
  isMock: isMock,
  wxPromisify: wxPromisify,
  request: request
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJ3eENoZWNrTG9naW4iLCJyZXFSZXMiLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImxvZ2luUmVzIiwiZ2V0VXNlckluZm8iLCJsYW5nIiwidXNlckluZm9SZXMiLCJfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2NrQ29uZmlnIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FGQTs7O0FBR0EsSUFBSUEsU0FBU0MsUUFBUSxVQUFSLENBQWI7QUFDQSxJQUFJQyxTQUFTRixPQUFPRSxNQUFQLElBQWlCLEtBQTlCO0FBQ0EsSUFBSUMsU0FBU0gsT0FBT0csTUFBUCxJQUFpQixFQUE5QjtBQUNBLElBQUlDLE9BQU8sRUFBWDtBQUNBLElBQUlDLGFBQWEsS0FBakI7QUFDQSxJQUFJQyxzQkFBc0IsRUFBMUIsQyxDQUE2QjtBQUM3QixJQUFJQyxNQUFNQyxRQUFRQyxHQUFSLElBQWdC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QyxNQUFsQjtBQUNEOztBQXpDVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7O0FBNENBZ0IsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxrQ0FEZTtBQUVmekQsZ0JBRmU7QUFHZkQsZ0JBSGU7QUFJZlEsMEJBSmU7QUFLZjhCLFdBQVNBO0FBTE0sQ0FBakIiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmnKzlnLBcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgbW9ja0NvbmZpZyBmcm9tICcuLi9tb2NrL21vY2tDb25maWcnXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKVxudmFyIGlzTW9jayA9IGNvbmZpZy5pc01vY2sgfHwgZmFsc2VcbnZhciBET01BSU4gPSBjb25maWcuRE9NQUlOIHx8ICcnXG52YXIgY29kZSA9ICcnXG52YXIgaXNMb2dpbkluZyA9IGZhbHNlXG52YXIgbG9naW5Db2xsZWN0T3B0aW9ucyA9IFtdIC8vIOivt+axguaQnOmbhuWZqFxudmFyIExPRyA9IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSlcblxuLyoqXG4gKiDlsIHoo4V3eFByb21pc2VmeVxuICovXG52YXIgd3hQcm9taXNpZnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSwgaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja0xvZ2luID0gZmFsc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzQ2hlY2tMb2dpbiA9IGlzQ2hlY2tMb2dpblxuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICAgIGZuKG9iailcbiAgICB9KVxuICB9XG59XG4vKipcbiAqIOeZu+mZhuWJjeeahOWHhuWkh1xuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqIEBwYXJhbSB7Kn0gdG9rZW5cbiAqL1xudmFyIHJlcXVlc3RCZWZvcmUgPSAob3B0aW9uLCB0b2tlbikgPT4ge1xuICAhb3B0aW9uLmRhdGEgJiYgKG9wdGlvbi5kYXRhID0ge30pXG5cbiAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICAvLyB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICB2YXIgZGV2aWNlSW5mbyA9IHt9XG4gIHZhciBjb29raWVPYmogPSB7XG4gICAgJ3RnX2F1dGgnOiB0b2tlblxuICAgIC8vICdfdic6IGNvbmZpZy5fdixcbiAgICAvLyAnd3h2JzogZGV2aWNlSW5mby52ZXJzaW9uLFxuICAgIC8vICdfcyc6IGAke2RldmljZUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKX1fd3htaW5pcHJvZ3JhbWAsXG4gICAgLy8gJ19zeXMnOiBkZXZpY2VJbmZvLnN5c3RlbS50b0xvd2VyQ2FzZSgpLFxuICAgIC8vICdfZ3BzJzogZGV2aWNlSW5mby5ncHMgfHwgJydcbiAgfVxuICAvLyBvcHRpb24uZGF0YSA9IHtcbiAgLy8gICAuLi5vcHRpb24uZGF0YSxcbiAgLy8gICAuLi5jb29raWVPYmpcbiAgLy8gfVxuICBpZiAoIW9wdGlvbi5oZWFkZXIpIHtcbiAgICBvcHRpb24uaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb24uaGVhZGVyLkNvb2tpZSA9IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICByZXR1cm4gYCR7a2V5fT0ke2Nvb2tpZU9ialtrZXldfWBcbiAgfSkuam9pbignOycpXG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu1xuICAvLyDmlK/ku5jnvZHlhbPlv4XpobvliqDkuIrlv4XopoHlrZfmrrVfdG9rZW5cbiAgaWYgKC9wYXltZW50XFwvc2lnbmF0dXJlLy50ZXN0KG9wdGlvbi51cmwpKSB7XG4gICAgb3B0aW9uLmRhdGEuX3Rva2VuID0gdG9rZW5cbiAgfVxuICBvcHRpb24uZGF0YS5wcml2YXRlS2V5ID0gdG9rZW5cbiAgLy8g6K+35rGC5bim5LiK5p2l5rqQXG4gIG9wdGlvbi5kYXRhLmZyb20gPSB3eC5nZXRTdG9yYWdlU3luYygnZnJvbScpXG59XG5cbi8qKlxuICog6K+35rGC5Ye95pWwXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG5cbnZhciByZXF1ZXN0ID0gYXN5bmMob3B0aW9uLCBpc0NoZWNrTG9naW4pID0+IHtcbiAgY29uc29sZS5sb2cob3B0aW9uLCBpc0NoZWNrTG9naW4pXG4gIHRyeSB7XG4gICAgdmFyIHRva2VuID0gbnVsbFxuICAgIGlmICghb3B0aW9uLmlzQ2hlY2tMb2dpbikge1xuICAgICAgdG9rZW4gPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbihvcHRpb24pXG4gICAgfVxuICAgIExPRygnZ2V0IHRva2VuJywgdG9rZW4pXG4gICAgaWYgKHRva2VuIHx8ICFvcHRpb24uaXNDaGVja0xvZ2luKSB7XG4gICAgICByZXF1ZXN0QmVmb3JlKG9wdGlvbiwgdG9rZW4pXG4gICAgICBpZiAoaXNNb2NrKSB7XG4gICAgICAgIG9wdGlvbi5zdWNjZXNzKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIExPRygnc3RhcnQgcmVxdWVzdCBvcHRpb246Jywgb3B0aW9uKVxuICAgICAgdmFyIHJlcVJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdChvcHRpb24pXG4gICAgICBjb25zb2xlLmxvZyhyZXFSZXMpXG4gICAgICAvLyB3eC5yZXF1ZXN0KG9wdGlvbilcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBMT0coJ+acqueZu+mZhi4uLicpXG4gIH1cbn1cblxuLyoqXG4gKiDmo4Dmn6XnmbvpmYbmgIHlkox0b2tlblxuICogQHBhcmFtIHsqfSBvcHRpb24gIOivt+axguWtl+autSDlvZPnm5HmtYvliLDmsqHmnInnmbvlvZXml7Yg5L+d5a2Yb3B0aW9uIOeZu+mZhuWujOaIkOWQjue7p+e7reivt+axglxuICog55Sx5LqOY2hlY2tzc2lvbuaOpeWPoyDmnInnmoTml7blgJkg5LiA55u06L+b5Y67ZmFpbCDmiYDku6Ug5Y+W5raI5o6J5qOA5p+l55qE6L+Z5LiA5q2lXG4gKi9cbnZhciB3eENoZWNrTG9naW4gPSBhc3luYyBvcHRpb24gPT4ge1xuICBMT0coJ2NoZWNrIHRva2VuJylcbiAgbGV0IF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gIGlmIChfdG9rZW4pIHtcbiAgICBMT0coJ3Rva2VuIHN1Y2M6JywgX3Rva2VuKVxuICAgIHJldHVybiBfdG9rZW5cbiAgfVxuICBMT0coJ3Rva2VuIGZhaWw6JywgX3Rva2VuKVxuICByZXR1cm4gYXdhaXQgd3hMb2dpbihvcHRpb24pXG59XG5cbnZhciBsb2dpblJlcXVlc3QgPSAoKSA9PiB7XG4gIGlmICghbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGgpIHJldHVyblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICByZXF1ZXN0KGxvZ2luQ29sbGVjdE9wdGlvbnNbaV0pXG4gIH1cbiAgbG9naW5Db2xsZWN0T3B0aW9ucyA9IFtdXG59XG5cbi8qKlxuICog55m75b2VXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG52YXIgd3hMb2dpbiA9IGFzeW5jIG9wdGlvbiA9PiB7XG4gIC8vIOaQnOmbhueZu+W9leeahHJlcXVlc3Qg6L+Z5qC36Ziy5q2i6K+35rGC5b6I5aSa5qyhY29kZSDph43lpI3lpJrmrKHnmbvlvZVcbiAgbG9naW5Db2xsZWN0T3B0aW9ucy5wdXNoKG9wdGlvbilcbiAgaWYgKGlzTG9naW5JbmcpIHtcbiAgICBMT0coJ+ato+WcqOeZu+mZhicpXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9IGVsc2Uge1xuICAgIExPRygn5byA5aeL55m76ZmGJylcbiAgICBpc0xvZ2luSW5nID0gdHJ1ZVxuICB9XG4gIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oKVxuICBjb2RlID0gbG9naW5SZXMuY29kZVxuICBMT0coJ2dldCBjb2RlJywgY29kZSlcblxuICB0cnkge1xuICAgIHZhciB1c2VySW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgbGFuZzogJ3poX0NOJ1xuICAgIH0pXG4gICAgTE9HKCdnZXQgdXNlckluZm8nLCB1c2VySW5mb1JlcylcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICB9XG5cbiAgbGV0IF9kYXRhID0ge1xuICAgIHVybDogRE9NQUlOICsgJy9wYXJ0eS9sb2dpbicsXG4gICAgZGF0YToge1xuICAgICAgY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IHVzZXJJbmZvUmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogdXNlckluZm9SZXMuaXZcbiAgICB9XG4gIH1cbiAgTE9HKCdsb2dpbicsIF9kYXRhKVxuICB2YXIgcmVxUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KF9kYXRhKVxuXG4gIGlmIChyZXFSZXMuc3VjYyAmJiByZXFSZXMuZGF0YSkge1xuICAgIExPRygnbG9naW4gc3VjYycsIHJlcVJlcylcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXFSZXMuZGF0YSlcbiAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgICBsb2dpblJlcXVlc3QoKVxuICB9IGVsc2Uge1xuICAgIExPRygnbG9naW4gZmFpbCcsIHJlcVJlcylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0OiByZXF1ZXN0XG59XG4iXX0=