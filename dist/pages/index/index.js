'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _groupItem = require('./../../components/index/groupItem.js');

var _groupItem2 = _interopRequireDefault(_groupItem);

var _shareOrCreateGroup = require('./../../components/index/shareOrCreateGroup.js');

var _shareOrCreateGroup2 = _interopRequireDefault(_shareOrCreateGroup);

var _formSubmitMixin = require('./../../mixins/formSubmitMixin.js');

var _formSubmitMixin2 = _interopRequireDefault(_formSubmitMixin);

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  pageName: 'index',
  groupList: []
};

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '群友共享相册'
      // 组件
    }, _this.$repeat = { "groupList": { "com": "groupItem", "props": "groupItem" } }, _this.$props = { "groupItem": { "xmlns:v-bind": { "value": "", "for": "groupList", "item": "item", "index": "index", "key": "index" }, "v-bind:groupItem.once": { "value": "item", "type": "item", "for": "groupList", "item": "item", "index": "index", "key": "index" }, "v-bind:groupIndex.once": { "value": "index", "type": "index", "for": "groupList", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
      shareOrCreateGroup: _shareOrCreateGroup2.default,
      groupItem: _groupItem2.default
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Object.assign(this, pageData);
                this.setShare();
                _context.prev = 2;
                _context.next = 5;
                return (0, _login.wxLogin)();

              case 5:
                this.loadingIn('加载中');
                _context.next = 8;
                return this.getList();

              case 8:
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'setShare',
    value: function setShare() {
      wx.showShareMenu({
        withShareTicket: true // 要求小程序返回分享目标信息
      });
    }
  }, {
    key: 'initPage',
    value: function initPage() {
      this.groupList = [];
      this.getList();
    }
  }, {
    key: 'getList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('other refresh');
                _context2.next = 3;
                return (0, _login.request)({
                  url: '/gg/index/grouplist',
                  data: {
                    cursor: 0
                  },
                  isCheck: true
                });

              case 3:
                res = _context2.sent;

                if (res && res.data) {
                  this.groupList = [].concat(_toConsumableArray(this.groupList), _toConsumableArray(res.data.list));
                  console.log(this.groupList);
                  this.$apply();
                  this.loadingOut();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getList() {
        return _ref3.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: 'loadingOut',
    value: function loadingOut() {
      wx.hideLoading();
    }
  }, {
    key: 'ShareCallBack',
    value: function ShareCallBack(res) {
      var _this2 = this;

      return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res) {
          var ticket, loginRes, shareInfoRes, _data, dispatcherRes;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this2.loadingIn('相册分享中');
                  _context3.prev = 1;

                  if (!res.shareTickets) {
                    _context3.next = 21;
                    break;
                  }

                  ticket = res.shareTickets[0];

                  console.log(ticket);
                  _context3.next = 7;
                  return _wepy2.default.login({
                    withCredentials: true
                  });

                case 7:
                  loginRes = _context3.sent;
                  _context3.next = 10;
                  return _wepy2.default.getShareInfo({
                    shareTicket: ticket
                  });

                case 10:
                  shareInfoRes = _context3.sent;

                  if (!(loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv)) {
                    _context3.next = 21;
                    break;
                  }

                  _data = {
                    encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                    iv: shareInfoRes.iv, // 加密算法的初始向量
                    code: loginRes.code
                  };
                  _context3.next = 15;
                  return (0, _login.request)({
                    url: '/gg/group/index/dispatcher',
                    data: _data
                  });

                case 15:
                  dispatcherRes = _context3.sent;

                  if (!(dispatcherRes && dispatcherRes.succ)) {
                    _context3.next = 21;
                    break;
                  }

                  _this2.loadingOut();
                  _context3.next = 20;
                  return _this2.initPage();

                case 20:
                  wx.navigateTo({
                    url: dispatcherRes.data.redirect_path
                  });

                case 21:
                  _context3.next = 26;
                  break;

                case 23:
                  _context3.prev = 23;
                  _context3.t0 = _context3['catch'](1);

                  _this2.loadingOut();

                case 26:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[1, 23]]);
        }));

        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '一起来加入本群相册吧！',
        path: '/pages/share/dispatcher?from=index',
        imageUrl: 'http://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInNldFNoYXJlIiwibG9hZGluZ0luIiwiZ2V0TGlzdCIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJjb25zb2xlIiwibG9nIiwidXJsIiwiY3Vyc29yIiwiaXNDaGVjayIsInJlcyIsImxpc3QiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZVRpY2tldCIsInNoYXJlSW5mb1JlcyIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJfZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwiaW5pdFBhZ2UiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsIlNoYXJlQ2FsbEJhY2siLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsV0FBVztBQUNiQyxZQUFVLE9BREc7QUFFYkMsYUFBVztBQUZFLENBQWY7O0lBSXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFFMUI7QUFIUyxLLFFBSVZDLE8sR0FBVSxFQUFDLGFBQVksRUFB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STtBQUhMLG1CQWJiO0FBQUE7QUFBQSx5QkFtQjJCLG9CQUFRO0FBQ2hDZix5QkFBSyw0QkFEMkI7QUFFaENkLDBCQUFNZ0M7QUFGMEIsbUJBQVIsQ0FuQjNCOztBQUFBO0FBbUJLQywrQkFuQkw7O0FBQUEsd0JBd0JLQSxpQkFBaUJBLGNBQWNDLElBeEJwQztBQUFBO0FBQUE7QUFBQTs7QUF5QkcseUJBQUszQixVQUFMO0FBekJIO0FBQUEseUJBMEJTLE9BQUs0QixRQUFMLEVBMUJUOztBQUFBO0FBMkJHMUIscUJBQUcyQixVQUFILENBQWM7QUFDWnRCLHlCQUFLbUIsY0FBY2pDLElBQWQsQ0FBbUJxQztBQURaLG1CQUFkOztBQTNCSDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQWtDSCx5QkFBSzlCLFVBQUw7O0FBbENHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQ0Q7OztzQ0FDaUJVLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xxQixlQUFPLGFBREY7QUFFTEMsY0FBTSxvQ0FGRDtBQUdMQyxrQkFBVSxtRkFITDtBQUlMQyxpQkFBUyxLQUFLQyxhQUFMLENBQW1CekIsR0FBbkI7QUFKSixPQUFQO0FBTUQ7Ozs7RUF6R2dDLGVBQUswQixJOztrQkFBbkJyRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICBncm91cExpc3Q6IFtdXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5Y+L5YWx5Lqr55u45YaMJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJncm91cExpc3RcIjp7XCJjb21cIjpcImdyb3VwSXRlbVwiLFwicHJvcHNcIjpcImdyb3VwSXRlbVwifX07XHJcbiRwcm9wcyA9IHtcImdyb3VwSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEluZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hhcmVPckNyZWF0ZUdyb3VwOiBzaGFyZU9yQ3JlYXRlR3JvdXAsXG4gICAgZ3JvdXBJdGVtOiBHcm91cEl0ZW1cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluLCBMb2FkaW5nTWl4aW5dXG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5zZXRTaGFyZSgpXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgc2V0U2hhcmUoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICB0aGlzLmdyb3VwTGlzdCA9IFtdXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cExpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMuZ3JvdXBMaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIFNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgcmV0dXJuIGFzeW5jKHJlcykgPT4ge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgY29uc29sZS5sb2codGlja2V0KVxuICAgICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGRpc3BhdGNoZXJSZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+S4gOi1t+adpeWKoOWFpeacrOe+pOebuOWGjOWQp++8gScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL3NoYXJlL2Rpc3BhdGNoZXI/ZnJvbT1pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHA6Ly9pbmltZzA3LmppdXlhbi5pbmZvL2luLzIwMTgvMDEvMTAvQkI1MkM4MzYtNzdDRS0zNzNBLUQ0ODQtQkVDOTQwNTc0OUZCLmpwZycsXG4gICAgICBzdWNjZXNzOiB0aGlzLlNoYXJlQ2FsbEJhY2socmVzKVxuICAgIH1cbiAgfVxufVxuIl19