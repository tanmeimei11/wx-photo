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
      groupId: String
    }, _this.data = {
      images: [],
      publishAfterInfo: null
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
        _wepy2.default.redirectTo({
          url: '/pages/gallery/gallery?id=' + this.groupId
        });
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
                _context4.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/news',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                newsRes = _context4.sent;

                if (newsRes.succ && newsRes.data) {
                  this.publishAfterInfo = newsRes.data;
                  this.$apply();
                }

              case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImRhdGEiLCJpbWFnZXMiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJsb2FkSW1hZ2VzIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwidXJsIiwiZ2FsbGVyeV9pZCIsIm9wZW5OZXdBbGJ1bSIsIiRlbWl0IiwiYmFja1RvSW5kZXgiLCJyZWRpcmVjdFRvIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwicHVzaGxpc2hBZnRlciIsIm5ld3NSZXMiLCIkYXBwbHkiLCJmaWxlcyIsIl9sb2FkIiwiZmlsZSIsInB1c2giLCJfbGVuIiwibGVuZ3RoIiwiaSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLGlCQUFXQyxNQUZMO0FBR05DLGVBQVNEO0FBSEgsSyxRQUtSRSxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLHdCQUFrQjtBQUZiLEssUUFJUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ1AsS0FBS1QsV0FBTCxHQUFtQixDQURaO0FBQUE7QUFBQTtBQUFBOztBQUVULGlDQUFLVSxTQUFMLENBQWU7QUFDYkMsMkJBQU8s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QUFJLEM7OztzQkFBR0EsSUFBSUYsSTs7Ozs7O3VCQUNaSCxNQUFNRCxNQUFNTSxDQUFOLENBQU4sQzs7O0FBRGtCQSxtQjs7Ozs7QUFHMUIscUJBQUtDLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2R3NDLGVBQUtDLFM7O2tCQUExQmxELFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIGdhbGxlcnlJZDogU3RyaW5nLFxuICAgIGdyb3VwSWQ6IFN0cmluZ1xuICB9O1xuICBkYXRhID0ge1xuICAgIGltYWdlczogW10sXG4gICAgcHVibGlzaEFmdGVySW5mbzogbnVsbFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInmnYPpmZAnLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmnYPpmZAnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogOVxuICAgICAgICB9KVxuICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IGNob29zZVJlcy50ZW1wRmlsZVBhdGhzXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ato+WcqOS4iuS8oCcsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdvcGVuTmV3QWxidW0nKVxuICAgIH0sXG4gICAgYmFja1RvSW5kZXgoKSB7XG4gICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElkfWBcbiAgICAgIH0pXG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Y+R5biDJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgdGhpcy4kZW1pdCgncHVibGlzaFBob3RvJywgcmVzLmRhdGEpXG4gICAgfVxuICAgIGF3YWl0IHRoaXMucHVzaGxpc2hBZnRlcigpXG4gIH1cbiAgYXN5bmMgcHVzaGxpc2hBZnRlcigpIHtcbiAgICB2YXIgbmV3c1JlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3MnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG5ld3NSZXMuc3VjYyAmJiBuZXdzUmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG5ld3NSZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=