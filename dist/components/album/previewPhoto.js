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
      photos: Array,
      index: 0
    }, _this.data = {}, _this.methods = {
      swiperChange: function swiperChange() {},
      downImage: function downImage() {},
      clearSwiper: function clearSwiper() {
        console.log(this.photos);
        console.log('clearCurPhotos');
        // this.$emit('clearCurPhotos')
      }
    }, _this.watch = {
      photos: function photos(newValue, oldValue) {
        console.log('num value: ' + oldValue + ' -> ' + newValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInBob3RvcyIsIkFycmF5IiwiaW5kZXgiLCJkYXRhIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImRvd25JbWFnZSIsImNsZWFyU3dpcGVyIiwiY29uc29sZSIsImxvZyIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLGNBQVFDLEtBREY7QUFFTkMsYUFBTztBQUZELEssUUFJUkMsSSxHQUFPLEUsUUFDUEMsTyxHQUFVO0FBQ1JDLGtCQURRLDBCQUNPLENBQUUsQ0FEVDtBQUVSQyxlQUZRLHVCQUVJLENBQUUsQ0FGTjtBQUdSQyxpQkFIUSx5QkFHTTtBQUNaQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtULE1BQWpCO0FBQ0FRLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQTtBQUNEO0FBUE8sSyxRQVNWQyxLLEdBQVE7QUFDTlYsWUFETSxrQkFDQ1csUUFERCxFQUNXQyxRQURYLEVBQ3FCO0FBQ3pCSixnQkFBUUMsR0FBUixpQkFBMEJHLFFBQTFCLFlBQXlDRCxRQUF6QztBQUNEO0FBSEssSzs7OztFQWZnQyxlQUFLRSxTOztrQkFBMUJmLFkiLCJmaWxlIjoicHJldmlld1Bob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGhvdG9zOiBBcnJheSxcbiAgICBpbmRleDogMFxuICB9O1xuICBkYXRhID0ge307XG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKCkge30sXG4gICAgZG93bkltYWdlKCkge30sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvcylcbiAgICAgIGNvbnNvbGUubG9nKCdjbGVhckN1clBob3RvcycpXG4gICAgICAvLyB0aGlzLiRlbWl0KCdjbGVhckN1clBob3RvcycpXG4gICAgfVxuICB9O1xuICB3YXRjaCA9IHtcbiAgICBwaG90b3MobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgbnVtIHZhbHVlOiAke29sZFZhbHVlfSAtPiAke25ld1ZhbHVlfWApXG4gICAgfVxuICB9O1xufVxuIl19