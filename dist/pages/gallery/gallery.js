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
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": {} }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.data = {
      pageName: 'gallery',
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
      toAlbum: function toAlbum(e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '/pages/album/album?id=' + e.currentTarget.dataset.id
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
                this.galleryList = res.data.list;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJvcHRpb25zIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCJ0aGF0Iiwic2V0VGltZW91dCIsImdyb3VwX2lkIiwicmVzIiwic3VjYyIsIiRhcHBseSIsImxpc3QiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQyx1QkFBc0IsU0FBekQsRUFBVixFQUE4RSxZQUFXLEVBQXpGLEUsUUFDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLG1CQUFrQixZQUFuQixFQUFWLEVBQTJDLFlBQVcsRUFBQyxzQkFBcUIsZUFBdEIsRUFBdEQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkM7QUFGVSxLLFFBS1pDLEksR0FBTztBQUNM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R0FBdUIsSUFBdkI7QUFDQSxxQkFBSzJCLE1BQUw7OztBQUVGLHFCQUFLbEMsSUFBTCxDQUFVTSxPQUFWLEdBQW9CLEtBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL0dpQyxlQUFLRSxJOztrQkFBckJqQixPIiwiZmlsZSI6ImdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBqb2luVXMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L2pvaW5VcydcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbGxlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdyb3VwSUQuc3luY1wiOlwiZ3JvdXBJRFwifSxcIm5ld0FsYnVtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBqb2luVXM6IGpvaW5VcyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgcGFnZU5hbWU6ICdnYWxsZXJ5JyxcbiAgICBncm91cElEOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgcGFnZTogMCxcbiAgICBzaG93QXBwbHk6IGZhbHNlLFxuICAgIHNob3dOZXdBbGJ1bTogZmFsc2VcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgIC8vICAgICAgICAgY291bnQ6IDEsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfSxcbiAgICB0b1NldHRpbmcoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BbGJ1bShlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VBcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gZmFsc2VcbiAgICB9LFxuICAgIG5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy5pZFxuICAgIHRoaXMubG9hZEluZm8oKVxuICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmRhdGEubm9Nb3JlTm90ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCB0aGF0ID0gdGhpc1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC5sb2FkR2FsbGVyeWxpc3QoKVxuICAgIH0sIDMwMClcbiAgfVxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIGxvYWRHYWxsZXJ5bGlzdCgpIHtcbiAgICBpZiAodGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmRhdGEubG9hZGluZyA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvZ2FsbGVyeWxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElELFxuICAgICAgICBwYWdlOiB0aGlzLmRhdGEucGFnZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aGlzLmdhbGxlcnlMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy5kYXRhLnBhZ2UgPSB0aGlzLmRhdGEucGFnZSArIDFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gIH1cbn1cbiJdfQ==