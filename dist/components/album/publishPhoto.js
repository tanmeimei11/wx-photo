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
                  _context.prev = 0;
                  _context.next = 3;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 3:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  wx.showLoading({
                    title: '正在上传',
                    mask: true
                  });
                  _context.next = 8;
                  return this.loadImages(tempFilePaths);

                case 8:
                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context['catch'](0);

                  console.log(_context.t0);

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 10]]);
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
      }()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlJZCIsIlN0cmluZyIsImRhdGEiLCJpbWFnZXMiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImxvYWRJbWFnZXMiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJnYWxsZXJ5X2lkIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwiJGVtaXQiLCJwdXNobGlzaEFmdGVyIiwibmV3c1JlcyIsIiRhcHBseSIsImZpbGVzIiwiX2xvYWQiLCJmaWxlIiwicHVzaCIsIl9sZW4iLCJsZW5ndGgiLCJpIiwicHVzaGxpc2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVdDO0FBREwsSyxRQUdSQyxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLHdCQUFrQjtBQUZiLEssUUFJUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVhLGVBQUtBLFdBQUwsQ0FBaUI7QUFDckNDLDJCQUFPO0FBRDhCLG1CQUFqQixDQUZiOztBQUFBO0FBRUxDLDJCQUZLO0FBS0xDLCtCQUxLLEdBS1dELFVBQVVDLGFBTHJCOztBQU1UQyxxQkFBR0MsV0FBSCxDQUFlO0FBQ2JDLDJCQUFPLE1BRE07QUFFYkMsMEJBQU07QUFGTyxtQkFBZjtBQU5TO0FBQUEseUJBVUgsS0FBS0MsVUFBTCxDQUFnQkwsYUFBaEIsQ0FWRzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVlUTSwwQkFBUUMsR0FBUjs7QUFaUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLFNBRFE7QUFnQlJDO0FBQUEsNEVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQ0Ysb0JBQVE7QUFDWkMseUJBQUsscUJBRE87QUFFWkMsNEJBQVEsTUFGSTtBQUdaQyw0QkFBUTtBQUNOLHNDQUFnQjtBQURWLHFCQUhJO0FBTVpsQiwwQkFBTTtBQUNKbUIsa0NBQVksS0FBS3JCO0FBRGI7QUFOTSxtQkFBUixDQURFOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFoQlEsSzs7Ozs7Ozs7Ozs7O0FBK0JSVSxtQkFBR0MsV0FBSCxDQUFlO0FBQ2JDLHlCQUFPLE1BRE07QUFFYkMsd0JBQU07QUFGTyxpQkFBZjs7dUJBSWdCLG9CQUFRO0FBQ3RCSyx1QkFBSyxtQkFEaUI7QUFFdEJDLDBCQUFRLE1BRmM7QUFHdEJDLDBCQUFRO0FBQ04sb0NBQWdCO0FBRFYsbUJBSGM7QUFNdEJsQix3QkFBTTtBQUNKb0IsMkJBQU9DLEtBQUtDLFNBQUwsQ0FBZSxLQUFLckIsTUFBcEIsQ0FESDtBQUVKa0IsZ0NBQVksS0FBS3JCO0FBRmI7QUFOZ0IsaUJBQVIsQzs7O0FBQVp5QixtQjs7QUFXSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdkIsSUFBcEIsRUFBMEI7QUFDeEJRLHFCQUFHaUIsV0FBSDtBQUNBLHVCQUFLQyxLQUFMLENBQVcsY0FBWCxFQUEyQkgsSUFBSXZCLElBQS9CO0FBQ0Q7O3VCQUNLLEtBQUsyQixhQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdjLG9CQUFRO0FBQzFCWCx1QkFBSyxnQkFEcUI7QUFFMUJoQix3QkFBTTtBQUNKbUIsZ0NBQVksS0FBS3JCO0FBRGI7QUFGb0IsaUJBQVIsQzs7O0FBQWhCOEIsdUI7O0FBTUosb0JBQUlBLFFBQVFKLElBQVIsSUFBZ0JJLFFBQVE1QixJQUE1QixFQUFrQztBQUNoQyx1QkFBS0UsZ0JBQUwsR0FBd0IwQixRQUFRNUIsSUFBaEM7QUFDQSx1QkFBSzZCLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFFY0MsSzs7Ozs7Ozs7O0FBQ1hDLHFCO3NGQUFRLGtCQUFNQyxJQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUNBQ00sNkJBQW1CQSxJQUFuQixDQUROOztBQUFBO0FBQ05ULCtCQURNOztBQUVWLG1DQUFLdEIsTUFBTCxDQUFZZ0MsSUFBWixDQUFpQlYsR0FBakI7QUFDQSxtQ0FBS00sTUFBTDs7QUFIVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQVJFLEs7Ozs7O0FBTUFHLG9CLEdBQU9KLE1BQU1LLE07QUFDUkMsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlGLEk7Ozs7Ozt1QkFDWkgsTUFBTUQsTUFBTU0sQ0FBTixDQUFOLEM7OztBQURrQkEsbUI7Ozs7O0FBRzFCLHFCQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbkZzQyxlQUFLQyxTOztrQkFBMUIxQyxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ2FsbGVyeUlkOiBTdHJpbmdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IG51bGxcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaG9vc2VJbWFnZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgY2hvb3NlUmVzID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3NfcmVhZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Y+R5biDJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgdGhpcy4kZW1pdCgncHVibGlzaFBob3RvJywgcmVzLmRhdGEpXG4gICAgfVxuICAgIGF3YWl0IHRoaXMucHVzaGxpc2hBZnRlcigpXG4gIH1cbiAgYXN5bmMgcHVzaGxpc2hBZnRlcigpIHtcbiAgICB2YXIgbmV3c1JlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3MnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG5ld3NSZXMuc3VjYyAmJiBuZXdzUmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG5ld3NSZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=