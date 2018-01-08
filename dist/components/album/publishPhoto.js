'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../../utils/common.js');

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
      galleryId: '',
      publishAfterInfo: {}
    }, _this.data = {
      images: [],
      publishAfterInfo: null
    }, _this.methods = {
      chooseImageBefore: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function chooseImageBefore() {
          return _ref2.apply(this, arguments);
        }

        return chooseImageBefore;
      }(),
      chooseImage: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var chooseRes, tempFilePaths;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return (0, _common.wxPromisify)(wx.chooseImage)({
                    count: 9
                  });

                case 3:
                  chooseRes = _context2.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  wx.showLoading({
                    title: '正在上传',
                    mask: true
                  });
                  _context2.next = 8;
                  return this.loadImages(tempFilePaths);

                case 8:
                  _context2.next = 13;
                  break;

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2['catch'](0);

                  console.log(_context2.t0);

                case 13:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 10]]);
        }));

        function chooseImage() {
          return _ref3.apply(this, arguments);
        }

        return chooseImage;
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

                console.log(res);
                if (res.succ && res.data) {
                  wx.hideLoading();
                  console.log(res.data.photo_info);
                  this.$emit('publishPhoto', res.data.photo_info);
                }

              case 6:
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
                  // this.$emit('showPublishBubal', newsRes.data)
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

                            console.log(_this2);
                            _this2.images.push(res);
                            _this2.$apply();

                          case 6:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlJZCIsInB1Ymxpc2hBZnRlckluZm8iLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlQmVmb3JlIiwiY2hvb3NlSW1hZ2UiLCJ3eCIsImNvdW50IiwiY2hvb3NlUmVzIiwidGVtcEZpbGVQYXRocyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwibG9hZEltYWdlcyIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnYWxsZXJ5X2lkIiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwicGhvdG9faW5mbyIsIiRlbWl0IiwibmV3c1JlcyIsImZpbGVzIiwiX2xvYWQiLCJmaWxlIiwicHVzaCIsIiRhcHBseSIsIl9sZW4iLCJsZW5ndGgiLCJpIiwicHVzaGxpc2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVcsRUFETDtBQUVOQyx3QkFBa0I7QUFGWixLLFFBSVJDLEksR0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTEYsd0JBQWtCO0FBRmIsSyxRQUlQRyxPLEdBQVU7QUFDUkM7QUFBQSw0RUFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFuQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxTQURRO0FBRVJDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVhLHlCQUFZQyxHQUFHRCxXQUFmLEVBQTRCO0FBQ2hERSwyQkFBTztBQUR5QyxtQkFBNUIsQ0FGYjs7QUFBQTtBQUVMQywyQkFGSztBQUtMQywrQkFMSyxHQUtXRCxVQUFVQyxhQUxyQjs7QUFNVEgscUJBQUdJLFdBQUgsQ0FBZTtBQUNiQywyQkFBTyxNQURNO0FBRWJDLDBCQUFNO0FBRk8sbUJBQWY7QUFOUztBQUFBLHlCQVVILEtBQUtDLFVBQUwsQ0FBZ0JKLGFBQWhCLENBVkc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFZVEssMEJBQVFDLEdBQVI7O0FBWlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUZRLEs7Ozs7Ozs7Ozs7OztBQW9CUlQsbUJBQUdJLFdBQUgsQ0FBZTtBQUNiQyx5QkFBTyxNQURNO0FBRWJDLHdCQUFNO0FBRk8saUJBQWY7O3VCQUlnQixvQkFBUTtBQUN0QkksdUJBQUssbUJBRGlCO0FBRXRCQywwQkFBUSxNQUZjO0FBR3RCQywwQkFBUTtBQUNOLG9DQUFnQjtBQURWLG1CQUhjO0FBTXRCakIsd0JBQU07QUFDSmtCLDJCQUFPQyxLQUFLQyxTQUFMLENBQWUsS0FBS25CLE1BQXBCLENBREg7QUFFSm9CLGdDQUFZLEtBQUt2QjtBQUZiO0FBTmdCLGlCQUFSLEM7OztBQUFad0IsbUI7O0FBV0pULHdCQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQSxvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdEIsSUFBcEIsRUFBMEI7QUFDeEJLLHFCQUFHbUIsV0FBSDtBQUNBWCwwQkFBUUMsR0FBUixDQUFZUSxJQUFJdEIsSUFBSixDQUFTeUIsVUFBckI7QUFDQSx1QkFBS0MsS0FBTCxDQUFXLGNBQVgsRUFBMkJKLElBQUl0QixJQUFKLENBQVN5QixVQUFwQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFHbUIsb0JBQVE7QUFDMUJWLHVCQUFLLGdCQURxQjtBQUUxQmYsd0JBQU07QUFDSnFCLGdDQUFZLEtBQUt2QjtBQURiO0FBRm9CLGlCQUFSLEM7OztBQUFoQjZCLHVCOztBQU1KLG9CQUFJQSxRQUFRSixJQUFSLElBQWdCSSxRQUFRM0IsSUFBNUIsRUFBa0M7QUFDaEMsdUJBQUtELGdCQUFMLEdBQXdCNEIsUUFBUTNCLElBQWhDO0FBQ0E7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFFYzRCLEs7Ozs7Ozs7OztBQUNYQyxxQjtzRkFBUSxrQkFBTUMsSUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQUNNLDZCQUFtQkEsSUFBbkIsQ0FETjs7QUFBQTtBQUNOUiwrQkFETTs7QUFFVlQsb0NBQVFDLEdBQVI7QUFDQSxtQ0FBS2IsTUFBTCxDQUFZOEIsSUFBWixDQUFpQlQsR0FBakI7QUFDQSxtQ0FBS1UsTUFBTDs7QUFKVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQVJILEs7Ozs7O0FBT0FJLG9CLEdBQU9MLE1BQU1NLE07QUFDUkMsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlGLEk7Ozs7Ozt1QkFDWkosTUFBTUQsTUFBTU8sQ0FBTixDQUFOLEM7OztBQUNOdEIsd0JBQVFDLEdBQVIsQ0FBWSxlQUFaOzs7QUFGd0JxQixtQjs7Ozs7QUFJMUIscUJBQUtDLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1RXNDLGVBQUtDLFM7O2tCQUExQnpDLFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5SWQ6ICcnLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IHt9XG4gIH07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXSxcbiAgICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2VCZWZvcmU6IGFzeW5jIGZ1bmN0aW9uKCkge30sXG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmNob29zZUltYWdlKSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Y+R5biDJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLnBob3RvX2luZm8pXG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG8nLCByZXMuZGF0YS5waG90b19pbmZvKVxuICAgIH1cbiAgfVxuICBhc3luYyBwdXNobGlzaEFmdGVyKCkge1xuICAgIHZhciBuZXdzUmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3cycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAobmV3c1Jlcy5zdWNjICYmIG5ld3NSZXMuZGF0YSkge1xuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbmV3c1Jlcy5kYXRhXG4gICAgICAvLyB0aGlzLiRlbWl0KCdzaG93UHVibGlzaEJ1YmFsJywgbmV3c1Jlcy5kYXRhKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzKVxuICAgICAgdGhpcy5pbWFnZXMucHVzaChyZXMpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfTtcblxuICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgIGF3YWl0IF9sb2FkKGZpbGVzW2ldKVxuICAgICAgY29uc29sZS5sb2coJ3VwbG9hZCBmaW5pc2gnKVxuICAgIH1cbiAgICB0aGlzLnB1c2hsaXNoKClcbiAgfVxufVxuIl19