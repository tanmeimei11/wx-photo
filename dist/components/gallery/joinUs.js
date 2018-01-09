'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinUs = function (_wepy$component) {
  _inherits(joinUs, _wepy$component);

  function joinUs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, joinUs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = joinUs.__proto__ || Object.getPrototypeOf(joinUs)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupID: String
    }, _this.data = {
      intro: '',
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeApply');
        console.log(this.groupID);
      },
      typeintro: function typeintro(e) {
        this.intro = e.detail.value;
        this.checkBtn();
      },
      typewx: function typewx(e) {
        this.wx = e.detail.value;
        this.checkBtn();
      },
      submit: function submit() {
        if (this.full) {
          console.log(this.intro, this.wx);
        }
      }
    }, _this.watch = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinUs, [{
    key: 'checkBtn',
    value: function checkBtn() {
      if (this.intro && this.wx) {
        this.full = true;
      } else {
        this.full = false;
      }
    }
  }]);

  return joinUs;
}(_wepy2.default.component);

exports.default = joinUs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJqb2luVXMiLCJwcm9wcyIsImdyb3VwSUQiLCJTdHJpbmciLCJkYXRhIiwiaW50cm8iLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlaW50cm8iLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJjaGVja0J0biIsInR5cGV3eCIsInN1Ym1pdCIsIndhdGNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxVQUFJLEVBRkM7QUFHTEMsWUFBTTtBQUhELEssUUFLUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLQyxLQUFMLENBQVcsWUFBWDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtWLE9BQWpCO0FBQ0QsT0FKTztBQUtSVyxlQUxRLHFCQUtFQyxDQUxGLEVBS0s7QUFDWCxhQUFLVCxLQUFMLEdBQWFTLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxhQUFLQyxRQUFMO0FBQ0QsT0FSTztBQVNSQyxZQVRRLGtCQVNESixDQVRDLEVBU0U7QUFDUixhQUFLUixFQUFMLEdBQVVRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBbkI7QUFDQSxhQUFLQyxRQUFMO0FBQ0QsT0FaTztBQWFSRSxZQWJRLG9CQWFDO0FBQ1AsWUFBRyxLQUFLWixJQUFSLEVBQWM7QUFDWkksa0JBQVFDLEdBQVIsQ0FBWSxLQUFLUCxLQUFqQixFQUF3QixLQUFLQyxFQUE3QjtBQUNEO0FBQ0Y7QUFqQk8sSyxRQTBCVmMsSyxHQUFRLEU7Ozs7OytCQVBHO0FBQ1QsVUFBSSxLQUFLZixLQUFMLElBQWMsS0FBS0MsRUFBdkIsRUFBMkI7QUFDekIsYUFBS0MsSUFBTCxHQUFZLElBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxJQUFMLEdBQVksS0FBWjtBQUNEO0FBQ0Y7Ozs7RUFsQ2lDLGVBQUtjLFM7O2tCQUFwQnJCLE0iLCJmaWxlIjoiam9pblVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBqb2luVXMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBncm91cElEOiBTdHJpbmdcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBpbnRybzogJycsXG4gICAgICB3eDogJycsXG4gICAgICBmdWxsOiBmYWxzZVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZUFwcGx5JylcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cElEKVxuICAgICAgfSxcbiAgICAgIHR5cGVpbnRybyhlKSB7XG4gICAgICAgIHRoaXMuaW50cm8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLmNoZWNrQnRuKClcbiAgICAgIH0sXG4gICAgICB0eXBld3goZSkge1xuICAgICAgICB0aGlzLnd4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5jaGVja0J0bigpXG4gICAgICB9LFxuICAgICAgc3VibWl0KCkge1xuICAgICAgICBpZih0aGlzLmZ1bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmludHJvLCB0aGlzLnd4KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBjaGVja0J0bigpIHtcbiAgICAgIGlmICh0aGlzLmludHJvICYmIHRoaXMud3gpIHtcbiAgICAgICAgdGhpcy5mdWxsID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mdWxsID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgd2F0Y2ggPSB7XG4gICAgfTtcbiAgfVxuIl19