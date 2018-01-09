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

var _formSubmitMixin = require('./../../mixins/formSubmitMixin.js');

var _formSubmitMixin2 = _interopRequireDefault(_formSubmitMixin);

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:galleryId.sync": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default], _this.data = {
      groupId: '',
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

      isRefreshIndex: false, // 从创建过来的
      isSubmitFormId: true // 允许提交formid
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
                    url: '/gg/gallery/updatename',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
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
        path: '/page/album/album?id=' + this.galleryId
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
                  this.groupId = res.data.group_id || '';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsImdyb3VwSWQiLCJnYWxsZXJ5SWQiLCJnYWxsZXJ5VGl0bGUiLCJnYWxsZXJ5QXV0aCIsInBob3RvTGlzdCIsInByZXZpZXdQaG90b3MiLCJwcmV2aWV3UGhvdG9zSWR4IiwiY3VyQ3Vyc29yIiwiaXNHZXRMaXN0IiwiaXNHZXRMaXN0RmluaXNoIiwiaXNTaG93TmV3QWxidW0iLCJuZXdBbGJ1bVRpdGxlIiwiaXNSZWZyZXNoSW5kZXgiLCJpc1N1Ym1pdEZvcm1JZCIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJvcGVuTmV3QWxidW0iLCJjbG9zZU5ld0FsYnVtIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImlkIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwiZXZlbnRzIiwib3B0aW9ucyIsImxvYWRpbmdJbiIsImluaXRPcHRpb25zIiwiZ2V0R2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJjdXJzb3IiLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pZCIsInB1c2giLCJhcHBseSIsImxpc3QiLCJoYXNfbmV4dCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFLcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUVuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUI7QUFFekI7QUFKUyxLLFFBS1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxnQkFBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxXQUFwQyxFQUFnRCxRQUFPLE1BQXZELEVBQThELFNBQVEsT0FBdEUsRUFBOEUsT0FBTSxPQUFwRixFQUFuSCxFQUFnTiwwQkFBeUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxPQUF4QixFQUFnQyxPQUFNLFdBQXRDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLE9BQXRGLEVBQXpPLEVBQXdVLGNBQWEsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQXJWLEVBQWIsRUFBOGEsZ0JBQWUsRUFBQyxzQkFBcUIsZUFBdEIsRUFBc0Msd0JBQXVCLGtCQUE3RCxFQUE3YixFQUE4Z0IsZ0JBQWUsRUFBQywyQkFBMEIsYUFBM0IsRUFBeUMsdUJBQXNCLFNBQS9ELEVBQXlFLHlCQUF3QixXQUFqRyxFQUE2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RSxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LWJpbmQ6cGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIixcInYtYmluZDpwaG90b0lkeC5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zSWR4XCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1iaW5kOmdhbGxlcnlBdXRoLnN5bmNcIjpcImdhbGxlcnlBdXRoXCIsXCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6Z2FsbGVyeUlkLnN5bmNcIjpcImdhbGxlcnlJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG8sXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0ge1xuICAgIGdyb3VwSWQ6ICcnLFxuICAgIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICAgIGdhbGxlcnlUaXRsZTogJycsXG4gICAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkCAzIOS4jeiDveS/ruaUueWQjeensFxuXG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgICBpc0dldExpc3RGaW5pc2g6IGZhbHNlLFxuXG4gICAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgICBuZXdBbGJ1bVRpdGxlOiAn5L+u5pS555u45YaM5ZCN56ewJyxcblxuICAgIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG4gICAgaXNTdWJtaXRGb3JtSWQ6IHRydWUgLy8g5YWB6K645o+Q5LqkZm9ybWlkXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGUsXG4gICAgICBwYXRoOiBgL3BhZ2UvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gIH1cbiAgLy8g55u45YaM5p2D6ZmQXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBpZiAodGhpcy5pc0dldExpc3QgfHwgdGhpcy5pc0dldExpc3RGaW5pc2gpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZShyZXMuZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgICB0aGlzLmdyb3VwSWQgPSByZXMuZGF0YS5ncm91cF9pZCB8fCAnJ1xuICAgICAgdGhpcy5waG90b0xpc3QucHVzaC5hcHBseSh0aGlzLnBob3RvTGlzdCwgcmVzLmRhdGEubGlzdClcbiAgICAgIHRoaXMuY3VyQ3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0dldExpc3RGaW5pc2ggPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19