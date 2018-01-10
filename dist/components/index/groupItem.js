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
        console.log(groupId);
        wx.navigateTo({
          url: "/pages/gallery/gallery?id=" + groupId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return GroupItem;
}(_wepy2.default.component);

exports.default = GroupItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwSXRlbS5qcyJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsImdyb3VwSXRlbSIsImdyb3VwSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwid2F0Y2giLCJtZXRob2RzIiwiY2xpY2tUb0dyb3VwIiwiZ3JvdXBJZCIsImlkIiwiY29uc29sZSIsImxvZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU8sRSxRQUNQQyxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ087QUFDYixZQUFJQyxVQUFVLEtBQUtQLFNBQUwsQ0FBZVEsRUFBN0I7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWUgsT0FBWjtBQUNBSSxXQUFHQyxVQUFILENBQWM7QUFDWkMsOENBQWtDTjtBQUR0QixTQUFkO0FBR0Q7QUFQTyxLOzs7O0VBUDJCLGVBQUtPLFM7O2tCQUF2QmhCLFMiLCJmaWxlIjoiZ3JvdXBJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBwcm9wcyA9IHtcclxuICAgIGdyb3VwSXRlbTogW10sXHJcbiAgICBncm91cEluZGV4OiBOdW1iZXJcclxuICB9O1xyXG4gIGRhdGEgPSB7fTtcclxuICB3YXRjaCA9IHt9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja1RvR3JvdXAoKSB7XHJcbiAgICAgIHZhciBncm91cElkID0gdGhpcy5ncm91cEl0ZW0uaWQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKGdyb3VwSWQpO1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7Z3JvdXBJZH1gXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19