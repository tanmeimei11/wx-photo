'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

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
      clickZan: function clickZan() {
        var _this2 = this;

        (0, _login.request)({
          url: '/gg/photo/zan',
          data: {
            pid: this.photoItem.photo_id,
            action: this.photoItem.is_zan ? 'cancel' : 'zan'
          }
        }).then(function (res) {
          _this2.photoItem.is_zan = !_this2.photoItem.is_zan;
          _this2.$apply();
        });
      },
      delPhoto: function delPhoto() {
        var _this3 = this;

        console.log('www');
        (0, _login.request)({
          url: '/gg/photo/del',
          data: {
            pid: this.photoItem.photo_id
          }
        }).then(function (res) {
          _this3.$emit('deletPhoto', _this3.photoIndex);
          _this3.$apply();
        });
      },
      downUrl: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(this.index);
                  _context.next = 3;
                  return (0, _api.downInternetUrl)(this.photoItem.photos[0].url);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function downUrl(_x) {
          return _ref2.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJwaG90b3MiLCIkZW1pdCIsImNsaWNrWmFuIiwidXJsIiwicGlkIiwicGhvdG9faWQiLCJhY3Rpb24iLCJpc196YW4iLCJ0aGVuIiwiJGFwcGx5IiwiZGVsUGhvdG8iLCJkb3duVXJsIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQztBQUZOLEssUUFJUkMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQURGLEssUUFHUEMsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS2QsU0FBTCxDQUFlZSxNQUEzQixFQUFtQ04sU0FBbkM7QUFDQSxhQUFLTyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2hCLFNBQUwsQ0FBZWUsTUFBN0MsRUFBcUROLFNBQXJEO0FBQ0QsT0FMTztBQU1SUSxjQU5RLHNCQU1HO0FBQUE7O0FBQ1QsNEJBQVE7QUFDTkMsZUFBSyxlQURDO0FBRU5mLGdCQUFNO0FBQ0pnQixpQkFBSyxLQUFLbkIsU0FBTCxDQUFlb0IsUUFEaEI7QUFFSkMsb0JBQVEsS0FBS3JCLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsUUFBeEIsR0FBbUM7QUFGdkM7QUFGQSxTQUFSLEVBTUdDLElBTkgsQ0FNUSxlQUFPO0FBQ2IsaUJBQUt2QixTQUFMLENBQWVzQixNQUFmLEdBQXdCLENBQUMsT0FBS3RCLFNBQUwsQ0FBZXNCLE1BQXhDO0FBQ0EsaUJBQUtFLE1BQUw7QUFDRCxTQVREO0FBVUQsT0FqQk87QUFrQlJDLGNBbEJRLHNCQWtCRztBQUFBOztBQUNUWixnQkFBUUMsR0FBUixDQUFZLEtBQVo7QUFDQSw0QkFBUTtBQUNOSSxlQUFLLGVBREM7QUFFTmYsZ0JBQU07QUFDSmdCLGlCQUFLLEtBQUtuQixTQUFMLENBQWVvQjtBQURoQjtBQUZBLFNBQVIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYixpQkFBS1AsS0FBTCxDQUFXLFlBQVgsRUFBeUIsT0FBS2YsVUFBOUI7QUFDQSxpQkFBS3VCLE1BQUw7QUFDRCxTQVJEO0FBU0QsT0E3Qk87QUE4QkZFLGFBOUJFO0FBQUEsNkZBOEJNUixHQTlCTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0JOTCwwQkFBUUMsR0FBUixDQUFZLEtBQUtGLEtBQWpCO0FBL0JNO0FBQUEseUJBZ0NBLDBCQUFnQixLQUFLWixTQUFMLENBQWVlLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUJHLEdBQXpDLENBaENBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBa0NSUyxTQWxDUSxpQkFrQ0YsQ0FBRSxDQWxDQTtBQW1DUkMsZUFuQ1EsdUJBbUNJLENBQUU7QUFuQ04sSzs7OztFQVQyQixlQUFLQyxTOztrQkFBdkIvQixTIiwiZmlsZSI6InBob3RvSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcGhvdG9JdGVtOiBbXSxcclxuICAgIHBob3RvSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGltYWdlOiBbMSwgMiwgMywgNCwgNSwgNiwgN11cclxuICB9O1xyXG4gIHdhdGNoID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrSW1hZ2UoZSkge1xyXG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbS5waG90b3MsIF9waG90b0lkeClcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICB9LFxyXG4gICAgY2xpY2taYW4oKSB7XHJcbiAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJy9nZy9waG90by96YW4nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWQsXHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMucGhvdG9JdGVtLmlzX3phbiA/ICdjYW5jZWwnIDogJ3phbidcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLnBob3RvSXRlbS5pc196YW4gPSAhdGhpcy5waG90b0l0ZW0uaXNfemFuXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbFBob3RvKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnd3d3JylcclxuICAgICAgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL2RlbCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2RlbGV0UGhvdG8nLCB0aGlzLnBob3RvSW5kZXgpXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRvd25VcmwodXJsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5kZXgpXHJcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnBob3RvSXRlbS5waG90b3NbMF0udXJsKVxyXG4gICAgfSxcclxuICAgIHRhcCgpIHt9LFxyXG4gICAgZG93bkltYWdlKCkge31cclxuICB9O1xyXG59XHJcbiJdfQ==