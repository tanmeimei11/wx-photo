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
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _urls = this.photoItem.photos.map(function (photo) {
                    return photo.url;
                  });

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

        function downUrl(_x) {
          return _ref4.apply(this, arguments);
        }

        return downUrl;
      }(),
      printerClick: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pid, uid) {
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
                      photo_id: pid || this.photoItem.photo_id,
                      user_id: uid || this.photoItem.user.user_id
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

        function printerClick(_x2, _x3) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaXNaYW5BamF4IiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwic3VjYyIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsImxvYWRpbmdJbiIsInRoZW4iLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwiZG93blVybCIsIl91cmxzIiwibWFwIiwicGhvdG8iLCJ0b2FzdEZhaWwiLCJwcmludGVyQ2xpY2siLCJ1aWQiLCJ1c2VyX2lkIiwidXNlciIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImVudlZlcnNpb24iLCJ0YXAiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVcsRUFETDtBQUVOQyxrQkFBWUM7QUFGTixLLFFBSVJDLEksR0FBTztBQUNMQyxpQkFBVztBQUROLEssUUFHUEMsTSxHQUFTLHdCLFFBQ1RDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsQ0FESCxFQUNNO0FBQ1osWUFBSUMsWUFBWUQsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUFqQztBQUNBLGFBQUtDLEtBQUwsQ0FBVyxpQkFBWCxFQUE4QixLQUFLYixTQUFMLENBQWVjLE1BQTdDLEVBQXFETCxTQUFy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OztBQUFBO0FBQUE7QUFBQTs7QUFtRUosdUJBQUtVLFVBQUw7QUFDQSx1QkFBS00sU0FBTCxDQUFlLE9BQWY7O0FBcEVJOztBQXVFTix1QkFBS04sVUFBTDs7QUF2RU0sc0JBd0VBVixPQUFPQSxJQUFJQyxJQUFYLElBQW1CRCxJQUFJbEIsSUF4RXZCO0FBQUE7QUFBQTtBQUFBOztBQXlFSix1QkFBS2tDLFNBQUwsQ0FBZSxPQUFmO0FBekVJOztBQUFBO0FBQUE7QUFBQSx5QkE0RUEsZUFBS0sscUJBQUwsQ0FBMkI7QUFDL0JDLDJCQUFPLG9CQUR3QjtBQUUvQkMsa0VBQTRDdkIsSUFBSWxCLElBRmpCO0FBRy9CMEMsZ0NBQVk7QUFIbUIsbUJBQTNCLENBNUVBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBa0ZSQyxTQWxGUSxpQkFrRkYsQ0FBRSxDQWxGQTtBQW1GUkMsZUFuRlEsdUJBbUZJLENBQUU7QUFuRk4sSzs7OztFQVQyQixlQUFLQyxTOztrQkFBdkJsRCxTIiwiZmlsZSI6InBob3RvSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgaXNaYW5BamF4OiBmYWxzZVxyXG4gIH07XHJcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VDdXJQaG90b3MnLCB0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbGlja1phbigpIHtcclxuICAgICAgaWYgKHRoaXMuaXNaYW5BamF4ID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSB0cnVlXHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcclxuICAgICAgICB0aGlzLiRlbWl0KCdwaG90b1phbkNoYW5nZScsIHRoaXMucGhvdG9JbmRleCwgcmVzLmRhdGEpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5Yig6ZmkJylcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgICB0aGlzLnRvYXN0U3VjYygn5Yig6Zmk5oiQ5YqfJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZG93blVybCh1cmwpIHtcclxuICAgICAgdmFyIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBob3RvLnVybFxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiL6L29JylcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5LiL6L295oiQ5YqfJylcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4i+i9veWksei0pScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwcmludGVyQ2xpY2socGlkLCB1aWQpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOi3s+i9rCcpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2ZldGNocGF5bG9hZGtleScsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBob3RvX2lkOiBwaWQgfHwgdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVpZCB8fCB0aGlzLnBob3RvSXRlbS51c2VyLnVzZXJfaWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn6Lez6L2s5aSx6LSl5LqGJylcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgaWYgKCEocmVzICYmIHJlcy5zdWNjICYmIHJlcy5kYXRhKSkge1xyXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfot7PovazlpLHotKXkuoYnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBhd2FpdCB3ZXB5Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgYXBwSWQ6ICd3eGYzNGZlM2ZiNTI1ZWExMzknLFxyXG4gICAgICAgIHBhdGg6IGBwYWdlcy90cmFuc2Zlci90cmFuc2Zlcj9wYXlsb2FkS2V5PSR7cmVzLmRhdGF9YCxcclxuICAgICAgICBlbnZWZXJzaW9uOiAnZGV2ZWxvcCdcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICB0YXAoKSB7fSxcclxuICAgIGRvd25JbWFnZSgpIHt9XHJcbiAgfTtcclxufVxyXG4iXX0=