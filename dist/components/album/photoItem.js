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
          var nav;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _wepy2.default.navigateToMiniProgram({
                    appId: 'wxf34fe3fb525ea139',
                    // path: `pages/transfer/transfer?payloadKey=${res.data}`,
                    path: 'pages/transfer/transfer',
                    envVersion: 'develop'
                  });

                case 2:
                  nav = _context4.sent;


                  console.log(nav);

                case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwiemFuTGlzdFJlcyIsInN1Y2MiLCJ6YW5fbGlzdCIsIiRhcHBseSIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJkb3duVXJsIiwiX3VybHMiLCJtYXAiLCJwaG90byIsInByaW50ZXJDbGljayIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImVudlZlcnNpb24iLCJuYXYiLCJjb25zb2xlIiwibG9nIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU8sRSxRQUNQQyxNLEdBQVMsd0IsUUFDVEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0EsYUFBS0MsS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUtaLFNBQUwsQ0FBZWEsTUFBN0MsRUFBcURMLFNBQXJEO0FBQ0QsT0FKTztBQUtG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aWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xyXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xyXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHBob3RvSXRlbTogW10sXHJcbiAgICBwaG90b0luZGV4OiBOdW1iZXJcclxuICB9O1xyXG4gIGRhdGEgPSB7fTtcclxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluXTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tJbWFnZShlKSB7XHJcbiAgICAgIHZhciBfcGhvdG9JZHggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUN1clBob3RvcycsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNsaWNrWmFuKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gJ2NhbmNlbCcgOiAnemFuJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHZhciB6YW5MaXN0UmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbl9saXN0JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKHJlcy5zdWNjICYmIHphbkxpc3RSZXMuc3VjYyAmJiB6YW5MaXN0UmVzLmRhdGEpIHtcclxuICAgICAgICB0aGlzLnBob3RvSXRlbS5pc196YW4gPSAhdGhpcy5waG90b0l0ZW0uaXNfemFuXHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uemFuX2xpc3QgPSB6YW5MaXN0UmVzLmRhdGFcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxQaG90bygpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHdlcHkuc2hvd0FjdGlvblNoZWV0KHtcclxuICAgICAgICBpdGVtTGlzdDogWyfliKDpmaQnXSxcclxuICAgICAgICBpdGVtQ29sb3I6ICcjRkY1RTUxJ1xyXG4gICAgICB9KVxyXG4gICAgICBpZiAocmVzLnRhcEluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgcmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vZGVsJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoJ2RlbGV0UGhvdG8nLCB0aGlzLnBob3RvSW5kZXgpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZG93blVybCh1cmwpIHtcclxuICAgICAgdmFyIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBob3RvLnVybFxyXG4gICAgICB9KVxyXG4gICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcHJpbnRlckNsaWNrKCkge1xyXG4gICAgICAvLyB0aGlzLmxvYWRpbmdJbign5q2j5Zyo6Lez6L2sJylcclxuICAgICAgLy8gdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAvLyAgIHVybDogJy9nZy9waG90by9mZXRjaHBheWxvYWRrZXknLFxyXG4gICAgICAvLyAgIGRhdGE6IHtcclxuICAgICAgLy8gICAgIHBob3RvX2lkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSlcclxuICAgICAgLy8gaWYgKCEocmVzLnN1Y2MgJiYgcmVzLmRhdGEpKSB7XHJcbiAgICAgIC8vICAgcmV0dXJuXHJcbiAgICAgIC8vIH1cclxuICAgICAgLy8gdGhpcy5sb2FkaW5nT3V0KClcclxuICAgICAgdmFyIG5hdiA9IGF3YWl0IHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICBhcHBJZDogJ3d4ZjM0ZmUzZmI1MjVlYTEzOScsXHJcbiAgICAgICAgLy8gcGF0aDogYHBhZ2VzL3RyYW5zZmVyL3RyYW5zZmVyP3BheWxvYWRLZXk9JHtyZXMuZGF0YX1gLFxyXG4gICAgICAgIHBhdGg6IGBwYWdlcy90cmFuc2Zlci90cmFuc2ZlcmAsXHJcbiAgICAgICAgZW52VmVyc2lvbjogJ2RldmVsb3AnXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhuYXYpXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19