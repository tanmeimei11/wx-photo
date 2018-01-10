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
        path: '/pages/index/index?from=index',
        imageUrl: 'http://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.ShareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInNldFNoYXJlIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIl9zaGFyZVRpY2tldHMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNoYXJlVGlja2V0IiwiU2hhcmVDYWxsQmFjayIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJjdXJzb3IiLCJpc0NoZWNrIiwicmVzIiwibGlzdCIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlSW5mb1JlcyIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJfZGF0YSIsImRpc3BhdGNoZXJSZXMiLCJzdWNjIiwiaW5pdFBhZ2UiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxhQUFXO0FBRkUsQ0FBZjs7SUFJcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUUxQjtBQUhTLEssUUFJVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLFdBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQWhCLEVBQTJGLHlCQUF3QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sV0FBcEMsRUFBZ0QsUUFBTyxNQUF2RCxFQUE4RCxTQUFRLE9BQXRFLEVBQThFLE9BQU0sT0FBcEYsRUFBbkgsRUFBZ04sMEJBQXlCLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxXQUF0QyxFQUFrRCxRQUFPLE1BQXpELEVBQWdFLFNBQVEsT0FBeEUsRUFBZ0YsT0FBTSxPQUF0RixFQUF6TyxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLHNEQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxNLEdBQVMsbUQsUUFFVEMsSSxHQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmYsUUFBbEIsQyxRQUNQZ0IsTyxHQUFVLEU7Ozs7Ozs7Ozs7O0FBRVJGLHVCQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQmYsUUFBcEI7QUFDQSxxQkFBS2lCLFFBQUw7Ozt1QkFFUSxxQjs7O0FBQ04scUJBQUtDLFNBQUwsQ0FBZSxLQUFmO0FBQ0EscUJBQUtDLGlCQUFMOzt1QkFDTSxLQUFLQyxPQUFMLEU7Ozs7Ozs7Ozs7QUFFTixxQkFBS0MsVUFBTDtBQUNBLHFCQUFLQyxTQUFMLENBQWUsTUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUdPO0FBQ1RDLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCLElBREYsQ0FDTztBQURQLE9BQWpCO0FBR0Q7OzsrQkFDVTtBQUNULFdBQUt2QixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBS2tCLE9BQUw7QUFDRDs7O3dDQUNtQjtBQUNsQixVQUFJTSxnQkFBZ0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxXQUE1Qzs7QUFFQSxVQUFJSCxhQUFKLEVBQW1CO0FBQ2pCLGFBQUtJLGFBQUwsR0FBcUI7QUFDbkIsMEJBQWdCLENBQUNKLGFBQUQ7QUFERyxTQUFyQjtBQUdEO0FBQ0Y7Ozs7Ozs7Ozs7QUFFQ0ssd0JBQVFDLEdBQVIsQ0FBWSxlQUFaOzt1QkFDZ0Isb0JBQVE7QUFDdEJDLHVCQUFLLHFCQURpQjtBQUV0QnBCLHdCQUFNO0FBQ0pxQiw0QkFBUTtBQURKLG1CQUZnQjtBQUt0QkMsMkJBQVM7QUFMYSxpQkFBUixDOzs7QUFBWkMsbUI7O0FBT0osb0JBQUlBLE9BQU9BLElBQUl2QixJQUFmLEVBQXFCO0FBQ25CLHVCQUFLWCxTQUFMLGdDQUNLLEtBQUtBLFNBRFYsc0JBRUtrQyxJQUFJdkIsSUFBSixDQUFTd0IsSUFGZDtBQUlBTiwwQkFBUUMsR0FBUixDQUFZLEtBQUs5QixTQUFqQjtBQUNBLHVCQUFLb0MsTUFBTDtBQUNBLHVCQUFLakIsVUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBRVU7QUFDWEUsU0FBR2dCLFdBQUg7QUFDRDs7O2tDQUNhSCxHLEVBQUs7QUFBQTs7QUFDakI7QUFBQSw0RUFBTyxrQkFBTUEsR0FBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0wseUJBQUtsQixTQUFMLENBQWUsT0FBZjtBQURLOztBQUFBLHVCQUdDa0IsSUFBSUksWUFITDtBQUFBO0FBQUE7QUFBQTs7QUFJR0Msd0JBSkgsR0FJWUwsSUFBSUksWUFBSixDQUFpQixDQUFqQixDQUpaO0FBQUE7QUFBQSx5QkFLb0IsZUFBS0UsS0FBTCxDQUFXO0FBQzlCQyxxQ0FBaUI7QUFEYSxtQkFBWCxDQUxwQjs7QUFBQTtBQUtHQywwQkFMSDtBQUFBO0FBQUEseUJBUXdCLGVBQUtDLFlBQUwsQ0FBa0I7QUFDekNoQixpQ0FBYVk7QUFENEIsbUJBQWxCLENBUnhCOztBQUFBO0FBUUdLLDhCQVJIOztBQUFBLHdCQVdHRixTQUFTRyxJQUFULElBQWlCRCxhQUFhRSxhQUE5QixJQUErQ0YsYUFBYUcsRUFYL0Q7QUFBQTtBQUFBO0FBQUE7O0FBWUtDLHVCQVpMLEdBWWE7QUFDVkYsbUNBQWVGLGFBQWFFLGFBRGxCLEVBQ2lDO0FBQzNDQyx3QkFBSUgsYUFBYUcsRUFGUCxFQUVXO0FBQ3JCRiwwQkFBTUgsU0FBU0c7QUFITCxtQkFaYjtBQUFBO0FBQUEseUJBa0IyQixvQkFBUTtBQUNoQ2QseUJBQUssNEJBRDJCO0FBRWhDcEIsMEJBQU1xQztBQUYwQixtQkFBUixDQWxCM0I7O0FBQUE7QUFrQktDLCtCQWxCTDs7QUFBQSx3QkF1QktBLGlCQUFpQkEsY0FBY0MsSUF2QnBDO0FBQUE7QUFBQTtBQUFBOztBQXdCRyx5QkFBSy9CLFVBQUw7QUF4Qkg7QUFBQSx5QkF5QlMsT0FBS2dDLFFBQUwsRUF6QlQ7O0FBQUE7QUEwQkc5QixxQkFBRytCLFVBQUgsQ0FBYztBQUNackIseUJBQUtrQixjQUFjdEMsSUFBZCxDQUFtQjBDO0FBRFosbUJBQWQ7O0FBMUJIO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBaUNILHlCQUFLbEMsVUFBTDs7QUFqQ0c7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9DRDs7O3NDQUNpQmUsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTG9CLGVBQU8sYUFERjtBQUVMQyxjQUFNLCtCQUZEO0FBR0xDLGtCQUFVLG1GQUhMO0FBSUxDLGlCQUFTLEtBQUs3QixhQUFMLENBQW1CTSxHQUFuQjtBQUpKLE9BQVA7QUFNRDs7OztFQWxIZ0MsZUFBS3dCLEk7O2tCQUFuQnpELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9ncm91cEl0ZW0nXG5pbXBvcnQgc2hhcmVPckNyZWF0ZUdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvc2hhcmVPckNyZWF0ZUdyb3VwJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdpbmRleCcsXG4gIGdyb3VwTGlzdDogW11cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTlj4vlhbHkuqvnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbl1cblxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7fVxuICBhc3luYyBvbkxvYWQoKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLnNldFNoYXJlKClcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIHRoaXMuZ2V0U2hhcmVGcm9tT3RoZXIoKVxuICAgICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cbiAgaW5pdFBhZ2UoKSB7XG4gICAgdGhpcy5ncm91cExpc3QgPSBbXVxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gIH1cbiAgZ2V0U2hhcmVGcm9tT3RoZXIoKSB7XG4gICAgdmFyIF9zaGFyZVRpY2tldHMgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zaGFyZVRpY2tldFxuXG4gICAgaWYgKF9zaGFyZVRpY2tldHMpIHtcbiAgICAgIHRoaXMuU2hhcmVDYWxsQmFjaygpKHtcbiAgICAgICAgJ3NoYXJlVGlja2V0cyc6IFtfc2hhcmVUaWNrZXRzXVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZygnb3RoZXIgcmVmcmVzaCcpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2luZGV4L2dyb3VwbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfSxcbiAgICAgIGlzQ2hlY2s6IHRydWVcbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gW1xuICAgICAgICAuLi50aGlzLmdyb3VwTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBTaGFyZUNhbGxCYWNrKHJlcykge1xuICAgIHJldHVybiBhc3luYyhyZXMpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfnm7jlhozliIbkuqvkuK0nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHNoYXJlSW5mb1Jlcy5lbmNyeXB0ZWREYXRhLCAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGRpc3BhdGNoZXJSZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+S4gOi1t+adpeWKoOWFpeacrOe+pOebuOWGjOWQp++8gScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4L2luZGV4P2Zyb209aW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5TaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==