'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      publishAfterInfo: {
        type: Object,
        twoWay: true
      }
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      images: [],
      video: {}
    }, _this.methods = {
      chooseType: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.galleryAuth < 2)) {
                    _context.next = 3;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: '权限提醒',
                    content: '只有本群成员才能上传视频'
                  });
                  return _context.abrupt('return');

                case 3:
                  _context.next = 5;
                  return this.readTipsFun();

                case 5:
                  _context.next = 7;
                  return _wepy2.default.showActionSheet({
                    itemList: ['照片', '视频']
                  });

                case 7:
                  res = _context.sent;

                  if (!(res.tapIndex === 0)) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 11;
                  return this.chooseImage();

                case 11:
                  _context.next = 16;
                  break;

                case 13:
                  if (!(res.tapIndex === 1)) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 16;
                  return this.chooseVideo();

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function chooseType() {
          return _ref2.apply(this, arguments);
        }

        return chooseType;
      }(),
      readTips: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.readTipsFun();

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
    key: 'chooseVideo',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var upRes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.video = null;
                _context3.next = 3;
                return _wepy2.default.chooseVideo({
                  sourceType: ['album', 'camera'],
                  compressed: true,
                  maxDuration: 60
                });

              case 3:
                this.video = _context3.sent;
                _context3.prev = 4;

                this.loadingIn('正在上传');
                console.log('正在上传');
                _context3.next = 9;
                return (0, _api.uploadImageToQiniu)(this.video.tempFilePath, 'mp4');

              case 9:
                upRes = _context3.sent;

                this.video = _extends({}, this.video, upRes);
                _context3.next = 13;
                return this.publish('video');

              case 13:
                _context3.next = 20;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](4);

                this.loadingOut();
                this.toastFail('上传失败');
                console.log(_context3.t0);

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 15]]);
      }));

      function chooseVideo() {
        return _ref4.apply(this, arguments);
      }

      return chooseVideo;
    }()
  }, {
    key: 'chooseImage',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var chooseRes, tempFilePaths;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.images = [];
                _context4.next = 3;
                return _wepy2.default.chooseImage({
                  count: 9
                });

              case 3:
                chooseRes = _context4.sent;
                tempFilePaths = chooseRes.tempFilePaths;
                _context4.prev = 5;

                this.loadingIn('正在上传');
                _context4.next = 9;
                return this.loadImages(tempFilePaths);

              case 9:
                _context4.next = 15;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](5);

                this.loadingOut();
                this.toastFail('上传失败');

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 11]]);
      }));

      function chooseImage() {
        return _ref5.apply(this, arguments);
      }

      return chooseImage;
    }()
  }, {
    key: 'readTipsFun',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var m;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/news_read',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                m = _context5.sent;

                if (m.succ) {
                  this.publishAfterInfo = false;
                  this.$apply();
                  // this.$emit("clearPublishAfterInfo");
                }

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function readTipsFun() {
        return _ref6.apply(this, arguments);
      }

      return readTipsFun;
    }()
  }, {
    key: 'publishVideoFun',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _data, res;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _data = {
                  gallery_id: this.galleryId,
                  video_url: this.video.key,
                  video_duration: this.video.duration,
                  video_hash: this.video.hash,
                  video_width: this.video.width,
                  video_height: this.video.height
                };
                _context6.next = 4;
                return (0, _login.request)({
                  url: '/gg/publish/video',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: _data
                });

              case 4:
                res = _context6.sent;
                return _context6.abrupt('return', res);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](0);
                throw new Error();

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function publishVideoFun() {
        return _ref7.apply(this, arguments);
      }

      return publishVideoFun;
    }()
  }, {
    key: 'publishImagesFun',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
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
                res = _context7.sent;
                return _context7.abrupt('return', res);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7['catch'](0);
                throw new Error();

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 7]]);
      }));

      function publishImagesFun() {
        return _ref8.apply(this, arguments);
      }

      return publishImagesFun;
    }()
  }, {
    key: 'publish',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(type) {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.loadingIn('正在发布');

                if (!(type === 'image')) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 4;
                return this.publishImagesFun();

              case 4:
                res = _context8.sent;
                _context8.next = 10;
                break;

              case 7:
                _context8.next = 9;
                return this.publishVideoFun();

              case 9:
                res = _context8.sent;

              case 10:
                wx.hideLoading();
                if (res.succ && res.data) {
                  this.$emit('publishPhotoAndVideo', res.data);
                } else {
                  this.toastFail('发布失败');
                }

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function publish(_x) {
        return _ref9.apply(this, arguments);
      }

      return publish;
    }()
  }, {
    key: 'loadImages',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(files) {
        var _len, i, res;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context9.next = 11;
                  break;
                }

                _context9.next = 6;
                return (0, _api.uploadImageToQiniu)(files[i]);

              case 6:
                res = _context9.sent;

                this.images.push(res);

              case 8:
                i++;
                _context9.next = 3;
                break;

              case 11:
                this.$apply();
                this.publish('image');
                _context9.next = 18;
                break;

              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9['catch'](0);
                throw new Error();

              case 18:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 15]]);
      }));

      function loadImages(_x2) {
        return _ref10.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PublishPhoto;
}(_wepy2.default.component);

exports.default = PublishPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwidHlwZSIsIk9iamVjdCIsInR3b1dheSIsIm1peGlucyIsImRhdGEiLCJpbWFnZXMiLCJ2aWRlbyIsIm1ldGhvZHMiLCJjaG9vc2VUeXBlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwicmVhZFRpcHNGdW4iLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInJlcyIsInRhcEluZGV4IiwiY2hvb3NlSW1hZ2UiLCJjaG9vc2VWaWRlbyIsInJlYWRUaXBzIiwib3Blbk5ld0FsYnVtIiwiJGVtaXQiLCJiYWNrVG9JbmRleCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwidXJsIiwic291cmNlVHlwZSIsImNvbXByZXNzZWQiLCJtYXhEdXJhdGlvbiIsImxvYWRpbmdJbiIsImNvbnNvbGUiLCJsb2ciLCJ0ZW1wRmlsZVBhdGgiLCJ1cFJlcyIsInB1Ymxpc2giLCJsb2FkaW5nT3V0IiwidG9hc3RGYWlsIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibG9hZEltYWdlcyIsImdhbGxlcnlfaWQiLCJtIiwic3VjYyIsIiRhcHBseSIsIl9kYXRhIiwidmlkZW9fdXJsIiwia2V5IiwidmlkZW9fZHVyYXRpb24iLCJkdXJhdGlvbiIsInZpZGVvX2hhc2giLCJoYXNoIiwidmlkZW9fd2lkdGgiLCJ3aWR0aCIsInZpZGVvX2hlaWdodCIsImhlaWdodCIsIm1ldGhvZCIsImhlYWRlciIsIkVycm9yIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaEltYWdlc0Z1biIsInB1Ymxpc2hWaWRl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QUw7QUFDQSxxQkFBS1YsT0FBTCxDQUFhLE9BQWI7Ozs7Ozs7c0JBRU0sSUFBSXdCLEtBQUosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTdMOEIsZUFBS1ksUzs7a0JBQTFCbkYsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoUGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXIsXG4gICAgZ2FsbGVyeUlkOiBTdHJpbmcsXG4gICAgZ3JvdXBJZDogU3RyaW5nLFxuICAgIGdyb3VwVXNlck5hbWU6IFN0cmluZyxcbiAgICBwdWJsaXNoQWZ0ZXJJbmZvOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9XG4gIH07XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluXTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZXM6IFtdLFxuICAgIHZpZGVvOiB7fVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZVR5cGU6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAyKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+adg+mZkOaPkOmGkicsXG4gICAgICAgICAgY29udGVudDogJ+WPquacieacrOe+pOaIkOWRmOaJjeiDveS4iuS8oOinhumikSdcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5yZWFkVGlwc0Z1bigpXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdDogWyfnhafniYcnLCAn6KeG6aKRJ11cbiAgICAgIH0pXG4gICAgICBpZiAocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hvb3NlSW1hZ2UoKVxuICAgICAgfSBlbHNlIGlmIChyZXMudGFwSW5kZXggPT09IDEpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jaG9vc2VWaWRlbygpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlYWRUaXBzRnVuKClcbiAgICAgIC8vIHJlcXVlc3Qoe1xuICAgICAgLy8gICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgIC8vICAgZGF0YToge1xuICAgICAgLy8gICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIC8vICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAvLyAgICAgdGhpcy4kZW1pdCgnY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvJylcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMykge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmnYPpmZDmj5DphpInLFxuICAgICAgICAgIGNvbnRlbnQ6IGDlj6rmnInnvqTkuLske3RoaXMuZ3JvdXBVc2VyTmFtZX3miY3og73kv67mlLnnvqTkv6Hmga9gXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ29wZW5OZXdBbGJ1bScpXG4gICAgfSxcbiAgICBiYWNrVG9JbmRleCgpIHtcbiAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpLmxlbmd0aFxuICAgICAgaWYgKHBhZ2VzID4gMikge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJZH1gXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9O1xuICBhc3luYyBjaG9vc2VWaWRlbygpIHtcbiAgICB0aGlzLnZpZGVvID0gbnVsbFxuICAgIHRoaXMudmlkZW8gPSBhd2FpdCB3ZXB5LmNob29zZVZpZGVvKHtcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBjb21wcmVzc2VkOiB0cnVlLFxuICAgICAgbWF4RHVyYXRpb246IDYwXG4gICAgfSlcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiK5LygJylcbiAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjkuIrkvKAnKVxuICAgICAgdmFyIHVwUmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KHRoaXMudmlkZW8udGVtcEZpbGVQYXRoLCAnbXA0JylcbiAgICAgIHRoaXMudmlkZW8gPSB7XG4gICAgICAgIC4uLnRoaXMudmlkZW8sXG4gICAgICAgIC4uLnVwUmVzXG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLnB1Ymxpc2goJ3ZpZGVvJylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4iuS8oOWksei0pScpXG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgIH1cbiAgfVxuICBhc3luYyBjaG9vc2VJbWFnZSgpIHtcbiAgICB0aGlzLmltYWdlcyA9IFtdXG4gICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgY291bnQ6IDlcbiAgICB9KVxuICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4iuS8oCcpXG4gICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4iuS8oOWksei0pScpXG4gICAgfVxuICB9XG4gIGFzeW5jIHJlYWRUaXBzRnVuKCkge1xuICAgIHZhciBtID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChtLnN1Y2MpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAvLyB0aGlzLiRlbWl0KFwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvXCIpO1xuICAgIH1cbiAgfVxuICBhc3luYyBwdWJsaXNoVmlkZW9GdW4oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfZGF0YSA9IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIHZpZGVvX3VybDogdGhpcy52aWRlby5rZXksXG4gICAgICAgIHZpZGVvX2R1cmF0aW9uOiB0aGlzLnZpZGVvLmR1cmF0aW9uLFxuICAgICAgICB2aWRlb19oYXNoOiB0aGlzLnZpZGVvLmhhc2gsXG4gICAgICAgIHZpZGVvX3dpZHRoOiB0aGlzLnZpZGVvLndpZHRoLFxuICAgICAgICB2aWRlb19oZWlnaHQ6IHRoaXMudmlkZW8uaGVpZ2h0XG4gICAgICB9XG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9wdWJsaXNoL3ZpZGVvJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBfZGF0YVxuICAgICAgfSlcbiAgICAgIHJldHVybiByZXNcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxuICBhc3luYyBwdWJsaXNoSW1hZ2VzRnVuKCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9XG4gIGFzeW5jIHB1Ymxpc2godHlwZSkge1xuICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjlj5HluIMnKVxuICAgIHZhciByZXNcbiAgICBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgcmVzID0gYXdhaXQgdGhpcy5wdWJsaXNoSW1hZ2VzRnVuKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0gYXdhaXQgdGhpcy5wdWJsaXNoVmlkZW9GdW4oKVxuICAgIH1cbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG9BbmRWaWRlbycsIHJlcy5kYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Y+R5biD5aSx6LSlJylcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGVzW2ldKVxuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMucHVibGlzaCgnaW1hZ2UnKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9XG59XG4iXX0=