'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var printerPhoto = function (_wepy$component) {
  _inherits(printerPhoto, _wepy$component);

  function printerPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, printerPhoto);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = printerPhoto.__proto__ || Object.getPrototypeOf(printerPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupId: String
    }, _this.data = {
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closePrinterPhotoModal');
      },
      goEdit: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _wepy2.default.navigateTo({
                    url: '/pages/setting/setting?id=' + this.groupId
                  });

                case 2:
                  this.$emit('closePrinterPhotoModal');

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function goEdit() {
          return _ref2.apply(this, arguments);
        }

        return goEdit;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return printerPhoto;
}(_wepy2.default.component);

exports.default = printerPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50ZXJQaG90by5qcyJdLCJuYW1lcyI6WyJwcmludGVyUGhvdG8iLCJwcm9wcyIsImdyb3VwSWQiLCJTdHJpbmciLCJkYXRhIiwid3giLCJmdWxsIiwibWV0aG9kcyIsImNsb3NlIiwiJGVtaXQiLCJnb0VkaXQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsSSxHQUFPO0FBQ0xDLFVBQUksRUFEQztBQUVMQyxZQUFNO0FBRkQsSyxRQUlQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtDLEtBQUwsQ0FBVyx3QkFBWDtBQUNELE9BSE87QUFJRkMsWUFKRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUtBLGVBQUtDLFVBQUwsQ0FBZ0I7QUFDcEJDLHdEQUFrQyxLQUFLVjtBQURuQixtQkFBaEIsQ0FMQTs7QUFBQTtBQVFOLHVCQUFLTyxLQUFMLENBQVcsd0JBQVg7O0FBUk07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7O0VBUjhCLGVBQUtJLFM7O2tCQUExQmIsWSIsImZpbGUiOiJwcmludGVyUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcHJpbnRlclBob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBncm91cElkOiBTdHJpbmdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB3eDogJycsXG4gICAgZnVsbDogZmFsc2VcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlUHJpbnRlclBob3RvTW9kYWwnKVxuICAgIH0sXG4gICAgYXN5bmMgZ29FZGl0KCkge1xuICAgICAgYXdhaXQgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJZH1gXG4gICAgICB9KVxuICAgICAgdGhpcy4kZW1pdCgnY2xvc2VQcmludGVyUGhvdG9Nb2RhbCcpXG4gICAgfVxuICB9O1xufVxuIl19