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

        function printerClick(_x2, _x3, _x4) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaXNaYW5BamF4IiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwic3VjYyIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsImxvYWRpbmdJbiIsInRoZW4iLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwiZG93blVybCIsIl91cmxzIiwibWFwIiwicGhvdG8iLCJ0b2FzdEZhaWwiLCJwcmludGVyQ2xpY2siLCJ1aWQiLCJjb25zb2xlIiwibG9nIiwidXNlcl9pZCIsInVzZXIiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJlbnZWZXJzaW9uIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU87QUFDTEMsaUJBQVc7QUFETixLLFFBR1BDLE0sR0FBUyx3QixRQUNUQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLFlBQVlELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakM7QUFDQSxhQUFLQyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2IsU0FBTCxDQUFlYyxN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QW9CRDtBQUZoQztBQUZnQixtQkFBUixDQTVEWjs7QUFBQTtBQTREQXJCLHFCQTVEQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQW9FSix1QkFBS1UsVUFBTDtBQUNBLHVCQUFLTSxTQUFMLENBQWUsT0FBZjs7QUFyRUk7O0FBd0VOLHVCQUFLTixVQUFMOztBQXhFTSxzQkF5RUFWLE9BQU9BLElBQUlDLElBQVgsSUFBbUJELElBQUlsQixJQXpFdkI7QUFBQTtBQUFBO0FBQUE7O0FBMEVKLHVCQUFLa0MsU0FBTCxDQUFlLE9BQWY7QUExRUk7O0FBQUE7QUFBQTtBQUFBLHlCQTZFQSxlQUFLTyxxQkFBTCxDQUEyQjtBQUMvQkMsMkJBQU8sb0JBRHdCO0FBRS9CQyxrRUFBNEN6QixJQUFJbEIsSUFGakI7QUFHL0I0QyxnQ0FBWTtBQUhtQixtQkFBM0IsQ0E3RUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFtRlJDLFNBbkZRLGlCQW1GRixDQUFFLENBbkZBO0FBb0ZSQyxlQXBGUSx1QkFvRkksQ0FBRTtBQXBGTixLOzs7O0VBVDJCLGVBQUtDLFM7O2tCQUF2QnBELFMiLCJmaWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xyXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xyXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHBob3RvSXRlbTogW10sXHJcbiAgICBwaG90b0luZGV4OiBOdW1iZXJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBpc1phbkFqYXg6IGZhbHNlXHJcbiAgfTtcclxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluXTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tJbWFnZShlKSB7XHJcbiAgICAgIHZhciBfcGhvdG9JZHggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUN1clBob3RvcycsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNsaWNrWmFuKCkge1xyXG4gICAgICBpZiAodGhpcy5pc1phbkFqYXggPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzWmFuQWpheCA9IHRydWVcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW4nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMucGhvdG9JdGVtLmlzX3phbiA/ICdjYW5jZWwnIDogJ3phbidcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMuc3VjYykge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Bob3RvWmFuQ2hhbmdlJywgdGhpcy5waG90b0luZGV4LCByZXMuZGF0YSlcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzWmFuQWpheCA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsUGhvdG8oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCB3ZXB5LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgICAgaXRlbUxpc3Q6IFsn5Yig6ZmkJ10sXHJcbiAgICAgICAgaXRlbUNvbG9yOiAnI0ZGNUU1MSdcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlcy50YXBJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjliKDpmaQnKVxyXG4gICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2RlbCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldFBob3RvJywgdGhpcy5waG90b0luZGV4KVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgICAgIHRoaXMudG9hc3RTdWNjKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xyXG4gICAgICB2YXIgX3VybHMgPSB0aGlzLnBob3RvSXRlbS5waG90b3MubWFwKHBob3RvID0+IHtcclxuICAgICAgICByZXR1cm4gcGhvdG8udXJsXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscylcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHByaW50ZXJDbGljayhlLCBwaWQsIHVpZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhwaWQpXHJcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjot7PovawnKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9mZXRjaHBheWxvYWRrZXknLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaG90b19pZDogcGlkIHx8IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgICB1c2VyX2lkOiB1aWQgfHwgdGhpcy5waG90b0l0ZW0udXNlci51c2VyX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+i3s+i9rOWksei0peS6hicpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgIGlmICghKHJlcyAmJiByZXMuc3VjYyAmJiByZXMuZGF0YSkpIHtcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn6Lez6L2s5aSx6LSl5LqGJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgd2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgIGFwcElkOiAnd3hmMzRmZTNmYjUyNWVhMTM5JyxcclxuICAgICAgICBwYXRoOiBgcGFnZXMvdHJhbnNmZXIvdHJhbnNmZXI/cGF5bG9hZEtleT0ke3Jlcy5kYXRhfWAsXHJcbiAgICAgICAgZW52VmVyc2lvbjogJ2RldmVsb3AnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19