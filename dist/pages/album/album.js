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

                this.setShare();
                this.initOptions(options);
                _context3.next = 6;
                return (0, _login.wxLogin)();

              case 6:
                this.loadingIn('加载中');
                _context3.next = 9;
                return this.getShareFromOther(true, this.shareCallBackUrl);

              case 9:
                _context3.next = 11;
                return this.getGalleryAuth();

              case 11:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                this.loadingOut();
                _context3.next = 19;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 15]]);
      }));

      function onLoad(_x2) {
        return _ref4.apply(this, arguments);
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
      this.isShowPublishSucc = false;
      var image = this.publishPhotoInfo && this.publishPhotoInfo.photos[0].url;
      console.log(image);
      return {
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684\u7167\u7247\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId,
        imageUrl: image || 'https://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsInNldFNoYXJlIiwiaW5pdE9wdGlvbnMiLCJnZXRTaGFyZUZyb21PdGhlciIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsImltYWdlIiwiZnJvbSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJzaGFyZUNhbGxCYWNrIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJpIiwibGVuZ3RoIiwiaW5pdCIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJpc25ldyIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2luZm8iLCJncm91cF9pZCIsImdyb3VwX21hc3Rlcl9uYW1lIiwidG9hc3RfaW5mbyIsImdhbGxlcnlfaWQiLCJjYW5fbW9kaWZ5X2luZm8iLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwic2V0QWxidW1JbmZvIiwiY3Vyc29yIiwibGlzdCIsImhhc19uZXh0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FB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Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs0RkFDb0JULEM7Ozs7Ozt1QkFDWixLQUFLZ0QsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaFB5QixlQUFLK0IsSTs7a0JBQW5CbkcsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgUHVibGlzaFBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgcHVibGlzaFN1Y2MgZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hTdWNjJ1xuaW1wb3J0IFByaW50ZXJQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJpbnRlclBob3RvJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCByZWZyZXNoSW5kZXhNaXhpbiBmcm9tICdAL21peGlucy9yZWZyZXNoSW5kZXhNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcbmltcG9ydCB7XG4gIGRvd25JbnRlcm5ldFVybFxufSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuXG4gIGlzU2hvd1ByZVZpZXdNb2RhbDogZmFsc2UsXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIHBob3RvSWR4OiAwLFxuICBwaG90b0l0ZW1JZHg6IDAsXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcblxuICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsLCAvLyDlj5HluIPlm77niYflkI7nmoTkv6Hmga9cbiAgaXNTaG93UHVibGlzaFN1Y2M6IGZhbHNlLFxuICBpc1Nob3dUaXBzOiBmYWxzZSxcbiAgcHVibGlzaFBob3RvSW5mbzogbnVsbCwgLy8g5Y+R5Zu+5LmL5ZCO55qEcGhvdG/kv6Hmga9cblxuICBpc1Nob3dQcmludGVyTW9kYWw6IHRydWUsIC8vIOaYr+WQpuWxleekuui3s+i9rOaJk+WNsOeahOW8ueeql1xuICBwcmludGVyUGhvdG9Nb2RhbEluZm86IG51bGwsIC8vIOi3s+i9rOaJk+WNsOeahOW8ueeql+S/oeaBr1xuICBzaGFyZUNhbGxCYWNrVXJsOiAnL2dnL2dhbGxlcnkvam9pbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHVibGlzaFBob3RvXCI6e1widi1iaW5kOmdhbGxlcnlBdXRoLnN5bmNcIjpcImdhbGxlcnlBdXRoXCIsXCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCIsXCJ2LWJpbmQ6Z3JvdXBVc2VyTmFtZS5zeW5jXCI6XCJncm91cFVzZXJOYW1lXCIsXCJ2LWJpbmQ6aXNTaG93VGlwcy5zeW5jXCI6XCJpc1Nob3dUaXBzXCIsXCJ2LWJpbmQ6Z2FsbGVyeUlkLnN5bmNcIjpcImdhbGxlcnlJZFwifSxcInByaW50ZXJQaG90b1wiOntcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwcmludGVyUGhvdG9Nb2RhbEluZm8uc3luY1wiOlwicHJpbnRlclBob3RvTW9kYWxJbmZvXCJ9LFwicHVibGlzaFN1Y2NcIjp7fSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCIsXCJ2LW9uOnBob3RvWmFuQ2hhbmdlXCI6XCJwaG90b1phbkNoYW5nZVwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246cHVibGlzaFBob3RvXCI6XCJwdWJsaXNoUGhvdG9cIixcInYtb246b3Blbk5ld0FsYnVtXCI6XCJvcGVuTmV3QWxidW1cIixcInYtb246Y2xlYXJQdWJsaXNoQWZ0ZXJJbmZvXCI6XCJjbGVhclB1Ymxpc2hBZnRlckluZm9cIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LW9uOmNsb3NlUHJpbnRlclBob3RvTW9kYWxcIjpcImNsb3NlUHJpbnRlclBob3RvTW9kYWxcIn0sXCJwdWJsaXNoU3VjY1wiOntcInYtb246Y2xvc2VQdWJsaXNoU3VjY1wiOlwiY2xvc2VQdWJsaXNoU3VjY1wiLFwidi1vbjpwdWJsaXNoUHJpbnRQaG90b1wiOlwicHVibGlzaFByaW50UGhvdG9cIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IFB1Ymxpc2hQaG90byxcbiAgICBwcmludGVyUGhvdG86IFByaW50ZXJQaG90byxcbiAgICBwdWJsaXNoU3VjYzogcHVibGlzaFN1Y2MsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW4sIHNoYXJlQ29ubmVjdE1peGluXVxuICAvLyBkYXRhXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICBzd2lwZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbUlkeClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwodGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSAwXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLXByZXZpZXctLS0tLScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3MsIGlkeClcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBpZHhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbGVhclB1Ymxpc2hBZnRlckluZm8oKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBudWxsXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IHRydWVcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMucHVibGlzaFBob3RvSW5mbyA9IG9ialxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVB1Ymxpc2hTdWNjKCkge1xuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgY2xvc2VQcmludGVyUGhvdG9Nb2RhbCgpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gZmFsc2VcbiAgICB9LFxuICAgIHB1Ymxpc2hQcmludFBob3RvKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCdwaG90b0l0ZW0nLCAncHJpbnRlckNsaWNrJywge30sIHRoaXMucHVibGlzaFBob3RvSW5mby5pZCwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnVzZXJfaWQpXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3VwZGF0ZW5hbWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkv67mlLnlpLHotKUnKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S/ruaUueaIkOWKnycpXG4gICAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHRpdGxlKVxuICAgICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhvdG9aYW5DaGFuZ2UoaWR4LCB6YW5MaXN0KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phbiA9ICF0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phblxuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS56YW5fbGlzdCA9IHphbkxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLnNldFNoYXJlKClcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUsIHRoaXMuc2hhcmVDYWxsQmFja1VybClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIHZhciBpbWFnZSA9IHRoaXMucHVibGlzaFBob3RvSW5mbyAmJiB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9zWzBdLnVybFxuICAgIGNvbnNvbGUubG9nKGltYWdlKVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahOeFp+eJh++8jOW/q+adpeeci+eci+WQp2AgOiBg6YKA6K+35L2g5p+l55yL5pys576k55u45YaM44CKJHt0aGlzLmdhbGxlcnlUaXRsZX3jgItgLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWAsXG4gICAgICBpbWFnZVVybDogaW1hZ2UgfHwgJ2h0dHBzOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=