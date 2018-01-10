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
      alert: function alert() {
        wx.showModal({
          content: '\u53EA\u6709\u7FA4\u4E3B' + this.master + '\u53EF\u4EE5\u4FEE\u6539\u7FA4\u8D44\u6599',
          showCancel: false
        });
      },
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
                setTimeout(function () {
                  _wepy2.default.reLaunch({
                    url: '../index/index'
                  });
                }, 2000);
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
      console.log(this.groupID);
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
                  this.master = this.members.filter(function (item) {
                    return item.is_creator === true;
                  })[0].name;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJncm91cElEIiwiZ3JvdXBJbmZvIiwicmVnaW9uIiwidHlwZSIsImNoZWNrZWQiLCJ0eXBlTGlzdCIsInR5cGVfbWFwcGluZyIsIm5ld2RhdGEiLCJkaXNhYmxlZCIsImlzX3Nob3dfcXVpdF9idG4iLCJtZW1iZXJzIiwic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWl4aW5zIiwibWV0aG9kcyIsImFsZXJ0Iiwid3giLCJzaG93TW9kYWwiLCJjb250ZW50IiwibWFzdGVyIiwic2hvd0NhbmNlbCIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJncm91cElkIiwiY2hhbmdlU2V0dGluZyIsImJpbmRUeXBlQ2hhbmdlIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlkIiwiYmluZE9wZW5DaGFuZ2UiLCJhbGxvd1JlYyIsImV4aXRRdW4iLCJ0aGF0IiwidGl0bGUiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwic2V0VGltZW91dCIsInJlTGF1bmNoIiwidXJsIiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsIm9wdGlvbnMiLCJsb2FkSW5mbyIsImhpZGVTaGFyZU1lbnUiLCJjZGF0YSIsImZuIiwibWV0aG9kIiwic3VjYyIsImdyb3VwX2lkIiwiaXNfY3JlYXRvciIsIm5hbWUiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwibWFwIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFXO0FBQ2JDLFdBQVMsRUFESTtBQUViQyxhQUFXLEVBRkU7QUFHYkMsVUFBUSxDQUFDLEVBQUQsRUFB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SixDQUFTaUIsSUFBN0IsQ0FBaEIsR0FBcUQsS0FBSzdCLE1BQXhFOztBQUVBLHVCQUFLRSxPQUFMLEdBQWV5QyxJQUFJL0IsSUFBSixDQUFTcUQsTUFBeEI7QUFDQSx1QkFBSzdELFlBQUwsR0FBb0J1QyxJQUFJL0IsSUFBSixDQUFTUixZQUE3Qjs7QUFFQSxzQkFBSSxDQUFDdUMsSUFBSS9CLElBQUosQ0FBU3NELFVBQWQsRUFBMEI7QUFDeEIseUJBQUs1RCxRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRCx1QkFBS3FCLE1BQUw7O0FBRUEsdUJBQUsxQixJQUFMLEdBQVkwQyxJQUFJL0IsSUFBSixDQUFTdUIsU0FBVCxHQUFxQlEsSUFBSS9CLElBQUosQ0FBU3VCLFNBQTlCLEdBQTBDLEtBQXREO0FBQ0EsdUJBQUtoQyxRQUFMLEdBQWdCd0MsSUFBSS9CLElBQUosQ0FBU1IsWUFBVCxDQUFzQitELEdBQXRCLENBQTBCLGdCQUFRO0FBQ2hELDJCQUFPakMsS0FBS0MsU0FBWjtBQUNELG1CQUZlLENBQWhCOztBQUlBLHVCQUFLUixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEzSGdDLGVBQUt5QyxJOztrQkFBckIzRCxPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIGdyb3VwSUQ6ICcnLFxuICBncm91cEluZm86IHt9LFxuICByZWdpb246IFsnJywgJ+acquWhq+WGmScsICcnXSxcbiAgdHlwZTogJ+acquWhq+WGmScsXG4gIGNoZWNrZWQ6IGZhbHNlLFxuICB0eXBlTGlzdDogW10sXG4gIHR5cGVfbWFwcGluZzogW10sXG4gIG5ld2RhdGE6IHt9LFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIGlzX3Nob3dfcXVpdF9idG46IGZhbHNlLFxuICBtZW1iZXJzOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuXG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW5dXG4gIG1ldGhvZHMgPSB7XG4gICAgYWxlcnQoKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICBjb250ZW50OiBg5Y+q5pyJ576k5Li7JHt0aGlzLm1hc3Rlcn3lj6/ku6Xkv67mlLnnvqTotYTmlplgLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBwcm92aW5jZTogdGhpcy5yZWdpb25bMF0sXG4gICAgICAgIGNpdHk6IHRoaXMucmVnaW9uWzFdLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWQsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dSZWM6IGUuZGV0YWlsLnZhbHVlID8gMSA6IDAsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5L2g56Gu5a6a6YCA5Ye65ZCXJyxcbiAgICAgICAgY29udGVudDogJ+mAgOWHuuWQjuWwhuaXoOazleWGjeafpeeci+ebuOWGjOS4reeahOeFp+eJhycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgdGhhdC5uZXdkYXRhID0ge1xuICAgICAgICAgICAgICBxdWl0R3JvdXA6IDEsXG4gICAgICAgICAgICAgIGdyb3VwSWQ6IHRoYXQuZ3JvdXBJRFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5jaGFuZ2VTZXR0aW5nKHRoYXQubmV3ZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGF0LmlzX3Nob3dfcXVpdF9idG4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICAgICAgdXJsOiBgLi4vaW5kZXgvaW5kZXhgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSwyMDAwKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwSUQpXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgd3guaGlkZVNoYXJlTWVudSgpXG4gIH1cblxuICBhc3luYyBjaGFuZ2VTZXR0aW5nKGNkYXRhLCBmbikge1xuICAgIGNvbnNvbGUubG9nKGNkYXRhKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC91cGRhdGVzZXR0aW5nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgZm4gJiYgZm4oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9zZXR0aW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmlzX3Nob3dfcXVpdF9idG4gPSByZXMuZGF0YS5pc19zaG93X3F1aXRfYnRuXG4gICAgICB0aGlzLm1lbWJlcnMgPSByZXMuZGF0YS5tZW1iZXJzXG4gICAgICB0aGlzLm1hc3RlciA9IHRoaXMubWVtYmVycy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzX2NyZWF0b3IgPT09IHRydWVcbiAgICAgIH0pWzBdLm5hbWVcbiAgICAgIHRoaXMucmVnaW9uID0gcmVzLmRhdGEuY2l0eSA/IFtyZXMuZGF0YS5wcm92aW5jZSwgcmVzLmRhdGEuY2l0eV0gOiB0aGlzLnJlZ2lvblxuXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIHRoaXMudHlwZV9tYXBwaW5nID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nXG5cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX25hbWUgPyByZXMuZGF0YS50eXBlX25hbWUgOiAn5pyq5aGr5YaZJ1xuICAgICAgdGhpcy50eXBlTGlzdCA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnR5cGVfbmFtZVxuICAgICAgfSlcblxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19