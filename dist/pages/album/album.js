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
  photoItemActiveIdx: -1, // 主要是给视频用一次只能播放一个视频

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJwaG90b0l0ZW1BY3RpdmVJZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwic2hhcmVDYWxsQmFja1VybCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByaW50ZXJQaG90byIsInB1Ymxpc2hTdWNjIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImRvd25JbWFnZSIsImxvYWRpbmdJbiIsInVybCIsImxvYWRpbmdPdXQiLCJ0b2FzdFN1Y2MiLCJ0b2FzdEZhaWwiLCJjbGVhclN3aXBlciIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsInJlZnJlc2hHYWxsZXJ5IiwiY2xlYXJQdWJsaXNoQWZ0ZXJJbmZvIiwicHVibGlzaFBob3RvQW5kVmlkZW8iLCJvYmoiLCJjbG9zZVB1Ymxpc2hTdWNjIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJwdWJsaXNoUHJpbnRQaG90byIsIiRpbnZva2UiLCJpZCIsInVzZXJfaWQiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJzdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJzaG93VmlkZW8iLCJfYWN0aXZlVmlkZW8iLCJpc1Nob3dWaWRlbyIsInZpZGVvQ29udGV4dCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInJlcXVlc3RGdWxsU2NyZWVuIiwiaGlkZGVuVmlkZW8iLCJleGl0RnVsbFNjcmVlbiIsIm9wdGlvbnMiLCJzZXRTaGFyZSIsImluaXRPcHRpb25zIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJpbWFnZSIsImZyb20iLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwic2hhcmVDYWxsQmFjayIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiaSIsImxlbmd0aCIsImluaXQiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaXNuZXciLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pbmZvIiwiZ3JvdXBfaWQiLCJncm91cF9tYXN0ZXJfbmFtZSIsInRvYXN0X2luZm8iLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsInNldEFsYnVtSW5mbyIsImN1cnNvciIsImxpc3QiLCJtYXAiLCJpdGVtIiwicGhvdG9fdHlwZSIsImhhc19uZXh0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBSUEsV0FBVztBQUNiQyxZQUFVLE9BREc7QUFFYkMsaUJBQWUsRUFGRixFQUVNO0FBQ25CQyxXQUFTLEVBSEk7QUFJYkMsYUFBVyxHQUpFLEVBSUc7QUFDaEJDLGdCQUFjLEVBTEQ7QUFNYkMsZUFBYSxDQUFDLENBTkQsRUFNSTs7QUFFakJDLGFBQVcsRUFSRTs7QUFVYkMsc0JBQW9CLEtBVlA7QUFXYkMsaUJBQWUsRUFYRixFQVdNO0FBQ25CQyxvQkFBa0IsQ0FaTCxFQVlROztBQUVyQkMsYUFBVyxDQWRFO0FBZWJDLGFBQVcsS0FmRTtBQWdCYkMsaUJBQWUsSUFoQkY7O0FBa0JiQyxZQUFVLENBbEJHO0FBbUJiQyxnQkFBYyxDQW5CRDtBQW9CYkMsc0JBQW9CLENBQUMsQ0FwQlIsRUFvQlc7O0FBRXhCQyxrQkFBZ0IsS0F0QkgsRUFzQlU7QUFDdkJDLGlCQUFlLFFBdkJGOztBQXlCYkMsa0JBQWdCLEtBekJILEVBeUJVOztBQUV2QkMsb0JBQWtCLElBM0JMLEVBMkJXO0FBQ3hCQyxxQkFBbUIsS0E1Qk47QUE2QmJDLGNBQVksS0E3QkM7QUE4QmJDLG9CQUFrQixJQTlCTCxFQThCVzs7QUFFeEJDLHNCQUFvQixJQWhDUCxFQWdDYTtBQUMxQkMseUJBQXVCLElBakNWLEVBaUNnQjtBQUM3QkMsb0JBQWtCO0FBbENMLENBQWY7O0lBcUNxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBRW5CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUV6QjtBQUpTLEssUUFLVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FB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QUtyRixNQUFMO0FBQ0EsdUJBQUtJLFVBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs0RkFDb0JULEM7Ozs7Ozt1QkFDWixLQUFLeUQsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeFF5QixlQUFLa0MsSTs7a0JBQW5CL0csSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgUHVibGlzaFBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgcHVibGlzaFN1Y2MgZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hTdWNjJ1xuaW1wb3J0IFByaW50ZXJQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJpbnRlclBob3RvJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCByZWZyZXNoSW5kZXhNaXhpbiBmcm9tICdAL21peGlucy9yZWZyZXNoSW5kZXhNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcbmltcG9ydCB7XG4gIGRvd25JbnRlcm5ldFVybFxufSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuXG4gIGlzU2hvd1ByZVZpZXdNb2RhbDogZmFsc2UsXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIHBob3RvSWR4OiAwLFxuICBwaG90b0l0ZW1JZHg6IDAsXG4gIHBob3RvSXRlbUFjdGl2ZUlkeDogLTEsIC8vIOS4u+imgeaYr+e7meinhumikeeUqOS4gOasoeWPquiDveaSreaUvuS4gOS4quinhumikVxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsLCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbiAgc2hhcmVDYWxsQmFja1VybDogJy9nZy9ncm91cC9qb2luJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOntcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b0FuZFZpZGVvXCI6XCJwdWJsaXNoUGhvdG9BbmRWaWRlb1wiLFwidi1vbjpvcGVuTmV3QWxidW1cIjpcIm9wZW5OZXdBbGJ1bVwiLFwidi1vbjpjbGVhclB1Ymxpc2hBZnRlckluZm9cIjpcImNsZWFyUHVibGlzaEFmdGVySW5mb1wifSxcInByaW50ZXJQaG90b1wiOntcInYtb246Y2xvc2VQcmludGVyUGhvdG9Nb2RhbFwiOlwiY2xvc2VQcmludGVyUGhvdG9Nb2RhbFwifSxcInB1Ymxpc2hTdWNjXCI6e1widi1vbjpjbG9zZVB1Ymxpc2hTdWNjXCI6XCJjbG9zZVB1Ymxpc2hTdWNjXCIsXCJ2LW9uOnB1Ymxpc2hQcmludFBob3RvXCI6XCJwdWJsaXNoUHJpbnRQaG90b1wifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogUHVibGlzaFBob3RvLFxuICAgIHByaW50ZXJQaG90bzogUHJpbnRlclBob3RvLFxuICAgIHB1Ymxpc2hTdWNjOiBwdWJsaXNoU3VjYyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbiwgZm9ybVN1Ym1pdE1peGluLCByZWZyZXNoSW5kZXhNaXhpbiwgc2hhcmVDb25uZWN0TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGhvdG9JdGVtSWR4KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4i+i9vScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybCh0aGlzLnByZXZpZXdQaG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S4i+i9veaIkOWKnycpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkuIvovb3lpLHotKUnKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IDBcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gZmFsc2VcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0tcHJldmlldy0tLS0tJylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3RvcywgaWR4KVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLnJlZnJlc2hHYWxsZXJ5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsZWFyUHVibGlzaEFmdGVySW5mbygpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90b0FuZFZpZGVvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSB0cnVlXG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBudWxsXG4gICAgICB0aGlzLnB1Ymxpc2hQaG90b0luZm8gPSBvYmpcbiAgICAgIHRoaXMucmVmcmVzaEdhbGxlcnkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNsb3NlUHJpbnRlclBob3RvTW9kYWwoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IGZhbHNlXG4gICAgfSxcbiAgICBwdWJsaXNoUHJpbnRQaG90bygpIHtcbiAgICAgIHRoaXMuJGludm9rZSgncGhvdG9JdGVtJywgJ3ByaW50ZXJDbGljaycsIHt9LCB0aGlzLnB1Ymxpc2hQaG90b0luZm8uaWQsIHRoaXMucHVibGlzaFBob3RvSW5mby51c2VyX2lkKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuXG4gIH1cbiAgZXZlbnRzID0ge1xuICAgIHNob3dWaWRlbyhpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkeClcbiAgICAgIHZhciBfYWN0aXZlVmlkZW8gPSB0aGlzLnBob3RvTGlzdFtpZHhdXG4gICAgICBfYWN0aXZlVmlkZW8uaXNTaG93VmlkZW8gPSB0cnVlXG4gICAgICAvLyDov5vlhaXlhajlsY/mkq3mlL5cbiAgICAgIF9hY3RpdmVWaWRlby52aWRlb0NvbnRleHQgPSB3ZXB5LmNyZWF0ZVZpZGVvQ29udGV4dChgdmlkZW8ke2lkeH1gKVxuICAgICAgX2FjdGl2ZVZpZGVvLnZpZGVvQ29udGV4dC5yZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSxcbiAgICBoaWRkZW5WaWRlbyhpZHgpIHtcbiAgICAgIHZhciBfYWN0aXZlVmlkZW8gPSB0aGlzLnBob3RvTGlzdFtpZHhdXG4gICAgICBfYWN0aXZlVmlkZW8udmlkZW9Db250ZXh0LmV4aXRGdWxsU2NyZWVuKClcbiAgICAgIF9hY3RpdmVWaWRlby5pc1Nob3dWaWRlbyA9IGZhbHNlXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0aGlzLnNldFNoYXJlKClcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0U2hhcmVGcm9tT3RoZXIodHJ1ZSwgdGhpcy5zaGFyZUNhbGxCYWNrVXJsKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIHNldFNoYXJlKCkge1xuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIC8vIOimgeaxguWwj+eoi+W6j+i/lOWbnuWIhuS6q+ebruagh+S/oeaBr1xuICAgIH0pXG4gIH1cblxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgdmFyIGltYWdlID0gdGhpcy5wdWJsaXNoUGhvdG9JbmZvICYmIHRoaXMucHVibGlzaFBob3RvSW5mby5waG90b3NbMF0udXJsXG4gICAgY29uc29sZS5sb2coaW1hZ2UpXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiByZXMuZnJvbSA9PT0gJ2J1dHRvbicgPyBg5oiR5Y+R5biD5LqG5paw55qE54Wn54mH77yM5b+r5p2l55yL55yL5ZCnYCA6IGDpgoDor7fkvaDmn6XnnIvmnKznvqTnm7jlhozjgIoke3RoaXMuZ2FsbGVyeVRpdGxlfeOAi2AsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2FsYnVtL2FsYnVtP2lkPSR7dGhpcy5nYWxsZXJ5SWR9YCxcbiAgICAgIGltYWdlVXJsOiBpbWFnZSB8fCAnaHR0cHM6Ly9pbmltZzA3LmppdXlhbi5pbmZvL2luLzIwMTgvMDEvMTAvQkI1MkM4MzYtNzdDRS0zNzNBLUQ0ODQtQkVDOTQwNTc0OUZCLmpwZycsXG4gICAgICBzdWNjZXNzOiB0aGlzLnNoYXJlQ2FsbEJhY2soeyAuLi5yZXMsXG4gICAgICAgIHNoYXJlQ2FsbEJhY2tVcmw6IHRoaXMuc2hhcmVDYWxsQmFja1VybFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmVmcmVzaEdhbGxlcnkoKSB7XG4gICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWdlc1tpXS5kYXRhLnBhZ2VOYW1lID09PSAnZ2FsbGVyeScgJiYgKHBhZ2VzW2ldLmluaXQoKSlcbiAgICB9XG4gIH1cbiAgLy8g5L+u5pS55qCH6aKYXG4gIGNoYW5nZUdhbGxlcnlUaXRsZSh0ZXh0KSB7XG4gICAgdGhpcy5nYWxsZXJ5VGl0bGUgPSB0ZXh0IHx8ICfnm7jlhozor6bmg4UnXG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlXG4gICAgfSlcbiAgfVxuICAvLyDliJ3lp4vljJbphY3nva5cbiAgaW5pdE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuZ2FsbGVyeUlkID0gb3B0aW9ucy5pZCB8fCAnMSdcbiAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IG9wdGlvbnMuaXNuZXcgfHwgZmFsc2VcbiAgfVxuICAvLyDorr7nva7nm7jlhozkv6Hmga9cbiAgc2V0QWxidW1JbmZvKGRhdGEpIHtcbiAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZShkYXRhLmdhbGxlcnlfbmFtZSlcbiAgICB0aGlzLmdyb3VwSWQgPSBkYXRhLmdyb3VwX2luZm8uZ3JvdXBfaWQgfHwgJydcbiAgICB0aGlzLmdyb3VwVXNlck5hbWUgPSBkYXRhLmdyb3VwX2luZm8uZ3JvdXBfbWFzdGVyX25hbWUgfHwgJydcbiAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBkYXRhLnRvYXN0X2luZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgLy8g55u45YaM5L+h5oGvXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMTBcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeV9pbmZvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAyXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl92aWV3X3Bob3RvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAwXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0QWxidW1JbmZvKHJlcy5kYXRhKVxuICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyeUF1dGhcbiAgICB9XG4gIH1cbiAgLy8g54Wn54mH5YiX6KGoXG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5pc0dldExpc3QsIHRoaXMuaXNMaXN0SGFzTmV4dClcbiAgICBpZiAodGhpcy5pc0dldExpc3QgfHwgIXRoaXMuaXNMaXN0SGFzTmV4dCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICBjdXJzb3I6IHRoaXMuY3VyQ3Vyc29yXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBpZiAocmVzLmRhdGEubGlzdCkge1xuICAgICAgICByZXMuZGF0YS5saXN0ID0gcmVzLmRhdGEubGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5waG90b190eXBlID09PSAnMycpIHtcbiAgICAgICAgICAgIGl0ZW0uaXNTaG93VmlkZW8gPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS52aWRlb0NvbnRleHQgPSBudWxsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICB0aGlzLnBob3RvTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5waG90b0xpc3QsXG4gICAgICAgIC4uLnJlcy5kYXRhLmxpc3RcbiAgICAgIF1cbiAgICAgIHRoaXMuY3VyQ3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yIHx8ICcnXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzTGlzdEhhc05leHQgPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgLy8g5LiL5ZWm5Yqg6L29XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbn1cbiJdfQ==