'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            motto: 'Hello World',
            userInfo: {}
        }, _this.methods = {
            bindViewTap: function bindViewTap() {
                console.log('button clicked');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad');
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/gallery/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsIm1vdHRvIiwidXNlckluZm8iLCJtZXRob2RzIiwiYmluZFZpZXdUYXAiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBRWpCQyxJLEdBQU87QUFDSEMsbUJBQU8sYUFESjtBQUVIQyxzQkFBVTtBQUZQLFMsUUFJUEMsTyxHQUFVO0FBQ05DLHVCQURNLHlCQUNTO0FBQ1hDLHdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDSDtBQUhLLFM7Ozs7O2lDQUtEO0FBQ0xELG9CQUFRQyxHQUFSLENBQVksUUFBWjtBQUNIOzs7O0VBYjhCLGVBQUtDLEk7O2tCQUFuQlIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcbiAgICAgICAgdXNlckluZm86IHt9XG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBiaW5kVmlld1RhcCAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIGNsaWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XG4gICAgfTtcbn0iXX0=