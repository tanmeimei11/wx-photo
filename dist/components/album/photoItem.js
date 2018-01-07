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
      photoItem: []
    }, _this.data = {
      images: [
      // 'http://wd4.jiuyan.info/2015/04/22/ACEE75F2-8C6A-70FD-6A65-4F61950053C8.jpg?v=2',
      'http://wd4.jiuyan.info/2015/04/22/ACEE75F2-8C6A-70FD-6A65-4F61950053C8.jpg?v=2']
    }, _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        console.log(this.photoItem.photo, _photoIdx);
        this.$emit('changeCurPhotos', this.photoItem.photo, _photoIdx);
      },
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsImRhdGEiLCJpbWFnZXMiLCJtZXRob2RzIiwiY2xpY2tJbWFnZSIsImUiLCJfcGhvdG9JZHgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwicGhvdG8iLCIkZW1pdCIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXO0FBREwsSyxRQUdSQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOO0FBQ0Esc0ZBRk07QUFESCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsQ0FESCxFQUNNO0FBQ1osWUFBSUMsWUFBWUQsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUFqQztBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtYLFNBQUwsQ0FBZVksS0FBM0IsRUFBa0NOLFNBQWxDO0FBQ0EsYUFBS08sS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUtiLFNBQUwsQ0FBZVksS0FBN0MsRUFBb0ROLFNBQXBEO0FBQ0QsT0FMTztBQU1SUSxTQU5RLGlCQU1GLENBQUUsQ0FOQTtBQU9SQyxlQVBRLHVCQU9JLENBQUU7QUFQTixLOzs7O0VBWDJCLGVBQUtDLFM7O2tCQUF2QmxCLFMiLCJmaWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgaW1hZ2VzOiBbXHJcbiAgICAgIC8vICdodHRwOi8vd2Q0LmppdXlhbi5pbmZvLzIwMTUvMDQvMjIvQUNFRTc1RjItOEM2QS03MEZELTZBNjUtNEY2MTk1MDA1M0M4LmpwZz92PTInLFxyXG4gICAgICAnaHR0cDovL3dkNC5qaXV5YW4uaW5mby8yMDE1LzA0LzIyL0FDRUU3NUYyLThDNkEtNzBGRC02QTY1LTRGNjE5NTAwNTNDOC5qcGc/dj0yJ1xyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0ltYWdlKGUpIHtcclxuICAgICAgdmFyIF9waG90b0lkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW0ucGhvdG8sIF9waG90b0lkeClcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG8sIF9waG90b0lkeClcclxuICAgIH0sXHJcbiAgICB0YXAoKSB7fSxcclxuICAgIGRvd25JbWFnZSgpIHt9XHJcbiAgfTtcclxufVxyXG4iXX0=