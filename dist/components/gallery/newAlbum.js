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
        if (this.galleryTitle) {
          console.log(this.galleryTitle);
          this.$emit('submitTitle', this.galleryTitle);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return newAlbum;
}(_wepy2.default.component);

exports.default = newAlbum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FsYnVtLmpzIl0sIm5hbWVzIjpbIm5ld0FsYnVtIiwicHJvcHMiLCJuZXdBbGJ1bVRpdGxlIiwiU3RyaW5nIiwiZ2FsbGVyeVRpdGxlIiwiZGF0YSIsInd4IiwiZnVsbCIsIm1ldGhvZHMiLCJjbG9zZSIsIiRlbWl0IiwidHlwZXRpdGxlIiwiZSIsImRldGFpbCIsInZhbHVlIiwic3VibWl0IiwiY29uc29sZSIsImxvZyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsSyxHQUFRO0FBQ05DLHFCQUFlQyxNQURUO0FBRU5DLG9CQUFjRDtBQUZSLEssUUFJUkUsSSxHQUFPO0FBQ0xDLFVBQUksRUFEQztBQUVMQyxZQUFNO0FBRkQsSyxRQUlQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtDLEtBQUwsQ0FBVyxlQUFYO0FBQ0QsT0FITztBQUlSQyxlQUpRLHFCQUlFQyxDQUpGLEVBSUs7QUFDWCxhQUFLUixZQUFMLEdBQW9CUSxFQUFFQyxNQUFGLENBQVNDLEtBQTdCO0FBQ0QsT0FOTztBQU9SQyxZQVBRLG9CQU9DO0FBQ1AsWUFBSSxLQUFLWCxZQUFULEVBQXVCO0FBQ3JCWSxrQkFBUUMsR0FBUixDQUFZLEtBQUtiLFlBQWpCO0FBQ0EsZUFBS00sS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBS04sWUFBL0I7QUFDRDtBQUNGO0FBWk8sSzs7OztFQVQwQixlQUFLYyxTOztrQkFBdEJsQixRIiwiZmlsZSI6Im5ld0FsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5ld0FsYnVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBuZXdBbGJ1bVRpdGxlOiBTdHJpbmcsXG4gICAgZ2FsbGVyeVRpdGxlOiBTdHJpbmdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB3eDogJycsXG4gICAgZnVsbDogZmFsc2VcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlTmV3QWxidW0nKVxuICAgIH0sXG4gICAgdHlwZXRpdGxlKGUpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gZS5kZXRhaWwudmFsdWVcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlUaXRsZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbGxlcnlUaXRsZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnc3VibWl0VGl0bGUnLCB0aGlzLmdhbGxlcnlUaXRsZSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=