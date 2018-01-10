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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInBob3RvcyIsIkFycmF5IiwicGhvdG9JZHgiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsInR3b1dheSIsIm1peGlucyIsImRhdGEiLCJwaG90b0l0ZW1JZHgiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCIkYXBwbHkiLCJkb3duSW1hZ2UiLCJsb2FkaW5nSW4iLCJ1cmwiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwidG9hc3RGYWlsIiwiY2xlYXJTd2lwZXIiLCIkZW1pdCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxjQUFRQyxLQURGO0FBRU5DLGdCQUFVO0FBQ1JDLGNBQU1DLE1BREU7QUFFUkMsaUJBQVMsQ0FGRDtBQUdSQyxnQkFBUTtBQUhBO0FBRkosSyxRQVFSQyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLG9CQUFjO0FBRFQsSyxRQUdQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ0tDLENBREwsRUFDUTtBQUNkLGFBQUtILFlBQUwsR0FBb0JHLEVBQUVDLE1BQUYsQ0FBU0MsT0FBN0I7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtGQyxlQUxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1OLHVCQUFLQyxTQUFMLENBQWUsTUFBZjtBQU5NO0FBQUE7QUFBQSx5QkFRRSwwQkFBZ0IsS0FBS2pCLE1BQUwsQ0FBWSxLQUFLUyxZQUFqQixFQUErQlMsR0FBL0MsQ0FSRjs7QUFBQTtBQVNKLHVCQUFLQyxVQUFMO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZSxNQUFmO0FBVkk7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBWUosdUJBQUtELFVBQUw7QUFDQSx1QkFBS0UsU0FBTCxDQUFlLE1BQWY7O0FBYkk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFnQlJDLGlCQWhCUSx5QkFnQk07QUFDWixhQUFLQyxLQUFMLENBQVcsZ0JBQVg7QUFDRDtBQWxCTyxLLFFBb0JWQyxLLEdBQVE7QUFDTnRCLGNBRE0sb0JBQ0d1QixRQURILEVBQ2FDLFFBRGIsRUFDdUI7QUFDM0IsYUFBS2pCLFlBQUwsR0FBb0JnQixRQUFwQjtBQUNBLGFBQUtWLE1BQUw7QUFDRDtBQUpLLEs7Ozs7RUFqQ2dDLGVBQUtZLFM7O2tCQUExQjdCLFkiLCJmaWxlIjoicHJldmlld1Bob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHBob3RvczogQXJyYXksXG4gICAgcGhvdG9JZHg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9XG4gIH07XG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xuICBkYXRhID0ge1xuICAgIHBob3RvSXRlbUlkeDogMFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xlYXJDdXJQaG90b3MnKVxuICAgIH1cbiAgfTtcbiAgd2F0Y2ggPSB7XG4gICAgcGhvdG9JZHgobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IG5ld1ZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9O1xufVxuIl19