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
                  'shareCallBackUrl': url,
                  'from': 'onload'
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

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return shareConnectMixin;
}(_wepy2.default.mixin);

exports.default = shareConnectMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlQ29ubmVjdE1peGluLmpzIl0sIm5hbWVzIjpbInNoYXJlQ29ubmVjdE1peGluIiwiaXNMb2FkaW5nIiwidXJsIiwiX3NoYXJlVGlja2V0cyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hhcmVUaWNrZXQiLCJtIiwic2hhcmVDYWxsQmFjayIsIkVycm9yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxvYWRpbmdJbiIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwiaW5pdFBhZ2UiLCJsb2FkaW5nT3V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRvYXN0RmFpbCIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLGlCOzs7Ozs7Ozs7Ozs7MEZBQ0tDLFMsRUFBV0MsRzs7Ozs7Ozs7QUFFM0JDLDZCLEdBQWdCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsVzs7cUJBQ3hDSCxhOzs7OztBQUNFSSxpQixHQUFJLEtBQUtDLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsT0FBNUIsQzs7dUJBQ0ZELEVBQUU7QUFDTixrQ0FBZ0IsQ0FBQ0osYUFBRCxDQURWO0FBRU4sc0NBQW9CRCxHQUZkO0FBR04sMEJBQVE7QUFIRixpQkFBRixFQUlIRCxTQUpHLEM7Ozs7Ozs7OztzQkFPRixJQUFJUSxLQUFKLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHSUMsRyxFQUFLO0FBQUE7O0FBQ2pCO0FBQUEsNEVBQU8sa0JBQU1BLEdBQU4sRUFBV1QsU0FBWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0xVLDBCQUFRQyxHQUFSLENBQVksZUFBWjtBQUNDLG1CQUFDWCxTQUFGLElBQWdCLE9BQUtZLFNBQUwsQ0FBZSxLQUFmLENBQWhCO0FBRks7O0FBQUEsdUJBSUNILElBQUlJLFlBSkw7QUFBQTtBQUFBO0FBQUE7O0FBS0dDLHdCQUxILEdBS1lMLElBQUlJLFlBQUosQ0FBaUIsQ0FBakIsQ0FMWjtBQUFBO0FBQUEseUJBTW9CLGVBQUtFLEtBQUwsQ0FBVztBQUM5QkMscUNBQWlCO0FBRGEsbUJBQVgsQ0FOcEI7O0FBQUE7QUFNR0MsMEJBTkg7QUFBQTtBQUFBLHlCQVN3QixlQUFLQyxZQUFMLENBQWtCO0FBQ3pDYixpQ0FBYVM7QUFENEIsbUJBQWxCLENBVHhCOztBQUFBO0FBU0dLLDhCQVRIOztBQUFBLHdCQVlHRixTQUFTRyxJQUFULElBQWlCRCxhQUFhRSxhQUE5QixJQUErQ0YsYUFBYUcsRUFaL0Q7QUFBQTtBQUFBO0FBQUE7O0FBYUtDLHVCQWJMLEdBYWE7QUFDVkYsbUNBQWVGLGFBQWFFLGFBRGxCLEVBQ2lDO0FBQzNDQyx3QkFBSUgsYUFBYUcsRUFGUCxFQUVXO0FBQ3JCRiwwQkFBTUgsU0FBU0c7QUFITCxtQkFiYjtBQUFBO0FBQUEseUJBbUIyQixvQkFBUTtBQUNoQ25CLHlCQUFLUSxJQUFJZSxnQkFBSixJQUF3Qiw0QkFERztBQUVoQ0MsMEJBQU1GO0FBRjBCLG1CQUFSLENBbkIzQjs7QUFBQTtBQW1CS0csK0JBbkJMOztBQUFBLHdCQXdCS0EsaUJBQWlCQSxjQUFjQyxJQXhCcEM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBeUJPLE9BQU8sT0FBS0MsUUFBWixLQUF5QixVQXpCaEM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5QkEwQlcsT0FBS0EsUUFBTCxFQTFCWDs7QUFBQTs7QUE2QkcseUJBQUtDLFVBQUw7QUFDQUMscUJBQUdDLFVBQUgsQ0FBYztBQUNaOUIseUJBQUt5QixjQUFjRCxJQUFkLENBQW1CTztBQURaLG1CQUFkOztBQTlCSDtBQUFBO0FBQUE7O0FBQUE7QUFBQSx3QkFtQ08sSUFBSXhCLEtBQUosRUFuQ1A7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBcUNJLHNCQUFJLENBQUNSLFNBQUwsRUFBZ0I7QUFDckIsMkJBQUs2QixVQUFMO0FBQ0EsMkJBQUtJLFNBQUwsQ0FBZSxTQUFmLEVBQTBCLElBQTFCO0FBQ0Q7O0FBeENFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkEwQ0csSUFBSXpCLEtBQUosRUExQ0g7O0FBQUE7O0FBNkNMLHlCQUFLcUIsVUFBTDs7QUE3Q0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStDRDs7OztFQWhFNEMsZUFBS0ssSzs7a0JBQS9CbkMsaUIiLCJmaWxlIjoic2hhcmVDb25uZWN0TWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzaGFyZUNvbm5lY3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICBhc3luYyBnZXRTaGFyZUZyb21PdGhlcihpc0xvYWRpbmcsIHVybCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3NoYXJlVGlja2V0cyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNoYXJlVGlja2V0XG4gICAgICBpZiAoX3NoYXJlVGlja2V0cykge1xuICAgICAgICB2YXIgbSA9IHRoaXMuc2hhcmVDYWxsQmFjaygnc2hhcmUnLCAnc2hhcmUnKVxuICAgICAgICBhd2FpdCBtKHtcbiAgICAgICAgICAnc2hhcmVUaWNrZXRzJzogW19zaGFyZVRpY2tldHNdLFxuICAgICAgICAgICdzaGFyZUNhbGxCYWNrVXJsJzogdXJsLFxuICAgICAgICAgICdmcm9tJzogJ29ubG9hZCdcbiAgICAgICAgfSwgaXNMb2FkaW5nKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9XG4gIHNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgcmV0dXJuIGFzeW5jKHJlcywgaXNMb2FkaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2hhcmVDYWxsQmFjaycpO1xuICAgICAgKCFpc0xvYWRpbmcpICYmIHRoaXMubG9hZGluZ0luKCfor7fnqI3lkI4nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiByZXMuc2hhcmVDYWxsQmFja1VybCB8fCAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5pbml0UGFnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNMb2FkaW5nKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICB0aGlzLnRvYXN0RmFpbCgn6K+35YiG5Lqr5Yiw576k6IGK5aSpJywgMzAwMClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxufVxuIl19