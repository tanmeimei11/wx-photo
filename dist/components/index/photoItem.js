'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      photoItem: [],
      photoIndex: Number
    }, _this.data = {
      image: [1, 2, 3, 4, 5, 6, 7]
    }, _this.watch = {}, _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        console.log(this.photoItem.photos, _photoIdx);
        this.$emit('changeCurPhotos', this.photoItem.photos, _photoIdx);
      },
      clickZan: function clickZan() {
        var _this2 = this;

        (0, _login.request)({
          url: '/gg/photo/zan',
          data: {
            pid: this.photoItem.photo_id,
            action: this.photoItem.is_zan ? 'cancel' : 'zan'
          }
        }).then(function (res) {
          _this2.photoItem.is_zan = !_this2.photoItem.is_zan;
          _this2.$apply();
        });
      },
      delPhoto: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this3 = this;

          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _common.wxPromisify)(wx.showActionSheet)({
                    itemList: ['删除'],
                    itemColor: '#FF5E51'
                  });

                case 2:
                  res = _context.sent;

                  if (res.tapIndex === 0) {
                    (0, _login.request)({
                      url: '/gg/photo/del',
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this3.$emit('deletPhoto', _this3.photoIndex);
                      _this3.$apply();
                      console.log(_this3);
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        mask: true
                      });
                    });
                  }

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function delPhoto() {
          return _ref2.apply(this, arguments);
        }

        return delPhoto;
      }(),
      downUrl: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
          var _urls;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _urls = this.photoItem.photos.map(function (photo) {
                    return photo.url;
                  });
                  _context2.next = 3;
                  return (0, _api.downInternetUrl)(_urls);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function downUrl(_x) {
          return _ref3.apply(this, arguments);
        }

        return downUrl;
      }(),
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJwaG90b3MiLCIkZW1pdCIsImNsaWNrWmFuIiwidXJsIiwicGlkIiwicGhvdG9faWQiLCJhY3Rpb24iLCJpc196YW4iLCJ0aGVuIiwiJGFwcGx5IiwiZGVsUGhvdG8iLCJ3eCIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwiaXRlbUNvbG9yIiwicmVzIiwidGFwSW5kZXgiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwiZG93blVybCIsIl91cmxzIiwibWFwIiwicGhvdG8iLCJ0YXAiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU87QUFDTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CO0FBREYsSyxRQUdQQyxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLFlBQVlELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakM7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLZCxTQUFMLENBQWVlLE1BQTNCLEVBQW1DTixTQUFuQztBQUNBLGFBQUtPLEtBQUwsQ0FBVyxpQkFBWCxFQUE4QixLQUFLaEIsU0FBTCxDQUFlZSxNQUE3QyxFQUFxRE4sU0FBckQ7QUFDRCxPQUxPO0FBTVJRLGNBTlEsc0JBTUc7QUFBQTs7QUFDVCw0QkFBUTtBQUNOQyxlQUFLLGVBREM7QUFFTmYsZ0JBQU07QUFDSmdCLGlCQUFLLEtBQUtuQixTQUFMLENBQWVvQixRQURoQjtBQUVKQyxvQkFBUSxLQUFLckIsU0FBTCxDQUFlc0IsTUFBZixHQUF3QixRQUF4QixHQUFtQztBQUZ2QztBQUZBLFNBQVIsRUFNR0MsSUFOSCxDQU1RLGVBQU87QUFDYixpQkFBS3ZCLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsQ0FBQyxPQUFLdEIsU0FBTCxDQUFlc0IsTUFBeEM7QUFDQSxpQkFBS0UsTUFBTDtBQUNELFNBVEQ7QUFVRCxPQWpCTztBQWtCRkMsY0FsQkU7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQW1CVSx5QkFBWUMsR0FBR0MsZUFBZixFQUFnQztBQUM5Q0MsOEJBQVUsQ0FBQyxJQUFELENBRG9DO0FBRTlDQywrQkFBVztBQUZtQyxtQkFBaEMsQ0FuQlY7O0FBQUE7QUFtQkZDLHFCQW5CRTs7QUF1Qk4sc0JBQUlBLElBQUlDLFFBQUosS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsd0NBQVE7QUFDTmIsMkJBQUssZUFEQztBQUVOZiw0QkFBTTtBQUNKZ0IsNkJBQUssS0FBS25CLFNBQUwsQ0FBZW9CO0FBRGhCO0FBRkEscUJBQVIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYiw2QkFBS1AsS0FBTCxDQUFXLFlBQVgsRUFBeUIsT0FBS2YsVUFBOUI7QUFDQSw2QkFBS3VCLE1BQUw7QUFDQVgsOEJBQVFDLEdBQVI7QUFDQVkseUJBQUdNLFNBQUgsQ0FBYTtBQUNYQywrQkFBTyxNQURJO0FBRVhDLDhCQUFNLFNBRks7QUFHWEMsOEJBQU07QUFISyx1QkFBYjtBQUtELHFCQWREO0FBZUQ7O0FBdkNLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBeUNGQyxhQXpDRTtBQUFBLDhGQXlDTWxCLEdBekNOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQ0ZtQix1QkExQ0UsR0EwQ00sS0FBS3JDLFNBQUwsQ0FBZWUsTUFBZixDQUFzQnVCLEdBQXRCLENBQTBCLGlCQUFTO0FBQzdDLDJCQUFPQyxNQUFNckIsR0FBYjtBQUNELG1CQUZXLENBMUNOO0FBQUE7QUFBQSx5QkE2Q0EsMEJBQWdCbUIsS0FBaEIsQ0E3Q0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUErQ1JHLFNBL0NRLGlCQStDRixDQUFFLENBL0NBO0FBZ0RSQyxlQWhEUSx1QkFnREksQ0FBRTtBQWhETixLOzs7O0VBVDJCLGVBQUtDLFM7O2tCQUF2QjVDLFMiLCJmaWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xyXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xyXG5pbXBvcnQgeyB3eFByb21pc2lmeSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbi5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHBob3RvSXRlbTogW10sXHJcbiAgICBwaG90b0luZGV4OiBOdW1iZXJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBpbWFnZTogWzEsIDIsIDMsIDQsIDUsIDYsIDddXHJcbiAgfTtcclxuICB3YXRjaCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0ltYWdlKGUpIHtcclxuICAgICAgdmFyIF9waG90b0lkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUN1clBob3RvcycsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KVxyXG4gICAgfSxcclxuICAgIGNsaWNrWmFuKCkge1xyXG4gICAgICByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uaXNfemFuID0gIXRoaXMucGhvdG9JdGVtLmlzX3phblxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxQaG90bygpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnNob3dBY3Rpb25TaGVldCkoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZG93blVybCh1cmwpIHtcclxuICAgICAgdmFyIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBob3RvLnVybFxyXG4gICAgICB9KVxyXG4gICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19