'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
    }, _this.components = {
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

exports.default = gallery;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiam9pblVzIiwibmV3QWxidW0iLCJkYXRhIiwiZ3JvdXBJRCIsInRpdGxlIiwiZ3JvdXBJbmZvIiwiZ2FsbGVyeUxpc3QiLCJsb2FkaW5nIiwibm9Nb3JlTm90ZSIsInBhZ2UiLCJzaG93QXBwbHkiLCJzaG93TmV3QWxidW0iLCJtZXRob2RzIiwidG9TZXR0aW5nIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9BbGJ1bSIsImNvbnNvbGUiLCJsb2ciLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJvcHRpb25zIiwiaWQiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsInRoYXQiLCJzZXRUaW1lb3V0IiwiZ3JvdXBfaWQiLCJyZXMiLCJzdWNjIiwiJGFwcGx5IiwiZ2FsbGVyaWVzIiwiaGFzX25leHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYTtBQUNYQyw4QkFEVztBQUVYQztBQUZXLEssUUFLYkMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxhQUFPLEVBRkY7QUFHTEMsaUJBQVcsRUFITjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLGVBQVMsS0FMSjtBQU1MQyxrQkFBWSxLQU5QO0FBT0xDLFlBQU0sQ0FQRDtBQVFMQyxpQkFBVyxLQVJOO0FBU0xDLG9CQUFjO0FBVFQsSyxRQVdQQyxPLEdBQVU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGVBVFEsdUJBU0k7QUFDVkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLDhDQUFrQyxLQUFLYjtBQUQzQixTQUFkO0FBR0QsT0FiTztBQWNSYyxhQWRRLHFCQWNFO0FBQ1JDLGdCQUFRQyxHQUFSLENBQVksS0FBS2hCLE9BQWpCO0FBQ0FXLFdBQUdDLFVBQUgsQ0FBYztBQUNaQywwQ0FBOEIsS0FBS2I7QUFEdkIsU0FBZDtBQUdELE9BbkJPO0FBb0JSaUIsYUFwQlEscUJBb0JFO0FBQ04sYUFBS1YsU0FBTCxHQUFpQixJQUFqQjtBQUNILE9BdEJPO0FBdUJSVyxnQkF2QlEsd0JBdUJLO0FBQ1QsYUFBS1gsU0FBTCxHQUFpQixLQUFqQjtBQUNILE9BekJPO0FBMEJSVCxjQTFCUSxzQkEwQkc7QUFDUCxhQUFLVSxZQUFMLEdBQW9CLElBQXBCO0FBQ0gsT0E1Qk87QUE2QlJXLG1CQTdCUSwyQkE2QlE7QUFDWixhQUFLWCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0g7QUEvQk8sSzs7Ozs7MkJBaUNIWSxPLEVBQVM7QUFDZCxXQUFLcEIsT0FBTCxHQUFlb0IsUUFBUUMsRUFBdkI7QUFDQSxXQUFLcEIsS0FBTCxHQUFhbUIsUUFBUUMsRUFBckI7QUFDQSxXQUFLQyxRQUFMO0FBQ0EsV0FBS0MsZUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUt4QixJQUFMLENBQVVNLFVBQWQsRUFBMEI7QUFDeEI7QUFDRDtBQUNELFVBQUltQixPQUFPLElBQVg7QUFDQUMsaUJBQVcsWUFBWTtBQUNyQkQsYUFBS0QsZUFBTDtBQUNELE9BRkQsRUFFRyxHQUZIO0FBR0Q7Ozs7Ozs7Ozs7O3VCQUVpQixvQkFBUTtBQUN0QlYsdUJBQUssZ0JBRGlCO0FBRXRCZCx3QkFBTTtBQUNKMkIsOEJBQVUsS0FBSzFCO0FBRFg7QUFGZ0IsaUJBQVIsQzs7O0FBQVoyQixtQjs7QUFNSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJNUIsSUFBcEIsRUFBMEI7QUFDeEIsdUJBQUtHLFNBQUwsR0FBaUJ5QixJQUFJNUIsSUFBckI7QUFDQSx1QkFBSzhCLE1BQUw7QUFDQWQsMEJBQVFDLEdBQVIsQ0FBWSxLQUFLZCxTQUFqQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUdHLEtBQUtILElBQUwsQ0FBVUssTzs7Ozs7Ozs7QUFHZCxxQkFBS0wsSUFBTCxDQUFVSyxPQUFWLEdBQW9CLElBQXBCOzt1QkFDZ0Isb0JBQVE7QUFDdEJTLHVCQUFLLHVCQURpQjtBQUV0QmQsd0JBQU07QUFDSjJCLDhCQUFVLEtBQUsxQixPQURYO0FBRUpNLDBCQUFNLEtBQUtQLElBQUwsQ0FBVU87QUFGWjtBQUZnQixpQkFBUixDOzs7QUFBWnFCLG1COztzQkFPQUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJNUIsSTs7Ozs7QUFDbEJnQix3QkFBUUMsR0FBUixDQUFZVyxHQUFaO0FBQ0EscUJBQUt4QixXQUFMLEdBQW1Cd0IsSUFBSTVCLElBQUosQ0FBUytCLFNBQTVCO0FBQ0EscUJBQUsvQixJQUFMLENBQVVPLElBQVYsR0FBaUIsS0FBS1AsSUFBTCxDQUFVTyxJQUFWLEdBQWlCLENBQWxDO0FBQ0EscUJBQUt1QixNQUFMOztvQkFDS0YsSUFBSTVCLElBQUosQ0FBU2dDLFE7Ozs7O0FBQ1oscUJBQUtoQyxJQUFMLENBQVVNLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQkFBS3dCLE1BQUw7Ozs7Ozs7O0FBSUYscUJBQUs5QixJQUFMLENBQVVNLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQkFBS3dCLE1BQUw7OztBQUVGLHFCQUFLOUIsSUFBTCxDQUFVSyxPQUFWLEdBQW9CLEtBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBM0dpQyxlQUFLRSxJOztrQkFBckJiLE8iLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGpvaW5VcyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvam9pblVzJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FsbGVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5rS75Yqo55u45YaMJ1xuICB9XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSUQ6ICcnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBncm91cEluZm86IHt9LFxuICAgIGdhbGxlcnlMaXN0OiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBub01vcmVOb3RlOiBmYWxzZSxcbiAgICBwYWdlOiAwLFxuICAgIHNob3dBcHBseTogZmFsc2UsXG4gICAgc2hvd05ld0FsYnVtOiBmYWxzZVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cElEKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BcHBseSgpIHtcbiAgICAgICAgdGhpcy5zaG93QXBwbHkgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUFwcGx5KCkge1xuICAgICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5ub01vcmVOb3RlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LmxvYWRHYWxsZXJ5bGlzdCgpXG4gICAgfSwgMzAwKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwSW5mbylcbiAgICB9XG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIGlmICh0aGlzLmRhdGEubG9hZGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZGF0YS5sb2FkaW5nID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9nYWxsZXJ5bGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgIHBhZ2U6IHRoaXMuZGF0YS5wYWdlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSByZXMuZGF0YS5nYWxsZXJpZXNcbiAgICAgIHRoaXMuZGF0YS5wYWdlID0gdGhpcy5kYXRhLnBhZ2UgKyAxXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSBmYWxzZVxuICB9XG59XG4iXX0=