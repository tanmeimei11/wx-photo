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
                    title: '正在上传'
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
                  title: '正在发布'
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
                  this.$emit('publishPhoto', res.data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwid3giLCJjb3VudCIsImNob29zZVJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibG9hZEltYWdlcyIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnYWxsZXJ5X2lkIiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwiJGVtaXQiLCJmaWxlcyIsIl9sb2FkIiwiZmlsZSIsInB1c2giLCIkYXBwbHkiLCJfbGVuIiwibGVuZ3RoIiwiaSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFYSx5QkFBWUMsR0FBR0QsV0FBZixFQUE0QjtBQUNoREUsMkJBQU87QUFEeUMsbUJBQTVCLENBRmI7O0FBQUE7QUFFTEMsMkJBRks7QUFLTEMsK0JBTEssR0FLV0QsVUFBVUMsYUFMckI7O0FBTVRILHFCQUFHSSxXQUFILENBQWU7QUFDYkMsMkJBQU87QUFETSxtQkFBZjtBQU5TO0FBQUEseUJBU0gsS0FBS0MsVUFBTCxDQUFnQkgsYUFBaEIsQ0FURzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVdUSSwwQkFBUUMsR0FBUjs7QUFYUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBRFEsSzs7Ozs7Ozs7Ozs7O0FBa0JSUixtQkFBR0ksV0FBSCxDQUFlO0FBQ2JDLHlCQUFPO0FBRE0saUJBQWY7O3VCQUdnQixvQkFBUTtBQUN0QkksdUJBQUssbUJBRGlCO0FBRXRCQywwQkFBUSxNQUZjO0FBR3RCQywwQkFBUTtBQUNOLG9DQUFnQjtBQURWLG1CQUhjO0FBTXRCZix3QkFBTTtBQUNKZ0IsMkJBQU9DLEtBQUtDLFNBQUwsQ0FBZSxLQUFLakIsTUFBcEIsQ0FESDtBQUVKa0IsZ0NBQVk7QUFGUjtBQU5nQixpQkFBUixDOzs7QUFBWkMsbUI7OztBQVlKLG9CQUFJQSxJQUFJQyxJQUFKLElBQVlELElBQUlwQixJQUFwQixFQUEwQjtBQUN4QkkscUJBQUdrQixXQUFIO0FBQ0EsdUJBQUtDLEtBQUwsQ0FBVyxjQUFYLEVBQTJCSCxJQUFJcEIsSUFBL0I7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFHY3dCLEs7Ozs7Ozs7OztBQUNYQyxxQjtzRkFBUSxrQkFBTUMsSUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQUNNLDZCQUFtQkEsSUFBbkIsQ0FETjs7QUFBQTtBQUNOTiwrQkFETTs7QUFFVlQsb0NBQVFDLEdBQVI7QUFDQSxtQ0FBS1gsTUFBTCxDQUFZMEIsSUFBWixDQUFpQlAsR0FBakI7QUFDQSxtQ0FBS1EsTUFBTDs7QUFKVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQVJILEs7Ozs7O0FBT0FJLG9CLEdBQU9MLE1BQU1NLE07QUFDUkMsaUIsR0FBSSxDOzs7c0JBQUdBLElBQUlGLEk7Ozs7Ozt1QkFDWkosTUFBTUQsTUFBTU8sQ0FBTixDQUFOLEM7OztBQURrQkEsbUI7Ozs7O0FBRzFCLHFCQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdkRzQyxlQUFLQyxTOztrQkFBMUJsQyxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB3eFByb21pc2lmeSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbi5qcyc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmNob29zZUltYWdlKSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmraPlnKjkuIrkvKAnXG4gICAgICAgIH0pXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBwdXNobGlzaCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOWPkeW4gydcbiAgICB9KVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogMVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbWFnZXMoZmlsZXMpIHtcbiAgICB2YXIgX2xvYWQgPSBhc3luYyBmaWxlID0+IHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=