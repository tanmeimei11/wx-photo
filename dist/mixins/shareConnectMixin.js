'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shareConnectMixin = function (_wepy$mixin) {
  _inherits(shareConnectMixin, _wepy$mixin);

  function shareConnectMixin() {
    _classCallCheck(this, shareConnectMixin);

    return _possibleConstructorReturn(this, (shareConnectMixin.__proto__ || Object.getPrototypeOf(shareConnectMixin)).apply(this, arguments));
  }

  _createClass(shareConnectMixin, [{
    key: 'getShareFromOther',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isLoading) {
        var _shareTickets, m;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _shareTickets = this.$parent.globalData.shareTicket;

                if (!_shareTickets) {
                  _context.next = 6;
                  break;
                }

                m = this.shareCallBack('share', 'share');
                _context.next = 6;
                return m({
                  'shareTickets': [_shareTickets]
                }, isLoading);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                throw new Error();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getShareFromOther(_x) {
        return _ref.apply(this, arguments);
      }

      return getShareFromOther;
    }()
  }, {
    key: 'shareCallBack',
    value: function shareCallBack(res, a) {
      var _this2 = this;

      return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res, isLoading) {
          var ticket, loginRes, shareInfoRes, _data, dispatcherRes;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (isLoading) {
                    console.log('----on share----');
                    console.log(res);
                  }!isLoading && _this2.loadingIn('请稍后');
                  _context2.prev = 2;

                  if (!res.shareTickets) {
                    _context2.next = 20;
                    break;
                  }

                  ticket = res.shareTickets[0];
                  _context2.next = 7;
                  return _wepy2.default.login({
                    withCredentials: true
                  });

                case 7:
                  loginRes = _context2.sent;
                  _context2.next = 10;
                  return _wepy2.default.getShareInfo({
                    shareTicket: ticket
                  });

                case 10:
                  shareInfoRes = _context2.sent;

                  if (!(loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv)) {
                    _context2.next = 19;
                    break;
                  }

                  _data = {
                    encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                    iv: shareInfoRes.iv, // 加密算法的初始向量
                    code: loginRes.code
                  };
                  _context2.next = 15;
                  return (0, _login.request)({
                    url: '/gg/group/index/dispatcher',
                    data: _data
                  });

                case 15:
                  dispatcherRes = _context2.sent;


                  if (dispatcherRes && dispatcherRes.succ) {
                    _this2.loadingOut();
                    wx.navigateTo({
                      url: dispatcherRes.data.redirect_path
                    });
                  }
                  _context2.next = 20;
                  break;

                case 19:
                  throw new Error();

                case 20:
                  _context2.next = 25;
                  break;

                case 22:
                  _context2.prev = 22;
                  _context2.t0 = _context2['catch'](2);
                  throw new Error();

                case 25:

                  _this2.loadingOut();

                case 26:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[2, 22]]);
        }));

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return shareConnectMixin;
}(_wepy2.default.mixin);

exports.default = shareConnectMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlQ29ubmVjdE1peGluLmpzIl0sIm5hbWVzIjpbInNoYXJlQ29ubmVjdE1peGluIiwiaXNMb2FkaW5nIiwiX3NoYXJlVGlja2V0cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hhcmVUaWNrZXQiLCJtIiwic2hhcmVDYWxsQmFjayIsIkVycm9yIiwicmVzIiwiYSIsImNvbnNvbGUiLCJsb2ciLCJsb2FkaW5nSW4iLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJsb2dpbiIsIndpdGhDcmVkZW50aWFscyIsImxvZ2luUmVzIiwiZ2V0U2hhcmVJbmZvIiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwidXJsIiwiZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwibG9hZGluZ091dCIsInd4IiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxpQjs7Ozs7Ozs7Ozs7OzBGQUNLQyxTOzs7Ozs7OztBQUVoQkMsNkIsR0FBZ0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxXOztxQkFDeENILGE7Ozs7O0FBQ0VJLGlCLEdBQUksS0FBS0MsYUFBTCxDQUFtQixPQUFuQixFQUE0QixPQUE1QixDOzt1QkFDRkQsRUFBRTtBQUNOLGtDQUFnQixDQUFDSixhQUFEO0FBRFYsaUJBQUYsRUFFSEQsU0FGRyxDOzs7Ozs7Ozs7c0JBS0YsSUFBSU8sS0FBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBR0lDLEcsRUFBS0MsQyxFQUFHO0FBQUE7O0FBQ3BCO0FBQUEsNEVBQU8sa0JBQU1ELEdBQU4sRUFBV1IsU0FBWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0wsc0JBQUlBLFNBQUosRUFBZTtBQUNiVSw0QkFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0FELDRCQUFRQyxHQUFSLENBQVlILEdBQVo7QUFDRCxvQkFBQ1IsU0FBRCxJQUFjLE9BQUtZLFNBQUwsQ0FBZSxLQUFmLENBQWQ7QUFKSTs7QUFBQSx1QkFNQ0osSUFBSUssWUFOTDtBQUFBO0FBQUE7QUFBQTs7QUFPR0Msd0JBUEgsR0FPWU4sSUFBSUssWUFBSixDQUFpQixDQUFqQixDQVBaO0FBQUE7QUFBQSx5QkFRb0IsZUFBS0UsS0FBTCxDQUFXO0FBQzlCQyxxQ0FBaUI7QUFEYSxtQkFBWCxDQVJwQjs7QUFBQTtBQVFHQywwQkFSSDtBQUFBO0FBQUEseUJBV3dCLGVBQUtDLFlBQUwsQ0FBa0I7QUFDekNkLGlDQUFhVTtBQUQ0QixtQkFBbEIsQ0FYeEI7O0FBQUE7QUFXR0ssOEJBWEg7O0FBQUEsd0JBY0dGLFNBQVNHLElBQVQsSUFBaUJELGFBQWFFLGFBQTlCLElBQStDRixhQUFhRyxFQWQvRDtBQUFBO0FBQUE7QUFBQTs7QUFlS0MsdUJBZkwsR0FlYTtBQUNWRixtQ0FBZUYsYUFBYUUsYUFEbEIsRUFDaUM7QUFDM0NDLHdCQUFJSCxhQUFhRyxFQUZQLEVBRVc7QUFDckJGLDBCQUFNSCxTQUFTRztBQUhMLG1CQWZiO0FBQUE7QUFBQSx5QkFxQjJCLG9CQUFRO0FBQ2hDSSx5QkFBSyw0QkFEMkI7QUFFaENDLDBCQUFNRjtBQUYwQixtQkFBUixDQXJCM0I7O0FBQUE7QUFxQktHLCtCQXJCTDs7O0FBMEJDLHNCQUFJQSxpQkFBaUJBLGNBQWNDLElBQW5DLEVBQXlDO0FBQ3ZDLDJCQUFLQyxVQUFMO0FBQ0FDLHVCQUFHQyxVQUFILENBQWM7QUFDWk4sMkJBQUtFLGNBQWNELElBQWQsQ0FBbUJNO0FBRFoscUJBQWQ7QUFHRDtBQS9CRjtBQUFBOztBQUFBO0FBQUEsd0JBaUNPLElBQUl4QixLQUFKLEVBakNQOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFxQ0csSUFBSUEsS0FBSixFQXJDSDs7QUFBQTs7QUF3Q0wseUJBQUtxQixVQUFMOztBQXhDSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMENEOzs7O0VBekQ0QyxlQUFLSSxLOztrQkFBL0JqQyxpQiIsImZpbGUiOiJzaGFyZUNvbm5lY3RNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNoYXJlQ29ubmVjdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGFzeW5jIGdldFNoYXJlRnJvbU90aGVyKGlzTG9hZGluZykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3NoYXJlVGlja2V0cyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNoYXJlVGlja2V0XG4gICAgICBpZiAoX3NoYXJlVGlja2V0cykge1xuICAgICAgICB2YXIgbSA9IHRoaXMuc2hhcmVDYWxsQmFjaygnc2hhcmUnLCAnc2hhcmUnKVxuICAgICAgICBhd2FpdCBtKHtcbiAgICAgICAgICAnc2hhcmVUaWNrZXRzJzogW19zaGFyZVRpY2tldHNdXG4gICAgICAgIH0sIGlzTG9hZGluZylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxuICBzaGFyZUNhbGxCYWNrKHJlcywgYSkge1xuICAgIHJldHVybiBhc3luYyhyZXMsIGlzTG9hZGluZykgPT4ge1xuICAgICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnLS0tLW9uIHNoYXJlLS0tLScpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0haXNMb2FkaW5nICYmIHRoaXMubG9hZGluZ0luKCfor7fnqI3lkI4nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==