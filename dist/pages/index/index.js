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

                if (res && res.data) {
                  console.log(res.data);
                  this.groupList.push.apply(this.groupList, res.data.list);
                  console.log(this.groupList);
                  this.$apply();
                  this.loadingOut();
                }

              case 4:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNoYXJlT3JDcmVhdGVHcm91cCIsImdyb3VwSXRlbSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwTGlzdCIsIm1ldGhvZHMiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2tlbiIsImdldExpc3QiLCJlIiwidXJsIiwiY3Vyc29yIiwiaXNDaGVjayIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwiYXBwbHkiLCJsaXN0IiwiJGFwcGx5IiwibG9hZGluZ091dCIsImhpZGVMb2FkaW5nIiwic2hhcmVUaWNrZXRzIiwidGlja2V0IiwibG9naW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJsb2dpblJlcyIsImdldFNoYXJlSW5mbyIsInNoYXJlVGlja2V0Iiwic2hhcmVJbmZvUmVzIiwiY29kZSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIl9kYXRhIiwiZGlzcGF0Y2hlclJlcyIsInN1Y2MiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RfcGF0aCIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJTaGFyZUNhbGxCYWNrIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFFMUI7QUFIUyxLLFFBSVZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxXQUEzQixFQUFiLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFoQixFQUEyRix5QkFBd0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLFdBQXBDLEVBQWdELFFBQU8sTUFBdkQsRUFBOEQsU0FBUSxPQUF0RSxFQUE4RSxPQUFNLE9BQXBGLEVBQW5ILEVBQWdOLDBCQUF5QixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE9BQXhCLEVBQWdDLE9BQU0sV0FBdEMsRUFBa0QsUUFBTyxNQUF6RCxFQUFnRSxTQUFRLE9BQXhFLEVBQWdGLE9BQU0sT0FBdEYsRUFBek8sRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxzREFEVTtBQUVWQztBQUZVLEssUUFJWkMsTSxHQUFTLDJCLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxPQURMO0FBRUxDLGlCQUFXO0FBRk4sSyxRQUlQQyxPLEdBQVUsRTs7Ozs7Ozs7Ozs7O0FBRVJDLG1CQUFHQyxhQUFILENBQWlCO0FBQ2Y7QUFDQUMsbUNBQWlCO0FBRkYsaUJBQWpCOzt1QkFJa0IsMEI7OztBQUFkQyxxQjs7cUJBQ0FBLEs7Ozs7Ozt1QkFDSSxLQUFLQyxPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFHSEMsQyxFQUFHO0FBQ1JMLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7Ozs7Ozs7Ozs7dUJBR2lCLG9CQUFRO0FBQ3RCSSx1QkFBSyxxQkFEaUI7QUFFdEJWLHdCQUFNO0FBQ0pXLDRCQUFRO0FBREosbUJBRmdCO0FBS3RCQywyQkFBUztBQUxhLGlCQUFSLEM7OztBQUFaQyxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSWIsSUFBZixFQUFxQjtBQUNuQmMsMEJBQVFDLEdBQVIsQ0FBWUYsSUFBSWIsSUFBaEI7QUFDQSx1QkFBS0UsU0FBTCxDQUFlYyxJQUFmLENBQW9CQyxLQUFwQixDQUEwQixLQUFLZixTQUEvQixFQUEwQ1csSUFBSWIsSUFBSixDQUFTa0IsSUFBbkQ7QUFDQUosMEJBQVFDLEdBQVIsQ0FBWSxLQUFLYixTQUFqQjtBQUNBLHVCQUFLaUIsTUFBTDtBQUNBLHVCQUFLQyxVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FFVTtBQUNYaEIsU0FBR2lCLFdBQUg7QUFDRDs7O2tDQUNhUixHLEVBQUs7QUFBQTs7QUFDakJDLGNBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0E7QUFBQSw0RUFBTyxrQkFBTUYsR0FBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0xDLDBCQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQkYsR0FBMUI7O0FBREssdUJBRURBLElBQUlTLFlBRkg7QUFBQTtBQUFBO0FBQUE7O0FBR0NDLHdCQUhELEdBR1VWLElBQUlTLFlBQUosQ0FBaUIsQ0FBakIsQ0FIVjtBQUFBO0FBQUEseUJBSWtCLGVBQUtFLEtBQUwsQ0FBVztBQUM5QkMscUNBQWlCO0FBRGEsbUJBQVgsQ0FKbEI7O0FBQUE7QUFJQ0MsMEJBSkQ7QUFBQTtBQUFBLHlCQU9zQixlQUFLQyxZQUFMLENBQWtCO0FBQ3pDQyxpQ0FBYUw7QUFENEIsbUJBQWxCLENBUHRCOztBQUFBO0FBT0NNLDhCQVBEOztBQUFBLHdCQVVDSCxTQUFTSSxJQUFULElBQWlCRCxhQUFhRSxhQUE5QixJQUErQ0YsYUFBYUcsRUFWN0Q7QUFBQTtBQUFBO0FBQUE7O0FBV0dDLHVCQVhILEdBV1c7QUFDVkYsbUNBQWVGLGFBQWFFLGFBRGxCLEVBQ2lDO0FBQzNDQyx3QkFBSUgsYUFBYUcsRUFGUCxFQUVXO0FBQ3JCRiwwQkFBTUosU0FBU0k7QUFITCxtQkFYWDtBQUFBO0FBQUEseUJBaUJ5QixvQkFBUTtBQUNoQ3BCLHlCQUFLLDRCQUQyQjtBQUVoQ1YsMEJBQU1pQztBQUYwQixtQkFBUixDQWpCekI7O0FBQUE7QUFpQkdDLCtCQWpCSDs7O0FBc0JEcEIsMEJBQVFDLEdBQVIsQ0FBWW1CLGFBQVo7QUFDQSxzQkFBSUEsaUJBQWlCQSxjQUFjQyxJQUFuQyxFQUF5QztBQUN2Qy9CLHVCQUFHZ0MsVUFBSCxDQUFjO0FBQ1oxQiwyQkFBS3dCLGNBQWNsQyxJQUFkLENBQW1CcUM7QUFEWixxQkFBZDtBQUdEOztBQTNCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0JEOzs7c0NBQ2lCeEIsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTHlCLGVBQU8sVUFERjtBQUVMQyxjQUFNLG1DQUZEO0FBR0xDLGlCQUFTLEtBQUtDLGFBQUwsQ0FBbUI1QixHQUFuQjtBQUhKLE9BQVA7QUFLRDs7OztFQTlGZ0MsZUFBSzZCLEk7O2tCQUFuQnBELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IEdyb3VwSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L2dyb3VwSXRlbSdcbmltcG9ydCBzaGFyZU9yQ3JlYXRlR3JvdXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9zaGFyZU9yQ3JlYXRlR3JvdXAnXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cEl0ZW1cIixcInByb3BzXCI6XCJncm91cEl0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJncm91cEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6Z3JvdXBJbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHNoYXJlT3JDcmVhdGVHcm91cDogc2hhcmVPckNyZWF0ZUdyb3VwLFxuICAgIGdyb3VwSXRlbTogR3JvdXBJdGVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbl1cblxuICBkYXRhID0ge1xuICAgIHBhZ2VOYW1lOiAnaW5kZXgnLFxuICAgIGdyb3VwTGlzdDogW11cbiAgfVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICB9KVxuICAgIHZhciB0b2tlbiA9IGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH1cbiAgfVxuICBvblNob3coZSkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2luZGV4L2dyb3VwbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfSxcbiAgICAgIGlzQ2hlY2s6IHRydWVcbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAgICAgdGhpcy5ncm91cExpc3QucHVzaC5hcHBseSh0aGlzLmdyb3VwTGlzdCwgcmVzLmRhdGEubGlzdClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBMaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgbG9hZGluZ091dCgpIHtcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH1cbiAgU2hhcmVDYWxsQmFjayhyZXMpIHtcbiAgICBjb25zb2xlLmxvZygnMTExJylcbiAgICByZXR1cm4gYXN5bmMocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2hhcmUgc3VjYycsIHJlcylcbiAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgIHZhciBsb2dpblJlcyA9IGF3YWl0IHdlcHkubG9naW4oe1xuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB2YXIgc2hhcmVJbmZvUmVzID0gYXdhaXQgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICAgIHNoYXJlVGlja2V0OiB0aWNrZXRcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUgJiYgc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEgJiYgc2hhcmVJbmZvUmVzLml2KSB7XG4gICAgICAgICAgdmFyIF9kYXRhID0ge1xuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVJbmZvUmVzLmVuY3J5cHRlZERhdGEsIC8vICDop6Plr4blkI7kuLrkuIDkuKogSlNPTiDnu5PmnoTvvIhvcGVuR0lkICAgIOe+pOWvueW9k+WJjeWwj+eoi+W6j+eahOWUr+S4gCBJRO+8iVxuICAgICAgICAgICAgaXY6IHNoYXJlSW5mb1Jlcy5pdiwgLy8g5Yqg5a+G566X5rOV55qE5Yid5aeL5ZCR6YePXG4gICAgICAgICAgICBjb2RlOiBsb2dpblJlcy5jb2RlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRpc3BhdGNoZXJSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmRleC9kaXNwYXRjaGVyJyxcbiAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGNvbnNvbGUubG9nKGRpc3BhdGNoZXJSZXMpXG4gICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b+r5p2l5LiK5Lyg5Zu+54mH5ZCnficsXG4gICAgICBwYXRoOiAnL3BhZ2Uvc2hhcmUvZGlzcGF0Y2hlcj9mcm9tPWluZGV4JyxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuU2hhcmVDYWxsQmFjayhyZXMpXG4gICAgfVxuICB9XG59XG4iXX0=