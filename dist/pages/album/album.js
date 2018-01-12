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
  shareCallBackUrl: '/gg/group/join'
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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": { "v-bind:publishAfterInfo.sync": "publishAfterInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "publishPhoto": { "v-on:publishPhotoAndVideo": "publishPhotoAndVideo", "v-on:openNewAlbum": "openNewAlbum", "v-on:clearPublishAfterInfo": "clearPublishAfterInfo" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
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
      publishPhotoAndVideo: function publishPhotoAndVideo(obj) {
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
    }, _this.events = {
      showVideo: function showVideo(idx) {
        console.log(idx);
        this.photoList[idx].isShowVideo = true;
      },
      hiddenVideo: function hiddenVideo(idx) {
        console.log(idx);
        this.photoList[idx].isShowVideo = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
                this.setShare();
                _context3.prev = 2;

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
                _context3.t0 = _context3['catch'](2);

                this.loadingOut();
                this.toastFail('加载失败');

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 15]]);
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
                  if (res.data.list) {
                    res.data.list = res.data.list.map(function (item) {
                      if (item.photo_type === '3') {
                        item.isShowVideo = false;
                      }
                      return item;
                    });
                  }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwicHVibGlzaFBob3RvQW5kVmlkZW8iLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJzdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJzaG93VmlkZW8iLCJpc1Nob3dWaWRlbyIsImhpZGRlblZpZGVvIiwib3B0aW9ucyIsInNldFNoYXJlIiwiaW5pdE9wdGlvbnMiLCJnZXRTaGFyZUZyb21PdGhlciIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsImltYWdlIiwiZnJvbSIsInBhdGgiLCJpbWFnZVVybCIsInN1Y2Nlc3MiLCJzaGFyZUNhbGxCYWNrIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJpIiwibGVuZ3RoIiwiaW5pdCIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJpc25ldyIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2luZm8iLCJncm91cF9pZCIsImdyb3VwX21hc3Rlcl9uYW1lIiwidG9hc3RfaW5mbyIsImdhbGxlcnlfaWQiLCJjYW5fbW9kaWZ5X2luZm8iLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwic2V0QWxidW1JbmZvIiwiY3Vyc29yIiwibGlzdCIsIm1hcCIsIml0ZW0iLCJwaG90b190eXBlIiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztB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RixnQ0FBWSxLQUFLckgsU0FEYjtBQUVKMEgsNEJBQVEsS0FBS25IO0FBRlQ7QUFGZ0IsaUJBQVIsQzs7O0FBQVp1RSxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSXpDLElBQWYsRUFBcUI7QUFDbkIsc0JBQUl5QyxJQUFJekMsSUFBSixDQUFTc0YsSUFBYixFQUFtQjtBQUNqQjdDLHdCQUFJekMsSUFBSixDQUFTc0YsSUFBVCxHQUFnQjdDLElBQUl6QyxJQUFKLENBQVNzRixJQUFULENBQWNDLEdBQWQsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzFDLDBCQUFJQSxLQUFLQyxVQUFMLEtBQW9CLEdBQXhCLEVBQTZCO0FBQzNCRCw2QkFBS3RDLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNELDZCQUFPc0MsSUFBUDtBQUNELHFCQUxlLENBQWhCO0FBTUQ7QUFDRCx1QkFBSzFILFNBQUwsZ0NBQ0ssS0FBS0EsU0FEVixzQkFFSzJFLElBQUl6QyxJQUFKLENBQVNzRixJQUZkO0FBSUEsdUJBQUtwSCxTQUFMLEdBQWlCdUUsSUFBSXpDLElBQUosQ0FBU3FGLE1BQVQsSUFBbUIsRUFBcEM7QUFDQSx1QkFBS2xILFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsYUFBTCxHQUFxQnFFLElBQUl6QyxJQUFKLENBQVMwRixRQUE5QjtBQUNBLHVCQUFLaEYsTUFBTDtBQUNBLHVCQUFLSSxVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7NEZBQ29CVCxDOzs7Ozs7dUJBQ1osS0FBS29ELE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWxReUIsZUFBS2tDLEk7O2tCQUFuQjFHLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQge1xuICBkb3duSW50ZXJuZXRVcmxcbn0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJ1xuaW1wb3J0IHNoYXJlQ29ubmVjdE1peGluIGZyb20gJ0AvbWl4aW5zL3NoYXJlQ29ubmVjdE1peGluJ1xuXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdhbGJ1bScsXG4gIGdyb3VwVXNlck5hbWU6ICcnLCAvLyDnvqTkuLvlkI3lrZdcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcblxuICBpc1Nob3dQcmVWaWV3TW9kYWw6IGZhbHNlLFxuICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gIGN1ckN1cnNvcjogMCxcbiAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICBwaG90b0lkeDogMCxcbiAgcGhvdG9JdGVtSWR4OiAwLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsLCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbiAgc2hhcmVDYWxsQmFja1VybDogJy9nZy9ncm91cC9qb2luJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOntcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b0FuZFZpZGVvXCI6XCJwdWJsaXNoUGhvdG9BbmRWaWRlb1wiLFwidi1vbjpvcGVuTmV3QWxidW1cIjpcIm9wZW5OZXdBbGJ1bVwiLFwidi1vbjpjbGVhclB1Ymxpc2hBZnRlckluZm9cIjpcImNsZWFyUHVibGlzaEFmdGVySW5mb1wifSxcInByaW50ZXJQaG90b1wiOntcInYtb246Y2xvc2VQcmludGVyUGhvdG9Nb2RhbFwiOlwiY2xvc2VQcmludGVyUGhvdG9Nb2RhbFwifSxcInB1Ymxpc2hTdWNjXCI6e1widi1vbjpjbG9zZVB1Ymxpc2hTdWNjXCI6XCJjbG9zZVB1Ymxpc2hTdWNjXCIsXCJ2LW9uOnB1Ymxpc2hQcmludFBob3RvXCI6XCJwdWJsaXNoUHJpbnRQaG90b1wifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogUHVibGlzaFBob3RvLFxuICAgIHByaW50ZXJQaG90bzogUHJpbnRlclBob3RvLFxuICAgIHB1Ymxpc2hTdWNjOiBwdWJsaXNoU3VjYyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbiwgZm9ybVN1Ym1pdE1peGluLCByZWZyZXNoSW5kZXhNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGhvdG9JdGVtSWR4KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4i+i9vScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S4i+i9veaIkOWKnycpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkuIvovb3lpLHotKUnKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IDBcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0tcHJldmlldy0tLS0tJylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3RvcywgaWR4KVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsZWFyUHVibGlzaEFmdGVySW5mbygpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90b0FuZFZpZGVvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSB0cnVlXG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBudWxsXG4gICAgICB0aGlzLnB1Ymxpc2hQaG90b0luZm8gPSBvYmpcbiAgICAgIHRoaXMucmVmcmVzaEdhbGxlcnkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNsb3NlUHJpbnRlclBob3RvTW9kYWwoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IGZhbHNlXG4gICAgfSxcbiAgICBwdWJsaXNoUHJpbnRQaG90bygpIHtcbiAgICAgIHRoaXMuJGludm9rZSgncGhvdG9JdGVtJywgJ3ByaW50ZXJDbGljaycsIHt9LCB0aGlzLnB1Ymxpc2hQaG90b0luZm8uaWQsIHRoaXMucHVibGlzaFBob3RvSW5mby51c2VyX2lkKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuXG4gIH1cbiAgZXZlbnRzID0ge1xuICAgIHNob3dWaWRlbyhpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkeClcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNTaG93VmlkZW8gPSB0cnVlXG4gICAgfSxcbiAgICBoaWRkZW5WaWRlbyhpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkeClcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNTaG93VmlkZW8gPSBmYWxzZVxuICAgIH1cbiAgfVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5zZXRTaGFyZSgpXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4TG9naW4oKVxuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldFNoYXJlRnJvbU90aGVyKHRydWUsIHRoaXMuc2hhcmVDYWxsQmFja1VybClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMudG9hc3RGYWlsKCfliqDovb3lpLHotKUnKVxuICAgIH1cbiAgfVxuICBzZXRTaGFyZSgpIHtcbiAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZSAvLyDopoHmsYLlsI/nqIvluo/ov5Tlm57liIbkuqvnm67moIfkv6Hmga9cbiAgICB9KVxuICB9XG5cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIHZhciBpbWFnZSA9IHRoaXMucHVibGlzaFBob3RvSW5mbyAmJiB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9zWzBdLnVybFxuICAgIGNvbnNvbGUubG9nKGltYWdlKVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahOeFp+eJh++8jOW/q+adpeeci+eci+WQp2AgOiBg6YKA6K+35L2g5p+l55yL5pys576k55u45YaM44CKJHt0aGlzLmdhbGxlcnlUaXRsZX3jgItgLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWAsXG4gICAgICBpbWFnZVVybDogaW1hZ2UgfHwgJ2h0dHBzOi8vaW5pbWcwNy5qaXV5YW4uaW5mby9pbi8yMDE4LzAxLzEwL0JCNTJDODM2LTc3Q0UtMzczQS1ENDg0LUJFQzk0MDU3NDlGQi5qcGcnLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgaWYgKHJlcy5kYXRhLmxpc3QpIHtcbiAgICAgICAgcmVzLmRhdGEubGlzdCA9IHJlcy5kYXRhLmxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ucGhvdG9fdHlwZSA9PT0gJzMnKSB7XG4gICAgICAgICAgICBpdGVtLmlzU2hvd1ZpZGVvID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19