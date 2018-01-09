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
      showbtn: true
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWl4aW5zIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJjaGFuZ2VTZXR0aW5nIiwiYmluZFR5cGVDaGFuZ2UiLCJmaWx0ZXIiLCJpdGVtIiwidHlwZV9uYW1lIiwiaWQiLCJiaW5kT3BlbkNoYW5nZSIsImFsbG93X3JlYyIsImV4aXRRdW4iLCJxdWl0X2dyb3VwIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiY2RhdGEiLCJmbiIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJyZXMiLCJzdWNjIiwiZ3JvdXBfaWQiLCJtYXAiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxjQUFRLENBQUMsRUFBRCxFQUFLLEtBQUwsRUFBWSxFQUFaLENBSEg7QUFJTEMsWUFBTSxLQUpEO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLG9CQUFjLEVBUFQ7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGdCQUFVLEtBVEw7QUFVTEMsZUFBUztBQVZKLEssUUFZUEMsTSxHQUFTLDJCLFFBQ1RDLE8sR0FBVTtBQUNSQyxzQkFEUSw0QkFDU0MsQ0FEVCxFQUNZO0FBQ2xCLGFBQUtYLE1BQUwsR0FBY1csRUFBRUMsTUFBRixDQUFTQyxLQUF2QjtBQUNBLGFBQUtDLE1BQUw7QUFDQSxhQUFLVCxPQUFMLEdBQWU7QUFDYlUsb0JBQVUsS0FBS2YsTUFBTCxDQUFZLENBQVosQ0FERztBQUViZ0IsZ0JBQU0sS0FBS2hCLE1BQUwsQ0FBWSxDQUFaO0FBRk8sU0FBZjtBQUlBLGFBQUtpQixhQUFMLENBQW1CLEtBQUtaLE9BQXhCO0FBQ0QsT0FUTztBQVVSYSxvQkFWUSwwQkFVT1AsQ0FWUCxFQVVVO0FBQUE7O0FBQ2hCLGFBQUtWLElBQUwsR0FBWSxLQUFLRSxRQUFMLENBQWNRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkIsQ0FBWjtBQUNBLGFBQUtSLE9BQUwsR0FBZTtBQUNiSixnQkFBTSxLQUFLRyxZQUFMLENBQWtCZSxNQUFsQixDQUF5QixnQkFBUTtBQUNyQyxtQkFBTyxPQUFLbEIsSUFBTCxLQUFjbUIsS0FBS0MsU0FBMUI7QUFDRCxXQUZLLEVBRUgsQ0FGRyxFQUVBQztBQUhPLFNBQWY7QUFLQSxhQUFLTCxhQUFMLENBQW1CLEtBQUtaLE9BQXhCO0FBQ0QsT0FsQk87QUFtQlJrQixvQkFuQlEsMEJBbUJPWixDQW5CUCxFQW1CVTtBQUNoQixhQUFLTixPQUFMLEdBQWU7QUFDYm1CLHFCQUFXYixFQUFFQyxNQUFGLENBQVNDLEtBQVQsR0FBaUIsQ0FBakIsR0FBcUI7QUFEbkIsU0FBZjtBQUdBLGFBQUtJLGFBQUwsQ0FBbUIsS0FBS1osT0FBeEI7QUFDRCxPQXhCTztBQXlCUm9CLGFBekJRLHFCQXlCRTtBQUFBOztBQUNSLGFBQUtwQixPQUFMLEdBQWU7QUFDYnFCLHNCQUFZO0FBREMsU0FBZjtBQUdBLGFBQUtULGFBQUwsQ0FBbUIsS0FBS1osT0FBeEIsRUFBaUMsWUFBTTtBQUNyQyxpQkFBS0UsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS08sTUFBTDtBQUNBYSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sTUFESTtBQUVYQyxrQkFBTSxTQUZLO0FBR1hDLGtCQUFNO0FBSEssV0FBYjtBQUtELFNBUkQ7QUFTRDtBQXRDTyxLOzs7OzsyQkF3Q0hDLE8sRUFBUztBQUNkLFdBQUtsQyxPQUFMLEdBQWVrQyxRQUFRVixFQUF2QjtBQUNBLFdBQUtXLFFBQUw7QUFDRDs7OzsyRkFFbUJDLEssRUFBT0MsRTs7Ozs7O0FBQ3pCLHFCQUFLN0IsUUFBTCxHQUFnQixJQUFoQjtBQUNBOEIsd0JBQVFDLEdBQVIsQ0FBWUgsS0FBWjs7dUJBQ2dCLG9CQUFRO0FBQ3RCSSx1QkFBSyx5QkFEaUI7QUFFdEJDLDBCQUFRLE1BRmM7QUFHdEJDLDBCQUFRO0FBQ04sb0NBQWdCLGlEQURWLENBQzREO0FBRDVELG1CQUhjO0FBTXRCM0Msd0JBQU1xQztBQU5nQixpQkFBUixDOzs7QUFBWk8sbUI7O0FBUUosb0JBQUlBLElBQUlDLElBQVIsRUFBYztBQUNaLHVCQUFLcEMsUUFBTCxHQUFnQixLQUFoQjtBQUNBLHVCQUFLUSxNQUFMO0FBQ0FxQix3QkFBTUEsSUFBTjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJZSxvQkFBUTtBQUN0QkcsdUJBQUssbUJBRGlCO0FBRXRCekMsd0JBQU07QUFDSjhDLDhCQUFVLEtBQUs3QztBQURYO0FBRmdCLGlCQUFSLEM7OztBQUFaMkMsbUI7O0FBTUosb0JBQUlBLElBQUlDLElBQVIsRUFBYztBQUNaLHVCQUFLM0MsU0FBTCxHQUFpQjBDLElBQUk1QyxJQUFyQjtBQUNBLHVCQUFLRyxNQUFMLEdBQWMsQ0FBQ3lDLElBQUk1QyxJQUFKLENBQVNrQixRQUFWLEVBQW9CMEIsSUFBSTVDLElBQUosQ0FBU21CLElBQTdCLENBQWQ7O0FBRUEsdUJBQUtmLElBQUwsR0FBWXdDLElBQUk1QyxJQUFKLENBQVNPLFlBQVQsQ0FBc0JlLE1BQXRCLENBQTZCLGdCQUFRO0FBQy9DLDJCQUFPc0IsSUFBSTVDLElBQUosQ0FBU0ksSUFBVCxLQUFrQm1CLEtBQUtFLEVBQTlCO0FBQ0QsbUJBRlcsRUFFVCxDQUZTLEVBRU5ELFNBRk47QUFHQSx1QkFBS2xCLFFBQUwsR0FBZ0JzQyxJQUFJNUMsSUFBSixDQUFTTyxZQUFULENBQXNCd0MsR0FBdEIsQ0FBMEIsZ0JBQVE7QUFDaEQsMkJBQU94QixLQUFLQyxTQUFaO0FBQ0QsbUJBRmUsQ0FBaEI7QUFHQSx1QkFBS2pCLFlBQUwsR0FBb0JxQyxJQUFJNUMsSUFBSixDQUFTTyxZQUE3Qjs7QUFFQSx1QkFBS0YsT0FBTCxHQUFldUMsSUFBSTVDLElBQUosQ0FBU2dELE1BQXhCOztBQUVBLHNCQUFJLENBQUNKLElBQUk1QyxJQUFKLENBQVNpRCxVQUFkLEVBQTBCO0FBQ3hCLHlCQUFLeEMsUUFBTCxHQUFnQixJQUFoQjtBQUNEO0FBQ0QsdUJBQUtRLE1BQUw7QUFDQXNCLDBCQUFRQyxHQUFSLENBQVksS0FBS2xDLFFBQWpCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEzR2dDLGVBQUs0QyxJOztrQkFBckJyRCxPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSUQ6ICcnLFxuICAgIGdyb3VwSW5mbzoge30sXG4gICAgcmVnaW9uOiBbJycsICfmnKrloavlhpknLCAnJ10sXG4gICAgdHlwZTogJ+acquWhq+WGmScsXG4gICAgY2hlY2tlZDogdHJ1ZSxcbiAgICB0eXBlTGlzdDogW10sXG4gICAgdHlwZV9tYXBwaW5nOiBbXSxcbiAgICBuZXdkYXRhOiB7fSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd2J0bjogdHJ1ZVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHByb3ZpbmNlOiB0aGlzLnJlZ2lvblswXSxcbiAgICAgICAgY2l0eTogdGhpcy5yZWdpb25bMV1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIGFsbG93X3JlYzogZS5kZXRhaWwudmFsdWUgPyAxIDogMFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHF1aXRfZ3JvdXA6IDFcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEsICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93YnRuID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6YCA5Ye65oiQ5YqfJyxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gIH1cblxuICBhc3luYyBjaGFuZ2VTZXR0aW5nKGNkYXRhLCBmbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgY29uc29sZS5sb2coY2RhdGEpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3VwZGF0ZXNldHRpbmcnLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcgLy8g6buY6K6k5YC8XG4gICAgICB9LFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBmbiAmJiBmbigpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMucmVnaW9uID0gW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5XVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEudHlwZSA9PT0gaXRlbS5pZFxuICAgICAgfSlbMF0udHlwZV9uYW1lXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZV9uYW1lXG4gICAgICB9KVxuICAgICAgdGhpcy50eXBlX21hcHBpbmcgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG5cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy50eXBlTGlzdClcbiAgICB9XG4gIH1cbn1cbiJdfQ==