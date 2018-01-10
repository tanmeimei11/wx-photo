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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:previewPhotos.sync": "previewPhotos" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:groupUserName.sync": "groupUserName", "v-bind:isShowTips.sync": "isShowTips", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc", "v-on:publishPrintPhoto": "publishPrintPhoto" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
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
      return {
        title: res.from === 'button' ? '\u6211\u53D1\u5E03\u4E86\u65B0\u7684\u7167\u7247\uFF0C\u5FEB\u6765\u770B\u770B\u5427' : '\u9080\u8BF7\u4F60\u67E5\u770B\u672C\u7FA4\u76F8\u518C\u300A' + this.galleryTitle + '\u300B',
        path: '/pages/album/album?id=' + this.galleryId,
        success: this.shareCallBack(_extends({}, res, {
          shareCallBackUrl: this.shareCallBackUrl
        }))
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cFVzZXJOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwiaXNTaG93UHJlVmlld01vZGFsIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0xpc3RIYXNOZXh0IiwiaXNTaG93TmV3QWxidW0iLCJuZXdBbGJ1bVRpdGxlIiwiaXNSZWZyZXNoSW5kZXgiLCJwdWJsaXNoQWZ0ZXJJbmZvIiwiaXNTaG93UHVibGlzaFN1Y2MiLCJpc1Nob3dUaXBzIiwicHVibGlzaFBob3RvSW5mbyIsImlzU2hvd1ByaW50ZXJNb2RhbCIsInByaW50ZXJQaG90b01vZGFsSW5mbyIsInNoYXJlQ2FsbEJhY2tVcmwiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmludGVyUGhvdG8iLCJwdWJsaXNoU3VjYyIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjbG9zZVByaW50ZXJQaG90b01vZGFsIiwicHVibGlzaFByaW50UGhvdG8iLCIkaW52b2tlIiwiaWQiLCJ1c2VyX2lkIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImdhbGxlcnlOYW1lIiwicmVzIiwidG9hc3RGYWlsIiwic3VjYyIsInRvYXN0U3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwibG9hZGluZ0luIiwiZ2V0U2hhcmVGcm9tT3RoZXIiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJsb2FkaW5nT3V0IiwiZnJvbSIsInBhdGgiLCJzdWNjZXNzIiwic2hhcmVDYWxsQmFjayIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJpc25ldyIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2luZm8iLCJncm91cF9pZCIsImdyb3VwX21hc3Rlcl9uYW1lIiwidG9hc3RfaW5mbyIsImdhbGxlcnlfaWQiLCJjYW5fbW9kaWZ5X2luZm8iLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwic2V0QWxidW1JbmZvIiwiY3Vyc29yIiwibGlzdCIsImhhc19uZXh0IiwiZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUtBLElBQUlBLFdBQVc7QUFDYkMsWUFBVSxPQURHO0FBRWJDLGlCQUFlLEVBRkYsRUFFTTtBQUNuQkMsV0FBUyxFQUhJO0FBSWJDLGFBQVcsR0FKRSxFQUlHO0FBQ2hCQyxnQkFBYyxFQUxEO0FBTWJDLGVBQWEsQ0FBQyxDQU5ELEVBTUk7O0FBRWpCQyxhQUFXLEVBUkU7O0FBVWJDLHNCQUFvQixLQVZQO0FBV2JDLGlCQUFlLEVBWEYsRUFXTTtBQUNuQkMsb0JBQWtCLENBWkwsRUFZUTs7QUFFckJDLGFBQVcsQ0FkRTtBQWViQyxhQUFXLEtBZkU7QUFnQmJDLGlCQUFlLElBaEJGOztBQWtCYkMsa0JBQWdCLEtBbEJILEVBa0JVO0FBQ3ZCQyxpQkFBZSxRQW5CRjs7QUFxQmJDLGtCQUFnQixLQXJCSCxFQXFCVTs7QUFFdkJDLG9CQUFrQixJQXZCTCxFQXVCVztBQUN4QkMscUJBQW1CLEtBeEJOO0FBeUJiQyxjQUFZLEtBekJDO0FBMEJiQyxvQkFBa0IsSUExQkwsRUEwQlc7O0FBRXhCQyxzQkFBb0IsSUE1QlAsRUE0QmE7QUFDMUJDLHlCQUF1QixJQTdCVixFQTZCZ0I7QUFDN0JDLG9CQUFrQjtBQTlCTCxDQUFmOztJQWlDcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUVuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUI7QUFFekI7QUFKUyxLLFFBS1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxnQkFBM0IsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxXQUFwQyxFQUFnRCxRQUFPLE1BQXZELEVBQThELFNBQVEsT0FBdEUsRUFBOEUsT0FBTSxPQUFwRixFQUFuSCxFQUFnTiwwQkFBeUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxPQUF4QixFQUFnQyxPQUFNLFdBQXRDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLE9BQXRGLEVBQXpPLEVBQXdVLGNBQWEsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQXJWLEVBQWIsRUFBOGEsZ0JBQWUsRUFBQyw2QkFBNEIsZUFBN0IsRUFBN2IsRUFBMmUsZ0JBQWUsRUFBQywyQkFBMEIsYUFBM0IsRUFBeUMsdUJBQXNCLFNBQS9ELEVBQXlFLGdDQUErQixrQkFBeEcsRUFBMkgsNkJBQTRCLGVBQXZKLEVBQXVLLDBCQUF5QixZQUFoTSxFQUE2TSx5QkFBd0IsV0FBck8sRUFBMWYsRUFBNHVCLGdCQUFlLEVBQUMsdUJBQXNCLFNBQXZCLEVBQWlDLHFDQUFvQyx1QkFBckUsRUFBM3ZCLEVBQXkxQixlQUFjLEVBQXYyQixFQUEwMkIsWUFBVyxFQUFDLDRCQUEyQixjQUE1QixFQUEyQyw2QkFBNEIsZUFBdkUsRUFBcjNCLEUsUUFDVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLHdCQUF1QixpQkFBeEIsRUFBMEMsbUJBQWtCLFlBQTVELEVBQXlFLHVCQUFzQixnQkFBL0YsRUFBYixFQUE4SCxnQkFBZSxFQUFDLHVCQUFzQixnQkFBdkIsRUFBN0ksRUFBc0wsZ0JBQWUsRUFBQyxxQkFBb0IsY0FBckIsRUFBb0MscUJBQW9CLGNBQXhELEVBQXJNLEVBQTZRLGdCQUFlLEVBQUMsK0JBQThCLHdCQUEvQixFQUE1UixFQUFxVixlQUFjLEVBQUMseUJBQXdCLGtCQUF6QixFQUE0QywwQkFBeUIsbUJBQXJFLEVBQW5XLEVBQTZiLFlBQVcsRUFBQyxzQkFBcUIsZUFBdEIsRUFBc0Msb0JBQW1CLGFBQXpELEVBQXhjLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLG9DQURVO0FBRVZDLDBDQUZVO0FBR1ZDLDBDQUhVO0FBSVZDLDBDQUpVO0FBS1ZDLHdDQUxVO0FBTVZDO0FBRUY7QUFSWSxLLFFBU1pDLE0sR0FBUyw2RyxRQUVUQyxJLEdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCekMsUUFBbEIsQyxRQUNQMEMsTyxHQUFVO0FBQ1JDLG9CQURRLDRCQUNTO0FBQ2YsYUFBS25DLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLGFBQUtDLGdCQUFMLEdBQXdCLENBQXhCO0FBQ0QsT0FMTztBQU1Sa0MscUJBTlEsMkJBTVFDLE1BTlIsRUFNZ0JDLEdBTmhCLEVBTXFCO0FBQzNCLGFBQUtyQyxhQUFMLEdBQXFCb0MsTUFBckI7QUFDQSxhQUFLckMsa0JBQUwsR0FBMEIsSUFBMUI7QUFDQXVDLGdCQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQUQsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLdkMsYUFBakIsRUFBZ0NxQyxHQUFoQztBQUNBLGFBQUtwQyxnQkFBTCxHQUF3Qm9DLEdBQXhCO0FBQ0EsYUFBS0csTUFBTDtBQUNELE9BYk87QUFjUkMsZ0JBZFEsc0JBY0dKLEdBZEgsRUFjUTtBQUNkLGFBQUt2QyxTQUFMLENBQWU0QyxNQUFmLENBQXNCTCxHQUF0QixFQUEyQixDQUEzQjtBQUNBLGFBQUtHLE1BQUw7QUFDRCxPQWpCTztBQWtCUmYsa0JBbEJRLHdCQWtCS2tCLEdBbEJMLEVBa0JVO0FBQ2hCLGFBQUs3QyxTQUFMLENBQWU0QyxNQUFmLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCQyxHQUE1QjtBQUNBLGFBQUtsQyxpQkFBTCxHQUF5QixJQUF6QjtBQUNBLGFBQUtELGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsYUFBS0csZ0JBQUwsR0FBd0JnQyxHQUF4QjtBQUNBLGFBQUtILE1BQUw7QUFDRCxPQXhCTztBQXlCUkksc0JBekJRLDhCQXlCVztBQUNqQixhQUFLbkMsaUJBQUwsR0FBeUIsS0FBekI7QUFDRCxPQTNCTztBQTRCUm9DLGtCQTVCUSwwQkE0Qk87QUFDYixhQUFLeEMsY0FBTCxHQUFzQixJQUF0QjtBQUNELE9BOUJPO0FBK0JSeUMsbUJBL0JRLDJCQStCUTtBQUNkLGFBQUt6QyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0QsT0FqQ087QUFrQ1IwQyw0QkFsQ1Esb0NBa0NpQjtBQUN2QixhQUFLbkMsa0JBQUwsR0FBMEIsS0FBMUI7QUFDRCxPQXBDTztBQXFDUm9DLHVCQXJDUSwrQkFxQ1k7QUFDbEIsYUFBS0MsT0FBTCxDQUFhLFdBQWIsRUFBMEIsY0FBMUIsRUFBMEMsRUFBMUMsRUFBOEMsS0FBS3RDLGdCQUFMLENBQXNCdUMsRUFBcEUsRUFBd0UsS0FBS3ZDLGdCQUFMLENBQXNCd0MsT0FBOUY7QUFDRCxPQXZDTztBQXdDRkMsaUJBeENFO0FBQUEsNkZBd0NVQyxLQXhDVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBMENZLG9CQUFRO0FBQ3RCQyx5QkFBSyx3QkFEaUI7QUFFdEJDLDRCQUFRLE1BRmM7QUFHdEJDLDRCQUFRO0FBQ04sc0NBQWdCO0FBRFYscUJBSGM7QUFNdEIxQiwwQkFBTTtBQUNKb0IsMEJBQUksS0FBS3ZELFNBREw7QUFFSjhELG1DQUFhSjtBQUZUO0FBTmdCLG1CQUFSLENBMUNaOztBQUFBO0FBMENBSyxxQkExQ0E7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFzREosdUJBQUtDLFNBQUwsQ0FBZSxNQUFmOztBQXRESTs7QUF5RE4sc0JBQUlELElBQUlFLElBQVIsRUFBYztBQUNaLHlCQUFLQyxTQUFMLENBQWUsTUFBZjtBQUNBLHlCQUFLQyxrQkFBTCxDQUF3QlQsS0FBeEI7QUFDQSx5QkFBS2hELGNBQUwsR0FBc0IsS0FBdEI7QUFDQSx5QkFBS21DLE1BQUw7QUFDRDs7QUE5REs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFnRVJ1QixvQkFoRVEsMEJBZ0VPMUIsR0FoRVAsRUFnRVkyQixPQWhFWixFQWdFcUI7QUFDM0IsYUFBS2xFLFNBQUwsQ0FBZXVDLEdBQWYsRUFBb0I0QixNQUFwQixHQUE2QixDQUFDLEtBQUtuRSxTQUFMLENBQWV1QyxHQUFmLEVBQW9CNEIsTUFBbEQ7QUFDQSxhQUFLbkUsU0FBTCxDQUFldUMsR0FBZixFQUFvQjZCLFFBQXBCLEdBQStCRixPQUEvQjtBQUNBLGFBQUt4QixNQUFMO0FBQ0Q7QUFwRU8sSyxRQXNFVjJCLE0sR0FBUyxFOztBQTNGVDs7QUFtQkE7Ozs7Ozs0RkF5RWFDLE87Ozs7O0FBQ1hyQyx1QkFBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0J6QyxRQUFwQjs7O0FBRUUscUJBQUs4RSxXQUFMLENBQWlCRCxPQUFqQjs7dUJBQ00scUI7OztBQUNOLHFCQUFLRSxTQUFMLENBQWUsS0FBZjs7dUJBQ00sS0FBS0MsaUJBQUwsQ0FBdUIsSUFBdkIsRUFBNkIsS0FBS3pELGdCQUFsQyxDOzs7O3VCQUNBLEtBQUswRCxjQUFMLEU7OztBQUNOLG9CQUFJLEtBQUszRSxXQUFMLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLHVCQUFLNEUsT0FBTDtBQUNEO0FBQ0QscUJBQUtDLFVBQUw7Ozs7Ozs7O0FBRUEscUJBQUtBLFVBQUw7QUFDQSxxQkFBS2YsU0FBTCxDQUFlLE1BQWY7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSjs7OztzQ0FDa0JELEcsRUFBSztBQUNyQixhQUFPO0FBQ0xMLGVBQU9LLElBQUlpQixJQUFKLEtBQWEsUUFBYiw2SkFBd0QsS0FBSy9FLFlBQTdELFdBREY7QUFFTGdGLHlDQUErQixLQUFLakYsU0FGL0I7QUFHTGtGLGlCQUFTLEtBQUtDLGFBQUwsY0FBd0JwQixHQUF4QjtBQUNQNUMsNEJBQWtCLEtBQUtBO0FBRGhCO0FBSEosT0FBUDtBQU9EO0FBQ0Q7Ozs7dUNBQ21CaUUsSSxFQUFNO0FBQ3ZCLFdBQUtuRixZQUFMLEdBQW9CbUYsUUFBUSxNQUE1QjtBQUNBLHFCQUFLQyxxQkFBTCxDQUEyQjtBQUN6QjNCLGVBQU8sS0FBS3pEO0FBRGEsT0FBM0I7QUFHRDtBQUNEOzs7O2dDQUNZd0UsTyxFQUFTO0FBQ25CLFdBQUt6RSxTQUFMLEdBQWlCeUUsUUFBUWxCLEVBQVIsSUFBYyxHQUEvQjtBQUNBLFdBQUt0QyxrQkFBTCxHQUEwQndELFFBQVFhLEtBQVIsSUFBaUIsS0FBM0M7QUFDRDtBQUNEOzs7O2lDQUNhbkQsSSxFQUFNO0FBQ2pCLFdBQUtnQyxrQkFBTCxDQUF3QmhDLEtBQUtvRCxZQUE3QjtBQUNBLFdBQUt4RixPQUFMLEdBQWVvQyxLQUFLcUQsVUFBTCxDQUFnQkMsUUFBaEIsSUFBNEIsRUFBM0M7QUFDQSxXQUFLM0YsYUFBTCxHQUFxQnFDLEtBQUtxRCxVQUFMLENBQWdCRSxpQkFBaEIsSUFBcUMsRUFBMUQ7QUFDQSxXQUFLN0UsZ0JBQUwsR0FBd0JzQixLQUFLd0QsVUFBN0I7QUFDQSxXQUFLOUMsTUFBTDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozt1QkFFa0Isb0JBQVE7QUFDdEJjLHVCQUFLLGtCQURpQjtBQUV0QnhCLHdCQUFNO0FBQ0p5RCxnQ0FBWSxLQUFLNUY7QUFEYjtBQUZnQixpQkFBUixDOzs7QUFBWitELG1COztzQkFPQUEsT0FBT0EsSUFBSTVCLEk7Ozs7O0FBQ2IscUJBQUtqQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Esb0JBQUksQ0FBQzZELElBQUk1QixJQUFKLENBQVMwRCxlQUFkLEVBQStCO0FBQzdCLHVCQUFLM0YsV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Qsb0JBQUksQ0FBQzZELElBQUk1QixJQUFKLENBQVMyRCxXQUFkLEVBQTJCO0FBQ3pCLHVCQUFLNUYsV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Qsb0JBQUksQ0FBQzZELElBQUk1QixJQUFKLENBQVM0RCxjQUFkLEVBQThCO0FBQzVCLHVCQUFLN0YsV0FBTCxHQUFtQixDQUFuQjtBQUNEOztBQUVELHFCQUFLOEYsWUFBTCxDQUFrQmpDLElBQUk1QixJQUF0QjtrREFDTyxLQUFLakMsVzs7Ozs7Ozs7Ozs7Ozs7OztBQUdoQjs7Ozs7Ozs7Ozs7QUFFRXlDLHdCQUFRQyxHQUFSLENBQVksS0FBS3BDLFNBQWpCLEVBQTRCLEtBQUtDLGFBQWpDOztzQkFDSSxLQUFLRCxTQUFMLElBQWtCLENBQUMsS0FBS0MsYTs7Ozs7Ozs7QUFHNUIscUJBQUtELFNBQUwsR0FBaUIsSUFBakI7O3VCQUNnQixvQkFBUTtBQUN0Qm1ELHVCQUFLLHVCQURpQjtBQUV0QnhCLHdCQUFNO0FBQ0p5RCxnQ0FBWSxLQUFLNUYsU0FEYjtBQUVKaUcsNEJBQVEsS0FBSzFGO0FBRlQ7QUFGZ0IsaUJBQVIsQzs7O0FBQVp3RCxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSTVCLElBQWYsRUFBcUI7QUFDbkIsdUJBQUtoQyxTQUFMLGdDQUNLLEtBQUtBLFNBRFYsc0JBRUs0RCxJQUFJNUIsSUFBSixDQUFTK0QsSUFGZDtBQUlBLHVCQUFLM0YsU0FBTCxHQUFpQndELElBQUk1QixJQUFKLENBQVM4RCxNQUFULElBQW1CLEVBQXBDO0FBQ0EsdUJBQUt6RixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsdUJBQUtDLGFBQUwsR0FBcUJzRCxJQUFJNUIsSUFBSixDQUFTZ0UsUUFBOUI7QUFDQSx1QkFBS3RELE1BQUw7QUFDQSx1QkFBS2tDLFVBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs0RkFDb0JxQixDOzs7Ozs7dUJBQ1osS0FBS3RCLE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpNeUIsZUFBS3VCLEk7O2tCQUFuQmpGLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5pbXBvcnQgc2hhcmVDb25uZWN0TWl4aW4gZnJvbSAnQC9taXhpbnMvc2hhcmVDb25uZWN0TWl4aW4nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBVc2VyTmFtZTogJycsIC8vIOe+pOS4u+WQjeWtl1xuICBncm91cElkOiAnJyxcbiAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gIGdhbGxlcnlUaXRsZTogJycsXG4gIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICBwaG90b0xpc3Q6IFtdLFxuXG4gIGlzU2hvd1ByZVZpZXdNb2RhbDogZmFsc2UsXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG4gIGlzU2hvd1B1Ymxpc2hTdWNjOiBmYWxzZSxcbiAgaXNTaG93VGlwczogZmFsc2UsXG4gIHB1Ymxpc2hQaG90b0luZm86IG51bGwsIC8vIOWPkeWbvuS5i+WQjueahHBob3Rv5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiB0cnVlLCAvLyDmmK/lkKblsZXnpLrot7PovazmiZPljbDnmoTlvLnnqpdcbiAgcHJpbnRlclBob3RvTW9kYWxJbmZvOiBudWxsLCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbiAgc2hhcmVDYWxsQmFja1VybDogJy9nZy9nYWxsZXJ5L2pvaW4nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwcmV2aWV3UGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpncm91cFVzZXJOYW1lLnN5bmNcIjpcImdyb3VwVXNlck5hbWVcIixcInYtYmluZDppc1Nob3dUaXBzLnN5bmNcIjpcImlzU2hvd1RpcHNcIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJwdWJsaXNoU3VjY1wiOnt9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwiLFwidi1iaW5kOm5ld0FsYnVtVGl0bGUub25jZVwiOlwibmV3QWxidW1UaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246cGhvdG9aYW5DaGFuZ2VcIjpcInBob3RvWmFuQ2hhbmdlXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIixcInYtb246cHVibGlzaFByaW50UGhvdG9cIjpcInB1Ymxpc2hQcmludFBob3RvXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgcHVibGlzaFN1Y2M6IHB1Ymxpc2hTdWNjLFxuICAgIG5ld0FsYnVtOiBuZXdBbGJ1bVxuICB9XG4gIC8vIOa3t+WQiFxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluLCBmb3JtU3VibWl0TWl4aW4sIHJlZnJlc2hJbmRleE1peGluLCBzaGFyZUNvbm5lY3RNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByZVZpZXdNb2RhbCA9IGZhbHNlXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMuaXNTaG93UHJlVmlld01vZGFsID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coJy0tLS0tLXByZXZpZXctLS0tLScpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpZXdQaG90b3MsIGlkeClcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy5pc1Nob3dQdWJsaXNoU3VjYyA9IHRydWVcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IG51bGxcbiAgICAgIHRoaXMucHVibGlzaFBob3RvSW5mbyA9IG9ialxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuaXNTaG93UHVibGlzaFN1Y2MgPSBmYWxzZVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNsb3NlUHJpbnRlclBob3RvTW9kYWwoKSB7XG4gICAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IGZhbHNlXG4gICAgfSxcbiAgICBwdWJsaXNoUHJpbnRQaG90bygpIHtcbiAgICAgIHRoaXMuJGludm9rZSgncGhvdG9JdGVtJywgJ3ByaW50ZXJDbGljaycsIHt9LCB0aGlzLnB1Ymxpc2hQaG90b0luZm8uaWQsIHRoaXMucHVibGlzaFBob3RvSW5mby51c2VyX2lkKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0U2hhcmVGcm9tT3RoZXIodHJ1ZSwgdGhpcy5zaGFyZUNhbGxCYWNrVXJsKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlcy5mcm9tID09PSAnYnV0dG9uJyA/IGDmiJHlj5HluIPkuobmlrDnmoTnhafniYfvvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gLFxuICAgICAgc3VjY2VzczogdGhpcy5zaGFyZUNhbGxCYWNrKHsgLi4ucmVzLFxuICAgICAgICBzaGFyZUNhbGxCYWNrVXJsOiB0aGlzLnNoYXJlQ2FsbEJhY2tVcmxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLmlzbmV3IHx8IGZhbHNlXG4gIH1cbiAgLy8g6K6+572u55u45YaM5L+h5oGvXG4gIHNldEFsYnVtSW5mbyhkYXRhKSB7XG4gICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUoZGF0YS5nYWxsZXJ5X25hbWUpXG4gICAgdGhpcy5ncm91cElkID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX2lkIHx8ICcnXG4gICAgdGhpcy5ncm91cFVzZXJOYW1lID0gZGF0YS5ncm91cF9pbmZvLmdyb3VwX21hc3Rlcl9uYW1lIHx8ICcnXG4gICAgdGhpcy5wdWJsaXNoQWZ0ZXJJbmZvID0gZGF0YS50b2FzdF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIC8vIOebuOWGjOS/oeaBr1xuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldEFsYnVtSW5mbyhyZXMuZGF0YSlcbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGhvdG9MaXN0LFxuICAgICAgICAuLi5yZXMuZGF0YS5saXN0XG4gICAgICBdXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvciB8fCAnJ1xuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0xpc3RIYXNOZXh0ID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=