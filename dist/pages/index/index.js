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
                console.log(22122);
                wx.showShareMenu({
                  // 要求小程序返回分享目标信息
                  withShareTicket: true
                });

                _context.next = 4;
                return this.getList();

              case 4:
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
                console.log(123432);
                _context2.next = 3;
                return (0, _login.request)({
                  url: '/gg/index/grouplist',
                  data: {
                    cursor: 0
                  }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsImRhdGEiLCJncm91cExpc3QiLCJtZXRob2RzIiwiY29uc29sZSIsImxvZyIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsImdldExpc3QiLCJlIiwidXJsIiwiY3Vyc29yIiwicmVzIiwicHVzaCIsImFwcGx5IiwibGlzdCIsIiRhcHBseSIsImxvYWRpbmdPdXQiLCJoaWRlTG9hZGluZyIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJzaGFyZVRpY2tldHMiLCJ0aWNrZXQiLCJnZXRTaGFyZUluZm8iLCJzaGFyZVRpY2tldCIsImVuY3J5cHRlZERhdGEiLCJpdiIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwiY29kZSIsInRoZW4iLCJzdWNjIiwicmVkaXJlY3RfcGF0aCIsIm5hdmlnYXRlVG8iLCJmYWlsIiwiY29tcGxldGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDakJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFFMUI7QUFIUyxLLFFBSVZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxXQUEzQixFQUFiLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFoQixFQUEyRix5QkFBd0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixP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NkIsVUFBSCxDQUFjO0FBQ1p4QixpQ0FBS3VCO0FBRE8sMkJBQWQ7QUFHRDtBQUNKLHVCQWhCRDtBQWlCRDtBQUdGO0FBNUJNLGlCQUFUO0FBK0JELGVBcENhO0FBcUNkRSxrQkFyQ2Msa0JBcUNQLENBQUUsQ0FyQ0s7QUFzQ2RDLHNCQXRDYyxzQkFzQ0gsQ0FBRTtBQXRDQyxhQUFoQjtBQXdDRDtBQUNGLFNBakRJO0FBa0RMRCxjQUFNLGNBQVN2QixHQUFULEVBQWMsQ0FFbkI7QUFwREksT0FBUDtBQXNERDs7OztFQTVHOEIsZUFBS3lCLEk7O2tCQUFuQjlDLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7cmVxdWVzdH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvZ3JvdXBJdGVtJ1xuaW1wb3J0IHNoYXJlT3JDcmVhdGVHcm91cCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L3NoYXJlT3JDcmVhdGVHcm91cCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gICAgfVxuICAgIC8vIOe7hOS7tlxuICAgJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgICAgZ3JvdXBJdGVtOiBHcm91cEl0ZW1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgZ3JvdXBMaXN0OiBbXSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coMjIxMjIpXG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgICBvblNob3coZSkge1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgICB9XG5cbiAgICBhc3luYyBnZXRMaXN0KCkge1xuICAgICAgY29uc29sZS5sb2coMTIzNDMyKVxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGN1cnNvcjogMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgdGhpcy5ncm91cExpc3QucHVzaC5hcHBseSh0aGlzLmdyb3VwTGlzdCwgcmVzLmRhdGEubGlzdClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cExpc3QpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZGluZ091dCgpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICB9XG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ+W/q+adpeS4iuS8oOWbvueJh+WQp34nLFxuICAgICAgICBwYXRoOiAnL3BhZ2Uvc2hhcmUvZGlzcGF0Y2hlcj9mcm9tPWluZGV4JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgICAgdmFyIHRpY2tldCA9IHJlcy5zaGFyZVRpY2tldHNbMF1cbiAgICAgICAgICAgIHd4LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXQsXG4gICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuY3J5cHRlZERhdGEgPSByZXMuZW5jcnlwdGVkRGF0YTsgIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgICAgIHZhciBpdiA9IHJlcy5pdjsgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHJlcy5jb2RlXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpIC8vIOS9v+eUqOi/meS4qiBjb2RlIOWQkeW+ruS/oeaNouWPliBzZXNzaW9uX2tleVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDE0KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl2OiBpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDE1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLnN1Y2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVkaXJlY3RfcGF0aCA9IHJlcy5kYXRhLnJlZGlyZWN0X3BhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZmFpbCgpIHt9LFxuICAgICAgICAgICAgICBjb21wbGV0ZSgpIHt9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG59Il19