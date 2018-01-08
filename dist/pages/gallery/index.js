'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '群活动相册'
        }, _this.data = {
            groupInfo: {}
        }, _this.methods = {
            changeBg: function changeBg() {
                wx.chooseImage({
                    count: 1,
                    success: function success(res) {
                        console.log(res);
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            (0, _login.request)({
                url: '/gg/group/info',
                data: {
                    group_id: 0
                }
            }).then(function (res) {
                _this2.groupInfo = res;
                _this2.$apply();
                console.log(_this2.groupInfo);
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/gallery/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJncm91cEluZm8iLCJtZXRob2RzIiwiY2hhbmdlQmciLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInVybCIsImdyb3VwX2lkIiwidGhlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ1BDLG9DQUF3QjtBQURqQixTLFFBSVRDLEksR0FBTztBQUNIQyx1QkFBVztBQURSLFMsUUFHUEMsTyxHQUFVO0FBQ05DLG9CQURNLHNCQUNNO0FBQ1JDLG1CQUFHQyxXQUFILENBQWU7QUFDWEMsMkJBQU8sQ0FESTtBQUVYQyw2QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CQyxnQ0FBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0g7QUFKVSxpQkFBZjtBQU1IO0FBUkssUzs7Ozs7aUNBVUQ7QUFBQTs7QUFDTCxnQ0FBUTtBQUNKRyxxQkFBSyxnQkFERDtBQUVKWCxzQkFBTTtBQUNGWSw4QkFBVTtBQURSO0FBRkYsYUFBUixFQUtHQyxJQUxILENBS1EsVUFBQ0wsR0FBRCxFQUFRO0FBQ1osdUJBQUtQLFNBQUwsR0FBaUJPLEdBQWpCO0FBQ0EsdUJBQUtNLE1BQUw7QUFDQUwsd0JBQVFDLEdBQVIsQ0FBWSxPQUFLVCxTQUFqQjtBQUNILGFBVEQ7QUFVSDs7OztFQTdCOEIsZUFBS2MsSTs7a0JBQW5CbEIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHtyZXF1ZXN0fSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgZ3JvdXBJbmZvOiB7fVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2hhbmdlQmcgKCkge1xuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCkge1xuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBncm91cF9pZDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXMpID0+e1xuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSByZXNcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgICAgICB9KVxuICAgIH07XG59Il19