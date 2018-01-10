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
    }, _this.data = {
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
    }, _this.mixins = [_formSubmitMixin2.default], _this.methods = {
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
          content: '确认退出群空间？',
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
                this.disabled = true;
                console.log(cdata);
                _context.next = 4;
                return (0, _login.request)({
                  url: '/gg/group/updatesetting',
                  method: 'POST',
                  data: cdata
                });

              case 4:
                res = _context.sent;

                if (res.succ) {
                  this.disabled = false;
                  this.$apply();
                  fn && fn();
                }

              case 6:
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

                  this.type = res.data.type_name;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJpc19zaG93X3F1aXRfYnRuIiwibWVtYmVycyIsIm1peGlucyIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicHJvdmluY2UiLCJjaXR5IiwiZ3JvdXBJZCIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dSZWMiLCJleGl0UXVuIiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicXVpdEdyb3VwIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibWFzayIsImNhbmNlbCIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwibG9hZEluZm8iLCJoaWRlU2hhcmVNZW51IiwiY2RhdGEiLCJmbiIsInVybCIsIm1ldGhvZCIsInN1Y2MiLCJncm91cF9pZCIsImlzX3JlYyIsImNhbl9tb2RpZnkiLCJtYXAiLCJ0eXBlbGlzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsY0FBUSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksRUFBWixDQUhIO0FBSUxDLFlBQU0sS0FK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ZUFBS3lDLEk7O2tCQUFyQjlELE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJRDogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICB0eXBlTGlzdDogW10sXG4gICAgdHlwZV9tYXBwaW5nOiBbXSxcbiAgICBuZXdkYXRhOiB7fSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgaXNfc2hvd19xdWl0X2J0bjogZmFsc2UsXG4gICAgbWVtYmVyczogW11cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluXVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBwcm92aW5jZTogdGhpcy5yZWdpb25bMF0sXG4gICAgICAgIGNpdHk6IHRoaXMucmVnaW9uWzFdLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWQsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dSZWM6IGUuZGV0YWlsLnZhbHVlID8gMSA6IDAsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6ICfnoa7orqTpgIDlh7rnvqTnqbrpl7TvvJ8nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoYXQubmV3ZGF0YSA9IHtcbiAgICAgICAgICAgICAgcXVpdEdyb3VwOiAxLFxuICAgICAgICAgICAgICBncm91cElkOiB0aGF0Lmdyb3VwSURcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuY2hhbmdlU2V0dGluZyh0aGF0Lm5ld2RhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC5pc19zaG93X3F1aXRfYnRuID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6YCA5Ye65oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgd3guaGlkZVNoYXJlTWVudSgpXG4gIH1cblxuICBhc3luYyBjaGFuZ2VTZXR0aW5nKGNkYXRhLCBmbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgY29uc29sZS5sb2coY2RhdGEpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3VwZGF0ZXNldHRpbmcnLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiBjZGF0YVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGZuICYmIGZuKClcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvc2V0dGluZycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5pc19zaG93X3F1aXRfYnRuID0gcmVzLmRhdGEuaXNfc2hvd19xdWl0X2J0blxuICAgICAgdGhpcy5tZW1iZXJzID0gcmVzLmRhdGEubWVtYmVyc1xuICAgICAgdGhpcy5yZWdpb24gPSByZXMuZGF0YS5jaXR5ID8gW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5XSA6IHRoaXMucmVnaW9uXG5cbiAgICAgIHRoaXMuY2hlY2tlZCA9IHJlcy5kYXRhLmlzX3JlY1xuICAgICAgdGhpcy50eXBlX21hcHBpbmcgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcblxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgIHRoaXMudHlwZSA9IHJlcy5kYXRhLnR5cGVfbmFtZVxuICAgICAgdGhpcy50eXBlTGlzdCA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnR5cGVfbmFtZVxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZWxpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=