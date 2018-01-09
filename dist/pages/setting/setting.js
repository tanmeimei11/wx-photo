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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJ0eXBlX21hcHBpbmciLCJuZXdkYXRhIiwiZGlzYWJsZWQiLCJzaG93YnRuIiwibWV0aG9kcyIsImJpbmRSZWdpb25DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJwcm92aW5jZSIsImNpdHkiLCJncm91cElkIiwiY2hhbmdlU2V0dGluZyIsImJpbmRUeXBlQ2hhbmdlIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlkIiwiYmluZE9wZW5DaGFuZ2UiLCJhbGxvd1JlYyIsImV4aXRRdW4iLCJxdWl0R3JvdXAiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJvcHRpb25zIiwibG9hZEluZm8iLCJjZGF0YSIsImZuIiwiY29uc29sZSIsImxvZyIsInVybCIsIm1ldGhvZCIsInJlcyIsInN1Y2MiLCJncm91cF9pZCIsIm1hcCIsImlzX3JlYyIsImNhbl9tb2RpZnkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxjQUFRLENBQUMsRUFBRCxFQUFLLEtBQUwsRUFBWSxFQUFaLENBSEg7QUFJTEMsWUFBTSxLQUpEO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLG9CQUFjLEVBUFQ7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGdCQUFVLEtBVEw7QUFVTEMsZUFBUztBQVZKLEssUUFZUEMsTyxHQUFVO0FBQ1JD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SUFBVCxLQUFrQm1CLEtBQUtFLEVBQTlCO0FBQ0QsbUJBRlcsRUFFVCxDQUZTLEVBRU5ELFNBRk47QUFHQSx1QkFBS2xCLFFBQUwsR0FBZ0JxQyxJQUFJM0MsSUFBSixDQUFTTyxZQUFULENBQXNCdUMsR0FBdEIsQ0FBMEIsZ0JBQVE7QUFDaEQsMkJBQU92QixLQUFLQyxTQUFaO0FBQ0QsbUJBRmUsQ0FBaEI7QUFHQSx1QkFBS2pCLFlBQUwsR0FBb0JvQyxJQUFJM0MsSUFBSixDQUFTTyxZQUE3Qjs7QUFFQSx1QkFBS0YsT0FBTCxHQUFlc0MsSUFBSTNDLElBQUosQ0FBUytDLE1BQXhCOztBQUVBLHNCQUFJLENBQUNKLElBQUkzQyxJQUFKLENBQVNnRCxVQUFkLEVBQTBCO0FBQ3hCLHlCQUFLdkMsUUFBTCxHQUFnQixJQUFoQjtBQUNEO0FBQ0QsdUJBQUtPLE1BQUw7QUFDQXVCLDBCQUFRQyxHQUFSLENBQVksS0FBS2xDLFFBQWpCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEzR2dDLGVBQUsyQyxJOztrQkFBckJwRCxPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2V0dGluZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6+572uJ1xuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBncm91cElEOiAnJyxcbiAgICBncm91cEluZm86IHt9LFxuICAgIHJlZ2lvbjogWycnLCAn5pyq5aGr5YaZJywgJyddLFxuICAgIHR5cGU6ICfmnKrloavlhpknLFxuICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgdHlwZUxpc3Q6IFtdLFxuICAgIHR5cGVfbWFwcGluZzogW10sXG4gICAgbmV3ZGF0YToge30sXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3didG46IHRydWVcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICBwcm92aW5jZTogdGhpcy5yZWdpb25bMF0sXG4gICAgICAgIGNpdHk6IHRoaXMucmVnaW9uWzFdLFxuICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlU2V0dGluZyh0aGlzLm5ld2RhdGEpXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGVMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgdGhpcy5uZXdkYXRhID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGVfbWFwcGluZy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gaXRlbS50eXBlX25hbWVcbiAgICAgICAgfSlbMF0uaWQsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMubmV3ZGF0YSA9IHtcbiAgICAgICAgYWxsb3dSZWM6IGUuZGV0YWlsLnZhbHVlID8gMSA6IDAsXG4gICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTZXR0aW5nKHRoaXMubmV3ZGF0YSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG4gICAgICB0aGlzLm5ld2RhdGEgPSB7XG4gICAgICAgIHF1aXRHcm91cDogMSxcbiAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZVNldHRpbmcodGhpcy5uZXdkYXRhLCgpPT57XG4gICAgICAgIHRoaXMuc2hvd2J0biA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+mAgOWHuuaIkOWKnycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgfVxuXG4gIGFzeW5jIGNoYW5nZVNldHRpbmcoY2RhdGEsZm4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgIGNvbnNvbGUubG9nKGNkYXRhKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC91cGRhdGVzZXR0aW5nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogY2RhdGFcbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBmbiAmJiBmbigpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMucmVnaW9uID0gW3Jlcy5kYXRhLnByb3ZpbmNlLCByZXMuZGF0YS5jaXR5XVxuXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEudHlwZSA9PT0gaXRlbS5pZFxuICAgICAgfSlbMF0udHlwZV9uYW1lXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZV9uYW1lXG4gICAgICB9KVxuICAgICAgdGhpcy50eXBlX21hcHBpbmcgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcblxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICBcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeSkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy50eXBlTGlzdClcbiAgICB9XG4gIH1cbn0iXX0=