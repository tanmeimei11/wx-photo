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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      images: []
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
                  return (0, _common.wxPromisify)(wx.chooseImage)({
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
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PreviewPhoto, [{
    key: 'pushlish',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                wx.showLoading({
                  title: '正在发布',
                  mask: true
                });
                _context2.next = 3;
                return (0, _login.request)({
                  url: '/gg/publish/photo',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    param: JSON.stringify(this.images),
                    gallery_id: 1
                  }
                });

              case 3:
                res = _context2.sent;


                if (res.succ && res.data) {
                  wx.hideLoading();
                  this.$emit('publishPhoto', res.data.photo_info);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function pushlish() {
        return _ref3.apply(this, arguments);
      }

      return pushlish;
    }()
  }, {
    key: 'loadImages',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(files) {
        var _this2 = this;

        var _load, _len, i;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _load = function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return (0, _api.uploadImageToQiniu)(file);

                          case 2:
                            res = _context3.sent;

                            console.log(_this2);
                            _this2.images.push(res);
                            _this2.$apply();

                          case 6:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function _load(_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }();

                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 6;
                return _load(files[i]);

              case 6:
                i++;
                _context4.next = 3;
                break;

              case 9:
                this.pushlish();

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadImages(_x) {
        return _ref4.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwid3giLCJjb3VudCIsImNob29zZVJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImxvYWRJbWFnZXMiLCJjb25zb2xlIiwibG9nIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZ2FsbGVyeV9pZCIsInJlcyIsInN1Y2MiLCJoaWRlTG9hZGluZyIsIiRlbWl0IiwicGhvdG9faW5mbyIsImZpbGVzIiwiX2xvYWQiLCJmaWxlIiwicHVzaCIsIiRhcHBseSIsIl9sZW4iLCJsZW5ndGgiLCJpIiwicHVzaGxpc2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFHUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVhLHlCQUFZQyxHQUFHRCxXQUFmLEVBQTRCO0FBQ2hERSwyQkFBTztBQUR5QyxtQkFBNUIsQ0FGYjs7QUFBQTtBQUVMQywyQkFGSztBQUtMQywrQkFMSyxHQUtXRCxVQUFVQyxhQUxyQjs7QUFNVEgscUJBQUdJLFdBQUgsQ0FBZTtBQUNiQywyQkFBTyxNQURNO0FBRWJDLDBCQUFNO0FBRk8sbUJBQWY7QUFOUztBQUFBLHlCQVVILEtBQUtDLFVBQUwsQ0FBZ0JKLGFBQWhCLENBVkc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFZVEssMEJBQVFDLEdBQVI7O0FBWlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQURRLEs7Ozs7Ozs7Ozs7OztBQW1CUlQsbUJBQUdJLFdBQUgsQ0FBZTtBQUNiQyx5QkFBTyxNQURNO0FBRWJDLHdCQUFNO0FBRk8saUJBQWY7O3VCQUlnQixvQkFBUTtBQUN0QkksdUJBQUssbUJBRGlCO0FBRXRCQywwQkFBUSxNQUZjO0FBR3RCQywwQkFBUTtBQUNOLG9DQUFnQjtBQURWLG1CQUhjO0FBTXRCaEIsd0JBQU07QUFDSmlCLDJCQUFPQyxLQUFLQyxTQUFMLENBQWUsS0FBS2xCLE1BQXBCLENBREg7QUFFSm1CLGdDQUFZO0FBRlI7QUFOZ0IsaUJBQVIsQzs7O0FBQVpDLG1COzs7QUFZSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJckIsSUFBcEIsRUFBMEI7QUFDeEJJLHFCQUFHbUIsV0FBSDtBQUNBLHVCQUFLQyxLQUFMLENBQVcsY0FBWCxFQUEyQkgsSUFBSXJCLElBQUosQ0FBU3lCLFVBQXBDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR2NDLEs7Ozs7Ozs7OztBQUNYQyxxQjtzRkFBUSxrQkFBTUMsSUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQUNNLDZCQUFtQkEsSUFBbkIsQ0FETjs7QUFBQTtBQUNOUCwrQkFETTs7QUFFVlQsb0NBQVFDLEdBQVI7QUFDQSxtQ0FBS1osTUFBTCxDQUFZNEIsSUFBWixDQUFpQlIsR0FBakI7QUFDQSxtQ0FBS1MsTUFBTDs7QUFKVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQVJILEs7Ozs7O0FBT0FJLG9CLEdBQU9MLE1BQU1NLE07QUFDUkMsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlGLEk7Ozs7Ozt1QkFDWkosTUFBTUQsTUFBTU8sQ0FBTixDQUFOLEM7OztBQURrQkEsbUI7Ozs7O0FBRzFCLHFCQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBekRzQyxlQUFLQyxTOztrQkFBMUJwQyxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB3eFByb21pc2lmeSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbi5qcyc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmNob29zZUltYWdlKSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Y+R5biDJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogMVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhLnBob3RvX2luZm8pXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHZhciBfbG9hZCA9IGFzeW5jIGZpbGUgPT4ge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlKVxuICAgICAgY29uc29sZS5sb2codGhpcylcbiAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH07XG5cbiAgICB2YXIgX2xlbiA9IGZpbGVzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICBhd2FpdCBfbG9hZChmaWxlc1tpXSlcbiAgICB9XG4gICAgdGhpcy5wdXNobGlzaCgpXG4gIH1cbn1cbiJdfQ==