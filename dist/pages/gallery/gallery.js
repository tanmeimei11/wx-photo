'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _joinUs = require('./../../components/gallery/joinUs.js');

var _joinUs2 = _interopRequireDefault(_joinUs);

var _newAlbum = require('./../../components/gallery/newAlbum.js');

var _newAlbum2 = _interopRequireDefault(_newAlbum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gallery = function (_wepy$page) {
  _inherits(gallery, _wepy$page);

  function gallery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, gallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = gallery.__proto__ || Object.getPrototypeOf(gallery)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '群活动相册'
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "" }, "newAlbum": {} }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.data = {
      groupID: '',
      title: '',
      groupInfo: {},
      galleryList: [],
      loading: false,
      noMoreNote: false,
      page: 0,
      showApply: false,
      showNewAlbum: false
    }, _this.methods = {
      // changeBg () {
      //     wx.chooseImage({
      //         count: 1,
      //         success: function(res) {
      //             console.log(res)
      //         }
      //     })
      // },
      toSetting: function toSetting() {
        wx.navigateTo({
          url: '/pages/setting/setting?id=' + this.groupID
        });
      },
      toAlbum: function toAlbum() {
        console.log(this.groupID);
        wx.navigateTo({
          url: '/pages/album/album?id=' + this.groupID
        });
      },
      toApply: function toApply() {
        this.showApply = true;
      },
      closeApply: function closeApply() {
        this.showApply = false;
      },
      newAlbum: function newAlbum() {
        this.showNewAlbum = true;
      },
      closeNewAlbum: function closeNewAlbum() {
        this.showNewAlbum = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(gallery, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.groupID = options.id;
      this.title = options.id;
      this.loadInfo();
      this.loadGallerylist();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.data.noMoreNote) {
        return;
      }
      var that = this;
      setTimeout(function () {
        that.loadGallerylist();
      }, 300);
    }
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/info',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context.sent;

                if (res.succ && res.data) {
                  this.groupInfo = res.data;
                  this.$apply();
                  console.log(this.groupInfo);
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadInfo() {
        return _ref2.apply(this, arguments);
      }

      return loadInfo;
    }()
  }, {
    key: 'loadGallerylist',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.data.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                this.data.loading = true;
                _context2.next = 5;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    page: this.data.page
                  }
                });

              case 5:
                res = _context2.sent;

                if (!(res.succ && res.data)) {
                  _context2.next = 17;
                  break;
                }

                console.log(res);
                this.galleryList = res.data.galleries;
                this.data.page = this.data.page + 1;
                this.$apply();

                if (res.data.has_next) {
                  _context2.next = 15;
                  break;
                }

                this.data.noMoreNote = true;
                this.$apply();
                return _context2.abrupt('return');

              case 15:
                _context2.next = 19;
                break;

              case 17:
                this.data.noMoreNote = true;
                this.$apply();

              case 19:
                this.data.loading = false;

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadGallerylist() {
        return _ref3.apply(this, arguments);
      }

      return loadGallerylist;
    }()
  }]);

  return gallery;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/gallery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsImRhdGEiLCJncm91cElEIiwidGl0bGUiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsInNob3dBcHBseSIsInNob3dOZXdBbGJ1bSIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0FsYnVtIiwiY29uc29sZSIsImxvZyIsInRvQXBwbHkiLCJjbG9zZUFwcGx5IiwiY2xvc2VOZXdBbGJ1bSIsIm9wdGlvbnMiLCJpZCIsImxvYWRJbmZvIiwibG9hZEdhbGxlcnlsaXN0IiwidGhhdCIsInNldFRpbWVvdXQiLCJncm91cF9pZCIsInJlcyIsInN1Y2MiLCIkYXBwbHkiLCJnYWxsZXJpZXMiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGNBQWEsRUFBZCxFQUFWLEVBQTRCLFlBQVcsRUFBdkMsRSxRQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsbUJBQWtCLFlBQW5CLEVBQVYsRUFBMkMsWUFBVyxFQUFDLHNCQUFxQixlQUF0QixFQUF0RCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw4QkFEVTtBQUVWQztBQUZVLEssUUFLWkMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxhQUFPLEVBRkY7QUFHTEMsaUJBQVcsRUFITjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLGVBQVMsS0FMSjtBQU1MQyxrQkFBWSxLQU5QO0FBT0xDLFlBQU0sQ0FQRDtBQVFMQyxpQkFBVyxLQVJOO0FBU0xDLG9CQUFjO0FBVFQsSyxRQVdQQyxPLEdBQVU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGVBVFEsdUJBU0k7QUFDVkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLDhDQUFrQyxLQUFLYjtBQUQzQixTQUFkO0FBR0QsT0FiTztBQWNSYyxhQWRRLHFCQWNFO0FBQ1JDLGdCQUFRQyxHQUFSLENBQVksS0FBS2hCLE9BQWpCO0FBQ0FXLFdBQUdDLFVBQUgsQ0FBYztBQUNaQywwQ0FBOEIsS0FBS2I7QUFEdkIsU0FBZDtBQUdELE9BbkJPO0FBb0JSaUIsYUFwQlEscUJBb0JFO0FBQ1IsYUFBS1YsU0FBTCxHQUFpQixJQUFqQjtBQUNELE9BdEJPO0FBdUJSVyxnQkF2QlEsd0JBdUJLO0FBQ1gsYUFBS1gsU0FBTCxHQUFpQixLQUFqQjtBQUNELE9BekJPO0FBMEJSVCxjQTFCUSxzQkEwQkc7QUFDVCxhQUFLVSxZQUFMLEdBQW9CLElBQXBCO0FBQ0QsT0E1Qk87QUE2QlJXLG1CQTdCUSwyQkE2QlE7QUFDZCxhQUFLWCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0Q7QUEvQk8sSzs7Ozs7MkJBaUNIWSxPLEVBQVM7QUFDZCxXQUFLcEIsT0FBTCxHQUFlb0IsUUFBUUMsRUFBdkI7QUFDQSxXQUFLcEIsS0FBTCxHQUFhbUIsUUFBUUMsRUFBckI7QUFDQSxXQUFLQyxRQUFMO0FBQ0EsV0FBS0MsZUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUt4QixJQUFMLENBQVVNLFVBQWQsRUFBMEI7QUFDeEI7QUFDRDtBQUNELFVBQUltQixPQUFPLElBQVg7QUFDQUMsaUJBQVcsWUFBWTtBQUNyQkQsYUFBS0QsZUFBTDtBQUNELE9BRkQsRUFFRyxHQUZIO0FBR0Q7Ozs7Ozs7Ozs7O3VCQUVpQixvQkFBUTtBQUN0QlYsdUJBQUssZ0JBRGlCO0FBRXRCZCx3QkFBTTtBQUNKMkIsOEJBQVUsS0FBSzFCO0FBRFg7QUFGZ0IsaUJBQVIsQzs7O0FBQVoyQixtQjs7QUFNSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJNUIsSUFBcEIsRUFBMEI7QUFDeEIsdUJBQUtHLFNBQUwsR0FBaUJ5QixJQUFJNUIsSUFBckI7QUFDQSx1QkFBSzhCLE1BQUw7QUFDQWQsMEJBQVFDLEdBQVIsQ0FBWSxLQUFLZCxTQUFqQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUdHLEtBQUtILElBQUwsQ0FBVUssTzs7Ozs7Ozs7QUFHZCxxQkFBS0wsSUFBTCxDQUFVSyxPQUFWLEdBQW9CLElBQXBCOzt1QkFDZ0Isb0JBQVE7QUFDdEJTLHVCQUFLLHVCQURpQjtBQUV0QmQsd0JBQU07QUFDSjJCLDhCQUFVLEtBQUsxQixPQURYO0FBRUpNLDBCQUFNLEtBQUtQLElBQUwsQ0FBVU87QUFGWjtBQUZnQixpQkFBUixDOzs7QUFBWnFCLG1COztzQkFPQUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJNUIsSTs7Ozs7QUFDbEJnQix3QkFBUUMsR0FBUixDQUFZVyxHQUFaO0FBQ0EscUJBQUt4QixXQUFMLEdBQW1Cd0IsSUFBSTVCLElBQUosQ0FBUytCLFNBQTVCO0FBQ0EscUJBQUsvQixJQUFMLENBQVVPLElBQVYsR0FBaUIsS0FBS1AsSUFBTCxDQUFVTyxJQUFWLEdBQWlCLENBQWxDO0FBQ0EscUJBQUt1QixNQUFMOztvQkFDS0YsSUFBSTVCLElBQUosQ0FBU2dDLFE7Ozs7O0FBQ1oscUJBQUtoQyxJQUFMLENBQVVNLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQkFBS3dCLE1BQUw7Ozs7Ozs7O0FBSUYscUJBQUs5QixJQUFMLENBQVVNLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQkFBS3dCLE1BQUw7OztBQUVGLHFCQUFLOUIsSUFBTCxDQUFVSyxPQUFWLEdBQW9CLEtBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUdpQyxlQUFLRSxJOztrQkFBckJoQixPIiwiZmlsZSI6ImdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBqb2luVXMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L2pvaW5VcydcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbGxlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9LFwibmV3QWxidW1cIjp7fX07XHJcbiRldmVudHMgPSB7XCJqb2luVXNcIjp7XCJ2LW9uOmNsb3NlQXBwbHlcIjpcImNsb3NlQXBwbHlcIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGpvaW5Vczogam9pblVzLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBncm91cElEOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgcGFnZTogMCxcbiAgICBzaG93QXBwbHk6IGZhbHNlLFxuICAgIHNob3dOZXdBbGJ1bTogZmFsc2VcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgIC8vICAgICAgICAgY291bnQ6IDEsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfSxcbiAgICB0b1NldHRpbmcoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BbGJ1bSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJRClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5kYXRhLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQubG9hZEdhbGxlcnlsaXN0KClcbiAgICB9LCAzMDApXG4gIH1cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkR2FsbGVyeWxpc3QoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgcGFnZTogdGhpcy5kYXRhLnBhZ2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmdhbGxlcmllc1xuICAgICAgdGhpcy5kYXRhLnBhZ2UgPSB0aGlzLmRhdGEucGFnZSArIDFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gIH1cbn1cbiJdfQ==