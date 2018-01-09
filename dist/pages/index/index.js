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
            wx.getShareInfo({
              shareTicket: ticket,
              success: function success(res) {
                var encryptedData = res.encryptedData; //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                var iv = res.iv; // 加密算法的初始向量
                wx.login({
                  withCredentials: true,
                  success: function success(res) {
                    console.log(res);
                    if (res.code) {
                      var code = res.code;
                      console.log(res.code); // 使用这个 code 向微信换取 session_key
                      console.log(14);
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
                    }
                  }
                });
              },
              fail: function fail() {},
              complete: function complete() {}
            });
          }
        },
        fail: function fail(res) {}
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsImRhdGEiLCJncm91cExpc3QiLCJtZXRob2RzIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwidG9rZW4iLCJnZXRMaXN0IiwiZSIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsImFwcGx5IiwibGlzdCIsIiRhcHBseSIsImxvYWRpbmdPdXQiLCJoaWRlTG9hZGluZyIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJnZXRTaGFyZUluZm8iLCJzaGFyZVRpY2tldCIsImVuY3J5cHRlZERhdGEiLCJpdiIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwiY29kZSIsInRoZW4iLCJzdWNjIiwicmVkaXJlY3RfcGF0aCIsIm5hdmlnYXRlVG8iLCJmYWlsIiwiY29tcGxldGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFFMUI7QUFIUyxLLFFBSVZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxXQUEzQixFQUFiLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFoQixFQUEyRix5QkFBd0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0Is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LDRCQUFJQSxJQUFJc0IsSUFBUixFQUFjO0FBQ1osOEJBQUlDLGdCQUFnQnZCLElBQUlaLElBQUosQ0FBU21DLGFBQTdCO0FBQ0FoQyw2QkFBR2lDLFVBQUgsQ0FBYztBQUNaM0IsaUNBQUswQjtBQURPLDJCQUFkO0FBR0Q7QUFDRix1QkFoQkQ7QUFpQkQ7QUFDRjtBQTFCTSxpQkFBVDtBQTRCRCxlQWpDYTtBQWtDZEUsa0JBbENjLGtCQWtDUCxDQUFFLENBbENLO0FBbUNkQyxzQkFuQ2Msc0JBbUNILENBQUU7QUFuQ0MsYUFBaEI7QUFxQ0Q7QUFDRixTQTdDSTtBQThDTEQsY0FBTSxjQUFVekIsR0FBVixFQUFlLENBRXBCO0FBaERJLE9BQVA7QUFrREQ7Ozs7RUExR2dDLGVBQUsyQixJOztrQkFBbkJoRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9ncm91cEl0ZW0nXG5pbXBvcnQgc2hhcmVPckNyZWF0ZUdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvc2hhcmVPckNyZWF0ZUdyb3VwJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5rS75Yqo55u45YaMJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJncm91cExpc3RcIjp7XCJjb21cIjpcImdyb3VwSXRlbVwiLFwicHJvcHNcIjpcImdyb3VwSXRlbVwifX07XHJcbiRwcm9wcyA9IHtcImdyb3VwSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEluZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hhcmVPckNyZWF0ZUdyb3VwOiBzaGFyZU9yQ3JlYXRlR3JvdXAsXG4gICAgZ3JvdXBJdGVtOiBHcm91cEl0ZW1cbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBMaXN0OiBbXVxuICB9XG4gIG1ldGhvZHMgPSB7fVxuICBhc3luYyBvbkxvYWQoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAvLyDopoHmsYLlsI/nqIvluo/ov5Tlm57liIbkuqvnm67moIfkv6Hmga9cbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgIH0pXG4gICAgdmFyIHRva2VuID0gYXdhaXQgd3hDaGVja0xvZ2luKClcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gICAgfVxuICB9XG4gIG9uU2hvdyhlKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tZ2V0IGxpc3QtLS0tLS0nKVxuICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgIHRoaXMuZ3JvdXBMaXN0LnB1c2guYXBwbHkodGhpcy5ncm91cExpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflv6vmnaXkuIrkvKDlm77niYflkKd+JyxcbiAgICAgIHBhdGg6ICcvcGFnZS9zaGFyZS9kaXNwYXRjaGVyP2Zyb209aW5kZXgnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICB3eC5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldCxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gcmVzLmVuY3J5cHRlZERhdGEgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICAgIHZhciBpdiA9IHJlcy5pdiAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSByZXMuY29kZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSkgLy8g5L2/55So6L+Z5LiqIGNvZGUg5ZCR5b6u5L+h5o2i5Y+WIHNlc3Npb25fa2V5XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDE0KVxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5kZXgvZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdjogaXZcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDE1KVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWRpcmVjdF9wYXRoID0gcmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwoKSB7fSxcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge31cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=