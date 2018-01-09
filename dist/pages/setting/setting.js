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
        var _this3 = this;

        this.newdata = {
          quitGroup: 1,
          groupId: this.groupID
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

                  this.type = res.data.type === '' ? '未填写' : res.data.type_mapping.filter(function (item) {
                    return res.data.type === item.id;
                  })[0].type_name;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWVtYmVycyIsIm1peGlucyIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicHJvdmluY2UiLCJjaXR5IiwiZ3JvdXBJZCIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dSZWMiLCJleGl0UXVuIiwicXVpdEdyb3VwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiY2RhdGEiLCJmbiIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJyZXMiLCJzdWNjIiwiZ3JvdXBfaWQiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwibWFwIiwidHlwZWxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGNBQVEsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZLEVBQVosQ0FISDtBQUlMQyxZQUFNLEtBSkQ7QUFLTEMsZUFBUyxJQUxKO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMsb0JBQWMsRUFQVDtBQVFMQyxlQUFTLEVBUko7QUFTTEMsZ0JBQVUsS0FU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QUFTbUIsUUFBVixFQUFvQjBCLElBQUk3QyxJQUFKLENBQVNvQixJQUE3QixDQUFoQixHQUFxRCxLQUFLakIsTUFBeEU7O0FBRUEsdUJBQUtFLE9BQUwsR0FBZXdDLElBQUk3QyxJQUFKLENBQVNnRCxNQUF4QjtBQUNBLHVCQUFLekMsWUFBTCxHQUFvQnNDLElBQUk3QyxJQUFKLENBQVNPLFlBQTdCOztBQUVBLHNCQUFJLENBQUNzQyxJQUFJN0MsSUFBSixDQUFTaUQsVUFBZCxFQUEwQjtBQUN4Qix5QkFBS3hDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELHVCQUFLUyxNQUFMOztBQUVBLHVCQUFLZCxJQUFMLEdBQVl5QyxJQUFJN0MsSUFBSixDQUFTSSxJQUFULEtBQWtCLEVBQWxCLEdBQXVCLEtBQXZCLEdBQStCeUMsSUFBSTdDLElBQUosQ0FBU08sWUFBVCxDQUFzQmlCLE1BQXRCLENBQTZCLGdCQUFRO0FBQzlFLDJCQUFPcUIsSUFBSTdDLElBQUosQ0FBU0ksSUFBVCxLQUFrQnFCLEtBQUtFLEVBQTlCO0FBQ0QsbUJBRjBDLEVBRXhDLENBRndDLEVBRXJDRCxTQUZOO0FBR0EsdUJBQUtwQixRQUFMLEdBQWdCdUMsSUFBSTdDLElBQUosQ0FBU08sWUFBVCxDQUFzQjJDLEdBQXRCLENBQTBCLGdCQUFRO0FBQ2hELDJCQUFPekIsS0FBS0MsU0FBWjtBQUNELG1CQUZlLENBQWhCO0FBR0FlLDBCQUFRQyxHQUFSLENBQVksS0FBS1MsUUFBakI7QUFDQSx1QkFBS2pDLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQS9HZ0MsZUFBS2tDLEk7O2tCQUFyQnZELE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJRDogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgICBjaGVja2VkOiB0cnVlLFxuICAgIHR5cGVMaXN0OiBbXSxcbiAgICB0eXBlX21hcHBpbmc6IFtdLFxuICAgIG5ld2RhdGE6IHt9LFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93YnRuOiB0cnVlLFxuICAgIG1lbWJlcnM6IFtdXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbl1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kUmVnaW9uQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucmVnaW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgcHJvdmluY2U6IHRoaXMucmVnaW9uWzBdLFxuICAgICAgICBjaXR5OiB0aGlzLnJlZ2lvblsxXSxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgYmluZFR5cGVDaGFuZ2UoZSkge1xuICAgICAgdGhpcy50eXBlID0gdGhpcy50eXBlTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT09IGl0ZW0udHlwZV9uYW1lXG4gICAgICAgIH0pWzBdLmlkLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIGFsbG93UmVjOiBlLmRldGFpbC52YWx1ZSA/IDEgOiAwLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBleGl0UXVuKCkge1xuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBxdWl0R3JvdXA6IDEsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3didG4gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgfVxuXG4gIGFzeW5jIGNoYW5nZVNldHRpbmcoY2RhdGEsIGZuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICBjb25zb2xlLmxvZyhjZGF0YSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvdXBkYXRlc2V0dGluZycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGNkYXRhXG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgZm4gJiYgZm4oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9zZXR0aW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLm1lbWJlcnMgPSByZXMuZGF0YS5tZW1iZXJzXG4gICAgICB0aGlzLnJlZ2lvbiA9IHJlcy5kYXRhLmNpdHkgPyBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldIDogdGhpcy5yZWdpb25cblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICB0aGlzLnR5cGVfbWFwcGluZyA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZ1xuXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnkpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcblxuICAgICAgdGhpcy50eXBlID0gcmVzLmRhdGEudHlwZSA9PT0gJycgPyAn5pyq5aGr5YaZJyA6IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuZGF0YS50eXBlID09PSBpdGVtLmlkXG4gICAgICB9KVswXS50eXBlX25hbWVcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlX25hbWVcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVsaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19