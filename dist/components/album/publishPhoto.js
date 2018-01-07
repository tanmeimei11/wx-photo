'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./../../utils/common.js');

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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      images: []
    }, _this.methods = {
      chooseImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  (0, _common.wxPromisify)(wx.chooseImage)({
                    count: 9,
                    success: function success(res) {}
                  }).then(function (res) {
                    var tempFilePaths = res.tempFilePaths;
                    wx.showLoading({
                      title: '正在上传'
                    });
                    console.log(tempFilePaths);
                    return _this2.loadImages(tempFilePaths);
                  }).then(function () {
                    wx.hideLoading();
                    console.log(_this2.images);
                  });

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
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
    value: function pushlish() {
      (0, _login.request)({
        url: '/gg/publish/photo',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          param: JSON.stringify(this.images)
        }
      });
    }
  }, {
    key: 'loadImages',
    value: function loadImages(files) {
      var _this3 = this;

      var len = files.length;
      var _num = 0;
      var _load = function _load(file) {
        console.log(_num, len, file);
        return (0, _api.uploadImageToQiniu)(file).then(function (res) {
          _this3.images.push(res);
          _this3.$apply();
          if (_num >= len - 1 || _this3.images.length >= 9) {
            return 'succ';
          }
          return _load(files[++_num]);
        });
      };
      return _load(files[_num]).then(function () {
        console.log('------all images upload succ-----');
        _this3.pushlish();
      });
    }
  }]);

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwid3giLCJjb3VudCIsInN1Y2Nlc3MiLCJyZXMiLCJ0aGVuIiwidGVtcEZpbGVQYXRocyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJjb25zb2xlIiwibG9nIiwibG9hZEltYWdlcyIsImhpZGVMb2FkaW5nIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZmlsZXMiLCJsZW4iLCJsZW5ndGgiLCJfbnVtIiwiX2xvYWQiLCJmaWxlIiwicHVzaCIsIiRhcHBseSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFhO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWCwyQ0FBWUMsR0FBR0QsV0FBZixFQUE0QjtBQUMxQkUsMkJBQU8sQ0FEbUI7QUFFMUJDLDZCQUFTLGlCQUFTQyxHQUFULEVBQWMsQ0FBRTtBQUZDLG1CQUE1QixFQUlHQyxJQUpILENBSVEsZUFBTztBQUNYLHdCQUFJQyxnQkFBZ0JGLElBQUlFLGFBQXhCO0FBQ0FMLHVCQUFHTSxXQUFILENBQWU7QUFDYkMsNkJBQU87QUFETSxxQkFBZjtBQUdBQyw0QkFBUUMsR0FBUixDQUFZSixhQUFaO0FBQ0EsMkJBQU8sT0FBS0ssVUFBTCxDQUFnQkwsYUFBaEIsQ0FBUDtBQUNELG1CQVhILEVBWUdELElBWkgsQ0FZUSxZQUFNO0FBQ1ZKLHVCQUFHVyxXQUFIO0FBQ0FILDRCQUFRQyxHQUFSLENBQVksT0FBS1osTUFBakI7QUFDRCxtQkFmSDs7QUFEVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBRFEsSzs7Ozs7K0JBcUJDO0FBQ1QsMEJBQVE7QUFDTmUsYUFBSyxtQkFEQztBQUVOQyxnQkFBUSxNQUZGO0FBR05DLGdCQUFRO0FBQ04sMEJBQWdCO0FBRFYsU0FIRjtBQU1ObEIsY0FBTTtBQUNKbUIsaUJBQU9DLEtBQUtDLFNBQUwsQ0FBZSxLQUFLcEIsTUFBcEI7QUFESDtBQU5BLE9BQVI7QUFVRDs7OytCQUNVcUIsSyxFQUFPO0FBQUE7O0FBQ2hCLFVBQUlDLE1BQU1ELE1BQU1FLE1BQWhCO0FBQ0EsVUFBSUMsT0FBTyxDQUFYO0FBQ0EsVUFBSUMsUUFBUSxTQUFSQSxLQUFRLE9BQVE7QUFDbEJkLGdCQUFRQyxHQUFSLENBQVlZLElBQVosRUFBa0JGLEdBQWxCLEVBQXVCSSxJQUF2QjtBQUNBLGVBQU8sNkJBQW1CQSxJQUFuQixFQUF5Qm5CLElBQXpCLENBQThCLGVBQU87QUFDMUMsaUJBQUtQLE1BQUwsQ0FBWTJCLElBQVosQ0FBaUJyQixHQUFqQjtBQUNBLGlCQUFLc0IsTUFBTDtBQUNBLGNBQUlKLFFBQVFGLE1BQU0sQ0FBZCxJQUFtQixPQUFLdEIsTUFBTCxDQUFZdUIsTUFBWixJQUFzQixDQUE3QyxFQUFnRDtBQUM5QyxtQkFBTyxNQUFQO0FBQ0Q7QUFDRCxpQkFBT0UsTUFBTUosTUFBTSxFQUFFRyxJQUFSLENBQU4sQ0FBUDtBQUNELFNBUE0sQ0FBUDtBQVFELE9BVkQ7QUFXQSxhQUFPQyxNQUFNSixNQUFNRyxJQUFOLENBQU4sRUFBbUJqQixJQUFuQixDQUF3QixZQUFNO0FBQ25DSSxnQkFBUUMsR0FBUixDQUFZLG1DQUFaO0FBQ0EsZUFBS2lCLFFBQUw7QUFDRCxPQUhNLENBQVA7QUFJRDs7OztFQXZEdUMsZUFBS0MsUzs7a0JBQTFCaEMsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHd4UHJvbWlzaWZ5KHd4LmNob29zZUltYWdlKSh7XG4gICAgICAgIGNvdW50OiA5LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHt9XG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+ato+WcqOS4iuS8oCdcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBGaWxlUGF0aHMpXG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW1hZ2VzKVxuICAgICAgICB9KVxuICAgIH1cbiAgfTtcblxuICBwdXNobGlzaCgpIHtcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHZhciBsZW4gPSBmaWxlcy5sZW5ndGhcbiAgICB2YXIgX251bSA9IDBcbiAgICB2YXIgX2xvYWQgPSBmaWxlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKF9udW0sIGxlbiwgZmlsZSlcbiAgICAgIHJldHVybiB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICBpZiAoX251bSA+PSBsZW4gLSAxIHx8IHRoaXMuaW1hZ2VzLmxlbmd0aCA+PSA5KSB7XG4gICAgICAgICAgcmV0dXJuICdzdWNjJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2xvYWQoZmlsZXNbKytfbnVtXSlcbiAgICAgIH0pXG4gICAgfTtcbiAgICByZXR1cm4gX2xvYWQoZmlsZXNbX251bV0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJy0tLS0tLWFsbCBpbWFnZXMgdXBsb2FkIHN1Y2MtLS0tLScpXG4gICAgICB0aGlzLnB1c2hsaXNoKClcbiAgICB9KVxuICB9XG59XG4iXX0=