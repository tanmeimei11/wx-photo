'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewPhoto = function (_wepy$component) {
  _inherits(PreviewPhoto, _wepy$component);

  // watch = {
  //   photoIdx(newValue, oldValue) {
  //     console.log(newValue)
  //     this.photoItemIdx = newValue
  //     this.$apply()
  //   },
  //   photos(newValue) {
  //     console.log('change value')
  //     console.log(newValue)
  //   }
  // };
  function PreviewPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PreviewPhoto);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      previewPhotos: Array,
      photoIdx: Number
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
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
                  this.loadingIn('正在下载');
                  _context.prev = 1;
                  _context.next = 4;
                  return (0, _api.downInternetUrl)(this.photos[this.photoItemIdx].url);

                case 4:
                  this.loadingOut();
                  this.toastSucc('下载成功');
                  _context.next = 12;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](1);

                  this.loadingOut();
                  this.toastFail('下载失败');

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function downImage() {
          return _ref2.apply(this, arguments);
        }

        return downImage;
      }(),
      clearSwiper: function clearSwiper() {
        this.photoItemIdx = 0;
        this.$emit('clearCurPhotos');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInByZXZpZXdQaG90b3MiLCJBcnJheSIsInBob3RvSWR4IiwiTnVtYmVyIiwibWl4aW5zIiwiZGF0YSIsInBob3RvSXRlbUlkeCIsIm1ldGhvZHMiLCJzd2lwZXJDaGFuZ2UiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInBob3RvcyIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFk7OztBQThCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O2tNQXZDQUMsSyxHQUFRO0FBQ05DLHFCQUFlQyxLQURUO0FBRU5DLGdCQUFVQztBQUZKLEssUUFJUkMsTSxHQUFTLHdCLFFBQ1RDLEksR0FBTztBQUNMQyxvQkFBYztBQURULEssUUFHUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNLQyxDQURMLEVBQ1E7QUFDZCxhQUFLSCxZQUFMLEdBQW9CRyxFQUFFQyxNQUFGLENBQVNDLE9BQTdCO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BSk87QUFLRkMsZUFMRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNTix1QkFBS0MsU0FBTCxDQUFlLE1BQWY7QUFOTTtBQUFBO0FBQUEseUJBUUUsMEJBQWdCLEtBQUtDLE1BQUwsQ0FBWSxLQUFLVCxZQUFqQixFQUErQlUsR0FBL0MsQ0FSRjs7QUFBQTtBQVNKLHVCQUFLQyxVQUFMO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZSxNQUFmO0FBVkk7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBWUosdUJBQUtELFVBQUw7QUFDQSx1QkFBS0UsU0FBTCxDQUFlLE1BQWY7O0FBYkk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFnQlJDLGlCQWhCUSx5QkFnQk07QUFDWixhQUFLZCxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsYUFBS2UsS0FBTCxDQUFXLGdCQUFYO0FBQ0Q7QUFuQk8sSzs7OztFQVQ4QixlQUFLQyxTOztrQkFBMUJ4QixZIiwiZmlsZSI6InByZXZpZXdQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBwcmV2aWV3UGhvdG9zOiBBcnJheSxcbiAgICBwaG90b0lkeDogTnVtYmVyXG4gIH07XG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xuICBkYXRhID0ge1xuICAgIHBob3RvSXRlbUlkeDogMFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSAwXG4gICAgICB0aGlzLiRlbWl0KCdjbGVhckN1clBob3RvcycpXG4gICAgfVxuICB9O1xuICAvLyB3YXRjaCA9IHtcbiAgLy8gICBwaG90b0lkeChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlKVxuICAvLyAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBuZXdWYWx1ZVxuICAvLyAgICAgdGhpcy4kYXBwbHkoKVxuICAvLyAgIH0sXG4gIC8vICAgcGhvdG9zKG5ld1ZhbHVlKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZhbHVlJylcbiAgLy8gICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlKVxuICAvLyAgIH1cbiAgLy8gfTtcbn1cbiJdfQ==