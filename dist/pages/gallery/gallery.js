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
  shareCallBackUrl: '/gg/group/join'
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
                this.setShare();
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
        path: '/pages/gallery/gallery?id=' + this.groupID
        // success: this.shareCallBack({ ...res,
        //   shareCallBackUrl: this.shareCallBackUrl
        // })
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImN1cnJlbnRDdXJzb3IiLCJzaGFyZUNhbGxCYWNrVXJsIiwiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwidG9TZXR0aW5nIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9BbGJ1bSIsImUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInRvQXBwbHkiLCJjbG9zZUFwcGx5IiwiY2xvc2VOZXdBbGJ1bSIsInN1Ym1pdFRpdGxlIiwibWV0aG9kIiwiZ3JvdXBJZCIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsInRvYXN0U3VjYyIsImluaXQiLCIkYXBwbHkiLCJvcHRpb25zIiwic2V0U2hhcmUiLCJsb2FkaW5nSW4iLCJnZXRTaGFyZUZyb21PdGhlciIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwicGF0aCIsImxvYWRJbmZvIiwibG9hZEdhbGxlcnlsaXN0IiwiZ3JvdXBfaWQiLCJvcGVuX2dpZCIsImN1cnNvciIsImNvbmNhdCIsImxpc3QiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBR1Usb0JBQVE7QUFDdEI5Qix1QkFBSyx1QkFEaUI7QUFFdEJQLHdCQUFNO0FBQ0pzQyw4QkFBVSxLQUFLOUQsT0FEWDtBQUVKZ0UsNEJBQVEsS0FBS3JEO0FBRlQ7QUFGZ0IsaUJBQVIsQzs7O0FBQVptQyxtQjs7QUFPSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdEIsSUFBcEIsRUFBMEI7QUFDeEJVLDBCQUFRQyxHQUFSLENBQVlXLEdBQVo7QUFDQSx1QkFBSzNDLFdBQUwsR0FBbUIsS0FBS0EsV0FBTCxDQUFpQjhELE1BQWpCLENBQXdCbkIsSUFBSXRCLElBQUosQ0FBUzBDLElBQWpDLENBQW5CO0FBQ0EsdUJBQUt2RCxhQUFMLEdBQXFCbUMsSUFBSXRCLElBQUosQ0FBU3dDLE1BQTlCO0FBQ0EsdUJBQUtkLE1BQUw7QUFDQSxzQkFBSSxDQUFDSixJQUFJdEIsSUFBSixDQUFTMkMsUUFBZCxFQUF3QjtBQUN0Qix5QkFBSzlELFVBQUwsR0FBa0IsSUFBbEI7QUFDQSx5QkFBSzZDLE1BQUw7QUFDRDtBQUNGLGlCQVRELE1BU087QUFDTCx1QkFBSzdDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSx1QkFBSzZDLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTlJZ0MsZUFBSzVDLEk7O2tCQUFyQk8sTyIsImZpbGUiOiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBzaGFyZUNvbm5lY3RNaXhpbiBmcm9tICdAL21peGlucy9zaGFyZUNvbm5lY3RNaXhpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2dhbGxlcnknLFxuICBncm91cElEOiAnJyxcbiAgdGl0bGU6ICcnLFxuICBncm91cEluZm86IHt9LFxuICBnYWxsZXJ5TGlzdDogW10sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBub01vcmVOb3RlOiBmYWxzZSxcbiAgcGFnZTogMCxcbiAgc2hvd0FwcGx5OiBmYWxzZSxcbiAgc2hvd05ld0FsYnVtOiBmYWxzZSxcbiAgb3BlbkdJZDogJycsXG4gIGdyb3VwTmFtZTogJycsXG4gIGN1cnJlbnRDdXJzb3I6IDAsXG4gIHNoYXJlQ2FsbEJhY2tVcmw6ICcvZ2cvZ3JvdXAvam9pbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FsbGVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn576k5Y+L5YWx5Lqr55u45YaMJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvaW5Vc1wiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpncm91cElELnN5bmNcIjpcImdyb3VwSURcIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcImpvaW5Vc1wiOntcInYtb246Y2xvc2VBcHBseVwiOlwiY2xvc2VBcHBseVwifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGpvaW5Vczogam9pblVzLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIG1peGlucyA9IFtmb3JtU3VibWl0TWl4aW4sIExvYWRpbmdNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICAvLyBjaGFuZ2VCZyAoKSB7XG4gICAgLy8gICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAvLyAgICAgICAgIGNvdW50OiAxLFxuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH0sXG4gICAgdG9TZXR0aW5nKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9zZXR0aW5nL3NldHRpbmc/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQWxidW0oZSkge1xuICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2FsYnVtL2FsYnVtP2lkPSR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2FkZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElELFxuICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+aWsOW7uuaIkOWKnycpXG4gICAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMuc2V0U2hhcmUoKVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRTaGFyZUZyb21PdGhlcih0cnVlLCB0aGlzLnNoYXJlQ2FsbEJhY2tVcmwpXG4gICAgICBhd2FpdCB0aGlzLmluaXQoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+mCgOivt+S9oOafpeeci+acrOe+pOebuOWGjCcsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICAvLyBzdWNjZXNzOiB0aGlzLnNoYXJlQ2FsbEJhY2soeyAuLi5yZXMsXG4gICAgICAvLyAgIHNoYXJlQ2FsbEJhY2tVcmw6IHRoaXMuc2hhcmVDYWxsQmFja1VybFxuICAgICAgLy8gfSlcbiAgICB9XG4gIH1cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRDdXJzb3IgPSAwXG4gICAgdGhpcy5ub01vcmVOb3RlID0gZmFsc2VcbiAgICB0aGlzLmdhbGxlcnlMaXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLm9wZW5HSWQgPSByZXMuZGF0YS5vcGVuX2dpZFxuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGlmICh0aGlzLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9nYWxsZXJ5bGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJyZW50Q3Vyc29yXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSB0aGlzLmdhbGxlcnlMaXN0LmNvbmNhdChyZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJyZW50Q3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=