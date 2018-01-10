'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _formSubmitMixin = require('./../../mixins/formSubmitMixin.js');

var _formSubmitMixin2 = _interopRequireDefault(_formSubmitMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  groupID: '',
  groupInfo: {},
  region: ['', '未填写', ''],
  type: '未填写',
  checked: false,
  typeList: [],
  type_mapping: [],
  newdata: {},
  disabled: false,
  is_show_quit_btn: false,
  members: []
};

var setting = function (_wepy$page) {
  _inherits(setting, _wepy$page);

  function setting() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, setting);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = setting.__proto__ || Object.getPrototypeOf(setting)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '设置'
    }, _this.data = Object.assign({}, pageData), _this.mixins = [_formSubmitMixin2.default], _this.methods = {
      bindRegionChange: function bindRegionChange(e) {
        this.region = e.detail.value;
        this.$apply();
        this.newdata = {
          province: this.region[0],
          city: this.region[1],
          groupId: this.groupID
        };
        this.changeSetting(this.newdata);
      },
      bindTypeChange: function bindTypeChange(e) {
        var _this2 = this;

        this.type = this.typeList[e.detail.value];
        this.newdata = {
          type: this.type_mapping.filter(function (item) {
            return _this2.type === item.type_name;
          })[0].id,
          groupId: this.groupID
        };
        this.changeSetting(this.newdata);
      },
      bindOpenChange: function bindOpenChange(e) {
        this.newdata = {
          allowRec: e.detail.value ? 1 : 0,
          groupId: this.groupID
        };
        this.changeSetting(this.newdata);
      },
      exitQun: function exitQun() {
        var that = this;
        wx.showModal({
          title: '你确定退出吗',
          content: '退出后将无法再查看相册中的照片',
          success: function success(res) {
            if (res.confirm) {
              that.newdata = {
                quitGroup: 1,
                groupId: that.groupID
              };
              that.changeSetting(that.newdata, function () {
                that.is_show_quit_btn = false;
                that.$apply();
                wx.showToast({
                  title: '退出成功',
                  icon: 'success',
                  mask: true
                });
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(setting, [{
    key: 'onLoad',
    value: function onLoad(options) {
      Object.assign(this, pageData);
      this.groupID = options.id;
      this.loadInfo();
      wx.hideShareMenu();
    }
  }, {
    key: 'changeSetting',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cdata, fn) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(cdata);
                _context.next = 3;
                return (0, _login.request)({
                  url: '/gg/group/updatesetting',
                  method: 'POST',
                  data: cdata
                });

              case 3:
                res = _context.sent;

                if (res.succ) {
                  fn && fn();
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function changeSetting(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return changeSetting;
    }()
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/setting',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context2.sent;

                if (res.succ) {
                  this.groupInfo = res.data;
                  this.is_show_quit_btn = res.data.is_show_quit_btn;
                  this.members = res.data.members;
                  this.region = res.data.city ? [res.data.province, res.data.city] : this.region;

                  this.checked = res.data.is_rec;
                  this.type_mapping = res.data.type_mapping;

                  if (!res.data.can_modify) {
                    this.disabled = true;
                  }
                  this.$apply();

                  this.type = res.data.type_name ? res.data.type_name : '未填写';
                  this.typeList = res.data.type_mapping.map(function (item) {
                    return item.type_name;
                  });
                  console.log(this.typelist);
                  this.$apply();
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadInfo() {
        return _ref3.apply(this, arguments);
      }

      return loadInfo;
    }()
  }]);

  return setting;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(setting , 'pages/setting/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJncm91cElEIiwiZ3JvdXBJbmZvIiwicmVnaW9uIiwidHlwZSIsImNoZWNrZWQiLCJ0eXBlTGlzdCIsInR5cGVfbWFwcGluZyIsIm5ld2RhdGEiLCJkaXNhYmxlZCIsImlzX3Nob3dfcXVpdF9idG4iLCJtZW1iZXJzIiwic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWl4aW5zIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJncm91cElkIiwiY2hhbmdlU2V0dGluZyIsImJpbmRUeXBlQ2hhbmdlIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlkIiwiYmluZE9wZW5DaGFuZ2UiLCJhbGxvd1JlYyIsImV4aXRRdW4iLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsIm9wdGlvbnMiLCJsb2FkSW5mbyIsImhpZGVTaGFyZU1lbnUiLCJjZGF0YSIsImZuIiwidXJsIiwibWV0aG9kIiwic3VjYyIsImdyb3VwX2lkIiwiaXNfcmVjIiwiY2FuX21vZGlmeSIsIm1hcCIsInR5cGVsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFXO0FBQ2JDLFdBQVMsRUFESTtBQUViQyxhQUFXLEVBRkU7QUFHYkMsVUFBUSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksRUFBWixDQUhLO0FBSWJDLFFBQU0sS0FKTztBQUtiQyxXQUFTLEtBTEk7QUFNYkMsWUFB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aEMsS0FBS0MsU0FBWjtBQUNELG1CQUZlLENBQWhCO0FBR0FrQiwwQkFBUUMsR0FBUixDQUFZLEtBQUthLFFBQWpCO0FBQ0EsdUJBQUt4QyxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1R2dDLGVBQUt5QyxJOztrQkFBckJyRCxPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIGdyb3VwSUQ6ICcnLFxuICBncm91cEluZm86IHt9LFxuICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgdHlwZTogJ+acquWhq+WGmScsXG4gIGNoZWNrZWQ6IGZhbHNlLFxuICB0eXBlTGlzdDogW10sXG4gIHR5cGVfbWFwcGluZzogW10sXG4gIG5ld2RhdGE6IHt9LFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIGlzX3Nob3dfcXVpdF9idG46IGZhbHNlLFxuICBtZW1iZXJzOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuXG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHByb3ZpbmNlOiB0aGlzLnJlZ2lvblswXSxcbiAgICAgICAgY2l0eTogdGhpcy5yZWdpb25bMV0sXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRUeXBlQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMudHlwZSA9IHRoaXMudHlwZUxpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZV9tYXBwaW5nLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSBpdGVtLnR5cGVfbmFtZVxuICAgICAgICB9KVswXS5pZCxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgYmluZE9wZW5DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBhbGxvd1JlYzogZS5kZXRhaWwudmFsdWUgPyAxIDogMCxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgZXhpdFF1bigpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfkvaDnoa7lrprpgIDlh7rlkJcnLFxuICAgICAgICBjb250ZW50OiAn6YCA5Ye65ZCO5bCG5peg5rOV5YaN5p+l55yL55u45YaM5Lit55qE54Wn54mHJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB0aGF0Lm5ld2RhdGEgPSB7XG4gICAgICAgICAgICAgIHF1aXRHcm91cDogMSxcbiAgICAgICAgICAgICAgZ3JvdXBJZDogdGhhdC5ncm91cElEXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LmNoYW5nZVNldHRpbmcodGhhdC5uZXdkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoYXQuaXNfc2hvd19xdWl0X2J0biA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+mAgOWHuuaIkOWKnycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgd3guaGlkZVNoYXJlTWVudSgpXG4gIH1cblxuICBhc3luYyBjaGFuZ2VTZXR0aW5nKGNkYXRhLCBmbikge1xuICAgIGNvbnNvbGUubG9nKGNkYXRhKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC91cGRhdGVzZXR0aW5nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgZm4gJiYgZm4oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9zZXR0aW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmlzX3Nob3dfcXVpdF9idG4gPSByZXMuZGF0YS5pc19zaG93X3F1aXRfYnRuXG4gICAgICB0aGlzLm1lbWJlcnMgPSByZXMuZGF0YS5tZW1iZXJzXG4gICAgICB0aGlzLnJlZ2lvbiA9IHJlcy5kYXRhLmNpdHkgPyBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldIDogdGhpcy5yZWdpb25cblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICB0aGlzLnR5cGVfbWFwcGluZyA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZ1xuXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnkpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcblxuICAgICAgdGhpcy50eXBlID0gcmVzLmRhdGEudHlwZV9uYW1lID8gcmVzLmRhdGEudHlwZV9uYW1lIDogJ+acquWhq+WGmSdcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlX25hbWVcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVsaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19