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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      images: []
    }, _this.methods = {
      chooseImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var mm, chooseRes, tempFilePaths;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  mm = _wepy2.default;

                  console.log(mm);
                  _context.prev = 2;
                  _context.next = 5;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 5:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  wx.showLoading({
                    title: '正在上传'
                  });
                  _context.next = 10;
                  return this.loadImages(tempFilePaths);

                case 10:
                  _context.next = 15;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context['catch'](2);

                  console.log(_context.t0);

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 12]]);
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
      wx.showLoading({
        title: '正在发布'
      });
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
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(files) {
        var _this2 = this;

        var _load, _len, i;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _load = function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return (0, _api.uploadImageToQiniu)(file);

                          case 2:
                            res = _context2.sent;

                            _this2.images.push(res);
                            _this2.$apply();

                          case 5:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function _load(_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return _load(files[i]);

              case 6:
                i++;
                _context3.next = 3;
                break;

              case 9:
                this.pushlish();

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadImages(_x) {
        return _ref3.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwibW0iLCJjb25zb2xlIiwibG9nIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibG9hZEltYWdlcyIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInBhcmFtIiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbGVzIiwiX2xvYWQiLCJmaWxlIiwicmVzIiwicHVzaCIsIiRhcHBseSIsIl9sZW4iLCJsZW5ndGgiLCJpIiwicHVzaGxpc2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFHUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1BDLG9CQURPOztBQUVYQywwQkFBUUMsR0FBUixDQUFZRixFQUFaO0FBRlc7QUFBQTtBQUFBLHlCQUlhLGVBQUtELFdBQUwsQ0FBaUI7QUFDckNJLDJCQUFPO0FBRDhCLG1CQUFqQixDQUpiOztBQUFBO0FBSUxDLDJCQUpLO0FBT0xDLCtCQVBLLEdBT1dELFVBQVVDLGFBUHJCOztBQVFUQyxxQkFBR0MsV0FBSCxDQUFlO0FBQ2JDLDJCQUFPO0FBRE0sbUJBQWY7QUFSUztBQUFBLHlCQVdILEtBQUtDLFVBQUwsQ0FBZ0JKLGFBQWhCLENBWEc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFhVEosMEJBQVFDLEdBQVI7O0FBYlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQURRLEs7Ozs7OytCQW1CQztBQUNUSSxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBTztBQURNLE9BQWY7QUFHQSwwQkFBUTtBQUNORSxhQUFLLG1CQURDO0FBRU5DLGdCQUFRLE1BRkY7QUFHTkMsZ0JBQVE7QUFDTiwwQkFBZ0I7QUFEVixTQUhGO0FBTU5oQixjQUFNO0FBQ0ppQixpQkFBT0MsS0FBS0MsU0FBTCxDQUFlLEtBQUtsQixNQUFwQjtBQURIO0FBTkEsT0FBUjtBQVVEOzs7OzRGQUVnQm1CLEs7Ozs7Ozs7OztBQUNYQyxxQjtzRkFBUSxrQkFBTUMsSUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQUNNLDZCQUFtQkEsSUFBbkIsQ0FETjs7QUFBQTtBQUNOQywrQkFETTs7QUFFVixtQ0FBS3RCLE1BQUwsQ0FBWXVCLElBQVosQ0FBaUJELEdBQWpCO0FBQ0EsbUNBQUtFLE1BQUw7O0FBSFU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUI7O2tDQUFSSixLOzs7OztBQU1BSyxvQixHQUFPTixNQUFNTyxNO0FBQ1JDLGlCLEdBQUksQzs7O3NCQUFHQSxJQUFJRixJOzs7Ozs7dUJBQ1pMLE1BQU1ELE1BQU1RLENBQU4sQ0FBTixDOzs7QUFEa0JBLG1COzs7OztBQUcxQixxQkFBS0MsUUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWxEc0MsZUFBS0MsUzs7a0JBQTFCL0IsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtbSA9IHdlcHlcbiAgICAgIGNvbnNvbGUubG9nKG1tKVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiA5XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5LiK5LygJ1xuICAgICAgICB9KVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHVzaGxpc2goKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfmraPlnKjlj5HluIMnXG4gICAgfSlcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=