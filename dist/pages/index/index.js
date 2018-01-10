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
                this.getShareFromOther();
                _context.next = 9;
                return this.getList();

              case 9:
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
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
    key: 'getShareFromOther',
    value: function getShareFromOther() {
      var _shareTickets = this.$parent.globalData.shareTicket;

      if (_shareTickets) {
        this.ShareCallBack({
          'shareTickets': [_shareTickets]
        }, 'share')({
          'shareTickets': [_shareTickets]
        });
      }
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
    value: function ShareCallBack(res, a) {
      var _this2 = this;

      return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res, a) {
          var ticket, loginRes, shareInfoRes, _data, dispatcherRes;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (a === 'share') {
                    console.log('----on share----');
                  }
                  _this2.loadingIn('相册分享中');
                  _context3.prev = 2;

                  if (!res.shareTickets) {
                    _context3.next = 21;
                    break;
                  }

                  ticket = res.shareTickets[0];
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
                  _this2.loadingOut();
                  _context3.next = 27;
                  break;

                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3['catch'](2);

                  _this2.loadingOut();

                case 27:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[2, 24]]);
        }));

        return function (_x, _x2) {
          return _ref4.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '一起来加入本群相册吧！',
        path: '/pages/index/index?from=index',
        imageUrl: 'http://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInNldFNoYXJlIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIl9zaGFyZVRpY2tldHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNoYXJlVGlja2V0IiwiU2hhcmVDYWxsQmFjayIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJjdXJzb3IiLCJpc0NoZWNrIiwicmVzIiwibGlzdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiYSIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJkaXNwYXRjaGVyUmVzIiwic3VjYyIsImluaXRQYWdlIiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsV0FBVztBQUNiQyxZQUFVLE9BREc7QUFFYkMsYUFBVztBQUZFLENBQWY7O0lBSXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFD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T0FBUDtBQU1EOzs7O0VBeEhnQyxlQUFLeUIsSTs7a0JBQW5CMUQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IEdyb3VwSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L2dyb3VwSXRlbSdcbmltcG9ydCBzaGFyZU9yQ3JlYXRlR3JvdXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9zaGFyZU9yQ3JlYXRlR3JvdXAnXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2luZGV4JyxcbiAgZ3JvdXBMaXN0OiBbXVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOWPi+WFseS6q+ebuOWGjCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cEl0ZW1cIixcInByb3BzXCI6XCJncm91cEl0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJncm91cEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgIGdyb3VwSXRlbTogR3JvdXBJdGVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluXVxuXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHt9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuc2V0U2hhcmUoKVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgdGhpcy5nZXRTaGFyZUZyb21PdGhlcigpXG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgc2V0U2hhcmUoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICB0aGlzLmdyb3VwTGlzdCA9IFtdXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBnZXRTaGFyZUZyb21PdGhlcigpIHtcbiAgICB2YXIgX3NoYXJlVGlja2V0cyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNoYXJlVGlja2V0XG5cbiAgICBpZiAoX3NoYXJlVGlja2V0cykge1xuICAgICAgdGhpcy5TaGFyZUNhbGxCYWNrKHtcbiAgICAgICAgJ3NoYXJlVGlja2V0cyc6IFtfc2hhcmVUaWNrZXRzXVxuICAgICAgfSwgJ3NoYXJlJykoe1xuICAgICAgICAnc2hhcmVUaWNrZXRzJzogW19zaGFyZVRpY2tldHNdXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cExpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMuZ3JvdXBMaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIFNoYXJlQ2FsbEJhY2socmVzLCBhKSB7XG4gICAgcmV0dXJuIGFzeW5jKHJlcywgYSkgPT4ge1xuICAgICAgaWYgKGEgPT09ICdzaGFyZScpIHtcbiAgICAgICAgY29uc29sZS5sb2coJy0tLS1vbiBzaGFyZS0tLS0nKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ebuOWGjOWIhuS6q+S4rScpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEsIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgICAgY29kZTogbG9naW5SZXMuY29kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2hlclJlcyAmJiBkaXNwYXRjaGVyUmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5LiA6LW35p2l5Yqg5YWl5pys576k55u45YaM5ZCn77yBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgvaW5kZXg/ZnJvbT1pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHA6Ly9pbmltZzA3LmppdXlhbi5pbmZvL2luLzIwMTgvMDEvMTAvQkI1MkM4MzYtNzdDRS0zNzNBLUQ0ODQtQkVDOTQwNTc0OUZCLmpwZycsXG4gICAgICBzdWNjZXNzOiB0aGlzLlNoYXJlQ2FsbEJhY2socmVzKVxuICAgIH1cbiAgfVxufVxuIl19