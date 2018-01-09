'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

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
    }, _this.methods = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJtZXRob2RzIiwiYmluZFJlZ2lvbkNoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInByb3ZpbmNlIiwiY2l0eSIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dfcmVjIiwiZXhpdFF1biIsInF1aXRfZ3JvdXAiLCJpc19zaG93X3F1aXRfYnRuIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiY2RhdGEiLCJmbiIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJyZXMiLCJzdWNjIiwiZ3JvdXBfaWQiLCJtYXAiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsY0FBUSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksRUFBWixDQUhIO0FBSUxDLFlBQU0sS0FKRDtBQUtMQyxlQUFTLElBTEo7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxvQkFBYyxFQVBUO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxnQkFBVTtBQVRMLEssUUFXUEMsTyxHQUFVO0FBQ1JDLHNCQURRLDRCQUNTQyxDQURULEVBQ1k7QUFDbEIsYUFBS1QsTUFBTCxHQUFjUyxFQUFFQyxN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LE9BQUwsR0FBZWdDLElBQUlyQyxJQUFKLENBQVN5QyxNQUF4Qjs7QUFFQSxzQkFBSSxDQUFDSixJQUFJckMsSUFBSixDQUFTMEMsVUFBZCxFQUEwQjtBQUN4Qix5QkFBS2pDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELHVCQUFLTSxNQUFMO0FBQ0FrQiwwQkFBUUMsR0FBUixDQUFZLEtBQUs1QixRQUFqQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaEdnQyxlQUFLcUMsSTs7a0JBQXJCOUMsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJRDogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgICBjaGVja2VkOiB0cnVlLFxuICAgIHR5cGVMaXN0OiBbXSxcbiAgICB0eXBlX21hcHBpbmc6IFtdLFxuICAgIG5ld2RhdGE6IHt9LFxuICAgIGRpc2FibGVkOiBmYWxzZVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHByb3ZpbmNlOiB0aGlzLnJlZ2lvblswXSxcbiAgICAgICAgY2l0eTogdGhpcy5yZWdpb25bMV1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIGFsbG93X3JlYzogZS5kZXRhaWwudmFsdWUgPyAxIDogMFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHF1aXRfZ3JvdXA6IDFcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEsKCk9PntcbiAgICAgICAgdGhpcy5ncm91cEluZm8uaXNfc2hvd19xdWl0X2J0biA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMubG9hZEluZm8oKVxuICB9XG5cbiAgYXN5bmMgY2hhbmdlU2V0dGluZyhjZGF0YSxmbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIGNvbnNvbGUubG9nKGNkYXRhKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC91cGRhdGVzZXR0aW5nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGZuICYmIGZuKClcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvc2V0dGluZycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5yZWdpb24gPSBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldXG5cbiAgICAgIHRoaXMudHlwZSA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuZGF0YS50eXBlID09PSBpdGVtLmlkXG4gICAgICB9KVswXS50eXBlX25hbWVcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlX25hbWVcbiAgICAgIH0pXG4gICAgICB0aGlzLnR5cGVfbWFwcGluZyA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZ1xuXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIFxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVMaXN0KVxuICAgIH1cbiAgfVxufSJdfQ==