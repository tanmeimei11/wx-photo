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
    }, _this.mixins = [_formSubmitMixin2.default], _this.data = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0Iiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwiZGlzcGF0Y2hlclJlcyIsInN1Y2MiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJTaGFyZUNhbGxCYWNrIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFFMUI7QUFIUyxLLFFBSVZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxXQUEzQixFQUFiLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRD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eUM7QUFDdkMvQix1QkFBR2dDLFVBQUgsQ0FBYztBQUNaeEIsMkJBQUtzQixjQUFjbEMsSUFBZCxDQUFtQnFDO0FBRFoscUJBQWQ7QUFHRDs7QUEzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStCRDs7O3NDQUNpQnRCLEcsRUFBSztBQUNyQixhQUFPO0FBQ0x1QixlQUFPLFVBREY7QUFFTEMsY0FBTSxtQ0FGRDtBQUdMQyxpQkFBUyxLQUFLQyxhQUFMLENBQW1CMUIsR0FBbkI7QUFISixPQUFQO0FBS0Q7Ozs7RUEvRmdDLGVBQUsyQixJOztrQkFBbkJwRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9ncm91cEl0ZW0nXG5pbXBvcnQgc2hhcmVPckNyZWF0ZUdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvc2hhcmVPckNyZWF0ZUdyb3VwJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG5cbiAgZGF0YSA9IHtcbiAgICBwYWdlTmFtZTogJ2luZGV4JyxcbiAgICBncm91cExpc3Q6IFtdXG4gIH1cbiAgbWV0aG9kcyA9IHt9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgICB2YXIgdG9rZW4gPSBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgIGlmICh0b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgICB9XG4gIH1cbiAgb25TaG93KGUpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICB0aGlzLmdyb3VwTGlzdC5wdXNoLmFwcGx5KHRoaXMuZ3JvdXBMaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBTaGFyZUNhbGxCYWNrKHJlcykge1xuICAgIGNvbnNvbGUubG9nKCcxMTEnKVxuICAgIHJldHVybiBhc3luYyhyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaGFyZSBzdWNjJywgcmVzKVxuICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICB9KVxuICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgY29uc29sZS5sb2coZGlzcGF0Y2hlclJlcylcbiAgICAgICAgICBpZiAoZGlzcGF0Y2hlclJlcyAmJiBkaXNwYXRjaGVyUmVzLnN1Y2MpIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGRpc3BhdGNoZXJSZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflv6vmnaXkuIrkvKDlm77niYflkKd+JyxcbiAgICAgIHBhdGg6ICcvcGFnZS9zaGFyZS9kaXNwYXRjaGVyP2Zyb209aW5kZXgnLFxuICAgICAgc3VjY2VzczogdGhpcy5TaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==