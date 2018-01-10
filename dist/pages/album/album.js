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

var _api = require('./../../utils/api.js');

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

  photoIdx: 0,
  photoItemIdx: 0,

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum", "v-on:clearPublishAfterInfo": "clearPublishAfterInfo" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      publishSucc: _publishSucc2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default, _shareConnectMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
      swiperChange: function swiperChange(e) {
        this.photoItemIdx = e.detail.current;
        console.log(this.photoItemIdx);
        this.$apply();
      },
      downImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.loadingIn('正在下载');
                  console.log(this.previewPhotos[this.photoItemIdx].url);
                  _context.prev = 2;
                  _context.next = 5;
                  return (0, _api.downInternetUrl)(this.previewPhotos[this.photoItemIdx].url);

                case 5:
                  this.loadingOut();
                  this.toastSucc('下载成功');
                  _context.next = 13;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](2);

                  this.loadingOut();
                  this.toastFail('下载失败');

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 9]]);
        }));

        function downImage() {
          return _ref2.apply(this, arguments);
        }

        return downImage;
      }(),
      clearSwiper: function clearSwiper() {
        this.photoItemIdx = 0;
        this.isShowPreViewModal = false;
        this.previewPhotos = [];
        this.previewPhotosIdx = 0;
      },
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
        this.photoItemIdx = idx;
        this.$apply();
      },
      deletPhoto: function deletPhoto(idx) {
        this.photoList.splice(idx, 1);
        this.refreshGallery();
        this.$apply();
      },
      clearPublishAfterInfo: function clearPublishAfterInfo() {
        this.publishAfterInfo = null;
        this.$apply();
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
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(title) {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
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
                  res = _context2.sent;
                  _context2.next = 9;
                  break;

                case 6:
                  _context2.prev = 6;
                  _context2.t0 = _context2['catch'](0);

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
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 6]]);
        }));

        function submitTitle(_x) {
          return _ref3.apply(this, arguments);
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                Object.assign(this, pageData);
                _context3.prev = 1;

                this.initOptions(options);
                _context3.next = 5;
                return (0, _login.wxLogin)();

              case 5:
                this.loadingIn('加载中');
                _context3.next = 8;
                return this.getShareFromOther(true, this.shareCallBackUrl);

              case 8:
                _context3.next = 10;
                return this.getGalleryAuth();

              case 10:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                this.loadingOut();
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 14]]);
      }));

      function onLoad(_x2) {
        return _ref4.apply(this, arguments);
      }

      return onLoad;
    }()

    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      var image = this.publishPhotoInfo && this.publishPhotoInfo.photos[0].url || '';
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
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _login.request)({
                  url: '/gg/gallery/info',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                res = _context4.sent;

                if (!(res && res.data)) {
                  _context4.next = 10;
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
                return _context4.abrupt('return', this.galleryAuth);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getGalleryAuth() {
        return _ref5.apply(this, arguments);
      }

      return getGalleryAuth;
    }()
    // 照片列表

  }, {
    key: 'getList',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log(this.isGetList, this.isListHasNext);

                if (!(this.isGetList || !this.isListHasNext)) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt('return');

              case 3:
                this.isGetList = true;
                _context5.next = 6;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: this.galleryId,
                    cursor: this.curCursor
                  }
                });

              case 6:
                res = _context5.sent;

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
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getList() {
        return _ref6.apply(this, arguments);
      }

      return getList;
    }()
    // 下啦加载

  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getList();

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onReachBottom(_x3) {
        return _ref7.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJpbWFnZSIsImZyb20iLCJwYXRoIiwic3VjY2VzcyIsInNoYXJlQ2FsbEJhY2siLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJsZW5ndGgiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJzZXRBbGJ1bUluZm8iLCJjdXJzb3IiLCJsaXN0IiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxpQkFBZSxFQUZGLEVBRU07QUFDbkJDLFdB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SSxDQUFDMkUsSUFBSXhDLElBQUosQ0FBUzBFLGNBQWQsRUFBOEI7QUFDNUIsdUJBQUs3RyxXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7O0FBRUQscUJBQUs4RyxZQUFMLENBQWtCbkMsSUFBSXhDLElBQXRCO2tEQUNPLEtBQUtuQyxXOzs7Ozs7Ozs7Ozs7Ozs7O0FBR2hCOzs7Ozs7Ozs7OztBQUVFMkMsd0JBQVFDLEdBQVIsQ0FBWSxLQUFLdEMsU0FBakIsRUFBNEIsS0FBS0MsYUFBakM7O3NCQUNJLEtBQUtELFNBQUwsSUFBa0IsQ0FBQyxLQUFLQyxhOzs7Ozs7OztBQUc1QixxQkFBS0QsU0FBTCxHQUFpQixJQUFqQjs7dUJBQ2dCLG9CQUFRO0FBQ3RCMEMsdUJBQUssdUJBRGlCO0FBRXRCYix3QkFBTTtBQUNKdUUsZ0NBQVksS0FBSzVHLFNBRGI7QUFFSmlILDRCQUFRLEtBQUsxRztBQUZUO0FBRmdCLGlCQUFSLEM7OztBQUFac0UsbUI7O0FBT0osb0JBQUlBLE9BQU9BLElBQUl4QyxJQUFmLEVBQXFCO0FBQ25CLHVCQUFLbEMsU0FBTCxnQ0FDSyxLQUFLQSxTQURWLHNCQUVLMEUsSUFBSXhDLElBQUosQ0FBUzZFLElBRmQ7QUFJQSx1QkFBSzNHLFNBQUwsR0FBaUJzRSxJQUFJeEMsSUFBSixDQUFTNEUsTUFBVCxJQUFtQixFQUFwQztBQUNBLHVCQUFLekcsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHVCQUFLQyxhQUFMLEdBQXFCb0UsSUFBSXhDLElBQUosQ0FBUzhFLFFBQTlCO0FBQ0EsdUJBQUtwRSxNQUFMO0FBQ0EsdUJBQUtJLFVBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs0RkFDb0JULEM7Ozs7Ozt1QkFDWixLQUFLK0MsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeE95QixlQUFLMkIsSTs7a0JBQW5COUYsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgUHVibGlzaFBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgcHVibGlzaFN1Y2MgZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hTdWNjJ1xuaW1wb3J0IFByaW50ZXJQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJpbnRlclBob3RvJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCByZWZyZXNoSW5kZXhNaXhpbiBmcm9tICdAL21peGlucy9yZWZyZXNoSW5kZXhNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcbmltcG9ydCB7XG4gIGRvd25JbnRlcm5ldFVybFxufSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuXG4gIGlzU2hvd1ByZVZpZXdNb2RhbDogZmFsc2UsXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIHBob3RvSWR4OiAwLFxuICBwaG90b0l0ZW1JZHg6IDAsXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcblxuICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsLCAvLyDlj5HluIPlm77niYflkI7nmoTkv6Hmga9cbiAgaXNTaG93UHVibGlzaFN1Y2M6IGZhbHNlLFxuICBpc1Nob3dUaXBzOiBmYWxzZSxcbiAgcHVibGlzaFBob3RvSW5mbzogbnVsbCwgLy8g5Y+R5Zu+5LmL5ZCO55qEcGhvdG/kv6Hmga9cblxuICBpc1Nob3dQcmludGVyTW9kYWw6IHRydWUsIC8vIOaYr+WQpuWxleekuui3s+i9rOaJk+WNsOeahOW8ueeql1xuICBwcmludGVyUGhvdG9Nb2RhbEluZm86IG51bGwsIC8vIOi3s+i9rOaJk+WNsOeahOW8ueeql+S/oeaBr1xuICBzaGFyZUNhbGxCYWNrVXJsOiAnL2dnL2dhbGxlcnkvam9pbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHVibGlzaFBob3RvXCI6e1widi1iaW5kOmdhbGxlcnlBdXRoLnN5bmNcIjpcImdhbGxlcnlBdXRoXCIsXCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCIsXCJ2LWJpbmQ6Z3JvdXBVc2VyTmFtZS5zeW5jXCI6XCJncm91cFVzZXJOYW1lXCIsXCJ2LWJpbmQ6aXNTaG93VGlwcy5zeW5jXCI6XCJpc1Nob3dUaXBzXCIsXCJ2LWJpbmQ6Z2FsbGVyeUlkLnN5bmNcIjpcImdhbGxlcnlJZFwifSxcInByaW50ZXJQaG90b1wiOntcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwcmludGVyUGhvdG9Nb2RhbEluZm8uc3luY1wiOlwicHJpbnRlclBob3RvTW9kYWxJbmZvXCJ9LFwicHVibGlzaFN1Y2NcIjp7fSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCIsXCJ2LW9uOnBob3RvWmFuQ2hhbmdlXCI6XCJwaG90b1phbkNoYW5nZVwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246cHVibGlzaFBob3RvXCI6XCJwdWJsaXNoUGhvdG9cIixcInYtb246b3Blbk5ld0FsYnVtXCI6XCJvcGVuTmV3QWxidW1cIixcInYtb246Y2xlYXJQdWJsaXNoQWZ0ZXJJbmZvXCI6XCJjbGVhclB1Ymxpc2hBZnRlckluZm9cIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LW9uOmNsb3NlUHJpbnRlclBob3RvTW9kYWxcIjpcImNsb3NlUHJpbnRlclBob3RvTW9kYWxcIn0sXCJwdWJsaXNoU3VjY1wiOntcInYtb246Y2xvc2VQdWJsaXNoU3VjY1wiOlwiY2xvc2VQdWJsaXNoU3VjY1wiLFwidi1vbjpwdWJsaXNoUHJpbnRQaG90b1wiOlwicHVibGlzaFByaW50UGhvdG9cIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IFB1Ymxpc2hQaG90byxcbiAgICBwcmludGVyUGhvdG86IFByaW50ZXJQaG90byxcbiAgICBwdWJsaXNoU3VjYzogcHVibGlzaFN1Y2MsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW4sIHNoYXJlQ29ubmVjdE1peGluXVxuICAvLyBkYXRhXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICBzd2lwZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbUlkeClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwodGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSAwXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLXByZXZpZXctLS0tLScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3MsIGlkeClcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBpZHhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbGVhclB1Ymxpc2hBZnRlckluZm8oKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBudWxsXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IHRydWVcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMucHVibGlzaFBob3RvSW5mbyA9IG9ialxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVB1Ymxpc2hTdWNjKCkge1xuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgY2xvc2VQcmludGVyUGhvdG9Nb2RhbCgpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gZmFsc2VcbiAgICB9LFxuICAgIHB1Ymxpc2hQcmludFBob3RvKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCdwaG90b0l0ZW0nLCAncHJpbnRlckNsaWNrJywge30sIHRoaXMucHVibGlzaFBob3RvSW5mby5pZCwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnVzZXJfaWQpXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3VwZGF0ZW5hbWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkv67mlLnlpLHotKUnKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S/ruaUueaIkOWKnycpXG4gICAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHRpdGxlKVxuICAgICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhvdG9aYW5DaGFuZ2UoaWR4LCB6YW5MaXN0KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phbiA9ICF0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phblxuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS56YW5fbGlzdCA9IHphbkxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRTaGFyZUZyb21PdGhlcih0cnVlLCB0aGlzLnNoYXJlQ2FsbEJhY2tVcmwpXG4gICAgICBhd2FpdCB0aGlzLmdldEdhbGxlcnlBdXRoKClcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoICE9PSAwKSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgICB9XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLnRvYXN0RmFpbCgn5Yqg6L295aSx6LSlJylcbiAgICB9XG4gIH1cblxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgdmFyIGltYWdlID0gKHRoaXMucHVibGlzaFBob3RvSW5mbyAmJiB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9zWzBdLnVybCkgfHwgJydcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlcy5mcm9tID09PSAnYnV0dG9uJyA/IGDmiJHlj5HluIPkuobmlrDnmoTnhafniYfvvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gLFxuICAgICAgaW1hZ2U6IGltYWdlIHx8ICdodHRwczovL2luaW1nMDcuaml1eWFuLmluZm8vaW4vMjAxOC8wMS8xMC9CQjUyQzgzNi03N0NFLTM3M0EtRDQ4NC1CRUM5NDA1NzQ5RkIuanBnJyxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuc2hhcmVDYWxsQmFjayh7IC4uLnJlcyxcbiAgICAgICAgc2hhcmVDYWxsQmFja1VybDogdGhpcy5zaGFyZUNhbGxCYWNrVXJsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZWZyZXNoR2FsbGVyeSgpIHtcbiAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhZ2VzW2ldLmRhdGEucGFnZU5hbWUgPT09ICdnYWxsZXJ5JyAmJiAocGFnZXNbaV0uaW5pdCgpKVxuICAgIH1cbiAgfVxuICAvLyDkv67mlLnmoIfpophcbiAgY2hhbmdlR2FsbGVyeVRpdGxlKHRleHQpIHtcbiAgICB0aGlzLmdhbGxlcnlUaXRsZSA9IHRleHQgfHwgJ+ebuOWGjOivpuaDhSdcbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGVcbiAgICB9KVxuICB9XG4gIC8vIOWIneWni+WMlumFjee9rlxuICBpbml0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5nYWxsZXJ5SWQgPSBvcHRpb25zLmlkIHx8ICcxJ1xuICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gb3B0aW9ucy5pc25ldyB8fCBmYWxzZVxuICB9XG4gIC8vIOiuvue9ruebuOWGjOS/oeaBr1xuICBzZXRBbGJ1bUluZm8oZGF0YSkge1xuICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKGRhdGEuZ2FsbGVyeV9uYW1lKVxuICAgIHRoaXMuZ3JvdXBJZCA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9pZCB8fCAnJ1xuICAgIHRoaXMuZ3JvdXBVc2VyTmFtZSA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9tYXN0ZXJfbmFtZSB8fCAnJ1xuICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGRhdGEudG9hc3RfaW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICAvLyDnm7jlhozkv6Hmga9cbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxMFxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5X2luZm8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDJcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3B1Ymxpc2gpIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDFcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRBbGJ1bUluZm8ocmVzLmRhdGEpXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmlzR2V0TGlzdCwgdGhpcy5pc0xpc3RIYXNOZXh0KVxuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCAhdGhpcy5pc0xpc3RIYXNOZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19