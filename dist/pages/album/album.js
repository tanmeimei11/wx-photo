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

var _publishSucc = require('./../../components/album/publishSucc.js');

var _publishSucc2 = _interopRequireDefault(_publishSucc);

var _printerPhoto = require('./../../components/album/printerPhoto.js');

var _printerPhoto2 = _interopRequireDefault(_printerPhoto);

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  pageName: 'album',
  groupUserName: '', // 群主名字
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

  publishAfterInfo: null, // 发布图片后的信息
  isShowPublishSucc: false,
  isShowTips: false,
  publishPhotoInfo: null, // 发图之后的photo信息

  isShowPrinterModal: true, // 是否展示跳转打印的弹窗
  printerPhotoModalInfo: null // 跳转打印的弹窗信息
};

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:previewPhotos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      publishSucc: _publishSucc2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
      clearCurPhotos: function clearCurPhotos() {
        this.previewPhotos = [];
        this.previewPhotosIdx = 0;
      },
      changeCurPhotos: function changeCurPhotos(photos, idx) {
        console.log('------preview-----');
        console.log(photos, idx);
        this.previewPhotos = photos;
        this.previewPhotosIdx = idx;
      },
      deletPhoto: function deletPhoto(idx) {
        this.photoList.splice(idx, 1);
        this.$apply();
      },
      publishPhoto: function publishPhoto(obj) {
        this.photoList.splice(0, 0, obj);
        this.isShowPublishSucc = true;
        this.publishAfterInfo = null;
        this.publishPhotoInfo = obj;
        this.$apply();
      },
      closePublishSucc: function closePublishSucc() {
        this.isShowPublishSucc = false;
      },
      openNewAlbum: function openNewAlbum() {
        this.isShowNewAlbum = true;
      },
      closeNewAlbum: function closeNewAlbum() {
        this.isShowNewAlbum = false;
      },
      closePrinterPhotoModal: function closePrinterPhotoModal() {
        this.isShowPrinterModal = false;
      },
      publishPrintPhoto: function publishPrintPhoto() {
        this.$invoke('photoItem', 'printerClick', {}, this.publishPhotoInfo.id, this.publishPhotoInfo.user_id);
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
                Object.assign(this, pageData);
                _context2.prev = 1;

                this.initOptions(options);
                _context2.next = 5;
                return (0, _login.wxLogin)();

              case 5:
                this.loadingIn('加载中');
                _context2.next = 8;
                return this.getGalleryAuth();

              case 8:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                this.loadingOut();
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 12]]);
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
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684\u7167\u7247\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId
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
      this.isShowPrinterModal = options.isnew || false;
    }
    // 设置相册信息

  }, {
    key: 'setAlbumInfo',
    value: function setAlbumInfo(data) {
      this.changeGalleryTitle(data.gallery_name);
      this.groupId = data.group_info.group_id || '';
      this.groupUserName = data.group_info.group_master_name || '';
      this.publishAfterInfo = data.toast_info;
      this.$apply();
    }
    // 相册信息

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
                  _context3.next = 10;
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

                this.setAlbumInfo(res.data);
                return _context3.abrupt('return', this.galleryAuth);

              case 10:
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
                console.log(this.isGetList, this.isListHasNext);

                if (!(this.isGetList || !this.isListHasNext)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return');

              case 3:
                this.isGetList = true;
                _context4.next = 6;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: this.galleryId,
                    cursor: this.curCursor
                  }
                });

              case 6:
                res = _context4.sent;

                if (res && res.data) {
                  this.photoList = [].concat(_toConsumableArray(this.photoList), _toConsumableArray(res.data.list));
                  this.curCursor = res.data.cursor || '';
                  this.isGetList = false;
                  this.isListHasNext = res.data.has_next;
                  this.$apply();
                  this.loadingOut();
                }

              case 8:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwiaXNTaG93TmV3QWxidW0iLCJuZXdBbGJ1bVRpdGxlIiwiaXNSZWZyZXNoSW5kZXgiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiaXNTaG93UHVibGlzaFN1Y2MiLCJpc1Nob3dUaXBzIiwicHVibGlzaFBob3RvSW5mbyIsImlzU2hvd1ByaW50ZXJNb2RhbCIsInByaW50ZXJQaG90b01vZGFsSW5mbyIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiY29uc29sZSIsImxvZyIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJvcHRpb25zIiwiaW5pdE9wdGlvbnMiLCJsb2FkaW5nSW4iLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJsb2FkaW5nT3V0IiwiZnJvbSIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaXNuZXciLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pbmZvIiwiZ3JvdXBfaWQiLCJncm91cF9tYXN0ZXJfbmFtZSIsInRvYXN0X2luZm8iLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsInNldEFsYnVtSW5mbyIsImN1cnNvciIsImxpc3QiLCJoYXNfbmV4dCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUtBLElBQUlBLFdBQVc7QUFDYkMsWUFBVSxPQURHO0FBRWJDLGlCQUFlLEVBRkYsRUFFTTtBQUNuQkMsV0FBUyxFQUhJO0FBSWJDLGFBQVcsR0FKRSxFQUlHO0FBQ2hCQyxnQkFBYyxFQUxEO0FBTWJDLGVBQWEsQ0FBQyxDQU5ELEVBTUk7O0FBRWpCQyxhQUFXLEVBUkU7QUFTYkMsaUJBQWUsRUFURixFQVNNO0FBQ25CQyxvQkFBa0IsQ0FWTCxFQVVROztBQUVyQkMsYUFBVyxDQVpFO0FBYWJDLGFBQVcsS0FiRTtBQWNiQyxpQkFBZSxJQWRGOztBQWdCYkMsa0JBQWdCLEtBaEJILEVBZ0JVO0FBQ3ZCQyxpQkFBZSxRQWpCRjs7QUFtQmJDLGtCQUFnQixLQW5CSCxFQW1CVTs7QUFFdkJDLG9CQUFrQixJQXJCTCxF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Ozs7Ozs7Ozs7OztFQTFMeUIsZUFBS3FCLEk7O2tCQUFuQjlFLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gIGN1ckN1cnNvcjogMCxcbiAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICBpc1Nob3dOZXdBbGJ1bTogZmFsc2UsIC8vIOS/ruaUueWQjeensOW8ueeql1xuICBuZXdBbGJ1bVRpdGxlOiAn5L+u5pS555u45YaM5ZCN56ewJyxcblxuICBpc1JlZnJlc2hJbmRleDogZmFsc2UsIC8vIOS7juWIm+W7uui/h+adpeeahFxuXG4gIHB1Ymxpc2hBZnRlckluZm86IG51bGwsIC8vIOWPkeW4g+WbvueJh+WQjueahOS/oeaBr1xuICBpc1Nob3dQdWJsaXNoU3VjYzogZmFsc2UsXG4gIGlzU2hvd1RpcHM6IGZhbHNlLFxuICBwdWJsaXNoUGhvdG9JbmZvOiBudWxsLCAvLyDlj5Hlm77kuYvlkI7nmoRwaG90b+S/oeaBr1xuXG4gIGlzU2hvd1ByaW50ZXJNb2RhbDogdHJ1ZSwgLy8g5piv5ZCm5bGV56S66Lez6L2s5omT5Y2w55qE5by556qXXG4gIHByaW50ZXJQaG90b01vZGFsSW5mbzogbnVsbCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnByZXZpZXdQaG90b3Muc3luY1wiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOnBob3RvSWR4LnN5bmNcIjpcInByZXZpZXdQaG90b3NJZHhcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOnt9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIixcInYtb246cHVibGlzaFByaW50UGhvdG9cIjpcInB1Ymxpc2hQcmludFBob3RvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgcHVibGlzaFN1Y2M6IHB1Ymxpc2hTdWNjLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluLCBmb3JtU3VibWl0TWl4aW4sIHJlZnJlc2hJbmRleE1peGluXVxuICAvLyBkYXRhXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS1wcmV2aWV3LS0tLS0nKVxuICAgICAgY29uc29sZS5sb2cocGhvdG9zLCBpZHgpXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IHRydWVcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMucHVibGlzaFBob3RvSW5mbyA9IG9ialxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNsb3NlUHJpbnRlclBob3RvTW9kYWwoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IGZhbHNlXG4gICAgfSxcbiAgICBwdWJsaXNoUHJpbnRQaG90bygpIHtcbiAgICAgIHRoaXMuJGludm9rZSgncGhvdG9JdGVtJywgJ3ByaW50ZXJDbGljaycsIHt9LCB0aGlzLnB1Ymxpc2hQaG90b0luZm8uaWQsIHRoaXMucHVibGlzaFBob3RvSW5mby51c2VyX2lkKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiByZXMuZnJvbSA9PT0gJ2J1dHRvbicgPyBg5oiR5Y+R5biD5LqG5paw55qE54Wn54mH77yM5b+r5p2l55yL55yL5ZCnYCA6IGDpgoDor7fkvaDmn6XnnIvmnKznvqTnm7jlhozjgIoke3RoaXMuZ2FsbGVyeVRpdGxlfeOAi2AsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2FsYnVtL2FsYnVtP2lkPSR7dGhpcy5nYWxsZXJ5SWR9YFxuICAgIH1cbiAgfVxuICAvLyDkv67mlLnmoIfpophcbiAgY2hhbmdlR2FsbGVyeVRpdGxlKHRleHQpIHtcbiAgICB0aGlzLmdhbGxlcnlUaXRsZSA9IHRleHQgfHwgJ+ebuOWGjOivpuaDhSdcbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGVcbiAgICB9KVxuICB9XG4gIC8vIOWIneWni+WMlumFjee9rlxuICBpbml0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5nYWxsZXJ5SWQgPSBvcHRpb25zLmlkIHx8ICcxJ1xuICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gb3B0aW9ucy5pc25ldyB8fCBmYWxzZVxuICB9XG4gIC8vIOiuvue9ruebuOWGjOS/oeaBr1xuICBzZXRBbGJ1bUluZm8oZGF0YSkge1xuICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKGRhdGEuZ2FsbGVyeV9uYW1lKVxuICAgIHRoaXMuZ3JvdXBJZCA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9pZCB8fCAnJ1xuICAgIHRoaXMuZ3JvdXBVc2VyTmFtZSA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9tYXN0ZXJfbmFtZSB8fCAnJ1xuICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGRhdGEudG9hc3RfaW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICAvLyDnm7jlhozkv6Hmga9cbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxMFxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5X2luZm8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDJcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3B1Ymxpc2gpIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDFcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRBbGJ1bUluZm8ocmVzLmRhdGEpXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmlzR2V0TGlzdCwgdGhpcy5pc0xpc3RIYXNOZXh0KVxuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCAhdGhpcy5pc0xpc3RIYXNOZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19