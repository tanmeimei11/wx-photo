'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _shareConnectMixin = require('./../../mixins/shareConnectMixin.js');

var _shareConnectMixin2 = _interopRequireDefault(_shareConnectMixin);

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

  isShowPreViewModal: false,
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
  printerPhotoModalInfo: null, // 跳转打印的弹窗信息
  shareCallBackUrl: '/gg/gallery/join'
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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:previewPhotos.sync": "previewPhotos" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum", "v-on:clearPublishAfterInfo": "clearPublishAfterInfo" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      publishSucc: _publishSucc2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default, _shareConnectMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
      clearCurPhotos: function clearCurPhotos() {
        this.isShowPreViewModal = false;
        this.previewPhotos = [];
        this.previewPhotosIdx = 0;
      },
      changeCurPhotos: function changeCurPhotos(photos, idx) {
        this.previewPhotos = photos;
        this.isShowPreViewModal = true;
        console.log('------preview-----');
        console.log(this.previewPhotos, idx);
        this.previewPhotosIdx = idx;
        this.$apply();
      },
      deletPhoto: function deletPhoto(idx) {
        this.photoList.splice(idx, 1);
        this.refreshGallery();
        this.$apply();
      },
      clearPublishAfterInfo: function clearPublishAfterInfo() {
        this.publishAfterInfo = null;
      },
      publishPhoto: function publishPhoto(obj) {
        this.photoList.splice(0, 0, obj);
        this.isShowPublishSucc = true;
        this.publishAfterInfo = null;
        this.publishPhotoInfo = obj;
        this.refreshGallery();
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
                return this.getShareFromOther(true, this.shareCallBackUrl);

              case 8:
                _context2.next = 10;
                return this.getGalleryAuth();

              case 10:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                this.loadingOut();
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
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
      var image = this.publishPhotoInfo && this.publishPhotoInfo.photos.url || '';
      return {
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684\u7167\u7247\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId,
        image: image || 'https://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
        success: this.shareCallBack(_extends({}, res, {
          shareCallBackUrl: this.shareCallBackUrl
        }))
      };
    }
  }, {
    key: 'refreshGallery',
    value: function refreshGallery() {
      var pages = getCurrentPages();
      for (var i = 0; i < pages.length; i++) {
        pages[i].data.pageName === 'gallery' && pages[i].init();
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwiaXNTaG93TmV3QWxidW0iLCJuZXdBbGJ1bVRpdGxlIiwiaXNSZWZyZXNoSW5kZXgiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiaXNTaG93UHVibGlzaFN1Y2MiLCJpc1Nob3dUaXBzIiwicHVibGlzaFBob3RvSW5mbyIsImlzU2hvd1ByaW50ZXJNb2RhbCIsInByaW50ZXJQaG90b01vZGFsSW5mbyIsInNoYXJlQ2FsbEJhY2tVcmwiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmludGVyUGhvdG8iLCJwdWJsaXNoU3VjYyIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJkZWxldFBob3RvIiwic3BsaWNlIiwicmVmcmVzaEdhbGxlcnkiLCJjbGVhclB1Ymxpc2hBZnRlckluZm8iLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJvcHRpb25zIiwiaW5pdE9wdGlvbnMiLCJsb2FkaW5nSW4iLCJnZXRTaGFyZUZyb21PdGhlciIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsImxvYWRpbmdPdXQiLCJpbWFnZSIsImZyb20iLCJwYXRoIiwic3VjY2VzcyIsInNoYXJlQ2FsbEJhY2siLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJsZW5ndGgiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJzZXRBbGJ1bUluZm8iLCJjdXJzb3IiLCJsaXN0IiwiaGFzX25leHQiLCJlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBSUEsV0FBVztBQUNiQyxZQUFVLE9BREc7QUFFYkMsaUJBQWUsRUFGRixFQUVNO0FBQ25CQyxXQUFTLEVBSEk7QUFJYkMsYUFBVyxHQUpFLEVBSUc7QUFDaEJDLGdCQUFjLEVBTEQ7QUFNYkMsZUFBYSxDQUFDLENBTkQsRUFNSTs7QUFFakJDLGFBQVcsRUFSRTs7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YWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuXG4gIGlzU2hvd1ByZVZpZXdNb2RhbDogZmFsc2UsXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsLCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbiAgc2hhcmVDYWxsQmFja1VybDogJy9nZy9nYWxsZXJ5L2pvaW4nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwcmV2aWV3UGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOnt9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCIsXCJ2LW9uOmNsZWFyUHVibGlzaEFmdGVySW5mb1wiOlwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIixcInYtb246cHVibGlzaFByaW50UGhvdG9cIjpcInB1Ymxpc2hQcmludFBob3RvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgcHVibGlzaFN1Y2M6IHB1Ymxpc2hTdWNjLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluLCBmb3JtU3VibWl0TWl4aW4sIHJlZnJlc2hJbmRleE1peGluLCBzaGFyZUNvbm5lY3RNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLXByZXZpZXctLS0tLScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3MsIGlkeClcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsZWFyUHVibGlzaEFmdGVySW5mbygpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbnVsbFxuICAgICAgdGhpcy5wdWJsaXNoUGhvdG9JbmZvID0gb2JqXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlUHVibGlzaFN1Y2MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gZmFsc2VcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjbG9zZVByaW50ZXJQaG90b01vZGFsKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBmYWxzZVxuICAgIH0sXG4gICAgcHVibGlzaFByaW50UGhvdG8oKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ3Bob3RvSXRlbScsICdwcmludGVyQ2xpY2snLCB7fSwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLmlkLCB0aGlzLnB1Ymxpc2hQaG90b0luZm8udXNlcl9pZClcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwaG90b1phbkNoYW5nZShpZHgsIHphbkxpc3QpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuID0gIXRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuXG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFuTGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7fVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUsIHRoaXMuc2hhcmVDYWxsQmFja1VybClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICB2YXIgaW1hZ2UgPSAodGhpcy5wdWJsaXNoUGhvdG9JbmZvICYmIHRoaXMucHVibGlzaFBob3RvSW5mby5waG90b3MudXJsKSB8fCAnJ1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahOeFp+eJh++8jOW/q+adpeeci+eci+WQp2AgOiBg6YKA6K+35L2g5p+l55yL5pys576k55u45YaM44CKJHt0aGlzLmdhbGxlcnlUaXRsZX3jgItgLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWAsXG4gICAgICBpbWFnZTogaW1hZ2UgfHwgJ2h0dHBzOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=