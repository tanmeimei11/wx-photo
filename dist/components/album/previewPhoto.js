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
      previewPhotos: []
      // photoIdx: Number
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      photoIdx: 0,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInByZXZpZXdQaG90b3MiLCJtaXhpbnMiLCJkYXRhIiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCIkYXBwbHkiLCJkb3duSW1hZ2UiLCJsb2FkaW5nSW4iLCJwaG90b3MiLCJ1cmwiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwidG9hc3RGYWlsIiwiY2xlYXJTd2lwZXIiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7QUErQm5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztrTUF4Q0FDLEssR0FBUTtBQUNOQyxxQkFBZTtBQUNmO0FBRk0sSyxRQUlSQyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsb0JBQWM7QUFGVCxLLFFBSVBDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxFQUNRO0FBQ2QsYUFBS0gsWUFBTCxHQUFvQkcsRUFBRUMsTUFBRixDQUFTQyxPQUE3QjtBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS0ZDLGVBTEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU4sdUJBQUtDLFNBQUwsQ0FBZSxNQUFmO0FBTk07QUFBQTtBQUFBLHlCQVFFLDBCQUFnQixLQUFLQyxNQUFMLENBQVksS0FBS1QsWUFBakIsRUFBK0JVLEdBQS9DLENBUkY7O0FBQUE7QUFTSix1QkFBS0MsVUFBTDtBQUNBLHVCQUFLQyxTQUFMLENBQWUsTUFBZjtBQVZJO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVlKLHVCQUFLRCxVQUFMO0FBQ0EsdUJBQUtFLFNBQUwsQ0FBZSxNQUFmOztBQWJJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBZ0JSQyxpQkFoQlEseUJBZ0JNO0FBQ1osYUFBS2QsWUFBTCxHQUFvQixDQUFwQjtBQUNBLGFBQUtlLEtBQUwsQ0FBVyxnQkFBWDtBQUNEO0FBbkJPLEs7Ozs7RUFWOEIsZUFBS0MsUzs7a0JBQTFCdEIsWSIsImZpbGUiOiJwcmV2aWV3UGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcHJldmlld1Bob3RvczogW11cbiAgICAvLyBwaG90b0lkeDogTnVtYmVyXG4gIH07XG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xuICBkYXRhID0ge1xuICAgIHBob3RvSWR4OiAwLFxuICAgIHBob3RvSXRlbUlkeDogMFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSAwXG4gICAgICB0aGlzLiRlbWl0KCdjbGVhckN1clBob3RvcycpXG4gICAgfVxuICB9O1xuICAvLyB3YXRjaCA9IHtcbiAgLy8gICBwaG90b0lkeChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlKVxuICAvLyAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBuZXdWYWx1ZVxuICAvLyAgICAgdGhpcy4kYXBwbHkoKVxuICAvLyAgIH0sXG4gIC8vICAgcGhvdG9zKG5ld1ZhbHVlKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZhbHVlJylcbiAgLy8gICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlKVxuICAvLyAgIH1cbiAgLy8gfTtcbn1cbiJdfQ==