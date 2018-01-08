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
                  this.$emit('publishPhoto', res.data.photo_info);
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
                  _context6.next = 10;
                  break;
                }

                _context6.next = 6;
                return _load(files[i]);

              case 6:
                console.log('upload finish');

              case 7:
                i++;
                _context6.next = 3;
                break;

              case 10:
                this.pushlish();

              case 11:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlJZCIsIlN0cmluZyIsImRhdGEiLCJpbWFnZXMiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImxvYWRJbWFnZXMiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJnYWxsZXJ5X2lkIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwiJGVtaXQiLCJwaG90b19pbmZvIiwicHVzaGxpc2hBZnRlciIsIm5ld3NSZXMiLCIkYXBwbHkiLCJmaWxlcyIsIl9sb2FkIiwiZmlsZSIsInB1c2giLCJfbGVuIiwibGVuZ3RoIiwiaSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXQztBQURMLEssUUFHUkMsSSxHQUFPO0FBQ0xDLGNBQVEsRUFESDtBQUVMQyx3QkFBa0I7QUFGYixLLFFBSVBDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFYSxlQUFLQSxXQUFMLENBQWlCO0FBQ3JDQywyQkFBTztBQUQ4QixtQkFBakIsQ0FGYjs7QUFBQTtBQUVMQywyQkFGSztBQUtMQywrQkFMSyxHQUtXRCxVQUFVQyxhQUxyQjs7QUFNVEMscUJBQUdDLFdBQUgsQ0FBZTtBQUNiQywyQkFBTyxNQURNO0FBRWJDLDBCQUFNO0FBRk8sbUJBQWY7QUFOUztBQUFBLHlCQVVILEtBQUtDLFVBQUwsQ0FBZ0JMLGFBQWhCLENBVkc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFZVE0sMEJBQVFDLEdBQVI7O0FBWlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxTQURRO0FBZ0JSQztBQUFBLDRFQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUNGLG9CQUFRO0FBQ1pDLHlCQUFLLHFCQURPO0FBRVpDLDRCQUFRLE1BRkk7QUFHWkMsNEJBQVE7QUFDTixzQ0FBZ0I7QUFEVixxQkFISTtBQU1abEIsMEJBQU07QUFDSm1CLGtDQUFZLEtBQUtyQjtBQURiO0FBTk0sbUJBQVIsQ0FERTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFWOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBaEJRLEs7Ozs7Ozs7Ozs7OztBQStCUlUsbUJBQUdDLFdBQUgsQ0FBZTtBQUNiQyx5QkFBTyxNQURNO0FBRWJDLHdCQUFNO0FBRk8saUJBQWY7O3VCQUlnQixvQkFBUTtBQUN0QkssdUJBQUssbUJBRGlCO0FBRXRCQywwQkFBUSxNQUZjO0FBR3RCQywwQkFBUTtBQUNOLG9DQUFnQjtBQURWLG1CQUhjO0FBTXRCbEIsd0JBQU07QUFDSm9CLDJCQUFPQyxLQUFLQyxTQUFMLENBQWUsS0FBS3JCLE1BQXBCLENBREg7QUFFSmtCLGdDQUFZLEtBQUtyQjtBQUZiO0FBTmdCLGlCQUFSLEM7OztBQUFaeUIsbUI7O0FBV0osb0JBQUlBLElBQUlDLElBQUosSUFBWUQsSUFBSXZCLElBQXBCLEVBQTBCO0FBQ3hCUSxxQkFBR2lCLFdBQUg7QUFDQSx1QkFBS0MsS0FBTCxDQUFXLGNBQVgsRUFBMkJILElBQUl2QixJQUFKLENBQVMyQixVQUFwQztBQUNEOzt1QkFDSyxLQUFLQyxhQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdjLG9CQUFRO0FBQzFCWix1QkFBSyxnQkFEcUI7QUFFMUJoQix3QkFBTTtBQUNKbUIsZ0NBQVksS0FBS3JCO0FBRGI7QUFGb0IsaUJBQVIsQzs7O0FBQWhCK0IsdUI7O0FBTUosb0JBQUlBLFFBQVFMLElBQVIsSUFBZ0JLLFFBQVE3QixJQUE1QixFQUFrQztBQUNoQyx1QkFBS0UsZ0JBQUwsR0FBd0IyQixRQUFRN0IsSUFBaEM7QUFDQSx1QkFBSzhCLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFFY0MsSzs7Ozs7Ozs7O0FBQ1hDLHFCO3NGQUFRLGtCQUFNQyxJQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUNBQ00sNkJBQW1CQSxJQUFuQixDQUROOztBQUFBO0FBQ05WLCtCQURNOztBQUVWLG1DQUFLdEIsTUFBTCxDQUFZaUMsSUFBWixDQUFpQlgsR0FBakI7QUFDQSxtQ0FBS08sTUFBTDs7QUFIVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQVJFLEs7Ozs7O0FBTUFHLG9CLEdBQU9KLE1BQU1LLE07QUFDUkMsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlGLEk7Ozs7Ozt1QkFDWkgsTUFBTUQsTUFBTU0sQ0FBTixDQUFOLEM7OztBQUNOeEIsd0JBQVFDLEdBQVIsQ0FBWSxlQUFaOzs7QUFGd0J1QixtQjs7Ozs7QUFJMUIscUJBQUtDLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFwRnNDLGVBQUtDLFM7O2tCQUExQjNDLFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5SWQ6IFN0cmluZ1xuICB9O1xuICBkYXRhID0ge1xuICAgIGltYWdlczogW10sXG4gICAgcHVibGlzaEFmdGVySW5mbzogbnVsbFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogOVxuICAgICAgICB9KVxuICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IGNob29zZVJlcy50ZW1wRmlsZVBhdGhzXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ato+WcqOS4iuS8oCcsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgcHVzaGxpc2goKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfmraPlnKjlj5HluIMnLFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL3B1Ymxpc2gvcGhvdG8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXJhbTogSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpLFxuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG8nLCByZXMuZGF0YS5waG90b19pbmZvKVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnB1c2hsaXNoQWZ0ZXIoKVxuICB9XG4gIGFzeW5jIHB1c2hsaXNoQWZ0ZXIoKSB7XG4gICAgdmFyIG5ld3NSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChuZXdzUmVzLnN1Y2MgJiYgbmV3c1Jlcy5kYXRhKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBuZXdzUmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgYXN5bmMgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHZhciBfbG9hZCA9IGFzeW5jIGZpbGUgPT4ge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlKVxuICAgICAgdGhpcy5pbWFnZXMucHVzaChyZXMpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfTtcblxuICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgIGF3YWl0IF9sb2FkKGZpbGVzW2ldKVxuICAgICAgY29uc29sZS5sb2coJ3VwbG9hZCBmaW5pc2gnKVxuICAgIH1cbiAgICB0aGlzLnB1c2hsaXNoKClcbiAgfVxufVxuIl19