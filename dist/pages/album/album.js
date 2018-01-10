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

var _api = require('./../../utils/api.js');

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      publishSucc: _publishSucc2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
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
                return this.getGalleryAuth();

              case 8:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                this.loadingOut();
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 12]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwicGhvdG9JZHgiLCJwaG90b0l0ZW1JZHgiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQdWJsaXNoU3VjYyIsImlzU2hvd1RpcHMiLCJwdWJsaXNoUGhvdG9JbmZvIiwiaXNTaG93UHJpbnRlck1vZGFsIiwicHJpbnRlclBob3RvTW9kYWxJbmZvIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGhvdG9JdGVtIiwicHJldmlld1Bob3RvIiwicHVibGlzaFBob3RvIiwicHJpbnRlclBob3RvIiwicHVibGlzaFN1Y2MiLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwiZG93bkltYWdlIiwibG9hZGluZ0luIiwidXJsIiwibG9hZGluZ091dCIsInRvYXN0U3VjYyIsInRvYXN0RmFpbCIsImNsZWFyU3dpcGVyIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwic3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwiZ2V0R2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwiZnJvbSIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaXNuZXciLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pbmZvIiwiZ3JvdXBfaWQiLCJncm91cF9tYXN0ZXJfbmFtZSIsInRvYXN0X2luZm8iLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsInNldEFsYnVtSW5mbyIsImN1cnNvciIsImxpc3QiLCJoYXNfbmV4dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBSUEsV0FBVztBQUNiQyxZQUFVLE9BREc7QUFFYkMsaUJBQWUsRUFGRixFQUVNO0FBQ25CQyxXQUFTLEVBSEk7QUFJYkMsYUFBVyxHQUpFLEVBSUc7QUFDaEJDLGdCQUFjLEVBTEQ7QUFNYkMsZUFBYSxDQUFDLENBTkQsRUFNSTs7QUFFakJDLGFBQVcsRUFSRTs7QUFVYkMsc0JBQW9CLEtBVlA7QUFXYkMsaUJBQWUsRUFYRixFQVdNO0FBQ25CQyxvQkFBa0IsQ0FaTCxFQVlROztBQUVyQkMsYUFBVyxD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Ozs7Ozs7OztFQXJOeUIsZUFBS21CLEk7O2tCQUFuQm5GLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eExvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdhbGJ1bScsXG4gIGdyb3VwVXNlck5hbWU6ICcnLCAvLyDnvqTkuLvlkI3lrZdcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcblxuICBpc1Nob3dQcmVWaWV3TW9kYWw6IGZhbHNlLFxuICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gIGN1ckN1cnNvcjogMCxcbiAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgaXNMaXN0SGFzTmV4dDogdHJ1ZSxcblxuICBwaG90b0lkeDogMCxcbiAgcGhvdG9JdGVtSWR4OiAwLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsIC8vIOi3s+i9rOaJk+WNsOeahOW8ueeql+S/oeaBr1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOnt9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wiLFwidi1vbjpvcGVuTmV3QWxidW1cIjpcIm9wZW5OZXdBbGJ1bVwifSxcInByaW50ZXJQaG90b1wiOntcInYtb246Y2xvc2VQcmludGVyUGhvdG9Nb2RhbFwiOlwiY2xvc2VQcmludGVyUGhvdG9Nb2RhbFwifSxcInB1Ymxpc2hTdWNjXCI6e1widi1vbjpjbG9zZVB1Ymxpc2hTdWNjXCI6XCJjbG9zZVB1Ymxpc2hTdWNjXCIsXCJ2LW9uOnB1Ymxpc2hQcmludFBob3RvXCI6XCJwdWJsaXNoUHJpbnRQaG90b1wifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCIsXCJ2LW9uOnN1Ym1pdFRpdGxlXCI6XCJzdWJtaXRUaXRsZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogUHVibGlzaFBob3RvLFxuICAgIHByaW50ZXJQaG90bzogUHJpbnRlclBob3RvLFxuICAgIHB1Ymxpc2hTdWNjOiBwdWJsaXNoU3VjYyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbiwgZm9ybVN1Ym1pdE1peGluLCByZWZyZXNoSW5kZXhNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgY29uc29sZS5sb2codGhpcy5waG90b0l0ZW1JZHgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhc3luYyBkb3duSW1hZ2UoKSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5q2j5Zyo5LiL6L29JylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucHJldmlld1Bob3Rvc1t0aGlzLnBob3RvSXRlbUlkeF0udXJsKVxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5LiL6L295oiQ5YqfJylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S4i+i9veWksei0pScpXG4gICAgICB9XG4gICAgfSxcbiAgICBjbGVhclN3aXBlcigpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gMFxuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmVWaWV3TW9kYWwgPSBmYWxzZVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS1wcmV2aWV3LS0tLS0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5wcmV2aWV3UGhvdG9zLCBpZHgpXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gaWR4XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLmlzU2hvd1B1Ymxpc2hTdWNjID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gbnVsbFxuICAgICAgdGhpcy5wdWJsaXNoUGhvdG9JbmZvID0gb2JqXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVB1Ymxpc2hTdWNjKCkge1xuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IGZhbHNlXG4gICAgfSxcbiAgICBvcGVuTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgIH0sXG4gICAgY2xvc2VQcmludGVyUGhvdG9Nb2RhbCgpIHtcbiAgICAgIHRoaXMuaXNTaG93UHJpbnRlck1vZGFsID0gZmFsc2VcbiAgICB9LFxuICAgIHB1Ymxpc2hQcmludFBob3RvKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCdwaG90b0l0ZW0nLCAncHJpbnRlckNsaWNrJywge30sIHRoaXMucHVibGlzaFBob3RvSW5mby5pZCwgdGhpcy5wdWJsaXNoUGhvdG9JbmZvLnVzZXJfaWQpXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3VwZGF0ZW5hbWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkv67mlLnlpLHotKUnKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S/ruaUueaIkOWKnycpXG4gICAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHRpdGxlKVxuICAgICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhvdG9aYW5DaGFuZ2UoaWR4LCB6YW5MaXN0KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phbiA9ICF0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phblxuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS56YW5fbGlzdCA9IHphbkxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eExvZ2luKClcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlcy5mcm9tID09PSAnYnV0dG9uJyA/IGDmiJHlj5HluIPkuobmlrDnmoTnhafniYfvvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=