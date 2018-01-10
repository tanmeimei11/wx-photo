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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImdhbGxlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9pblVzIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJzdWJtaXRUaXRsZSIsIm1ldGhvZCIsImdyb3VwSWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsIiRhcHBseSIsIm9wdGlvbnMiLCJsb2FkaW5nSW4iLCJpbml0IiwibG9hZGluZ091dCIsInRvYXN0RmFpbCIsInBhdGgiLCJncm91cF9pZCIsIm9wZW5fZ2lkIiwiY29uY2F0IiwibGlzdCIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFdBQVc7QUFDYkMsWUFBVSxTQURHO0FBRWJDLFdBQVMsRUFGSTtBQUdiQyxTQUFPLEVBSE07QUFJYkMsYUFBVyxFQUpFO0FBS2JDLGVBQWEsRUFMQTtBQU1i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OztvQkFDS0wsSUFBSXRCLElBQUosQ0FBU3NDLFE7Ozs7O0FBQ1oscUJBQUt2RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUs0QyxNQUFMOzs7Ozs7OztBQUlGLHFCQUFLNUMsVUFBTCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLNEMsTUFBTDs7O0FBRUYscUJBQUs3QyxPQUFMLEdBQWUsS0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZJaUMsZUFBS0UsSTs7a0JBQXJCSyxPIiwiZmlsZSI6ImdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcbmltcG9ydCBqb2luVXMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L2pvaW5VcydcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnZ2FsbGVyeScsXG4gIGdyb3VwSUQ6ICcnLFxuICB0aXRsZTogJycsXG4gIGdyb3VwSW5mbzoge30sXG4gIGdhbGxlcnlMaXN0OiBbXSxcbiAgbG9hZGluZzogZmFsc2UsXG4gIG5vTW9yZU5vdGU6IGZhbHNlLFxuICBwYWdlOiAwLFxuICBzaG93QXBwbHk6IGZhbHNlLFxuICBzaG93TmV3QWxidW06IGZhbHNlLFxuICBvcGVuR0lkOiAnJyxcbiAgZ3JvdXBOYW1lOiAnJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdyb3VwSUQuc3luY1wiOlwiZ3JvdXBJRFwifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbiwgTG9hZGluZ01peGluXVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUFwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSBmYWxzZVxuICAgIH0sXG4gICAgbmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9hZGQnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdyb3VwSWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfmlrDlu7rmiJDlip8nKVxuICAgICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMubG9hZEluZm8oKVxuICAgICAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuZ3JvdXBJRCA9IG9wdGlvbnMuaWRcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuaW5pdCgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+mCgOivt+S9oOafpeeci+acrOe+pOebuOWGjCcsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgfVxuICB9XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLm9wZW5HSWQgPSByZXMuZGF0YS5vcGVuX2dpZFxuICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGlmICh0aGlzLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSB0aGlzLmdhbGxlcnlMaXN0LmNvbmNhdChyZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5wYWdlID0gdGhpcy5wYWdlICsgMVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgaWYgKCFyZXMuZGF0YS5oYXNfbmV4dCkge1xuICAgICAgICB0aGlzLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgfVxufVxuIl19