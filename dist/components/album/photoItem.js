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
                      photo_id: this.photoItem.photo_id
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
                    // path: `pages/transfer/transfer`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwiemFuTGlzdFJlcyIsInN1Y2MiLCJ6YW5fbGlzdCIsIiRhcHBseSIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJ0b2FzdFN1Y2MiLCJkb3duVXJsIiwiX3VybHMiLCJtYXAiLCJwaG90byIsInByaW50ZXJDbGljayIsImxvYWRpbmdJbiIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJlbnZWZXJzaW9uIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU8sRSxRQUNQQyxNLEdBQVMsd0IsUUFDVEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0EsYUFBS0MsS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUtaLFNBQUwsQ0FBZWEsTUFBN0MsRUFBcURMLFNBQXJEO0FBQ0QsT0FKTztBQUtGTSxjQUxFO0FBQUE7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QUEseUJBc0VBLGVBQUtDLHFCQUFMLENBQTJCO0FBQy9CQywyQkFBTyxvQkFEd0I7QUFFL0JDLGtFQUE0Q3RCLElBQUlqQixJQUZqQjtBQUcvQjtBQUNBd0MsZ0NBQVk7QUFKbUIsbUJBQTNCLENBdEVBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNkVSQyxTQTdFUSxpQkE2RUYsQ0FBRSxDQTdFQTtBQThFUkMsZUE5RVEsdUJBOEVJLENBQUU7QUE5RU4sSzs7OztFQVAyQixlQUFLQyxTOztrQkFBdkJoRCxTIiwiZmlsZSI6InBob3RvSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyXHJcbiAgfTtcclxuICBkYXRhID0ge307XHJcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VDdXJQaG90b3MnLCB0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbGlja1phbigpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW4nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMucGhvdG9JdGVtLmlzX3phbiA/ICdjYW5jZWwnIDogJ3phbidcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2YXIgemFuTGlzdFJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW5fbGlzdCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChyZXMuc3VjYyAmJiB6YW5MaXN0UmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5kYXRhKSB7XHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uaXNfemFuID0gIXRoaXMucGhvdG9JdGVtLmlzX3phblxyXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLnphbl9saXN0ID0gemFuTGlzdFJlcy5kYXRhXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsUGhvdG8oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCB3ZXB5LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgICAgaXRlbUxpc3Q6IFsn5Yig6ZmkJ10sXHJcbiAgICAgICAgaXRlbUNvbG9yOiAnI0ZGNUU1MSdcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlcy50YXBJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2RlbCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldFBob3RvJywgdGhpcy5waG90b0luZGV4KVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+WIoOmZpOaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRvd25VcmwodXJsKSB7XHJcbiAgICAgIHZhciBfdXJscyA9IHRoaXMucGhvdG9JdGVtLnBob3Rvcy5tYXAocGhvdG8gPT4ge1xyXG4gICAgICAgIHJldHVybiBwaG90by51cmxcclxuICAgICAgfSlcclxuICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKF91cmxzKVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHByaW50ZXJDbGljaygpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOi3s+i9rCcpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2ZldGNocGF5bG9hZGtleScsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBob3RvX2lkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfot7PovazlpLHotKXkuoYnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxyXG4gICAgICBpZiAoIShyZXMgJiYgcmVzLnN1Y2MgJiYgcmVzLmRhdGEpKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+i3s+i9rOWksei0peS6hicpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICBhcHBJZDogJ3d4ZjM0ZmUzZmI1MjVlYTEzOScsXHJcbiAgICAgICAgcGF0aDogYHBhZ2VzL3RyYW5zZmVyL3RyYW5zZmVyP3BheWxvYWRLZXk9JHtyZXMuZGF0YX1gLFxyXG4gICAgICAgIC8vIHBhdGg6IGBwYWdlcy90cmFuc2Zlci90cmFuc2ZlcmAsXHJcbiAgICAgICAgZW52VmVyc2lvbjogJ2RldmVsb3AnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19