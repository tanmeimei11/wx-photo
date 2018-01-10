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
                this.groupID = options.id;
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _login.wxLogin)();

              case 5:
                this.loadingIn('加载中');
                _context2.next = 8;
                return this.getShareFromOther(true, this.shareCallBackUrl);

              case 8:
                _context2.next = 10;
                return this.init();

              case 10:
                this.loadingOut();
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 13]]);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImN1cnJlbnRDdXJzb3IiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwidG9TZXR0aW5nIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9BbGJ1bSIsImUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInRvQXBwbHkiLCJjbG9zZUFwcGx5IiwiY2xvc2VOZXdBbGJ1bSIsInN1Ym1pdFRpdGxlIiwibWV0aG9kIiwiZ3JvdXBJZCIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsInRvYXN0U3VjYyIsImluaXQiLCIkYXBwbHkiLCJvcHRpb25zIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJsb2FkaW5nT3V0IiwidG9hc3RGYWlsIiwicGF0aCIsInN1Y2Nlc3MiLCJzaGFyZUNhbGxCYWNrIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCJncm91cF9pZCIsIm9wZW5fZ2lkIiwiY3Vyc29yIiwiY29uY2F0IiwibGlzdCIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7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O0FBRXRCUCx3QkFBTTtBQUNKcUMsOEJBQVUsS0FBSzdELE9BRFg7QUFFSitELDRCQUFRLEtBQUtwRDtBQUZUO0FBRmdCLGlCQUFSLEM7OztBQUFabUMsbUI7O0FBT0osb0JBQUlBLElBQUlDLElBQUosSUFBWUQsSUFBSXRCLElBQXBCLEVBQTBCO0FBQ3hCVSwwQkFBUUMsR0FBUixDQUFZVyxHQUFaO0FBQ0EsdUJBQUszQyxXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUI2RCxNQUFqQixDQUF3QmxCLElBQUl0QixJQUFKLENBQVN5QyxJQUFqQyxDQUFuQjtBQUNBLHVCQUFLdEQsYUFBTCxHQUFxQm1DLElBQUl0QixJQUFKLENBQVN1QyxNQUE5QjtBQUNBLHVCQUFLYixNQUFMO0FBQ0Esc0JBQUksQ0FBQ0osSUFBSXRCLElBQUosQ0FBUzBDLFFBQWQsRUFBd0I7QUFDdEIseUJBQUs3RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EseUJBQUs2QyxNQUFMO0FBQ0Q7QUFDRixpQkFURCxNQVNPO0FBQ0wsdUJBQUs3QyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsdUJBQUs2QyxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4SWdDLGVBQUs1QyxJOztrQkFBckJPLE8iLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGpvaW5VcyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvam9pblVzJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdnYWxsZXJ5JyxcbiAgZ3JvdXBJRDogJycsXG4gIHRpdGxlOiAnJyxcbiAgZ3JvdXBJbmZvOiB7fSxcbiAgZ2FsbGVyeUxpc3Q6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gIHBhZ2U6IDAsXG4gIHNob3dBcHBseTogZmFsc2UsXG4gIHNob3dOZXdBbGJ1bTogZmFsc2UsXG4gIG9wZW5HSWQ6ICcnLFxuICBncm91cE5hbWU6ICcnLFxuICBjdXJyZW50Q3Vyc29yOiAwLFxuICBzaGFyZUNhbGxCYWNrVXJsOiAnL2dnL2dhbGxlcnkvam9pbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FsbGVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5Y+L5YWx5Lqr55u45YaMJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvaW5Vc1wiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpncm91cElELnN5bmNcIjpcImdyb3VwSURcIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcImpvaW5Vc1wiOntcInYtb246Y2xvc2VBcHBseVwiOlwiY2xvc2VBcHBseVwifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGpvaW5Vczogam9pblVzLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICAvLyBjaGFuZ2VCZyAoKSB7XG4gICAgLy8gICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAvLyAgICAgICAgIGNvdW50OiAxLFxuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH0sXG4gICAgdG9TZXR0aW5nKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9zZXR0aW5nL3NldHRpbmc/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQWxidW0oZSkge1xuICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2FsYnVtL2FsYnVtP2lkPSR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2FkZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElELFxuICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+aWsOW7uuaIkOWKnycpXG4gICAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRTaGFyZUZyb21PdGhlcih0cnVlLCB0aGlzLnNoYXJlQ2FsbEJhY2tVcmwpXG4gICAgICBhd2FpdCB0aGlzLmluaXQoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfpgoDor7fkvaDmn6XnnIvmnKznvqTnm7jlhownLFxuICAgICAgcGF0aDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSUR9YCxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuc2hhcmVDYWxsQmFjayh7IC4uLnJlcyxcbiAgICAgICAgc2hhcmVDYWxsQmFja1VybDogdGhpcy5zaGFyZUNhbGxCYWNrVXJsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBhc3luYyBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudEN1cnNvciA9IDBcbiAgICB0aGlzLm5vTW9yZU5vdGUgPSBmYWxzZVxuICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgICBhd2FpdCB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMub3BlbkdJZCA9IHJlcy5kYXRhLm9wZW5fZ2lkXG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwSW5mbylcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgaWYgKHRoaXMubm9Nb3JlTm90ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGF3YWl0IHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgfVxuICBhc3luYyBsb2FkR2FsbGVyeWxpc3QoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1cnJlbnRDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHRoaXMuZ2FsbGVyeUxpc3QuY29uY2F0KHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1cnJlbnRDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgdGhpcy5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==