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

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

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
      groupId: String,
      publishAfterInfo: Object
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      images: []
    }, _this.methods = {
      chooseImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var chooseRes, tempFilePaths;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.images = [];

                  if (!(this.galleryAuth < 2)) {
                    _context.next = 4;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: '没有权限',
                    content: '没有权限'
                  });
                  return _context.abrupt('return');

                case 4:
                  _context.prev = 4;
                  _context.next = 7;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 7:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  this.loadingIn('正在上传');
                  _context.next = 12;
                  return this.loadImages(tempFilePaths);

                case 12:
                  _context.next = 19;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context['catch'](4);

                  this.loadingOut();
                  this.toastFail('上传失败');
                  console.log(_context.t0);

                case 19:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 14]]);
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
  // 混合


  _createClass(PreviewPhoto, [{
    key: 'pushlish',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loadingIn('正在发布');
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
                  this.$emit('changePublishInfo', newsRes.data);
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
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(files) {
        var _len, i, res;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 6;
                return (0, _api.uploadImageToQiniu)(files[i]);

              case 6:
                res = _context5.sent;

                this.images.push(res);

              case 8:
                i++;
                _context5.next = 3;
                break;

              case 11:
                this.$apply();
                this.pushlish();
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5['catch'](0);
                throw new Error();

              case 18:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 15]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsInB1Ymxpc2hBZnRlckluZm8iLCJPYmplY3QiLCJtaXhpbnMiLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibG9hZGluZ0luIiwibG9hZEltYWdlcyIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJ1cmwiLCJnYWxsZXJ5X2lkIiwib3Blbk5ld0FsYnVtIiwiJGVtaXQiLCJiYWNrVG9JbmRleCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsInd4IiwiaGlkZUxvYWRpbmciLCJwdXNobGlzaEFmdGVyIiwibmV3c1JlcyIsImZpbGVzIiwiX2xlbiIsImkiLCJwdXNoIiwiJGFwcGx5IiwicHVzaGxpc2giLCJFcnJvciIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLGlCQUFXQyxNQUZMO0FBR05DLGVBQVNELE1BSEg7QUFJTkUsd0JBQWtCQztBQUpaLEssUUFPUkMsTSxHQUFTLHdCLFFBQ1RDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxPLEdBQVU7QUFDUkM7QUFBQSw0RUFBYTtBQUFBO0FB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UmlCLGlCLEdBQUksQzs7O3NCQUFHQSxJQUFJRCxJOzs7Ozs7dUJBQ0YsNkJBQW1CRCxNQUFNRSxDQUFOLENBQW5CLEM7OztBQUFaUixtQjs7QUFDSixxQkFBS2hDLE1BQUwsQ0FBWXlDLElBQVosQ0FBaUJULEdBQWpCOzs7QUFGd0JRLG1COzs7OztBQUkxQixxQkFBS0UsTUFBTDtBQUNBLHFCQUFLQyxRQUFMOzs7Ozs7O3NCQUVNLElBQUlDLEtBQUosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTVHOEIsZUFBS0MsUzs7a0JBQTFCeEQsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXIsXG4gICAgZ2FsbGVyeUlkOiBTdHJpbmcsXG4gICAgZ3JvdXBJZDogU3RyaW5nLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IE9iamVjdFxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW1hZ2VzID0gW11cbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInmnYPpmZAnLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmnYPpmZAnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiA5XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4iuS8oCcpXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiK5Lyg5aSx6LSlJylcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5rKh5pyJ5p2D6ZmQJyxcbiAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5p2D6ZmQJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdvcGVuTmV3QWxidW0nKVxuICAgIH0sXG4gICAgYmFja1RvSW5kZXgoKSB7XG4gICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKS5sZW5ndGhcbiAgICAgIGlmIChwYWdlcyA+IDEpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBwdXNobGlzaCgpIHtcbiAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5Y+R5biDJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvcHVibGlzaC9waG90bycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBhcmFtOiBKU09OLnN0cmluZ2lmeSh0aGlzLmltYWdlcyksXG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhKVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnB1c2hsaXNoQWZ0ZXIoKVxuICB9XG4gIGFzeW5jIHB1c2hsaXNoQWZ0ZXIoKSB7XG4gICAgdmFyIG5ld3NSZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChuZXdzUmVzLnN1Y2MgJiYgbmV3c1Jlcy5kYXRhKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VQdWJsaXNoSW5mbycsIG5ld3NSZXMuZGF0YSlcbiAgICB9XG4gIH1cbiAgYXN5bmMgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX2xlbiA9IGZpbGVzLmxlbmd0aFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlc1tpXSlcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLnB1c2hsaXNoKClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxufVxuIl19