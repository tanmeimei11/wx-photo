'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index/index', 'pages/gallery/gallery', 'pages/setting/setting', 'pages/album/album'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      getDeviceInfo: {
        a: 1
      },
      userInfo: null
    };

    _this.use('requestfix');
    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onShow',
    value: function onShow(res) {
      console.log(res);
      if (res.shareTicket) {
        this.globalData.shareTicket = res.shareTicket;
      } else {
        this.globalData.shareTicket = '';
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiZ2V0RGV2aWNlSW5mbyIsImEiLCJ1c2VySW5mbyIsInVzZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZVRpY2tldCIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJjYiIsInRoYXQiLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQXlCRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBdEJkQSxNQXNCYyxHQXRCTDtBQUNQQyxhQUFPLENBQ0wsbUJBREssRUFFTCx1QkFGSyxFQUdMLHVCQUhLLEVBSUwsbUJBSkssQ0FEQTtBQU9QQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCO0FBUEQsS0FzQks7QUFBQSxVQVBkQyxVQU9jLEdBUEQ7QUFDWEMscUJBQWU7QUFDYkMsV0FBRztBQURVLE9BREo7QUFJWEMsZ0JBQVU7QUFKQyxLQU9DOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIWTtBQUliOzs7OzJCQUVNQyxHLEVBQUs7QUFDVkMsY0FBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0EsVUFBSUEsSUFBSUcsV0FBUixFQUFxQjtBQUNuQixhQUFLUixVQUFMLENBQWdCUSxXQUFoQixHQUE4QkgsSUFBSUcsV0FBbEM7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLUixVQUFMLENBQWdCUSxXQUFoQixHQUE4QixFQUE5QjtBQUNEO0FBQ0Y7OzswQkFFS0MsQyxFQUFHO0FBQ1AsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQU9XSyxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtmLFVBQUwsQ0FBZ0JHLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0gsVUFBTCxDQUFnQkcsUUFBdkI7QUFDRDtBQUNELHFCQUFLYSxXQUFMLENBQWlCO0FBQ2ZDLGVBRGUsbUJBQ1BaLEdBRE8sRUFDRjtBQUNYVSxlQUFLZixVQUFMLENBQWdCRyxRQUFoQixHQUEyQkUsSUFBSUYsUUFBL0I7QUFDQVcsZ0JBQU1BLEdBQUdULElBQUlGLFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQTlEMEIsZUFBS2UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaW5kZXgvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvZ2FsbGVyeS9nYWxsZXJ5JyxcclxuICAgICAgJ3BhZ2VzL3NldHRpbmcvc2V0dGluZycsXHJcbiAgICAgICdwYWdlcy9hbGJ1bS9hbGJ1bSdcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICBnZXREZXZpY2VJbmZvOiB7XHJcbiAgICAgIGE6IDFcclxuICAgIH0sXHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXHJcbiAgfVxyXG5cclxuICBvblNob3cocmVzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICBpZiAocmVzLnNoYXJlVGlja2V0KSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5zaGFyZVRpY2tldCA9IHJlcy5zaGFyZVRpY2tldFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbG9iYWxEYXRhLnNoYXJlVGlja2V0ID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzbGVlcChzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcclxuICAgICAgfSwgcyAqIDEwMDApXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdGVzdEFzeW5jKCkge1xyXG4gICAgLy8gY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=