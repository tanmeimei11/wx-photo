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
      galleryId: String
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
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZGF0YSIsImltYWdlcyIsInB1Ymxpc2hBZnRlckluZm8iLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjb3VudCIsImNob29zZVJlcyIsInRlbXBGaWxlUGF0aHMiLCJ3eCIsInNob3dMb2FkaW5nIiwibWFzayIsImxvYWRJbWFnZXMiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJnYWxsZXJ5X2lkIiwib3Blbk5ld0FsYnVtIiwiJGVtaXQiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJzdWNjIiwiaGlkZUxvYWRpbmciLCJwdXNobGlzaEFmdGVyIiwibmV3c1JlcyIsIiRhcHBseSIsImZpbGVzIiwiX2xvYWQiLCJmaWxlIiwicHVzaCIsIl9sZW4iLCJsZW5ndGgiLCJpIiwicHVzaGxpc2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsbUJBQWFDLE1BRFA7QUFFTkMsaUJBQVdDO0FBRkwsSyxRQUlSQyxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLHdCQUFrQjtBQUZiLEssUUFJUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ1AsS0FBS1IsV0FBTCxHQUFtQixDQURaO0FBQUE7QUFBQTtBQUFBOztBQUVULGlDQUFLUyxTQUFMLENBQWU7QUFDYkMsMkJBQU8sTUFETTtBQUViQyw2QkFBUztBQUZJLG1CQUFmO0FBRlM7O0FBQUE7QUFBQTtBQUFBO0FBQUEs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UUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJHc0MsZUFBS0MsUzs7a0JBQTFCL0MsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXIsXG4gICAgZ2FsbGVyeUlkOiBTdHJpbmdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IG51bGxcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaG9vc2VJbWFnZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDIpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgY2hvb3NlUmVzID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3NfcmVhZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdvcGVuTmV3QWxidW0nKVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBwdXNobGlzaCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOWPkeW4gycsXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSlcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvcHVibGlzaC9waG90bycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBhcmFtOiBKU09OLnN0cmluZ2lmeSh0aGlzLmltYWdlcyksXG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhKVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnB1c2hsaXNoQWZ0ZXIoKVxuICB9XG4gIGFzeW5jIHB1c2hsaXNoQWZ0ZXIoKSB7XG4gICAgdmFyIG5ld3NSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChuZXdzUmVzLnN1Y2MgJiYgbmV3c1Jlcy5kYXRhKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBuZXdzUmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgYXN5bmMgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHZhciBfbG9hZCA9IGFzeW5jIGZpbGUgPT4ge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlKVxuICAgICAgdGhpcy5pbWFnZXMucHVzaChyZXMpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfTtcblxuICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgIGF3YWl0IF9sb2FkKGZpbGVzW2ldKVxuICAgIH1cbiAgICB0aGlzLnB1c2hsaXNoKClcbiAgfVxufVxuIl19