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
      joinUs: _joinUs2.default
    }, _this.data = {
      groupID: '',
      title: '',
      groupInfo: {},
      galleryList: [],
      loading: false,
      noMoreNote: false,
      page: 0
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdhbGxlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImpvaW5VcyIsImRhdGEiLCJncm91cElEIiwidGl0bGUiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0FsYnVtIiwiY29uc29sZSIsImxvZyIsIm9wdGlvbnMiLCJpZCIsImxvYWRJbmZvIiwibG9hZEdhbGxlcnlsaXN0IiwidGhhdCIsInNldFRpbWVvdXQiLCJncm91cF9pZCIsInJlcyIsInN1Y2MiLCIkYXBwbHkiLCJnYWxsZXJpZXMiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYTtBQUNYQztBQURXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxhQUFPLEVBRkY7QUFHTEMsaUJBQVcsRUFITjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLGVBQVMsS0FMSjtBQU1MQyxrQkFBWSxLQU5QO0FBT0xDLFlBQU07QUFQRCxLLFFBU1BDLE8sR0FBVTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsZUFUUSx1QkFTSTtBQUNWQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsOENBQWtDLEtBQUtYO0FBRDNCLFNBQWQ7QUFHRCxPQWJPO0FBY1JZLGFBZFEscUJBY0U7QUFDUkMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLZCxPQUFqQjtBQUNBUyxXQUFHQyxVQUFILENBQWM7QUFDWkMsMENBQThCLEtBQUtYO0FBRHZCLFNBQWQ7QUFHRDtBQW5CTyxLOzs7OzsyQkFxQkhlLE8sRUFBUztBQUNkLFdBQUtmLE9BQUwsR0FBZWUsUUFBUUMsRUFBdkI7QUFDQSxXQUFLZixLQUFMLEdBQWFjLFFBQVFDLEVBQXJCO0FBQ0EsV0FBS0MsUUFBTDtBQUNBLFdBQUtDLGVBQUw7QUFDRDs7O29DQUNlO0FBQ2QsVUFBSSxLQUFLbkIsSUFBTCxDQUFVTSxVQUFkLEVBQTBCO0FBQ3hCO0FBQ0Q7QUFDRCxVQUFJYyxPQUFPLElBQVg7QUFDQUMsaUJBQVcsWUFBWTtBQUNyQkQsYUFBS0QsZUFBTDtBQUNELE9BRkQsRUFFRyxHQUZIO0FBR0Q7Ozs7Ozs7Ozs7O3VCQUVpQixvQkFBUTtBQUN0QlAsdUJBQUssZ0JBRGlCO0FBRXRCWix3QkFBTTtBQUNKc0IsOEJBQVUsS0FBS3JCO0FBRFg7QUFGZ0IsaUJBQVIsQzs7O0FBQVpzQixtQjs7QUFNSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdkIsSUFBcEIsRUFBMEI7QUFDeEIsdUJBQUtHLFNBQUwsR0FBaUJvQixJQUFJdkIsSUFBckI7QUFDQSx1QkFBS3lCLE1BQUw7QUFDQVgsMEJBQVFDLEdBQVIsQ0FBWSxLQUFLWixTQUFqQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUdHLEtBQUtILElBQUwsQ0FBVUssTzs7Ozs7Ozs7QUFHZCxxQkFBS0wsSUFBTCxDQUFVSyxPQUFWLEdBQW9CLElBQXBCOzt1QkFDZ0Isb0JBQVE7QUFDdEJPLHVCQUFLLHVCQURpQjtBQUV0Qlosd0JBQU07QUFDSnNCLDhCQUFVLEtBQUtyQixPQURYO0FBRUpNLDBCQUFNLEtBQUtQLElBQUwsQ0FBVU87QUFGWjtBQUZnQixpQkFBUixDOzs7QUFBWmdCLG1COztzQkFPQUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdkIsSTs7Ozs7QUFDbEJjLHdCQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQSxxQkFBS25CLFdBQUwsR0FBbUJtQixJQUFJdkIsSUFBSixDQUFTMEIsU0FBNUI7QUFDQSxxQkFBSzFCLElBQUwsQ0FBVU8sSUFBVixHQUFpQixLQUFLUCxJQUFMLENBQVVPLElBQVYsR0FBaUIsQ0FBbEM7QUFDQSxxQkFBS2tCLE1BQUw7O29CQUNLRixJQUFJdkIsSUFBSixDQUFTMkIsUTs7Ozs7QUFDWixxQkFBSzNCLElBQUwsQ0FBVU0sVUFBVixHQUF1QixJQUF2QjtBQUNBLHFCQUFLbUIsTUFBTDs7Ozs7Ozs7QUFJRixxQkFBS3pCLElBQUwsQ0FBVU0sVUFBVixHQUF1QixJQUF2QjtBQUNBLHFCQUFLbUIsTUFBTDs7O0FBRUYscUJBQUt6QixJQUFMLENBQVVLLE9BQVYsR0FBb0IsS0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1RmlDLGVBQUtFLEk7O2tCQUFyQlosTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGpvaW5VcyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvam9pblVzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAgY29tcG9uZW50cyA9IHtcbiAgICBqb2luVXM6IGpvaW5Vc1xuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBncm91cElEOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgcGFnZTogMFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cElEKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy5pZFxuICAgIHRoaXMubG9hZEluZm8oKVxuICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmRhdGEubm9Nb3JlTm90ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCB0aGF0ID0gdGhpc1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC5sb2FkR2FsbGVyeWxpc3QoKVxuICAgIH0sIDMwMClcbiAgfVxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIGxvYWRHYWxsZXJ5bGlzdCgpIHtcbiAgICBpZiAodGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmRhdGEubG9hZGluZyA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvZ2FsbGVyeWxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElELFxuICAgICAgICBwYWdlOiB0aGlzLmRhdGEucGFnZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aGlzLmdhbGxlcnlMaXN0ID0gcmVzLmRhdGEuZ2FsbGVyaWVzXG4gICAgICB0aGlzLmRhdGEucGFnZSA9IHRoaXMuZGF0YS5wYWdlICsgMVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgaWYgKCFyZXMuZGF0YS5oYXNfbmV4dCkge1xuICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIHRoaXMuZGF0YS5sb2FkaW5nID0gZmFsc2VcbiAgfVxufVxuIl19