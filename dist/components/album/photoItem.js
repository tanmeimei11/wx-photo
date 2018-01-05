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

var PhotoItem = function (_wepy$component) {
  _inherits(PhotoItem, _wepy$component);

  function PhotoItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhotoItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoItem.__proto__ || Object.getPrototypeOf(PhotoItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      photoItem: {}
    }, _this.data = {
      images: [
      // 'http://wd4.jiuyan.info/2015/04/22/ACEE75F2-8C6A-70FD-6A65-4F61950053C8.jpg?v=2',
      'http://wd4.jiuyan.info/2015/04/22/ACEE75F2-8C6A-70FD-6A65-4F61950053C8.jpg?v=2']
    }, _this.methods = {
      tap: function tap() {
        this.grouplist.name = 'Parent Random(' + Math.random() + ')';
        console.log('Clicked Group ' + this.$index + ', ID is ' + this.grouplist.id);
      },
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsImRhdGEiLCJpbWFnZXMiLCJtZXRob2RzIiwidGFwIiwiZ3JvdXBsaXN0IiwibmFtZSIsIk1hdGgiLCJyYW5kb20iLCJjb25zb2xlIiwibG9nIiwiJGluZGV4IiwiaWQiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVztBQURMLEssUUFHUkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTjtBQUNBLHNGQUZNO0FBREgsSyxRQU9QQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRjtBQUNKLGFBQUtDLFNBQUwsQ0FBZUMsSUFBZixzQkFBdUNDLEtBQUtDLE1BQUwsRUFBdkM7QUFDQUMsZ0JBQVFDLEdBQVIsb0JBQTZCLEtBQUtDLE1BQWxDLGdCQUFtRCxLQUFLTixTQUFMLENBQWVPLEVBQWxFO0FBQ0QsT0FKTztBQUtSQyxlQUxRLHVCQUtJLENBQUU7QUFMTixLOzs7O0VBWDJCLGVBQUtDLFM7O2tCQUF2QmhCLFMiLCJmaWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IHt9XHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgaW1hZ2VzOiBbXHJcbiAgICAgIC8vICdodHRwOi8vd2Q0LmppdXlhbi5pbmZvLzIwMTUvMDQvMjIvQUNFRTc1RjItOEM2QS03MEZELTZBNjUtNEY2MTk1MDA1M0M4LmpwZz92PTInLFxyXG4gICAgICAnaHR0cDovL3dkNC5qaXV5YW4uaW5mby8yMDE1LzA0LzIyL0FDRUU3NUYyLThDNkEtNzBGRC02QTY1LTRGNjE5NTAwNTNDOC5qcGc/dj0yJ1xyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB0YXAoKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBsaXN0Lm5hbWUgPSBgUGFyZW50IFJhbmRvbSgke01hdGgucmFuZG9tKCl9KWBcclxuICAgICAgY29uc29sZS5sb2coYENsaWNrZWQgR3JvdXAgJHt0aGlzLiRpbmRleH0sIElEIGlzICR7dGhpcy5ncm91cGxpc3QuaWR9YClcclxuICAgIH0sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19