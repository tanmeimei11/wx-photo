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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isLoading, url, ids) {
        var _shareTickets, m;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _shareTickets = this.$parent.globalData.shareTicket;

                if (!_shareTickets) {
                  _context.next = 7;
                  break;
                }

                m = this.shareCallBack('share', 'share');

                if (!ids) {
                  ids = {};
                }
                _context.next = 7;
                return m({
                  'shareTickets': [_shareTickets],
                  'shareCallBackUrl': url,
                  'from': 'onload',
                  'groupID': ids.groupID || '',
                  'galleryID': ids.galleryID || ''
                }, isLoading);

              case 7:
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);
                throw new Error();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function getShareFromOther(_x, _x2, _x3) {
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
                    _context2.next = 27;
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
                    code: loginRes.code,
                    groupID: res.groupID || '',
                    galleryID: res.galleryID || ''
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
                  _context2.next = 28;
                  break;

                case 27:
                  if (!isLoading) {
                    _this2.loadingOut();
                    _this2.toastFail('请分享到群聊天', 3000);
                  }

                case 28:
                  _context2.next = 33;
                  break;

                case 30:
                  _context2.prev = 30;
                  _context2.t0 = _context2['catch'](2);
                  throw new Error();

                case 33:

                  _this2.loadingOut();

                case 34:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[2, 30]]);
        }));

        return function (_x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return shareConnectMixin;
}(_wepy2.default.mixin);

exports.default = shareConnectMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlQ29ubmVjdE1peGluLmpzIl0sIm5hbWVzIjpbInNoYXJlQ29ubmVjdE1peGluIiwiaXNMb2FkaW5nIiwidXJsIiwiaWRzIiwiX3NoYXJlVGlja2V0cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hhcmVUaWNrZXQiLCJtIiwic2hhcmVDYWxsQmFjayIsImdyb3VwSUQiLCJnYWxsZXJ5SUQiLCJFcnJvciIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJsb2FkaW5nSW4iLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJsb2dpbiIsIndpdGhDcmVkZW50aWFscyIsImxvZ2luUmVzIiwiZ2V0U2hhcmVJbmZvIiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwic2hhcmVDYWxsQmFja1VybCIsImRhdGEiLCJkaXNwYXRjaGVyUmVzIiwic3VjYyIsImluaXRQYWdlIiwibG9hZGluZ091dCIsInd4IiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJ0b2FzdEZhaWwiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxpQjs7Ozs7Ozs7Ozs7OzBGQUNLQyxTLEVBQVdDLEcsRUFBS0MsRzs7Ozs7Ozs7QUFFaENDLDZCLEdBQWdCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsVzs7cUJBQ3hDSCxhOzs7OztBQUNFSSxpQixHQUFJLEtBQUtDLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsT0FBNUIsQzs7QUFDUixvQkFBSSxDQUFDTixHQUFMLEVBQVU7QUFDUkEsd0JBQU0sRUFBTjtBQUNEOzt1QkFDS0ssRUFBRTtBQUNOLGtDQUFnQixDQUFDSixhQUFELENBRFY7QUFFTixzQ0FBb0JGLEdBRmQ7QUFHTiwwQkFBUSxRQUhGO0FBSU4sNkJBQVdDLElBQUlPLE9BQUosSUFBZSxFQUpwQjtBQUtOLCtCQUFhUCxJQUFJUSxTQUFKLElBQWlCO0FBTHhCLGlCQUFGLEVBTUhWLFNBTkcsQzs7Ozs7Ozs7O3NCQVNGLElBQUlXLEtBQUosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUdJQyxHLEVBQUs7QUFBQTs7QUFDakI7QUFBQSw0RUFBTyxrQkFBTUEsR0FBTixFQUFXWixTQUFYO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTGEsMEJBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0MsbUJBQUNkLFNBQUYsSUFBZ0IsT0FBS2UsU0FBTCxDQUFlLEtBQWYsQ0FBaEI7QUFGSzs7QUFBQSx1QkFJQ0gsSUFBSUksWUFKTDtBQUFBO0FBQUE7QUFBQTs7QUFLR0Msd0JBTEgsR0FLWUwsSUFBSUksWUFBSixDQUFpQixDQUFqQixDQUxaO0FBQUE7QUFBQSx5QkFNb0IsZUFBS0UsS0FBTCxDQUFXO0FBQzlCQyxxQ0FBaUI7QUFEYSxtQkFBWCxDQU5wQjs7QUFBQTtBQU1HQywwQkFOSDtBQUFBO0FBQUEseUJBU3dCLGVBQUtDLFlBQUwsQ0FBa0I7QUFDekNmLGlDQUFhVztBQUQ0QixtQkFBbEIsQ0FUeEI7O0FBQUE7QUFTR0ssOEJBVEg7O0FBQUEsd0JBWUdGLFNBQVNHLElBQVQsSUFBaUJELGFBQWFFLGFBQTlCLElBQStDRixhQUFhRyxFQVovRDtBQUFBO0FBQUE7QUFBQTs7QUFhS0MsdUJBYkwsR0FhYTtBQUNWRixtQ0FBZUYsYUFBYUUsYUFEbEIsRUFDaUM7QUFDM0NDLHdCQUFJSCxhQUFhRyxFQUZQLEVBRVc7QUFDckJGLDBCQUFNSCxTQUFTRyxJQUhMO0FBSVZkLDZCQUFTRyxJQUFJSCxPQUFKLElBQWUsRUFKZDtBQUtWQywrQkFBV0UsSUFBSUYsU0FBSixJQUFpQjtBQUxsQixtQkFiYjtBQUFBO0FBQUEseUJBcUIyQixvQkFBUTtBQUNoQ1QseUJBQUtXLElBQUllLGdCQUFKLElBQXdCLDRCQURHO0FBRWhDQywwQkFBTUY7QUFGMEIsbUJBQVIsQ0FyQjNCOztBQUFBO0FBcUJLRywrQkFyQkw7O0FBQUEsd0JBMEJLQSxpQkFBaUJBLGNBQWNDLElBMUJwQztBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkEyQk8sT0FBTyxPQUFLQyxRQUFaLEtBQXlCLFVBM0JoQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQTRCVyxPQUFLQSxRQUFMLEVBNUJYOztBQUFBOztBQStCRyx5QkFBS0MsVUFBTDtBQUNBQyxxQkFBR0MsVUFBSCxDQUFjO0FBQ1pqQyx5QkFBSzRCLGNBQWNELElBQWQsQ0FBbUJPO0FBRFosbUJBQWQ7O0FBaENIO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHdCQXFDTyxJQUFJeEIsS0FBSixFQXJDUDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUF1Q0ksc0JBQUksQ0FBQ1gsU0FBTCxFQUFnQjtBQUNyQiwyQkFBS2dDLFVBQUw7QUFDQSwyQkFBS0ksU0FBTCxDQUFlLFNBQWYsRUFBMEIsSUFBMUI7QUFDRDs7QUExQ0U7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQTRDRyxJQUFJekIsS0FBSixFQTVDSDs7QUFBQTs7QUErQ0wseUJBQUtxQixVQUFMOztBQS9DSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUREOzs7O0VBdkU0QyxlQUFLSyxLOztrQkFBL0J0QyxpQiIsImZpbGUiOiJzaGFyZUNvbm5lY3RNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNoYXJlQ29ubmVjdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGFzeW5jIGdldFNoYXJlRnJvbU90aGVyKGlzTG9hZGluZywgdXJsLCBpZHMpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9zaGFyZVRpY2tldHMgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zaGFyZVRpY2tldFxuICAgICAgaWYgKF9zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnNoYXJlQ2FsbEJhY2soJ3NoYXJlJywgJ3NoYXJlJylcbiAgICAgICAgaWYgKCFpZHMpIHtcbiAgICAgICAgICBpZHMgPSB7fVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IG0oe1xuICAgICAgICAgICdzaGFyZVRpY2tldHMnOiBbX3NoYXJlVGlja2V0c10sXG4gICAgICAgICAgJ3NoYXJlQ2FsbEJhY2tVcmwnOiB1cmwsXG4gICAgICAgICAgJ2Zyb20nOiAnb25sb2FkJyxcbiAgICAgICAgICAnZ3JvdXBJRCc6IGlkcy5ncm91cElEIHx8ICcnLFxuICAgICAgICAgICdnYWxsZXJ5SUQnOiBpZHMuZ2FsbGVyeUlEIHx8ICcnXG4gICAgICAgIH0sIGlzTG9hZGluZylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxuICBzaGFyZUNhbGxCYWNrKHJlcykge1xuICAgIHJldHVybiBhc3luYyhyZXMsIGlzTG9hZGluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3NoYXJlQ2FsbEJhY2snKTtcbiAgICAgICghaXNMb2FkaW5nKSAmJiB0aGlzLmxvYWRpbmdJbign6K+356iN5ZCOJylcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdmFyIHNoYXJlSW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChsb2dpblJlcy5jb2RlICYmIHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhICYmIHNoYXJlSW5mb1Jlcy5pdikge1xuICAgICAgICAgICAgdmFyIF9kYXRhID0ge1xuICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICAgIGl2OiBzaGFyZUluZm9SZXMuaXYsIC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgICBjb2RlOiBsb2dpblJlcy5jb2RlLFxuICAgICAgICAgICAgICBncm91cElEOiByZXMuZ3JvdXBJRCB8fCAnJyxcbiAgICAgICAgICAgICAgZ2FsbGVyeUlEOiByZXMuZ2FsbGVyeUlEIHx8ICcnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXNwYXRjaGVyUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogcmVzLnNoYXJlQ2FsbEJhY2tVcmwgfHwgJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkaXNwYXRjaGVyUmVzICYmIGRpc3BhdGNoZXJSZXMuc3VjYykge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaW5pdFBhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRQYWdlKClcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTG9hZGluZykge1xuICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+ivt+WIhuS6q+WIsOe+pOiBiuWkqScsIDMwMDApXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==