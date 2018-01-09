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
              _context.next = 7;
              break;
            }

            console.log(require('../mock/' + _mockConfig2.default[option.url]));
            return _context.abrupt('return', require('../mock/' + _mockConfig2.default[option.url]).data);

          case 7:
            LOG('start request option:', option);
            _context.next = 10;
            return _wepy2.default.request(option);

          case 10:
            reqRes = _context.sent;

            console.log(reqRes);
            return _context.abrupt('return', reqRes.data);

          case 13:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiaXNMb2dpbkluZyIsImxvZ2luQ29sbGVjdE9wdGlvbnMiLCJMT0ciLCJjb25zb2xlIiwibG9nIiwid3hQcm9taXNpZnkiLCJmbiIsIm9iaiIsImlzQ2hlY2tMb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIiwicmVxdWVzdEJlZm9yZSIsIm9wdGlvbiIsInRva2VuIiwidGVzdCIsInVybCIsImRldmljZUluZm8iLCJjb29raWVPYmoiLCJoZWFkZXIiLCJDb29raWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsIl90b2tlbiIsInByaXZhdGVLZXkiLCJmcm9tIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJlIiwicmVxUmVzIiwid3hDaGVja0xvZ2luIiwid3hMb2dpbiIsImxvZ2luUmVxdWVzdCIsImxlbmd0aCIsImkiLCJwdXNoIiwibG9naW4iLCJsb2dpblJlcyIsImdldFVzZXJJbmZvIiwibGFuZyIsInVzZXJJbmZvUmVzIiwiX2RhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzdWNjIiwic2V0U3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBRkE7OztBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxhQUFhLEtBQWpCO0FBQ0EsSUFBSUMsc0JBQXNCLEVBQTFCLEMsQ0FBNkI7QUFDN0IsSUFBSUMsTUFBTUMsUUFBUUMsR0FBUixJQUFnQixZQUFNLENBQUUsQ0FBbEM7O0FBRUE7OztBQUdBLElBQUlDLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxFQUFELEVBQVE7QUFDeEIsU0FBTyxZQUFrQztBQUFBLFFBQXhCQyxHQUF3Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkQyxZQUFjOztBQUN2Q0EsbUJBQWUsS0FBZjtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0osVUFBSUMsWUFBSixHQUFtQkEsWUFBbkI7QUFDQUQsVUFBSUssT0FBSixHQUFjLFVBQVVDLEdBQVYsRUFBZTtBQUMzQixZQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWkosa0JBQVFHLElBQUlDLElBQVo7QUFDRDtBQUNESixnQkFBUUcsR0FBUjtBQUNELE9BTEQ7QUFNQU4sVUFBSVEsSUFBSixHQUFXLFVBQVVGLEdBQVYsRUFBZTtBQUN4QkYsZUFBT0UsR0FBUDtBQUNELE9BRkQ7QUFHQVAsU0FBR0MsR0FBSDtBQUNELEtBWk0sQ0FBUDtBQWFELEdBZkQ7QUFnQkQsQ0FqQkQ7QUFrQkE7Ozs7O0FBS0EsSUFBSVMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDckMsR0FBQ0QsT0FBT0gsSUFBUixLQUFpQkcsT0FBT0gsSUFBUCxHQUFjLEVBQS9COztBQUVBLEdBQUMsUUFBUUssSUFBUixDQUFhRixPQUFPRyxHQUFwQixDQUFELEtBQThCSCxPQUFPRyxHQUFQLEdBQWF0QixTQUFTbUIsT0FBT0csR0FBM0Q7QUFDQTtBQUNBO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBLE1BQUlDLFlBQVk7QUFDZCxlQUFXSjtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFYZ0IsR0FBaEIsQ0FZQSxJQUFJLENBQUNELE9BQU9NLE1BQVosRUFBb0I7QUFDbEJOLFdBQU9NLE1BQVAsR0FBZ0IsRUFBaEI7QUFDRDtBQUNETixTQUFPTSxNQUFQLENBQWNDLE1BQWQsR0FBdUJDLE9BQU9DLElBQVAsQ0FBWUosU0FBWixFQUF1QkssR0FBdkIsQ0FBMkIsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pELFdBQVVBLEdBQVYsU0FBaUJOLFVBQVVNLEdBQVYsQ0FBakI7QUFDRCxHQUZzQixFQUVwQkMsSUFGb0IsQ0FFZixHQUZlLENBQXZCO0FBR0E7QUFDQTtBQUNBLE1BQUkscUJBQXFCVixJQUFyQixDQUEwQkYsT0FBT0csR0FBakMsQ0FBSixFQUEyQztBQUN6Q0gsV0FBT0gsSUFBUCxDQUFZZ0IsTUFBWixHQUFxQlosS0FBckI7QUFDRDtBQUNERCxTQUFPSCxJQUFQLENBQVlpQixVQUFaLEdBQXlCYixLQUF6QjtBQUNBO0FBQ0FELFNBQU9ILElBQVAsQ0FBWWtCLElBQVosR0FBbUJDLEdBQUdDLGNBQUgsQ0FBa0IsTUFBbEIsQ0FBbkI7QUFDRCxDQWpDRDs7QUFtQ0E7Ozs7O0FBS0EsSUFBSUM7QUFBQSxxRUFBVSxpQkFBZ0JsQixNQUFoQixFQUF3QlQsWUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1o7QUFDQUEsMkJBQWUsS0FBZjtBQUNBTCxvQkFBUUMsR0FBUixDQUFZYSxNQUFaLEVBQW9CVCxZQUFwQjtBQUNBLGdCQUFJO0FBQ0VVLG1CQURGLEdBQ1VlLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FEVjtBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsYUFORCxDQU1FLE9BQU9FLENBQVAsRUFBVTtBQUNWbEMsa0JBQUksUUFBSjtBQUNEOztBQUVEO0FBQ0FjLDBCQUFjQyxNQUFkLEVBQXNCQyxLQUF0Qjs7QUFmWSxpQkFnQlJyQixNQWhCUTtBQUFBO0FBQUE7QUFBQTs7QUFpQlZNLG9CQUFRQyxHQUFSLENBQVlSLFFBQVEsYUFBYSxxQkFBV3FCLE9BQU9HLEdBQWxCLENBQXJCLENBQVo7QUFqQlUsNkNBa0JIeEIsUUFBUSxhQUFhLHFCQUFXcUIsT0FBT0csR0FBbEIsQ0FBckIsRUFBNkNOLElBbEIxQzs7QUFBQTtBQW9CWlosZ0JBQUksdUJBQUosRUFBNkJlLE1BQTdCO0FBcEJZO0FBQUEsbUJBcUJPLGVBQUtrQixPQUFMLENBQWFsQixNQUFiLENBckJQOztBQUFBO0FBcUJSb0Isa0JBckJROztBQXNCWmxDLG9CQUFRQyxHQUFSLENBQVlpQyxNQUFaO0FBdEJZLDZDQXVCTEEsT0FBT3ZCLElBdkJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSjs7QUEyQkE7Ozs7O0FBS0EsSUFBSXdCO0FBQUEsc0VBQWUsa0JBQU1yQixNQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDakJmLGdCQUFJLGFBQUo7QUFDSTRCLGtCQUZhLEdBRUpHLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FGSTs7QUFBQSxpQkFHYkosTUFIYTtBQUFBO0FBQUE7QUFBQTs7QUFJZjVCLGdCQUFJLGFBQUosRUFBbUI0QixNQUFuQjtBQUplLDhDQUtSQSxNQUxROztBQUFBO0FBT2Y1QixnQkFBSSxhQUFKLEVBQW1CNEIsTUFBbkI7QUFQZTtBQUFBLG1CQVFGUyxRQUFRdEIsTUFBUixDQVJFOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFKOztBQVlBLElBQUl1QjtBQUFBLHNFQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNadkMsb0JBQW9Cd0MsTUFEUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUVSQyxhQUZRLEdBRUosQ0FGSTs7QUFBQTtBQUFBLGtCQUVEQSxJQUFJekMsb0JBQW9Cd0MsTUFGdkI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFHVE4sUUFBUWxDLG9CQUFvQnlDLENBQXBCLENBQVIsQ0FIUzs7QUFBQTtBQUUrQkEsZUFGL0I7QUFBQTtBQUFBOztBQUFBO0FBS2pCekMsa0NBQXNCLEVBQXRCOztBQUxpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7O0FBUUE7Ozs7QUFJQSxJQUFJc0M7QUFBQSxzRUFBVSxrQkFBTXRCLE1BQU47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNaO0FBQ0FoQixnQ0FBb0IwQyxJQUFwQixDQUF5QjFCLE1BQXpCOztBQUZZLGlCQUdSakIsVUFIUTtBQUFBO0FBQUE7QUFBQTs7QUFJVkUsZ0JBQUksTUFBSjtBQUpVLDhDQUtILEVBTEc7O0FBQUE7QUFPVkEsZ0JBQUksTUFBSjtBQUNBRix5QkFBYSxJQUFiOztBQVJVO0FBQUE7QUFBQSxtQkFXUyxlQUFLNEMsS0FBTCxFQVhUOztBQUFBO0FBV1JDLG9CQVhROztBQVlaOUMsbUJBQU84QyxTQUFTOUMsSUFBaEI7QUFDQUcsZ0JBQUksVUFBSixFQUFnQkgsSUFBaEI7O0FBYlk7QUFBQTtBQUFBLG1CQWdCYyxlQUFLK0MsV0FBTCxDQUFpQjtBQUN2Q0Msb0JBQU07QUFEaUMsYUFBakIsQ0FoQmQ7O0FBQUE7QUFnQk5DLHVCQWhCTTs7QUFtQlY5QyxnQkFBSSxjQUFKLEVBQW9COEMsV0FBcEI7QUFuQlU7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBcUJWaEQseUJBQWEsS0FBYjs7QUFyQlU7QUF3QlJpRCxpQkF4QlEsR0F3QkE7QUFDVjdCLG1CQUFLdEIsU0FBUyxXQURKO0FBRVZ5QixzQkFBUTtBQUNOLGdDQUFnQjtBQURWLGVBRkU7QUFLVjJCLHNCQUFRLE1BTEU7QUFNVnBDLG9CQUFNO0FBQ0pmLHNCQUFNQSxJQURGO0FBRUpvRCwrQkFBZUgsWUFBWUcsYUFGdkI7QUFHSkMsb0JBQUlKLFlBQVlJO0FBSFo7QUFOSSxhQXhCQTs7QUFvQ1psRCxnQkFBSSxPQUFKLEVBQWErQyxLQUFiO0FBcENZO0FBQUEsbUJBcUNPLGVBQUtkLE9BQUwsQ0FBYWMsS0FBYixDQXJDUDs7QUFBQTtBQXFDUlosa0JBckNROztBQXNDWkEscUJBQVNBLE9BQU92QixJQUFoQjs7QUF0Q1ksa0JBd0NSdUIsT0FBT2dCLElBQVAsSUFBZWhCLE9BQU92QixJQXhDZDtBQUFBO0FBQUE7QUFBQTs7QUF5Q1ZaLGdCQUFJLFlBQUosRUFBa0JtQyxNQUFsQjtBQUNBSixlQUFHcUIsY0FBSCxDQUFrQixPQUFsQixFQUEyQmpCLE9BQU92QixJQUFsQztBQUNBZCx5QkFBYSxLQUFiO0FBQ0E7QUE1Q1UsOENBNkNIcUMsT0FBT3ZCLElBN0NKOztBQUFBO0FBK0NWWixnQkFBSSxZQUFKLEVBQWtCbUMsTUFBbEI7QUEvQ1UsOENBZ0RILEVBaERHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSjs7QUFvREFrQixPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGtDQURlO0FBRWYzRCxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmUSwwQkFKZTtBQUtmOEIsV0FBU0EsT0FMTTtBQU1mRyxnQkFBY0E7QUFOQyxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBtb2NrQ29uZmlnIGZyb20gJy4uL21vY2svbW9ja0NvbmZpZydcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBpc0xvZ2luSW5nID0gZmFsc2VcbnZhciBsb2dpbkNvbGxlY3RPcHRpb25zID0gW10gLy8g6K+35rGC5pCc6ZuG5ZmoXG52YXIgTE9HID0gY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KVxuXG4vKipcbiAqIOWwgeijhXd4UHJvbWlzZWZ5XG4gKi9cbnZhciB3eFByb21pc2lmeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9LCBpc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrTG9naW4gPSBmYWxzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvYmouaXNDaGVja0xvZ2luID0gaXNDaGVja0xvZ2luXG4gICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgIH1cbiAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgIH0pXG4gIH1cbn1cbi8qKlxuICog55m76ZmG5YmN55qE5YeG5aSHXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICogQHBhcmFtIHsqfSB0b2tlblxuICovXG52YXIgcmVxdWVzdEJlZm9yZSA9IChvcHRpb24sIHRva2VuKSA9PiB7XG4gICFvcHRpb24uZGF0YSAmJiAob3B0aW9uLmRhdGEgPSB7fSlcblxuICAhL15odHRwLy50ZXN0KG9wdGlvbi51cmwpICYmIChvcHRpb24udXJsID0gRE9NQUlOICsgb3B0aW9uLnVybClcbiAgLy8g5re75Yqg5b+F6KaB55qE6L6F5Yqp5a2X5patXG4gIC8vIHZhciBkZXZpY2VJbmZvID0gZ2V0QXBwKCkuZ2V0RGV2aWNlSW5mbygpXG4gIHZhciBkZXZpY2VJbmZvID0ge31cbiAgdmFyIGNvb2tpZU9iaiA9IHtcbiAgICAndGdfYXV0aCc6IHRva2VuXG4gICAgLy8gJ192JzogY29uZmlnLl92LFxuICAgIC8vICd3eHYnOiBkZXZpY2VJbmZvLnZlcnNpb24sXG4gICAgLy8gJ19zJzogYCR7ZGV2aWNlSW5mby5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpfV93eG1pbmlwcm9ncmFtYCxcbiAgICAvLyAnX3N5cyc6IGRldmljZUluZm8uc3lzdGVtLnRvTG93ZXJDYXNlKCksXG4gICAgLy8gJ19ncHMnOiBkZXZpY2VJbmZvLmdwcyB8fCAnJ1xuICB9XG4gIC8vIG9wdGlvbi5kYXRhID0ge1xuICAvLyAgIC4uLm9wdGlvbi5kYXRhLFxuICAvLyAgIC4uLmNvb2tpZU9ialxuICAvLyB9XG4gIGlmICghb3B0aW9uLmhlYWRlcikge1xuICAgIG9wdGlvbi5oZWFkZXIgPSB7fVxuICB9XG4gIG9wdGlvbi5oZWFkZXIuQ29va2llID0gT2JqZWN0LmtleXMoY29va2llT2JqKS5tYXAoKGtleSkgPT4ge1xuICAgIHJldHVybiBgJHtrZXl9PSR7Y29va2llT2JqW2tleV19YFxuICB9KS5qb2luKCc7JylcbiAgLy8g5pSv5LuY572R5YWz5b+F6aG7XG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu+WKoOS4iuW/heimgeWtl+autV90b2tlblxuICBpZiAoL3BheW1lbnRcXC9zaWduYXR1cmUvLnRlc3Qob3B0aW9uLnVybCkpIHtcbiAgICBvcHRpb24uZGF0YS5fdG9rZW4gPSB0b2tlblxuICB9XG4gIG9wdGlvbi5kYXRhLnByaXZhdGVLZXkgPSB0b2tlblxuICAvLyDor7fmsYLluKbkuIrmnaXmupBcbiAgb3B0aW9uLmRhdGEuZnJvbSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdmcm9tJylcbn1cblxuLyoqXG4gKiDor7fmsYLlh73mlbBcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cblxudmFyIHJlcXVlc3QgPSBhc3luYyBmdW5jdGlvbiAob3B0aW9uLCBpc0NoZWNrTG9naW4pIHtcbiAgLy8gaXNDaGVja0xvZ2luID0gb3B0aW9uLmlzQ2hlY2tcbiAgaXNDaGVja0xvZ2luID0gZmFsc2VcbiAgY29uc29sZS5sb2cob3B0aW9uLCBpc0NoZWNrTG9naW4pXG4gIHRyeSB7XG4gICAgdmFyIHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAvLyBpZiAoaXNDaGVja0xvZ2luID09PSB0cnVlKSB7XG4gICAgLy8gICB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbihvcHRpb24pXG4gICAgLy8gfVxuICAgIC8vIExPRygnZ2V0IHRva2VuJywgdG9rZW4pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBMT0coJ+acqueZu+mZhi4uLicpXG4gIH1cblxuICAvLyBpZiAodG9rZW4gfHwgIWlzQ2hlY2tMb2dpbikge1xuICByZXF1ZXN0QmVmb3JlKG9wdGlvbiwgdG9rZW4pXG4gIGlmIChpc01vY2spIHtcbiAgICBjb25zb2xlLmxvZyhyZXF1aXJlKCcuLi9tb2NrLycgKyBtb2NrQ29uZmlnW29wdGlvbi51cmxdKSlcbiAgICByZXR1cm4gcmVxdWlyZSgnLi4vbW9jay8nICsgbW9ja0NvbmZpZ1tvcHRpb24udXJsXSkuZGF0YVxuICB9XG4gIExPRygnc3RhcnQgcmVxdWVzdCBvcHRpb246Jywgb3B0aW9uKVxuICB2YXIgcmVxUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KG9wdGlvbilcbiAgY29uc29sZS5sb2cocmVxUmVzKVxuICByZXR1cm4gcmVxUmVzLmRhdGFcbiAgLy8gfVxufVxuXG4vKipcbiAqIOajgOafpeeZu+mZhuaAgeWSjHRva2VuXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAg6K+35rGC5a2X5q61IOW9k+ebkea1i+WIsOayoeacieeZu+W9leaXtiDkv53lrZhvcHRpb24g55m76ZmG5a6M5oiQ5ZCO57un57ut6K+35rGCXG4gKiDnlLHkuo5jaGVja3NzaW9u5o6l5Y+jIOacieeahOaXtuWAmSDkuIDnm7Tov5vljrtmYWlsIOaJgOS7pSDlj5bmtojmjonmo4Dmn6XnmoTov5nkuIDmraVcbiAqL1xudmFyIHd4Q2hlY2tMb2dpbiA9IGFzeW5jIG9wdGlvbiA9PiB7XG4gIExPRygnY2hlY2sgdG9rZW4nKVxuICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgaWYgKF90b2tlbikge1xuICAgIExPRygndG9rZW4gc3VjYzonLCBfdG9rZW4pXG4gICAgcmV0dXJuIF90b2tlblxuICB9IGVsc2Uge1xuICAgIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gICAgcmV0dXJuIGF3YWl0IHd4TG9naW4ob3B0aW9uKVxuICB9XG59XG5cbnZhciBsb2dpblJlcXVlc3QgPSBhc3luYygpID0+IHtcbiAgaWYgKCFsb2dpbkNvbGxlY3RPcHRpb25zLmxlbmd0aCkgcmV0dXJuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9naW5Db2xsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGF3YWl0IHJlcXVlc3QobG9naW5Db2xsZWN0T3B0aW9uc1tpXSlcbiAgfVxuICBsb2dpbkNvbGxlY3RPcHRpb25zID0gW11cbn1cblxuLyoqXG4gKiDnmbvlvZVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cbnZhciB3eExvZ2luID0gYXN5bmMgb3B0aW9uID0+IHtcbiAgLy8g5pCc6ZuG55m75b2V55qEcmVxdWVzdCDov5nmoLfpmLLmraLor7fmsYLlvojlpJrmrKFjb2RlIOmHjeWkjeWkmuasoeeZu+W9lVxuICBsb2dpbkNvbGxlY3RPcHRpb25zLnB1c2gob3B0aW9uKVxuICBpZiAoaXNMb2dpbkluZykge1xuICAgIExPRygn5q2j5Zyo55m76ZmGJylcbiAgICByZXR1cm4gJydcbiAgfSBlbHNlIHtcbiAgICBMT0coJ+W8gOWni+eZu+mZhicpXG4gICAgaXNMb2dpbkluZyA9IHRydWVcbiAgfVxuXG4gIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oKVxuICBjb2RlID0gbG9naW5SZXMuY29kZVxuICBMT0coJ2dldCBjb2RlJywgY29kZSlcblxuICB0cnkge1xuICAgIHZhciB1c2VySW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgbGFuZzogJ3poX0NOJ1xuICAgIH0pXG4gICAgTE9HKCdnZXQgdXNlckluZm8nLCB1c2VySW5mb1JlcylcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlzTG9naW5JbmcgPSBmYWxzZVxuICB9XG5cbiAgbGV0IF9kYXRhID0ge1xuICAgIHVybDogRE9NQUlOICsgJy9nZy9sb2dpbicsXG4gICAgaGVhZGVyOiB7XG4gICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICB9LFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IHtcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiB1c2VySW5mb1Jlcy5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IHVzZXJJbmZvUmVzLml2XG4gICAgfVxuICB9XG4gIExPRygnbG9naW4nLCBfZGF0YSlcbiAgdmFyIHJlcVJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdChfZGF0YSlcbiAgcmVxUmVzID0gcmVxUmVzLmRhdGFcblxuICBpZiAocmVxUmVzLnN1Y2MgJiYgcmVxUmVzLmRhdGEpIHtcbiAgICBMT0coJ2xvZ2luIHN1Y2MnLCByZXFSZXMpXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVxUmVzLmRhdGEpXG4gICAgaXNMb2dpbkluZyA9IGZhbHNlXG4gICAgLy8gYXdhaXQgbG9naW5SZXF1ZXN0KClcbiAgICByZXR1cm4gcmVxUmVzLmRhdGFcbiAgfSBlbHNlIHtcbiAgICBMT0coJ2xvZ2luIGZhaWwnLCByZXFSZXMpXG4gICAgcmV0dXJuICcnXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vY2tDb25maWcsXG4gIERPTUFJTixcbiAgaXNNb2NrLFxuICB3eFByb21pc2lmeSxcbiAgcmVxdWVzdDogcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luOiB3eENoZWNrTG9naW5cbn1cbiJdfQ==