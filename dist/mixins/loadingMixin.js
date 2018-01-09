'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingMixin = function (_wepy$mixin) {
  _inherits(LoadingMixin, _wepy$mixin);

  function LoadingMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoadingMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingMixin.__proto__ || Object.getPrototypeOf(LoadingMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      a: 1
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoadingMixin, [{
    key: 'loadingIn',
    value: function loadingIn(text) {
      wx.showLoading({
        title: text,
        mask: true
      });
    }
  }, {
    key: 'loadingOut',
    value: function loadingOut() {
      wx.hideLoading();
    }
  }]);

  return LoadingMixin;
}(_wepy2.default.mixin);

exports.default = LoadingMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmdNaXhpbi5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nTWl4aW4iLCJkYXRhIiwiYSIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxJLEdBQU87QUFDTEMsU0FBRztBQURFLEs7Ozs7OzhCQUdHQyxJLEVBQU07QUFDZEMsU0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGVBQU9ILElBRE07QUFFYkksY0FBTTtBQUZPLE9BQWY7QUFJRDs7O2lDQUNZO0FBQ1hILFNBQUdJLFdBQUg7QUFDRDs7OztFQVp1QyxlQUFLQyxLOztrQkFBMUJULFkiLCJmaWxlIjoibG9hZGluZ01peGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBhOiAxXHJcbiAgfVxyXG4gIGxvYWRpbmdJbih0ZXh0KSB7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiB0ZXh0LFxyXG4gICAgICBtYXNrOiB0cnVlXHJcbiAgICB9KVxyXG4gIH1cclxuICBsb2FkaW5nT3V0KCkge1xyXG4gICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gIH1cclxufVxyXG4iXX0=