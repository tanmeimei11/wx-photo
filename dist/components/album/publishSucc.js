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
      },
      print: function print() {
        this.$emit('publishPrintPhoto');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 混合


  return PublishSucc;
}(_wepy2.default.component);

exports.default = PublishSucc;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hTdWNjLmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2hTdWNjIiwicHJvcHMiLCJnYWxsZXJ5QXV0aCIsIk51bWJlciIsIm1peGlucyIsImRhdGEiLCJpbWFnZXMiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsInByaW50IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxLLEdBQVE7QUFDTkMsbUJBQWFDO0FBRFAsSyxRQUlSQyxNLEdBQVMsRSxRQUNUQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFHUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLQyxLQUFMLENBQVcsa0JBQVg7QUFDRCxPQUhPO0FBSVJDLFdBSlEsbUJBSUE7QUFDTixhQUFLRCxLQUFMLENBQVcsbUJBQVg7QUFDRDtBQU5PLEs7O0FBTFY7Ozs7RUFKdUMsZUFBS0UsUzs7a0JBQXpCWCxXIiwiZmlsZSI6InB1Ymxpc2hTdWNjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoU3VjYyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ2FsbGVyeUF1dGg6IE51bWJlclxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW107XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2VQdWJsaXNoU3VjYycpXG4gICAgfSxcbiAgICBwcmludCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQcmludFBob3RvJylcbiAgICB9XG4gIH07XG59XG4iXX0=