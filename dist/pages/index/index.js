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
    }, _this.data = {
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
                _context2.next = 2;
                return (0, _login.request)({
                  url: '/gg/index/grouplist',
                  data: {
                    cursor: 0
                  },
                  isCheck: true
                });

              case 2:
                res = _context2.sent;

                console.log('-----------get list------');
                console.log(res);
                if (res && res.data) {
                  console.log(res.data);
                  this.groupList.push.apply(this.groupList, res.data.list);
                  console.log(this.groupList);
                  this.$apply();
                  this.loadingOut();
                }

              case 6:
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
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      console.log(res);
      return {
        title: '快来上传图片吧~',
        path: '/page/share/dispatcher?from=index',
        success: function success(res) {
          console.log(res);
          if (res.shareTickets) {
            var ticket = res.shareTickets[0];
            wx.login({
              withCredentials: true,
              success: function success(res) {
                if (res.code) {
                  var code = res.code;
                  wx.getShareInfo({
                    shareTicket: ticket,
                    success: function success(res) {
                      var encryptedData = res.encryptedData; //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                      var iv = res.iv; // 加密算法的初始向量
                      (0, _login.request)({
                        url: '/gg/group/index/dispatcher',
                        data: {
                          encryptedData: encryptedData,
                          code: code,
                          iv: iv
                        }
                      }).then(function (res) {
                        console.log(15);
                        console.log(res);
                        if (res.succ) {
                          var redirect_path = res.data.redirect_path;
                          wx.navigateTo({
                            url: redirect_path
                          });
                        }
                      });
                    },
                    fail: function fail() {},
                    complete: function complete() {}
                  });
                }
              }
            });
          }
        }
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwidXJsIiwiY3Vyc29yIiwiaXNDaGVjayIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwiY29kZSIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0IiwiZW5jcnlwdGVkRGF0YSIsIml2IiwidGhlbiIsInN1Y2MiLCJyZWRpcmVjdF9wYXRoIiwibmF2aWdhdGVUbyIsImZhaWwiLCJjb21wbGV0ZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUUxQjtBQUhTLEssUUFJVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLFdBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQWhCLEVBQTJGLHlCQUF3QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sV0FBcEMsRUFBZ0QsUUFBTyxNQUF2RCxFQUE4RCxTQUFRLE9BQXRFLEVBQThFLE9BQU0sT0FBcEYsRUFBbkgsRUFBZ04sMEJBQXlCLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxXQUF0QyxFQUFrRCxRQUFPLE1BQXpELEVBQWdFLFNBQVEsT0FBeEUsRUFBZ0YsT0FBTSxPQUF0RixFQUF6TyxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLHNEQURVO0FBRVZDO0FBRlUsSyxRQUtaQyxJLEdBQU87QUFDTEMsZ0JBQVUsT0FETDtBQUVMQyxpQkFBVztBQUZOLEssUUFJUEMsTyxHQUFVLEU7Ozs7Ozs7Ozs7OztBQUVSQyxtQkFBR0MsYUFBSCxDQUFpQjtBQUNmO0FBQ0FDLG1DQUFpQjtBQUZGLGlCQUFqQjs7dUJBSWtCLDBCOzs7QUFBZEMscUI7O3FCQUNBQSxLOzs7Ozs7dUJBQ0ksS0FBS0MsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBR0hDLEMsRUFBRztBQUNSTCxTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQjtBQURGLE9BQWpCO0FBR0Q7Ozs7Ozs7Ozs7O3VCQUdpQixvQkFBUTtBQUN0QkksdUJBQUsscUJBRGlCO0FBRXRCVix3QkFBTTtBQUNKVyw0QkFBUTtBQURKLG1CQUZnQjtBQUt0QkMsMkJBQVM7QUFMYSxpQkFBUixDOzs7QUFBWkMsbUI7O0FBT0pDLHdCQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLG9CQUFJQSxPQUFPQSxJQUFJYixJQUFmLEVBQXFCO0FBQ25CYywwQkFBUUMsR0FBUixDQUFZRixJQUFJYixJQUFoQjtBQUNBLHVCQUFLRSxTQUFMLENBQWVjLElBQWYsQ0FBb0JDLEtBQXBCLENBQTBCLEtBQUtmLFNBQS9CLEVBQTBDVyxJQUFJYixJQUFKLENBQVNrQixJQUFuRDtBQUNBSiwwQkFBUUMsR0FBUixDQUFZLEtBQUtiLFNBQWpCO0FBQ0EsdUJBQUtpQixNQUFMO0FBQ0EsdUJBQUtDLFVBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUVVO0FBQ1hoQixTQUFHaUIsV0FBSDtBQUNEOzs7c0NBQ2lCUixHLEVBQUs7QUFDckJDLGNBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLGFBQU87QUFDTFMsZUFBTyxVQURGO0FBRUxDLGNBQU0sbUNBRkQ7QUFHTEMsaUJBQVMsaUJBQVVYLEdBQVYsRUFBZTtBQUN0QkMsa0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLGNBQUlBLElBQUlZLFlBQVIsRUFBc0I7QUFDcEIsZ0JBQUlDLFNBQVNiLElBQUlZLFlBQUosQ0FBaUIsQ0FBakIsQ0FBYjtBQUNBckIsZUFBR3VCLEtBQUgsQ0FBUztBQUNQQywrQkFBaUIsSUFEVjtBQUVQSix1QkFBUyxpQkFBVVgsR0FBVixFQUFlO0FBQ3RCLG9CQUFJQSxJQUFJZ0IsSUFBUixFQUFjO0FBQ1osc0JBQUlBLE9BQU9oQixJQUFJZ0IsSUFBZjtBQUNBekIscUJBQUcwQixZQUFILENBQWdCO0FBQ2RDLGlDQUFhTCxNQURDO0FBRWRGLDJCQUZjLG1CQUVOWCxHQUZNLEVBRUQ7QUFDWCwwQkFBSW1CLGdCQUFnQm5CLElBQUltQixhQUF4QixDQURXLENBQzJCO0FBQ3RDLDBCQUFJQyxLQUFLcEIsSUFBSW9CLEVBQWIsQ0FGVyxDQUVLO0FBQ2hCLDBDQUFRO0FBQ052Qiw2QkFBSyw0QkFEQztBQUVOViw4QkFBTTtBQUNKZ0MseUNBQWVBLGFBRFg7QUFFSkgsZ0NBQU1BLElBRkY7QUFHSkksOEJBQUlBO0FBSEE7QUFGQSx1QkFBUixFQU9HQyxJQVBILENBT1EsVUFBQ3JCLEdBQUQsRUFBUztBQUNmQyxnQ0FBUUMsR0FBUixDQUFZLEVBQVo7QUFDQUQsZ0NBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLDRCQUFJQSxJQUFJc0IsSUFBUixFQUFjO0FBQ1osOEJBQUlDLGdCQUFnQnZCLElBQUliLElBQUosQ0FBU29DLGFBQTdCO0FBQ0FoQyw2QkFBR2lDLFVBQUgsQ0FBYztBQUNaM0IsaUNBQUswQjtBQURPLDJCQUFkO0FBR0Q7QUFDRix1QkFoQkQ7QUFpQkQscUJBdEJhO0FBdUJkRSx3QkF2QmMsa0JBdUJQLENBQUUsQ0F2Qks7QUF3QmRDLDRCQXhCYyxzQkF3QkgsQ0FBRTtBQXhCQyxtQkFBaEI7QUEwQkQ7QUFDRjtBQWhDTSxhQUFUO0FBa0NEO0FBQ0Y7QUExQ0ksT0FBUDtBQTRDRDs7OztFQXJHZ0MsZUFBS0MsSTs7a0JBQW5CakQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eENoZWNrTG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cEl0ZW1cIixcInByb3BzXCI6XCJncm91cEl0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJncm91cEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgIGdyb3VwSXRlbTogR3JvdXBJdGVtXG4gIH1cblxuICBkYXRhID0ge1xuICAgIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICAgIGdyb3VwTGlzdDogW11cbiAgfVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2luZGV4L2dyb3VwbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfSxcbiAgICAgIGlzQ2hlY2s6IHRydWVcbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLWdldCBsaXN0LS0tLS0tJylcbiAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICB0aGlzLmdyb3VwTGlzdC5wdXNoLmFwcGx5KHRoaXMuZ3JvdXBMaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b+r5p2l5LiK5Lyg5Zu+54mH5ZCnficsXG4gICAgICBwYXRoOiAnL3BhZ2Uvc2hhcmUvZGlzcGF0Y2hlcj9mcm9tPWluZGV4JyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHJlcy5jb2RlXG4gICAgICAgICAgICAgICAgd3guZ2V0U2hhcmVJbmZvKHtcbiAgICAgICAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXQsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IHJlcy5lbmNyeXB0ZWREYXRhIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICAgICAgICB2YXIgaXYgPSByZXMuaXYgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl2OiBpdlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMTUpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZGlyZWN0X3BhdGggPSByZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiByZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmYWlsKCkge30sXG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHt9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==