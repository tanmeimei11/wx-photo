'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _photoItem = require('./../../components/album/photoItem.js');

var _photoItem2 = _interopRequireDefault(_photoItem);

var _previewPhoto = require('./../../components/album/previewPhoto.js');

var _previewPhoto2 = _interopRequireDefault(_previewPhoto);

var _publishPhoto = require('./../../components/album/publishPhoto.js');

var _publishPhoto2 = _interopRequireDefault(_publishPhoto);

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

var _newAlbum = require('./../../components/gallery/newAlbum.js');

var _newAlbum2 = _interopRequireDefault(_newAlbum);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '相册详情',
      onReachBottomDistance: '100'
      // 组件
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:galleryId.sync": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      galleryId: '1', // 相册id
      galleryTitle: '',
      galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

      photoList: [],
      previewPhotos: [], // 预览照片
      previewPhotosIdx: 0, // 预览照片开始位置

      curCursor: 0,
      isGetList: false,
      isGetListFinish: false,

      isShowNewAlbum: false, // 修改名称弹窗
      newAlbumTitle: '修改相册名称',

      isRefreshIndex: false // 从创建过来的
    }, _this.methods = {
      clearCurPhotos: function clearCurPhotos() {
        this.previewPhotos = [];
        this.previewPhotosIdx = 0;
      },
      changeCurPhotos: function changeCurPhotos(photos, idx) {
        this.previewPhotos = photos;
        this.previewPhotosIdx = idx;
      },
      deletPhoto: function deletPhoto(idx) {
        this.photoList.splice(idx, 1);
        this.$apply();
      },
      publishPhoto: function publishPhoto(obj) {
        this.photoList.splice(0, 0, obj);
        this.$apply();
      },
      openNewAlbum: function openNewAlbum() {
        this.isShowNewAlbum = true;
      },
      closeNewAlbum: function closeNewAlbum() {
        this.isShowNewAlbum = false;
      },
      submitTitle: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return (0, _login.request)({
                    url: '/gg/gallery/add',
                    method: 'POST',
                    data: {
                      id: this.galleryId,
                      galleryName: title
                    }
                  });

                case 3:
                  res = _context.sent;
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);

                  this.toastFail('修改失败');

                case 9:

                  if (res.succ) {
                    this.toastSucc('修改成功');
                    this.changeGalleryTitle(title);
                    this.isShowNewAlbum = false;
                    this.$apply();
                  }

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 6]]);
        }));

        function submitTitle(_x) {
          return _ref2.apply(this, arguments);
        }

        return submitTitle;
      }()
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 配置

  // data


  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                this.loadingIn('加载中');
                this.initOptions(options);
                _context2.next = 5;
                return (0, _login.wxCheckLogin)();

              case 5:
                _context2.next = 7;
                return this.getGalleryAuth();

              case 7:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);

                this.loadingOut();
                wx.showToast({
                  title: '加载失败',
                  icon: 'loading'
                });

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
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
        title: this.galleryTitle,
        path: '/page/album/album?id=' + this.galleryId + '&title=' + this.galleryTitle
      };
    }
    // 修改标题

  }, {
    key: 'changeGalleryTitle',
    value: function changeGalleryTitle(text) {
      this.galleryTitle = text || '相册详情';
      _wepy2.default.setNavigationBarTitle({
        title: this.galleryTitle
      });
    }
    // 初始化配置

  }, {
    key: 'initOptions',
    value: function initOptions(options) {
      this.galleryId = options.id || '1';
    }
    // 相册权限

  }, {
    key: 'getGalleryAuth',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _login.request)({
                  url: '/gg/gallery/info',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                res = _context3.sent;

                if (res && res.data) {
                  this.galleryAuth = 10;
                  if (!res.data.can_modify_info) {
                    this.galleryAuth = 2;
                  }
                  if (!res.data.can_publish) {
                    this.galleryAuth = 1;
                  }
                  if (!res.data.can_view_photo) {
                    this.galleryAuth = 0;
                  }

                  this.loadingOut();
                  this.$apply();
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getGalleryAuth() {
        return _ref4.apply(this, arguments);
      }

      return getGalleryAuth;
    }()
    // 照片列表

  }, {
    key: 'getList',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.isGetList || this.isGetListFinish)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                this.isGetList = true;
                _context4.next = 5;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: this.galleryId,
                    cursor: 0
                  }
                });

              case 5:
                res = _context4.sent;

                if (res && res.data) {
                  this.changeGalleryTitle(res.data.gallery_name);
                  this.photoList.push.apply(this.photoList, res.data.list);
                  this.curCursor = res.data.cursor;
                  this.loadingOut();
                  this.isGetList = false;
                  this.isGetListFinish = res.data.has_next;
                  this.$apply();
                }

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getList() {
        return _ref5.apply(this, arguments);
      }

      return getList;
    }()
    // 下啦加载

  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getList();

              case 2:
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
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0dldExpc3RGaW5pc2giLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJvcGVuTmV3QWxidW0iLCJjbG9zZU5ld0FsYnVtIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsInVybCIsIm1ldGhvZCIsImlkIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwiZXZlbnRzIiwib3B0aW9ucyIsImxvYWRpbmdJbiIsImluaXRPcHRpb25zIiwiZ2V0R2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJjdXJzb3IiLCJnYWxsZXJ5X25hbWUiLCJwdXNoIiwiYXBwbHkiLCJsaXN0Iiwi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QUFMO0FBQ0EsdUJBQUtyQixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7Ozs7Ozs7c0JBRU0sS0FBS1osU0FBTCxJQUFrQixLQUFLQyxlOzs7Ozs7OztBQUczQixxQkFBS0QsU0FBTCxHQUFpQixJQUFqQjs7dUJBQ2dCLG9CQUFRO0FBQ3RCa0IsdUJBQUssdUJBRGlCO0FBRXRCMUIsd0JBQU07QUFDSmdELGdDQUFZLEtBQUsvQyxTQURiO0FBRUptRCw0QkFBUTtBQUZKO0FBRmdCLGlCQUFSLEM7OztBQUFadEIsbUI7O0FBT0osb0JBQUlBLE9BQU9BLElBQUk5QixJQUFmLEVBQXFCO0FBQ25CLHVCQUFLa0Msa0JBQUwsQ0FBd0JKLElBQUk5QixJQUFKLENBQVNxRCxZQUFqQztBQUNBLHVCQUFLakQsU0FBTCxDQUFla0QsSUFBZixDQUFvQkMsS0FBcEIsQ0FBMEIsS0FBS25ELFNBQS9CLEVBQTBDMEIsSUFBSTlCLElBQUosQ0FBU3dELElBQW5EO0FBQ0EsdUJBQUtqRCxTQUFMLEdBQWlCdUIsSUFBSTlCLElBQUosQ0FBU29ELE1BQTFCO0FBQ0EsdUJBQUtYLFVBQUw7QUFDQSx1QkFBS2pDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsZUFBTCxHQUF1QnFCLElBQUk5QixJQUFKLENBQVN5RCxRQUFoQztBQUNBLHVCQUFLckMsTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUg7Ozs7OzRGQUNvQnNDLEM7Ozs7Ozt1QkFDWixLQUFLbEIsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdkt5QixlQUFLbUIsSTs7a0JBQW5CeEUsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgcHVibGlzaFBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcblxuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwaG90b3Muc3luY1wiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOnBob3RvSWR4LnN5bmNcIjpcInByZXZpZXdQaG90b3NJZHhcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIn0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LW9uOmNsZWFyQ3VyUGhvdG9zXCI6XCJjbGVhckN1clBob3Rvc1wifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246cHVibGlzaFBob3RvXCI6XCJwdWJsaXNoUGhvdG9cIixcInYtb246b3Blbk5ld0FsYnVtXCI6XCJvcGVuTmV3QWxidW1cIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IHB1Ymxpc2hQaG90byxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0ge1xuICAgIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICAgIGdhbGxlcnlUaXRsZTogJycsXG4gICAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkCAzIOS4jeiDveS/ruaUueWQjeensFxuXG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgICBpc0dldExpc3RGaW5pc2g6IGZhbHNlLFxuXG4gICAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgICBuZXdBbGJ1bVRpdGxlOiAn5L+u5pS555u45YaM5ZCN56ewJyxcblxuICAgIGlzUmVmcmVzaEluZGV4OiBmYWxzZSAvLyDku47liJvlu7rov4fmnaXnmoRcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2FkZCcsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGUsXG4gICAgICBwYXRoOiBgL3BhZ2UvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH0mdGl0bGU9JHt0aGlzLmdhbGxlcnlUaXRsZX1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gIH1cbiAgLy8g55u45YaM5p2D6ZmQXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBpZiAodGhpcy5pc0dldExpc3QgfHwgdGhpcy5pc0dldExpc3RGaW5pc2gpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZShyZXMuZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgICB0aGlzLnBob3RvTGlzdC5wdXNoLmFwcGx5KHRoaXMucGhvdG9MaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzR2V0TGlzdEZpbmlzaCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=