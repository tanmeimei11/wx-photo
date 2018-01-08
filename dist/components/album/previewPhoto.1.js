"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      photoIdx: Number
    }, _this.data = {}, _this.methods = {
      swiperChange: function swiperChange() {
        console.log(this.photoIdx);
      },
      downImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _api.downInternetUrl)(this.photos[0].url);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function downImage() {
          return _ref2.apply(this, arguments);
        }

        return downImage;
      }(),
      clearSwiper: function clearSwiper() {
        // console.log(this.photos)
        console.log("clearCurPhotos");
        this.$emit("clearCurPhotos");
      }
    }, _this.watch = {
      photos: function photos(newValue, oldValue) {
        console.log(this.index, this.photoIdx);
        console.log("num value:", oldValue, newValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by4xLmpzIl0sIm5hbWVzIjpbIlByZXZpZXdQaG90byIsInByb3BzIiwicGhvdG9zIiwiQXJyYXkiLCJwaG90b0lkeCIsIk51bWJlciIsImRhdGEiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiY29uc29sZSIsImxvZyIsImRvd25JbWFnZSIsInVybCIsImNsZWFyU3dpcGVyIiwiJGVtaXQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbmRleCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsY0FBUUMsS0FERjtBQUVOQyxnQkFBVUM7QUFGSixLLFFBSVJDLEksR0FBTyxFLFFBQ1BDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtOLFFBQWpCO0FBQ0QsT0FITztBQUlGTyxlQUpFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBS0EsMEJBQWdCLEtBQUtULE1BQUwsQ0FBWSxDQUFaLEVBQWVVLEdBQS9CLENBTEE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFPUkMsaUJBUFEseUJBT007QUFDWjtBQUNBSixnQkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0EsYUFBS0ksS0FBTCxDQUFXLGdCQUFYO0FBQ0Q7QUFYTyxLLFFBYVZDLEssR0FBUTtBQUNOYixZQURNLGtCQUNDYyxRQURELEVBQ1dDLFFBRFgsRUFDcUI7QUFDekJSLGdCQUFRQyxHQUFSLENBQVksS0FBS1EsS0FBakIsRUFBd0IsS0FBS2QsUUFBN0I7QUFDQUssZ0JBQVFDLEdBQVIsZUFBMEJPLFFBQTFCLEVBQW9DRCxRQUFwQztBQUNEO0FBSkssSzs7OztFQW5CZ0MsZUFBS0csUzs7a0JBQTFCbkIsWSIsImZpbGUiOiJwcmV2aWV3UGhvdG8uMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gXCIuLi8uLi91dGlscy9hcGkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGhvdG9zOiBBcnJheSxcbiAgICBwaG90b0lkeDogTnVtYmVyXG4gIH07XG4gIGRhdGEgPSB7fTtcbiAgbWV0aG9kcyA9IHtcbiAgICBzd2lwZXJDaGFuZ2UoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSWR4KTtcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnBob3Rvc1swXS51cmwpO1xuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBob3RvcylcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xlYXJDdXJQaG90b3NcIik7XG4gICAgICB0aGlzLiRlbWl0KFwiY2xlYXJDdXJQaG90b3NcIik7XG4gICAgfVxuICB9O1xuICB3YXRjaCA9IHtcbiAgICBwaG90b3MobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmluZGV4LCB0aGlzLnBob3RvSWR4KTtcbiAgICAgIGNvbnNvbGUubG9nKGBudW0gdmFsdWU6YCwgb2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH07XG59XG4iXX0=