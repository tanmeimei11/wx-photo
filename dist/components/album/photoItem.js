'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

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
    }, _this.data = {}, _this.mixins = [_loadingMixin2.default], _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
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
                  _context.next = 5;
                  return (0, _login.request)({
                    url: '/gg/photo/zan_list',
                    data: {
                      pid: this.photoItem.photo_id
                    }
                  });

                case 5:
                  zanListRes = _context.sent;


                  if (res.succ && zanListRes.succ && zanListRes.data) {
                    this.photoItem.is_zan = !this.photoItem.is_zan;
                    this.photoItem.zan_list = zanListRes.data;
                    this.$apply();
                  }

                case 7:
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
                  return _wepy2.default.showActionSheet({
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
      printerClick: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var res, nav;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  this.loadingIn('正在跳转');
                  _context4.next = 3;
                  return (0, _login.request)({
                    url: '/gg/photo/fetchpayloadkey',
                    data: {
                      photo_id: this.photoItem.photo_id
                    }
                  });

                case 3:
                  res = _context4.sent;

                  if (res.succ && res.data) {
                    _context4.next = 6;
                    break;
                  }

                  return _context4.abrupt('return');

                case 6:
                  this.loadingOut();
                  _context4.next = 9;
                  return _wepy2.default.navigateToMiniProgram({
                    appId: 'wxf34fe3fb525ea139',
                    path: 'pages/transfer/transfer?payloadKey=' + res.data,
                    // path: `pages/transfer/transfer`,
                    envVersion: 'develop'
                  });

                case 9:
                  nav = _context4.sent;


                  console.log(nav);

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function printerClick() {
          return _ref5.apply(this, arguments);
        }

        return printerClick;
      }(),
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwiemFuTGlzdFJlcyIsInN1Y2MiLCJ6YW5fbGlzdCIsIiRhcHBseSIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJkb3duVXJsIiwiX3VybHMiLCJtYXAiLCJwaG90byIsInByaW50ZXJDbGljayIsImxvYWRpbmdJbiIsImxvYWRpbmdPdXQiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJlbnZWZXJzaW9uIiwibmF2IiwiY29uc29sZSIsImxvZyIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQztBQUZOLEssUUFJUkMsSSxHQUFPLEUsUUFDUEMsTSxHQUFTLHdCLFFBQ1RDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsQ0FESCxFQUNNO0FBQ1osWUFBSUMsWUFBWUQsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUFqQztBQUNBLGFBQUtDLEtBQUwsQ0FBVyxpQkFBWCxFQUE4QixLQUFLWixTQUFMLENBQWVhLE1BQTdDLEVB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QywyQkFBTyxvQkFEa0M7QUFFekNDLGtFQUE0Q3pCLElBQUlqQixJQUZQO0FBR3pDO0FBQ0EyQyxnQ0FBWTtBQUo2QixtQkFBM0IsQ0FuRVY7O0FBQUE7QUFtRUZDLHFCQW5FRTs7O0FBMEVOQywwQkFBUUMsR0FBUixDQUFZRixHQUFaOztBQTFFTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTRFUkcsU0E1RVEsaUJBNEVGLENBQUUsQ0E1RUE7QUE2RVJDLGVBN0VRLHVCQTZFSSxDQUFFO0FBN0VOLEs7Ozs7RUFQMkIsZUFBS0MsUzs7a0JBQXZCdEQsUyIsImZpbGUiOiJwaG90b0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XHJcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XHJcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcGhvdG9JdGVtOiBbXSxcclxuICAgIHBob3RvSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHt9O1xyXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0ltYWdlKGUpIHtcclxuICAgICAgdmFyIF9waG90b0lkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2xpY2taYW4oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdmFyIHphbkxpc3RSZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuX2xpc3QnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAocmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5zdWNjICYmIHphbkxpc3RSZXMuZGF0YSkge1xyXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLmlzX3phbiA9ICF0aGlzLnBob3RvSXRlbS5pc196YW5cclxuICAgICAgICB0aGlzLnBob3RvSXRlbS56YW5fbGlzdCA9IHphbkxpc3RSZXMuZGF0YVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5oiQ5YqfJyxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xyXG4gICAgICB2YXIgX3VybHMgPSB0aGlzLnBob3RvSXRlbS5waG90b3MubWFwKHBob3RvID0+IHtcclxuICAgICAgICByZXR1cm4gcGhvdG8udXJsXHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscylcclxuICAgIH0sXHJcbiAgICBhc3luYyBwcmludGVyQ2xpY2soKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjot7PovawnKVxyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2ZldGNocGF5bG9hZGtleScsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGhvdG9faWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZiAoIShyZXMuc3VjYyAmJiByZXMuZGF0YSkpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICB2YXIgbmF2ID0gYXdhaXQgd2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgIGFwcElkOiAnd3hmMzRmZTNmYjUyNWVhMTM5JyxcclxuICAgICAgICBwYXRoOiBgcGFnZXMvdHJhbnNmZXIvdHJhbnNmZXI/cGF5bG9hZEtleT0ke3Jlcy5kYXRhfWAsXHJcbiAgICAgICAgLy8gcGF0aDogYHBhZ2VzL3RyYW5zZmVyL3RyYW5zZmVyYCxcclxuICAgICAgICBlbnZWZXJzaW9uOiAnZGV2ZWxvcCdcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG5hdilcclxuICAgIH0sXHJcbiAgICB0YXAoKSB7fSxcclxuICAgIGRvd25JbWFnZSgpIHt9XHJcbiAgfTtcclxufVxyXG4iXX0=