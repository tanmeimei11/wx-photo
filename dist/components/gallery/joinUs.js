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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = joinUs.__proto__ || Object.getPrototypeOf(joinUs)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      intro: '',
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeApply');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJqb2luVXMiLCJkYXRhIiwiaW50cm8iLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsInR5cGVpbnRybyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNoZWNrQnRuIiwidHlwZXd4Iiwic3VibWl0IiwiY29uc29sZSIsImxvZyIsIndhdGNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLFlBQU07QUFIRCxLLFFBS1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLFlBQVg7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUVDLENBSkYsRUFJSztBQUNYLGFBQUtQLEtBQUwsR0FBYU8sRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVBPO0FBUVJDLFlBUlEsa0JBUURKLENBUkMsRUFRRTtBQUNSLGFBQUtOLEVBQUwsR0FBVU0sRUFBRUMsTUFBRixDQUFTQyxLQUFuQjtBQUNBLGFBQUtDLFFBQUw7QUFDRCxPQVhPO0FBWVJFLFlBWlEsb0JBWUM7QUFDUCxZQUFHLEtBQUtWLElBQVIsRUFBYztBQUNaVyxrQkFBUUMsR0FBUixDQUFZLEtBQUtkLEtBQWpCLEVBQXdCLEtBQUtDLEVBQTdCO0FBQ0Q7QUFDRjtBQWhCTyxLLFFBeUJWYyxLLEdBQVEsRTs7Ozs7K0JBUEc7QUFDVCxVQUFJLEtBQUtmLEtBQUwsSUFBYyxLQUFLQyxFQUF2QixFQUEyQjtBQUN6QixhQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtBLElBQUwsR0FBWSxLQUFaO0FBQ0Q7QUFDRjs7OztFQTlCaUMsZUFBS2MsUzs7a0JBQXBCbEIsTSIsImZpbGUiOiJqb2luVXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5VcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgaW50cm86ICcnLFxuICAgICAgd3g6ICcnLFxuICAgICAgZnVsbDogZmFsc2VcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2VBcHBseScpXG4gICAgICB9LFxuICAgICAgdHlwZWludHJvKGUpIHtcbiAgICAgICAgdGhpcy5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMuY2hlY2tCdG4oKVxuICAgICAgfSxcbiAgICAgIHR5cGV3eChlKSB7XG4gICAgICAgIHRoaXMud3ggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLmNoZWNrQnRuKClcbiAgICAgIH0sXG4gICAgICBzdWJtaXQoKSB7XG4gICAgICAgIGlmKHRoaXMuZnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW50cm8sIHRoaXMud3gpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGNoZWNrQnRuKCkge1xuICAgICAgaWYgKHRoaXMuaW50cm8gJiYgdGhpcy53eCkge1xuICAgICAgICB0aGlzLmZ1bGwgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZ1bGwgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICB9O1xuICB9XG4iXX0=