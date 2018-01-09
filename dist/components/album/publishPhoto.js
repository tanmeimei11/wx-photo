'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewPhoto = function (_wepy$component) {
  _inherits(PreviewPhoto, _wepy$component);

  function PreviewPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PreviewPhoto);

    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number,
      galleryId: String,
      groupId: String,
      publishAfterInfo: Object
    }, _this.data = {
      images: []
    }, _this.methods = {
      chooseImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var chooseRes, tempFilePaths;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.galleryAuth < 2)) {
                    _context.next = 3;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: '没有权限',
                    content: '没有权限'
                  });
                  return _context.abrupt('return');

                case 3:
                  _context.prev = 3;
                  _context.next = 6;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 6:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  wx.showLoading({
                    title: '正在上传',
                    mask: true
                  });
                  _context.next = 11;
                  return this.loadImages(tempFilePaths);

                case 11:
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context['catch'](3);

                  console.log(_context.t0);

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 13]]);
        }));

        function chooseImage() {
          return _ref2.apply(this, arguments);
        }

        return chooseImage;
      }(),
      readTips: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _login.request)({
                    url: '/gg/group/news_read',
                    data: {
                      gallery_id: this.galleryId
                    }
                  });

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function readTips() {
          return _ref3.apply(this, arguments);
        }

        return readTips;
      }(),
      openNewAlbum: function openNewAlbum() {
        if (this.galleryAuth < 3) {
          _wepy2.default.showModal({
            title: '没有权限',
            content: '没有权限'
          });
          return;
        }
        this.$emit('openNewAlbum');
      },
      backToIndex: function backToIndex() {
        var pages = getCurrentPages().length;
        if (pages > 1) {
          _wepy2.default.navigateBack({
            delta: 1
          });
        } else {
          _wepy2.default.redirectTo({
            url: '/pages/gallery/gallery?id=' + this.groupId
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PreviewPhoto, [{
    key: 'pushlish',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                wx.showLoading({
                  title: '正在发布',
                  mask: true
                });
                _context3.next = 3;
                return (0, _login.request)({
                  url: '/gg/publish/photo',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    param: JSON.stringify(this.images),
                    gallery_id: this.galleryId
                  }
                });

              case 3:
                res = _context3.sent;

                if (res.succ && res.data) {
                  wx.hideLoading();
                  this.$emit('publishPhoto', res.data);
                }
                _context3.next = 7;
                return this.pushlishAfter();

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function pushlish() {
        return _ref4.apply(this, arguments);
      }

      return pushlish;
    }()
  }, {
    key: 'pushlishAfter',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var newsRes;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.images = [];
                _context4.next = 3;
                return (0, _login.request)({
                  url: '/gg/group/news',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 3:
                newsRes = _context4.sent;

                if (newsRes.succ && newsRes.data) {
                  this.$emit('changePublishInfo', newsRes.data);
                }

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function pushlishAfter() {
        return _ref5.apply(this, arguments);
      }

      return pushlishAfter;
    }()
  }, {
    key: 'loadImages',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(files) {
        var _this2 = this;

        var _load, _len, i;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _load = function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(file) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return (0, _api.uploadImageToQiniu)(file);

                          case 2:
                            res = _context5.sent;

                            _this2.images.push(res);
                            _this2.$apply();

                          case 5:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this2);
                  }));

                  return function _load(_x2) {
                    return _ref7.apply(this, arguments);
                  };
                }();

                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 6;
                return _load(files[i]);

              case 6:
                i++;
                _context6.next = 3;
                break;

              case 9:
                this.pushlish();

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadImages(_x) {
        return _ref6.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsInB1Ymxpc2hBZnRlckluZm8iLCJPYmplY3QiLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJsb2FkSW1hZ2VzIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwidXJsIiwiZ2FsbGVyeV9pZCIsIm9wZW5OZXdBbGJ1bSIsIiRlbWl0IiwiYmFja1RvSW5kZXgiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicmVkaXJlY3RUbyIsIm1ldGhvZCIsImhlYWRlciIsInBhcmFtIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcyIsInN1Y2MiLCJoaWRlTG9hZGluZyIsInB1c2hsaXNoQWZ0ZXIiLCJuZXdzUmVzIiwiZmlsZXMiLCJfbG9hZCIsImZpbGUiLCJwdXNoIiwiJGFwcGx5IiwiX2xlbiIsImkiLCJwdXNobGlzaCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxtQkFBYUMsTUFEUDtBQUVOQyxpQkFBV0MsTUFGTDtBQUdOQyxlQUFTRCxNQUhIO0FBSU5FLHdCQUFpQkM7QUFKWCxLLFFBTVJDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxPLEdBQVU7QUFDUkM7QUFBQSw0RUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFDUCxLQUFLVixXQUFMLEdB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QTtBQUFBO0FBQUE7QUFBQSxtQ0FDTSw2QkFBbUJBLElBQW5CLENBRE47O0FBQUE7QUFDTlAsK0JBRE07O0FBRVYsbUNBQUtoQyxNQUFMLENBQVl3QyxJQUFaLENBQWlCUixHQUFqQjtBQUNBLG1DQUFLUyxNQUFMOztBQUhVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1COztrQ0FBUkgsSzs7Ozs7QUFNQUksb0IsR0FBT0wsTUFBTWQsTTtBQUNSb0IsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlELEk7Ozs7Ozt1QkFDWkosTUFBTUQsTUFBTU0sQ0FBTixDQUFOLEM7OztBQURrQkEsbUI7Ozs7O0FBRzFCLHFCQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUdzQyxlQUFLQyxTOztrQkFBMUJ2RCxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ2FsbGVyeUF1dGg6IE51bWJlcixcbiAgICBnYWxsZXJ5SWQ6IFN0cmluZyxcbiAgICBncm91cElkOiBTdHJpbmcsXG4gICAgcHVibGlzaEFmdGVySW5mbzpPYmplY3RcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdLFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInmnYPpmZAnLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmnYPpmZAnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogOVxuICAgICAgICB9KVxuICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IGNob29zZVJlcy50ZW1wRmlsZVBhdGhzXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ato+WcqOS4iuS8oCcsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdvcGVuTmV3QWxidW0nKVxuICAgIH0sXG4gICAgYmFja1RvSW5kZXgoKSB7XG4gICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKS5sZW5ndGhcbiAgICAgIGlmIChwYWdlcyA+IDEpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBwdXNobGlzaCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOWPkeW4gycsXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvcHVibGlzaC9waG90bycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBhcmFtOiBKU09OLnN0cmluZ2lmeSh0aGlzLmltYWdlcyksXG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhKVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnB1c2hsaXNoQWZ0ZXIoKVxuICB9XG4gIGFzeW5jIHB1c2hsaXNoQWZ0ZXIoKSB7XG4gICAgdGhpcy5pbWFnZXMgPSBbXVxuICAgIHZhciBuZXdzUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3cycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAobmV3c1Jlcy5zdWNjICYmIG5ld3NSZXMuZGF0YSkge1xuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlUHVibGlzaEluZm8nLCBuZXdzUmVzLmRhdGEpXG4gICAgfVxuICB9XG4gIGFzeW5jIGxvYWRJbWFnZXMoZmlsZXMpIHtcbiAgICB2YXIgX2xvYWQgPSBhc3luYyBmaWxlID0+IHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZSlcbiAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH07XG5cbiAgICB2YXIgX2xlbiA9IGZpbGVzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICBhd2FpdCBfbG9hZChmaWxlc1tpXSlcbiAgICB9XG4gICAgdGhpcy5wdXNobGlzaCgpXG4gIH1cbn1cbiJdfQ==