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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isLoading, url) {
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
                  'shareTickets': [_shareTickets],
                  'shareCallBackUrl': url
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

      function getShareFromOther(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getShareFromOther;
    }()
  }, {
    key: 'shareCallBack',
    value: function shareCallBack(res) {
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
                    url: res.shareCallBackUrl || '/gg/group/index/dispatcher',
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

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return shareConnectMixin;
}(_wepy2.default.mixin);

exports.default = shareConnectMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlQ29ubmVjdE1peGluLmpzIl0sIm5hbWVzIjpbInNoYXJlQ29ubmVjdE1peGluIiwiaXNMb2FkaW5nIiwidXJsIiwiX3NoYXJlVGlja2V0cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hhcmVUaWNrZXQiLCJtIiwic2hhcmVDYWxsQmFjayIsIkVycm9yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxvYWRpbmdJbiIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwibG9hZGluZ091dCIsInd4IiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxpQjs7Ozs7Ozs7Ozs7OzBGQUNLQyxTLEVBQVdDLEc7Ozs7Ozs7O0FBRTNCQyw2QixHQUFnQixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFc7O3FCQUN4Q0gsYTs7Ozs7QUFDRUksaUIsR0FBSSxLQUFLQyxhQUFMLENBQW1CLE9BQW5CLEVBQTRCLE9BQTVCLEM7O3VCQUNGRCxFQUFFO0FBQ04sa0NBQWdCLENBQUNKLGFBQUQsQ0FEVjtBQUVOLHNDQUFvQkQ7QUFGZCxpQkFBRixFQUdIRCxTQUhHLEM7Ozs7Ozs7OztzQkFNRixJQUFJUSxLQUFKLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHSUMsRyxFQUFLO0FBQUE7O0FBQ2pCO0FBQUEsNEVBQU8sa0JBQU1BLEdBQU4sRUFBV1QsU0FBWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0wsc0JBQUlBLFNBQUosRUFBZTtBQUNiVSw0QkFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0FELDRCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRCxvQkFBQ1QsU0FBRCxJQUFjLE9BQUtZLFNBQUwsQ0FBZSxLQUFmLENBQWQ7QUFKSTs7QUFBQSx1QkFNQ0gsSUFBSUksWUFOTDtBQUFBO0FBQUE7QUFBQTs7QUFPR0Msd0JBUEgsR0FPWUwsSUFBSUksWUFBSixDQUFpQixDQUFqQixDQVBaO0FBQUE7QUFBQSx5QkFRb0IsZUFBS0UsS0FBTCxDQUFXO0FBQzlCQyxxQ0FBaUI7QUFEYSxtQkFBWCxDQVJwQjs7QUFBQTtBQVFHQywwQkFSSDtBQUFBO0FBQUEseUJBV3dCLGVBQUtDLFlBQUwsQ0FBa0I7QUFDekNiLGlDQUFhUztBQUQ0QixtQkFBbEIsQ0FYeEI7O0FBQUE7QUFXR0ssOEJBWEg7O0FBQUEsd0JBY0dGLFNBQVNHLElBQVQsSUFBaUJELGFBQWFFLGFBQTlCLElBQStDRixhQUFhRyxFQWQvRDtBQUFBO0FBQUE7QUFBQTs7QUFlS0MsdUJBZkwsR0FlYTtBQUNWRixtQ0FBZUYsYUFBYUUsYUFEbEIsRUFDaUM7QUFDM0NDLHdCQUFJSCxhQUFhRyxFQUZQLEVBRVc7QUFDckJGLDBCQUFNSCxTQUFTRztBQUhMLG1CQWZiO0FBQUE7QUFBQSx5QkFxQjJCLG9CQUFRO0FBQ2hDbkIseUJBQUtRLElBQUllLGdCQUFKLElBQXdCLDRCQURHO0FBRWhDQywwQkFBTUY7QUFGMEIsbUJBQVIsQ0FyQjNCOztBQUFBO0FBcUJLRywrQkFyQkw7OztBQTBCQyxzQkFBSUEsaUJBQWlCQSxjQUFjQyxJQUFuQyxFQUF5QztBQUN2QywyQkFBS0MsVUFBTDtBQUNBQyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1o3QiwyQkFBS3lCLGNBQWNELElBQWQsQ0FBbUJNO0FBRFoscUJBQWQ7QUFHRDtBQS9CRjtBQUFBOztBQUFBO0FBQUEsd0JBaUNPLElBQUl2QixLQUFKLEVBakNQOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFxQ0csSUFBSUEsS0FBSixFQXJDSDs7QUFBQTs7QUF3Q0wseUJBQUtvQixVQUFMOztBQXhDSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMENEOzs7O0VBMUQ0QyxlQUFLSSxLOztrQkFBL0JqQyxpQiIsImZpbGUiOiJzaGFyZUNvbm5lY3RNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNoYXJlQ29ubmVjdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGFzeW5jIGdldFNoYXJlRnJvbU90aGVyKGlzTG9hZGluZywgdXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfc2hhcmVUaWNrZXRzID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2hhcmVUaWNrZXRcbiAgICAgIGlmIChfc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5zaGFyZUNhbGxCYWNrKCdzaGFyZScsICdzaGFyZScpXG4gICAgICAgIGF3YWl0IG0oe1xuICAgICAgICAgICdzaGFyZVRpY2tldHMnOiBbX3NoYXJlVGlja2V0c10sXG4gICAgICAgICAgJ3NoYXJlQ2FsbEJhY2tVcmwnOiB1cmxcbiAgICAgICAgfSwgaXNMb2FkaW5nKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9XG4gIHNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgcmV0dXJuIGFzeW5jKHJlcywgaXNMb2FkaW5nKSA9PiB7XG4gICAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tb24gc2hhcmUtLS0tJylcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSFpc0xvYWRpbmcgJiYgdGhpcy5sb2FkaW5nSW4oJ+ivt+eojeWQjicpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEsIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgICAgY29kZTogbG9naW5SZXMuY29kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6IHJlcy5zaGFyZUNhbGxCYWNrVXJsIHx8ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2hlclJlcyAmJiBkaXNwYXRjaGVyUmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxufVxuIl19