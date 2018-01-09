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
      checked: true,
      typeList: [],
      type_mapping: [],
      newdata: {},
      disabled: false
    }, _this.mixins = [_formSubmitMixin2.default], _this.methods = {
      bindRegionChange: function bindRegionChange(e) {
        this.region = e.detail.value;
        this.$apply();
        this.newdata = {
          province: this.region[0],
          city: this.region[1]
        };
        this.changeSetting(this.newdata);
      },
      bindTypeChange: function bindTypeChange(e) {
        var _this2 = this;

        this.type = this.typeList[e.detail.value];
        this.newdata = {
          type: this.type_mapping.filter(function (item) {
            return _this2.type === item.type_name;
          })[0].id
        };
        this.changeSetting(this.newdata);
      },
      bindOpenChange: function bindOpenChange(e) {
        this.newdata = {
          allow_rec: e.detail.value ? 1 : 0
        };
        this.changeSetting(this.newdata);
      },
      exitQun: function exitQun() {
        var _this3 = this;

        this.newdata = {
          quit_group: 1
        };
        this.changeSetting(this.newdata, function () {
          _this3.groupInfo.is_show_quit_btn = false;
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            mask: true
          });
          _this3.$apply();
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(setting, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.groupID = options.id;
      this.loadInfo();
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
                this.disabled = false;
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
                  this.disabled = true;
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
                  this.region = [res.data.province, res.data.city];

                  this.type = res.data.type_mapping.filter(function (item) {
                    return res.data.type === item.id;
                  })[0].type_name;
                  this.typeList = res.data.type_mapping.map(function (item) {
                    return item.type_name;
                  });
                  this.type_mapping = res.data.type_mapping;

                  this.checked = res.data.is_rec;

                  if (!res.data.can_modify) {
                    this.disabled = true;
                  }
                  this.$apply();
                  console.log(this.typeList);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJtaXhpbnMiLCJtZXRob2RzIiwiYmluZFJlZ2lvbkNoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInByb3ZpbmNlIiwiY2l0eSIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dfcmVjIiwiZXhpdFF1biIsInF1aXRfZ3JvdXAiLCJpc19zaG93X3F1aXRfYnRuIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiY2RhdGEiLCJmbiIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJyZXMiLCJzdWNjIiwiZ3JvdXBfaWQiLCJtYXAiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxjQUFRLENBQUMsRUFBRCxFQUFLLEtBQUwsRUFBWSxFQUFaLENBSEg7QUFJTEMsWUFBTSxLQUpEO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLG9CQUFjLEVBUFQ7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGdCQUFVO0FBVEwsSyxRQVdQQyxNLEdBQVMsMkIs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LElBQUkzQyxJQUFKLENBQVNPLFlBQVQsQ0FBc0J1QyxHQUF0QixDQUEwQixnQkFBUTtBQUNoRCwyQkFBT3hCLEtBQUtDLFNBQVo7QUFDRCxtQkFGZSxDQUFoQjtBQUdBLHVCQUFLaEIsWUFBTCxHQUFvQm9DLElBQUkzQyxJQUFKLENBQVNPLFlBQTdCOztBQUVBLHVCQUFLRixPQUFMLEdBQWVzQyxJQUFJM0MsSUFBSixDQUFTK0MsTUFBeEI7O0FBRUEsc0JBQUksQ0FBQ0osSUFBSTNDLElBQUosQ0FBU2dELFVBQWQsRUFBMEI7QUFDeEIseUJBQUt2QyxRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRCx1QkFBS08sTUFBTDtBQUNBdUIsMEJBQVFDLEdBQVIsQ0FBWSxLQUFLbEMsUUFBakI7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRHZ0MsZUFBSzJDLEk7O2tCQUFyQnBELE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJRDogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgICBjaGVja2VkOiB0cnVlLFxuICAgIHR5cGVMaXN0OiBbXSxcbiAgICB0eXBlX21hcHBpbmc6IFtdLFxuICAgIG5ld2RhdGE6IHt9LFxuICAgIGRpc2FibGVkOiBmYWxzZVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHByb3ZpbmNlOiB0aGlzLnJlZ2lvblswXSxcbiAgICAgICAgY2l0eTogdGhpcy5yZWdpb25bMV1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIGFsbG93X3JlYzogZS5kZXRhaWwudmFsdWUgPyAxIDogMFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHF1aXRfZ3JvdXA6IDFcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEsICgpID0+IHtcbiAgICAgICAgdGhpcy5ncm91cEluZm8uaXNfc2hvd19xdWl0X2J0biA9IGZhbHNlXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMubG9hZEluZm8oKVxuICB9XG5cbiAgYXN5bmMgY2hhbmdlU2V0dGluZyhjZGF0YSwgZm4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICBjb25zb2xlLmxvZyhjZGF0YSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvdXBkYXRlc2V0dGluZycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGNkYXRhXG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICBmbiAmJiBmbigpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMucmVnaW9uID0gW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5XVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEudHlwZSA9PT0gaXRlbS5pZFxuICAgICAgfSlbMF0udHlwZV9uYW1lXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZV9uYW1lXG4gICAgICB9KVxuICAgICAgdGhpcy50eXBlX21hcHBpbmcgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG5cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy50eXBlTGlzdClcbiAgICB9XG4gIH1cbn1cbiJdfQ==