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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwiemFuTGlzdFJlcyIsInN1Y2MiLCJ6YW5fbGlzdCIsIiRhcHBseSIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJ0b2FzdFN1Y2MiLCJkb3duVXJsIiwiX3VybHMiLCJtYXAiLCJwaG90byIsInByaW50ZXJDbGljayIsImxvYWRpbmdJbiIsInVzZXJfaWQiLCJ1c2VyIiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImVudlZlcnNpb24iLCJ0YXAiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVcsRUFETDtBQUVOQyxrQkFBWUM7QUFGTixLLFFBSVJDLEksR0FBTyxFLFFBQ1BDLE0sR0FBUyx3QixRQUNUQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLFlBQVlELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakM7QUFDQSxhQUFLQyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS1osU0FBTCxDQUFlYSxNQUE3QyxFQUFxREwsU0FBckQ7QUFDRCxPQUpP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RXZCO0FBQUE7QUFBQTtBQUFBOztBQW9FSix1QkFBS3NDLFNBQUwsQ0FBZSxPQUFmO0FBcEVJOztBQUFBO0FBQUE7QUFBQSx5QkF1RUEsZUFBS0MscUJBQUwsQ0FBMkI7QUFDL0JDLDJCQUFPLG9CQUR3QjtBQUUvQkMsa0VBQTRDeEIsSUFBSWpCLElBRmpCO0FBRy9CMEMsZ0NBQVk7QUFIbUIsbUJBQTNCLENBdkVBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNkVSQyxTQTdFUSxpQkE2RUYsQ0FBRSxDQTdFQTtBQThFUkMsZUE5RVEsdUJBOEVJLENBQUU7QUE5RU4sSzs7OztFQVAyQixlQUFLQyxTOztrQkFBdkJsRCxTIiwiZmlsZSI6InBob3RvSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyXHJcbiAgfTtcclxuICBkYXRhID0ge307XHJcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VDdXJQaG90b3MnLCB0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbGlja1phbigpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW4nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMucGhvdG9JdGVtLmlzX3phbiA/ICdjYW5jZWwnIDogJ3phbidcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2YXIgemFuTGlzdFJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW5fbGlzdCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChyZXMuc3VjYyAmJiB6YW5MaXN0UmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5kYXRhKSB7XHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uaXNfemFuID0gIXRoaXMucGhvdG9JdGVtLmlzX3phblxyXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLnphbl9saXN0ID0gemFuTGlzdFJlcy5kYXRhXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsUGhvdG8oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCB3ZXB5LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgICAgaXRlbUxpc3Q6IFsn5Yig6ZmkJ10sXHJcbiAgICAgICAgaXRlbUNvbG9yOiAnI0ZGNUU1MSdcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlcy50YXBJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2RlbCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldFBob3RvJywgdGhpcy5waG90b0luZGV4KVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+WIoOmZpOaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRvd25VcmwodXJsKSB7XHJcbiAgICAgIHZhciBfdXJscyA9IHRoaXMucGhvdG9JdGVtLnBob3Rvcy5tYXAocGhvdG8gPT4ge1xyXG4gICAgICAgIHJldHVybiBwaG90by51cmxcclxuICAgICAgfSlcclxuICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKF91cmxzKVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHByaW50ZXJDbGljaygpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOi3s+i9rCcpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2ZldGNocGF5bG9hZGtleScsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBob3RvX2lkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgICAgdXNlcl9pZDogdGhpcy5waG90b0l0ZW0udXNlci51c2VyX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+i3s+i9rOWksei0peS6hicpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXHJcbiAgICAgIGlmICghKHJlcyAmJiByZXMuc3VjYyAmJiByZXMuZGF0YSkpIHtcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn6Lez6L2s5aSx6LSl5LqGJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgd2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgIGFwcElkOiAnd3hmMzRmZTNmYjUyNWVhMTM5JyxcclxuICAgICAgICBwYXRoOiBgcGFnZXMvdHJhbnNmZXIvdHJhbnNmZXI/cGF5bG9hZEtleT0ke3Jlcy5kYXRhfWAsXHJcbiAgICAgICAgZW52VmVyc2lvbjogJ2RldmVsb3AnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19