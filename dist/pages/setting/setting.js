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
                var _page = getCurrentPages();
                _page.filter(function (item) {
                  return item.data.pageName === 'gallery';
                })[0].init();
                setTimeout(function () {
                  _wepy2.default.navigateBack({
                    delta: 1
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJncm91cElEIiwiZ3JvdXBJbmZvIiwicmVnaW9uIiwidHlwZSIsImNoZWNrZWQiLCJ0eXBlTGlzdCIsInR5cGVfbWFwcGluZyIsIm5ld2RhdGEiLCJkaXNhYmxlZCIsImlzX3Nob3dfcXVpdF9idG4iLCJtZW1iZXJzIiwic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWl4aW5zIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJncm91cElkIiwiY2hhbmdlU2V0dGluZyIsImJpbmRUeXBlQ2hhbmdlIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlkIiwiYmluZE9wZW5DaGFuZ2UiLCJhbGxvd1JlYyIsImV4aXRRdW4iLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwiX3BhZ2UiLCJnZXRDdXJyZW50UGFnZXMiLCJwYWdlTmFtZSIsImluaXQiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiaGlkZVNoYXJlTWVudSIsImNkYXRhIiwiZm4iLCJ1cmwiLCJtZXRob2QiLCJzdWNjIiwiZ3JvdXBfaWQiLCJpc19yZWMiLCJjYW5fbW9kaWZ5IiwibWFwIiwidHlwZWxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFdBQVc7QUFDYkMsV0FBUyxFQURJO0FBRWJDLGFBQVcsRUFGRTtBQUdiQyxV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LElBQUk1QixJQUFKLENBQVNSLFlBQTdCOztBQUVBLHNCQUFJLENBQUNvQyxJQUFJNUIsSUFBSixDQUFTc0QsVUFBZCxFQUEwQjtBQUN4Qix5QkFBSzVELFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELHVCQUFLZSxNQUFMOztBQUVBLHVCQUFLcEIsSUFBTCxHQUFZdUMsSUFBSTVCLElBQUosQ0FBU2lCLFNBQVQsR0FBcUJXLElBQUk1QixJQUFKLENBQVNpQixTQUE5QixHQUEwQyxLQUF0RDtBQUNBLHVCQUFLMUIsUUFBTCxHQUFnQnFDLElBQUk1QixJQUFKLENBQVNSLFlBQVQsQ0FBc0IrRCxHQUF0QixDQUEwQixnQkFBUTtBQUNoRCwyQkFBT3ZDLEtBQUtDLFNBQVo7QUFDRCxtQkFGZSxDQUFoQjtBQUdBeUIsMEJBQVFDLEdBQVIsQ0FBWSxLQUFLYSxRQUFqQjtBQUNBLHVCQUFLL0MsTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBckhnQyxlQUFLZ0QsSTs7a0JBQXJCNUQsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBncm91cElEOiAnJyxcbiAgZ3JvdXBJbmZvOiB7fSxcbiAgcmVnaW9uOiBbJycsICfmnKrloavlhpknLCAnJ10sXG4gIHR5cGU6ICfmnKrloavlhpknLFxuICBjaGVja2VkOiBmYWxzZSxcbiAgdHlwZUxpc3Q6IFtdLFxuICB0eXBlX21hcHBpbmc6IFtdLFxuICBuZXdkYXRhOiB7fSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBpc19zaG93X3F1aXRfYnRuOiBmYWxzZSxcbiAgbWVtYmVyczogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2V0dGluZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6+572uJ1xuICB9XG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcblxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluXVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBwcm92aW5jZTogdGhpcy5yZWdpb25bMF0sXG4gICAgICAgIGNpdHk6IHRoaXMucmVnaW9uWzFdLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWQsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dSZWM6IGUuZGV0YWlsLnZhbHVlID8gMSA6IDAsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5L2g56Gu5a6a6YCA5Ye65ZCXJyxcbiAgICAgICAgY29udGVudDogJ+mAgOWHuuWQjuWwhuaXoOazleWGjeafpeeci+ebuOWGjOS4reeahOeFp+eJhycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgdGhhdC5uZXdkYXRhID0ge1xuICAgICAgICAgICAgICBxdWl0R3JvdXA6IDEsXG4gICAgICAgICAgICAgIGdyb3VwSWQ6IHRoYXQuZ3JvdXBJRFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5jaGFuZ2VTZXR0aW5nKHRoYXQubmV3ZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGF0LmlzX3Nob3dfcXVpdF9idG4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHZhciBfcGFnZSA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgICAgIF9wYWdlLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhLnBhZ2VOYW1lID09PSAnZ2FsbGVyeSdcbiAgICAgICAgICAgICAgfSlbMF0uaW5pdCgpXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSwyMDAwKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgICB3eC5oaWRlU2hhcmVNZW51KClcbiAgfVxuXG4gIGFzeW5jIGNoYW5nZVNldHRpbmcoY2RhdGEsIGZuKSB7XG4gICAgY29uc29sZS5sb2coY2RhdGEpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3VwZGF0ZXNldHRpbmcnLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiBjZGF0YVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICBmbiAmJiBmbigpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuaXNfc2hvd19xdWl0X2J0biA9IHJlcy5kYXRhLmlzX3Nob3dfcXVpdF9idG5cbiAgICAgIHRoaXMubWVtYmVycyA9IHJlcy5kYXRhLm1lbWJlcnNcbiAgICAgIHRoaXMucmVnaW9uID0gcmVzLmRhdGEuY2l0eSA/IFtyZXMuZGF0YS5wcm92aW5jZSwgcmVzLmRhdGEuY2l0eV0gOiB0aGlzLnJlZ2lvblxuXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIHRoaXMudHlwZV9tYXBwaW5nID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nXG5cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX25hbWUgPyByZXMuZGF0YS50eXBlX25hbWUgOiAn5pyq5aGr5YaZJ1xuICAgICAgdGhpcy50eXBlTGlzdCA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnR5cGVfbmFtZVxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZWxpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=