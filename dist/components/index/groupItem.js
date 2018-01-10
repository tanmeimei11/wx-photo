"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
        this.groupItem.notice_count = 0;
        wx.navigateTo({
          url: "/pages/gallery/gallery?id=" + groupId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return GroupItem;
}(_wepy2.default.component);

exports.default = GroupItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwSXRlbS5qcyJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsImdyb3VwSXRlbSIsImdyb3VwSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwid2F0Y2giLCJtZXRob2RzIiwiY2xpY2tUb0dyb3VwIiwiZ3JvdXBJZCIsImlkIiwibm90aWNlX2NvdW50Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVcsRUFETDtBQUVOQyxrQkFBWUM7QUFGTixLLFFBSVJDLEksR0FBTyxFLFFBQ1BDLEssR0FBUSxFLFFBQ1JDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLFlBQUlDLFVBQVUsS0FBS1AsU0FBTCxDQUFlUSxFQUE3QjtBQUNBLGFBQUtSLFNBQUwsQ0FBZVMsWUFBZixHQUE4QixDQUE5QjtBQUNBQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsOENBQWtDTDtBQUR0QixTQUFkO0FBR0Q7QUFQTyxLOzs7O0VBUDJCLGVBQUtNLFM7O2tCQUF2QmYsUyIsImZpbGUiOiJncm91cEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgZ3JvdXBJdGVtOiBbXSxcclxuICAgIGdyb3VwSW5kZXg6IE51bWJlclxyXG4gIH07XHJcbiAgZGF0YSA9IHt9O1xyXG4gIHdhdGNoID0ge307XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrVG9Hcm91cCgpIHtcclxuICAgICAgdmFyIGdyb3VwSWQgPSB0aGlzLmdyb3VwSXRlbS5pZDtcclxuICAgICAgdGhpcy5ncm91cEl0ZW0ubm90aWNlX2NvdW50ID0gMFxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7Z3JvdXBJZH1gXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19