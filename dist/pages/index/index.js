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
        this.ShareCallBack()({
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
                  _this2.loadingOut();
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
        path: '/pages/index/index?from=index',
        imageUrl: 'http://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInNldFNoYXJlIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIl9zaGFyZVRpY2tldHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNoYXJlVGlja2V0IiwiU2hhcmVDYWxsQmFjayIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJjdXJzb3IiLCJpc0NoZWNrIiwicmVzIiwibGlzdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlSW5mb1JlcyIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJfZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwiaW5pdFBhZ2UiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxhQUFXO0FBRkUsQ0FBZjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMs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NEIsbUJBQWxCLENBUnhCOztBQUFBO0FBUUdLLDhCQVJIOztBQUFBLHdCQVdHRixTQUFTRyxJQUFULElBQWlCRCxhQUFhRSxhQUE5QixJQUErQ0YsYUFBYUcsRUFYL0Q7QUFBQTtBQUFBO0FBQUE7O0FBWUtDLHVCQVpMLEdBWWE7QUFDVkYsbUNBQWVGLGFBQWFFLGFBRGxCLEVBQ2lDO0FBQzNDQyx3QkFBSUgsYUFBYUcsRUFGUCxFQUVXO0FBQ3JCRiwwQkFBTUgsU0FBU0c7QUFITCxtQkFaYjtBQUFBO0FBQUEseUJBa0IyQixvQkFBUTtBQUNoQ2QseUJBQUssNEJBRDJCO0FBRWhDcEIsMEJBQU1xQztBQUYwQixtQkFBUixDQWxCM0I7O0FBQUE7QUFrQktDLCtCQWxCTDs7QUFBQSx3QkF1QktBLGlCQUFpQkEsY0FBY0MsSUF2QnBDO0FBQUE7QUFBQTtBQUFBOztBQXdCRyx5QkFBSy9CLFVBQUw7QUF4Qkg7QUFBQSx5QkF5QlMsT0FBS2dDLFFBQUwsRUF6QlQ7O0FBQUE7QUEwQkc5QixxQkFBRytCLFVBQUgsQ0FBYztBQUNackIseUJBQUtrQixjQUFjdEMsSUFBZCxDQUFtQjBDO0FBRFosbUJBQWQ7O0FBMUJIO0FBZ0NILHlCQUFLbEMsVUFBTDtBQWhDRztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFrQ0gseUJBQUtBLFVBQUw7O0FBbENHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQ0Q7OztzQ0FDaUJlLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xvQixlQUFPLGFBREY7QUFFTEMsY0FBTSwrQkFGRDtBQUdMQyxrQkFBVSxtRkFITDtBQUlMQyxpQkFBUyxLQUFLN0IsYUFBTCxDQUFtQk0sR0FBbkI7QUFKSixPQUFQO0FBTUQ7Ozs7RUFuSGdDLGVBQUt3QixJOztrQkFBbkJ6RCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICBncm91cExpc3Q6IFtdXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5Y+L5YWx5Lqr55u45YaMJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJncm91cExpc3RcIjp7XCJjb21cIjpcImdyb3VwSXRlbVwiLFwicHJvcHNcIjpcImdyb3VwSXRlbVwifX07XHJcbiRwcm9wcyA9IHtcImdyb3VwSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEluZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hhcmVPckNyZWF0ZUdyb3VwOiBzaGFyZU9yQ3JlYXRlR3JvdXAsXG4gICAgZ3JvdXBJdGVtOiBHcm91cEl0ZW1cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluLCBMb2FkaW5nTWl4aW5dXG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5zZXRTaGFyZSgpXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICB0aGlzLmdldFNoYXJlRnJvbU90aGVyKClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuICBzZXRTaGFyZSgpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZSAvLyDopoHmsYLlsI/nqIvluo/ov5Tlm57liIbkuqvnm67moIfkv6Hmga9cbiAgICB9KVxuICB9XG4gIGluaXRQYWdlKCkge1xuICAgIHRoaXMuZ3JvdXBMaXN0ID0gW11cbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIGdldFNoYXJlRnJvbU90aGVyKCkge1xuICAgIHZhciBfc2hhcmVUaWNrZXRzID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2hhcmVUaWNrZXRcblxuICAgIGlmIChfc2hhcmVUaWNrZXRzKSB7XG4gICAgICB0aGlzLlNoYXJlQ2FsbEJhY2soKSh7XG4gICAgICAgICdzaGFyZVRpY2tldHMnOiBbX3NoYXJlVGlja2V0c11cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgY29uc29sZS5sb2coJ290aGVyIHJlZnJlc2gnKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9pbmRleC9ncm91cGxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH0sXG4gICAgICBpc0NoZWNrOiB0cnVlXG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdyb3VwTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5ncm91cExpc3QsXG4gICAgICAgIC4uLnJlcy5kYXRhLmxpc3RcbiAgICAgIF1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBMaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgbG9hZGluZ091dCgpIHtcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH1cbiAgU2hhcmVDYWxsQmFjayhyZXMpIHtcbiAgICByZXR1cm4gYXN5bmMocmVzKSA9PiB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign55u45YaM5YiG5Lqr5LitJylcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICB2YXIgbG9naW5SZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdmFyIHNoYXJlSW5mb1JlcyA9IGF3YWl0IHdlcHkuZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChsb2dpblJlcy5jb2RlICYmIHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhICYmIHNoYXJlSW5mb1Jlcy5pdikge1xuICAgICAgICAgICAgdmFyIF9kYXRhID0ge1xuICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICAgIGl2OiBzaGFyZUluZm9SZXMuaXYsIC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgICBjb2RlOiBsb2dpblJlcy5jb2RlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXNwYXRjaGVyUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkaXNwYXRjaGVyUmVzICYmIGRpc3BhdGNoZXJSZXMuc3VjYykge1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRQYWdlKClcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfkuIDotbfmnaXliqDlhaXmnKznvqTnm7jlhozlkKfvvIEnLFxuICAgICAgcGF0aDogJy9wYWdlcy9pbmRleC9pbmRleD9mcm9tPWluZGV4JyxcbiAgICAgIGltYWdlVXJsOiAnaHR0cDovL2luaW1nMDcuaml1eWFuLmluZm8vaW4vMjAxOC8wMS8xMC9CQjUyQzgzNi03N0NFLTM3M0EtRDQ4NC1CRUM5NDA1NzQ5RkIuanBnJyxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuU2hhcmVDYWxsQmFjayhyZXMpXG4gICAgfVxuICB9XG59XG4iXX0=