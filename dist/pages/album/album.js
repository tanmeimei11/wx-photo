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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJpbWFnZSIsImZyb20iLCJwYXRoIiwic3VjY2VzcyIsInNoYXJlQ2FsbEJhY2siLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJsZW5ndGgiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJzZXRBbGJ1bUluZm8iLCJjdXJzb3IiLCJsaXN0IiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxpQkFBZSxFQUZGLEVBRU07QUFDbkJDLFdB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SUFBSixDQUFTMEUsY0FBZCxFQUE4QjtBQUM1Qix1QkFBSzdHLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDs7QUFFRCxxQkFBSzhHLFlBQUwsQ0FBa0JuQyxJQUFJeEMsSUFBdEI7a0RBQ08sS0FBS25DLFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHaEI7Ozs7Ozs7Ozs7O0FBRUUyQyx3QkFBUUMsR0FBUixDQUFZLEtBQUt0QyxTQUFqQixFQUE0QixLQUFLQyxhQUFqQzs7c0JBQ0ksS0FBS0QsU0FBTCxJQUFrQixDQUFDLEtBQUtDLGE7Ozs7Ozs7O0FBRzVCLHFCQUFLRCxTQUFMLEdBQWlCLElBQWpCOzt1QkFDZ0Isb0JBQVE7QUFDdEIwQyx1QkFBSyx1QkFEaUI7QUFFdEJiLHdCQUFNO0FBQ0p1RSxnQ0FBWSxLQUFLNUcsU0FEYjtBQUVKaUgsNEJBQVEsS0FBSzFHO0FBRlQ7QUFGZ0IsaUJBQVIsQzs7O0FBQVpzRSxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSXhDLElBQWYsRUFBcUI7QUFDbkIsdUJBQUtsQyxTQUFMLGdDQUNLLEtBQUtBLFNBRFYsc0JBRUswRSxJQUFJeEMsSUFBSixDQUFTNkUsSUFGZDtBQUlBLHVCQUFLM0csU0FBTCxHQUFpQnNFLElBQUl4QyxJQUFKLENBQVM0RSxNQUFULElBQW1CLEVBQXBDO0FBQ0EsdUJBQUt6RyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsdUJBQUtDLGFBQUwsR0FBcUJvRSxJQUFJeEMsSUFBSixDQUFTOEUsUUFBOUI7QUFDQSx1QkFBS3BFLE1BQUw7QUFDQSx1QkFBS0ksVUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUg7Ozs7OzRGQUNvQlQsQzs7Ozs7O3VCQUNaLEtBQUsrQyxPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2T3lCLGVBQUsyQixJOztrQkFBbkI5RixLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBQdWJsaXNoUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCBwdWJsaXNoU3VjYyBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFN1Y2MnXG5pbXBvcnQgUHJpbnRlclBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmludGVyUGhvdG8nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IHJlZnJlc2hJbmRleE1peGluIGZyb20gJ0AvbWl4aW5zL3JlZnJlc2hJbmRleE1peGluJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJ0AvY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IHtcbiAgZG93bkludGVybmV0VXJsXG59IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcydcbmltcG9ydCBzaGFyZUNvbm5lY3RNaXhpbiBmcm9tICdAL21peGlucy9zaGFyZUNvbm5lY3RNaXhpbidcblxuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnYWxidW0nLFxuICBncm91cFVzZXJOYW1lOiAnJywgLy8g576k5Li75ZCN5a2XXG4gIGdyb3VwSWQ6ICcnLFxuICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgZ2FsbGVyeVRpdGxlOiAnJyxcbiAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkCAzIOS4jeiDveS/ruaUueWQjeensFxuXG4gIHBob3RvTGlzdDogW10sXG5cbiAgaXNTaG93UHJlVmlld01vZGFsOiBmYWxzZSxcbiAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICBjdXJDdXJzb3I6IDAsXG4gIGlzR2V0TGlzdDogZmFsc2UsXG4gIGlzTGlzdEhhc05leHQ6IHRydWUsXG5cbiAgcGhvdG9JZHg6IDAsXG4gIHBob3RvSXRlbUlkeDogMCxcblxuICBpc1Nob3dOZXdBbGJ1bTogZmFsc2UsIC8vIOS/ruaUueWQjeensOW8ueeql1xuICBuZXdBbGJ1bVRpdGxlOiAn5L+u5pS555u45YaM5ZCN56ewJyxcblxuICBpc1JlZnJlc2hJbmRleDogZmFsc2UsIC8vIOS7juWIm+W7uui/h+adpeeahFxuXG4gIHB1Ymxpc2hBZnRlckluZm86IG51bGwsIC8vIOWPkeW4g+WbvueJh+WQjueahOS/oeaBr1xuICBpc1Nob3dQdWJsaXNoU3VjYzogZmFsc2UsXG4gIGlzU2hvd1RpcHM6IGZhbHNlLFxuICBwdWJsaXNoUGhvdG9JbmZvOiBudWxsLCAvLyDlj5Hlm77kuYvlkI7nmoRwaG90b+S/oeaBr1xuXG4gIGlzU2hvd1ByaW50ZXJNb2RhbDogdHJ1ZSwgLy8g5piv5ZCm5bGV56S66Lez6L2s5omT5Y2w55qE5by556qXXG4gIHByaW50ZXJQaG90b01vZGFsSW5mbzogbnVsbCwgLy8g6Lez6L2s5omT5Y2w55qE5by556qX5L+h5oGvXG4gIHNoYXJlQ2FsbEJhY2tVcmw6ICcvZ2cvZ2FsbGVyeS9qb2luJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOnt9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wiLFwidi1vbjpvcGVuTmV3QWxidW1cIjpcIm9wZW5OZXdBbGJ1bVwiLFwidi1vbjpjbGVhclB1Ymxpc2hBZnRlckluZm9cIjpcImNsZWFyUHVibGlzaEFmdGVySW5mb1wifSxcInByaW50ZXJQaG90b1wiOntcInYtb246Y2xvc2VQcmludGVyUGhvdG9Nb2RhbFwiOlwiY2xvc2VQcmludGVyUGhvdG9Nb2RhbFwifSxcInB1Ymxpc2hTdWNjXCI6e1widi1vbjpjbG9zZVB1Ymxpc2hTdWNjXCI6XCJjbG9zZVB1Ymxpc2hTdWNjXCIsXCJ2LW9uOnB1Ymxpc2hQcmludFBob3RvXCI6XCJwdWJsaXNoUHJpbnRQaG90b1wifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogUHVibGlzaFBob3RvLFxuICAgIHByaW50ZXJQaG90bzogUHJpbnRlclBob3RvLFxuICAgIHB1Ymxpc2hTdWNjOiBwdWJsaXNoU3VjYyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbiwgZm9ybVN1Ym1pdE1peGluLCByZWZyZXNoSW5kZXhNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGhvdG9JdGVtSWR4KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4i+i9vScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S4i+i9veaIkOWKnycpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkuIvovb3lpLHotKUnKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IDBcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0tcHJldmlldy0tLS0tJylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3RvcywgaWR4KVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsZWFyUHVibGlzaEFmdGVySW5mbygpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbnVsbFxuICAgICAgdGhpcy5wdWJsaXNoUGhvdG9JbmZvID0gb2JqXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlUHVibGlzaFN1Y2MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gZmFsc2VcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjbG9zZVByaW50ZXJQaG90b01vZGFsKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBmYWxzZVxuICAgIH0sXG4gICAgcHVibGlzaFByaW50UGhvdG8oKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ3Bob3RvSXRlbScsICdwcmludGVyQ2xpY2snLCB7fSwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLmlkLCB0aGlzLnB1Ymxpc2hQaG90b0luZm8udXNlcl9pZClcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwaG90b1phbkNoYW5nZShpZHgsIHphbkxpc3QpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuID0gIXRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuXG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFuTGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7fVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUsIHRoaXMuc2hhcmVDYWxsQmFja1VybClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICB2YXIgaW1hZ2UgPSAodGhpcy5wdWJsaXNoUGhvdG9JbmZvICYmIHRoaXMucHVibGlzaFBob3RvSW5mby5waG90b3NbMF0udXJsKSB8fCAnJ1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahOeFp+eJh++8jOW/q+adpeeci+eci+WQp2AgOiBg6YKA6K+35L2g5p+l55yL5pys576k55u45YaM44CKJHt0aGlzLmdhbGxlcnlUaXRsZX3jgItgLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWAsXG4gICAgICBpbWFnZTogaW1hZ2UgfHwgJ2h0dHBzOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=