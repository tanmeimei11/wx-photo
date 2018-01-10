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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJncm91cElEIiwiZ3JvdXBJbmZvIiwicmVnaW9uIiwidHlwZSIsImNoZWNrZWQiLCJ0eXBlTGlzdCIsInR5cGVfbWFwcGluZyIsIm5ld2RhdGEiLCJkaXNhYmxlZCIsImlzX3Nob3dfcXVpdF9idG4iLCJtZW1iZXJzIiwic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWl4aW5zIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJncm91cElkIiwiY2hhbmdlU2V0dGluZyIsImJpbmRUeXBlQ2hhbmdlIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlkIiwiYmluZE9wZW5DaGFuZ2UiLCJhbGxvd1JlYyIsImV4aXRRdW4iLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInF1aXRHcm91cCIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwic2V0VGltZW91dCIsInJlTGF1bmNoIiwidXJsIiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsIm9wdGlvbnMiLCJsb2FkSW5mbyIsImhpZGVTaGFyZU1lbnUiLCJjZGF0YSIsImZuIiwibWV0aG9kIiwic3VjYyIsImdyb3VwX2lkIiwiaXNfcmVjIiwiY2FuX21vZGlmeSIsIm1hcCIsInR5cGVsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFXO0FBQ2JDLFdBQVMsRUFESTtBQUViQyxhQUFXLEVBRkU7QUFHYkMsVUFBUSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksRUFBWixDQUhLO0FBSWJDLFFBQU0sS0FKTztB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QVNpQixTQUFULEdBQXFCVyxJQUFJNUIsSUFBSixDQUFTaUIsU0FBOUIsR0FBMEMsS0FBdEQ7QUFDQSx1QkFBSzFCLFFBQUwsR0FBZ0JxQyxJQUFJNUIsSUFBSixDQUFTUixZQUFULENBQXNCMEQsR0FBdEIsQ0FBMEIsZ0JBQVE7QUFDaEQsMkJBQU9sQyxLQUFLQyxTQUFaO0FBQ0QsbUJBRmUsQ0FBaEI7QUFHQXFCLDBCQUFRQyxHQUFSLENBQVksS0FBS1ksUUFBakI7QUFDQSx1QkFBSzFDLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWxIZ0MsZUFBSzJDLEk7O2tCQUFyQnZELE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgZ3JvdXBJRDogJycsXG4gIGdyb3VwSW5mbzoge30sXG4gIHJlZ2lvbjogWycnLCAn5pyq5aGr5YaZJywgJyddLFxuICB0eXBlOiAn5pyq5aGr5YaZJyxcbiAgY2hlY2tlZDogZmFsc2UsXG4gIHR5cGVMaXN0OiBbXSxcbiAgdHlwZV9tYXBwaW5nOiBbXSxcbiAgbmV3ZGF0YToge30sXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgaXNfc2hvd19xdWl0X2J0bjogZmFsc2UsXG4gIG1lbWJlcnM6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG5cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbl1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kUmVnaW9uQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucmVnaW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgcHJvdmluY2U6IHRoaXMucmVnaW9uWzBdLFxuICAgICAgICBjaXR5OiB0aGlzLnJlZ2lvblsxXSxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhKVxuICAgIH0sXG4gICAgYmluZFR5cGVDaGFuZ2UoZSkge1xuICAgICAgdGhpcy50eXBlID0gdGhpcy50eXBlTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT09IGl0ZW0udHlwZV9uYW1lXG4gICAgICAgIH0pWzBdLmlkLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIGFsbG93UmVjOiBlLmRldGFpbC52YWx1ZSA/IDEgOiAwLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBleGl0UXVuKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+S9oOehruWumumAgOWHuuWQlycsXG4gICAgICAgIGNvbnRlbnQ6ICfpgIDlh7rlkI7lsIbml6Dms5Xlho3mn6XnnIvnm7jlhozkuK3nmoTnhafniYcnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoYXQubmV3ZGF0YSA9IHtcbiAgICAgICAgICAgICAgcXVpdEdyb3VwOiAxLFxuICAgICAgICAgICAgICBncm91cElkOiB0aGF0Lmdyb3VwSURcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuY2hhbmdlU2V0dGluZyh0aGF0Lm5ld2RhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC5pc19zaG93X3F1aXRfYnRuID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6YCA5Ye65oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgIHVybDogYC4uL2luZGV4L2luZGV4YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0sMjAwMClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgY29uc29sZS5sb2codGhpcy5ncm91cElEKVxuICAgIHRoaXMubG9hZEluZm8oKVxuICAgIHd4LmhpZGVTaGFyZU1lbnUoKVxuICB9XG5cbiAgYXN5bmMgY2hhbmdlU2V0dGluZyhjZGF0YSwgZm4pIHtcbiAgICBjb25zb2xlLmxvZyhjZGF0YSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvdXBkYXRlc2V0dGluZycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGNkYXRhXG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIGZuICYmIGZuKClcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvc2V0dGluZycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5pc19zaG93X3F1aXRfYnRuID0gcmVzLmRhdGEuaXNfc2hvd19xdWl0X2J0blxuICAgICAgdGhpcy5tZW1iZXJzID0gcmVzLmRhdGEubWVtYmVyc1xuICAgICAgdGhpcy5yZWdpb24gPSByZXMuZGF0YS5jaXR5ID8gW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5XSA6IHRoaXMucmVnaW9uXG5cbiAgICAgIHRoaXMuY2hlY2tlZCA9IHJlcy5kYXRhLmlzX3JlY1xuICAgICAgdGhpcy50eXBlX21hcHBpbmcgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcblxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgIHRoaXMudHlwZSA9IHJlcy5kYXRhLnR5cGVfbmFtZSA/IHJlcy5kYXRhLnR5cGVfbmFtZSA6ICfmnKrloavlhpknXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZV9uYW1lXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2codGhpcy50eXBlbGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==