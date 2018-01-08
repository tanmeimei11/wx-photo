'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoItem = function (_wepy$component) {
  _inherits(PhotoItem, _wepy$component);

  function PhotoItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhotoItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoItem.__proto__ || Object.getPrototypeOf(PhotoItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      photoItem: [],
      photoIndex: Number
    }, _this.data = {
      image: [1, 2, 3, 4, 5, 6, 7]
    }, _this.watch = {}, _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        console.log(this.photoItem.photos, _photoIdx);
        this.$emit('changeCurPhotos', this.photoItem.photos, _photoIdx);
      },
      clickZan: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res, zanListRes;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _login.request)({
                    url: '/gg/photo/zan',
                    data: {
                      pid: this.photoItem.photo_id,
                      action: this.photoItem.is_zan ? 'cancel' : 'zan'
                    }
                  });

                case 2:
                  res = _context.sent;
                  _context.next = 5;
                  return (0, _login.request)({
                    url: '/gg/photo/zan_list',
                    data: {
                      pid: this.photoItem.photo_id
                    }
                  });

                case 5:
                  zanListRes = _context.sent;


                  if (res.succ && zanListRes.succ && zanListRes.data) {
                    this.photoItem.is_zan = !this.photoItem.is_zan;
                    this.photoItem.zan_list = zanListRes.data;
                    this.$apply();
                  }

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function clickZan() {
          return _ref2.apply(this, arguments);
        }

        return clickZan;
      }(),
      delPhoto: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _common.wxPromisify)(wx.showActionSheet)({
                    itemList: ['删除'],
                    itemColor: '#FF5E51'
                  });

                case 2:
                  res = _context2.sent;

                  if (res.tapIndex === 0) {
                    (0, _login.request)({
                      url: '/gg/photo/del',
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this2.$emit('deletPhoto', _this2.photoIndex);
                      _this2.$apply();
                      console.log(_this2);
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        mask: true
                      });
                    });
                  }

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function delPhoto() {
          return _ref3.apply(this, arguments);
        }

        return delPhoto;
      }(),
      downUrl: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _urls = this.photoItem.photos.map(function (photo) {
                    return photo.url;
                  });
                  _context3.next = 3;
                  return (0, _api.downInternetUrl)(_urls);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function downUrl(_x) {
          return _ref4.apply(this, arguments);
        }

        return downUrl;
      }(),
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJwaG90b3MiLCIkZW1pdCIsImNsaWNrWmFuIiwidXJsIiwicGlkIiwicGhvdG9faWQiLCJhY3Rpb24iLCJpc196YW4iLCJyZXMiLCJ6YW5MaXN0UmVzIiwic3VjYyIsInphbl9saXN0IiwiJGFwcGx5IiwiZGVsUGhvdG8iLCJ3eCIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwiaXRlbUNvbG9yIiwidGFwSW5kZXgiLCJ0aGVuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibWFzayIsImRvd25VcmwiLCJfdXJscyIsIm1hcCIsInBob3RvIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQztBQUZOLEssUUFJUkMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQURGLEssUUFHUEMsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS2QsU0FBTCxDQUFlZSxNQUEzQixFQUFtQ04sU0FBbkM7QUFDQSxhQUFLTyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2hCLFNBQUwsQ0FBZWUsTUFBN0MsRUFBcUROLFNBQXJEO0FBQ0QsT0FMTztBQU1GUSxjQU5FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFPVSxvQkFBUTtBQUN0QkMseUJBQUssZUFEaUI7QUFFdEJmLDBCQUFNO0FBQ0pnQiwyQkFBSyxLQUFLbkIsU0FBTCxDQUFlb0IsUUFEaEI7QUFFSkMsOEJBQVEsS0FBS3JCLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsUUFBeEIsR0FBbUM7QUFGdkM7QUFGZ0IsbUJBQVIsQ0FQVjs7QUFBQTtBQU9GQyxxQkFQRTtBQUFBO0FBQUEseUJBZWlCLG9CQUFRO0FBQzdCTCx5QkFBSyxvQkFEd0I7QUFFN0JmLDBCQUFNO0FBQ0pnQiwyQkFBSyxLQUFLbkIsU0FBTCxDQUFlb0I7QUFEaEI7QUFGdUIsbUJBQVIsQ0FmakI7O0FBQUE7QUFlRkksNEJBZkU7OztBQXNCTixzQkFBSUQsSUFBSUUsSUFBSixJQUFZRCxXQUFXQyxJQUF2QixJQUErQkQsV0FBV3JCLElBQTlDLEVBQW9EO0FBQ2xELHlCQUFLSCxTQUFMLENBQWVzQixNQUFmLEdBQXdCLENBQUMsS0FBS3RCLFNBQUwsQ0FBZXNCLE1BQXhDO0FBQ0EseUJBQUt0QixTQUFMLENBQWUwQixRQUFmLEdBQTBCRixXQUFXckIsSUFBckM7QUFDQSx5QkFBS3dCLE1BQUw7QUFDRDs7QUExQks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE0QkZDLGNBNUJFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkE2QlUseUJBQVlDLEdBQUdDLGVBQWYsRUFBZ0M7QUFDOUNDLDhCQUFVLENBQUMsSUFBRCxDQURvQztBQUU5Q0MsK0JBQVc7QUFGbUMsbUJBQWhDLENBN0JWOztBQUFBO0FBNkJGVCxxQkE3QkU7O0FBaUNOLHNCQUFJQSxJQUFJVSxRQUFKLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLHdDQUFRO0FBQ05mLDJCQUFLLGVBREM7QUFFTmYsNEJBQU07QUFDSmdCLDZCQUFLLEtBQUtuQixTQUFMLENBQWVvQjtBQURoQjtBQUZBLHFCQUFSLEVBS0djLElBTEgsQ0FLUSxlQUFPO0FBQ2IsNkJBQUtsQixLQUFMLENBQVcsWUFBWCxFQUF5QixPQUFLZixVQUE5QjtBQUNBLDZCQUFLMEIsTUFBTDtBQUNBZCw4QkFBUUMsR0FBUjtBQUNBZSx5QkFBR00sU0FBSCxDQUFhO0FBQ1hDLCtCQUFPLE1BREk7QUFFWEMsOEJBQU0sU0FGSztBQUdYQyw4QkFBTTtBQUhLLHVCQUFiO0FBS0QscUJBZEQ7QUFlRDs7QUFqREs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFtREZDLGFBbkRFO0FBQUEsOEZBbURNckIsR0FuRE47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9ERnNCLHVCQXBERSxHQW9ETSxLQUFLeEMsU0FBTCxDQUFlZSxNQUFmLENBQXNCMEIsR0FBdEIsQ0FBMEIsaUJBQVM7QUFDN0MsMkJBQU9DLE1BQU14QixHQUFiO0FBQ0QsbUJBRlcsQ0FwRE47QUFBQTtBQUFBLHlCQXVEQSwwQkFBZ0JzQixLQUFoQixDQXZEQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXlEUkcsU0F6RFEsaUJBeURGLENBQUUsQ0F6REE7QUEwRFJDLGVBMURRLHVCQTBESSxDQUFFO0FBMUROLEs7Ozs7RUFUMkIsZUFBS0MsUzs7a0JBQXZCL0MsUyIsImZpbGUiOiJwaG90b0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XHJcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XHJcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcGhvdG9JdGVtOiBbXSxcclxuICAgIHBob3RvSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGltYWdlOiBbMSwgMiwgMywgNCwgNSwgNiwgN11cclxuICB9O1xyXG4gIHdhdGNoID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2xpY2taYW4oKSB7XHJcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLnBob3RvSXRlbS5pc196YW4gPyAnY2FuY2VsJyA6ICd6YW4nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdmFyIHphbkxpc3RSZXMgPSBhd2FpdCByZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuX2xpc3QnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAocmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5zdWNjICYmIHphbkxpc3RSZXMuZGF0YSkge1xyXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLmlzX3phbiA9ICF0aGlzLnBob3RvSXRlbS5pc196YW5cclxuICAgICAgICB0aGlzLnBob3RvSXRlbS56YW5fbGlzdCA9IHphbkxpc3RSZXMuZGF0YVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3guc2hvd0FjdGlvblNoZWV0KSh7XHJcbiAgICAgICAgaXRlbUxpc3Q6IFsn5Yig6ZmkJ10sXHJcbiAgICAgICAgaXRlbUNvbG9yOiAnI0ZGNUU1MSdcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlcy50YXBJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2RlbCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldFBob3RvJywgdGhpcy5waG90b0luZGV4KVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5oiQ5YqfJyxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xyXG4gICAgICB2YXIgX3VybHMgPSB0aGlzLnBob3RvSXRlbS5waG90b3MubWFwKHBob3RvID0+IHtcclxuICAgICAgICByZXR1cm4gcGhvdG8udXJsXHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscylcclxuICAgIH0sXHJcbiAgICB0YXAoKSB7fSxcclxuICAgIGRvd25JbWFnZSgpIHt9XHJcbiAgfTtcclxufVxyXG4iXX0=