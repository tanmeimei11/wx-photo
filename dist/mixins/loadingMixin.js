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
  }, {
    key: 'toastSucc',
    value: function toastSucc(text) {
      wx.showToast({
        title: text,
        mask: true
      });
    }
  }, {
    key: 'toastFail',
    value: function toastFail(text) {
      wx.showToast({
        title: text,
        image: '../../images/toast-fail.png',
        mask: true
      });
    }
  }]);

  return LoadingMixin;
}(_wepy2.default.mixin);

exports.default = LoadingMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmdNaXhpbi5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nTWl4aW4iLCJkYXRhIiwiYSIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJpbWFnZSIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEksR0FBTztBQUNMQyxTQUFHO0FBREUsSzs7Ozs7OEJBR0dDLEksRUFBTTtBQUNkQyxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBT0gsSUFETTtBQUViSSxjQUFNO0FBRk8sT0FBZjtBQUlEOzs7aUNBQ1k7QUFDWEgsU0FBR0ksV0FBSDtBQUNEOzs7OEJBQ1NMLEksRUFBTTtBQUNkQyxTQUFHSyxTQUFILENBQWE7QUFDWEgsZUFBT0gsSUFESTtBQUVYSSxjQUFNO0FBRkssT0FBYjtBQUlEOzs7OEJBQ1NKLEksRUFBTTtBQUNkQyxTQUFHSyxTQUFILENBQWE7QUFDWEgsZUFBT0gsSUFESTtBQUVYTyxlQUFPLDZCQUZJO0FBR1hILGNBQU07QUFISyxPQUFiO0FBS0Q7Ozs7RUF6QnVDLGVBQUtJLEs7O2tCQUExQlgsWSIsImZpbGUiOiJsb2FkaW5nTWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ01peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgZGF0YSA9IHtcclxuICAgIGE6IDFcclxuICB9XHJcbiAgbG9hZGluZ0luKHRleHQpIHtcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6IHRleHQsXHJcbiAgICAgIG1hc2s6IHRydWVcclxuICAgIH0pXHJcbiAgfVxyXG4gIGxvYWRpbmdPdXQoKSB7XHJcbiAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgfVxyXG4gIHRvYXN0U3VjYyh0ZXh0KSB7XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZTogdGV4dCxcclxuICAgICAgbWFzazogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbiAgdG9hc3RGYWlsKHRleHQpIHtcclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiB0ZXh0LFxyXG4gICAgICBpbWFnZTogJy4uLy4uL2ltYWdlcy90b2FzdC1mYWlsLnBuZycsXHJcbiAgICAgIG1hc2s6IHRydWVcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==