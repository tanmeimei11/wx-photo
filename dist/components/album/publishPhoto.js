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
                this.$emit('clearPublishAfterInfo');

              case 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiT2JqZWN0IiwibWl4aW5zIiwiZGF0YSIsImltYWdlcyIsIm1ldGhvZHMiLCJjaG9vc2VJbWFnZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInJlYWRUaXBzRnVuIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibG9hZGluZ0luIiwibG9hZEltYWdlcyIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJjb25zb2xlIiwibG9nIiwicmVhZFRpcHMiLCJvcGVuTmV3QWxidW0iLCIkZW1pdCIsImJhY2tUb0luZGV4IiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnYWxsZXJ5X2lkIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwid3giLCJoaWRlTG9hZGluZyIsInN1Y2MiLCJmaWxlcyIsIl9sZW4iLCJpIiwicHVzaCIsIiRhcHBseSIsInB1c2hsaXNoIiwiRXJyb3IiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxtQkFBYUMsTUFEUDtBQUVOQyxpQkFBV0MsTUFGTDtBQUdOQyxlQUFTRCxNQUhIO0FBSU5FLHFCQUFlRixNQUpUO0FBS05HLHdCQUFrQkM7QUFMWixLLFFBUVJDLE0sR0FBUyx3QixRQUNUQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFHUEMsTyxHQUFVO0FB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QUFOLENBQW5CLEM7OztBQUFaTixtQjs7QUFDSixxQkFBS2pDLE1BQUwsQ0FBWXdDLElBQVosQ0FBaUJQLEdBQWpCOzs7QUFGd0JNLG1COzs7OztBQUkxQixxQkFBS0UsTUFBTDtBQUNBLHFCQUFLQyxRQUFMOzs7Ozs7O3NCQUVNLElBQUlDLEtBQUosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTFHOEIsZUFBS0MsUzs7a0JBQTFCeEQsWSIsImZpbGUiOiJwdWJsaXNoUGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2VUb1Fpbml1IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoUGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdhbGxlcnlBdXRoOiBOdW1iZXIsXG4gICAgZ2FsbGVyeUlkOiBTdHJpbmcsXG4gICAgZ3JvdXBJZDogU3RyaW5nLFxuICAgIGdyb3VwVXNlck5hbWU6IFN0cmluZyxcbiAgICBwdWJsaXNoQWZ0ZXJJbmZvOiBPYmplY3RcbiAgfTtcbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dO1xuICBkYXRhID0ge1xuICAgIGltYWdlczogW11cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaG9vc2VJbWFnZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmltYWdlcyA9IFtdXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDIpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5p2D6ZmQ5o+Q6YaSJyxcbiAgICAgICAgICBjb250ZW50OiAn5Y+q5pyJ5pys576k5oiQ5ZGY5omN6IO95LiK5Lyg54Wn54mHJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVhZFRpcHNGdW4oKVxuICAgICAgICB2YXIgY2hvb3NlUmVzID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiK5LygJylcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VzKHRlbXBGaWxlUGF0aHMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkuIrkvKDlpLHotKUnKVxuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVhZFRpcHM6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgdGhpcy5yZWFkVGlwc0Z1bigpXG4gICAgfSxcblxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMykge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmnYPpmZDmj5DphpInLFxuICAgICAgICAgIGNvbnRlbnQ6IGDlj6rmnInnvqTkuLske3RoaXMuZ3JvdXBVc2VyTmFtZX3miY3og73kv67mlLnnvqTkv6Hmga9gXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ29wZW5OZXdBbGJ1bScpXG4gICAgfSxcbiAgICBiYWNrVG9JbmRleCgpIHtcbiAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpLmxlbmd0aFxuICAgICAgaWYgKHBhZ2VzID4gMikge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJZH1gXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9O1xuICBhc3luYyByZWFkVGlwc0Z1bigpIHtcbiAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzX3JlYWQnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy4kZW1pdCgnY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvJylcbiAgfVxuXG4gIGFzeW5jIHB1c2hsaXNoKCkge1xuICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjlj5HluIMnKVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9wdWJsaXNoL3Bob3RvJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQaG90bycsIHJlcy5kYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Y+R5biD5aSx6LSlJylcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGVzW2ldKVxuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMucHVzaGxpc2goKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfVxuICB9XG59XG4iXX0=