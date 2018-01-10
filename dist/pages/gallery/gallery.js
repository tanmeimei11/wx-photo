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

var _formSubmitMixin = require('./../../mixins/formSubmitMixin.js');

var _formSubmitMixin2 = _interopRequireDefault(_formSubmitMixin);

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  pageName: 'gallery',
  groupID: '',
  title: '',
  groupInfo: {},
  galleryList: [],
  loading: false,
  noMoreNote: false,
  page: 0,
  showApply: false,
  showNewAlbum: false,
  openGId: '',
  groupName: ''
};

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
      navigationBarTitleText: '群活动相册',
      onReachBottomDistance: '100'
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle" } }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
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
      },
      submitTitle: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _login.request)({
                    url: '/gg/gallery/add',
                    method: 'POST',
                    data: {
                      groupId: this.groupID,
                      galleryName: title
                    }
                  });

                case 2:
                  res = _context.sent;


                  if (res.succ) {
                    this.toastSucc('新建成功');
                    this.showNewAlbum = false;
                    this.loadInfo();
                    this.loadGallerylist();
                    this.$apply();
                  }

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function submitTitle(_x) {
          return _ref2.apply(this, arguments);
        }

        return submitTitle;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(gallery, [{
    key: 'onLoad',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Object.assign(this, pageData);
                this.groupID = options.id;
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _login.wxLogin)();

              case 5:
                this.loadingIn('加载中');
                _context2.next = 8;
                return this.init();

              case 8:
                this.loadingOut();
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 11]]);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: this.groupInfo.name,
        path: '/pages/gallery/gallery?id=' + this.groupID
      };
    }
  }, {
    key: 'init',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loadInfo();
                _context3.next = 3;
                return this.loadGallerylist();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init() {
        return _ref4.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/info',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context4.sent;

                if (res.succ && res.data) {
                  this.openGId = res.data.open_gid;
                  this.groupInfo = res.data;
                  this.$apply();
                  console.log(this.groupInfo);
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadInfo() {
        return _ref5.apply(this, arguments);
      }

      return loadInfo;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('===========');

                if (!this.noMoreNote) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt('return');

              case 3:
                _context5.next = 5;
                return this.loadGallerylist();

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onReachBottom(_x3) {
        return _ref6.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: 'loadGallerylist',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.loading) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:
                this.loading = true;
                _context6.next = 5;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    page: this.page
                  }
                });

              case 5:
                res = _context6.sent;

                if (!(res.succ && res.data)) {
                  _context6.next = 17;
                  break;
                }

                console.log(res);
                this.galleryList = this.galleryList.concat(res.data.list);
                this.page = this.page + 1;
                this.$apply();

                if (res.data.has_next) {
                  _context6.next = 15;
                  break;
                }

                this.noMoreNote = true;
                this.$apply();
                return _context6.abrupt('return');

              case 15:
                _context6.next = 19;
                break;

              case 17:
                this.noMoreNote = true;
                this.$apply();

              case 19:
                this.loading = false;

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadGallerylist() {
        return _ref7.apply(this, arguments);
      }

      return loadGallerylist;
    }()
  }]);

  return gallery;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/gallery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImdhbGxlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9pblVzIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJzdWJtaXRUaXRsZSIsIm1ldGhvZCIsImdyb3VwSWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsIiRhcHBseSIsIm9wdGlvbnMiLCJsb2FkaW5nSW4iLCJpbml0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsIm5hbWUiLCJwYXRoIiwiZ3JvdXBfaWQiLCJvcGVuX2dpZCIsImNvbmNhdCIsImxpc3QiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsU0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsU0FBTyxFQUhNO0FBSWJDLGFBQVcsRUFKRTtBQUtiQyxlQUFhLEVB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QUFLdEQsSUFBTCxHQUFZLEtBQUtBLElBQUwsR0FBWSxDQUF4QjtBQUNBLHFCQUFLMkMsTUFBTDs7b0JBQ0tMLElBQUl0QixJQUFKLENBQVN1QyxROzs7OztBQUNaLHFCQUFLeEQsVUFBTCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLNEMsTUFBTDs7Ozs7Ozs7QUFJRixxQkFBSzVDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSzRDLE1BQUw7OztBQUVGLHFCQUFLN0MsT0FBTCxHQUFlLEtBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4SWlDLGVBQUtFLEk7O2tCQUFyQkssTyIsImZpbGUiOiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2dhbGxlcnknLFxuICBncm91cElEOiAnJyxcbiAgdGl0bGU6ICcnLFxuICBncm91cEluZm86IHt9LFxuICBnYWxsZXJ5TGlzdDogW10sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBub01vcmVOb3RlOiBmYWxzZSxcbiAgcGFnZTogMCxcbiAgc2hvd0FwcGx5OiBmYWxzZSxcbiAgc2hvd05ld0FsYnVtOiBmYWxzZSxcbiAgb3BlbkdJZDogJycsXG4gIGdyb3VwTmFtZTogJydcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FsbGVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5rS75Yqo55u45YaMJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvaW5Vc1wiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpncm91cElELnN5bmNcIjpcImdyb3VwSURcIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcImpvaW5Vc1wiOntcInYtb246Y2xvc2VBcHBseVwiOlwiY2xvc2VBcHBseVwifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGpvaW5Vczogam9pblVzLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbl1cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgIC8vICAgICAgICAgY291bnQ6IDEsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfSxcbiAgICB0b1NldHRpbmcoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BbGJ1bShlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VBcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gZmFsc2VcbiAgICB9LFxuICAgIG5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvYWRkJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5paw5bu65oiQ5YqfJylcbiAgICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLmxvYWRJbmZvKClcbiAgICAgICAgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmluaXQoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZ3JvdXBJbmZvLm5hbWUsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgfVxuICB9XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLm9wZW5HSWQgPSByZXMuZGF0YS5vcGVuX2dpZFxuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PScpXG4gICAgaWYgKHRoaXMubm9Nb3JlTm90ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGF3YWl0IHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgfVxuICBhc3luYyBsb2FkR2FsbGVyeWxpc3QoKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvZ2FsbGVyeWxpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElELFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHRoaXMuZ2FsbGVyeUxpc3QuY29uY2F0KHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2UgKyAxXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICB9XG59XG4iXX0=