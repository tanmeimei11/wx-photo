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
      clickZan: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res, zanListRes;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _login.request)({
                    url: '/gg/photo/zan',
                    data: {
                      pid: this.photoItem.photo_id,
                      action: this.photoItem.is_zan ? 'cancel' : 'zan'
                    }
                  });

                case 2:
                  res = _context.sent;


                  if (res.succ) {
                    this.photoItem.is_zan = !this.photoItem.is_zan;
                    this.$apply();
                  }
                  _context.next = 6;
                  return (0, _login.request)({
                    url: '/gg/photo/zan_list',
                    data: {
                      pid: this.photoItem.photo_id
                    }
                  });

                case 6:
                  zanListRes = _context.sent;


                  if (zanListRes.succ && zanListRes.data) {
                    console.log(zanListRes);
                    this.$emit('changeZanList', this.photoIndex, this.photoItem.photo_id, zanListRes.data);
                  }

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function clickZan() {
          return _ref2.apply(this, arguments);
        }

        return clickZan;
      }(),
      delPhoto: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _common.wxPromisify)(wx.showActionSheet)({
                    itemList: ['删除'],
                    itemColor: '#FF5E51'
                  });

                case 2:
                  res = _context2.sent;

                  if (res.tapIndex === 0) {
                    (0, _login.request)({
                      url: '/gg/photo/del',
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this2.$emit('deletPhoto', _this2.photoIndex);
                      _this2.$apply();
                      console.log(_this2);
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        mask: true
                      });
                    });
                  }

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function delPhoto() {
          return _ref3.apply(this, arguments);
        }

        return delPhoto;
      }(),
      downUrl: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _urls = this.photoItem.photos.map(function (photo) {
                    return photo.url;
                  });
                  _context3.next = 3;
                  return (0, _api.downInternetUrl)(_urls);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function downUrl(_x) {
          return _ref4.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJwaG90b3MiLCIkZW1pdCIsImNsaWNrWmFuIiwidXJsIiwicGlkIiwicGhvdG9faWQiLCJhY3Rpb24iLCJpc196YW4iLCJyZXMiLCJzdWNjIiwiJGFwcGx5IiwiemFuTGlzdFJlcyIsImRlbFBob3RvIiwid3giLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsIml0ZW1Db2xvciIsInRhcEluZGV4IiwidGhlbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJkb3duVXJsIiwiX3VybHMiLCJtYXAiLCJwaG90byIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVcsRUFETDtBQUVOQyxrQkFBWUM7QUFGTixLLFFBSVJDLEksR0FBTztBQUNMQyxhQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFERixLLFFBR1BDLEssR0FBUSxFLFFBQ1JDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsQ0FESCxFQUNNO0FBQ1osWUFBSUMsWUFBWUQsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUFqQztBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtkLFNBQUwsQ0FBZWUsTUFBM0IsRUFBbUNOLFNBQW5DO0FBQ0EsYUFBS08sS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUtoQixTQUFMLENBQWVlLE1BQTdDLEVBQXFETixTQUFyRDtBQUNELE9BTE87QUFNRlEsY0FORTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBT1Usb0JBQVE7QUFDdEJDLHlCQUFLLGVBRGlCO0FBRXRCZiwwQkFBTTtBQUNKZ0IsMkJBQUssS0FBS25CLFNBQUwsQ0FBZW9CLFFBRGhCO0FBRUpDLDhCQUFRLEtBQUtyQixTQUFMLENBQWVzQixNQUFmLEdBQXdCLFFBQXhCLEdBQW1DO0FBRnZDO0FBRmdCLG1CQUFSLENBUFY7O0FBQUE7QUFPRkMscUJBUEU7OztBQWVOLHNCQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWix5QkFBS3hCLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsQ0FBQyxLQUFLdEIsU0FBTCxDQUFlc0IsTUFBeEM7QUFDQSx5QkFBS0csTUFBTDtBQUNEO0FBbEJLO0FBQUEseUJBbUJpQixvQkFBUTtBQUM3QlAseUJBQUssb0JBRHdCO0FBRTdCZiwwQkFBTTtBQUNKZ0IsMkJBQUssS0FBS25CLFNBQUwsQ0FBZW9CO0FBRGhCO0FBRnVCLG1CQUFSLENBbkJqQjs7QUFBQTtBQW1CRk0sNEJBbkJFOzs7QUEwQk4sc0JBQUlBLFdBQVdGLElBQVgsSUFBbUJFLFdBQVd2QixJQUFsQyxFQUF3QztBQUN0Q1UsNEJBQVFDLEdBQVIsQ0FBWVksVUFBWjtBQUNBLHlCQUFLVixLQUFMLENBQ0UsZUFERixFQUVFLEtBQUtmLFVBRlAsRUFHRSxLQUFLRCxTQUFMLENBQWVvQixRQUhqQixFQUlFTSxXQUFXdkIsSUFKYjtBQU1EOztBQWxDSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQW9DRndCLGNBcENFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFxQ1UseUJBQVlDLEdBQUdDLGVBQWYsRUFBZ0M7QUFDOUNDLDhCQUFVLENBQUMsSUFBRCxDQURvQztBQUU5Q0MsK0JBQVc7QUFGbUMsbUJBQWhDLENBckNWOztBQUFBO0FBcUNGUixxQkFyQ0U7O0FBeUNOLHNCQUFJQSxJQUFJUyxRQUFKLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLHdDQUFRO0FBQ05kLDJCQUFLLGVBREM7QUFFTmYsNEJBQU07QUFDSmdCLDZCQUFLLEtBQUtuQixTQUFMLENBQWVvQjtBQURoQjtBQUZBLHFCQUFSLEVBS0dhLElBTEgsQ0FLUSxlQUFPO0FBQ2IsNkJBQUtqQixLQUFMLENBQVcsWUFBWCxFQUF5QixPQUFLZixVQUE5QjtBQUNBLDZCQUFLd0IsTUFBTDtBQUNBWiw4QkFBUUMsR0FBUjtBQUNBYyx5QkFBR00sU0FBSCxDQUFhO0FBQ1hDLCtCQUFPLE1BREk7QUFFWEMsOEJBQU0sU0FGSztBQUdYQyw4QkFBTTtBQUhLLHVCQUFiO0FBS0QscUJBZEQ7QUFlRDs7QUF6REs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEyREZDLGFBM0RFO0FBQUEsOEZBMkRNcEIsR0EzRE47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRERnFCLHVCQTVERSxHQTRETSxLQUFLdkMsU0FBTCxDQUFlZSxNQUFmLENBQXNCeUIsR0FBdEIsQ0FBMEIsaUJBQVM7QUFDN0MsMkJBQU9DLE1BQU12QixHQUFiO0FBQ0QsbUJBRlcsQ0E1RE47QUFBQTtBQUFBLHlCQStEQSwwQkFBZ0JxQixLQUFoQixDQS9EQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlFUkcsU0FqRVEsaUJBaUVGLENBQUUsQ0FqRUE7QUFrRVJDLGVBbEVRLHVCQWtFSSxDQUFFO0FBbEVOLEs7Ozs7RUFUMkIsZUFBS0MsUzs7a0JBQXZCOUMsUyIsImZpbGUiOiJwaG90b0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XHJcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XHJcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcGhvdG9JdGVtOiBbXSxcclxuICAgIHBob3RvSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGltYWdlOiBbMSwgMiwgMywgNCwgNSwgNiwgN11cclxuICB9O1xyXG4gIHdhdGNoID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2xpY2taYW4oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKHJlcy5zdWNjKSB7XHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uaXNfemFuID0gIXRoaXMucGhvdG9JdGVtLmlzX3phblxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgICB2YXIgemFuTGlzdFJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW5fbGlzdCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmICh6YW5MaXN0UmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5kYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coemFuTGlzdFJlcylcclxuICAgICAgICB0aGlzLiRlbWl0KFxyXG4gICAgICAgICAgJ2NoYW5nZVphbkxpc3QnLFxyXG4gICAgICAgICAgdGhpcy5waG90b0luZGV4LFxyXG4gICAgICAgICAgdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICB6YW5MaXN0UmVzLmRhdGFcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxQaG90bygpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnNob3dBY3Rpb25TaGVldCkoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZG93blVybCh1cmwpIHtcclxuICAgICAgdmFyIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBob3RvLnVybFxyXG4gICAgICB9KVxyXG4gICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19