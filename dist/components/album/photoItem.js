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
          var res;
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

                  if (res.succ) {
                    this.$emit('photoZanChange', this.photoIndex, res.data);
                  }
                  this.isZanAjax = false;

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
                  return _wepy2.default.showActionSheet({
                    itemList: ['删除'],
                    itemColor: '#FF5E51'
                  });

                case 2:
                  res = _context2.sent;

                  if (res.tapIndex === 0) {
                    this.loadingIn('正在删除');
                    (0, _login.request)({
                      url: '/gg/photo/del',
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this2.$emit('deletPhoto', _this2.photoIndex);
                      _this2.$apply();
                      _this2.loadingOut();
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
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.photoItem.photo_type === '0') {
                    _urls = this.photoItem.photos.map(function (photo) {
                      return photo.url;
                    });
                  } else {
                    _urls = this.photoItem.video.play_url;
                  }

                  this.loadingIn('正在下载');
                  _context3.prev = 2;
                  _context3.next = 5;
                  return (0, _api.downInternetUrl)(_urls);

                case 5:
                  this.loadingOut();
                  this.toastSucc('下载成功');
                  _context3.next = 13;
                  break;

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3['catch'](2);

                  this.loadingOut();
                  this.toastFail('下载失败');

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[2, 9]]);
        }));

        function downUrl() {
          return _ref4.apply(this, arguments);
        }

        return downUrl;
      }(),
      printerClick: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e, pid, uid) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  console.log(pid);
                  this.loadingIn('正在跳转');
                  _context4.prev = 2;
                  _context4.next = 5;
                  return (0, _login.request)({
                    url: '/gg/photo/fetchpayloadkey',
                    data: {
                      photo_id: pid || this.photoItem.photo_id,
                      user_id: uid || this.photoItem.user.user_id
                    }
                  });

                case 5:
                  res = _context4.sent;
                  _context4.next = 12;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4['catch'](2);

                  this.loadingOut();
                  this.toastFail('跳转失败了');

                case 12:

                  this.loadingOut();

                  if (res && res.succ && res.data) {
                    _context4.next = 16;
                    break;
                  }

                  this.toastFail('跳转失败了');
                  return _context4.abrupt('return');

                case 16:
                  _context4.next = 18;
                  return _wepy2.default.navigateToMiniProgram({
                    appId: 'wxf34fe3fb525ea139',
                    path: 'pages/transfer/transfer?payloadKey=' + res.data,
                    envVersion: 'develop'
                  });

                case 18:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[2, 8]]);
        }));

        function printerClick(_x, _x2, _x3) {
          return _ref5.apply(this, arguments);
        }

        return printerClick;
      }(),
      playVideo: function playVideo() {
        console.log('123');
        this.$emit('showVideo', this.photoIndex);
      },
      videoEnd: function videoEnd() {
        this.$emit('hiddenVideo', this.photoIndex);
      },
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaXNaYW5BamF4IiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwic3VjYyIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsImxvYWRpbmdJbiIsInRoZW4iLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwiZG93blVybCIsInBob3RvX3R5cGUiLCJfdXJscyIsIm1hcCIsInBob3RvIiwidmlkZW8iLCJwbGF5X3VybCIsInRvYXN0RmFpbCIsInByaW50ZXJDbGljayIsInVpZCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyX2lkIiwidXNlciIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImVudlZlcnNpb24iLCJwbGF5VmlkZW8iLCJ2aWRlb0VuZCIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQztBQUZOLEssUUFJUkMsSSxHQUFPO0FBQ0xDLGlCQUFXO0FBRE4sSyxRQUdQQyxNLEdBQVMsd0IsUUFDVEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtB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b250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgaXNaYW5BamF4OiBmYWxzZVxyXG4gIH07XHJcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VDdXJQaG90b3MnLCB0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbGlja1phbigpIHtcclxuICAgICAgaWYgKHRoaXMuaXNaYW5BamF4ID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSB0cnVlXHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcclxuICAgICAgICB0aGlzLiRlbWl0KCdwaG90b1phbkNoYW5nZScsIHRoaXMucGhvdG9JbmRleCwgcmVzLmRhdGEpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5Yig6ZmkJylcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgICB0aGlzLnRvYXN0U3VjYygn5Yig6Zmk5oiQ5YqfJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZG93blVybCgpIHtcclxuICAgICAgdmFyIF91cmxzXHJcbiAgICAgIGlmICh0aGlzLnBob3RvSXRlbS5waG90b190eXBlID09PSAnMCcpIHtcclxuICAgICAgICBfdXJscyA9IHRoaXMucGhvdG9JdGVtLnBob3Rvcy5tYXAocGhvdG8gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHBob3RvLnVybFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3VybHMgPSB0aGlzLnBob3RvSXRlbS52aWRlby5wbGF5X3VybFxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiL6L29JylcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5LiL6L295oiQ5YqfJylcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4i+i9veWksei0pScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwcmludGVyQ2xpY2soZSwgcGlkLCB1aWQpIHtcclxuICAgICAgY29uc29sZS5sb2cocGlkKVxyXG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo6Lez6L2sJylcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vZmV0Y2hwYXlsb2Fka2V5JyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGhvdG9faWQ6IHBpZCB8fCB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgICAgdXNlcl9pZDogdWlkIHx8IHRoaXMucGhvdG9JdGVtLnVzZXIudXNlcl9pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfot7PovazlpLHotKXkuoYnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICBpZiAoIShyZXMgJiYgcmVzLnN1Y2MgJiYgcmVzLmRhdGEpKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+i3s+i9rOWksei0peS6hicpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICBhcHBJZDogJ3d4ZjM0ZmUzZmI1MjVlYTEzOScsXHJcbiAgICAgICAgcGF0aDogYHBhZ2VzL3RyYW5zZmVyL3RyYW5zZmVyP3BheWxvYWRLZXk9JHtyZXMuZGF0YX1gLFxyXG4gICAgICAgIGVudlZlcnNpb246ICdkZXZlbG9wJ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHBsYXlWaWRlbygpIHtcclxuICAgICAgY29uc29sZS5sb2coJzEyMycpXHJcbiAgICAgIHRoaXMuJGVtaXQoJ3Nob3dWaWRlbycsIHRoaXMucGhvdG9JbmRleClcclxuICAgIH0sXHJcbiAgICB2aWRlb0VuZCgpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnaGlkZGVuVmlkZW8nLCB0aGlzLnBob3RvSW5kZXgpXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19