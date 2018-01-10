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
      navigationBarTitleText: '群活动相册'
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
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Object.assign(this, pageData);
                wx.showShareMenu({
                  // 要求小程序返回分享目标信息
                  withShareTicket: true
                });
                _context.next = 4;
                return (0, _login.wxCheckLogin)();

              case 4:
                token = _context.sent;

                if (!token) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return this.getList();

              case 8:
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

      console.log('111');
      this.loadingIn('相册分享中');
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
                  _context3.next = 25;
                  break;

                case 22:
                  _context3.prev = 22;
                  _context3.t0 = _context3['catch'](1);

                  _this2.loadingOut();

                case 25:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[1, 22]]);
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
        imageUrl: 'https://mres.jiuyan.info/201712271701/tugoweb/3.0/images/in/20150313/in_logo.png?t=201712271701',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInRva2VuIiwiZ2V0TGlzdCIsImUiLCJjb25zb2xlIiwibG9nIiwidXJsIiwiY3Vyc29yIiwiaXNDaGVjayIsInJlcyIsImxpc3QiLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwiaGlkZUxvYWRpbmciLCJsb2FkaW5nSW4iLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJsb2dpbiIsIndpdGhDcmVkZW50aWFscyIsImxvZ2luUmVzIiwiZ2V0U2hhcmVJbmZvIiwic2hhcmVUaWNrZXQiLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJkaXNwYXRjaGVyUmVzIiwic3VjYyIsImluaXRQYWdlIiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJTaGFyZUNhbGxCYWNrIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLFdBQVc7QUFDYkMsWUFBVSxPQURHO0FBRWJDLGFBQVc7QUFGRSxDQUFmOztJQUlxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRTFCO0FBSFMsSyxRQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQ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YjtBQUFBO0FBQUEseUJBa0IyQixvQkFBUTtBQUNoQ2pCLHlCQUFLLDRCQUQyQjtBQUVoQ1osMEJBQU1nQztBQUYwQixtQkFBUixDQWxCM0I7O0FBQUE7QUFrQktDLCtCQWxCTDs7QUFBQSx3QkF1QktBLGlCQUFpQkEsY0FBY0MsSUF2QnBDO0FBQUE7QUFBQTtBQUFBOztBQXdCRyx5QkFBS2hCLFVBQUw7QUF4Qkg7QUFBQSx5QkF5QlMsT0FBS2lCLFFBQUwsRUF6QlQ7O0FBQUE7QUEwQkcvQixxQkFBR2dDLFVBQUgsQ0FBYztBQUNaeEIseUJBQUtxQixjQUFjakMsSUFBZCxDQUFtQnFDO0FBRFosbUJBQWQ7O0FBMUJIO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBaUNILHlCQUFLbkIsVUFBTDs7QUFqQ0c7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9DRDs7O3NDQUNpQkgsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTHVCLGVBQU8sYUFERjtBQUVMQyxjQUFNLG9DQUZEO0FBR0xDLGtCQUFVLGlHQUhMO0FBSUxDLGlCQUFTLEtBQUtDLGFBQUwsQ0FBbUIzQixHQUFuQjtBQUpKLE9BQVA7QUFNRDs7OztFQXpHZ0MsZUFBSzRCLEk7O2tCQUFuQnJELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IEdyb3VwSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L2dyb3VwSXRlbSdcbmltcG9ydCBzaGFyZU9yQ3JlYXRlR3JvdXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9zaGFyZU9yQ3JlYXRlR3JvdXAnXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2luZGV4JyxcbiAgZ3JvdXBMaXN0OiBbXVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cEl0ZW1cIixcInByb3BzXCI6XCJncm91cEl0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJncm91cEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgIGdyb3VwSXRlbTogR3JvdXBJdGVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluXVxuXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHt9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICB0aGlzLmdyb3VwTGlzdCA9IFtdXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cExpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMuZ3JvdXBMaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIFNoYXJlQ2FsbEJhY2socmVzKSB7XG4gICAgY29uc29sZS5sb2coJzExMScpXG4gICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgcmV0dXJuIGFzeW5jKHJlcykgPT4ge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEsIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgICAgY29kZTogbG9naW5SZXMuY29kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2hlclJlcyAmJiBkaXNwYXRjaGVyUmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5LiA6LW35p2l5Yqg5YWl5pys576k55u45YaM5ZCn77yBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvc2hhcmUvZGlzcGF0Y2hlcj9mcm9tPWluZGV4JyxcbiAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9tcmVzLmppdXlhbi5pbmZvLzIwMTcxMjI3MTcwMS90dWdvd2ViLzMuMC9pbWFnZXMvaW4vMjAxNTAzMTMvaW5fbG9nby5wbmc/dD0yMDE3MTIyNzE3MDEnLFxuICAgICAgc3VjY2VzczogdGhpcy5TaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==