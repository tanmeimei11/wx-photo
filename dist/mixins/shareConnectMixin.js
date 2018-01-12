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
                  console.log('shareCallBack');
                  !isLoading && _this2.loadingIn('请稍后');
                  _context2.prev = 2;

                  if (!res.shareTickets) {
                    _context2.next = 25;
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
                    _context2.next = 24;
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

                  if (!(dispatcherRes && dispatcherRes.succ)) {
                    _context2.next = 22;
                    break;
                  }

                  if (!(typeof _this2.initPage === 'function')) {
                    _context2.next = 20;
                    break;
                  }

                  _context2.next = 20;
                  return _this2.initPage();

                case 20:

                  _this2.loadingOut();
                  wx.navigateTo({
                    url: dispatcherRes.data.redirect_path
                  });

                case 22:
                  _context2.next = 25;
                  break;

                case 24:
                  throw new Error();

                case 25:
                  _context2.next = 30;
                  break;

                case 27:
                  _context2.prev = 27;
                  _context2.t0 = _context2['catch'](2);
                  throw new Error();

                case 30:

                  _this2.loadingOut();

                case 31:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[2, 27]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlQ29ubmVjdE1peGluLmpzIl0sIm5hbWVzIjpbInNoYXJlQ29ubmVjdE1peGluIiwiaXNMb2FkaW5nIiwidXJsIiwiX3NoYXJlVGlja2V0cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hhcmVUaWNrZXQiLCJtIiwic2hhcmVDYWxsQmFjayIsIkVycm9yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxvYWRpbmdJbiIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwiaW5pdFBhZ2UiLCJsb2FkaW5nT3V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLGlCOzs7Ozs7Ozs7Ozs7MEZBQ0tDLFMsRUFBV0MsRzs7Ozs7Ozs7QUFFM0JDLDZCLEdBQWdCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsVzs7cUJBQ3hDSCxhOzs7OztBQUNFSSxpQixHQUFJLEtBQUtDLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsT0FBNUIsQzs7dUJBQ0ZELEVBQUU7QUFDTixrQ0FBZ0IsQ0FBQ0osYUFBRCxDQURWO0FBRU4sc0NBQW9CRDtBQUZkLGlCQUFGLEVBR0hELFNBSEcsQzs7Ozs7Ozs7O3NCQU1GLElBQUlRLEtBQUosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUdJQyxHLEVBQUs7QUFBQTs7QUFDakI7QUFBQSw0RUFBTyxrQkFBTUEsR0FBTixFQUFXVCxTQUFYO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTFUsMEJBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0MsbUJBQUNYLFNBQUYsSUFBZ0IsT0FBS1ksU0FBTCxDQUFlLEtBQWYsQ0FBaEI7QUFGSzs7QUFBQSx1QkFJQ0gsSUFBSUksWUFKTDtBQUFBO0FBQUE7QUFBQTs7QUFLR0Msd0JBTEgsR0FLWUwsSUFBSUksWUFBSixDQUFpQixDQUFqQixDQUxaO0FBQUE7QUFBQSx5QkFNb0IsZUFBS0UsS0FBTCxDQUFXO0FBQzlCQyxxQ0FBaUI7QUFEYSxtQkFBWCxDQU5wQjs7QUFBQTtBQU1HQywwQkFOSDtBQUFBO0FBQUEseUJBU3dCLGVBQUtDLFlBQUwsQ0FBa0I7QUFDekNiLGlDQUFhUztBQUQ0QixtQkFBbEIsQ0FUeEI7O0FBQUE7QUFTR0ssOEJBVEg7O0FBQUEsd0JBWUdGLFNBQVNHLElBQVQsSUFBaUJELGFBQWFFLGFBQTlCLElBQStDRixhQUFhRyxFQVovRDtBQUFBO0FBQUE7QUFBQTs7QUFhS0MsdUJBYkwsR0FhYTtBQUNWRixtQ0FBZUYsYUFBYUUsYUFEbEIsRUFDaUM7QUFDM0NDLHdCQUFJSCxhQUFhRyxFQUZQLEVBRVc7QUFDckJGLDBCQUFNSCxTQUFTRztBQUhMLG1CQWJiO0FBQUE7QUFBQSx5QkFtQjJCLG9CQUFRO0FBQ2hDbkIseUJBQUtRLElBQUllLGdCQUFKLElBQXdCLDRCQURHO0FBRWhDQywwQkFBTUY7QUFGMEIsbUJBQVIsQ0FuQjNCOztBQUFBO0FBbUJLRywrQkFuQkw7O0FBQUEsd0JBd0JLQSxpQkFBaUJBLGNBQWNDLElBeEJwQztBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkF5Qk8sT0FBTyxPQUFLQyxRQUFaLEtBQXlCLFVBekJoQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQTBCVyxPQUFLQSxRQUFMLEVBMUJYOztBQUFBOztBQTZCRyx5QkFBS0MsVUFBTDtBQUNBQyxxQkFBR0MsVUFBSCxDQUFjO0FBQ1o5Qix5QkFBS3lCLGNBQWNELElBQWQsQ0FBbUJPO0FBRFosbUJBQWQ7O0FBOUJIO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHdCQW1DTyxJQUFJeEIsS0FBSixFQW5DUDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBdUNHLElBQUlBLEtBQUosRUF2Q0g7O0FBQUE7O0FBMENMLHlCQUFLcUIsVUFBTDs7QUExQ0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRDRDs7OztFQTVENEMsZUFBS0ksSzs7a0JBQS9CbEMsaUIiLCJmaWxlIjoic2hhcmVDb25uZWN0TWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzaGFyZUNvbm5lY3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICBhc3luYyBnZXRTaGFyZUZyb21PdGhlcihpc0xvYWRpbmcsIHVybCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3NoYXJlVGlja2V0cyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNoYXJlVGlja2V0XG4gICAgICBpZiAoX3NoYXJlVGlja2V0cykge1xuICAgICAgICB2YXIgbSA9IHRoaXMuc2hhcmVDYWxsQmFjaygnc2hhcmUnLCAnc2hhcmUnKVxuICAgICAgICBhd2FpdCBtKHtcbiAgICAgICAgICAnc2hhcmVUaWNrZXRzJzogW19zaGFyZVRpY2tldHNdLFxuICAgICAgICAgICdzaGFyZUNhbGxCYWNrVXJsJzogdXJsXG4gICAgICAgIH0sIGlzTG9hZGluZylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxuICBzaGFyZUNhbGxCYWNrKHJlcykge1xuICAgIHJldHVybiBhc3luYyhyZXMsIGlzTG9hZGluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3NoYXJlQ2FsbEJhY2snKTtcbiAgICAgICghaXNMb2FkaW5nKSAmJiB0aGlzLmxvYWRpbmdJbign6K+356iN5ZCOJylcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdmFyIHNoYXJlSW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChsb2dpblJlcy5jb2RlICYmIHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhICYmIHNoYXJlSW5mb1Jlcy5pdikge1xuICAgICAgICAgICAgdmFyIF9kYXRhID0ge1xuICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICAgIGl2OiBzaGFyZUluZm9SZXMuaXYsIC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgICBjb2RlOiBsb2dpblJlcy5jb2RlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXNwYXRjaGVyUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogcmVzLnNoYXJlQ2FsbEJhY2tVcmwgfHwgJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkaXNwYXRjaGVyUmVzICYmIGRpc3BhdGNoZXJSZXMuc3VjYykge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaW5pdFBhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRQYWdlKClcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==