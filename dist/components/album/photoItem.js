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
      photoItem: []
    }, _this.data = {
      zanClass: ''
    }, _this.watch = {}, _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        console.log(this.photoItem.photos, _photoIdx);
        this.$emit('changeCurPhotos', this.photoItem.photos, _photoIdx);
      },
      clickZan: function clickZan() {
        var _this2 = this;

        if (this.photoItem.is_zan) {}
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
      downUrl: function downUrl(url) {
        (0, _api.downInternetUrl)(this.photoItem.photos[0].url);
      },
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsImRhdGEiLCJ6YW5DbGFzcyIsIndhdGNoIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiY29uc29sZSIsImxvZyIsInBob3RvcyIsIiRlbWl0IiwiY2xpY2taYW4iLCJpc196YW4iLCJ1cmwiLCJwaWQiLCJwaG90b19pZCIsImFjdGlvbiIsInRoZW4iLCIkYXBwbHkiLCJkb3duVXJsIiwidGFwIiwiZG93bkltYWdlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVc7QUFETCxLLFFBR1JDLEksR0FBTztBQUNMQyxnQkFBVTtBQURMLEssUUFHUEMsSyxHQUFRLEUsUUFDUkMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxZQUFZRCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpDO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS1osU0FBTCxDQUFlYSxNQUEzQixFQUFtQ04sU0FBbkM7QUFDQSxhQUFLTyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2QsU0FBTCxDQUFlYSxNQUE3QyxFQUFxRE4sU0FBckQ7QUFDRCxPQUxPO0FBTVJRLGNBTlEsc0JBTUc7QUFBQTs7QUFDVCxZQUFJLEtBQUtmLFNBQUwsQ0FBZWdCLE1BQW5CLEVBQTJCLENBQzFCO0FBQ0QsNEJBQVE7QUFDTkMsZUFBSyxlQURDO0FBRU5oQixnQkFBTTtBQUNKaUIsaUJBQUssS0FBS2xCLFNBQUwsQ0FBZW1CLFFBRGhCO0FBRUpDLG9CQUFRLEtBQUtwQixTQUFMLENBQWVnQixNQUFmLEdBQXdCLFFBQXhCLEdBQW1DO0FBRnZDO0FBRkEsU0FBUixFQU1HSyxJQU5ILENBTVEsZUFBTztBQUNiLGlCQUFLckIsU0FBTCxDQUFlZ0IsTUFBZixHQUF3QixDQUFDLE9BQUtoQixTQUFMLENBQWVnQixNQUF4QztBQUNBLGlCQUFLTSxNQUFMO0FBQ0QsU0FURDtBQVVELE9BbkJPO0FBb0JSQyxhQXBCUSxtQkFvQkFOLEdBcEJBLEVBb0JLO0FBQ1gsa0NBQWdCLEtBQUtqQixTQUFMLENBQWVhLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUJJLEdBQXpDO0FBQ0QsT0F0Qk87QUF1QlJPLFNBdkJRLGlCQXVCRixDQUFFLENBdkJBO0FBd0JSQyxlQXhCUSx1QkF3QkksQ0FBRTtBQXhCTixLOzs7O0VBUjJCLGVBQUtDLFM7O2tCQUF2QjVCLFMiLCJmaWxlIjoicGhvdG9JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xyXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgemFuQ2xhc3M6ICcnXHJcbiAgfTtcclxuICB3YXRjaCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0ltYWdlKGUpIHtcclxuICAgICAgdmFyIF9waG90b0lkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUN1clBob3RvcycsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KVxyXG4gICAgfSxcclxuICAgIGNsaWNrWmFuKCkge1xyXG4gICAgICBpZiAodGhpcy5waG90b0l0ZW0uaXNfemFuKSB7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gJ2NhbmNlbCcgOiAnemFuJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLmlzX3phbiA9ICF0aGlzLnBob3RvSXRlbS5pc196YW5cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZG93blVybCh1cmwpIHtcclxuICAgICAgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9JdGVtLnBob3Rvc1swXS51cmwpXHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19