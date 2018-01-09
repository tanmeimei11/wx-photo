'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingMixin = function (_wepy$mixin) {
  _inherits(LoadingMixin, _wepy$mixin);

  function LoadingMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoadingMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingMixin.__proto__ || Object.getPrototypeOf(LoadingMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isSubmitFormId: true
    }, _this.methods = {
      formSubmit: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.isSubmitFormId) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return (0, _login.request)({
                    url: '/tmpl/formid/submit',
                    data: {
                      formId: e.detail.formId
                    }
                  });

                case 3:
                  res = _context.sent;

                  if (res.succ) {
                    console.log('发送成功');
                  } else {
                    this.isSubmitFormId = false;
                  }

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function formSubmit(_x) {
          return _ref2.apply(this, arguments);
        }

        return formSubmit;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return LoadingMixin;
}(_wepy2.default.mixin);

exports.default = LoadingMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm1TdWJtaXQuanMiXSwibmFtZXMiOlsiTG9hZGluZ01peGluIiwiZGF0YSIsImlzU3VibWl0Rm9ybUlkIiwibWV0aG9kcyIsImZvcm1TdWJtaXQiLCJlIiwidXJsIiwiZm9ybUlkIiwiZGV0YWlsIiwicmVzIiwic3VjYyIsImNvbnNvbGUiLCJsb2ciLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxJLEdBQU87QUFDTEMsc0JBQWdCO0FBRFgsSyxRQUdQQyxPLEdBQVU7QUFDRkMsZ0JBREU7QUFBQSw2RkFDU0MsQ0FEVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFRixLQUFLSCxjQUZIO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEseUJBR1ksb0JBQVE7QUFDdEJJLHlCQUFLLHFCQURpQjtBQUV0QkwsMEJBQU07QUFDSk0sOEJBQVFGLEVBQUVHLE1BQUYsQ0FBU0Q7QUFEYjtBQUZnQixtQkFBUixDQUhaOztBQUFBO0FBR0FFLHFCQUhBOztBQVNKLHNCQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWkMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0QsbUJBRkQsTUFFTztBQUNMLHlCQUFLVixjQUFMLEdBQXNCLEtBQXRCO0FBQ0Q7O0FBYkc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7O0VBSjhCLGVBQUtXLEs7O2tCQUExQmIsWSIsImZpbGUiOiJmb3JtU3VibWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ01peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGRhdGEgPSB7XG4gICAgaXNTdWJtaXRGb3JtSWQ6IHRydWVcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGFzeW5jIGZvcm1TdWJtaXQoZSkge1xuICAgICAgaWYgKHRoaXMuaXNTdWJtaXRGb3JtSWQpIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy90bXBsL2Zvcm1pZC9zdWJtaXQnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGZvcm1JZDogZS5kZXRhaWwuZm9ybUlkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn5Y+R6YCB5oiQ5YqfJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzU3VibWl0Rm9ybUlkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19