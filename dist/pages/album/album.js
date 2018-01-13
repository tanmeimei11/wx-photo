'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _photoItem = require('./../../components/album/photoItem.js');

var _photoItem2 = _interopRequireDefault(_photoItem);

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
// import PreviewPhoto from '@/components/album/previewPhoto'


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
  photoItemActiveIdx: -1, // 主要是给视频用一次只能播放一个视频

  isShowNewAlbum: false, // 修改名称弹窗
  newAlbumTitle: '修改相册名称',

  isRefreshIndex: false, // 从创建过来的

  publishToastInfo: null, // 发布图片后的信息
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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishToastInfo.sync": "publishToastInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": { "v-bind:publishPhotoInfo.sync": "publishPhotoInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "publishPhoto": { "v-on:publishPhotoAndVideo": "publishPhotoAndVideo", "v-on:openNewAlbum": "openNewAlbum", "v-on:clearpublishToastInfo": "clearpublishToastInfo" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      // previewPhoto: PreviewPhoto,
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
      clearpublishToastInfo: function clearpublishToastInfo() {
        this.publishToastInfo = null;
        this.$apply();
      },
      publishPhotoAndVideo: function publishPhotoAndVideo(obj) {
        this.photoList.splice(0, 0, obj);
        this.isShowPublishSucc = true;
        this.publishToastInfo = null;
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
        var _activeVideo = this.photoList[idx];
        _activeVideo.isShowVideo = true;
        // 进入全屏播放
        _activeVideo.videoContext = _wepy2.default.createVideoContext('video' + idx);
        _activeVideo.videoContext.requestFullScreen();
      },
      hiddenVideo: function hiddenVideo(idx) {
        var _activeVideo = this.photoList[idx];
        _activeVideo.videoContext.exitFullScreen();
        _activeVideo.isShowVideo = false;
      },
      delalbum: function delalbum() {
        var _this2 = this;

        if (this.photoList.length) {
          this.toastFail('相册还有图片 不能删除');
          return;
        }
        (0, _login.request)({
          url: '/gg/gallery/del',
          data: {
            gallery_id: this.galleryId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(function (res) {
          if (res.succ) {
            _wepy2.default.redirectTo({
              url: '/pages/gallery/gallery?id=' + _this2.groupId
            });
          }
        });
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
      var image = '';
      var type = '照片';
      if (this.publishPhotoInfo) {
        image = this.publishPhotoInfo.photo_type === '0' ? this.publishPhotoInfo.photos[0].url : this.publishPhotoInfo.video.cover_url;
        this.publishPhotoInfo.photo_type === '3' && (type = '视频');
      }
      console.log(image);
      return {
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684' + type + '\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId,
        imageUrl: image || 'https://inimg02.jiuyan.info/in/2018/01/13/156D8D56-6C5B-AD0D-F6E6-4FD1A272AA13.jpg'
        // success: this.shareCallBack({ ...res,
        //   shareCallBackUrl: this.shareCallBackUrl
        // })
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
      this.publishToastInfo = data.toast_info;
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
                        item.videoContext = null;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJwaG90b0l0ZW1BY3RpdmVJZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hUb2FzdEluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJwdWJsaXNoVG9hc3RJbmZvIiwicHVibGlzaFBob3RvQW5kVmlkZW8iLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJzdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJzaG93VmlkZW8iLCJfYWN0aXZlVmlkZW8iLCJpc1Nob3dWaWRlbyIsInZpZGVvQ29udGV4dCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInJlcXVlc3RGdWxsU2NyZWVuIiwiaGlkZGVuVmlkZW8iLCJleGl0RnVsbFNjcmVlbiIsImRlbGFsYnVtIiwibGVuZ3RoIiwiZ2FsbGVyeV9pZCIsInRoZW4iLCJyZWRpcmVjdFRvIiwib3B0aW9ucyIsInNldFNoYXJlIiwiaW5pdE9wdGlvbnMiLCJnZXRTaGFyZUZyb21PdGhlciIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsImltYWdlIiwidHlwZSIsInBob3RvX3R5cGUiLCJ2aWRlbyIsImNvdmVyX3VybCIsImZyb20iLCJwYXRoIiwiaW1hZ2VVcmwiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsInNldEFsYnVtSW5mbyIsImN1cnNvciIsImxpc3QiLCJtYXAiLCJpdGVtIiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYkE7OztBQWtCQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxpQkFBZSxFQUZGLEVBRU07QUFDbkJDLFdBQVMsRUFISTtBQUliQyxhQUFXLEdBSkUsRUFJRztBQUNoQkMsZ0JBQWMsRUFMRDtBQU1iQyxlQUFhLENBQUMsQ0FORCxFQU1JOztBQUVqQkMsYUFBVyxFQVJFOztBQVViQyxzQkFBb0IsS0FWUDtBQVdiQyxpQkFBZSxFQVhGLEVBV007QUFDbkJDLG9CQUFrQixDQVpMLEVBWVE7O0FBRXJCQyxhQUFXLENBZEU7QUFlYkMsYUFBVyxLQWZFO0FBZ0JiQyxpQkFBZSxJQWhCRjs7QUFrQmJDLFlBQVUsQ0FsQkc7QUFtQmJDLGdCQUFjLENBbkJEO0FBb0JiQyxzQkFBb0IsQ0FBQyxDQXBCUixFQW9CVzs7QUFFeEJDLGtCQUFnQixLQXRCSCxFQXNCVTtBQUN2QkMsaUJBQWUsUUF2QkY7O0FBeUJiQyxrQkFBZ0IsS0F6QkgsRUF5QlU7O0FBRXZCQyxvQkFBa0IsSUEzQkwsRUEyQlc7QUFDeEJDLHFCQUFtQixLQTVCTjtBQTZCYkMsY0FBWSxLQTdCQztBQThCYkMsb0JBQWtCLElBOUJMLEVBOEJXOztBQUV4QkMsc0JBQW9CLElBaENQLEVBZ0NhO0FBQzFCQyx5QkFBdUIsSUFqQ1YsRUFpQ2dCO0FBQzdCQyxvQkFBa0I7QUFsQ0wsQ0FBZjs7SUFxQ3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZ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SixvQkFBSUEsT0FBT0EsSUFBSXpDLElBQWYsRUFBcUI7QUFDbkIsc0JBQUl5QyxJQUFJekMsSUFBSixDQUFTZ0csSUFBYixFQUFtQjtBQUNqQnZELHdCQUFJekMsSUFBSixDQUFTZ0csSUFBVCxHQUFnQnZELElBQUl6QyxJQUFKLENBQVNnRyxJQUFULENBQWNDLEdBQWQsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzFDLDBCQUFJQSxLQUFLekIsVUFBTCxLQUFvQixHQUF4QixFQUE2QjtBQUMzQnlCLDZCQUFLL0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBK0MsNkJBQUs5QyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRCw2QkFBTzhDLElBQVA7QUFDRCxxQkFOZSxDQUFoQjtBQU9EO0FBQ0QsdUJBQUtwSSxTQUFMLGdDQUNLLEtBQUtBLFNBRFYsc0JBRUsyRSxJQUFJekMsSUFBSixDQUFTZ0csSUFGZDtBQUlBLHVCQUFLOUgsU0FBTCxHQUFpQnVFLElBQUl6QyxJQUFKLENBQVMrRixNQUFULElBQW1CLEVBQXBDO0FBQ0EsdUJBQUs1SCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsdUJBQUtDLGFBQUwsR0FBcUJxRSxJQUFJekMsSUFBSixDQUFTbUcsUUFBOUI7QUFDQSx1QkFBS3pGLE1BQUw7QUFDQSx1QkFBS0ksVUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUg7Ozs7OzRGQUNvQlQsQzs7Ozs7O3VCQUNaLEtBQUs4RCxPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFuU3lCLGVBQUtpQyxJOztrQkFBbkJsSCxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbi8vIGltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBQdWJsaXNoUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCBwdWJsaXNoU3VjYyBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFN1Y2MnXG5pbXBvcnQgUHJpbnRlclBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmludGVyUGhvdG8nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IHJlZnJlc2hJbmRleE1peGluIGZyb20gJ0AvbWl4aW5zL3JlZnJlc2hJbmRleE1peGluJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJ0AvY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IHtcbiAgZG93bkludGVybmV0VXJsXG59IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcydcbmltcG9ydCBzaGFyZUNvbm5lY3RNaXhpbiBmcm9tICdAL21peGlucy9zaGFyZUNvbm5lY3RNaXhpbidcblxuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hMb2dpblxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG52YXIgcGFnZURhdGEgPSB7XG4gIHBhZ2VOYW1lOiAnYWxidW0nLFxuICBncm91cFVzZXJOYW1lOiAnJywgLy8g576k5Li75ZCN5a2XXG4gIGdyb3VwSWQ6ICcnLFxuICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgZ2FsbGVyeVRpdGxlOiAnJyxcbiAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkCAzIOS4jeiDveS/ruaUueWQjeensFxuXG4gIHBob3RvTGlzdDogW10sXG5cbiAgaXNTaG93UHJlVmlld01vZGFsOiBmYWxzZSxcbiAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICBjdXJDdXJzb3I6IDAsXG4gIGlzR2V0TGlzdDogZmFsc2UsXG4gIGlzTGlzdEhhc05leHQ6IHRydWUsXG5cbiAgcGhvdG9JZHg6IDAsXG4gIHBob3RvSXRlbUlkeDogMCxcbiAgcGhvdG9JdGVtQWN0aXZlSWR4OiAtMSwgLy8g5Li76KaB5piv57uZ6KeG6aKR55So5LiA5qyh5Y+q6IO95pKt5pS+5LiA5Liq6KeG6aKRXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcblxuICBwdWJsaXNoVG9hc3RJbmZvOiBudWxsLCAvLyDlj5HluIPlm77niYflkI7nmoTkv6Hmga9cbiAgaXNTaG93UHVibGlzaFN1Y2M6IGZhbHNlLFxuICBpc1Nob3dUaXBzOiBmYWxzZSxcbiAgcHVibGlzaFBob3RvSW5mbzogbnVsbCwgLy8g5Y+R5Zu+5LmL5ZCO55qEcGhvdG/kv6Hmga9cblxuICBpc1Nob3dQcmludGVyTW9kYWw6IHRydWUsIC8vIOaYr+WQpuWxleekuui3s+i9rOaJk+WNsOeahOW8ueeql1xuICBwcmludGVyUGhvdG9Nb2RhbEluZm86IG51bGwsIC8vIOi3s+i9rOaJk+WNsOeahOW8ueeql+S/oeaBr1xuICBzaGFyZUNhbGxCYWNrVXJsOiAnL2dnL2dyb3VwL2pvaW4nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5QXV0aC5zeW5jXCI6XCJnYWxsZXJ5QXV0aFwiLFwidi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnB1Ymxpc2hUb2FzdEluZm8uc3luY1wiOlwicHVibGlzaFRvYXN0SW5mb1wiLFwidi1iaW5kOmdyb3VwVXNlck5hbWUuc3luY1wiOlwiZ3JvdXBVc2VyTmFtZVwiLFwidi1iaW5kOmlzU2hvd1RpcHMuc3luY1wiOlwiaXNTaG93VGlwc1wiLFwidi1iaW5kOmdhbGxlcnlJZC5zeW5jXCI6XCJnYWxsZXJ5SWRcIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHJpbnRlclBob3RvTW9kYWxJbmZvLnN5bmNcIjpcInByaW50ZXJQaG90b01vZGFsSW5mb1wifSxcInB1Ymxpc2hTdWNjXCI6e1widi1iaW5kOnB1Ymxpc2hQaG90b0luZm8uc3luY1wiOlwicHVibGlzaFBob3RvSW5mb1wifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCIsXCJ2LW9uOnBob3RvWmFuQ2hhbmdlXCI6XCJwaG90b1phbkNoYW5nZVwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246cHVibGlzaFBob3RvQW5kVmlkZW9cIjpcInB1Ymxpc2hQaG90b0FuZFZpZGVvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCIsXCJ2LW9uOmNsZWFycHVibGlzaFRvYXN0SW5mb1wiOlwiY2xlYXJwdWJsaXNoVG9hc3RJbmZvXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIixcInYtb246cHVibGlzaFByaW50UGhvdG9cIjpcInB1Ymxpc2hQcmludFBob3RvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgLy8gcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgcHVibGlzaFN1Y2M6IHB1Ymxpc2hTdWNjLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluLCBmb3JtU3VibWl0TWl4aW4sIHJlZnJlc2hJbmRleE1peGluLCBzaGFyZUNvbm5lY3RNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW1JZHgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhc3luYyBkb3duSW1hZ2UoKSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiL6L29JylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5LiL6L295oiQ5YqfJylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4i+i9veWksei0pScpXG4gICAgICB9XG4gICAgfSxcbiAgICBjbGVhclN3aXBlcigpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gMFxuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS1wcmV2aWV3LS0tLS0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zLCBpZHgpXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gaWR4XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMucmVmcmVzaEdhbGxlcnkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xlYXJwdWJsaXNoVG9hc3RJbmZvKCkge1xuICAgICAgdGhpcy5wdWJsaXNoVG9hc3RJbmZvID0gbnVsbFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvQW5kVmlkZW8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IHRydWVcbiAgICAgIHRoaXMucHVibGlzaFRvYXN0SW5mbyA9IG51bGxcbiAgICAgIHRoaXMucHVibGlzaFBob3RvSW5mbyA9IG9ialxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVB1Ymxpc2hTdWNjKCkge1xuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgY2xvc2VQcmludGVyUGhvdG9Nb2RhbCgpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gZmFsc2VcbiAgICB9LFxuICAgIHB1Ymxpc2hQcmludFBob3RvKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCdwaG90b0l0ZW0nLCAncHJpbnRlckNsaWNrJywge30sIHRoaXMucHVibGlzaFBob3RvSW5mby5pZCwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnVzZXJfaWQpXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3VwZGF0ZW5hbWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkv67mlLnlpLHotKUnKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S/ruaUueaIkOWKnycpXG4gICAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHRpdGxlKVxuICAgICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhvdG9aYW5DaGFuZ2UoaWR4LCB6YW5MaXN0KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phbiA9ICF0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phblxuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS56YW5fbGlzdCA9IHphbkxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG5cbiAgfVxuICBldmVudHMgPSB7XG4gICAgc2hvd1ZpZGVvKGlkeCkge1xuICAgICAgY29uc29sZS5sb2coaWR4KVxuICAgICAgdmFyIF9hY3RpdmVWaWRlbyA9IHRoaXMucGhvdG9MaXN0W2lkeF1cbiAgICAgIF9hY3RpdmVWaWRlby5pc1Nob3dWaWRlbyA9IHRydWVcbiAgICAgIC8vIOi/m+WFpeWFqOWxj+aSreaUvlxuICAgICAgX2FjdGl2ZVZpZGVvLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KGB2aWRlbyR7aWR4fWApXG4gICAgICBfYWN0aXZlVmlkZW8udmlkZW9Db250ZXh0LnJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9LFxuICAgIGhpZGRlblZpZGVvKGlkeCkge1xuICAgICAgdmFyIF9hY3RpdmVWaWRlbyA9IHRoaXMucGhvdG9MaXN0W2lkeF1cbiAgICAgIF9hY3RpdmVWaWRlby52aWRlb0NvbnRleHQuZXhpdEZ1bGxTY3JlZW4oKVxuICAgICAgX2FjdGl2ZVZpZGVvLmlzU2hvd1ZpZGVvID0gZmFsc2VcbiAgICB9LFxuICAgIGRlbGFsYnVtKCkge1xuICAgICAgaWYgKHRoaXMucGhvdG9MaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn55u45YaM6L+Y5pyJ5Zu+54mHIOS4jeiDveWIoOmZpCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2RlbCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLnNldFNoYXJlKClcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0U2hhcmVGcm9tT3RoZXIodHJ1ZSwgdGhpcy5zaGFyZUNhbGxCYWNrVXJsKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cblxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgdmFyIGltYWdlID0gJydcbiAgICB2YXIgdHlwZSA9ICfnhafniYcnXG4gICAgaWYgKHRoaXMucHVibGlzaFBob3RvSW5mbykge1xuICAgICAgaW1hZ2UgPSB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9fdHlwZSA9PT0gJzAnID8gdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnBob3Rvc1swXS51cmwgOiB0aGlzLnB1Ymxpc2hQaG90b0luZm8udmlkZW8uY292ZXJfdXJsXG4gICAgICB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9fdHlwZSA9PT0gJzMnICYmICh0eXBlID0gJ+inhumikScpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGltYWdlKVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahCR7dHlwZX3vvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gLFxuICAgICAgaW1hZ2VVcmw6IGltYWdlIHx8ICdodHRwczovL2luaW1nMDIuaml1eWFuLmluZm8vaW4vMjAxOC8wMS8xMy8xNTZEOEQ1Ni02QzVCLUFEMEQtRjZFNi00RkQxQTI3MkFBMTMuanBnJ1xuICAgICAgLy8gc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgLy8gICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIC8vIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoVG9hc3RJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgaWYgKHJlcy5kYXRhLmxpc3QpIHtcbiAgICAgICAgcmVzLmRhdGEubGlzdCA9IHJlcy5kYXRhLmxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ucGhvdG9fdHlwZSA9PT0gJzMnKSB7XG4gICAgICAgICAgICBpdGVtLmlzU2hvd1ZpZGVvID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udmlkZW9Db250ZXh0ID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=