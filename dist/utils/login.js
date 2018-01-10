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

            if (!_token) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJpc01vY2siLCJET01BSU4iLCJjb2RlIiwiTE9HIiwiY29uc29sZSIsImxvZyIsInd4UHJvbWlzaWZ5IiwiZm4iLCJvYmoiLCJpc0NoZWNrTG9naW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwiZmFpbCIsInJlcXVlc3RCZWZvcmUiLCJvcHRpb24iLCJ0b2tlbiIsInRlc3QiLCJ1cmwiLCJkZXZpY2VJbmZvIiwiY29va2llT2JqIiwiaGVhZGVyIiwiQ29va2llIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsImpvaW4iLCJfdG9rZW4iLCJwcml2YXRlS2V5IiwiZnJvbSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwicmVxUmVzIiwiZ2V0QXRoIiwiaXNmb3JjZSIsImdwcyIsInNjb3BlIiwiZ2V0U2V0dGluZyIsInNldHRpbmdSZXMiLCJhdXRoU2V0dGluZyIsInNob3dSZWdldEF1dGhNb2RhbCIsImF1dGhvcml6ZSIsIkVycm9yIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY29uZmlybVRleHQiLCJzaG93Q2FuY2VsIiwic2hvd01vZGFsUmVzIiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwib3BlblNldHRpbmdSZXMiLCJ3eENoZWNrTG9naW4iLCJ3eExvZ2luIiwibG9naW4iLCJsb2dpblJlcyIsImdldFVzZXJJbmZvIiwibGFuZyIsInVzZXJJbmZvUmVzIiwiX2RhdGEiLCJtZXRob2QiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzdWNjIiwic2V0U3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9ja0NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBRkE7OztBQUdBLElBQUlBLFNBQVNDLFFBQVEsVUFBUixDQUFiO0FBQ0EsSUFBSUMsU0FBU0YsT0FBT0Us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a0MsTUFBbEI7QUFDQUgsZUFBR21DLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMkJoQyxPQUFPdEIsSUFBbEM7QUF2Q1E7QUFBQTs7QUFBQTtBQUFBLGtCQXlDRixJQUFJZ0MsS0FBSixFQXpDRTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBNENKLElBQUlBLEtBQUosRUE1Q0k7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFKOztBQWdEQXVCLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsa0NBRGU7QUFFZnZFLGdCQUZlO0FBR2ZELGdCQUhlO0FBSWZNLDBCQUplO0FBS2Y4QixXQUFTQSxPQUxNO0FBTWZzQixXQUFTQSxPQU5NO0FBT2ZwQixVQUFRQTtBQVBPLENBQWpCIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5pys5ZywXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IG1vY2tDb25maWcgZnJvbSAnLi4vbW9jay9tb2NrQ29uZmlnJ1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJylcbnZhciBpc01vY2sgPSBjb25maWcuaXNNb2NrIHx8IGZhbHNlXG52YXIgRE9NQUlOID0gY29uZmlnLkRPTUFJTiB8fCAnJ1xudmFyIGNvZGUgPSAnJ1xudmFyIExPRyA9IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSlcbi8vIHZhciBMT0cgPSAoKSA9PiB7fVxuXG4vKipcbiAqIOWwgeijhXd4UHJvbWlzZWZ5XG4gKi9cbnZhciB3eFByb21pc2lmeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9LCBpc0NoZWNrTG9naW4pIHtcbiAgICBpc0NoZWNrTG9naW4gPSBmYWxzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvYmouaXNDaGVja0xvZ2luID0gaXNDaGVja0xvZ2luXG4gICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgIH1cbiAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgIH0pXG4gIH1cbn1cbi8qKlxuICog55m76ZmG5YmN55qE5YeG5aSHXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICogQHBhcmFtIHsqfSB0b2tlblxuICovXG52YXIgcmVxdWVzdEJlZm9yZSA9IChvcHRpb24sIHRva2VuKSA9PiB7XG4gICFvcHRpb24uZGF0YSAmJiAob3B0aW9uLmRhdGEgPSB7fSlcblxuICAhL15odHRwLy50ZXN0KG9wdGlvbi51cmwpICYmIChvcHRpb24udXJsID0gRE9NQUlOICsgb3B0aW9uLnVybClcbiAgLy8g5re75Yqg5b+F6KaB55qE6L6F5Yqp5a2X5patXG4gIC8vIHZhciBkZXZpY2VJbmZvID0gZ2V0QXBwKCkuZ2V0RGV2aWNlSW5mbygpXG4gIHZhciBkZXZpY2VJbmZvID0ge31cbiAgdmFyIGNvb2tpZU9iaiA9IHtcbiAgICAndGdfYXV0aCc6IHRva2VuXG4gICAgLy8gJ192JzogY29uZmlnLl92LFxuICAgIC8vICd3eHYnOiBkZXZpY2VJbmZvLnZlcnNpb24sXG4gICAgLy8gJ19zJzogYCR7ZGV2aWNlSW5mby5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpfV93eG1pbmlwcm9ncmFtYCxcbiAgICAvLyAnX3N5cyc6IGRldmljZUluZm8uc3lzdGVtLnRvTG93ZXJDYXNlKCksXG4gICAgLy8gJ19ncHMnOiBkZXZpY2VJbmZvLmdwcyB8fCAnJ1xuICB9XG4gIC8vIG9wdGlvbi5kYXRhID0ge1xuICAvLyAgIC4uLm9wdGlvbi5kYXRhLFxuICAvLyAgIC4uLmNvb2tpZU9ialxuICAvLyB9XG4gIGlmICghb3B0aW9uLmhlYWRlcikge1xuICAgIG9wdGlvbi5oZWFkZXIgPSB7fVxuICB9XG4gIG9wdGlvbi5oZWFkZXIuQ29va2llID0gT2JqZWN0LmtleXMoY29va2llT2JqKS5tYXAoKGtleSkgPT4ge1xuICAgIHJldHVybiBgJHtrZXl9PSR7Y29va2llT2JqW2tleV19YFxuICB9KS5qb2luKCc7JylcbiAgLy8g5pSv5LuY572R5YWz5b+F6aG75Yqg5LiK5b+F6KaB5a2X5q61X3Rva2VuXG4gIGlmICgvcGF5bWVudFxcL3NpZ25hdHVyZS8udGVzdChvcHRpb24udXJsKSkge1xuICAgIG9wdGlvbi5kYXRhLl90b2tlbiA9IHRva2VuXG4gIH1cbiAgb3B0aW9uLmRhdGEucHJpdmF0ZUtleSA9IHRva2VuXG4gIC8vIOivt+axguW4puS4iuadpea6kFxuICBvcHRpb24uZGF0YS5mcm9tID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2Zyb20nKVxufVxuXG4vKipcbiAqIOivt+axguWHveaVsFxuICogQHBhcmFtIHsqfSBvcHRpb25cbiAqL1xuXG52YXIgcmVxdWVzdCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgdmFyIHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgfHwgJydcbiAgcmVxdWVzdEJlZm9yZShvcHRpb24sIHRva2VuKVxuICBpZiAoaXNNb2NrKSB7XG4gICAgY29uc29sZS5sb2cocmVxdWlyZSgnLi4vbW9jay8nICsgbW9ja0NvbmZpZ1tvcHRpb24udXJsXSkuZGF0YSlcbiAgICByZXR1cm4gcmVxdWlyZSgnLi4vbW9jay8nICsgbW9ja0NvbmZpZ1tvcHRpb24udXJsXSkuZGF0YVxuICB9XG4gIExPRygnc3RhcnQgcmVxdWVzdCBvcHRpb246Jywgb3B0aW9uKVxuICB2YXIgcmVxUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KG9wdGlvbilcbiAgcmV0dXJuIHJlcVJlcy5kYXRhXG59XG4vKipcbiAqXG4gKiBAcGFyYW0geyp9IGtleSAg5o6I5p2D55qE5L+h5oGvXG4gKiBAcGFyYW0geyp9IGlzZm9yY2Ug5by65Yi25o6I5p2D5Lya5b6q546v5by556qXXG4gKi9cbnZhciBnZXRBdGggPSBhc3luYyhrZXksIGlzZm9yY2UsIGdwcykgPT4ge1xuICB2YXIgc2NvcGUgPSAnc2NvcGUuJyArIGtleVxuICB2YXIgc2V0dGluZ1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2V0dGluZygpXG4gIGNvbnNvbGUubG9nKHNldHRpbmdSZXMpXG4gIHRyeSB7XG4gICAgaWYgKHNldHRpbmdSZXMuYXV0aFNldHRpbmdbc2NvcGVdID09PSBmYWxzZSkgeyAvLyDmi5Lnu53mjojmnYNcbiAgICAgIGF3YWl0IHNob3dSZWdldEF1dGhNb2RhbChzY29wZSwgaXNmb3JjZSwgZ3BzKVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ1Jlcy5hdXRoU2V0dGluZ1tzY29wZV0pIHsgLy8g5o6I5p2D5oiQ5YqfXG5cbiAgICB9IGVsc2UgeyAvLyDku47msqHmjojmnYNcbiAgICAgIGF3YWl0IHdlcHkuYXV0aG9yaXplKHtcbiAgICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICAgIH0pXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKClcbiAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0geyp9IHNjb3BlIOaOiOadg+S/oeaBr1xuICogQHBhcmFtIHsqfSBhdXRoUmVzIOWbnuiwg1xuICogQHBhcmFtIHsqfSBpc2ZvcmNlIOW8uuWItuW8ueeql1xuICovXG52YXIgc2hvd1JlZ2V0QXV0aE1vZGFsID0gYXN5bmMoc2NvcGUsIGlzZm9yY2UsIGdwcykgPT4ge1xuICB0cnkge1xuICAgIHZhciBzaG93TW9kYWxSZXMgPSBhd2FpdCB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogZ3BzID8gJ+ivt+WcqOiuvue9ruS4reaJk+W8gOWcsOeQhuS9jee9ruaOiOadgycgOiAn6K+35Zyo6K6+572u5Lit5omT5byA55So5oi35L+h5oGv5o6I5p2DJyxcbiAgICAgIGNvbnRlbnQ6IGdwcyA/ICfmnKrojrflj5bmgqjnmoTlnLDnkIbkvY3nva7lsIbml6Dms5Xkvb/nlKjnprvmiJHmnIDov5Hlip/og70nIDogJ+acquiOt+WPluaCqOeahOWFrOW8gOS/oeaBr++8iOaYteensOOAgeWktOWDj+etie+8ieWwhuaXoOazleS9v+eUqOm8k+WKsemHkeWSjOaKpeWQjea0u+WKqCcsXG4gICAgICBjb25maXJtVGV4dDogJ+WOu+iuvue9ricsXG4gICAgICBzaG93Q2FuY2VsOiB0cnVlXG4gICAgfSlcblxuICAgIGlmIChzaG93TW9kYWxSZXMuY29uZmlybSkge1xuICAgICAgdmFyIG9wZW5TZXR0aW5nUmVzID0gYXdhaXQgd2VweS5vcGVuU2V0dGluZygpXG4gICAgICB2YXIgc2V0dGluZ1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2V0dGluZygpXG4gICAgICBjb25zb2xlLmxvZyhvcGVuU2V0dGluZ1Jlcywgc2V0dGluZ1JlcylcbiAgICAgIGlmIChvcGVuU2V0dGluZ1Jlcy5hdXRoU2V0dGluZ1tzY29wZV0gfHwgc2V0dGluZ1Jlcy5hdXRoU2V0dGluZ1tzY29wZV0pIHt9IGVsc2Uge1xuICAgICAgICAvLyBpZiAoaXNmb3JjZSkge1xuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICByZUdldChzY29wZSwgYXV0aFJlcywgaXNmb3JjZSlcbiAgICAgICAgLy8gfSwgMTAwKVxuICAgICAgICAvLyB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKClcbiAgfVxufVxuXG4vKipcbiAqIO+8je+8je+8je+8je+8je+8jeW3sue7j+W6n+W8g++8je+8je+8je+8je+8je+8je+8jVxuICog5qOA5p+l55m76ZmG5oCB5ZKMdG9rZW5cbiAqIEBwYXJhbSB7Kn0gb3B0aW9uICDor7fmsYLlrZfmrrUg5b2T55uR5rWL5Yiw5rKh5pyJ55m75b2V5pe2IOS/neWtmG9wdGlvbiDnmbvpmYblrozmiJDlkI7nu6fnu63or7fmsYJcbiAqIOeUseS6jmNoZWNrc3Npb27mjqXlj6Mg5pyJ55qE5pe25YCZIOS4gOebtOi/m+WOu2ZhaWwg5omA5LulIOWPlua2iOaOieajgOafpeeahOi/meS4gOatpVxuICovXG52YXIgd3hDaGVja0xvZ2luID0gYXN5bmMgb3B0aW9uID0+IHtcbiAgTE9HKCdjaGVjayB0b2tlbicpXG4gIGxldCBfdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICBpZiAoX3Rva2VuKSB7XG4gICAgTE9HKCd0b2tlbiBzdWNjOicsIF90b2tlbilcbiAgICByZXR1cm4gX3Rva2VuXG4gIH0gZWxzZSB7XG4gICAgTE9HKCd0b2tlbiBmYWlsOicsIF90b2tlbilcbiAgICByZXR1cm4gYXdhaXQgd3hMb2dpbihvcHRpb24pXG4gIH1cbn1cbi8qKlxuICog55m75b2VXG4gKiBAcGFyYW0geyp9IG9wdGlvblxuICovXG52YXIgd3hMb2dpbiA9IGFzeW5jIG9wdGlvbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gY2hlY2sgY29kZVxuICAgIExPRygnY2hlY2sgdG9rZW4nKVxuICAgIGxldCBfdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgIGlmIChfdG9rZW4pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBnZXQgY29kZVxuICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oKVxuICAgIGNvZGUgPSBsb2dpblJlcy5jb2RlXG4gICAgTE9HKCdnZXQgY29kZScsIGNvZGUpXG5cbiAgICAvLyBnZXQgdXNlckluZm9cbiAgICBhd2FpdCBnZXRBdGgoJ3VzZXJJbmZvJylcbiAgICB2YXIgdXNlckluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIGxhbmc6ICd6aF9DTidcbiAgICB9KVxuICAgIExPRygnZ2V0IHVzZXJJbmZvJywgdXNlckluZm9SZXMpXG5cbiAgICAvLyBnZXQgdG9rZW5cbiAgICBsZXQgX2RhdGEgPSB7XG4gICAgICB1cmw6IERPTUFJTiArICcvZ2cvbG9naW4nLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICBlbmNyeXB0ZWREYXRhOiB1c2VySW5mb1Jlcy5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogdXNlckluZm9SZXMuaXZcbiAgICAgIH1cbiAgICB9XG4gICAgTE9HKCdsb2dpbicsIF9kYXRhKVxuICAgIHZhciByZXFSZXMgPSBhd2FpdCB3ZXB5LnJlcXVlc3QoX2RhdGEpXG4gICAgcmVxUmVzID0gcmVxUmVzLmRhdGFcblxuICAgIGlmIChyZXFSZXMuc3VjYyAmJiByZXFSZXMuZGF0YSkge1xuICAgICAgTE9HKCdsb2dpbiBzdWNjJywgcmVxUmVzKVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVxUmVzLmRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9ja0NvbmZpZyxcbiAgRE9NQUlOLFxuICBpc01vY2ssXG4gIHd4UHJvbWlzaWZ5LFxuICByZXF1ZXN0OiByZXF1ZXN0LFxuICB3eExvZ2luOiB3eExvZ2luLFxuICBnZXRBdGg6IGdldEF0aFxufVxuIl19