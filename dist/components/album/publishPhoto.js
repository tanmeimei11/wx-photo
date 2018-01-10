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
      publishAfterInfo: {
        type: Object,
        twoWay: true
      }
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
                  this.publishAfterInfo = false;
                  this.$apply();
                  // this.$emit("clearPublishAfterInfo");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwidHlwZSIsIk9iamVjdCIsInR3b1dheSIsIm1peGlucyIsImRhdGEiLCJpbWFnZXMiLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJyZWFkVGlwc0Z1biIsImNvdW50IiwiY2hvb3NlUmVzIiwidGVtcEZpbGVQYXRocyIsImxvYWRpbmdJbiIsImxvYWRJbWFnZXMiLCJsb2FkaW5nT3V0IiwidG9hc3RGYWlsIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwib3Blbk5ld0FsYnVtIiwiJGVtaXQiLCJiYWNrVG9JbmRleCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ2FsbGVyeV9pZCIsIm0iLCJzdWNjIiwiJGFwcGx5IiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwid3giLCJoaWRlTG9hZGluZyIsImZpbGVzIiwiX2xlbiIsImkiLCJwdXNoIiwicHVzaGxpc2giLCJFcnJvciIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLGlCQUFXQyxNQUZMO0FBR05DLGVBQVNELE1BSEg7QUFJTkUscUJBQWVGLE1BSlQ7QUFLTkcsd0JBQWtCO0FBQ2hCQyxjQUFNQyxNQURVO0FBRWhCQyxnQkFBUTtBQUZRO0FBTFosSyxRQVdSQyxN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LE1BQWY7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFHYzBCLEs7Ozs7Ozs7O0FBRVRDLG9CLEdBQU9ELE1BQU1qQixNO0FBQ1JtQixpQixHQUFJLEM7OztzQkFBR0EsSUFBSUQsSTs7Ozs7O3VCQUNGLDZCQUFtQkQsTUFBTUUsQ0FBTixDQUFuQixDOzs7QUFBWkwsbUI7O0FBQ0oscUJBQUtwQyxNQUFMLENBQVkwQyxJQUFaLENBQWlCTixHQUFqQjs7O0FBRndCSyxtQjs7Ozs7QUFJMUIscUJBQUtYLE1BQUw7QUFDQSxxQkFBS2EsUUFBTDs7Ozs7OztzQkFFTSxJQUFJQyxLQUFKLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUExSDhCLGVBQUtDLFM7O2tCQUExQjNELFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaFBob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIGdhbGxlcnlJZDogU3RyaW5nLFxuICAgIGdyb3VwSWQ6IFN0cmluZyxcbiAgICBncm91cFVzZXJOYW1lOiBTdHJpbmcsXG4gICAgcHVibGlzaEFmdGVySW5mbzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfVxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW1hZ2VzID0gW11cbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmnYPpmZDmj5DphpInLFxuICAgICAgICAgIGNvbnRlbnQ6ICflj6rmnInmnKznvqTmiJDlkZjmiY3og73kuIrkvKDnhafniYcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkVGlwc0Z1bigpXG4gICAgICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogOVxuICAgICAgICB9KVxuICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IGNob29zZVJlcy50ZW1wRmlsZVBhdGhzXG4gICAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIrkvKAnKVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4iuS8oOWksei0pScpXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9XG4gICAgfSxcbiAgICByZWFkVGlwczogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlYWRUaXBzRnVuKClcbiAgICAgIC8vIHJlcXVlc3Qoe1xuICAgICAgLy8gICB1cmw6ICcvZ2cvZ3JvdXAvbmV3c19yZWFkJyxcbiAgICAgIC8vICAgZGF0YToge1xuICAgICAgLy8gICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIC8vICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAvLyAgICAgdGhpcy4kZW1pdCgnY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvJylcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMykge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmnYPpmZDmj5DphpInLFxuICAgICAgICAgIGNvbnRlbnQ6IGDlj6rmnInnvqTkuLske3RoaXMuZ3JvdXBVc2VyTmFtZX3miY3og73kv67mlLnnvqTkv6Hmga9gXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ29wZW5OZXdBbGJ1bScpXG4gICAgfSxcbiAgICBiYWNrVG9JbmRleCgpIHtcbiAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpLmxlbmd0aFxuICAgICAgaWYgKHBhZ2VzID4gMikge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJZH1gXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9O1xuICBhc3luYyByZWFkVGlwc0Z1bigpIHtcbiAgICB2YXIgbSA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3NfcmVhZCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAobS5zdWNjKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgLy8gdGhpcy4kZW1pdChcImNsZWFyUHVibGlzaEFmdGVySW5mb1wiKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwdXNobGlzaCgpIHtcbiAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5Y+R5biDJylcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvcHVibGlzaC9waG90bycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBhcmFtOiBKU09OLnN0cmluZ2lmeSh0aGlzLmltYWdlcyksXG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG8nLCByZXMuZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WPkeW4g+Wksei0pScpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZEltYWdlcyhmaWxlcykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX2xlbiA9IGZpbGVzLmxlbmd0aFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlc1tpXSlcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLnB1c2hsaXNoKClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgIH1cbiAgfVxufVxuIl19