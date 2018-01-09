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

var formSubmitMixin = function (_wepy$mixin) {
  _inherits(formSubmitMixin, _wepy$mixin);

  function formSubmitMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, formSubmitMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = formSubmitMixin.__proto__ || Object.getPrototypeOf(formSubmitMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
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
                    // console.log('发送成功')
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

  return formSubmitMixin;
}(_wepy2.default.mixin);

exports.default = formSubmitMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm1TdWJtaXRNaXhpbi5qcyJdLCJuYW1lcyI6WyJmb3JtU3VibWl0TWl4aW4iLCJkYXRhIiwiaXNTdWJtaXRGb3JtSWQiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ1cmwiLCJmb3JtSWQiLCJkZXRhaWwiLCJyZXMiLCJzdWNjIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLGU7Ozs7Ozs7Ozs7Ozs7O3dNQUNuQkMsSSxHQUFPO0FBQ0xDLHNCQUFnQjtBQURYLEssUUFHUEMsTyxHQUFVO0FBQ0ZDLGdCQURFO0FBQUEsNkZBQ1NDLENBRFQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUYsS0FBS0gsY0FGSDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQUdZLG9CQUFRO0FBQ3RCSSx5QkFBSyxxQkFEaUI7QUFFdEJMLDBCQUFNO0FBQ0pNLDhCQUFRRixFQUFFRyxNQUFGLENBQVNEO0FBRGI7QUFGZ0IsbUJBQVIsQ0FIWjs7QUFBQTtBQUdBRSxxQkFIQTs7QUFTSixzQkFBSUEsSUFBSUMsSUFBUixFQUFjO0FBQ1o7QUFDRCxtQkFGRCxNQUVPO0FBQ0wseUJBQUtSLGNBQUwsR0FBc0IsS0FBdEI7QUFDRDs7QUFiRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7RUFKaUMsZUFBS1MsSzs7a0JBQTdCWCxlIiwiZmlsZSI6ImZvcm1TdWJtaXRNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvcm1TdWJtaXRNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICBkYXRhID0ge1xuICAgIGlzU3VibWl0Rm9ybUlkOiB0cnVlXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBhc3luYyBmb3JtU3VibWl0KGUpIHtcbiAgICAgIGlmICh0aGlzLmlzU3VibWl0Rm9ybUlkKSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvdG1wbC9mb3JtaWQvc3VibWl0JyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBmb3JtSWQ6IGUuZGV0YWlsLmZvcm1JZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WPkemAgeaIkOWKnycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc1N1Ym1pdEZvcm1JZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==