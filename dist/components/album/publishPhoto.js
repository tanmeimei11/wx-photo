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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImRhdGEiLCJpbWFnZXMiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJsb2FkSW1hZ2VzIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwidXJsIiwiZ2FsbGVyeV9pZCIsIm9wZW5OZXdBbGJ1bSIsIiRlbWl0IiwiYmFja1RvSW5kZXgiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicmVkaXJlY3RUbyIsIm1ldGhvZCIsImhlYWRlciIsInBhcmFtIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcyIsInN1Y2MiLCJoaWRlTG9hZGluZyIsInB1c2hsaXNoQWZ0ZXIiLCJuZXdzUmVzIiwiJGFwcGx5IiwiZmlsZXMiLCJfbG9hZCIsImZpbGUiLCJwdXNoIiwiX2xlbiIsImkiLCJwdXNobGlzaCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxtQkFBYUMsTUFEUDtBQUVOQyxpQkFBV0MsTUFGTDtBQUdOQyxlQUFTRDtBQUhILEssUUFLUkUsSSxHQUFPO0FBQ0xDLGNBQVEsRUFESDtBQUVMQyx3QkFBa0I7QUFGYixLLFFBSVBDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUNQLEtBQUtULFdBQUwsR0FBbUIsQ0FEWjtB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QW5CLENBRE47O0FBQUE7QUFDTlIsK0JBRE07O0FBRVYsbUNBQUtqQyxNQUFMLENBQVkwQyxJQUFaLENBQWlCVCxHQUFqQjtBQUNBLG1DQUFLSyxNQUFMOztBQUhVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1COztrQ0FBUkUsSzs7Ozs7QUFNQUcsb0IsR0FBT0osTUFBTWYsTTtBQUNSb0IsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlELEk7Ozs7Ozt1QkFDWkgsTUFBTUQsTUFBTUssQ0FBTixDQUFOLEM7OztBQURrQkEsbUI7Ozs7O0FBRzFCLHFCQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUdzQyxlQUFLQyxTOztrQkFBMUJ0RCxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ2FsbGVyeUF1dGg6IE51bWJlcixcbiAgICBnYWxsZXJ5SWQ6IFN0cmluZyxcbiAgICBncm91cElkOiBTdHJpbmdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IG51bGxcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaG9vc2VJbWFnZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDIpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgY2hvb3NlUmVzID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3NfcmVhZCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+ayoeacieadg+mZkCcsXG4gICAgICAgICAgY29udGVudDogJ+ayoeacieadg+mZkCdcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnb3Blbk5ld0FsYnVtJylcbiAgICB9LFxuICAgIGJhY2tUb0luZGV4KCkge1xuICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoXG4gICAgICBpZiAocGFnZXMgPiAxKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElkfWBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgcHVzaGxpc2goKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfmraPlnKjlj5HluIMnLFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL3B1Ymxpc2gvcGhvdG8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXJhbTogSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpLFxuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG8nLCByZXMuZGF0YSlcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wdXNobGlzaEFmdGVyKClcbiAgfVxuICBhc3luYyBwdXNobGlzaEFmdGVyKCkge1xuICAgIHZhciBuZXdzUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3cycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAobmV3c1Jlcy5zdWNjICYmIG5ld3NSZXMuZGF0YSkge1xuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbmV3c1Jlcy5kYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIGxvYWRJbWFnZXMoZmlsZXMpIHtcbiAgICB2YXIgX2xvYWQgPSBhc3luYyBmaWxlID0+IHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZSlcbiAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH07XG5cbiAgICB2YXIgX2xlbiA9IGZpbGVzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICBhd2FpdCBfbG9hZChmaWxlc1tpXSlcbiAgICB9XG4gICAgdGhpcy5wdXNobGlzaCgpXG4gIH1cbn1cbiJdfQ==