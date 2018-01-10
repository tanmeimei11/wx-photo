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
                  return this.readTipsFun();

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
    key: 'readTipsFun',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var m;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/news_read',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                m = _context3.sent;

                if (m.succ) {
                  this.$emit('clearPublishAfterInfo');
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function readTipsFun() {
        return _ref4.apply(this, arguments);
      }

      return readTipsFun;
    }()
  }, {
    key: 'pushlish',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.loadingIn('正在发布');
                _context4.next = 3;
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
                res = _context4.sent;

                wx.hideLoading();
                if (res.succ && res.data) {
                  this.$emit('publishPhoto', res.data);
                } else {
                  this.toastFail('发布失败');
                }

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function pushlish() {
        return _ref5.apply(this, arguments);
      }

      return pushlish;
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

  return PublishPhoto;
}(_wepy2.default.component);

exports.default = PublishPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiT2JqZWN0IiwibWl4aW5zIiwiZGF0YSIsImltYWdlcyIsIm1ldGhvZHMiLCJjaG9vc2VJbWFnZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInJlYWRUaXBzRnVuIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibG9hZGluZ0luIiwibG9hZEltYWdlcyIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJvcGVuTmV3QWxidW0iLCIkZW1pdCIsImJhY2tUb0luZGV4IiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnYWxsZXJ5X2lkIiwibSIsInN1Y2MiLCJtZXRob2QiLCJoZWFkZXIiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJ3eCIsImhpZGVMb2FkaW5nIiwiZmlsZXMiLCJfbGVuIiwiaSIsInB1c2giLCIkYXBwbHkiLCJwdXNobGlzaCIsIkVycm9yIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsbUJBQWFDLE1BRFA7QUFFTkMsaUJBQVdDLE1BRkw7QUFHTkMsZUFBU0QsTUFISDtBQUlORSxxQkFBZUYsTUFKVDtBQUtORyx3QkFBa0JDO0FBTFosSyxRQVFSQyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FB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aUIsR0FBSSxDOzs7c0JBQUdBLElBQUlELEk7Ozs7Ozt1QkFDRiw2QkFBbUJELE1BQU1FLENBQU4sQ0FBbkIsQzs7O0FBQVpMLG1COztBQUNKLHFCQUFLbkMsTUFBTCxDQUFZeUMsSUFBWixDQUFpQk4sR0FBakI7OztBQUZ3QkssbUI7Ozs7O0FBSTFCLHFCQUFLRSxNQUFMO0FBQ0EscUJBQUtDLFFBQUw7Ozs7Ozs7c0JBRU0sSUFBSUMsS0FBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNUc4QixlQUFLQyxTOztrQkFBMUJ6RCxZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZVRvUWluaXUgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2hQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ2FsbGVyeUF1dGg6IE51bWJlcixcbiAgICBnYWxsZXJ5SWQ6IFN0cmluZyxcbiAgICBncm91cElkOiBTdHJpbmcsXG4gICAgZ3JvdXBVc2VyTmFtZTogU3RyaW5nLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IE9iamVjdFxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW1hZ2VzID0gW11cbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmnYPpmZDmj5DphpInLFxuICAgICAgICAgIGNvbnRlbnQ6ICflj6rmnInmnKznvqTmiJDlkZjmiY3og73kuIrkvKDnhafniYcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkVGlwc0Z1bigpXG4gICAgICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogOVxuICAgICAgICB9KVxuICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IGNob29zZVJlcy50ZW1wRmlsZVBhdGhzXG4gICAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIrkvKAnKVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4iuS8oOWksei0pScpXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlYWRUaXBzRnVuKClcbiAgICB9LFxuXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+adg+mZkOaPkOmGkicsXG4gICAgICAgICAgY29udGVudDogYOWPquaciee+pOS4uyR7dGhpcy5ncm91cFVzZXJOYW1lfeaJjeiDveS/ruaUuee+pOS/oeaBr2BcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnb3Blbk5ld0FsYnVtJylcbiAgICB9LFxuICAgIGJhY2tUb0luZGV4KCkge1xuICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoXG4gICAgICBpZiAocGFnZXMgPiAyKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElkfWBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGFzeW5jIHJlYWRUaXBzRnVuKCkge1xuICAgIHZhciBtID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChtLnN1Y2MpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsZWFyUHVibGlzaEFmdGVySW5mbycpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcHVzaGxpc2goKSB7XG4gICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOWPkeW4gycpXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL3B1Ymxpc2gvcGhvdG8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXJhbTogSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpLFxuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy4kZW1pdCgncHVibGlzaFBob3RvJywgcmVzLmRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9hc3RGYWlsKCflj5HluIPlpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbWFnZXMoZmlsZXMpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCB1cGxvYWRJbWFnZVRvUWluaXUoZmlsZXNbaV0pXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5wdXNobGlzaCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==