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
var LOG = console.log || function () {};
// var LOG = () => {}

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
    var token, reqRes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = wx.getStorageSync('token') || '';

            requestBefore(option, token);

            if (!isMock) {
              _context.next = 5;
              break;
            }

            console.log(require('../mock/' + _mockConfig2.default[option.url]).data);
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

  return function request(_x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} key  授权的信息
 * @param {*} isforce 强制授权会循环弹窗
 */
var getAth = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, isforce, gps) {
    var scope, settingRes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            scope = 'scope.' + key;
            _context2.next = 3;
            return _wepy2.default.getSetting();

          case 3:
            settingRes = _context2.sent;

            console.log(settingRes);
            _context2.prev = 5;

            if (!(settingRes.authSetting[scope] === false)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 9;
            return showRegetAuthModal(scope, isforce, gps);

          case 9:
            _context2.next = 16;
            break;

          case 11:
            if (!settingRes.authSetting[scope]) {
              _context2.next = 14;
              break;
            }

            _context2.next = 16;
            break;

          case 14:
            _context2.next = 16;
            return _wepy2.default.authorize({
              'scope': scope
            });

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](5);
            throw new Error();

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 18]]);
  }));

  return function getAth(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 *
 * @param {*} scope 授权信息
 * @param {*} authRes 回调
 * @param {*} isforce 强制弹窗
 */
var showRegetAuthModal = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(scope, isforce, gps) {
    var showModalRes, openSettingRes, settingRes;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _wepy2.default.showModal({
              title: gps ? '请在设置中打开地理位置授权' : '请在设置中打开用户信息授权',
              content: gps ? '未获取您的地理位置将无法使用离我最近功能' : '未获取您的公开信息（昵称、头像等）将无法使用鼓励金和报名活动',
              confirmText: '去设置',
              showCancel: true
            });

          case 3:
            showModalRes = _context3.sent;

            if (!showModalRes.confirm) {
              _context3.next = 16;
              break;
            }

            _context3.next = 7;
            return _wepy2.default.openSetting();

          case 7:
            openSettingRes = _context3.sent;
            _context3.next = 10;
            return _wepy2.default.getSetting();

          case 10:
            settingRes = _context3.sent;

            console.log(openSettingRes, settingRes);

            if (!(openSettingRes.authSetting[scope] || settingRes.authSetting[scope])) {
              _context3.next = 15;
              break;
            }

            _context3.next = 16;
            break;

          case 15:
            throw new Error();

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3['catch'](0);
            throw new Error();

          case 21:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 18]]);
  }));

  return function showRegetAuthModal(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * －－－－－－已经废弃－－－－－－－
 * 检查登陆态和token
 * @param {*} option  请求字段 当监测到没有登录时 保存option 登陆完成后继续请求
 * 由于checkssion接口 有的时候 一直进去fail 所以 取消掉检查的这一步
 */
var wxCheckLogin = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(option) {
    var _token;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            LOG('check token');
            _token = wx.getStorageSync('token');

            if (!_token) {
              _context4.next = 7;
              break;
            }

            LOG('token succ:', _token);
            return _context4.abrupt('return', _token);

          case 7:
            LOG('token fail:', _token);
            _context4.next = 10;
            return wxLogin(option);

          case 10:
            return _context4.abrupt('return', _context4.sent);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function wxCheckLogin(_x9) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 登录
 * @param {*} option
 */
var wxLogin = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(option) {
    var _token, loginRes, userInfoRes, _data, reqRes;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            // check code
            LOG('check token');
            _token = wx.getStorageSync('token');

            if (!(_token || isMock)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return');

          case 5:
            _context5.next = 7;
            return _wepy2.default.login();

          case 7:
            loginRes = _context5.sent;

            code = loginRes.code;
            LOG('get code', code);

            // get userInfo
            _context5.next = 12;
            return getAth('userInfo');

          case 12:
            _context5.next = 14;
            return _wepy2.default.getUserInfo({
              lang: 'zh_CN'
            });

          case 14:
            userInfoRes = _context5.sent;

            LOG('get userInfo', userInfoRes);

            // get token
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
            _context5.next = 20;
            return _wepy2.default.request(_data);

          case 20:
            reqRes = _context5.sent;

            reqRes = reqRes.data;

            if (!(reqRes.succ && reqRes.data)) {
              _context5.next = 27;
              break;
            }

            LOG('login succ', reqRes);
            wx.setStorageSync('token', reqRes.data);
            _context5.next = 28;
            break;

          case 27:
            throw new Error();

          case 28:
            _context5.next = 33;
            break;

          case 30:
            _context5.prev = 30;
            _context5.t0 = _context5['catch'](0);
            throw new Error();

          case 33:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 30]]);
  }));

  return function wxLogin(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  mockConfig: _mockConfig2.default,
  DOMAIN: DOMAIN,
  isMock: isMock,
  wxPromisify: wxPromisify,
  request: request,
  wxLogin: wxLogin,
  getAth: getAth
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiTE9HIiwiY29uc29sZSIsImxvZyIsInd4UHJvbWlzaWZ5IiwiZm4iLCJvYmoiLCJpc0NoZWNrTG9naW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwiZmFpbCIsInJlcXVlc3RCZWZvcmUiLCJvcHRpb24iLCJ0b2tlbiIsInRlc3QiLCJ1cmwiLCJkZXZpY2VJbmZvIiwiY29va2llT2JqIiwiaGVhZGVyIiwiQ29va2llIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsImpvaW4iLCJfdG9rZW4iLCJwcml2YXRlS2V5IiwiZnJvbSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwicmVxUmVzIiwiZ2V0QXRoIiwiaXNmb3JjZSIsImdwcyIsInNjb3BlIiwiZ2V0U2V0dGluZyIsInNldHRpbmdSZXMiLCJhdXRoU2V0dGluZyIsInNob3dSZWdldEF1dGhNb2RhbCIsImF1dGhvcml6ZSIsIkVycm9yIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY29uZmlybVRleHQiLCJzaG93Q2FuY2VsIiwic2hvd01vZGFsUmVzIiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwib3BlblNldHRpbmdSZXMiLCJ3eENoZWNrTG9naW4iLCJ3eExvZ2luIiwibG9naW4iLCJsb2dpblJlcyIsImdldFVzZXJJbmZvIiwibGFuZyIsInVzZXJJbmZvUmVzIiwiX2RhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzdWNjIiwic2V0U3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBRkE7OztBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0UsTUFBUCxJQUFpQixLQUE5QjtBQUNBLElBQUlDLFNBQVNILE9BQU9HLE1BQVAsSUFBaUIsRUFBOUI7QUFDQSxJQUFJQyxPQUFPLEVBQVg7QUFDQSxJQUFJQyxNQUFNQyxRQUFRQyxHQUFSLElBQWdCLFlBQU0sQ0FBRSxDQUFsQztBQUNBOztBQUVBOzs7QUFHQSxJQUFJQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsRUFBRCxFQUFRO0FBQ3hCLFNBQU8sWUFBa0M7QUFBQSxRQUF4QkMsR0FBd0IsdUVBQWxCLEVBQWtCO0FBQUEsUUFBZEMsWUFBYzs7QUFDdkNBLG1CQUFlLEtBQWY7QUFDQSxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENKLFVBQUlDLFlBQUosR0FBbUJBLFlBQW5CO0FBQ0FELFVBQUlLLE9BQUosR0FBYyxVQUFVQyxHQUFWLEVBQWU7QUFDM0IsWUFBSUEsSUFBSUMsSUFBUixFQUFjO0FBQ1pKLGtCQUFRRyxJQUFJQyxJQUFaO0FBQ0Q7QUFDREosZ0JBQVFHLEdBQVI7QUFDRCxPQUxEO0FBTUFOLFVBQUlRLElBQUosR0FBVyxVQUFVRixHQUFWLEVBQWU7QUFDeEJGLGVBQU9FLEdBQVA7QUFDRCxPQUZEO0FBR0FQLFNBQUdDLEdBQUg7QUFDRCxLQVpNLENBQVA7QUFhRCxHQWZEO0FBZ0JELENBakJEO0FBa0JBOzs7OztBQUtBLElBQUlTLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQ3JDLEdBQUNELE9BQU9ILElBQVIsS0FBaUJHLE9BQU9ILElBQVAsR0FBYyxFQUEvQjs7QUFFQSxHQUFDLFFBQVFLLElBQVIsQ0FBYUYsT0FBT0csR0FBcEIsQ0FBRCxLQUE4QkgsT0FBT0csR0FBUCxHQUFhcEIsU0FBU2lCLE9BQU9HLEdBQTNEO0FBQ0E7QUFDQTtBQUNBLE1BQUlDLGFBQWEsRUFBakI7QUFDQSxNQUFJQyxZQUFZO0FBQ2QsZUFBV0o7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBWGdCLEdBQWhCLENBWUEsSUFBSSxDQUFDRCxPQUFPTSxNQUFaLEVBQW9CO0FBQ2xCTixXQUFPTSxNQUFQLEdBQWdCLEVBQWhCO0FBQ0Q7QUFDRE4sU0FBT00sTUFBUCxDQUFjQyxNQUFkLEdBQXVCQyxPQUFPQyxJQUFQLENBQVlKLFNBQVosRUFBdUJLLEdBQXZCLENBQTJCLFVBQUNDLEdBQUQsRUFBUztBQUN6RCxXQUFVQSxHQUFWLFNBQWlCTixVQUFVTSxHQUFWLENBQWpCO0FBQ0QsR0FGc0IsRUFFcEJDLElBRm9CLENBRWYsR0FGZSxDQUF2QjtBQUdBO0FBQ0EsTUFBSSxxQkFBcUJWLElBQXJCLENBQTBCRixPQUFPRyxHQUFqQyxDQUFKLEVBQTJDO0FBQ3pDSCxXQUFPSCxJQUFQLENBQVlnQixNQUFaLEdBQXFCWixLQUFyQjtBQUNEO0FBQ0RELFNBQU9ILElBQVAsQ0FBWWlCLFVBQVosR0FBeUJiLEtBQXpCO0FBQ0E7QUFDQUQsU0FBT0gsSUFBUCxDQUFZa0IsSUFBWixHQUFtQkMsR0FBR0MsY0FBSCxDQUFrQixNQUFsQixDQUFuQjtBQUNELENBaENEOztBQWtDQTs7Ozs7QUFLQSxJQUFJQztBQUFBLHFFQUFVLGlCQUFnQmxCLE1BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNSQyxpQkFEUSxHQUNBZSxHQUFHQyxjQUFILENBQWtCLE9BQWxCLEtBQThCLEVBRDlCOztBQUVabEIsMEJBQWNDLE1BQWQsRUFBc0JDLEtBQXRCOztBQUZZLGlCQUdSbkIsTUFIUTtBQUFBO0FBQUE7QUFBQTs7QUFJVkksb0JBQVFDLEdBQVIsQ0FBWU4sUUFBUSxhQUFhLHFCQUFXbUIsT0FBT0csR0FBbEIsQ0FBckIsRUFBNkNOLElBQXpEO0FBSlUsNkNBS0hoQixRQUFRLGFBQWEscUJBQVdtQixPQUFPRyxHQUFsQixDQUFyQixFQUE2Q04sSUFMMUM7O0FBQUE7QUFPWlosZ0JBQUksdUJBQUosRUFBNkJlLE1BQTdCO0FBUFk7QUFBQSxtQkFRTyxlQUFLa0IsT0FBTCxDQUFhbEIsTUFBYixDQVJQOztBQUFBO0FBUVJtQixrQkFSUTtBQUFBLDZDQVNMQSxPQUFPdEIsSUFURjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7QUFXQTs7Ozs7QUFLQSxJQUFJdUI7QUFBQSxzRUFBUyxrQkFBTVQsR0FBTixFQUFXVSxPQUFYLEVBQW9CQyxHQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUEMsaUJBRE8sR0FDQyxXQUFXWixHQURaO0FBQUE7QUFBQSxtQkFFWSxlQUFLYSxVQUFMLEVBRlo7O0FBQUE7QUFFUEMsc0JBRk87O0FBR1h2QyxvQkFBUUMsR0FBUixDQUFZc0MsVUFBWjtBQUhXOztBQUFBLGtCQUtMQSxXQUFXQyxXQUFYLENBQXVCSCxLQUF2QixNQUFrQyxLQUw3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQU1ESSxtQkFBbUJKLEtBQW5CLEVBQTBCRixPQUExQixFQUFtQ0MsR0FBbkMsQ0FOQzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkFPRUcsV0FBV0MsV0FBWCxDQUF1QkgsS0FBdkIsQ0FQRjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFVRCxlQUFLSyxTQUFMLENBQWU7QUFDbkIsdUJBQVNMO0FBRFUsYUFBZixDQVZDOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFlSCxJQUFJTSxLQUFKLEVBZkc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBVDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFKOztBQW1CQTs7Ozs7O0FBTUEsSUFBSUY7QUFBQSxzRUFBcUIsa0JBQU1KLEtBQU4sRUFBYUYsT0FBYixFQUFzQkMsR0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVJLGVBQUtRLFNBQUwsQ0FBZTtBQUN0Q0MscUJBQU9ULE1BQU0sZUFBTixHQUF3QixlQURPO0FBRXRDVSx1QkFBU1YsTUFBTSxzQkFBTixHQUErQixnQ0FGRjtBQUd0Q1csMkJBQWEsS0FIeUI7QUFJdENDLDBCQUFZO0FBSjBCLGFBQWYsQ0FGSjs7QUFBQTtBQUVqQkMsd0JBRmlCOztBQUFBLGlCQVNqQkEsYUFBYUMsT0FUSTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVVRLGVBQUtDLFdBQUwsRUFWUjs7QUFBQTtBQVVmQywwQkFWZTtBQUFBO0FBQUEsbUJBV0ksZUFBS2QsVUFBTCxFQVhKOztBQUFBO0FBV2ZDLHNCQVhlOztBQVluQnZDLG9CQUFRQyxHQUFSLENBQVltRCxjQUFaLEVBQTRCYixVQUE1Qjs7QUFabUIsa0JBYWZhLGVBQWVaLFdBQWYsQ0FBMkJILEtBQTNCLEtBQXFDRSxXQUFXQyxXQUFYLENBQXVCSCxLQUF2QixDQWJ0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUEsa0JBbUJYLElBQUlNLEtBQUosRUFuQlc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQXVCZixJQUFJQSxLQUFKLEVBdkJlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7O0FBMkJBOzs7Ozs7QUFNQSxJQUFJVTtBQUFBLHNFQUFlLGtCQUFNdkMsTUFBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2pCZixnQkFBSSxhQUFKO0FBQ0k0QixrQkFGYSxHQUVKRyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLENBRkk7O0FBQUEsaUJBR2JKLE1BSGE7QUFBQTtBQUFBO0FBQUE7O0FBSWY1QixnQkFBSSxhQUFKLEVBQW1CNEIsTUFBbkI7QUFKZSw4Q0FLUkEsTUFMUTs7QUFBQTtBQU9mNUIsZ0JBQUksYUFBSixFQUFtQjRCLE1BQW5CO0FBUGU7QUFBQSxtQkFRRjJCLFFBQVF4QyxNQUFSLENBUkU7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUo7QUFXQTs7OztBQUlBLElBQUl3QztBQUFBLHNFQUFVLGtCQUFNeEMsTUFBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRVY7QUFDQWYsZ0JBQUksYUFBSjtBQUNJNEIsa0JBSk0sR0FJR0csR0FBR0MsY0FBSCxDQUFrQixPQUFsQixDQUpIOztBQUFBLGtCQUtOSixVQUFVL0IsTUFMSjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUJBU1csZUFBSzJELEtBQUwsRUFUWDs7QUFBQTtBQVNOQyxvQkFUTTs7QUFVVjFELG1CQUFPMEQsU0FBUzFELElBQWhCO0FBQ0FDLGdCQUFJLFVBQUosRUFBZ0JELElBQWhCOztBQUVBO0FBYlU7QUFBQSxtQkFjSm9DLE9BQU8sVUFBUCxDQWRJOztBQUFBO0FBQUE7QUFBQSxtQkFlYyxlQUFLdUIsV0FBTCxDQUFpQjtBQUN2Q0Msb0JBQU07QUFEaUMsYUFBakIsQ0FmZDs7QUFBQTtBQWVOQyx1QkFmTTs7QUFrQlY1RCxnQkFBSSxjQUFKLEVBQW9CNEQsV0FBcEI7O0FBRUE7QUFDSUMsaUJBckJNLEdBcUJFO0FBQ1YzQyxtQkFBS3BCLFNBQVMsV0FESjtBQUVWdUIsc0JBQVE7QUFDTixnQ0FBZ0I7QUFEVixlQUZFO0FBS1Z5QyxzQkFBUSxNQUxFO0FBTVZsRCxvQkFBTTtBQUNKYixzQkFBTUEsSUFERjtBQUVKZ0UsK0JBQWVILFlBQVlHLGFBRnZCO0FBR0pDLG9CQUFJSixZQUFZSTtBQUhaO0FBTkksYUFyQkY7O0FBaUNWaEUsZ0JBQUksT0FBSixFQUFhNkQsS0FBYjtBQWpDVTtBQUFBLG1CQWtDUyxlQUFLNUIsT0FBTCxDQUFhNEIsS0FBYixDQWxDVDs7QUFBQTtBQWtDTjNCLGtCQWxDTTs7QUFtQ1ZBLHFCQUFTQSxPQUFPdEIsSUFBaEI7O0FBbkNVLGtCQXFDTnNCLE9BQU8rQixJQUFQLElBQWUvQixPQUFPdEIsSUFyQ2hCO0FBQUE7QUFBQTtBQUFBOztBQXNDUlosZ0JBQUksWUFBSixFQUFrQmtDLE1BQWxCO0FBQ0FILGVBQUdtQyxjQUFILENBQWtCLE9BQWxCLEVBQTJCaEMsT0FBT3RCLElBQWxDO0FBdkNRO0FBQUE7O0FBQUE7QUFBQSxrQkF5Q0YsSUFBSWdDLEtBQUosRUF6Q0U7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQTRDSixJQUFJQSxLQUFKLEVBNUNJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSjs7QUFnREF1QixPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGtDQURlO0FBRWZ2RSxnQkFGZTtBQUdmRCxnQkFIZTtBQUlmTSwwQkFKZTtBQUtmOEIsV0FBU0EsT0FMTTtBQU1mc0IsV0FBU0EsT0FOTTtBQU9mcEIsVUFBUUE7QUFQTyxDQUFqQiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOacrOWcsFxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBtb2NrQ29uZmlnIGZyb20gJy4uL21vY2svbW9ja0NvbmZpZydcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgaXNNb2NrID0gY29uZmlnLmlzTW9jayB8fCBmYWxzZVxudmFyIERPTUFJTiA9IGNvbmZpZy5ET01BSU4gfHwgJydcbnZhciBjb2RlID0gJydcbnZhciBMT0cgPSBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pXG4vLyB2YXIgTE9HID0gKCkgPT4ge31cblxuLyoqXG4gKiDlsIHoo4V3eFByb21pc2VmeVxuICovXG52YXIgd3hQcm9taXNpZnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSwgaXNDaGVja0xvZ2luKSB7XG4gICAgaXNDaGVja0xvZ2luID0gZmFsc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLmlzQ2hlY2tMb2dpbiA9IGlzQ2hlY2tMb2dpblxuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICAgIGZuKG9iailcbiAgICB9KVxuICB9XG59XG4vKipcbiAqIOeZu+mZhuWJjeeahOWHhuWkh1xuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqIEBwYXJhbSB7Kn0gdG9rZW5cbiAqL1xudmFyIHJlcXVlc3RCZWZvcmUgPSAob3B0aW9uLCB0b2tlbikgPT4ge1xuICAhb3B0aW9uLmRhdGEgJiYgKG9wdGlvbi5kYXRhID0ge30pXG5cbiAgIS9eaHR0cC8udGVzdChvcHRpb24udXJsKSAmJiAob3B0aW9uLnVybCA9IERPTUFJTiArIG9wdGlvbi51cmwpXG4gIC8vIOa3u+WKoOW/heimgeeahOi+heWKqeWtl+aWrVxuICAvLyB2YXIgZGV2aWNlSW5mbyA9IGdldEFwcCgpLmdldERldmljZUluZm8oKVxuICB2YXIgZGV2aWNlSW5mbyA9IHt9XG4gIHZhciBjb29raWVPYmogPSB7XG4gICAgJ3RnX2F1dGgnOiB0b2tlblxuICAgIC8vICdfdic6IGNvbmZpZy5fdixcbiAgICAvLyAnd3h2JzogZGV2aWNlSW5mby52ZXJzaW9uLFxuICAgIC8vICdfcyc6IGAke2RldmljZUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKX1fd3htaW5pcHJvZ3JhbWAsXG4gICAgLy8gJ19zeXMnOiBkZXZpY2VJbmZvLnN5c3RlbS50b0xvd2VyQ2FzZSgpLFxuICAgIC8vICdfZ3BzJzogZGV2aWNlSW5mby5ncHMgfHwgJydcbiAgfVxuICAvLyBvcHRpb24uZGF0YSA9IHtcbiAgLy8gICAuLi5vcHRpb24uZGF0YSxcbiAgLy8gICAuLi5jb29raWVPYmpcbiAgLy8gfVxuICBpZiAoIW9wdGlvbi5oZWFkZXIpIHtcbiAgICBvcHRpb24uaGVhZGVyID0ge31cbiAgfVxuICBvcHRpb24uaGVhZGVyLkNvb2tpZSA9IE9iamVjdC5rZXlzKGNvb2tpZU9iaikubWFwKChrZXkpID0+IHtcbiAgICByZXR1cm4gYCR7a2V5fT0ke2Nvb2tpZU9ialtrZXldfWBcbiAgfSkuam9pbignOycpXG4gIC8vIOaUr+S7mOe9keWFs+W/hemhu+WKoOS4iuW/heimgeWtl+autV90b2tlblxuICBpZiAoL3BheW1lbnRcXC9zaWduYXR1cmUvLnRlc3Qob3B0aW9uLnVybCkpIHtcbiAgICBvcHRpb24uZGF0YS5fdG9rZW4gPSB0b2tlblxuICB9XG4gIG9wdGlvbi5kYXRhLnByaXZhdGVLZXkgPSB0b2tlblxuICAvLyDor7fmsYLluKbkuIrmnaXmupBcbiAgb3B0aW9uLmRhdGEuZnJvbSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdmcm9tJylcbn1cblxuLyoqXG4gKiDor7fmsYLlh73mlbBcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uXG4gKi9cblxudmFyIHJlcXVlc3QgPSBhc3luYyBmdW5jdGlvbiAob3B0aW9uKSB7XG4gIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpIHx8ICcnXG4gIHJlcXVlc3RCZWZvcmUob3B0aW9uLCB0b2tlbilcbiAgaWYgKGlzTW9jaykge1xuICAgIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pLmRhdGEpXG4gICAgcmV0dXJuIHJlcXVpcmUoJy4uL21vY2svJyArIG1vY2tDb25maWdbb3B0aW9uLnVybF0pLmRhdGFcbiAgfVxuICBMT0coJ3N0YXJ0IHJlcXVlc3Qgb3B0aW9uOicsIG9wdGlvbilcbiAgdmFyIHJlcVJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdChvcHRpb24pXG4gIHJldHVybiByZXFSZXMuZGF0YVxufVxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSBrZXkgIOaOiOadg+eahOS/oeaBr1xuICogQHBhcmFtIHsqfSBpc2ZvcmNlIOW8uuWItuaOiOadg+S8muW+queOr+W8ueeql1xuICovXG52YXIgZ2V0QXRoID0gYXN5bmMoa2V5LCBpc2ZvcmNlLCBncHMpID0+IHtcbiAgdmFyIHNjb3BlID0gJ3Njb3BlLicgKyBrZXlcbiAgdmFyIHNldHRpbmdSZXMgPSBhd2FpdCB3ZXB5LmdldFNldHRpbmcoKVxuICBjb25zb2xlLmxvZyhzZXR0aW5nUmVzKVxuICB0cnkge1xuICAgIGlmIChzZXR0aW5nUmVzLmF1dGhTZXR0aW5nW3Njb3BlXSA9PT0gZmFsc2UpIHsgLy8g5ouS57ud5o6I5p2DXG4gICAgICBhd2FpdCBzaG93UmVnZXRBdXRoTW9kYWwoc2NvcGUsIGlzZm9yY2UsIGdwcylcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdSZXMuYXV0aFNldHRpbmdbc2NvcGVdKSB7IC8vIOaOiOadg+aIkOWKn1xuXG4gICAgfSBlbHNlIHsgLy8g5LuO5rKh5o6I5p2DXG4gICAgICBhd2FpdCB3ZXB5LmF1dGhvcml6ZSh7XG4gICAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpXG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSBzY29wZSDmjojmnYPkv6Hmga9cbiAqIEBwYXJhbSB7Kn0gYXV0aFJlcyDlm57osINcbiAqIEBwYXJhbSB7Kn0gaXNmb3JjZSDlvLrliLblvLnnqpdcbiAqL1xudmFyIHNob3dSZWdldEF1dGhNb2RhbCA9IGFzeW5jKHNjb3BlLCBpc2ZvcmNlLCBncHMpID0+IHtcbiAgdHJ5IHtcbiAgICB2YXIgc2hvd01vZGFsUmVzID0gYXdhaXQgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6IGdwcyA/ICfor7flnKjorr7nva7kuK3miZPlvIDlnLDnkIbkvY3nva7mjojmnYMnIDogJ+ivt+WcqOiuvue9ruS4reaJk+W8gOeUqOaIt+S/oeaBr+aOiOadgycsXG4gICAgICBjb250ZW50OiBncHMgPyAn5pyq6I635Y+W5oKo55qE5Zyw55CG5L2N572u5bCG5peg5rOV5L2/55So56a75oiR5pyA6L+R5Yqf6IO9JyA6ICfmnKrojrflj5bmgqjnmoTlhazlvIDkv6Hmga/vvIjmmLXnp7DjgIHlpLTlg4/nrYnvvInlsIbml6Dms5Xkvb/nlKjpvJPlirHph5HlkozmiqXlkI3mtLvliqgnLFxuICAgICAgY29uZmlybVRleHQ6ICfljrvorr7nva4nLFxuICAgICAgc2hvd0NhbmNlbDogdHJ1ZVxuICAgIH0pXG5cbiAgICBpZiAoc2hvd01vZGFsUmVzLmNvbmZpcm0pIHtcbiAgICAgIHZhciBvcGVuU2V0dGluZ1JlcyA9IGF3YWl0IHdlcHkub3BlblNldHRpbmcoKVxuICAgICAgdmFyIHNldHRpbmdSZXMgPSBhd2FpdCB3ZXB5LmdldFNldHRpbmcoKVxuICAgICAgY29uc29sZS5sb2cob3BlblNldHRpbmdSZXMsIHNldHRpbmdSZXMpXG4gICAgICBpZiAob3BlblNldHRpbmdSZXMuYXV0aFNldHRpbmdbc2NvcGVdIHx8IHNldHRpbmdSZXMuYXV0aFNldHRpbmdbc2NvcGVdKSB7fSBlbHNlIHtcbiAgICAgICAgLy8gaWYgKGlzZm9yY2UpIHtcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgcmVHZXQoc2NvcGUsIGF1dGhSZXMsIGlzZm9yY2UpXG4gICAgICAgIC8vIH0sIDEwMClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpXG4gIH1cbn1cblxuLyoqXG4gKiDvvI3vvI3vvI3vvI3vvI3vvI3lt7Lnu4/lup/lvIPvvI3vvI3vvI3vvI3vvI3vvI3vvI1cbiAqIOajgOafpeeZu+mZhuaAgeWSjHRva2VuXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAg6K+35rGC5a2X5q61IOW9k+ebkea1i+WIsOayoeacieeZu+W9leaXtiDkv53lrZhvcHRpb24g55m76ZmG5a6M5oiQ5ZCO57un57ut6K+35rGCXG4gKiDnlLHkuo5jaGVja3NzaW9u5o6l5Y+jIOacieeahOaXtuWAmSDkuIDnm7Tov5vljrtmYWlsIOaJgOS7pSDlj5bmtojmjonmo4Dmn6XnmoTov5nkuIDmraVcbiAqL1xudmFyIHd4Q2hlY2tMb2dpbiA9IGFzeW5jIG9wdGlvbiA9PiB7XG4gIExPRygnY2hlY2sgdG9rZW4nKVxuICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgaWYgKF90b2tlbikge1xuICAgIExPRygndG9rZW4gc3VjYzonLCBfdG9rZW4pXG4gICAgcmV0dXJuIF90b2tlblxuICB9IGVsc2Uge1xuICAgIExPRygndG9rZW4gZmFpbDonLCBfdG9rZW4pXG4gICAgcmV0dXJuIGF3YWl0IHd4TG9naW4ob3B0aW9uKVxuICB9XG59XG4vKipcbiAqIOeZu+W9lVxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xudmFyIHd4TG9naW4gPSBhc3luYyBvcHRpb24gPT4ge1xuICB0cnkge1xuICAgIC8vIGNoZWNrIGNvZGVcbiAgICBMT0coJ2NoZWNrIHRva2VuJylcbiAgICBsZXQgX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICBpZiAoX3Rva2VuIHx8IGlzTW9jaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGdldCBjb2RlXG4gICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbigpXG4gICAgY29kZSA9IGxvZ2luUmVzLmNvZGVcbiAgICBMT0coJ2dldCBjb2RlJywgY29kZSlcblxuICAgIC8vIGdldCB1c2VySW5mb1xuICAgIGF3YWl0IGdldEF0aCgndXNlckluZm8nKVxuICAgIHZhciB1c2VySW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgbGFuZzogJ3poX0NOJ1xuICAgIH0pXG4gICAgTE9HKCdnZXQgdXNlckluZm8nLCB1c2VySW5mb1JlcylcblxuICAgIC8vIGdldCB0b2tlblxuICAgIGxldCBfZGF0YSA9IHtcbiAgICAgIHVybDogRE9NQUlOICsgJy9nZy9sb2dpbicsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgIGVuY3J5cHRlZERhdGE6IHVzZXJJbmZvUmVzLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiB1c2VySW5mb1Jlcy5pdlxuICAgICAgfVxuICAgIH1cbiAgICBMT0coJ2xvZ2luJywgX2RhdGEpXG4gICAgdmFyIHJlcVJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdChfZGF0YSlcbiAgICByZXFSZXMgPSByZXFSZXMuZGF0YVxuXG4gICAgaWYgKHJlcVJlcy5zdWNjICYmIHJlcVJlcy5kYXRhKSB7XG4gICAgICBMT0coJ2xvZ2luIHN1Y2MnLCByZXFSZXMpXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXFSZXMuZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2NrQ29uZmlnLFxuICBET01BSU4sXG4gIGlzTW9jayxcbiAgd3hQcm9taXNpZnksXG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIHd4TG9naW46IHd4TG9naW4sXG4gIGdldEF0aDogZ2V0QXRoXG59XG4iXX0=