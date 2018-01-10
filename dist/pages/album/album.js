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
      console.log(this.publishPhotoInfo + "==============");
      // var image = (this.publishPhotoInfo && this.publishPhotoInfo.photos[0].url) || ''
      return {
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684\u7167\u7247\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId,
        image: 'https://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJmcm9tIiwicGF0aCIsImltYWdlIiwic3VjY2VzcyIsInNoYXJlQ2FsbEJhY2siLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJsZW5ndGgiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiZ2FsbGVyeV9pZCIsImNhbl9tb2RpZnlfaW5mbyIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJzZXRBbGJ1bUluZm8iLCJjdXJzb3IiLCJsaXN0IiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxpQkFBZSxFQUZGLEVBRU07QUFDbkJDLFdB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N0csV0FBTCxHQUFtQixDQUFuQjtBQUNEOztBQUVELHFCQUFLOEcsWUFBTCxDQUFrQm5DLElBQUl4QyxJQUF0QjtrREFDTyxLQUFLbkMsVzs7Ozs7Ozs7Ozs7Ozs7OztBQUdoQjs7Ozs7Ozs7Ozs7QUFFRTJDLHdCQUFRQyxHQUFSLENBQVksS0FBS3RDLFNBQWpCLEVBQTRCLEtBQUtDLGFBQWpDOztzQkFDSSxLQUFLRCxTQUFMLElBQWtCLENBQUMsS0FBS0MsYTs7Ozs7Ozs7QUFHNUIscUJBQUtELFNBQUwsR0FBaUIsSUFBakI7O3VCQUNnQixvQkFBUTtBQUN0QjBDLHVCQUFLLHVCQURpQjtBQUV0QmIsd0JBQU07QUFDSnVFLGdDQUFZLEtBQUs1RyxTQURiO0FBRUppSCw0QkFBUSxLQUFLMUc7QUFGVDtBQUZnQixpQkFBUixDOzs7QUFBWnNFLG1COztBQU9KLG9CQUFJQSxPQUFPQSxJQUFJeEMsSUFBZixFQUFxQjtBQUNuQix1QkFBS2xDLFNBQUwsZ0NBQ0ssS0FBS0EsU0FEVixzQkFFSzBFLElBQUl4QyxJQUFKLENBQVM2RSxJQUZkO0FBSUEsdUJBQUszRyxTQUFMLEdBQWlCc0UsSUFBSXhDLElBQUosQ0FBUzRFLE1BQVQsSUFBbUIsRUFBcEM7QUFDQSx1QkFBS3pHLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsYUFBTCxHQUFxQm9FLElBQUl4QyxJQUFKLENBQVM4RSxRQUE5QjtBQUNBLHVCQUFLcEUsTUFBTDtBQUNBLHVCQUFLSSxVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7NEZBQ29CVCxDOzs7Ozs7dUJBQ1osS0FBSytDLE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXpPeUIsZUFBSzJCLEk7O2tCQUFuQjlGLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQge1xuICBkb3duSW50ZXJuZXRVcmxcbn0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJ1xuaW1wb3J0IHNoYXJlQ29ubmVjdE1peGluIGZyb20gJ0AvbWl4aW5zL3NoYXJlQ29ubmVjdE1peGluJ1xuXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdhbGJ1bScsXG4gIGdyb3VwVXNlck5hbWU6ICcnLCAvLyDnvqTkuLvlkI3lrZdcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcblxuICBpc1Nob3dQcmVWaWV3TW9kYWw6IGZhbHNlLFxuICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gIGN1ckN1cnNvcjogMCxcbiAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICBwaG90b0lkeDogMCxcbiAgcGhvdG9JdGVtSWR4OiAwLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsLCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbiAgc2hhcmVDYWxsQmFja1VybDogJy9nZy9nYWxsZXJ5L2pvaW4nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5QXV0aC5zeW5jXCI6XCJnYWxsZXJ5QXV0aFwiLFwidi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wiLFwidi1iaW5kOmdyb3VwVXNlck5hbWUuc3luY1wiOlwiZ3JvdXBVc2VyTmFtZVwiLFwidi1iaW5kOmlzU2hvd1RpcHMuc3luY1wiOlwiaXNTaG93VGlwc1wiLFwidi1iaW5kOmdhbGxlcnlJZC5zeW5jXCI6XCJnYWxsZXJ5SWRcIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHJpbnRlclBob3RvTW9kYWxJbmZvLnN5bmNcIjpcInByaW50ZXJQaG90b01vZGFsSW5mb1wifSxcInB1Ymxpc2hTdWNjXCI6e30sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCIsXCJ2LW9uOmNsZWFyUHVibGlzaEFmdGVySW5mb1wiOlwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIixcInYtb246cHVibGlzaFByaW50UGhvdG9cIjpcInB1Ymxpc2hQcmludFBob3RvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgcHVibGlzaFN1Y2M6IHB1Ymxpc2hTdWNjLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluLCBmb3JtU3VibWl0TWl4aW4sIHJlZnJlc2hJbmRleE1peGluLCBzaGFyZUNvbm5lY3RNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW1JZHgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhc3luYyBkb3duSW1hZ2UoKSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiL6L29JylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5LiL6L295oiQ5YqfJylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4i+i9veWksei0pScpXG4gICAgICB9XG4gICAgfSxcbiAgICBjbGVhclN3aXBlcigpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gMFxuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS1wcmV2aWV3LS0tLS0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zLCBpZHgpXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gaWR4XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMucmVmcmVzaEdhbGxlcnkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvKCkge1xuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbnVsbFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSB0cnVlXG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBudWxsXG4gICAgICB0aGlzLnB1Ymxpc2hQaG90b0luZm8gPSBvYmpcbiAgICAgIHRoaXMucmVmcmVzaEdhbGxlcnkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNsb3NlUHJpbnRlclBob3RvTW9kYWwoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IGZhbHNlXG4gICAgfSxcbiAgICBwdWJsaXNoUHJpbnRQaG90bygpIHtcbiAgICAgIHRoaXMuJGludm9rZSgncGhvdG9JdGVtJywgJ3ByaW50ZXJDbGljaycsIHt9LCB0aGlzLnB1Ymxpc2hQaG90b0luZm8uaWQsIHRoaXMucHVibGlzaFBob3RvSW5mby51c2VyX2lkKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0U2hhcmVGcm9tT3RoZXIodHJ1ZSwgdGhpcy5zaGFyZUNhbGxCYWNrVXJsKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG5cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHVibGlzaFBob3RvSW5mbytcIj09PT09PT09PT09PT09XCIpXG4gICAgLy8gdmFyIGltYWdlID0gKHRoaXMucHVibGlzaFBob3RvSW5mbyAmJiB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9zWzBdLnVybCkgfHwgJydcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlcy5mcm9tID09PSAnYnV0dG9uJyA/IGDmiJHlj5HluIPkuobmlrDnmoTnhafniYfvvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gLFxuICAgICAgaW1hZ2U6ICdodHRwczovL2luaW1nMDcuaml1eWFuLmluZm8vaW4vMjAxOC8wMS8xMC9CQjUyQzgzNi03N0NFLTM3M0EtRDQ4NC1CRUM5NDA1NzQ5RkIuanBnJyxcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuc2hhcmVDYWxsQmFjayh7IC4uLnJlcyxcbiAgICAgICAgc2hhcmVDYWxsQmFja1VybDogdGhpcy5zaGFyZUNhbGxCYWNrVXJsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZWZyZXNoR2FsbGVyeSgpIHtcbiAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhZ2VzW2ldLmRhdGEucGFnZU5hbWUgPT09ICdnYWxsZXJ5JyAmJiAocGFnZXNbaV0uaW5pdCgpKVxuICAgIH1cbiAgfVxuICAvLyDkv67mlLnmoIfpophcbiAgY2hhbmdlR2FsbGVyeVRpdGxlKHRleHQpIHtcbiAgICB0aGlzLmdhbGxlcnlUaXRsZSA9IHRleHQgfHwgJ+ebuOWGjOivpuaDhSdcbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGVcbiAgICB9KVxuICB9XG4gIC8vIOWIneWni+WMlumFjee9rlxuICBpbml0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5nYWxsZXJ5SWQgPSBvcHRpb25zLmlkIHx8ICcxJ1xuICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gb3B0aW9ucy5pc25ldyB8fCBmYWxzZVxuICB9XG4gIC8vIOiuvue9ruebuOWGjOS/oeaBr1xuICBzZXRBbGJ1bUluZm8oZGF0YSkge1xuICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKGRhdGEuZ2FsbGVyeV9uYW1lKVxuICAgIHRoaXMuZ3JvdXBJZCA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9pZCB8fCAnJ1xuICAgIHRoaXMuZ3JvdXBVc2VyTmFtZSA9IGRhdGEuZ3JvdXBfaW5mby5ncm91cF9tYXN0ZXJfbmFtZSB8fCAnJ1xuICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGRhdGEudG9hc3RfaW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICAvLyDnm7jlhozkv6Hmga9cbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxMFxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fbW9kaWZ5X2luZm8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDJcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3B1Ymxpc2gpIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDFcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRBbGJ1bUluZm8ocmVzLmRhdGEpXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmlzR2V0TGlzdCwgdGhpcy5pc0xpc3RIYXNOZXh0KVxuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCAhdGhpcy5pc0xpc3RIYXNOZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19