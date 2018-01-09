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
      this.loadInfo();
      this.groupID = options.id;
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
                    group_id: groupID
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsic2V0dGluZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZ3JvdXBJbmZvIiwicmVnaW9uIiwidHlwZSIsImNoZWNrZWQiLCJ0eXBlTGlzdCIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImJpbmRUeXBlQ2hhbmdlIiwiYmluZE9wZW5DaGFuZ2UiLCJleGl0UXVuIiwib3B0aW9ucyIsImxvYWRJbmZvIiwiZ3JvdXBJRCIsImlkIiwidXJsIiwiZ3JvdXBfaWQiLCJ0aGVuIiwicmVzIiwicHJvdmluY2UiLCJjaXR5IiwidHlwZV9tYXBwaW5nIiwiZmlsdGVyIiwiaXRlbSIsInR5cGVfbmFtZSIsImlzX3JlYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsY0FBUSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsRUFBZixDQUZIO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxlQUFTLElBSko7QUFLTEMsZ0JBQVU7QUFMTCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxzQkFEUSw0QkFDU0MsQ0FEVCxFQUNZO0FBQ2xCQyxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRixFQUFFRyxNQUFGLENBQVNDLEtBQTFDO0FBQ0EsYUFBS1YsTUFBTCxHQUFjTSxFQUFFRyxNQUFGLENBQVNDLEtBQXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBS0MsTUFBTDtBQUNBSixnQkFBUUMsR0FBUixDQUFZLEtBQUtSLE1BQWpCO0FBQ0QsT0FUTztBQVVSWSxvQkFWUSwwQkFVT04sQ0FWUCxFQVVVLENBRWpCLENBWk87QUFhUk8sb0JBYlEsMEJBYU9QLENBYlAsRUFhVTtBQUNoQkMsZ0JBQVFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q0YsRUFBRUcsTUFBRixDQUFTQyxLQUFsRDtBQUNELE9BZk87QUFnQlJJLGFBaEJRLHFCQWdCRSxDQUVUO0FBbEJPLEs7Ozs7OzJCQW9CSEMsTyxFQUFTO0FBQ2QsV0FBS0MsUUFBTDtBQUNBLFdBQUtDLE9BQUwsR0FBZUYsUUFBUUcsRUFBdkI7QUFDRDs7Ozs7Ozs7Ozs7QUFHQyxvQ0FBUTtBQUNOQyx1QkFBSyxtQkFEQztBQUVOckIsd0JBQU07QUFDSnNCLDhCQUFVSDtBQUROO0FBRkEsaUJBQVIsRUFLR0ksSUFMSCxDQUtRLFVBQUNDLEdBQUQsRUFBUztBQUNmLHlCQUFLdkIsU0FBTCxHQUFpQnVCLElBQUl4QixJQUFyQjtBQUNBLHlCQUFLRSxNQUFMLEdBQWMsQ0FBQ3NCLElBQUl4QixJQUFKLENBQVN5QixRQUFWLEVBQW9CRCxJQUFJeEIsSUFBSixDQUFTMEIsSUFBN0IsQ0FBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFLdkIsSUFBTCxHQUFZcUIsSUFBSXhCLElBQUosQ0FBUzJCLFlBQVQsQ0FBc0JDLE1BQXRCLENBQTZCLGdCQUFRO0FBQy9DLDJCQUFPSixJQUFJeEIsSUFBSixDQUFTRyxJQUFULEtBQWtCMEIsS0FBS1QsRUFBOUI7QUFDRCxtQkFGVyxFQUVULENBRlMsRUFFTlUsU0FGTjtBQUdBLHlCQUFLMUIsT0FBTCxHQUFlb0IsSUFBSXhCLElBQUosQ0FBUytCLE1BQXhCO0FBQ0EseUJBQUsxQixRQUFMLEdBQWdCbUIsSUFBSXhCLElBQUosQ0FBUzJCLFlBQXpCO0FBQ0EseUJBQUtkLE1BQUw7QUFDQUosMEJBQVFDLEdBQVIsQ0FBWSxPQUFLTCxRQUFqQjtBQUNELGlCQWxCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRDaUMsZUFBSzJCLEk7O2tCQUFyQm5DLE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZXR0aW5nIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSW5mbzoge30sXG4gICAgcmVnaW9uOiBbJ+W5v+S4nOecgScsICflub/lt57luIInLCAnJ10sXG4gICAgdHlwZTogJycsXG4gICAgY2hlY2tlZDogdHJ1ZSxcbiAgICB0eXBlTGlzdDogW11cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRSZWdpb25DaGFuZ2UoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BpY2tlcuWPkemAgemAieaLqeaUueWPmO+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgdGhpcy5yZWdpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgLy8gdGhpcy5zZXREYXRhKHtcbiAgICAgIC8vICAgcmVnaW9uOiBlLmRldGFpbC52YWx1ZVxuICAgICAgLy8gfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVnaW9uKVxuICAgIH0sXG4gICAgYmluZFR5cGVDaGFuZ2UoZSkge1xuXG4gICAgfSxcbiAgICBiaW5kT3BlbkNoYW5nZShlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3dpdGNoMSDlj5HnlJ8gY2hhbmdlIOS6i+S7tu+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgIH0sXG4gICAgZXhpdFF1bigpIHtcblxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMubG9hZEluZm8oKVxuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgfVxuXG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL3NldHRpbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy5yZWdpb24gPSBbcmVzLmRhdGEucHJvdmluY2UsIHJlcy5kYXRhLmNpdHldXG4gICAgICAvLyB0aGlzLnR5cGUgPSByZXMuZGF0YS50eXBlX21hcHBpbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygpXG4gICAgICAvLyB9KVxuICAgICAgdGhpcy50eXBlID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhLnR5cGUgPT09IGl0ZW0uaWRcbiAgICAgIH0pWzBdLnR5cGVfbmFtZVxuICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuaXNfcmVjXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gcmVzLmRhdGEudHlwZV9tYXBwaW5nXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVMaXN0KVxuICAgIH0pXG4gIH1cbn0iXX0=