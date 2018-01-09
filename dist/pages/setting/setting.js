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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWVtYmVycyIsIm1peGlucyIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicHJvdmluY2UiLCJjaXR5IiwiZ3JvdXBJZCIsImNoYW5nZVNldHRpbmciLCJiaW5kVHlwZUNoYW5nZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlX25hbWUiLCJpZCIsImJpbmRPcGVuQ2hhbmdlIiwiYWxsb3dSZWMiLCJleGl0UXVuIiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJjYW5jZWwiLCJvcHRpb25zIiwibG9hZEluZm8iLCJjZGF0YSIsImZuIiwidXJsIiwibWV0aG9kIiwic3VjYyIsImdyb3VwX2lkIiwiaXNfcmVjIiwiY2FuX21vZGlmeSIsIm1hcCIsInR5cGVsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxjQUFRLENBQUMsRUFBRCxFQUFLLEtBQUwsRUFBWSxFQUFaLENBSEg7QUFJTEMsWUFBTSxLQUpEO0FBS0xDLGVBQVMsS0FMSjtBQU1MQyxn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eSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSUQ6ICcnLFxuICAgIGdyb3VwSW5mbzoge30sXG4gICAgcmVnaW9uOiBbJycsICfmnKrloavlhpknLCAnJ10sXG4gICAgdHlwZTogJ+acquWhq+WGmScsXG4gICAgY2hlY2tlZDogZmFsc2UsXG4gICAgdHlwZUxpc3Q6IFtdLFxuICAgIHR5cGVfbWFwcGluZzogW10sXG4gICAgbmV3ZGF0YToge30sXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3didG46IHRydWUsXG4gICAgbWVtYmVyczogW11cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluXVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBwcm92aW5jZTogdGhpcy5yZWdpb25bMF0sXG4gICAgICAgIGNpdHk6IHRoaXMucmVnaW9uWzFdLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWQsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dSZWM6IGUuZGV0YWlsLnZhbHVlID8gMSA6IDAsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6ICfnoa7orqTpgIDlh7rnvqTnqbrpl7TvvJ8nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgICAgdGhhdC5uZXdkYXRhID0ge1xuICAgICAgICAgICAgICBxdWl0R3JvdXA6IDEsXG4gICAgICAgICAgICAgIGdyb3VwSWQ6IHRoYXQuZ3JvdXBJRFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5jaGFuZ2VTZXR0aW5nKHRoYXQubmV3ZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGF0LnNob3didG4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfpgIDlh7rmiJDlip8nLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgfVxuXG4gIGFzeW5jIGNoYW5nZVNldHRpbmcoY2RhdGEsIGZuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICBjb25zb2xlLmxvZyhjZGF0YSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvdXBkYXRlc2V0dGluZycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGNkYXRhXG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgZm4gJiYgZm4oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9zZXR0aW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLm1lbWJlcnMgPSByZXMuZGF0YS5tZW1iZXJzXG4gICAgICB0aGlzLnJlZ2lvbiA9IHJlcy5kYXRhLmNpdHkgPyBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldIDogdGhpcy5yZWdpb25cblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICB0aGlzLnR5cGVfbWFwcGluZyA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZ1xuXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnkpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcblxuICAgICAgdGhpcy50eXBlID0gcmVzLmRhdGEudHlwZV9uYW1lXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZV9uYW1lXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2codGhpcy50eXBlbGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==