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
                _context.next = 5;
                return this.getList();

              case 5:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsImRhdGEiLCJncm91cExpc3QiLCJtZXRob2RzIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwiZ2V0TGlzdCIsImUiLCJ1cmwiLCJjdXJzb3IiLCJpc0NoZWNrIiwicmVzIiwiY29uc29sZSIsImxvZyIsInB1c2giLCJhcHBseSIsImxpc3QiLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwiaGlkZUxvYWRpbmciLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwiZ2V0U2hhcmVJbmZvIiwic2hhcmVUaWNrZXQiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJsb2dpbiIsIndpdGhDcmVkZW50aWFscyIsImNvZGUiLCJ0aGVuIiwic3VjYyIsInJlZGlyZWN0X3BhdGgiLCJuYXZpZ2F0ZVRvIiwiZmFpbCIsImNvbXBsZXRlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRTFCO0FBSFMsSyxRQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFB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SUMsZ0JBQWdCdkIsSUFBSVgsSUFBSixDQUFTa0MsYUFBN0I7QUFDQS9CLDZCQUFHZ0MsVUFBSCxDQUFjO0FBQ1ozQixpQ0FBSzBCO0FBRE8sMkJBQWQ7QUFHRDtBQUNGLHVCQWhCRDtBQWlCRDtBQUNGO0FBMUJNLGlCQUFUO0FBNEJELGVBakNhO0FBa0NkRSxrQkFsQ2Msa0JBa0NQLENBQUUsQ0FsQ0s7QUFtQ2RDLHNCQW5DYyxzQkFtQ0gsQ0FBRTtBQW5DQyxhQUFoQjtBQXFDRDtBQUNGLFNBN0NJO0FBOENMRCxjQUFNLGNBQVV6QixHQUFWLEVBQWUsQ0FFcEI7QUFoREksT0FBUDtBQWtERDs7OztFQXhHZ0MsZUFBSzJCLEk7O2tCQUFuQi9DLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IEdyb3VwSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L2dyb3VwSXRlbSdcbmltcG9ydCBzaGFyZU9yQ3JlYXRlR3JvdXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9zaGFyZU9yQ3JlYXRlR3JvdXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBncm91cExpc3Q6IFtdXG4gIH1cbiAgbWV0aG9kcyA9IHt9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgICBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbiAgb25TaG93KGUpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9pbmRleC9ncm91cGxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH0sXG4gICAgICBpc0NoZWNrOiB0cnVlXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS1nZXQgbGlzdC0tLS0tLScpXG4gICAgY29uc29sZS5sb2cocmVzKVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAgICAgdGhpcy5ncm91cExpc3QucHVzaC5hcHBseSh0aGlzLmdyb3VwTGlzdCwgcmVzLmRhdGEubGlzdClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBMaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgbG9hZGluZ091dCgpIHtcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgY29uc29sZS5sb2cocmVzKVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W/q+adpeS4iuS8oOWbvueJh+WQp34nLFxuICAgICAgcGF0aDogJy9wYWdlL3NoYXJlL2Rpc3BhdGNoZXI/ZnJvbT1pbmRleCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5zaGFyZVRpY2tldHMpIHtcbiAgICAgICAgICB2YXIgdGlja2V0ID0gcmVzLnNoYXJlVGlja2V0c1swXVxuICAgICAgICAgIHd4LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICBzaGFyZVRpY2tldDogdGlja2V0LFxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgdmFyIGVuY3J5cHRlZERhdGEgPSByZXMuZW5jcnlwdGVkRGF0YSAvLyAg6Kej5a+G5ZCO5Li65LiA5LiqIEpTT04g57uT5p6E77yIb3BlbkdJZCAgICDnvqTlr7nlvZPliY3lsI/nqIvluo/nmoTllK/kuIAgSUTvvIlcbiAgICAgICAgICAgICAgdmFyIGl2ID0gcmVzLml2IC8vIOWKoOWvhueul+azleeahOWIneWni+WQkemHj1xuICAgICAgICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHJlcy5jb2RlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKSAvLyDkvb/nlKjov5nkuKogY29kZSDlkJHlvq7kv6HmjaLlj5Ygc2Vzc2lvbl9rZXlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMTQpXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl2OiBpdlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMTUpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZGlyZWN0X3BhdGggPSByZXMuZGF0YS5yZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiByZWRpcmVjdF9wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbCgpIHt9LFxuICAgICAgICAgICAgY29tcGxldGUoKSB7fVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==