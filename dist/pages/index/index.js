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
                  console.log('share succ', res);

                  if (!res.shareTickets) {
                    _context3.next = 16;
                    break;
                  }

                  ticket = res.shareTickets[0];
                  _context3.next = 5;
                  return _wepy2.default.login({
                    withCredentials: true
                  });

                case 5:
                  loginRes = _context3.sent;
                  _context3.next = 8;
                  return _wepy2.default.getShareInfo({
                    shareTicket: ticket
                  });

                case 8:
                  shareInfoRes = _context3.sent;

                  if (!(loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv)) {
                    _context3.next = 16;
                    break;
                  }

                  _data = {
                    encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                    iv: shareInfoRes.iv, // 加密算法的初始向量
                    code: loginRes.code
                  };
                  _context3.next = 13;
                  return (0, _login.request)({
                    url: '/gg/group/index/dispatcher',
                    data: _data
                  });

                case 13:
                  dispatcherRes = _context3.sent;


                  console.log(dispatcherRes);
                  if (dispatcherRes && dispatcherRes.succ) {
                    _this2.loadingOut();
                    wx.navigateTo({
                      url: dispatcherRes.data.redirect_path
                    });
                  }

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwibG9hZGluZ0luIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0Iiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwiZGlzcGF0Y2hlclJlcyIsInN1Y2MiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJTaGFyZUNhbGxCYWNrIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUUxQjtBQUhTLEssUUFJVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLFdBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVB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QUFZd0IsYUFBWjtBQUNBLHNCQUFJQSxpQkFBaUJBLGNBQWNDLElBQW5DLEVBQXlDO0FBQ3ZDLDJCQUFLaEIsVUFBTDtBQUNBaEIsdUJBQUdpQyxVQUFILENBQWM7QUFDWnpCLDJCQUFLdUIsY0FBY25DLElBQWQsQ0FBbUJzQztBQURaLHFCQUFkO0FBR0Q7O0FBNUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnQ0Q7OztzQ0FDaUJ2QixHLEVBQUs7QUFDckIsYUFBTztBQUNMd0IsZUFBTyxVQURGO0FBRUxDLGNBQU0sbUNBRkQ7QUFHTEMsaUJBQVMsS0FBS0MsYUFBTCxDQUFtQjNCLEdBQW5CO0FBSEosT0FBUDtBQUtEOzs7O0VBakdnQyxlQUFLNEIsSTs7a0JBQW5CckQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eENoZWNrTG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbl1cblxuICBkYXRhID0ge1xuICAgIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICAgIGdyb3VwTGlzdDogW11cbiAgfVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgY29uc29sZS5sb2coJ290aGVyIHJlZnJlc2gnKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9pbmRleC9ncm91cGxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH0sXG4gICAgICBpc0NoZWNrOiB0cnVlXG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgIHRoaXMuZ3JvdXBMaXN0LnB1c2guYXBwbHkodGhpcy5ncm91cExpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIFNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgY29uc29sZS5sb2coJzExMScpXG4gICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgcmV0dXJuIGFzeW5jKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3NoYXJlIHN1Y2MnLCByZXMpXG4gICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHNoYXJlSW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChsb2dpblJlcy5jb2RlICYmIHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhICYmIHNoYXJlSW5mb1Jlcy5pdikge1xuICAgICAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgIGl2OiBzaGFyZUluZm9SZXMuaXYsIC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgY29kZTogbG9naW5SZXMuY29kZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkaXNwYXRjaGVyUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhkaXNwYXRjaGVyUmVzKVxuICAgICAgICAgIGlmIChkaXNwYXRjaGVyUmVzICYmIGRpc3BhdGNoZXJSZXMuc3VjYykge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGRpc3BhdGNoZXJSZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflv6vmnaXkuIrkvKDlm77niYflkKd+JyxcbiAgICAgIHBhdGg6ICcvcGFnZS9zaGFyZS9kaXNwYXRjaGVyP2Zyb209aW5kZXgnLFxuICAgICAgc3VjY2VzczogdGhpcy5TaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==