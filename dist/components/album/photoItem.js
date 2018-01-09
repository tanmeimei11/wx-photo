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
    }, _this.data = {
      isZanAjax: false
    }, _this.mixins = [_loadingMixin2.default], _this.methods = {
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
                  if (!(this.isZanAjax === true)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:
                  this.isZanAjax = true;
                  _context.next = 5;
                  return (0, _login.request)({
                    url: '/gg/photo/zan',
                    data: {
                      pid: this.photoItem.photo_id,
                      action: this.photoItem.is_zan ? 'cancel' : 'zan'
                    }
                  });

                case 5:
                  res = _context.sent;
                  _context.next = 8;
                  return (0, _login.request)({
                    url: '/gg/photo/zan_list',
                    data: {
                      pid: this.photoItem.photo_id
                    }
                  });

                case 8:
                  zanListRes = _context.sent;


                  if (res.succ && zanListRes.succ) {
                    console.log(zanListRes.data, this.photoIndex);
                    this.$emit('photoZanChange', this.photoIndex, zanListRes.data);
                  }
                  this.isZanAjax = false;

                case 11:
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
                      _this2.toastSucc('删除成功');
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
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  this.loadingIn('正在跳转');
                  _context4.prev = 1;
                  _context4.next = 4;
                  return (0, _login.request)({
                    url: '/gg/photo/fetchpayloadkey',
                    data: {
                      photo_id: this.photoItem.photo_id,
                      user_id: this.photoItem.user.user_id
                    }
                  });

                case 4:
                  res = _context4.sent;
                  _context4.next = 11;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](1);

                  this.loadingOut();
                  this.toastFail('跳转失败了');

                case 11:

                  this.loadingOut();

                  if (res && res.succ && res.data) {
                    _context4.next = 15;
                    break;
                  }

                  this.toastFail('跳转失败了');
                  return _context4.abrupt('return');

                case 15:
                  _context4.next = 17;
                  return _wepy2.default.navigateToMiniProgram({
                    appId: 'wxf34fe3fb525ea139',
                    path: 'pages/transfer/transfer?payloadKey=' + res.data,
                    envVersion: 'develop'
                  });

                case 17:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[1, 7]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaXNaYW5BamF4IiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwiemFuTGlzdFJlcyIsInN1Y2MiLCJjb25zb2xlIiwibG9nIiwiZGVsUGhvdG8iLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsIml0ZW1Db2xvciIsInRhcEluZGV4IiwidGhlbiIsIiRhcHBseSIsInRvYXN0U3VjYyIsImRvd25VcmwiLCJfdXJscyIsIm1hcCIsInBob3RvIiwicHJpbnRlckNsaWNrIiwibG9hZGluZ0luIiwidXNlcl9pZCIsInVzZXIiLCJsb2FkaW5nT3V0IiwidG9hc3RGYWlsIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJwYXRoIiwiZW52VmVyc2lvbiIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQztBQUZOLEssUUFJUkMsSSxHQUFPO0FBQ0xDLGlCQUFXO0FBRE4sSyxRQUdQQyxNLEdBQVMsd0IsUUFDVEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0EsYUFBS0MsS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUtiLFNBQUws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QUFBOztBQWtFSix1QkFBS3FCLFVBQUw7QUFDQSx1QkFBS0MsU0FBTCxDQUFlLE9BQWY7O0FBbkVJOztBQXNFTix1QkFBS0QsVUFBTDs7QUF0RU0sc0JBdUVBckIsT0FBT0EsSUFBSUUsSUFBWCxJQUFtQkYsSUFBSWxCLElBdkV2QjtBQUFBO0FBQUE7QUFBQTs7QUF3RUosdUJBQUt3QyxTQUFMLENBQWUsT0FBZjtBQXhFSTs7QUFBQTtBQUFBO0FBQUEseUJBMkVBLGVBQUtDLHFCQUFMLENBQTJCO0FBQy9CQywyQkFBTyxvQkFEd0I7QUFFL0JDLGtFQUE0Q3pCLElBQUlsQixJQUZqQjtBQUcvQjRDLGdDQUFZO0FBSG1CLG1CQUEzQixDQTNFQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlGUkMsU0FqRlEsaUJBaUZGLENBQUUsQ0FqRkE7QUFrRlJDLGVBbEZRLHVCQWtGSSxDQUFFO0FBbEZOLEs7Ozs7RUFUMkIsZUFBS0MsUzs7a0JBQXZCcEQsUyIsImZpbGUiOiJwaG90b0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XHJcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XHJcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcGhvdG9JdGVtOiBbXSxcclxuICAgIHBob3RvSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGlzWmFuQWpheDogZmFsc2VcclxuICB9O1xyXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0ltYWdlKGUpIHtcclxuICAgICAgdmFyIF9waG90b0lkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2xpY2taYW4oKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzWmFuQWpheCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNaYW5BamF4ID0gdHJ1ZVxyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gJ2NhbmNlbCcgOiAnemFuJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHZhciB6YW5MaXN0UmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbl9saXN0JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKHJlcy5zdWNjICYmIHphbkxpc3RSZXMuc3VjYykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHphbkxpc3RSZXMuZGF0YSwgdGhpcy5waG90b0luZGV4KVxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Bob3RvWmFuQ2hhbmdlJywgdGhpcy5waG90b0luZGV4LCB6YW5MaXN0UmVzLmRhdGEpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHRoaXMudG9hc3RTdWNjKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xyXG4gICAgICB2YXIgX3VybHMgPSB0aGlzLnBob3RvSXRlbS5waG90b3MubWFwKHBob3RvID0+IHtcclxuICAgICAgICByZXR1cm4gcGhvdG8udXJsXHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscylcclxuICAgIH0sXHJcbiAgICBhc3luYyBwcmludGVyQ2xpY2soKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjot7PovawnKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9mZXRjaHBheWxvYWRrZXknLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaG90b19pZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICAgIHVzZXJfaWQ6IHRoaXMucGhvdG9JdGVtLnVzZXIudXNlcl9pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfot7PovazlpLHotKXkuoYnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICBpZiAoIShyZXMgJiYgcmVzLnN1Y2MgJiYgcmVzLmRhdGEpKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+i3s+i9rOWksei0peS6hicpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICBhcHBJZDogJ3d4ZjM0ZmUzZmI1MjVlYTEzOScsXHJcbiAgICAgICAgcGF0aDogYHBhZ2VzL3RyYW5zZmVyL3RyYW5zZmVyP3BheWxvYWRLZXk9JHtyZXMuZGF0YX1gLFxyXG4gICAgICAgIGVudlZlcnNpb246ICdkZXZlbG9wJ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHRhcCgpIHt9LFxyXG4gICAgZG93bkltYWdlKCkge31cclxuICB9O1xyXG59XHJcbiJdfQ==