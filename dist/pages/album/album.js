'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _photoItem = require('./../../components/album/photoItem.js');

var _photoItem2 = _interopRequireDefault(_photoItem);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 配置

  // 组件


  // data


  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      (0, _login.request)({
        url: '/gg/gallery/photolist',
        data: {}
      });
      // this.$parent.getUserInfo(function (userInfo) {
      //   if (userInfo) {
      //     self.userInfo = userInfo
      //   }
      //   self.normalTitle = '标题已被修改'

      //   self.setTimeoutTitle = '标题三秒后会被修改'
      //   setTimeout(() => {
      //     self.setTimeoutTitle = '到三秒了'
      //     self.$apply()
      //   }, 3000)

      //   self.$apply()
      // })
    }
  }]);

  return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {
    navigationBarTitleText: '第一次聚会' };
  this.components = {
    photoItem: _photoItem2.default };
  this.data = {};
  this.computed = {
    now: function now() {
      return +new Date();
    }
  };
  this.methods = {
    plus: function plus() {
      this.mynum++;
    },
    toast: function toast() {
      var promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      });

      promise.then(function (d) {
        console.log('toast done');
      });
    },
    tap: function tap() {
      console.log('do noting from ' + this.$name);
    },
    communicate: function communicate() {
      console.log(this.$name + ' tap');

      this.$invoke('counter2', 'minus', 45, 6);
      this.$invoke('counter1', 'plus', 45, 6);

      this.$broadcast('index-broadcast', 1, 3, 4);
    },
    request: function request() {
      var self = this;
      var i = 10;
      var map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ=='];
      while (i--) {
        _wepy2.default.request({
          url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
          success: function success(d) {
            self.netrst += d.data + '.';
            self.$apply();
          }
        });
      }
    },
    counterEmit: function counterEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(this.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref3;

      var $event = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwidXJsIiwiZGF0YSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsImNvbXB1dGVkIiwibm93IiwiRGF0ZSIsIm1ldGhvZHMiLCJwbHVzIiwibXludW0iLCJ0b2FzdCIsInByb21pc2UiLCIkaW52b2tlIiwidGl0bGUiLCJpbWciLCJ0aGVuIiwiZCIsImNvbnNvbGUiLCJsb2ciLCJ0YXAiLCIkbmFtZSIsImNvbW11bmljYXRlIiwiJGJyb2FkY2FzdCIsInJlcXVlc3QiLCJzZWxmIiwiaSIsIm1hcCIsInN1Y2Nlc3MiLCJuZXRyc3QiLCIkYXBwbHkiLCJjb3VudGVyRW1pdCIsIiRldmVudCIsImxlbmd0aCIsIm5hbWUiLCJzb3VyY2UiLCJldmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUlxQkEsSzs7Ozs7Ozs7Ozs7Ozs7OztBQUNuQjs7QUFJQTs7O0FBS0E7Ozs7OzZCQStEUztBQUNQLDBCQUFRO0FBQ05DLGFBQUssdUJBREM7QUFFTkMsY0FBTTtBQUZBLE9BQVI7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNEOzs7O0VBNUZnQyxlQUFLQyxJOzs7OztPQUV0Q0MsTSxHQUFTO0FBQ1BDLDRCQUF3QixPQURqQixFO09BSVRDLFUsR0FBYTtBQUNYQyxrQ0FEVyxFO09BS2JMLEksR0FBTyxFO09BSVBNLFEsR0FBVztBQUNUQyxPQURTLGlCQUNIO0FBQ0osYUFBTyxDQUFDLElBQUlDLElBQUosRUFBUjtBQUNEO0FBSFEsRztPQU1YQyxPLEdBQVU7QUFDUkMsUUFEUSxrQkFDRDtBQUNMLFdBQUtDLEtBQUw7QUFDRCxLQUhPO0FBSVJDLFNBSlEsbUJBSUE7QUFDTixVQUFJQyxVQUFVLEtBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzFDQyxlQUFPLE9BRG1DO0FBRTFDQyxhQUFLO0FBRnFDLE9BQTlCLENBQWQ7O0FBS0FILGNBQVFJLElBQVIsQ0FBYSxVQUFDQyxDQUFELEVBQU87QUFDbEJDLGdCQUFRQyxHQUFSLENBQVksWUFBWjtBQUNELE9BRkQ7QUFHRCxLQWJPO0FBY1JDLE9BZFEsaUJBY0Y7QUFDSkYsY0FBUUMsR0FBUixDQUFZLG9CQUFvQixLQUFLRSxLQUFyQztBQUNELEtBaEJPO0FBaUJSQyxlQWpCUSx5QkFpQk07QUFDWkosY0FBUUMsR0FBUixDQUFZLEtBQUtFLEtBQUwsR0FBYSxNQUF6Qjs7QUFFQSxXQUFLUixPQUFMLENBQWEsVUFBYixFQUF5QixPQUF6QixFQUFrQyxFQUFsQyxFQUFzQyxDQUF0QztBQUNBLFdBQUtBLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLE1BQXpCLEVBQWlDLEVBQWpDLEVBQXFDLENBQXJDOztBQUVBLFdBQUtVLFVBQUwsQ0FBZ0IsaUJBQWhCLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLEVBQXlDLENBQXpDO0FBQ0QsS0F4Qk87QUF5QlJDLFdBekJRLHFCQXlCRTtBQUNSLFVBQUlDLE9BQU8sSUFBWDtBQUNBLFVBQUlDLElBQUksRUFBUjtBQUNBLFVBQUlDLE1BQU0sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixNQUFqQixFQUF5QixNQUF6QixFQUFpQyxNQUFqQyxFQUF5QyxNQUF6QyxFQUFpRCxNQUFqRCxFQUF5RCxNQUF6RCxFQUFpRSxNQUFqRSxFQUF5RSxNQUF6RSxDQUFWO0FBQ0EsYUFBT0QsR0FBUCxFQUFZO0FBQ1YsdUJBQUtGLE9BQUwsQ0FBYTtBQUNYMUIsZUFBSyw0REFBNEQ2QixJQUFJRCxDQUFKLENBQTVELEdBQXFFLEtBQXJFLEdBQTZFQSxDQUR2RTtBQUVYRSxtQkFBUyxpQkFBVVgsQ0FBVixFQUFhO0FBQ3BCUSxpQkFBS0ksTUFBTCxJQUFlWixFQUFFbEIsSUFBRixHQUFTLEdBQXhCO0FBQ0EwQixpQkFBS0ssTUFBTDtBQUNEO0FBTFUsU0FBYjtBQU9EO0FBQ0YsS0F0Q087QUF1Q1JDLGVBdkNRLHlCQXVDYTtBQUFBOztBQUNuQixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQWYsY0FBUUMsR0FBUixDQUFlLEtBQUtFLEtBQXBCLGlCQUFxQ1csT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY2QsS0FBdkU7QUFDRDtBQTFDTyxHO09BNkNWZSxNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJSixrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQWYsY0FBUUMsR0FBUixDQUFlLE9BQUtFLEtBQXBCLGlCQUFxQ1csT0FBT0UsSUFBNUMsY0FBeURGLE9BQU9HLE1BQVAsQ0FBY2QsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkFsRVV4QixLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+esrOS4gOasoeiBmuS8midcbiAgfVxuICAvLyDnu4Tku7ZcbiAgY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbVxuICB9XG5cbiAgLy8gZGF0YVxuICBkYXRhID0ge1xuXG4gIH1cblxuICBjb21wdXRlZCA9IHtcbiAgICBub3coKSB7XG4gICAgICByZXR1cm4gK25ldyBEYXRlKClcbiAgICB9XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHBsdXMoKSB7XG4gICAgICB0aGlzLm15bnVtKytcbiAgICB9LFxuICAgIHRvYXN0KCkge1xuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgIHRpdGxlOiAn6Ieq5a6a5LmJ5qCH6aKYJyxcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tpaW5sYW0vd2V0b2FzdC9tYXN0ZXIvaW1hZ2VzL3N0YXIucG5nJ1xuICAgICAgfSlcblxuICAgICAgcHJvbWlzZS50aGVuKChkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0b2FzdCBkb25lJylcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0YXAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZG8gbm90aW5nIGZyb20gJyArIHRoaXMuJG5hbWUpXG4gICAgfSxcbiAgICBjb21tdW5pY2F0ZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXG5cbiAgICAgIHRoaXMuJGludm9rZSgnY291bnRlcjInLCAnbWludXMnLCA0NSwgNilcbiAgICAgIHRoaXMuJGludm9rZSgnY291bnRlcjEnLCAncGx1cycsIDQ1LCA2KVxuXG4gICAgICB0aGlzLiRicm9hZGNhc3QoJ2luZGV4LWJyb2FkY2FzdCcsIDEsIDMsIDQpXG4gICAgfSxcbiAgICByZXF1ZXN0KCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgaSA9IDEwXG4gICAgICBsZXQgbWFwID0gWydNQT09JywgJ01Rbz0nLCAnTWc9PScsICdNdz09JywgJ05BPT0nLCAnTlE9PScsICdOZz09JywgJ053PT0nLCAnT0E9PScsICdPUT09J11cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5tYWRjb2Rlci5jbi90ZXN0cy9zbGVlcC5waHA/dGltZT0xJnQ9Y3NzJmM9JyArIG1hcFtpXSArICcmaT0nICsgaSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2VsZi5uZXRyc3QgKz0gZC5kYXRhICsgJy4nXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgY291bnRlckVtaXQoLi4uYXJncykge1xuICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHt9XG4gICAgfSlcbiAgICAvLyB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZnVuY3Rpb24gKHVzZXJJbmZvKSB7XG4gICAgLy8gICBpZiAodXNlckluZm8pIHtcbiAgICAvLyAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXG4gICAgLy8gICB9XG4gICAgLy8gICBzZWxmLm5vcm1hbFRpdGxlID0gJ+agh+mimOW3suiiq+S/ruaUuSdcblxuICAgIC8vICAgc2VsZi5zZXRUaW1lb3V0VGl0bGUgPSAn5qCH6aKY5LiJ56eS5ZCO5Lya6KKr5L+u5pS5J1xuICAgIC8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgIHNlbGYuc2V0VGltZW91dFRpdGxlID0gJ+WIsOS4ieenkuS6hidcbiAgICAvLyAgICAgc2VsZi4kYXBwbHkoKVxuICAgIC8vICAgfSwgMzAwMClcblxuICAgIC8vICAgc2VsZi4kYXBwbHkoKVxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==