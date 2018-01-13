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
    value: function toastFail(text, duration) {
      wx.showToast({
        title: text,
        image: '../../images/toast-fail.png',
        mask: true,
        duration: duration || 2000

      });
    }
  }]);

  return LoadingMixin;
}(_wepy2.default.mixin);

exports.default = LoadingMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmdNaXhpbi5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nTWl4aW4iLCJkYXRhIiwiYSIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsImltYWdlIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSSxHQUFPO0FBQ0xDLFNBQUc7QUFERSxLOzs7Ozs4QkFHR0MsSSxFQUFNO0FBQ2RDLFNBQUdDLFdBQUgsQ0FBZTtBQUNiQyxlQUFPSCxJQURNO0FBRWJJLGNBQU07QUFGTyxPQUFmO0FBSUQ7OztpQ0FDWTtBQUNYSCxTQUFHSSxXQUFIO0FBQ0Q7Ozs4QkFDU0wsSSxFQUFNO0FBQ2RDLFNBQUdLLFNBQUgsQ0FBYTtBQUNYSCxlQUFPSCxJQURJO0FBRVhJLGNBQU07QUFGSyxPQUFiO0FBSUQ7Ozs4QkFDU0osSSxFQUFNTyxRLEVBQVU7QUFDeEJOLFNBQUdLLFNBQUgsQ0FBYTtBQUNYSCxlQUFPSCxJQURJO0FBRVhRLGVBQU8sNkJBRkk7QUFHWEosY0FBTSxJQUhLO0FBSVhHLGtCQUFVQSxZQUFZOztBQUpYLE9BQWI7QUFPRDs7OztFQTNCdUMsZUFBS0UsSzs7a0JBQTFCWixZIiwiZmlsZSI6ImxvYWRpbmdNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nTWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcclxuICBkYXRhID0ge1xyXG4gICAgYTogMVxyXG4gIH1cclxuICBsb2FkaW5nSW4odGV4dCkge1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogdGV4dCxcclxuICAgICAgbWFzazogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbiAgbG9hZGluZ091dCgpIHtcclxuICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICB9XHJcbiAgdG9hc3RTdWNjKHRleHQpIHtcclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiB0ZXh0LFxyXG4gICAgICBtYXNrOiB0cnVlXHJcbiAgICB9KVxyXG4gIH1cclxuICB0b2FzdEZhaWwodGV4dCwgZHVyYXRpb24pIHtcclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiB0ZXh0LFxyXG4gICAgICBpbWFnZTogJy4uLy4uL2ltYWdlcy90b2FzdC1mYWlsLnBuZycsXHJcbiAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiB8fCAyMDAwXHJcblxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19