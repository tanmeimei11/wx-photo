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

var _refreshIndexMixin = require('./../../mixins/refreshIndexMixin.js');

var _refreshIndexMixin2 = _interopRequireDefault(_refreshIndexMixin);

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:galleryId.sync": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default], _this.data = {
      pageName: 'album',
      groupId: '',
      galleryId: '1', // 相册id
      galleryTitle: '',
      galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

      photoList: [],
      previewPhotos: [], // 预览照片
      previewPhotosIdx: 0, // 预览照片开始位置

      curCursor: 0,
      isGetList: false,
      isListHasNext: true,

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
      }(),
      photoZanChange: function photoZanChange(idx, zanList) {
        console.log(idx, zanList);
        this.photoList[idx].is_zan = !this.photoList[idx].is_zan;
        this.photoList[idx].zan_list = zanList;
        this.$apply();
      }
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
                console.log(this.galleryAuth);

                if (!(this.galleryAuth !== 0)) {
                  _context2.next = 12;
                  break;
                }

                console.log('1111');
                _context2.next = 12;
                return this.getList();

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](0);

                this.loadingOut();
                wx.showToast({
                  title: '加载失败',
                  icon: 'loading'
                });

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 14]]);
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

                if (!(res && res.data)) {
                  _context3.next = 11;
                  break;
                }

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

                return _context3.abrupt('return', this.galleryAuth);

              case 11:
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
                if (!(this.isGetList || !this.isListHasNext)) {
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
                  this.isListHasNext = res.data.has_next;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsInBhZ2VOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwiaXNTaG93TmV3QWxidW0iLCJuZXdBbGJ1bVRpdGxlIiwiaXNSZWZyZXNoSW5kZXgiLCJpc1N1Ym1pdEZvcm1JZCIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJvcGVuTmV3QWxidW0iLCJjbG9zZU5ld0FsYnVtIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImlkIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiY29uc29sZSIsImxvZyIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImxvYWRpbmdJbiIsImluaXRPcHRpb25zIiwiZ2V0R2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJjdXJzb3IiLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pZCIsInB1c2giLCJhcHBseSIsImxpc3QiLCJoYXNfbmV4dCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUtxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBRW5CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUV6QjtBQUpTLEssUUFLVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLGdCQUEzQixFQUFiLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFoQixFQUEyRix5QkFBd0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLFdBQXBDLEVBQWdELFFBQU8sTUFBdkQsRUFBOEQsU0FBUSxPQUF0RSxFQUE4RSxPQUFNLE9BQXBGLEVBQW5ILEVBQWdOLDBCQUF5QixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE9BQXhCLEVBQWdDLE9BQU0sV0FBdEMsRUFBa0QsUUFBTyxNQUF6RCxFQUFnRSxTQUFRLE9BQXhFLEVBQWdGLE9BQU0sT0FBdEYsRUFBek8sRUFBd1UsY0FBYSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBclYsRUFBYixFQUE4YSxnQkFBZSxFQUFDLHNCQUFxQixlQUF0QixFQUFzQyx3QkFBdUIsa0JBQTdE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QVMrRCxZQUFqQztBQUNBLHVCQUFLN0QsT0FBTCxHQUFlZ0MsSUFBSWxDLElBQUosQ0FBU2dFLFFBQVQsSUFBcUIsRUFBcEM7QUFDQSx1QkFBSzFELFNBQUwsQ0FBZTJELElBQWYsQ0FBb0JDLEtBQXBCLENBQTBCLEtBQUs1RCxTQUEvQixFQUEwQzRCLElBQUlsQyxJQUFKLENBQVNtRSxJQUFuRDtBQUNBLHVCQUFLMUQsU0FBTCxHQUFpQnlCLElBQUlsQyxJQUFKLENBQVM4RCxNQUExQjtBQUNBLHVCQUFLWCxVQUFMO0FBQ0EsdUJBQUt6QyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsdUJBQUtDLGFBQUwsR0FBcUJ1QixJQUFJbEMsSUFBSixDQUFTb0UsUUFBOUI7QUFDQSx1QkFBSzdDLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs0RkFDb0I4QyxDOzs7Ozs7dUJBQ1osS0FBS25CLE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXpMeUIsZUFBS29CLEk7O2tCQUFuQm5GLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IHB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCByZWZyZXNoSW5kZXhNaXhpbiBmcm9tICdAL21peGlucy9yZWZyZXNoSW5kZXhNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcblxuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwaG90b3Muc3luY1wiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOnBob3RvSWR4LnN5bmNcIjpcInByZXZpZXdQaG90b3NJZHhcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG8sXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgICBncm91cElkOiAnJyxcbiAgICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgICBnYWxsZXJ5VGl0bGU6ICcnLFxuICAgIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICAgIHBob3RvTGlzdDogW10sXG4gICAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICAgIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gICAgY3VyQ3Vyc29yOiAwLFxuICAgIGlzR2V0TGlzdDogZmFsc2UsXG4gICAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICAgIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gICAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgICBpc1JlZnJlc2hJbmRleDogZmFsc2UsIC8vIOS7juWIm+W7uui/h+adpeeahFxuICAgIGlzU3VibWl0Rm9ybUlkOiB0cnVlIC8vIOWFgeiuuOaPkOS6pGZvcm1pZFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwaG90b1phbkNoYW5nZShpZHgsIHphbkxpc3QpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkeCwgemFuTGlzdClcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuID0gIXRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuXG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFuTGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7fVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIC8vIHRoaXMucmVmcmVzaEluZGV4KClcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbGxlcnlBdXRoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJzExMTEnKVxuICAgICAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGUsXG4gICAgICBwYXRoOiBgL3BhZ2UvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gIH1cbiAgLy8g55u45YaM5p2D6ZmQXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBpZiAodGhpcy5pc0dldExpc3QgfHwgIXRoaXMuaXNMaXN0SGFzTmV4dCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHJlcy5kYXRhLmdhbGxlcnlfbmFtZSlcbiAgICAgIHRoaXMuZ3JvdXBJZCA9IHJlcy5kYXRhLmdyb3VwX2lkIHx8ICcnXG4gICAgICB0aGlzLnBob3RvTGlzdC5wdXNoLmFwcGx5KHRoaXMucGhvdG9MaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzTGlzdEhhc05leHQgPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19