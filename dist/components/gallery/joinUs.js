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
                  } else if (res.code === '-1') {
                    this.toastFail(res.msg);
                  }

                case 6:

                  if (res.succ) {
                    this.groupInfo = res.data;
                    this.$apply();
                    console.log(this.groupInfo);
                  } else if (res.msg === '已经再群内') {}

                case 7:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJqb2luVXMiLCJwcm9wcyIsImdyb3VwSUQiLCJTdHJpbmciLCJtaXhpbnMiLCJkYXRhIiwiaW50cm8iLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsInR5cGVpbnRybyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNoZWNrQnRuIiwidHlwZXd4Iiwic3VibWl0IiwiY29uc29sZSIsImxvZyIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImdyb3VwSWQiLCJiaW8iLCJ3eF9pZCIsInJlcyIsInN1Y2MiLCIkYXBwbHkiLCJ0b2FzdFN1Y2MiLCJjb2RlIiwidG9hc3RGYWlsIiwibXNnIiwiZ3JvdXBJbmZvIiwid2F0Y2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsTSxHQUFTLHdCLFFBQ1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLFlBQU07QUFIRCxLLFFBS1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLFlBQVg7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUVDLENBSkYsRUFJSztBQUNYLGFBQUtQLEtBQUwsR0FBYU8sRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVBPO0FBUVJDLFlBUlEsa0JBUURKLENBUkMsRUFRRTtBQUNSLGFBQUtOLEVBQUwsR0FBVU0sRUFBRUMsTUFBRixDQUFTQyxLQUFuQjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVhPO0FBWUZFLFlBWkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFhRixLQUFLVixJQWJIO0FBQUE7QUFBQTtBQUFBOztBQWNKVywwQkFBUUMsR0FBUixDQUFZLEtBQUtkLEtBQWpCLEVBQXdCLEtBQUtDLEVBQTdCO0FBZEk7QUFBQSx5QkFlWSxvQkFBUTtBQUN0QmMseUJBQUssc0JBRGlCO0FBRXRCQyw0QkFBUSxNQUZjO0FBR3RCQyw0QkFBUTtBQUNOLHNDQUFnQjtBQURWLHFCQUhjO0FBTXRCbEIsMEJBQU07QUFDSm1CLCtCQUFTLEtBQUt0QixPQURWO0FBRUp1QiwyQkFBSyxLQUFLbkIsS0FGTjtBQUdKb0IsNkJBQU8sS0FBS25CO0FBSFI7QUFOZ0IsbUJBQVIsQ0FmWjs7QUFBQTtBQWVBb0IscUJBZkE7OztBQTRCSixzQkFBSUEsSUFBSUMsSUFBUixFQUFjO0FBQ1oseUJBQUtDLE1BQUw7QUFDQSx5QkFBS0MsU0FBTCxDQUFlLE9BQWY7QUFDQSx5QkFBS25CLEtBQUwsQ0FBVyxZQUFYO0FBQ0QsbUJBSkQsTUFJTyxJQUFJZ0IsSUFBSUksSUFBSixLQUFhLElBQWpCLEVBQXVCO0FBQzVCLHlCQUFLQyxTQUFMLENBQWVMLElBQUlNLEdBQW5CO0FBQ0Q7O0FBbENHOztBQXFDTixzQkFBSU4sSUFBSUMsSUFBUixFQUFjO0FBQ1oseUJBQUtNLFNBQUwsR0FBaUJQLElBQUl0QixJQUFyQjtBQUNBLHlCQUFLd0IsTUFBTDtBQUNBViw0QkFBUUMsR0FBUixDQUFZLEtBQUtjLFNBQWpCO0FBQ0QsbUJBSkQsTUFJTyxJQUFJUCxJQUFJTSxHQUFKLEtBQVksT0FBaEIsRUFBeUIsQ0FDL0I7O0FBMUNLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsSyxRQW9EVkUsSyxHQUFRLEU7Ozs7OytCQVBHO0FBQ1QsVUFBSSxLQUFLN0IsS0FBTCxJQUFjLEtBQUtDLEVBQXZCLEVBQTJCO0FBQ3pCLGFBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0EsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7O0VBN0RpQyxlQUFLNEIsUzs7a0JBQXBCcEMsTSIsImZpbGUiOiJqb2luVXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJztcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5VcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ3JvdXBJRDogU3RyaW5nXG4gIH07XG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xuICBkYXRhID0ge1xuICAgIGludHJvOiAnJyxcbiAgICB3eDogJycsXG4gICAgZnVsbDogZmFsc2VcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlQXBwbHknKVxuICAgIH0sXG4gICAgdHlwZWludHJvKGUpIHtcbiAgICAgIHRoaXMuaW50cm8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy5jaGVja0J0bigpXG4gICAgfSxcbiAgICB0eXBld3goZSkge1xuICAgICAgdGhpcy53eCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLmNoZWNrQnRuKClcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdCgpIHtcbiAgICAgIGlmICh0aGlzLmZ1bGwpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnRybywgdGhpcy53eClcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9ncm91cC9hcHBseTJqb2luJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgICAgICBiaW86IHRoaXMuaW50cm8sXG4gICAgICAgICAgICB3eF9pZDogdGhpcy53eFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+eUs+ivt+aIkOWKn++8gScpXG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2VBcHBseScpXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNvZGUgPT09ICctMScpIHtcbiAgICAgICAgICB0aGlzLnRvYXN0RmFpbChyZXMubXNnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgICB9IGVsc2UgaWYgKHJlcy5tc2cgPT09ICflt7Lnu4/lho3nvqTlhoUnKSB7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjaGVja0J0bigpIHtcbiAgICBpZiAodGhpcy5pbnRybyAmJiB0aGlzLnd4KSB7XG4gICAgICB0aGlzLmZ1bGwgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnVsbCA9IGZhbHNlXG4gICAgfVxuICB9XG4gIHdhdGNoID0ge307XG59XG4iXX0=