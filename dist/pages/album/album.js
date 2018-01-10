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

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  pageName: 'album',
  groupId: '',
  galleryId: '1', // 相册id
  galleryTitle: '',
  galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

  photoList: [],
  previewPhotos: [], // 预览照片
  previewPhotosIdx: 0, // 预览照片开始位置

  curCursor: 0,
  isGetList: false,
  isListHasNext: true,

  isShowNewAlbum: false, // 修改名称弹窗
  newAlbumTitle: '修改相册名称',

  isRefreshIndex: false, // 从创建过来的

  publishAfterInfo: null, // 发布图片后的信息

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:changePublishInfo": "changePublishInfo", "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
      clearCurPhotos: function clearCurPhotos() {
        this.previewPhotos = [];
        this.previewPhotosIdx = 0;
      },
      changeCurPhotos: function changeCurPhotos(photos, idx) {
        this.previewPhotos = photos;
        this.previewPhotosIdx = idx;
      },
      deletPhoto: function deletPhoto(idx) {
        this.photoList.splice(idx, 1);
        this.$apply();
      },
      publishPhoto: function publishPhoto(obj) {
        this.photoList.splice(0, 0, obj);
        this.$apply();
      },
      openNewAlbum: function openNewAlbum() {
        this.isShowNewAlbum = true;
      },
      closeNewAlbum: function closeNewAlbum() {
        this.isShowNewAlbum = false;
      },
      changePublishInfo: function changePublishInfo(data) {
        this.publishAfterInfo = data;
        this.$apply();
      },
      closePrinterPhotoModal: function closePrinterPhotoModal() {
        this.isShowPrinterModal = false;
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
                return this.getGalleryAuth();

              case 8:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](1);

                this.loadingOut();
                this.toastFail('加载失败');

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 11]]);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: this.galleryTitle,
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
      this.isShowPrinterModal = options.showprinter || false;
    }
    // 相册权限

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
                  _context3.next = 11;
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

                this.loadingOut();
                this.$apply();

                return _context3.abrupt('return', this.galleryAuth);

              case 11:
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
                  this.changeGalleryTitle(res.data.gallery_name);
                  this.groupId = res.data.group_id || '';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cElkIiwiZ2FsbGVyeUlkIiwiZ2FsbGVyeVRpdGxlIiwiZ2FsbGVyeUF1dGgiLCJwaG90b0xpc3QiLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsImN1ckN1cnNvciIsImlzR2V0TGlzdCIsImlzTGlzdEhhc05leHQiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQcmludGVyTW9kYWwiLCJwcmludGVyUGhvdG9Nb2RhbEluZm8iLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmludGVyUGhvdG8iLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwiJGFwcGx5Iiwib2JqIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNoYW5nZVB1Ymxpc2hJbmZvIiwiY2xvc2VQcmludGVyUGhvdG9Nb2RhbCIsInN1Ym1pdFRpdGxlIiwidGl0bGUiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJpZCIsImdhbGxlcnlOYW1lIiwicmVzIiwidG9hc3RGYWlsIiwic3VjYyIsInRvYXN0U3VjYyIsImNoYW5nZUdhbGxlcnlUaXRsZSIsInBob3RvWmFuQ2hhbmdlIiwiemFuTGlzdCIsImlzX3phbiIsInphbl9saXN0IiwiZXZlbnRzIiwib3B0aW9ucyIsImluaXRPcHRpb25zIiwibG9hZGluZ0luIiwiZ2V0R2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInBhdGgiLCJ0ZXh0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2hvd3ByaW50ZXIiLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsImNvbnNvbGUiLCJsb2ciLCJjdXJzb3IiLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pZCIsImxpc3QiLCJoYXNfbmV4dCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsYUFBVyxHQUhFLEVBR0c7QUFDaEJDLGdCQUFjLEVBSkQ7QUFLYkMsZUFBYSxDQUFDLENBTEQsRUFLSTs7QUFFakJDLGFBQVcsRUFQRTtBQVFiQyxpQkFBZSxFQVJGLEVBUU07QUFDbkJDLG9CQUFrQixDQVRMLEVBU1E7O0FBRXJCQyxhQUFXLENBWEU7QUFZYkMsYUFBVyxLQVpFO0FBYWJDLGlCQUFlLElBYkY7O0FBZWJDLGtCQUFnQixLQWZILEVBZVU7QUFDdkJDLGlCQUFlLFFBaEJGOztBQWtCYkMsa0JBQWdCLEtBbEJILEVBa0JVOztBQUV2QkMsb0JBQWtCLElBcEJMLEVBb0JXOztBQUV4QkMsc0JBQW9CLElBdEJQLEVBc0JhO0FBQzFCQyx5QkFBdUIsSUF2QlYsQ0F1QmU7QUF2QmYsQ0FBZjs7SUEwQnFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsZ0JBQTNCLEVBQWIsRSxR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Qzs7Ozs7O3VCQUNaLEtBQUtqQixPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1S3lCLGVBQUtrQixJOztrQkFBbkJyRSxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBQdWJsaXNoUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcbiAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICBjdXJDdXJzb3I6IDAsXG4gIGlzR2V0TGlzdDogZmFsc2UsXG4gIGlzTGlzdEhhc05leHQ6IHRydWUsXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcblxuICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsLCAvLyDlj5HluIPlm77niYflkI7nmoTkv6Hmga9cblxuICBpc1Nob3dQcmludGVyTW9kYWw6IHRydWUsIC8vIOaYr+WQpuWxleekuui3s+i9rOaJk+WNsOeahOW8ueeql1xuICBwcmludGVyUGhvdG9Nb2RhbEluZm86IG51bGwgLy8g6Lez6L2s5omT5Y2w55qE5by556qX5L+h5oGvXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaM6K+m5oOFJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwaG90b3Muc3luY1wiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOnBob3RvSWR4LnN5bmNcIjpcInByZXZpZXdQaG90b3NJZHhcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LWJpbmQ6Z2FsbGVyeUF1dGguc3luY1wiOlwiZ2FsbGVyeUF1dGhcIixcInYtYmluZDpncm91cElkLnN5bmNcIjpcImdyb3VwSWRcIixcInYtYmluZDpwdWJsaXNoQWZ0ZXJJbmZvLnN5bmNcIjpcInB1Ymxpc2hBZnRlckluZm9cIixcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnByaW50ZXJQaG90b01vZGFsSW5mby5zeW5jXCI6XCJwcmludGVyUGhvdG9Nb2RhbEluZm9cIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LW9uOmNsZWFyQ3VyUGhvdG9zXCI6XCJjbGVhckN1clBob3Rvc1wifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246Y2hhbmdlUHVibGlzaEluZm9cIjpcImNoYW5nZVB1Ymxpc2hJbmZvXCIsXCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBQdWJsaXNoUGhvdG8sXG4gICAgcHJpbnRlclBob3RvOiBQcmludGVyUGhvdG8sXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjaGFuZ2VQdWJsaXNoSW5mbyhkYXRhKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBkYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVByaW50ZXJQaG90b01vZGFsKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBmYWxzZVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWBcbiAgICB9XG4gIH1cbiAgLy8g5L+u5pS55qCH6aKYXG4gIGNoYW5nZUdhbGxlcnlUaXRsZSh0ZXh0KSB7XG4gICAgdGhpcy5nYWxsZXJ5VGl0bGUgPSB0ZXh0IHx8ICfnm7jlhozor6bmg4UnXG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlXG4gICAgfSlcbiAgfVxuICAvLyDliJ3lp4vljJbphY3nva5cbiAgaW5pdE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuZ2FsbGVyeUlkID0gb3B0aW9ucy5pZCB8fCAnMSdcbiAgICB0aGlzLmlzU2hvd1ByaW50ZXJNb2RhbCA9IG9wdGlvbnMuc2hvd3ByaW50ZXIgfHwgZmFsc2VcbiAgfVxuICAvLyDnm7jlhozmnYPpmZBcbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMTBcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeV9pbmZvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAyXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl92aWV3X3Bob3RvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAwXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUocmVzLmRhdGEuZ2FsbGVyeV9uYW1lKVxuICAgICAgdGhpcy5ncm91cElkID0gcmVzLmRhdGEuZ3JvdXBfaWQgfHwgJydcbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19