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

var refreshIndexMixin = function (_wepy$mixin) {
  _inherits(refreshIndexMixin, _wepy$mixin);

  function refreshIndexMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, refreshIndexMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = refreshIndexMixin.__proto__ || Object.getPrototypeOf(refreshIndexMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isSubmitFormId: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(refreshIndexMixin, [{
    key: 'refreshPage',
    value: function refreshPage(e) {
      var pages = getCurrentPages();
      for (var i = 0; i < pages.length; i++) {
        pages[i].data.pageName === 'index' && pages[i].getList();
      }
    }
  }]);

  return refreshIndexMixin;
}(_wepy2.default.mixin);

exports.default = refreshIndexMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZnJlc2hJbmRleE1peGluLmpzIl0sIm5hbWVzIjpbInJlZnJlc2hJbmRleE1peGluIiwiZGF0YSIsImlzU3VibWl0Rm9ybUlkIiwiZSIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiaSIsImxlbmd0aCIsInBhZ2VOYW1lIiwiZ2V0TGlzdCIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7NE1BQ25CQyxJLEdBQU87QUFDTEMsc0JBQWdCO0FBRFgsSzs7Ozs7Z0NBR0tDLEMsRUFBRztBQUNiLFVBQUlDLFFBQVFDLGlCQUFaO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLE1BQU1HLE1BQTFCLEVBQWtDRCxHQUFsQyxFQUF1QztBQUNyQ0YsY0FBTUUsQ0FBTixFQUFTTCxJQUFULENBQWNPLFFBQWQsS0FBMkIsT0FBM0IsSUFBdUNKLE1BQU1FLENBQU4sRUFBU0csT0FBVCxFQUF2QztBQUNEO0FBQ0Y7Ozs7RUFUNEMsZUFBS0MsSzs7a0JBQS9CVixpQiIsImZpbGUiOiJyZWZyZXNoSW5kZXhNaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlZnJlc2hJbmRleE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGRhdGEgPSB7XG4gICAgaXNTdWJtaXRGb3JtSWQ6IHRydWVcbiAgfVxuICByZWZyZXNoUGFnZShlKSB7XG4gICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWdlc1tpXS5kYXRhLnBhZ2VOYW1lID09PSAnaW5kZXgnICYmIChwYWdlc1tpXS5nZXRMaXN0KCkpXG4gICAgfVxuICB9XG59XG4iXX0=