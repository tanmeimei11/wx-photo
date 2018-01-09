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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupItem = function (_wepy$component) {
  _inherits(GroupItem, _wepy$component);

  function GroupItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GroupItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupItem.__proto__ || Object.getPrototypeOf(GroupItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupItem: [],
      groupIndex: Number
    }, _this.data = {}, _this.watch = {}, _this.methods = {
      clickToGroup: function clickToGroup() {
        var groupId = this.groupItem.id;
        console.log(groupId);
        wx.navigateTo({
          url: "/pages/gallery/index?id=" + groupId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return GroupItem;
}(_wepy2.default.component);

exports.default = GroupItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwSXRlbS5qcyJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsImdyb3VwSXRlbSIsImdyb3VwSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwid2F0Y2giLCJtZXRob2RzIiwiY2xpY2tUb0dyb3VwIiwiZ3JvdXBJZCIsImlkIiwiY29uc29sZSIsImxvZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU8sRSxRQUVQQyxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ087QUFDYixZQUFJQyxVQUFVLEtBQUtQLFNBQUwsQ0FBZVEsRUFBN0I7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWUgsT0FBWjtBQUNBSSxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSyw2QkFBMkJOO0FBRHBCLFNBQWQ7QUFHRDtBQVBPLEs7Ozs7RUFSMkIsZUFBS08sUzs7a0JBQXZCaEIsUyIsImZpbGUiOiJncm91cEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbi5qcyc7XHJcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XHJcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgZ3JvdXBJdGVtOiBbXSxcclxuICAgIGdyb3VwSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICB9O1xyXG4gIHdhdGNoID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrVG9Hcm91cCgpIHtcclxuICAgICAgdmFyIGdyb3VwSWQgPSB0aGlzLmdyb3VwSXRlbS5pZFxyXG4gICAgICBjb25zb2xlLmxvZyhncm91cElkKVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IFwiL3BhZ2VzL2dhbGxlcnkvaW5kZXg/aWQ9XCIrZ3JvdXBJZFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdfQ==