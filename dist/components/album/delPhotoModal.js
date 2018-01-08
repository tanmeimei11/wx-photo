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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbFBob3RvTW9kYWwuanMiXSwibmFtZXMiOlsiUHJldmlld1Bob3RvIiwicHJvcHMiLCJwaG90b3MiLCJBcnJheSIsInBob3RvSWR4IiwiTnVtYmVyIiwiZGF0YSIsIm1ldGhvZHMiLCJzd2lwZXJDaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiZG93bkltYWdlIiwidXJsIiwiY2xlYXJTd2lwZXIiLCIkZW1pdCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluZGV4IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxjQUFRQyxLQURGO0FBRU5DLGdCQUFVQztBQUZKLEssUUFJUkMsSSxHQUFPLEUsUUFDUEMsTyxHQUFVO0FBQ1JDLGtCQURRLDBCQUNPO0FBQ2JDLGdCQUFRQyxHQUFSLENBQVksS0FBS04sUUFBakI7QUFDRCxPQUhPO0FBSUZPLGVBSkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFLQSwwQkFBZ0IsS0FBS1QsTUFBTCxDQUFZLENBQVosRUFBZVUsR0FBL0IsQ0FMQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQU9SQyxpQkFQUSx5QkFPTTtBQUNaO0FBQ0FKLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxhQUFLSSxLQUFMLENBQVcsZ0JBQVg7QUFDRDtBQVhPLEssUUFhVkMsSyxHQUFRO0FBQ05iLFlBRE0sa0JBQ0NjLFFBREQsRUFDV0MsUUFEWCxFQUNxQjtBQUN6QlIsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLUSxLQUFqQixFQUF3QixLQUFLZCxRQUE3QjtBQUNBSyxnQkFBUUMsR0FBUixlQUEwQk8sUUFBMUIsRUFBb0NELFFBQXBDO0FBQ0Q7QUFKSyxLOzs7O0VBbkJnQyxlQUFLRyxTOztrQkFBMUJuQixZIiwiZmlsZSI6ImRlbFBob3RvTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHBob3RvczogQXJyYXksXG4gICAgcGhvdG9JZHg6IE51bWJlclxuICB9O1xuICBkYXRhID0ge307XG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0lkeCk7XG4gICAgfSxcbiAgICBhc3luYyBkb3duSW1hZ2UoKSB7XG4gICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwodGhpcy5waG90b3NbMF0udXJsKTtcbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5waG90b3MpXG4gICAgICBjb25zb2xlLmxvZyhcImNsZWFyQ3VyUGhvdG9zXCIpO1xuICAgICAgdGhpcy4kZW1pdChcImNsZWFyQ3VyUGhvdG9zXCIpO1xuICAgIH1cbiAgfTtcbiAgd2F0Y2ggPSB7XG4gICAgcGhvdG9zKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5pbmRleCwgdGhpcy5waG90b0lkeCk7XG4gICAgICBjb25zb2xlLmxvZyhgbnVtIHZhbHVlOmAsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9O1xufVxuIl19