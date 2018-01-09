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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      navigationBarTitleText: '群活动相册'
      // 组件
    }, _this.$repeat = { "groupList": { "com": "groupItem", "props": "groupItem" } }, _this.$props = { "groupItem": { "xmlns:v-bind": { "value": "", "for": "groupList", "item": "item", "index": "index", "key": "index" }, "v-bind:groupItem.once": { "value": "item", "type": "item", "for": "groupList", "item": "item", "index": "index", "key": "index" }, "v-bind:groupIndex.once": { "value": "index", "type": "index", "for": "groupList", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
      shareOrCreateGroup: _shareOrCreateGroup2.default,
      groupItem: _groupItem2.default
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default], _this.data = {
      pageName: 'index',
      groupList: []
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wx.showShareMenu({
                  // 要求小程序返回分享目标信息
                  withShareTicket: true
                });
                _context.next = 3;
                return (0, _login.wxCheckLogin)();

              case 3:
                token = _context.sent;

                if (!token) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this.getList();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function onShow(e) {
      wx.showShareMenu({
        withShareTicket: true
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
                  console.log(res.data);
                  this.groupList.push.apply(this.groupList, res.data.list);
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

      console.log('111');
      this.loadingIn('相册分享中');
      return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res) {
          var ticket, loginRes, shareInfoRes, _data, dispatcherRes;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this2.loadingIn();
                  _context3.prev = 1;

                  if (!res.shareTickets) {
                    _context3.next = 20;
                    break;
                  }

                  ticket = res.shareTickets[0];
                  _context3.next = 6;
                  return _wepy2.default.login({
                    withCredentials: true
                  });

                case 6:
                  loginRes = _context3.sent;
                  _context3.next = 9;
                  return _wepy2.default.getShareInfo({
                    shareTicket: ticket
                  });

                case 9:
                  shareInfoRes = _context3.sent;

                  if (!(loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv)) {
                    _context3.next = 20;
                    break;
                  }

                  _data = {
                    encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                    iv: shareInfoRes.iv, // 加密算法的初始向量
                    code: loginRes.code
                  };
                  _context3.next = 14;
                  return (0, _login.request)({
                    url: '/gg/group/index/dispatcher',
                    data: _data
                  });

                case 14:
                  dispatcherRes = _context3.sent;

                  if (!(dispatcherRes && dispatcherRes.succ)) {
                    _context3.next = 20;
                    break;
                  }

                  _this2.loadingOut();
                  _context3.next = 19;
                  return _this2.initPage();

                case 19:
                  wx.navigateTo({
                    url: dispatcherRes.data.redirect_path
                  });

                case 20:
                  _this2.loadingIn();
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
        title: '快来上传图片吧~',
        path: '/page/share/dispatcher?from=index',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwibG9hZGluZ0luIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0Iiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwiZGlzcGF0Y2hlclJlcyIsInN1Y2MiLCJpbml0UGFnZSIsIm5hdmlnYXRlVG8iLCJyZWRpcmVjdF9wYXRoIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsIlNoYXJlQ2FsbEJhY2siLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRTFCO0FBSFMsSyxRQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9B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QWxCM0I7O0FBQUE7QUFrQktDLCtCQWxCTDs7QUFBQSx3QkF1QktBLGlCQUFpQkEsY0FBY0MsSUF2QnBDO0FBQUE7QUFBQTtBQUFBOztBQXdCRyx5QkFBS2hCLFVBQUw7QUF4Qkg7QUFBQSx5QkF5QlMsT0FBS2lCLFFBQUwsRUF6QlQ7O0FBQUE7QUEwQkdqQyxxQkFBR2tDLFVBQUgsQ0FBYztBQUNaMUIseUJBQUt1QixjQUFjbkMsSUFBZCxDQUFtQnVDO0FBRFosbUJBQWQ7O0FBMUJIO0FBZ0NILHlCQUFLakIsU0FBTDtBQWhDRztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFrQ0gseUJBQUtGLFVBQUw7O0FBbENHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQ0Q7OztzQ0FDaUJMLEcsRUFBSztBQUNyQixhQUFPO0FBQ0x5QixlQUFPLFVBREY7QUFFTEMsY0FBTSxtQ0FGRDtBQUdMQyxpQkFBUyxLQUFLQyxhQUFMLENBQW1CNUIsR0FBbkI7QUFISixPQUFQO0FBS0Q7Ozs7RUF6R2dDLGVBQUs2QixJOztrQkFBbkJ0RCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9ncm91cEl0ZW0nXG5pbXBvcnQgc2hhcmVPckNyZWF0ZUdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvc2hhcmVPckNyZWF0ZUdyb3VwJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cEl0ZW1cIixcInByb3BzXCI6XCJncm91cEl0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJncm91cEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgIGdyb3VwSXRlbTogR3JvdXBJdGVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluXVxuXG4gIGRhdGEgPSB7XG4gICAgcGFnZU5hbWU6ICdpbmRleCcsXG4gICAgZ3JvdXBMaXN0OiBbXVxuICB9XG4gIG1ldGhvZHMgPSB7fVxuICBhc3luYyBvbkxvYWQoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAvLyDopoHmsYLlsI/nqIvluo/ov5Tlm57liIbkuqvnm67moIfkv6Hmga9cbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgIH0pXG4gICAgdmFyIHRva2VuID0gYXdhaXQgd3hDaGVja0xvZ2luKClcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gICAgfVxuICB9XG4gIG9uU2hvdyhlKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICB9XG4gIGluaXRQYWdlKCkge1xuICAgIHRoaXMuZ3JvdXBMaXN0ID0gW11cbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgY29uc29sZS5sb2coJ290aGVyIHJlZnJlc2gnKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9pbmRleC9ncm91cGxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH0sXG4gICAgICBpc0NoZWNrOiB0cnVlXG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgIHRoaXMuZ3JvdXBMaXN0LnB1c2guYXBwbHkodGhpcy5ncm91cExpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIFNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgY29uc29sZS5sb2coJzExMScpXG4gICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgcmV0dXJuIGFzeW5jKHJlcykgPT4ge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oKVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGRpc3BhdGNoZXJSZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZ0luKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b+r5p2l5LiK5Lyg5Zu+54mH5ZCnficsXG4gICAgICBwYXRoOiAnL3BhZ2Uvc2hhcmUvZGlzcGF0Y2hlcj9mcm9tPWluZGV4JyxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuU2hhcmVDYWxsQmFjayhyZXMpXG4gICAgfVxuICB9XG59XG4iXX0=