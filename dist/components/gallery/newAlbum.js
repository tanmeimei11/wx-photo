'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var newAlbum = function (_wepy$component) {
  _inherits(newAlbum, _wepy$component);

  function newAlbum() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, newAlbum);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = newAlbum.__proto__ || Object.getPrototypeOf(newAlbum)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      title: '',
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeNewAlbum');
      },
      typetitle: function typetitle(e) {
        this.title = e.detail.value;
      },
      submit: function submit() {
        if (this.title) {
          console.log(this.title);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return newAlbum;
}(_wepy2.default.component);

exports.default = newAlbum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FsYnVtLmpzIl0sIm5hbWVzIjpbIm5ld0FsYnVtIiwiZGF0YSIsInRpdGxlIiwid3giLCJmdWxsIiwibWV0aG9kcyIsImNsb3NlIiwiJGVtaXQiLCJ0eXBldGl0bGUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzdWJtaXQiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxZQUFNO0FBSEQsSyxRQUtQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtDLEtBQUwsQ0FBVyxlQUFYO0FBQ0QsT0FITztBQUlSQyxlQUpRLHFCQUlFQyxDQUpGLEVBSUs7QUFDWCxhQUFLUCxLQUFMLEdBQWFPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRCxPQU5PO0FBT1JDLFlBUFEsb0JBT0M7QUFDUCxZQUFHLEtBQUtWLEtBQVIsRUFBZTtBQUNiVyxrQkFBUUMsR0FBUixDQUFZLEtBQUtaLEtBQWpCO0FBQ0Q7QUFDRjtBQVhPLEs7Ozs7RUFOMEIsZUFBS2EsUzs7a0JBQXRCZixRIiwiZmlsZSI6Im5ld0FsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBuZXdBbGJ1bSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgd3g6ICcnLFxuICAgICAgZnVsbDogZmFsc2VcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2VOZXdBbGJ1bScpXG4gICAgICB9LFxuICAgICAgdHlwZXRpdGxlKGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgc3VibWl0KCkge1xuICAgICAgICBpZih0aGlzLnRpdGxlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy50aXRsZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiJdfQ==