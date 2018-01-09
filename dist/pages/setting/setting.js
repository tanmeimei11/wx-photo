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
      disabled: false,
      showbtn: true
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
          _this3.showbtn = false;
          _this3.$apply();
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            mask: true
          });
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
                  header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                  },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJjaGFuZ2VTZXR0aW5nIiwiYmluZFR5cGVDaGFuZ2UiLCJmaWx0ZXIiLCJpdGVtIiwidHlwZV9uYW1lIiwiaWQiLCJiaW5kT3BlbkNoYW5nZSIsImFsbG93X3JlYyIsImV4aXRRdW4iLCJxdWl0X2dyb3VwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiY2RhdGEiLCJmbiIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJyZXMiLCJzdWNjIiwiZ3JvdXBfaWQiLCJtYXAiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsY0FBUSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksRUFBWixDQUhIO0FBSUxDLFlBQU0sS0FKRDtBQUtMQyxlQUFTLElBTEo7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxvQkFBYyxFQVBUO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxnQkFBVSxLQVRMO0FBVUxDLGVBQVM7QUFWSixLLFFBWVBDLE8sR0FBVTtBQUNS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RCxTQUZOO0FBR0EsdUJBQUtqQixRQUFMLEdBQWdCcUMsSUFBSTNDLElBQUosQ0FBU08sWUFBVCxDQUFzQnVDLEdBQXRCLENBQTBCLGdCQUFRO0FBQ2hELDJCQUFPeEIsS0FBS0MsU0FBWjtBQUNELG1CQUZlLENBQWhCO0FBR0EsdUJBQUtoQixZQUFMLEdBQW9Cb0MsSUFBSTNDLElBQUosQ0FBU08sWUFBN0I7O0FBRUEsdUJBQUtGLE9BQUwsR0FBZXNDLElBQUkzQyxJQUFKLENBQVMrQyxNQUF4Qjs7QUFFQSxzQkFBSSxDQUFDSixJQUFJM0MsSUFBSixDQUFTZ0QsVUFBZCxFQUEwQjtBQUN4Qix5QkFBS3ZDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELHVCQUFLTyxNQUFMO0FBQ0FzQiwwQkFBUUMsR0FBUixDQUFZLEtBQUtqQyxRQUFqQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUdnQyxlQUFLMkMsSTs7a0JBQXJCcEQsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJRDogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgICBjaGVja2VkOiB0cnVlLFxuICAgIHR5cGVMaXN0OiBbXSxcbiAgICB0eXBlX21hcHBpbmc6IFtdLFxuICAgIG5ld2RhdGE6IHt9LFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93YnRuOiB0cnVlXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kUmVnaW9uQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucmVnaW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgcHJvdmluY2U6IHRoaXMucmVnaW9uWzBdLFxuICAgICAgICBjaXR5OiB0aGlzLnJlZ2lvblsxXVxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRUeXBlQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMudHlwZSA9IHRoaXMudHlwZUxpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZV9tYXBwaW5nLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSBpdGVtLnR5cGVfbmFtZVxuICAgICAgICB9KVswXS5pZFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dfcmVjOiBlLmRldGFpbC52YWx1ZSA/IDEgOiAwXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgZXhpdFF1bigpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgcXVpdF9ncm91cDogMVxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSwoKT0+e1xuICAgICAgICB0aGlzLnNob3didG4gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gIH1cblxuICBhc3luYyBjaGFuZ2VTZXR0aW5nKGNkYXRhLGZuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICBjb25zb2xlLmxvZyhjZGF0YSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvdXBkYXRlc2V0dGluZycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JyAvLyDpu5jorqTlgLxcbiAgICAgIH0sXG4gICAgICBkYXRhOiBjZGF0YVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGZuICYmIGZuKClcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvc2V0dGluZycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5yZWdpb24gPSBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldXG5cbiAgICAgIHRoaXMudHlwZSA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuZGF0YS50eXBlID09PSBpdGVtLmlkXG4gICAgICB9KVswXS50eXBlX25hbWVcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlX25hbWVcbiAgICAgIH0pXG4gICAgICB0aGlzLnR5cGVfbWFwcGluZyA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZ1xuXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIFxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVMaXN0KVxuICAgIH1cbiAgfVxufSJdfQ==