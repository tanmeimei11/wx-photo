'use strict';

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
      photoIdx: {
        type: Number,
        default: 0,
        twoWay: true
      }
    }, _this.data = {
      photoItemIdx: 0
    }, _this.methods = {
      swiperChange: function swiperChange(e) {
        this.photoItemIdx = e.detail.current;
        this.$apply();
      },
      downImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _api.downInternetUrl)(this.photos[this.photoItemIdx].url);

                case 2:
                case 'end':
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
        this.$emit('clearCurPhotos');
      }
    }, _this.watch = {
      photoIdx: function photoIdx(newValue, oldValue) {
        this.photoItemIdx = newValue;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by4xLmpzIl0sIm5hbWVzIjpbIlByZXZpZXdQaG90byIsInByb3BzIiwicGhvdG9zIiwiQXJyYXkiLCJwaG90b0lkeCIsInR5cGUiLCJOdW1iZXIiLCJkZWZhdWx0IiwidHdvV2F5IiwiZGF0YSIsInBob3RvSXRlbUlkeCIsIm1ldGhvZHMiLCJzd2lwZXJDaGFuZ2UiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsIiRhcHBseSIsImRvd25JbWFnZSIsInVybCIsImNsZWFyU3dpcGVyIiwiJGVtaXQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLGNBQVFDLEtBREY7QUFFTkMsZ0JBQVU7QUFDUkMsY0FBTUMsTUFERTtBQUVSQyxpQkFBUyxDQUZEO0FBR1JDLGdCQUFRO0FBSEE7QUFGSixLLFFBUVJDLEksR0FBTztBQUNMQyxvQkFBYztBQURULEssUUFHUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNLQyxDQURMLEVBQ1E7QUFDZCxhQUFLSCxZQUFMLEdBQW9CRyxFQUFFQyxNQUFGLENBQVNDLE9BQTdCO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BSk87QUFLRkMsZUFMRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQU1BLDBCQUFnQixLQUFLZixNQUFMLENBQVksS0FBS1EsWUFBakIsRUFBK0JRLEdBQS9DLENBTkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFRUkMsaUJBUlEseUJBUU07QUFDWixhQUFLQyxLQUFMLENBQVcsZ0JBQVg7QUFDRDtBQVZPLEssUUFZVkMsSyxHQUFRO0FBQ05qQixjQURNLG9CQUNHa0IsUUFESCxFQUNhQyxRQURiLEVBQ3VCO0FBQzNCLGFBQUtiLFlBQUwsR0FBb0JZLFFBQXBCO0FBQ0EsYUFBS04sTUFBTDtBQUNEO0FBSkssSzs7OztFQXhCZ0MsZUFBS1EsUzs7a0JBQTFCeEIsWSIsImZpbGUiOiJwcmV2aWV3UGhvdG8uMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBwaG90b3M6IEFycmF5LFxuICAgIHBob3RvSWR4OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfVxuICB9O1xuICBkYXRhID0ge1xuICAgIHBob3RvSXRlbUlkeDogMFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnBob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjbGVhckN1clBob3RvcycpXG4gICAgfVxuICB9O1xuICB3YXRjaCA9IHtcbiAgICBwaG90b0lkeChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gbmV3VmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH07XG59XG4iXX0=