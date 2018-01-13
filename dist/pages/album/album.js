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
                return this.getShareFromOther(true, this.shareCallBackUrl, {
                  galleryID: options.id
                });

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJwaG90b0l0ZW1BY3RpdmVJZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hUb2FzdEluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJwdWJsaXNoVG9hc3RJbmZvIiwicHVibGlzaFBob3RvQW5kVmlkZW8iLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJzdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJzaG93VmlkZW8iLCJfYWN0aXZlVmlkZW8iLCJpc1Nob3dWaWRlbyIsInZpZGVvQ29udGV4dCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInJlcXVlc3RGdWxsU2NyZWVuIiwiaGlkZGVuVmlkZW8iLCJleGl0RnVsbFNjcmVlbiIsImRlbGFsYnVtIiwibGVuZ3RoIiwiZ2FsbGVyeV9pZCIsInRoZW4iLCJyZWRpcmVjdFRvIiwib3B0aW9ucyIsInNldFNoYXJlIiwiaW5pdE9wdGlvbnMiLCJnZXRTaGFyZUZyb21PdGhlciIsImdhbGxlcnlJRCIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsImltYWdlIiwidHlwZSIsInBob3RvX3R5cGUiLCJ2aWRlbyIsImNvdmVyX3VybCIsImZyb20iLCJwYXRoIiwiaW1hZ2VVcmwiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImkiLCJpbml0IiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImlzbmV3IiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaW5mbyIsImdyb3VwX2lkIiwiZ3JvdXBfbWFzdGVyX25hbWUiLCJ0b2FzdF9pbmZvIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsInNldEFsYnVtSW5mbyIsImN1cnNvciIsImxpc3QiLCJtYXAiLCJpdGVtIiwiaGFzX25leHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYkE7OztBQWtCQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxpQkFBZSxFQUZGLEVBRU07QUFDbkJDLFdBQVMsRUFISTtBQUliQyxhQUFXLEdBSkUsRUFJRztBQUNoQkMsZ0JBQWMsRUFMRDtBQU1iQyxlQUFhLENBQUMsQ0FORCxFQU1JOztBQUVqQkMsYUFBVyxFQVJFOztBQVViQyxzQkFBb0IsS0FWUDtBQVdiQyxpQkFBZSxFQVhGLEVBV007QUFDbkJDLG9CQUFrQixDQVpMLEVBWVE7O0FBRXJCQyxhQUFXLENBZEU7QUFlYkMsYUFBVyxLQWZFO0FBZ0JiQyxpQkFBZSxJQWhCRjs7QUFrQmJDLFlBQVUsQ0FsQkc7QUFtQmJDLGdCQUFjLENBbkJEO0FBb0JiQyxzQkFBb0IsQ0FBQyxDQXBCUixFQW9CVzs7QUFFeEJDLGtCQUFnQixLQXRCSCxFQXNCVTtBQUN2QkMsaUJBQWUsUUF2QkY7O0FBeUJiQyxrQkFBZ0IsS0F6QkgsRUF5QlU7O0FBRXZCQyxvQkFBa0IsSUEzQkwsRUEyQlc7QUFDeEJDLHFCQUFtQixLQTVCTjtBQTZCYkMsY0FBWSxLQTdCQztBQThCYkMsb0JBQWtCLElBOUJMLEVBOEJXOztBQUV4QkMsc0JBQW9CLElBaENQLEVBZ0NhO0FBQzFCQyx5QkFBdUIsSUFqQ1YsRUFpQ2dCO0FBQzdCQyxvQkFBa0I7QUFsQ0wsQ0FBZjs7SUFxQ3FCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdB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RUpxSSw0QkFBUSxLQUFLOUg7QUFGVDtBQUZnQixpQkFBUixDOzs7QUFBWnVFLG1COztBQU9KLG9CQUFJQSxPQUFPQSxJQUFJekMsSUFBZixFQUFxQjtBQUNuQixzQkFBSXlDLElBQUl6QyxJQUFKLENBQVNpRyxJQUFiLEVBQW1CO0FBQ2pCeEQsd0JBQUl6QyxJQUFKLENBQVNpRyxJQUFULEdBQWdCeEQsSUFBSXpDLElBQUosQ0FBU2lHLElBQVQsQ0FBY0MsR0FBZCxDQUFrQixVQUFDQyxJQUFELEVBQVU7QUFDMUMsMEJBQUlBLEtBQUt6QixVQUFMLEtBQW9CLEdBQXhCLEVBQTZCO0FBQzNCeUIsNkJBQUtoRCxXQUFMLEdBQW1CLEtBQW5CO0FBQ0FnRCw2QkFBSy9DLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDtBQUNELDZCQUFPK0MsSUFBUDtBQUNELHFCQU5lLENBQWhCO0FBT0Q7QUFDRCx1QkFBS3JJLFNBQUwsZ0NBQ0ssS0FBS0EsU0FEVixzQkFFSzJFLElBQUl6QyxJQUFKLENBQVNpRyxJQUZkO0FBSUEsdUJBQUsvSCxTQUFMLEdBQWlCdUUsSUFBSXpDLElBQUosQ0FBU2dHLE1BQVQsSUFBbUIsRUFBcEM7QUFDQSx1QkFBSzdILFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsYUFBTCxHQUFxQnFFLElBQUl6QyxJQUFKLENBQVNvRyxRQUE5QjtBQUNBLHVCQUFLMUYsTUFBTDtBQUNBLHVCQUFLSSxVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7NEZBQ29CVCxDOzs7Ozs7dUJBQ1osS0FBSytELE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJTeUIsZUFBS2lDLEk7O2tCQUFuQm5ILEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuLy8gaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQge1xuICBkb3duSW50ZXJuZXRVcmxcbn0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJ1xuaW1wb3J0IHNoYXJlQ29ubmVjdE1peGluIGZyb20gJ0AvbWl4aW5zL3NoYXJlQ29ubmVjdE1peGluJ1xuXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdhbGJ1bScsXG4gIGdyb3VwVXNlck5hbWU6ICcnLCAvLyDnvqTkuLvlkI3lrZdcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcblxuICBpc1Nob3dQcmVWaWV3TW9kYWw6IGZhbHNlLFxuICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gIGN1ckN1cnNvcjogMCxcbiAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICBwaG90b0lkeDogMCxcbiAgcGhvdG9JdGVtSWR4OiAwLFxuICBwaG90b0l0ZW1BY3RpdmVJZHg6IC0xLCAvLyDkuLvopoHmmK/nu5nop4bpopHnlKjkuIDmrKHlj6rog73mkq3mlL7kuIDkuKrop4bpopFcblxuICBpc1Nob3dOZXdBbGJ1bTogZmFsc2UsIC8vIOS/ruaUueWQjeensOW8ueeql1xuICBuZXdBbGJ1bVRpdGxlOiAn5L+u5pS555u45YaM5ZCN56ewJyxcblxuICBpc1JlZnJlc2hJbmRleDogZmFsc2UsIC8vIOS7juWIm+W7uui/h+adpeeahFxuXG4gIHB1Ymxpc2hUb2FzdEluZm86IG51bGwsIC8vIOWPkeW4g+WbvueJh+WQjueahOS/oeaBr1xuICBpc1Nob3dQdWJsaXNoU3VjYzogZmFsc2UsXG4gIGlzU2hvd1RpcHM6IGZhbHNlLFxuICBwdWJsaXNoUGhvdG9JbmZvOiBudWxsLCAvLyDlj5Hlm77kuYvlkI7nmoRwaG90b+S/oeaBr1xuXG4gIGlzU2hvd1ByaW50ZXJNb2RhbDogdHJ1ZSwgLy8g5piv5ZCm5bGV56S66Lez6L2s5omT5Y2w55qE5by556qXXG4gIHByaW50ZXJQaG90b01vZGFsSW5mbzogbnVsbCwgLy8g6Lez6L2s5omT5Y2w55qE5by556qX5L+h5oGvXG4gIHNoYXJlQ2FsbEJhY2tVcmw6ICcvZ2cvZ3JvdXAvam9pbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHVibGlzaFBob3RvXCI6e1widi1iaW5kOmdhbGxlcnlBdXRoLnN5bmNcIjpcImdhbGxlcnlBdXRoXCIsXCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHVibGlzaFRvYXN0SW5mby5zeW5jXCI6XCJwdWJsaXNoVG9hc3RJbmZvXCIsXCJ2LWJpbmQ6Z3JvdXBVc2VyTmFtZS5zeW5jXCI6XCJncm91cFVzZXJOYW1lXCIsXCJ2LWJpbmQ6aXNTaG93VGlwcy5zeW5jXCI6XCJpc1Nob3dUaXBzXCIsXCJ2LWJpbmQ6Z2FsbGVyeUlkLnN5bmNcIjpcImdhbGxlcnlJZFwifSxcInByaW50ZXJQaG90b1wiOntcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwcmludGVyUGhvdG9Nb2RhbEluZm8uc3luY1wiOlwicHJpbnRlclBob3RvTW9kYWxJbmZvXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LWJpbmQ6cHVibGlzaFBob3RvSW5mby5zeW5jXCI6XCJwdWJsaXNoUGhvdG9JbmZvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9BbmRWaWRlb1wiOlwicHVibGlzaFBob3RvQW5kVmlkZW9cIixcInYtb246b3Blbk5ld0FsYnVtXCI6XCJvcGVuTmV3QWxidW1cIixcInYtb246Y2xlYXJwdWJsaXNoVG9hc3RJbmZvXCI6XCJjbGVhcnB1Ymxpc2hUb2FzdEluZm9cIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LW9uOmNsb3NlUHJpbnRlclBob3RvTW9kYWxcIjpcImNsb3NlUHJpbnRlclBob3RvTW9kYWxcIn0sXCJwdWJsaXNoU3VjY1wiOntcInYtb246Y2xvc2VQdWJsaXNoU3VjY1wiOlwiY2xvc2VQdWJsaXNoU3VjY1wiLFwidi1vbjpwdWJsaXNoUHJpbnRQaG90b1wiOlwicHVibGlzaFByaW50UGhvdG9cIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICAvLyBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IFB1Ymxpc2hQaG90byxcbiAgICBwcmludGVyUGhvdG86IFByaW50ZXJQaG90byxcbiAgICBwdWJsaXNoU3VjYzogcHVibGlzaFN1Y2MsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW4sIHNoYXJlQ29ubmVjdE1peGluXVxuICAvLyBkYXRhXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICBzd2lwZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBob3RvSXRlbUlkeClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIGRvd25JbWFnZSgpIHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfmraPlnKjkuIvovb0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwodGhpcy5wcmV2aWV3UGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkuIvovb3miJDlip8nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5LiL6L295aSx6LSlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyU3dpcGVyKCkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSAwXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLXByZXZpZXctLS0tLScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3MsIGlkeClcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBpZHhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy5yZWZyZXNoR2FsbGVyeSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbGVhcnB1Ymxpc2hUb2FzdEluZm8oKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUb2FzdEluZm8gPSBudWxsXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG9BbmRWaWRlbyhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoVG9hc3RJbmZvID0gbnVsbFxuICAgICAgdGhpcy5wdWJsaXNoUGhvdG9JbmZvID0gb2JqXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlUHVibGlzaFN1Y2MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gZmFsc2VcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjbG9zZVByaW50ZXJQaG90b01vZGFsKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBmYWxzZVxuICAgIH0sXG4gICAgcHVibGlzaFByaW50UGhvdG8oKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ3Bob3RvSXRlbScsICdwcmludGVyQ2xpY2snLCB7fSwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLmlkLCB0aGlzLnB1Ymxpc2hQaG90b0luZm8udXNlcl9pZClcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwaG90b1phbkNoYW5nZShpZHgsIHphbkxpc3QpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuID0gIXRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuXG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFuTGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cblxuICB9XG4gIGV2ZW50cyA9IHtcbiAgICBzaG93VmlkZW8oaWR4KSB7XG4gICAgICBjb25zb2xlLmxvZyhpZHgpXG4gICAgICB2YXIgX2FjdGl2ZVZpZGVvID0gdGhpcy5waG90b0xpc3RbaWR4XVxuICAgICAgX2FjdGl2ZVZpZGVvLmlzU2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgLy8g6L+b5YWl5YWo5bGP5pKt5pS+XG4gICAgICBfYWN0aXZlVmlkZW8udmlkZW9Db250ZXh0ID0gd2VweS5jcmVhdGVWaWRlb0NvbnRleHQoYHZpZGVvJHtpZHh9YClcbiAgICAgIF9hY3RpdmVWaWRlby52aWRlb0NvbnRleHQucmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0sXG4gICAgaGlkZGVuVmlkZW8oaWR4KSB7XG4gICAgICB2YXIgX2FjdGl2ZVZpZGVvID0gdGhpcy5waG90b0xpc3RbaWR4XVxuICAgICAgX2FjdGl2ZVZpZGVvLnZpZGVvQ29udGV4dC5leGl0RnVsbFNjcmVlbigpXG4gICAgICBfYWN0aXZlVmlkZW8uaXNTaG93VmlkZW8gPSBmYWxzZVxuICAgIH0sXG4gICAgZGVsYWxidW0oKSB7XG4gICAgICBpZiAodGhpcy5waG90b0xpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfnm7jlhozov5jmnInlm77niYcg5LiN6IO95Yig6ZmkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvZGVsJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2dhbGxlcnkvZ2FsbGVyeT9pZD0ke3RoaXMuZ3JvdXBJZH1gXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRoaXMuc2V0U2hhcmUoKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRTaGFyZUZyb21PdGhlcih0cnVlLCB0aGlzLnNoYXJlQ2FsbEJhY2tVcmwsIHtcbiAgICAgICAgZ2FsbGVyeUlEOiBvcHRpb25zLmlkXG4gICAgICB9KVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cblxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgdmFyIGltYWdlID0gJydcbiAgICB2YXIgdHlwZSA9ICfnhafniYcnXG4gICAgaWYgKHRoaXMucHVibGlzaFBob3RvSW5mbykge1xuICAgICAgaW1hZ2UgPSB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9fdHlwZSA9PT0gJzAnID8gdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnBob3Rvc1swXS51cmwgOiB0aGlzLnB1Ymxpc2hQaG90b0luZm8udmlkZW8uY292ZXJfdXJsXG4gICAgICB0aGlzLnB1Ymxpc2hQaG90b0luZm8ucGhvdG9fdHlwZSA9PT0gJzMnICYmICh0eXBlID0gJ+inhumikScpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGltYWdlKVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogcmVzLmZyb20gPT09ICdidXR0b24nID8gYOaIkeWPkeW4g+S6huaWsOeahCR7dHlwZX3vvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gLFxuICAgICAgaW1hZ2VVcmw6IGltYWdlIHx8ICdodHRwczovL2luaW1nMDIuaml1eWFuLmluZm8vaW4vMjAxOC8wMS8xMy8xNTZEOEQ1Ni02QzVCLUFEMEQtRjZFNi00RkQxQTI3MkFBMTMuanBnJ1xuICAgICAgLy8gc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgLy8gICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIC8vIH0pXG4gICAgfVxuICB9XG4gIHJlZnJlc2hHYWxsZXJ5KCkge1xuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFnZXNbaV0uZGF0YS5wYWdlTmFtZSA9PT0gJ2dhbGxlcnknICYmIChwYWdlc1tpXS5pbml0KCkpXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoVG9hc3RJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgaWYgKHJlcy5kYXRhLmxpc3QpIHtcbiAgICAgICAgcmVzLmRhdGEubGlzdCA9IHJlcy5kYXRhLmxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ucGhvdG9fdHlwZSA9PT0gJzMnKSB7XG4gICAgICAgICAgICBpdGVtLmlzU2hvd1ZpZGVvID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udmlkZW9Db250ZXh0ID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=