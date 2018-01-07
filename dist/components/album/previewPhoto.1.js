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

var PreviewPhoto = function (_wepy$component) {
  _inherits(PreviewPhoto, _wepy$component);

  function PreviewPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PreviewPhoto);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      photos: {
        type: Array,
        default: []
      },
      index: 0
    }, _this.data = {}, _this.methods = {
      swiperChange: function swiperChange() {},
      downImage: function downImage() {}
    }, _this.watch = {
      photos: function photos(newValue, oldValue) {
        console.log('num value: ' + oldValue + ' -> ' + newValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by4xLmpzIl0sIm5hbWVzIjpbIlByZXZpZXdQaG90byIsInByb3BzIiwicGhvdG9zIiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsImluZGV4IiwiZGF0YSIsIm1ldGhvZHMiLCJzd2lwZXJDaGFuZ2UiLCJkb3duSW1hZ2UiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsY0FBUTtBQUNOQyxjQUFNQyxLQURBO0FBRU5DLGlCQUFTO0FBRkgsT0FERjtBQUtOQyxhQUFPO0FBTEQsSyxRQU9SQyxJLEdBQU8sRSxRQUNQQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ08sQ0FBRSxDQURUO0FBRVJDLGVBRlEsdUJBRUksQ0FBRTtBQUZOLEssUUFJVkMsSyxHQUFRO0FBQ05ULFlBRE0sa0JBQ0NVLFFBREQsRUFDV0MsUUFEWCxFQUNxQjtBQUN6QkMsZ0JBQVFDLEdBQVIsaUJBQTBCRixRQUExQixZQUF5Q0QsUUFBekM7QUFDRDtBQUhLLEs7Ozs7RUFiZ0MsZUFBS0ksUzs7a0JBQTFCaEIsWSIsImZpbGUiOiJwcmV2aWV3UGhvdG8uMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHBob3Rvczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBbXVxuICAgIH0sXG4gICAgaW5kZXg6IDBcbiAgfTtcbiAgZGF0YSA9IHt9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZSgpIHt9LFxuICAgIGRvd25JbWFnZSgpIHt9XG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBob3RvcyhuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBudW0gdmFsdWU6ICR7b2xkVmFsdWV9IC0+ICR7bmV3VmFsdWV9YClcbiAgICB9XG4gIH07XG59XG4iXX0=