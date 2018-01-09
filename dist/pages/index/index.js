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
                console.log('1231');
                Object.assign(this, pageData);
                wx.showShareMenu({
                  // 要求小程序返回分享目标信息
                  withShareTicket: true
                });
                _context.next = 5;
                return (0, _login.wxCheckLogin)();

              case 5:
                token = _context.sent;

                if (!token) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return this.getList();

              case 9:
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
                  console.log(this.groupList);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwidXJsIiwiY3Vyc29yIiwiaXNDaGVjayIsInJlcyIsImxpc3QiLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwiaGlkZUxvYWRpbmciLCJsb2FkaW5nSW4iLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJsb2dpbiIsIndpdGhDcmVkZW50aWFscyIsImxvZ2luUmVzIiwiZ2V0U2hhcmVJbmZvIiwic2hhcmVUaWNrZXQiLCJzaGFyZUluZm9SZXMiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiX2RhdGEiLCJkaXNwYXRjaGVyUmVzIiwic3VjYyIsImluaXRQYWdlIiwibmF2aWdhdGVUbyIsInJlZGlyZWN0X3BhdGgiLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwiU2hhcmVDYWxsQmFjayIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxhQUFXO0FBRkUsQ0FBZjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUUxQjtBQUhTLEssUUFJVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFR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QWFHLEVBRlAsRUFFVztBQUNyQkYsMEJBQU1KLFNBQVNJO0FBSEwsbUJBWmI7QUFBQTtBQUFBLHlCQWtCMkIsb0JBQVE7QUFDaENqQix5QkFBSyw0QkFEMkI7QUFFaENaLDBCQUFNZ0M7QUFGMEIsbUJBQVIsQ0FsQjNCOztBQUFBO0FBa0JLQywrQkFsQkw7O0FBQUEsd0JBdUJLQSxpQkFBaUJBLGNBQWNDLElBdkJwQztBQUFBO0FBQUE7QUFBQTs7QUF3QkcseUJBQUtoQixVQUFMO0FBeEJIO0FBQUEseUJBeUJTLE9BQUtpQixRQUFMLEVBekJUOztBQUFBO0FBMEJHN0IscUJBQUc4QixVQUFILENBQWM7QUFDWnhCLHlCQUFLcUIsY0FBY2pDLElBQWQsQ0FBbUJxQztBQURaLG1CQUFkOztBQTFCSDtBQWdDSCx5QkFBS2pCLFNBQUw7QUFoQ0c7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBa0NILHlCQUFLRixVQUFMOztBQWxDRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUNEOzs7c0NBQ2lCSCxHLEVBQUs7QUFDckIsYUFBTztBQUNMdUIsZUFBTyxVQURGO0FBRUxDLGNBQU0sbUNBRkQ7QUFHTEMsaUJBQVMsS0FBS0MsYUFBTCxDQUFtQjFCLEdBQW5CO0FBSEosT0FBUDtBQUtEOzs7O0VBM0dnQyxlQUFLMkIsSTs7a0JBQW5CcEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eENoZWNrTG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICBncm91cExpc3Q6IFtdXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5rS75Yqo55u45YaMJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJncm91cExpc3RcIjp7XCJjb21cIjpcImdyb3VwSXRlbVwiLFwicHJvcHNcIjpcImdyb3VwSXRlbVwifX07XHJcbiRwcm9wcyA9IHtcImdyb3VwSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEluZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hhcmVPckNyZWF0ZUdyb3VwOiBzaGFyZU9yQ3JlYXRlR3JvdXAsXG4gICAgZ3JvdXBJdGVtOiBHcm91cEl0ZW1cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluLCBMb2FkaW5nTWl4aW5dXG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKCcxMjMxJylcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICB0aGlzLmdyb3VwTGlzdCA9IFtdXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdvdGhlciByZWZyZXNoJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICB0aGlzLmdyb3VwTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5ncm91cExpc3QsXG4gICAgICAgIC4uLnJlcy5kYXRhLmxpc3RcbiAgICAgIF1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBMaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgbG9hZGluZ091dCgpIHtcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH1cbiAgU2hhcmVDYWxsQmFjayhyZXMpIHtcbiAgICBjb25zb2xlLmxvZygnMTExJylcbiAgICB0aGlzLmxvYWRpbmdJbign55u45YaM5YiG5Lqr5LitJylcbiAgICByZXR1cm4gYXN5bmMocmVzKSA9PiB7XG4gICAgICB0aGlzLmxvYWRpbmdJbigpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEsIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgICAgY29kZTogbG9naW5SZXMuY29kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2hlclJlcyAmJiBkaXNwYXRjaGVyUmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogZGlzcGF0Y2hlclJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nSW4oKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflv6vmnaXkuIrkvKDlm77niYflkKd+JyxcbiAgICAgIHBhdGg6ICcvcGFnZS9zaGFyZS9kaXNwYXRjaGVyP2Zyb209aW5kZXgnLFxuICAgICAgc3VjY2VzczogdGhpcy5TaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==