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
                    _context3.next = 19;
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
                    _context3.next = 19;
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
                    _context3.next = 19;
                    break;
                  }

                  _context3.next = 18;
                  return _this2.initPage();

                case 18:
                  wx.navigateTo({
                    url: dispatcherRes.data.redirect_path
                  });

                case 19:
                  _this2.loadingIn();
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
        title: '快来上传图片吧~',
        path: '/page/share/dispatcher?from=index',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwibG9hZGluZ0luIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0Iiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwiZGlzcGF0Y2hlclJlcyIsInN1Y2MiLCJpbml0UGFnZSIsIm5hdmlnYXRlVG8iLCJyZWRpcmVjdF9wYXRoIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsIlNoYXJlQ2FsbEJhY2siLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRTFCO0FBSFMsSyxRQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9B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LElBdkJwQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQXdCUyxPQUFLQyxRQUFMLEVBeEJUOztBQUFBO0FBeUJHakMscUJBQUdrQyxVQUFILENBQWM7QUFDWjFCLHlCQUFLdUIsY0FBY25DLElBQWQsQ0FBbUJ1QztBQURaLG1CQUFkOztBQXpCSDtBQStCSCx5QkFBS2pCLFNBQUw7QUEvQkc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBaUNILHlCQUFLRixVQUFMOztBQWpDRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0NEOzs7c0NBQ2lCTCxHLEVBQUs7QUFDckIsYUFBTztBQUNMeUIsZUFBTyxVQURGO0FBRUxDLGNBQU0sbUNBRkQ7QUFHTEMsaUJBQVMsS0FBS0MsYUFBTCxDQUFtQjVCLEdBQW5CO0FBSEosT0FBUDtBQUtEOzs7O0VBdEdnQyxlQUFLNkIsSTs7a0JBQW5CdEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eENoZWNrTG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbl1cblxuICBkYXRhID0ge1xuICAgIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICAgIGdyb3VwTGlzdDogW11cbiAgfVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICB0aGlzLmdyb3VwTGlzdCA9IFtdXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICB0aGlzLmdyb3VwTGlzdC5wdXNoLmFwcGx5KHRoaXMuZ3JvdXBMaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBTaGFyZUNhbGxCYWNrKHJlcykge1xuICAgIHJldHVybiBhc3luYyhyZXMpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZ0luKClcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdmFyIHNoYXJlSW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChsb2dpblJlcy5jb2RlICYmIHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhICYmIHNoYXJlSW5mb1Jlcy5pdikge1xuICAgICAgICAgICAgdmFyIF9kYXRhID0ge1xuICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICAgIGl2OiBzaGFyZUluZm9SZXMuaXYsIC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgICBjb2RlOiBsb2dpblJlcy5jb2RlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXNwYXRjaGVyUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkaXNwYXRjaGVyUmVzICYmIGRpc3BhdGNoZXJSZXMuc3VjYykge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRQYWdlKClcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRpbmdJbigpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W/q+adpeS4iuS8oOWbvueJh+WQp34nLFxuICAgICAgcGF0aDogJy9wYWdlL3NoYXJlL2Rpc3BhdGNoZXI/ZnJvbT1pbmRleCcsXG4gICAgICBzdWNjZXNzOiB0aGlzLlNoYXJlQ2FsbEJhY2socmVzKVxuICAgIH1cbiAgfVxufVxuIl19