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
      },
      backToIndex: function backToIndex() {
        _wepy2.default.redirectTo({
          url: 'pages/gallery/gallery?id=' + this.groupId
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImRhdGEiLCJpbWFnZXMiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJsb2FkSW1hZ2VzIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeV9pZCIsIm9wZW5OZXdBbGJ1bSIsIiRlbWl0IiwiYmFja1RvSW5kZXgiLCJyZWRpcmVjdFRvIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwicHVzaGxpc2hBZnRlciIsIm5ld3NSZXMiLCIkYXBwbHkiLCJmaWxlcyIsIl9sb2FkIiwiZmlsZSIsInB1c2giLCJfbGVuIiwibGVuZ3RoIiwiaSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLGlCQUFXQyxNQUZMO0FBR05DLGVBQVNEO0FBSEgsSyxRQUtSRSxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLHdCQUFrQjtBQUZiLEssUUFJUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ1AsS0FBS1QsV0FBTCxHQUFtQixDQURaO0FBQUE7QUFBQTtBQUFBOztBQUVULGlDQUFLVSxTQUFMLENBQWU7QUFDYkMsMkJBQU8s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QUEsbUI7O2tDQUFSRSxLOzs7OztBQU1BRyxvQixHQUFPSixNQUFNSyxNO0FBQ1JDLGlCLEdBQUksQzs7O3NCQUFHQSxJQUFJRixJOzs7Ozs7dUJBQ1pILE1BQU1ELE1BQU1NLENBQU4sQ0FBTixDOzs7QUFEa0JBLG1COzs7OztBQUcxQixxQkFBS0MsUUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTNHc0MsZUFBS0MsUzs7a0JBQTFCbEQsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXIsXG4gICAgZ2FsbGVyeUlkOiBTdHJpbmcsXG4gICAgZ3JvdXBJZDogU3RyaW5nXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXSxcbiAgICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAyKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+ayoeacieadg+mZkCcsXG4gICAgICAgICAgY29udGVudDogJ+ayoeacieadg+mZkCdcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiA5XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5LiK5LygJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVhZFRpcHM6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzX3JlYWQnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+ayoeacieadg+mZkCcsXG4gICAgICAgICAgY29udGVudDogJ+ayoeacieadg+mZkCdcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnb3Blbk5ld0FsYnVtJylcbiAgICB9LFxuICAgIGJhY2tUb0luZGV4KCkge1xuICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElkfWBcbiAgICAgIH0pXG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Y+R5biDJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgdGhpcy4kZW1pdCgncHVibGlzaFBob3RvJywgcmVzLmRhdGEpXG4gICAgfVxuICAgIGF3YWl0IHRoaXMucHVzaGxpc2hBZnRlcigpXG4gIH1cbiAgYXN5bmMgcHVzaGxpc2hBZnRlcigpIHtcbiAgICB2YXIgbmV3c1JlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3MnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG5ld3NSZXMuc3VjYyAmJiBuZXdzUmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG5ld3NSZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=