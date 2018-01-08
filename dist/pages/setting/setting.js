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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '设置'
    }, _this.data = {
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

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
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
                    group_id: 0
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

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/setting/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImdyb3VwSW5mbyIsInJlZ2lvbiIsInR5cGUiLCJjaGVja2VkIiwidHlwZUxpc3QiLCJtZXRob2RzIiwiYmluZFJlZ2lvbkNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJiaW5kVHlwZUNoYW5nZSIsImJpbmRPcGVuQ2hhbmdlIiwiZXhpdFF1biIsImxvYWRJbmZvIiwidXJsIiwiZ3JvdXBfaWQiLCJ0aGVuIiwicmVzIiwicHJvdmluY2UiLCJjaXR5IiwidHlwZV9tYXBwaW5nIiwiZmlsdGVyIiwiaXRlbSIsImlkIiwidHlwZV9uYW1lIiwiaXNfcmVjIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxjQUFRLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxFQUFmLENBRkg7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLGVBQVMsSUFKSjtBQUtMQyxnQkFBVTtBQUxMLEssUUFPUEMsTyxHQUFVO0FBQ1JDLHNCQURRLDRCQUNTQyxDQURULEVBQ1k7QUFDbEJDLGdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBMUM7QUFDQSxhQUFLVixNQUFMLEdBQWNNLEVBQUVHLE1BQUYsQ0FBU0MsS0FBdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLQyxNQUFMO0FBQ0FKLGdCQUFRQyxHQUFSLENBQVksS0FBS1IsTUFBakI7QUFDRCxPQVRPO0FBVVJZLG9CQVZRLDBCQVVPTixDQVZQLEVBVVUsQ0FFakIsQ0FaTztBQWFSTyxvQkFiUSwwQkFhT1AsQ0FiUCxFQWFVO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDRixFQUFFRyxNQUFGLENBQVNDLEtBQWxEO0FBQ0QsT0FmTztBQWdCUkksYUFoQlEscUJBZ0JFLENBRVQ7QUFsQk8sSzs7Ozs7NkJBb0JEO0FBQ1AsV0FBS0MsUUFBTDtBQUVEOzs7Ozs7Ozs7OztBQUdDLG9DQUFRO0FBQ05DLHVCQUFLLG1CQURDO0FBRU5sQix3QkFBTTtBQUNKbUIsOEJBQVU7QUFETjtBQUZBLGlCQUFSLEVBS0dDLElBTEgsQ0FLUSxVQUFDQyxHQUFELEVBQVM7QUFDZix5QkFBS3BCLFNBQUwsR0FBaUJvQixJQUFJckIsSUFBckI7QUFDQSx5QkFBS0UsTUFBTCxHQUFjLENBQUNtQixJQUFJckIsSUFBSixDQUFTc0IsUUFBVixFQUFvQkQsSUFBSXJCLElBQUosQ0FBU3VCLElBQTdCLENBQWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBS3BCLElBQUwsR0FBWWtCLElBQUlyQixJQUFKLENBQVN3QixZQUFULENBQXNCQyxNQUF0QixDQUE2QixnQkFBUTtBQUMvQywyQkFBT0osSUFBSXJCLElBQUosQ0FBU0csSUFBVCxLQUFrQnVCLEtBQUtDLEVBQTlCO0FBQ0QsbUJBRlcsRUFFVCxDQUZTLEVBRU5DLFNBRk47QUFHQSx5QkFBS3hCLE9BQUwsR0FBZWlCLElBQUlyQixJQUFKLENBQVM2QixNQUF4QjtBQUNBLHlCQUFLeEIsUUFBTCxHQUFnQmdCLElBQUlyQixJQUFKLENBQVN3QixZQUF6QjtBQUNBLHlCQUFLWCxNQUFMO0FBQ0FKLDBCQUFRQyxHQUFSLENBQVksT0FBS0wsUUFBakI7QUFDRCxpQkFsQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0QytCLGVBQUt5QixJOztrQkFBbkJqQyxLIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuvue9ridcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICByZWdpb246IFsn5bm/5Lic55yBJywgJ+W5v+W3nuW4gicsICcnXSxcbiAgICB0eXBlOiAnJyxcbiAgICBjaGVja2VkOiB0cnVlLFxuICAgIHR5cGVMaXN0OiBbXVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFJlZ2lvbkNoYW5nZShlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICB0aGlzLnJlZ2lvbiA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAvLyB0aGlzLnNldERhdGEoe1xuICAgICAgLy8gICByZWdpb246IGUuZGV0YWlsLnZhbHVlXG4gICAgICAvLyB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5yZWdpb24pXG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlKSB7XG5cbiAgICB9LFxuICAgIGJpbmRPcGVuQ2hhbmdlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzd2l0Y2gxIOWPkeeUnyBjaGFuZ2Ug5LqL5Lu277yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgfSxcbiAgICBleGl0UXVuKCkge1xuXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmxvYWRJbmZvKClcblxuICB9XG5cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvc2V0dGluZycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiAwXG4gICAgICB9XG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLnJlZ2lvbiA9IFtyZXMuZGF0YS5wcm92aW5jZSwgcmVzLmRhdGEuY2l0eV1cbiAgICAgIC8vIHRoaXMudHlwZSA9IHJlcy5kYXRhLnR5cGVfbWFwcGluZy5tYXAoaXRlbSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKClcbiAgICAgIC8vIH0pXG4gICAgICB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEudHlwZSA9PT0gaXRlbS5pZFxuICAgICAgfSlbMF0udHlwZV9uYW1lXG4gICAgICB0aGlzLmNoZWNrZWQgPSByZXMuZGF0YS5pc19yZWNcbiAgICAgIHRoaXMudHlwZUxpc3QgPSByZXMuZGF0YS50eXBlX21hcHBpbmdcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZUxpc3QpXG4gICAgfSlcbiAgfVxufSJdfQ==