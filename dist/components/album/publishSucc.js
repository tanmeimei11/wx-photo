'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishSucc = function (_wepy$component) {
  _inherits(PublishSucc, _wepy$component);

  function PublishSucc() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishSucc);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishSucc.__proto__ || Object.getPrototypeOf(PublishSucc)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number
    }, _this.mixins = [], _this.data = {
      images: []
    }, _this.methods = {
      close: function close() {
        this.$emit('closePublishSucc');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 混合


  return PublishSucc;
}(_wepy2.default.component);

exports.default = PublishSucc;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hTdWNjLmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2hTdWNjIiwicHJvcHMiLCJnYWxsZXJ5QXV0aCIsIk51bWJlciIsIm1peGlucyIsImRhdGEiLCJpbWFnZXMiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQztBQURQLEssUUFJUkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLGtCQUFYO0FBQ0Q7QUFITyxLOztBQUxWOzs7O0VBSnVDLGVBQUtDLFM7O2tCQUF6QlYsVyIsImZpbGUiOiJwdWJsaXNoU3VjYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaFN1Y2MgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXJcbiAgfTtcbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtdO1xuICBkYXRhID0ge1xuICAgIGltYWdlczogW11cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlUHVibGlzaFN1Y2MnKVxuICAgIH0sXG4gIH07XG5cbn1cbiJdfQ==