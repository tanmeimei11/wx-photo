'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishSucc = function (_wepy$component) {
  _inherits(PublishSucc, _wepy$component);

  function PublishSucc() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishSucc);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishSucc.__proto__ || Object.getPrototypeOf(PublishSucc)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number,
      publishAfterInfo: Object
    }, _this.mixins = [], _this.data = {
      images: []
    }, _this.methods = {
      close: function close() {
        this.$emit('closePublishSucc');
      },
      print: function print() {
        this.$emit('publishPrintPhoto');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 混合


  return PublishSucc;
}(_wepy2.default.component);

exports.default = PublishSucc;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hTdWNjLmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2hTdWNjIiwicHJvcHMiLCJnYWxsZXJ5QXV0aCIsIk51bWJlciIsInB1Ymxpc2hBZnRlckluZm8iLCJPYmplY3QiLCJtaXhpbnMiLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNsb3NlIiwiJGVtaXQiLCJwcmludCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLHdCQUFrQkM7QUFGWixLLFFBS1JDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtDLEtBQUwsQ0FBVyxrQkFBWDtBQUNELE9BSE87QUFJUkMsV0FKUSxtQkFJQTtBQUNOLGFBQUtELEtBQUwsQ0FBVyxtQkFBWDtBQUNEO0FBTk8sSzs7QUFMVjs7OztFQUx1QyxlQUFLRSxTOztrQkFBekJiLFciLCJmaWxlIjoicHVibGlzaFN1Y2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2hTdWNjIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIHB1Ymxpc2hBZnRlckluZm86IE9iamVjdFxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW107XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2VQdWJsaXNoU3VjYycpXG4gICAgfSxcbiAgICBwcmludCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3B1Ymxpc2hQcmludFBob3RvJylcbiAgICB9XG4gIH07XG59XG4iXX0=