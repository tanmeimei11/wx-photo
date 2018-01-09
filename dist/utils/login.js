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
// var LOG = console.log || (() => {})
var LOG = function LOG() {};

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
            // console.log(option, isCheckLogin)
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
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', require('../mock/' + _mockConfig2.default[option.url]).data);

          case 5:
            LOG('start request option:', option);
            _context.next = 8;
            return _wepy2.default.request(option);

          case 8:
            reqRes = _context.sent;
            return _context.abrupt('return', reqRes.data);

          case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJ3eFByb21pc2lmeSIsImZuIiwib2JqIiwiaXNDaGVja0xvZ2luIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdWNjZXNzIiwicmVzIiwiZGF0YSIsImZhaWwiLCJyZXF1ZXN0QmVmb3JlIiwib3B0aW9uIiwidG9rZW4iLCJ0ZXN0IiwidXJsIiwiZGV2aWNlSW5mbyIsImNvb2tpZU9iaiIsImhlYWRlciIsIkNvb2tpZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJqb2luIiwiX3Rva2VuIiwicHJpdmF0ZUtleSIsImZyb20iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsImUiLCJyZXFSZXMiLCJ3eENoZWNrTG9naW4iLCJ3eExvZ2luIiwibG9naW5SZXF1ZXN0IiwibGVuZ3RoIiwiaSIsInB1c2giLCJsb2dpbiIsImxvZ2luUmVzIiwiZ2V0VXNlckluZm8iLCJsYW5nIiwidXNlckluZm9SZXMiLCJfZGF0YSIsIm1ldGhvZCIsImVuY3J5cHRlZERhdGEiLCJpdiIsInN1Y2MiLCJzZXRTdG9yYWdlU3luYyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2NrQ29uZmlnIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FGQTs7O0FBR0EsSUFBSUEsU0FBU0MsUUFBUSxVQUFSLENBQWI7QUFDQSxJQUFJQyxTQUFTRixPQUFPRSxNQUFQLElBQWlCLEtBQTlCO0FBQ0EsSUFBSUMsU0FBU0gsT0FBT0csTUFBUCxJQUFpQixFQUE5QjtBQUNBLElBQUlDLE9BQU8sRUFBWDtBQUNBLElBQUlDLGFBQWEsS0FBakI7QUFDQSxJQUFJQyxzQkFBc0IsRUFBMUIsQyxDQUE2QjtBQUM3QjtBQUNBLElBQUlDLE1BQU0sU0FBTkEsR0FBTSxHQUFN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T3ZCLElBN0NKOztBQUFBO0FBK0NWVixnQkFBSSxZQUFKLEVBQWtCaUMsTUFBbEI7QUEvQ1UsOENBZ0RILEVBaERHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSjs7QUFvREFrQixPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGtDQURlO0FBRWZ6RCxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmTSwwQkFKZTtBQUtmOEIsV0FBU0EsT0FMTTtBQU1mRyxnQkFBY0E7QUFOQyxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBtb2NrQ29uZmlnIGZyb20gJy4uL21vY2svbW9ja0NvbmZpZydcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBpc0xvZ2luSW5nID0gZmFsc2VcbnZhciBsb2dpbkNvbGxlY3RPcHRpb25zID0gW10gLy8g6K+35rGC5pCc6ZuG5ZmoXG4vLyB2YXIgTE9HID0gY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KVxudmFyIExPRyA9ICgpID0+IHt9XG5cbi8qKlxuICog5bCB6KOFd3hQcm9taXNlZnlcbiAqL1xudmFyIHd4UHJvbWlzaWZ5ID0gKGZuKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30sIGlzQ2hlY2tMb2dpbikge1xuICAgIGlzQ2hlY2tMb2dpbiA9IGZhbHNlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG9iai5pc0NoZWNrTG9naW4gPSBpc0NoZWNrTG9naW5cbiAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfVxuICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlamVjdChyZXMpXG4gICAgICB9XG4gICAgICBmbihvYmopXG4gICAgfSlcbiAgfVxufVxuLyoqXG4gKiDnmbvpmYbliY3nmoTlh4blpIdcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKiBAcGFyYW0geyp9IHRva2VuXG4gKi9cbnZhciByZXF1ZXN0QmVmb3JlID0gKG9wdGlvbiwgdG9rZW4pID0+IHtcbiAgIW9wdGlvbi5kYXRhICYmIChvcHRpb24uZGF0YSA9IHt9KVxuXG4gICEvXmh0dHAvLnRlc3Qob3B0aW9uLnVybCkgJiYgKG9wdGlvbi51cmwgPSBET01BSU4gKyBvcHRpb24udXJsKVxuICAvLyDmt7vliqDlv4XopoHnmoTovoXliqnlrZfmlq1cbiAgLy8gdmFyIGRldmljZUluZm8gPSBnZXRBcHAoKS5nZXREZXZpY2VJbmZvKClcbiAgdmFyIGRldmljZUluZm8gPSB7fVxuICB2YXIgY29va2llT2JqID0ge1xuICAgICd0Z19hdXRoJzogdG9rZW5cbiAgICAvLyAnX3YnOiBjb25maWcuX3YsXG4gICAgLy8gJ3d4dic6IGRldmljZUluZm8udmVyc2lvbixcbiAgICAvLyAnX3MnOiBgJHtkZXZpY2VJbmZvLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCl9X3d4bWluaXByb2dyYW1gLFxuICAgIC8vICdfc3lzJzogZGV2aWNlSW5mby5zeXN0ZW0udG9Mb3dlckNhc2UoKSxcbiAgICAvLyAnX2dwcyc6IGRldmljZUluZm8uZ3BzIHx8ICcnXG4gIH1cbiAgLy8gb3B0aW9uLmRhdGEgPSB7XG4gIC8vICAgLi4ub3B0aW9uLmRhdGEsXG4gIC8vICAgLi4uY29va2llT2JqXG4gIC8vIH1cbiAgaWYgKCFvcHRpb24uaGVhZGVyKSB7XG4gICAgb3B0aW9uLmhlYWRlciA9IHt9XG4gIH1cbiAgb3B0aW9uLmhlYWRlci5Db29raWUgPSBPYmplY3Qua2V5cyhjb29raWVPYmopLm1hcCgoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGAke2tleX09JHtjb29raWVPYmpba2V5XX1gXG4gIH0pLmpvaW4oJzsnKVxuICAvLyDmlK/ku5jnvZHlhbPlv4XpobtcbiAgLy8g5pSv5LuY572R5YWz5b+F6aG75Yqg5LiK5b+F6KaB5a2X5q61X3Rva2VuXG4gIGlmICgvcGF5bWVudFxcL3NpZ25hdHVyZS8udGVzdChvcHRpb24udXJsKSkge1xuICAgIG9wdGlvbi5kYXRhLl90b2tlbiA9IHRva2VuXG4gIH1cbiAgb3B0aW9uLmRhdGEucHJpdmF0ZUtleSA9IHRva2VuXG4gIC8vIOivt+axguW4puS4iuadpea6kFxuICBvcHRpb24uZGF0YS5mcm9tID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2Zyb20nKVxufVxuXG4vKipcbiAqIOivt+axguWHveaVsFxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xuXG52YXIgcmVxdWVzdCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRpb24sIGlzQ2hlY2tMb2dpbikge1xuICAvLyBpc0NoZWNrTG9naW4gPSBvcHRpb24uaXNDaGVja1xuICBpc0NoZWNrTG9naW4gPSBmYWxzZVxuICAvLyBjb25zb2xlLmxvZyhvcHRpb24sIGlzQ2hlY2tMb2dpbilcbiAgdHJ5IHtcbiAgICB2YXIgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgIC8vIGlmIChpc0NoZWNrTG9naW4gPT09IHRydWUpIHtcbiAgICAvLyAgIHRva2VuID0gYXdhaXQgd3hDaGVja0xvZ2luKG9wdGlvbilcbiAgICAvLyB9XG4gICAgLy8gTE9HKCdnZXQgdG9rZW4nLCB0b2tlbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIExPRygn5pyq55m76ZmGLi4uJylcbiAgfVxuXG4gIC8vIGlmICh0b2tlbiB8fCAhaXNDaGVja0xvZ2luKSB7XG4gIHJlcXVlc3RCZWZvcmUob3B0aW9uLCB0b2tlbilcbiAgaWYgKGlzTW9jaykge1xuICAgIC8vIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pKVxuICAgIHJldHVybiByZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKS5kYXRhXG4gIH1cbiAgTE9HKCdzdGFydCByZXF1ZXN0IG9wdGlvbjonLCBvcHRpb24pXG4gIHZhciByZXFSZXMgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qob3B0aW9uKVxuICAvLyBjb25zb2xlLmxvZyhyZXFSZXMpXG4gIHJldHVybiByZXFSZXMuZGF0YVxuICAvLyB9XG59XG5cbi8qKlxuICog5qOA5p+l55m76ZmG5oCB5ZKMdG9rZW5cbiAqIEBwYXJhbSB7Kn0gb3B0aW9uICDor7fmsYLlrZfmrrUg5b2T55uR5rWL5Yiw5rKh5pyJ55m75b2V5pe2IOS/neWtmG9wdGlvbiDnmbvpmYblrozmiJDlkI7nu6fnu63or7fmsYJcbiAqIOeUseS6jmNoZWNrc3Npb27mjqXlj6Mg5pyJ55qE5pe25YCZIOS4gOebtOi/m+WOu2ZhaWwg5omA5LulIOWPlua2iOaOieajgOafpeeahOi/meS4gOatpVxuICovXG52YXIgd3hDaGVja0xvZ2luID0gYXN5bmMgb3B0aW9uID0+IHtcbiAgTE9HKCdjaGVjayB0b2tlbicpXG4gIGxldCBfdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICBpZiAoX3Rva2VuKSB7XG4gICAgTE9HKCd0b2tlbiBzdWNjOicsIF90b2tlbilcbiAgICByZXR1cm4gX3Rva2VuXG4gIH0gZWxzZSB7XG4gICAgTE9HKCd0b2tlbiBmYWlsOicsIF90b2tlbilcbiAgICByZXR1cm4gYXdhaXQgd3hMb2dpbihvcHRpb24pXG4gIH1cbn1cblxudmFyIGxvZ2luUmVxdWVzdCA9IGFzeW5jKCkgPT4ge1xuICBpZiAoIWxvZ2luQ29sbGVjdE9wdGlvbnMubGVuZ3RoKSByZXR1cm5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgYXdhaXQgcmVxdWVzdChsb2dpbkNvbGxlY3RPcHRpb25zW2ldKVxuICB9XG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMgPSBbXVxufVxuXG4vKipcbiAqIOeZu+W9lVxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xudmFyIHd4TG9naW4gPSBhc3luYyBvcHRpb24gPT4ge1xuICAvLyDmkJzpm4bnmbvlvZXnmoRyZXF1ZXN0IOi/meagt+mYsuatouivt+axguW+iOWkmuasoWNvZGUg6YeN5aSN5aSa5qyh55m75b2VXG4gIGxvZ2luQ29sbGVjdE9wdGlvbnMucHVzaChvcHRpb24pXG4gIGlmIChpc0xvZ2luSW5nKSB7XG4gICAgTE9HKCfmraPlnKjnmbvpmYYnKVxuICAgIHJldHVybiAnJ1xuICB9IGVsc2Uge1xuICAgIExPRygn5byA5aeL55m76ZmGJylcbiAgICBpc0xvZ2luSW5nID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbigpXG4gIGNvZGUgPSBsb2dpblJlcy5jb2RlXG4gIExPRygnZ2V0IGNvZGUnLCBjb2RlKVxuXG4gIHRyeSB7XG4gICAgdmFyIHVzZXJJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBsYW5nOiAnemhfQ04nXG4gICAgfSlcbiAgICBMT0coJ2dldCB1c2VySW5mbycsIHVzZXJJbmZvUmVzKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gIH1cblxuICBsZXQgX2RhdGEgPSB7XG4gICAgdXJsOiBET01BSU4gKyAnL2dnL2xvZ2luJyxcbiAgICBoZWFkZXI6IHtcbiAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgIH0sXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZGF0YToge1xuICAgICAgY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IHVzZXJJbmZvUmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogdXNlckluZm9SZXMuaXZcbiAgICB9XG4gIH1cbiAgTE9HKCdsb2dpbicsIF9kYXRhKVxuICB2YXIgcmVxUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KF9kYXRhKVxuICByZXFSZXMgPSByZXFSZXMuZGF0YVxuXG4gIGlmIChyZXFSZXMuc3VjYyAmJiByZXFSZXMuZGF0YSkge1xuICAgIExPRygnbG9naW4gc3VjYycsIHJlcVJlcylcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXFSZXMuZGF0YSlcbiAgICBpc0xvZ2luSW5nID0gZmFsc2VcbiAgICAvLyBhd2FpdCBsb2dpblJlcXVlc3QoKVxuICAgIHJldHVybiByZXFSZXMuZGF0YVxuICB9IGVsc2Uge1xuICAgIExPRygnbG9naW4gZmFpbCcsIHJlcVJlcylcbiAgICByZXR1cm4gJydcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0OiByZXF1ZXN0LFxuICB3eENoZWNrTG9naW46IHd4Q2hlY2tMb2dpblxufVxuIl19