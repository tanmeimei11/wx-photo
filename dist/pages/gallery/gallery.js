'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _shareConnectMixin = require('./../../mixins/shareConnectMixin.js');

var _shareConnectMixin2 = _interopRequireDefault(_shareConnectMixin);

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
  groupName: '',
  currentCursor: 0,
  shareCallBackUrl: '/gg/gallery/join'
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
      navigationBarTitleText: '群友共享相册',
      onReachBottomDistance: '100'
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle" } }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default, _shareConnectMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
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
                    this.init();
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
                this.setShare();
                this.groupID = options.id;
                _context2.prev = 3;
                _context2.next = 6;
                return (0, _login.wxLogin)();

              case 6:
                this.loadingIn('加载中');
                _context2.next = 9;
                return this.getShareFromOther(true, this.shareCallBackUrl);

              case 9:
                _context2.next = 11;
                return this.init();

              case 11:
                this.loadingOut();
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](3);

                this.loadingOut();
                this.toastFail('加载失败');

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 14]]);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'setShare',
    value: function setShare() {
      wx.showShareMenu({
        withShareTicket: true // 要求小程序返回分享目标信息
      });
    }
    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '邀请你查看本群相册',
        path: '/pages/gallery/gallery?id=' + this.groupID,
        success: this.shareCallBack(_extends({}, res, {
          shareCallBackUrl: this.shareCallBackUrl
        }))
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
                this.currentCursor = 0;
                this.noMoreNote = false;
                this.galleryList = [];
                this.$apply();
                this.loadInfo();
                _context3.next = 7;
                return this.loadGallerylist();

              case 7:
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
                if (!this.noMoreNote) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                _context5.next = 4;
                return this.loadGallerylist();

              case 4:
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
                _context6.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    cursor: this.currentCursor
                  }
                });

              case 2:
                res = _context6.sent;

                if (res.succ && res.data) {
                  console.log(res);
                  this.galleryList = this.galleryList.concat(res.data.list);
                  this.currentCursor = res.data.cursor;
                  this.$apply();
                  if (!res.data.has_next) {
                    this.noMoreNote = true;
                    this.$apply();
                  }
                } else {
                  this.noMoreNote = true;
                  this.$apply();
                }

              case 4:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImN1cnJlbnRDdXJzb3IiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwidG9TZXR0aW5nIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9BbGJ1bSIsImUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInRvQXBwbHkiLCJjbG9zZUFwcGx5IiwiY2xvc2VOZXdBbGJ1bSIsInN1Ym1pdFRpdGxlIiwibWV0aG9kIiwiZ3JvdXBJZCIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsInRvYXN0U3VjYyIsImluaXQiLCIkYXBwbHkiLCJvcHRpb25zIiwic2V0U2hhcmUiLCJsb2FkaW5nSW4iLCJnZXRTaGFyZUZyb21PdGhlciIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwicGF0aCIsInN1Y2Nlc3MiLCJzaGFyZUNhbGxCYWNrIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCJncm91cF9pZCIsIm9wZW5fZ2lkIiwiY3Vyc29yIiwiY29uY2F0IiwibGlzdCIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7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Q0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBRWlCK0IsQzs7Ozs7cUJBQ2QsS0FBSzVCLFU7Ozs7Ozs7Ozt1QkFHSCxLQUFLMEQsZUFBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFHVSxvQkFBUTtBQUN0QmhDLHVCQUFLLHVCQURpQjtBQUV0QlAsd0JBQU07QUFDSndDLDhCQUFVLEtBQUtoRSxPQURYO0FBRUprRSw0QkFBUSxLQUFLdkQ7QUFGVDtBQUZnQixpQkFBUixDOzs7QUFBWm1DLG1COztBQU9KLG9CQUFJQSxJQUFJQyxJQUFKLElBQVlELElBQUl0QixJQUFwQixFQUEwQjtBQUN4QlUsMEJBQVFDLEdBQVIsQ0FBWVcsR0FBWjtBQUNBLHVCQUFLM0MsV0FBTCxHQUFtQixLQUFLQSxXQUFMLENBQWlCZ0UsTUFBakIsQ0FBd0JyQixJQUFJdEIsSUFBSixDQUFTNEMsSUFBakMsQ0FBbkI7QUFDQSx1QkFBS3pELGFBQUwsR0FBcUJtQyxJQUFJdEIsSUFBSixDQUFTMEMsTUFBOUI7QUFDQSx1QkFBS2hCLE1BQUw7QUFDQSxzQkFBSSxDQUFDSixJQUFJdEIsSUFBSixDQUFTNkMsUUFBZCxFQUF3QjtBQUN0Qix5QkFBS2hFLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSx5QkFBSzZDLE1BQUw7QUFDRDtBQUNGLGlCQVRELE1BU087QUFDTCx1QkFBSzdDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSx1QkFBSzZDLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTlJZ0MsZUFBSzVDLEk7O2tCQUFyQk8sTyIsImZpbGUiOiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBzaGFyZUNvbm5lY3RNaXhpbiBmcm9tICdAL21peGlucy9zaGFyZUNvbm5lY3RNaXhpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2dhbGxlcnknLFxuICBncm91cElEOiAnJyxcbiAgdGl0bGU6ICcnLFxuICBncm91cEluZm86IHt9LFxuICBnYWxsZXJ5TGlzdDogW10sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBub01vcmVOb3RlOiBmYWxzZSxcbiAgcGFnZTogMCxcbiAgc2hvd0FwcGx5OiBmYWxzZSxcbiAgc2hvd05ld0FsYnVtOiBmYWxzZSxcbiAgb3BlbkdJZDogJycsXG4gIGdyb3VwTmFtZTogJycsXG4gIGN1cnJlbnRDdXJzb3I6IDAsXG4gIHNoYXJlQ2FsbEJhY2tVcmw6ICcvZ2cvZ2FsbGVyeS9qb2luJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTlj4vlhbHkuqvnm7jlhownLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdyb3VwSUQuc3luY1wiOlwiZ3JvdXBJRFwifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluLCBzaGFyZUNvbm5lY3RNaXhpbl1cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgIC8vICAgICAgICAgY291bnQ6IDEsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfSxcbiAgICB0b1NldHRpbmcoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BbGJ1bShlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VBcHBseSgpIHtcbiAgICAgIHRoaXMuc2hvd0FwcGx5ID0gZmFsc2VcbiAgICB9LFxuICAgIG5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvYWRkJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5paw5bu65oiQ5YqfJylcbiAgICAgICAgdGhpcy5zaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLnNldFNoYXJlKClcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUsIHRoaXMuc2hhcmVDYWxsQmFja1VybClcbiAgICAgIGF3YWl0IHRoaXMuaW5pdCgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgc2V0U2hhcmUoKSB7XG4gICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXG4gICAgfSlcbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn6YKA6K+35L2g5p+l55yL5pys576k55u45YaMJyxcbiAgICAgIHBhdGg6IGAvcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5P2lkPSR7dGhpcy5ncm91cElEfWAsXG4gICAgICBzdWNjZXNzOiB0aGlzLnNoYXJlQ2FsbEJhY2soeyAuLi5yZXMsXG4gICAgICAgIHNoYXJlQ2FsbEJhY2tVcmw6IHRoaXMuc2hhcmVDYWxsQmFja1VybFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRDdXJzb3IgPSAwXG4gICAgdGhpcy5ub01vcmVOb3RlID0gZmFsc2VcbiAgICB0aGlzLmdhbGxlcnlMaXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLm9wZW5HSWQgPSByZXMuZGF0YS5vcGVuX2dpZFxuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGlmICh0aGlzLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9nYWxsZXJ5bGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJyZW50Q3Vyc29yXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSB0aGlzLmdhbGxlcnlMaXN0LmNvbmNhdChyZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJyZW50Q3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=