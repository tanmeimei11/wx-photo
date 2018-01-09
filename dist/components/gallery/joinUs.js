'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinUs = function (_wepy$component) {
  _inherits(joinUs, _wepy$component);

  function joinUs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, joinUs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = joinUs.__proto__ || Object.getPrototypeOf(joinUs)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupID: String
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      intro: '',
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeApply');
      },
      typeintro: function typeintro(e) {
        this.intro = e.detail.value;
        this.checkBtn();
      },
      typewx: function typewx(e) {
        this.wx = e.detail.value;
        this.checkBtn();
      },
      submit: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.full) {
                    _context.next = 6;
                    break;
                  }

                  console.log(this.intro, this.wx);
                  _context.next = 4;
                  return (0, _login.request)({
                    url: '/gg/group/apply2join',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data: {
                      groupId: this.groupID,
                      bio: this.intro,
                      wx_id: this.wx
                    }
                  });

                case 4:
                  res = _context.sent;

                  if (res.succ) {
                    this.$apply();
                    this.toastSucc('申请成功！');
                    this.$emit('closeApply');
                  } else if (res.code === "-1") {
                    this.toastFail(res.msg);
                  }

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function submit() {
          return _ref2.apply(this, arguments);
        }

        return submit;
      }()
    }, _this.watch = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinUs, [{
    key: 'checkBtn',
    value: function checkBtn() {
      if (this.intro && this.wx) {
        this.full = true;
      } else {
        this.full = false;
      }
    }
  }]);

  return joinUs;
}(_wepy2.default.component);

exports.default = joinUs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJqb2luVXMiLCJwcm9wcyIsImdyb3VwSUQiLCJTdHJpbmciLCJtaXhpbnMiLCJkYXRhIiwiaW50cm8iLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsInR5cGVpbnRybyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNoZWNrQnRuIiwidHlwZXd4Iiwic3VibWl0IiwiY29uc29sZSIsImxvZyIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImdyb3VwSWQiLCJiaW8iLCJ3eF9pZCIsInJlcyIsInN1Y2MiLCIkYXBwbHkiLCJ0b2FzdFN1Y2MiLCJjb2RlIiwidG9hc3RGYWlsIiwibXNnIiwid2F0Y2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsTSxHQUFTLHdCLFFBQ1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLFlBQU07QUFIRCxLLFFBS1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLFlBQVg7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUVDLENBSkYsRUFJSztBQUNYLGFBQUtQLEtBQUwsR0FBYU8sRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVBPO0FBUVJDLFlBUlEsa0JBUURKLENBUkMsRUFRRTtBQUNSLGFBQUtOLEVBQUwsR0FBVU0sRUFBRUMsTUFBRixDQUFTQyxLQUFuQjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVhPO0FBWUZFLFlBWkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFhSCxLQUFLVixJQWJGO0FBQUE7QUFBQTtBQUFBOztBQWNKVywwQkFBUUMsR0FBUixDQUFZLEtBQUtkLEtBQWpCLEVBQXdCLEtBQUtDLEVBQTdCO0FBZEk7QUFBQSx5QkFlWSxvQkFBUTtBQUN0QmMseUJBQUssc0JBRGlCO0FBRXRCQyw0QkFBUSxNQUZjO0FBR3RCQyw0QkFBUTtBQUNOLHNDQUFnQjtBQURWLHFCQUhjO0FBTXRCbEIsMEJBQU07QUFDSm1CLCtCQUFTLEtBQUt0QixPQURWO0FBRUp1QiwyQkFBSyxLQUFLbkIsS0FGTjtBQUdKb0IsNkJBQU8sS0FBS25CO0FBSFI7QUFOZ0IsbUJBQVIsQ0FmWjs7QUFBQTtBQWVBb0IscUJBZkE7O0FBMkJKLHNCQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWix5QkFBS0MsTUFBTDtBQUNBLHlCQUFLQyxTQUFMLENBQWUsT0FBZjtBQUNBLHlCQUFLbkIsS0FBTCxDQUFXLFlBQVg7QUFDRCxtQkFKRCxNQUlPLElBQUlnQixJQUFJSSxJQUFKLEtBQWEsSUFBakIsRUFBdUI7QUFDNUIseUJBQUtDLFNBQUwsQ0FBZUwsSUFBSU0sR0FBbkI7QUFDRDs7QUFqQ0c7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLLFFBNENWQyxLLEdBQVEsRTs7Ozs7K0JBUEc7QUFDVCxVQUFJLEtBQUs1QixLQUFMLElBQWMsS0FBS0MsRUFBdkIsRUFBMkI7QUFDekIsYUFBS0MsSUFBTCxHQUFZLElBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxJQUFMLEdBQVksS0FBWjtBQUNEO0FBQ0Y7Ozs7RUFyRGlDLGVBQUsyQixTOztrQkFBcEJuQyxNIiwiZmlsZSI6ImpvaW5Vcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuICBpbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5VcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGdyb3VwSUQ6IFN0cmluZ1xuICAgIH07XG4gICAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gICAgZGF0YSA9IHtcbiAgICAgIGludHJvOiAnJyxcbiAgICAgIHd4OiAnJyxcbiAgICAgIGZ1bGw6IGZhbHNlXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlQXBwbHknKVxuICAgICAgfSxcbiAgICAgIHR5cGVpbnRybyhlKSB7XG4gICAgICAgIHRoaXMuaW50cm8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLmNoZWNrQnRuKClcbiAgICAgIH0sXG4gICAgICB0eXBld3goZSkge1xuICAgICAgICB0aGlzLnd4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5jaGVja0J0bigpXG4gICAgICB9LFxuICAgICAgYXN5bmMgc3VibWl0KCkge1xuICAgICAgICBpZih0aGlzLmZ1bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmludHJvLCB0aGlzLnd4KVxuICAgICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9hcHBseTJqb2luJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgICAgICAgIGJpbzogdGhpcy5pbnRybyxcbiAgICAgICAgICAgICAgd3hfaWQ6IHRoaXMud3hcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+eUs+ivt+aIkOWKn++8gScpXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZUFwcGx5JylcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jb2RlID09PSBcIi0xXCIpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RGYWlsKHJlcy5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBjaGVja0J0bigpIHtcbiAgICAgIGlmICh0aGlzLmludHJvICYmIHRoaXMud3gpIHtcbiAgICAgICAgdGhpcy5mdWxsID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mdWxsID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgd2F0Y2ggPSB7XG4gICAgfTtcbiAgfVxuIl19