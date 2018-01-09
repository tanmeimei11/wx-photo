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
      disabled: false,
      showbtn: true,
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
              console.log('用户点击确定');
              that.newdata = {
                quitGroup: 1,
                groupId: that.groupID
              };
              that.changeSetting(that.newdata, function () {
                that.showbtn = false;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWVtYmVycyIsIm1peGlucyIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicHJvdmluY2UiLCJjaXR5IiwiZ3JvdXBJZCIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dSZWMiLCJleGl0UXVuIiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJjYW5jZWwiLCJvcHRpb25zIiwibG9hZEluZm8iLCJjZGF0YSIsImZuIiwidXJsIiwibWV0aG9kIiwic3VjYyIsImdyb3VwX2lkIiwiaXNfcmVjIiwiY2FuX21vZGlmeSIsIm1hcCIsInR5cGVsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxjQUFRLENBQUMsRUFBRCxFQUFLLEtBQUwsRUFBWSxFQUFaLENBSEg7QUFJTEMsWUFBTSxLQUpEO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxn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eSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSUQ6ICcnLFxuICAgIGdyb3VwSW5mbzoge30sXG4gICAgcmVnaW9uOiBbJycsICfmnKrloavlhpknLCAnJ10sXG4gICAgdHlwZTogJ+acquWhq+WGmScsXG4gICAgY2hlY2tlZDogdHJ1ZSxcbiAgICB0eXBlTGlzdDogW10sXG4gICAgdHlwZV9tYXBwaW5nOiBbXSxcbiAgICBuZXdkYXRhOiB7fSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd2J0bjogdHJ1ZSxcbiAgICBtZW1iZXJzOiBbXVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHByb3ZpbmNlOiB0aGlzLnJlZ2lvblswXSxcbiAgICAgICAgY2l0eTogdGhpcy5yZWdpb25bMV0sXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRUeXBlQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMudHlwZSA9IHRoaXMudHlwZUxpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZV9tYXBwaW5nLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSBpdGVtLnR5cGVfbmFtZVxuICAgICAgICB9KVswXS5pZCxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgYmluZE9wZW5DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBhbGxvd1JlYzogZS5kZXRhaWwudmFsdWUgPyAxIDogMCxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgZXhpdFF1bigpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgY29udGVudDogJ+ehruiupOmAgOWHuue+pOepuumXtO+8nycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXG4gICAgICAgICAgICB0aGF0Lm5ld2RhdGEgPSB7XG4gICAgICAgICAgICAgIHF1aXRHcm91cDogMSxcbiAgICAgICAgICAgICAgZ3JvdXBJZDogdGhhdC5ncm91cElEXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LmNoYW5nZVNldHRpbmcodGhhdC5uZXdkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoYXQuc2hvd2J0biA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+mAgOWHuuaIkOWKnycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMubG9hZEluZm8oKVxuICB9XG5cbiAgYXN5bmMgY2hhbmdlU2V0dGluZyhjZGF0YSwgZm4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgIGNvbnNvbGUubG9nKGNkYXRhKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC91cGRhdGVzZXR0aW5nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBmbiAmJiBmbigpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubWVtYmVycyA9IHJlcy5kYXRhLm1lbWJlcnNcbiAgICAgIHRoaXMucmVnaW9uID0gcmVzLmRhdGEuY2l0eSA/IFtyZXMuZGF0YS5wcm92aW5jZSwgcmVzLmRhdGEuY2l0eV0gOiB0aGlzLnJlZ2lvblxuXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIHRoaXMudHlwZV9tYXBwaW5nID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nXG5cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX25hbWVcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlX25hbWVcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVsaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19