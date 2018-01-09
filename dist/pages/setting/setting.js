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
      region: ['广东省', '广州市', ''],
      type: '',
      checked: true,
      typeList: []
    }, _this.methods = {
      bindRegionChange: function bindRegionChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.region = e.detail.value;
        // this.setData({
        //   region: e.detail.value
        // })
        this.$apply();
        console.log(this.region);
      },
      bindTypeChange: function bindTypeChange(e) {},
      bindOpenChange: function bindOpenChange(e) {
        console.log('switch1 发生 change 事件，携带值为', e.detail.value);
      },
      exitQun: function exitQun() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(setting, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.groupID = options.id;
      this.loadInfo();
    }
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _login.request)({
                  url: '/gg/group/setting',
                  data: {
                    group_id: this.groupID
                  }
                }).then(function (res) {
                  _this2.groupInfo = res.data;
                  _this2.region = [res.data.province, res.data.city];
                  // this.type = res.data.type_mapping.map(item => {
                  //   console.log()
                  // })
                  _this2.type = res.data.type_mapping.filter(function (item) {
                    return res.data.type === item.id;
                  })[0].type_name;
                  _this2.checked = res.data.is_rec;
                  _this2.typeList = res.data.type_mapping;
                  _this2.$apply();
                  console.log(_this2.typeList);
                });

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadInfo() {
        return _ref2.apply(this, arguments);
      }

      return loadInfo;
    }()
  }]);

  return setting;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(setting , 'pages/setting/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJRCIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJtZXRob2RzIiwiYmluZFJlZ2lvbkNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJiaW5kVHlwZUNoYW5nZSIsImJpbmRPcGVuQ2hhbmdlIiwiZXhpdFF1biIsIm9wdGlvbnMiLCJpZCIsImxvYWRJbmZvIiwidXJsIiwiZ3JvdXBfaWQiLCJ0aGVuIiwicmVzIiwicHJvdmluY2UiLCJjaXR5IiwidHlwZV9tYXBwaW5nIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlzX3JlYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGNBQVEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEVBQWYsQ0FISDtBQUlMQyxZQUFNLEVBSkQ7QUFLTEMsZUFBUyxJQUxKO0FBTUxDLGdCQUFVO0FBTkwsSyxRQVFQQyxPLEdBQVU7QUFDUkMsc0JBRFEsNEJBQ1NDLENBRFQsRUFDWTtBQUNsQkMsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ0YsRUFBRUcsTUFBRixDQUFTQyxLQUExQztBQUNBLGFBQUtWLE1BQUwsR0FBY00sRUFBRUcsTUFBRixDQUFTQyxLQUF2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUtDLE1BQUw7QUFDQUosZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLUixNQUFqQjtBQUNELE9BVE87QUFVUlksb0JBVlEsMEJBVU9OLENBVlAsRUFVVSxDQUVqQixDQVpPO0FBYVJPLG9CQWJRLDBCQWFPUCxDQWJQLEVBYVU7QUFDaEJDLGdCQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBbEQ7QUFDRCxPQWZPO0FBZ0JSSSxhQWhCUSxxQkFnQkUsQ0FFVDtBQWxCTyxLOzs7OzsyQkFvQkhDLE8sRUFBUztBQUNkLFdBQUtqQixPQUFMLEdBQWVpQixRQUFRQyxFQUF2QjtBQUNBLFdBQUtDLFFBQUw7QUFDRDs7Ozs7Ozs7Ozs7QUFHQyxvQ0FBUTtBQUNOQyx1QkFBSyxtQkFEQztBQUVOckIsd0JBQU07QUFDSnNCLDhCQUFVLEtBQUtyQjtBQURYO0FBRkEsaUJBQVIsRUFLR3NCLElBTEgsQ0FLUSxVQUFDQyxHQUFELEVBQVM7QUFDZix5QkFBS3RCLFNBQUwsR0FBaUJzQixJQUFJeEIsSUFBckI7QUFDQSx5QkFBS0csTUFBTCxHQUFjLENBQUNxQixJQUFJeEIsSUFBSixDQUFTeUIsUUFBVixFQUFvQkQsSUFBSXhCLElBQUosQ0FBUzBCLElBQTdCLENBQWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBS3RCLElBQUwsR0FBWW9CLElBQUl4QixJQUFKLENBQVMyQixZQUFULENBQXNCQyxNQUF0QixDQUE2QixnQkFBUTtBQUMvQywyQkFBT0osSUFBSXhCLElBQUosQ0FBU0ksSUFBVCxLQUFrQnlCLEtBQUtWLEVBQTlCO0FBQ0QsbUJBRlcsRUFFVCxDQUZTLEVBRU5XLFNBRk47QUFHQSx5QkFBS3pCLE9BQUwsR0FBZW1CLElBQUl4QixJQUFKLENBQVMrQixNQUF4QjtBQUNBLHlCQUFLekIsUUFBTCxHQUFnQmtCLElBQUl4QixJQUFKLENBQVMyQixZQUF6QjtBQUNBLHlCQUFLYixNQUFMO0FBQ0FKLDBCQUFRQyxHQUFSLENBQVksT0FBS0wsUUFBakI7QUFDRCxpQkFsQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2Q2lDLGVBQUswQixJOztrQkFBckJuQyxPIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2V0dGluZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6+572uJ1xuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBncm91cElEOiAnJyxcbiAgICBncm91cEluZm86IHt9LFxuICAgIHJlZ2lvbjogWyflub/kuJznnIEnLCAn5bm/5bee5biCJywgJyddLFxuICAgIHR5cGU6ICcnLFxuICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgdHlwZUxpc3Q6IFtdXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kUmVnaW9uQ2hhbmdlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgIHRoaXMucmVnaW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIC8vIHRoaXMuc2V0RGF0YSh7XG4gICAgICAvLyAgIHJlZ2lvbjogZS5kZXRhaWwudmFsdWVcbiAgICAgIC8vIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnJlZ2lvbilcbiAgICB9LFxuICAgIGJpbmRUeXBlQ2hhbmdlKGUpIHtcblxuICAgIH0sXG4gICAgYmluZE9wZW5DaGFuZ2UoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3N3aXRjaDEg5Y+R55SfIGNoYW5nZSDkuovku7bvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICB9LFxuICAgIGV4aXRRdW4oKSB7XG5cbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gIH1cblxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9zZXR0aW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5yZWdpb24gPSBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldXG4gICAgICAvLyB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygpXG4gICAgICAvLyB9KVxuICAgICAgdGhpcy50eXBlID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhLnR5cGUgPT09IGl0ZW0uaWRcbiAgICAgIH0pWzBdLnR5cGVfbmFtZVxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVMaXN0KVxuICAgIH0pXG4gIH1cbn0iXX0=