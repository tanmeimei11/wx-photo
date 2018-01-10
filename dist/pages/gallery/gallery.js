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
  groupName: '',
  currentCursor: 0
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
        title: '邀请你查看本群相册',
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
                    cursor: this.currentCursor
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
                this.currentCursor = this.cursor;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImN1cnJlbnRDdXJzb3IiLCJnYWxsZXJ5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImpvaW5VcyIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0FsYnVtIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwidG9BcHBseSIsImNsb3NlQXBwbHkiLCJjbG9zZU5ld0FsYnVtIiwic3VibWl0VGl0bGUiLCJtZXRob2QiLCJncm91cElkIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJzdWNjIiwidG9hc3RTdWNjIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCIkYXBwbHkiLCJvcHRpb25zIiwibG9hZGluZ0luIiwiaW5pdCIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJwYXRoIiwiZ3JvdXBfaWQiLCJvcGVuX2dpZCIsImN1cnNvciIsImNvbmNhdCIsImxpc3QiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsU0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsU0FBTyxFQUhNO0FBSWJDLGFBQVcs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LEdBQXFCLEtBQUtnRCxNQUExQjtBQUNBLHFCQUFLVCxNQUFMOztvQkFDS0wsSUFBSXRCLElBQUosQ0FBU3VDLFE7Ozs7O0FBQ1oscUJBQUt6RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUs2QyxNQUFMOzs7Ozs7OztBQUlGLHFCQUFLN0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLNkMsTUFBTDs7O0FBRUYscUJBQUs5QyxPQUFMLEdBQWUsS0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZJaUMsZUFBS0UsSTs7a0JBQXJCTSxPIiwiZmlsZSI6ImdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBqb2luVXMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L2pvaW5VcydcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnZ2FsbGVyeScsXG4gIGdyb3VwSUQ6ICcnLFxuICB0aXRsZTogJycsXG4gIGdyb3VwSW5mbzoge30sXG4gIGdhbGxlcnlMaXN0OiBbXSxcbiAgbG9hZGluZzogZmFsc2UsXG4gIG5vTW9yZU5vdGU6IGZhbHNlLFxuICBwYWdlOiAwLFxuICBzaG93QXBwbHk6IGZhbHNlLFxuICBzaG93TmV3QWxidW06IGZhbHNlLFxuICBvcGVuR0lkOiAnJyxcbiAgZ3JvdXBOYW1lOiAnJyxcbiAgY3VycmVudEN1cnNvcjogMFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdyb3VwSUQuc3luY1wiOlwiZ3JvdXBJRFwifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluXVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUFwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSBmYWxzZVxuICAgIH0sXG4gICAgbmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9hZGQnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfmlrDlu7rmiJDlip8nKVxuICAgICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMubG9hZEluZm8oKVxuICAgICAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuaW5pdCgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+mCgOivt+S9oOafpeeci+acrOe+pOebuOWGjCcsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgfVxuICB9XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLm9wZW5HSWQgPSByZXMuZGF0YS5vcGVuX2dpZFxuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGlmICh0aGlzLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1cnJlbnRDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHRoaXMuZ2FsbGVyeUxpc3QuY29uY2F0KHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1cnJlbnRDdXJzb3IgPSB0aGlzLmN1cnNvclxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgaWYgKCFyZXMuZGF0YS5oYXNfbmV4dCkge1xuICAgICAgICB0aGlzLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgfVxufVxuIl19