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

var _shareConnectMixin = require('./../../mixins/shareConnectMixin.js');

var _shareConnectMixin2 = _interopRequireDefault(_shareConnectMixin);

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
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default, _shareConnectMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
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
                _context.next = 8;
                return this.getShareFromOther(true);

              case 8:
                _context.next = 10;
                return this.getList();

              case 10:
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
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
      Object.assign(this, pageData);
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
                  this.groupList = [].concat(_toConsumableArray(this.groupList), _toConsumableArray(res.data.list));
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
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '一起来加入本群相册吧！',
        path: '/pages/index/index?from=index',
        imageUrl: 'https://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.shareCallBack(res)
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cExpc3QiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzaGFyZU9yQ3JlYXRlR3JvdXAiLCJncm91cEl0ZW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInNldFNoYXJlIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInVybCIsImN1cnNvciIsImlzQ2hlY2siLCJyZXMiLCJsaXN0IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwic2hhcmVDYWxsQmFjayIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLFdBQVc7QUFDYkMsWUFBVSxPQURHO0FBRWJDLGFBQVc7QUFGRSxDQUFmOztJQUlxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRTFCO0FBSFMsSyxRQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxXQUFwQyxFQUFnRCxRQUFPLE1BQXZELEVBQThELFNBQVEsT0FBdEUsRUFBOEUsT0FBTSxPQUFwRixFQUFuSCxFQUFnTiwwQkFBeUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxPQUF4QixFQUFnQyxPQUFNLFdBQXRDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLE9BQXRGLEVBQXpPLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsc0RBRFU7QUFFVkM7QUFGVSxLLFFBSVpDLE0sR0FBUyxnRixRQUVUQyxJLEdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCZixRQUFsQixDLFFBQ1BnQixPLEdBQVUsRTs7Ozs7Ozs7Ozs7QUFFUkYsdUJBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CZixRQUFwQjtBQUNBLHFCQUFLaUIsUUFBTDs7O3VCQUVRLHFCOzs7QUFDTixxQkFBS0MsU0FBTCxDQUFlLEtBQWY7O3VCQUNNLEtBQUtDLGlCQUFMLENBQXVCLElBQXZCLEM7Ozs7dUJBQ0EsS0FBS0MsT0FBTCxFOzs7Ozs7Ozs7O0FBRU4scUJBQUtDLFVBQUw7QUFDQSxxQkFBS0MsU0FBTCxDQUFlLE1BQWY7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHTztBQUNUQyxTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQixJQURGLENBQ087QUFEUCxPQUFqQjtBQUdEOzs7K0JBQ1U7QUFDVFgsYUFBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JmLFFBQXBCO0FBQ0EsV0FBS29CLE9BQUw7QUFDRDs7Ozs7Ozs7Ozs7dUJBRWlCLG9CQUFRO0FBQ3RCTSx1QkFBSyxxQkFEaUI7QUFFdEJiLHdCQUFNO0FBQ0pjLDRCQUFRO0FBREosbUJBRmdCO0FBS3RCQywyQkFBUztBQUxhLGlCQUFSLEM7OztBQUFaQyxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSWhCLElBQWYsRUFBcUI7QUFDbkIsdUJBQUtYLFNBQUwsZ0NBQ0ssS0FBS0EsU0FEVixzQkFFSzJCLElBQUloQixJQUFKLENBQVNpQixJQUZkO0FBSUFDLDBCQUFRQyxHQUFSLENBQVksS0FBSzlCLFNBQWpCO0FBQ0EsdUJBQUsrQixNQUFMO0FBQ0EsdUJBQUtaLFVBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUVVO0FBQ1hFLFNBQUdXLFdBQUg7QUFDRDs7O3NDQUVpQkwsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTE0sZUFBTyxhQURGO0FBRUxDLGNBQU0sK0JBRkQ7QUFHTEMsa0JBQVUsb0ZBSEw7QUFJTEMsaUJBQVMsS0FBS0MsYUFBTCxDQUFtQlYsR0FBbkI7QUFKSixPQUFQO0FBTUQ7Ozs7RUFuRWdDLGVBQUtXLEk7O2tCQUFuQnJDLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9ncm91cEl0ZW0nXG5pbXBvcnQgc2hhcmVPckNyZWF0ZUdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvc2hhcmVPckNyZWF0ZUdyb3VwJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBzaGFyZUNvbm5lY3RNaXhpbiBmcm9tICdAL21peGlucy9zaGFyZUNvbm5lY3RNaXhpbidcbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdpbmRleCcsXG4gIGdyb3VwTGlzdDogW11cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTlj4vlhbHkuqvnm7jlhownXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcImdyb3VwTGlzdFwiOntcImNvbVwiOlwiZ3JvdXBJdGVtXCIsXCJwcm9wc1wiOlwiZ3JvdXBJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiZ3JvdXBJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpncm91cEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdyb3VwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdyb3VwSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaGFyZU9yQ3JlYXRlR3JvdXA6IHNoYXJlT3JDcmVhdGVHcm91cCxcbiAgICBncm91cEl0ZW06IEdyb3VwSXRlbVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge31cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5zZXRTaGFyZSgpXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUpXG4gICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgc2V0U2hhcmUoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgfSlcbiAgfVxuICBpbml0UGFnZSgpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gIH1cbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvaW5kZXgvZ3JvdXBsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9LFxuICAgICAgaXNDaGVjazogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cExpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMuZ3JvdXBMaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwTGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG5cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5LiA6LW35p2l5Yqg5YWl5pys576k55u45YaM5ZCn77yBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgvaW5kZXg/ZnJvbT1pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHBzOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHJlcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==