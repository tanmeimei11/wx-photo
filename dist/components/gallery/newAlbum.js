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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = newAlbum.__proto__ || Object.getPrototypeOf(newAlbum)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      newAlbumTitle: String,
      galleryTitle: String
    }, _this.data = {
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeNewAlbum');
      },
      typetitle: function typetitle(e) {
        this.galleryTitle = e.detail.value;
      },
      submit: function submit() {
        if (this.title) {
          this.$emit('submitTitle', this.galleryTitle);
          console.log(this.title);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return newAlbum;
}(_wepy2.default.component);

exports.default = newAlbum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FsYnVtLmpzIl0sIm5hbWVzIjpbIm5ld0FsYnVtIiwicHJvcHMiLCJuZXdBbGJ1bVRpdGxlIiwiU3RyaW5nIiwiZ2FsbGVyeVRpdGxlIiwiZGF0YSIsInd4IiwiZnVsbCIsIm1ldGhvZHMiLCJjbG9zZSIsIiRlbWl0IiwidHlwZXRpdGxlIiwiZSIsImRldGFpbCIsInZhbHVlIiwic3VibWl0IiwidGl0bGUiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxLLEdBQVE7QUFDTkMscUJBQWVDLE1BRFQ7QUFFTkMsb0JBQWNEO0FBRlIsSyxRQUlSRSxJLEdBQU87QUFDTEMsVUFBSSxFQURDO0FBRUxDLFlBQU07QUFGRCxLLFFBSVBDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLGVBQVg7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUVDLENBSkYsRUFJSztBQUNYLGFBQUtSLFlBQUwsR0FBb0JRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBN0I7QUFDRCxPQU5PO0FBT1JDLFlBUFEsb0JBT0M7QUFDUCxZQUFJLEtBQUtDLEtBQVQsRUFBZ0I7QUFDZCxlQUFLTixLQUFMLENBQVcsYUFBWCxFQUEwQixLQUFLTixZQUEvQjtBQUNBYSxrQkFBUUMsR0FBUixDQUFZLEtBQUtGLEtBQWpCO0FBQ0Q7QUFDRjtBQVpPLEs7Ozs7RUFUMEIsZUFBS0csUzs7a0JBQXRCbkIsUSIsImZpbGUiOiJuZXdBbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBuZXdBbGJ1bSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgbmV3QWxidW1UaXRsZTogU3RyaW5nLFxuICAgIGdhbGxlcnlUaXRsZTogU3RyaW5nXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgd3g6ICcnLFxuICAgIGZ1bGw6IGZhbHNlXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjbG9zZU5ld0FsYnVtJylcbiAgICB9LFxuICAgIHR5cGV0aXRsZShlKSB7XG4gICAgICB0aGlzLmdhbGxlcnlUaXRsZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdzdWJtaXRUaXRsZScsIHRoaXMuZ2FsbGVyeVRpdGxlKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRpdGxlKVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==