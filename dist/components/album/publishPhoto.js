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

var PublishPhoto = function (_wepy$component) {
  _inherits(PublishPhoto, _wepy$component);

  function PublishPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishPhoto);

    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishPhoto.__proto__ || Object.getPrototypeOf(PublishPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number,
      galleryId: String,
      groupId: String,
      groupUserName: String,
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
                    title: '权限提醒',
                    content: '只有本群成员才能上传照片'
                  });
                  return _context.abrupt('return');

                case 4:
                  _context.prev = 4;
                  _context.next = 7;
                  return this.readTips();

                case 7:
                  _context.next = 9;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 9:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  this.loadingIn('正在上传');
                  _context.next = 14;
                  return this.loadImages(tempFilePaths);

                case 14:
                  _context.next = 21;
                  break;

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context['catch'](4);

                  this.loadingOut();
                  this.toastFail('上传失败');
                  console.log(_context.t0);

                case 21:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 16]]);
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
                  this.$emit('clearPublishAfterInfo');

                case 3:
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
            title: '权限提醒',
            content: '\u53EA\u6709\u7FA4\u4E3B' + this.groupUserName + '\u624D\u80FD\u4FEE\u6539\u7FA4\u4FE1\u606F'
          });
          return;
        }
        this.$emit('openNewAlbum');
      },
      backToIndex: function backToIndex() {
        var pages = getCurrentPages().length;
        if (pages > 2) {
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


  _createClass(PublishPhoto, [{
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

                wx.hideLoading();
                if (res.succ && res.data) {
                  this.$emit('publishPhoto', res.data);
                } else {
                  this.toastFail('发布失败');
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
    key: 'loadImages',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(files) {
        var _len, i, res;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 6;
                return (0, _api.uploadImageToQiniu)(files[i]);

              case 6:
                res = _context4.sent;

                this.images.push(res);

              case 8:
                i++;
                _context4.next = 3;
                break;

              case 11:
                this.$apply();
                this.pushlish();
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](0);
                throw new Error();

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function loadImages(_x) {
        return _ref5.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PublishPhoto;
}(_wepy2.default.component);

exports.default = PublishPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiT2JqZWN0IiwibWl4aW5zIiwiZGF0YSIsImltYWdlcyIsIm1ldGhvZHMiLCJjaG9vc2VJbWFnZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInJlYWRUaXBzIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibG9hZGluZ0luIiwibG9hZEltYWdlcyIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJjb25zb2xlIiwibG9nIiwidXJsIiwiZ2FsbGVyeV9pZCIsIiRlbWl0Iiwib3Blbk5ld0FsYnVtIiwiYmFja1RvSW5kZXgiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicmVkaXJlY3RUbyIsIm1ldGhvZCIsImhlYWRlciIsInBhcmFtIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcyIsInd4IiwiaGlkZUxvYWRpbmciLCJzdWNjIiwiZmlsZXMiLCJfbGVuIiwiaSIsInB1c2giLCIkYXBwbHkiLCJwdXNobGlzaCIsIkVycm9yIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsbUJBQWFDLE1BRFA7QUFFTkMsaUJBQVdDLE1BRkw7QUFHTkMsZUFBU0QsTUFISDtBQUlORSxxQkFBZUYsTUFKVDtBQUtORyx3QkFBa0JDO0FBTFosSyxRQVFSQyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFh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QWlCUCxHQUFqQjs7O0FBRndCTSxtQjs7Ozs7QUFJMUIscUJBQUtFLE1BQUw7QUFDQSxxQkFBS0MsUUFBTDs7Ozs7OztzQkFFTSxJQUFJQyxLQUFKLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0RzhCLGVBQUtDLFM7O2tCQUExQnZELFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaFBob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIGdhbGxlcnlJZDogU3RyaW5nLFxuICAgIGdyb3VwSWQ6IFN0cmluZyxcbiAgICBncm91cFVzZXJOYW1lOiBTdHJpbmcsXG4gICAgcHVibGlzaEFmdGVySW5mbzogT2JqZWN0XG4gIH07XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluXTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbWFnZXMgPSBbXVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAyKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+adg+mZkOaPkOmGkicsXG4gICAgICAgICAgY29udGVudDogJ+WPquacieacrOe+pOaIkOWRmOaJjeiDveS4iuS8oOeFp+eJhydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnJlYWRUaXBzKClcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiA5XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4iuS8oCcpXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiK5Lyg5aSx6LSlJylcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRlbWl0KCdjbGVhclB1Ymxpc2hBZnRlckluZm8nKVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+adg+mZkOaPkOmGkicsXG4gICAgICAgICAgY29udGVudDogYOWPquaciee+pOS4uyR7dGhpcy5ncm91cFVzZXJOYW1lfeaJjeiDveS/ruaUuee+pOS/oeaBr2BcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnb3Blbk5ld0FsYnVtJylcbiAgICB9LFxuICAgIGJhY2tUb0luZGV4KCkge1xuICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoXG4gICAgICBpZiAocGFnZXMgPiAyKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElkfWBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgcHVzaGxpc2goKSB7XG4gICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOWPkeW4gycpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL3B1Ymxpc2gvcGhvdG8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXJhbTogSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpLFxuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy4kZW1pdCgncHVibGlzaFBob3RvJywgcmVzLmRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9hc3RGYWlsKCflj5HluIPlpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbWFnZXMoZmlsZXMpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZXNbaV0pXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5wdXNobGlzaCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==