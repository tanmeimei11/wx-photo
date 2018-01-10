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
  showPublishSucc: true,

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:groupId.sync": "groupId", "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "publishSucc": {}, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:changePublishInfo": "changePublishInfo", "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "printerPhoto": { "v-on:closePrinterPhotoModal": "closePrinterPhotoModal" }, "publishSucc": { "v-on:closePublishSucc": "closePublishSucc" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      printerPhoto: _printerPhoto2.default,
      publishSucc: _publishSucc2.default,
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
        console.log(obj);
        this.photoList.splice(0, 0, obj);
        this.$apply();
      },
      showpublishSucc: function showpublishSucc() {
        this.showPublishSucc = true;
      },
      closePublishSucc: function closePublishSucc() {
        this.showPublishSucc = false;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cElkIiwiZ2FsbGVyeUlkIiwiZ2FsbGVyeVRpdGxlIiwiZ2FsbGVyeUF1dGgiLCJwaG90b0xpc3QiLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsImN1ckN1cnNvciIsImlzR2V0TGlzdCIsImlzTGlzdEhhc05leHQiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJzaG93UHVibGlzaFN1Y2MiLCJpc1Nob3dQcmludGVyTW9kYWwiLCJwcmludGVyUGhvdG9Nb2RhbEluZm8iLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmludGVyUGhvdG8iLCJwdWJsaXNoU3VjYyIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJjb25zb2xlIiwibG9nIiwic2hvd3B1Ymxpc2hTdWNjIiwiY2xvc2VQdWJsaXNoU3VjYyIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJjaGFuZ2VQdWJsaXNoSW5mbyIsImNsb3NlUHJpbnRlclBob3RvTW9kYWwiLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiaWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInRvYXN0RmFpbCIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJjaGFuZ2VHYWxsZXJ5VGl0bGUiLCJwaG90b1phbkNoYW5nZSIsInphbkxpc3QiLCJpc196YW4iLCJ6YW5fbGlzdCIsImV2ZW50cyIsIm9wdGlvbnMiLCJpbml0T3B0aW9ucyIsImxvYWRpbmdJbiIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsImxvYWRpbmdPdXQiLCJmcm9tIiwicGF0aCIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzaG93cHJpbnRlciIsImdhbGxlcnlfaWQiLCJjYW5fbW9kaWZ5X2luZm8iLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiY3Vyc29yIiwiZ2FsbGVyeV9uYW1lIiwiZ3JvdXBfaWQiLCJsaXN0IiwiaGFzX25leHQiLCJlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsYUFBVyxHQUhFLEVBR0c7QUFDaEJDLGdCQUFjLEVBSkQ7QUFLYkMsZUFBYSxDQUFDLENBTEQsRUFLSTs7QUFFakJDLGFBQVcsRUFQRTtBQVFiQyxpQkFBZSxFQVJGLEVBUU07QUFDbkJDLG9CQUFrQixDQVRMLEVBU1E7O0FBRXJCQyxhQUFXLENBWEU7QUFZYkMsYUFBVyxLQVpFO0FBYWJDLGlCQUFlLElBYkY7O0FBZWJDLGtCQUFnQixLQWZILEVBZVU7QUFDdkJDLGlCQUFlLFFBaEJGOztBQWtCYkMsa0JBQWdCLEtBbEJILEVBa0JVOztBQUV2QkMsb0JBQWtCLElBcEJMLEVBb0JXO0FBQ3hCQyxtQkFBaUIsSUFyQko7O0FBdUJiQyxzQkFBb0IsSUF2QlAsRUF1QmE7QUFDMUJDLHlCQUF1QixJQXhCVixDQXdCZTtBQXhCZixDQUFmOztJQTJCcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUVuQkMsTSxHQUFTO0FBQ1BD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QkosSUFBSTNCLElBQUosQ0FBU3FELFlBQWpDO0FBQ0EsdUJBQUtyRixPQUFMLEdBQWUyRCxJQUFJM0IsSUFBSixDQUFTc0QsUUFBVCxJQUFxQixFQUFwQztBQUNBLHVCQUFLbEYsU0FBTCxnQ0FDSyxLQUFLQSxTQURWLHNCQUVLdUQsSUFBSTNCLElBQUosQ0FBU3VELElBRmQ7QUFJQSx1QkFBS2hGLFNBQUwsR0FBaUJvRCxJQUFJM0IsSUFBSixDQUFTb0QsTUFBVCxJQUFtQixFQUFwQztBQUNBLHVCQUFLNUUsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHVCQUFLQyxhQUFMLEdBQXFCa0QsSUFBSTNCLElBQUosQ0FBU3dELFFBQTlCO0FBQ0EsdUJBQUs5QyxNQUFMO0FBQ0EsdUJBQUtnQyxVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7NEZBQ29CZSxDOzs7Ozs7dUJBQ1osS0FBS2hCLE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXBMeUIsZUFBS2lCLEk7O2tCQUFuQnpFLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHB1Ymxpc2hTdWNjIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoU3VjYydcbmltcG9ydCBQcmludGVyUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByaW50ZXJQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4TG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcbiAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICBjdXJDdXJzb3I6IDAsXG4gIGlzR2V0TGlzdDogZmFsc2UsXG4gIGlzTGlzdEhhc05leHQ6IHRydWUsXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcblxuICBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsLCAvLyDlj5HluIPlm77niYflkI7nmoTkv6Hmga9cbiAgc2hvd1B1Ymxpc2hTdWNjOiB0cnVlLFxuXG4gIGlzU2hvd1ByaW50ZXJNb2RhbDogdHJ1ZSwgLy8g5piv5ZCm5bGV56S66Lez6L2s5omT5Y2w55qE5by556qXXG4gIHByaW50ZXJQaG90b01vZGFsSW5mbzogbnVsbCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5QXV0aC5zeW5jXCI6XCJnYWxsZXJ5QXV0aFwiLFwidi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wiLFwidi1iaW5kOmdhbGxlcnlJZC5zeW5jXCI6XCJnYWxsZXJ5SWRcIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6cHJpbnRlclBob3RvTW9kYWxJbmZvLnN5bmNcIjpcInByaW50ZXJQaG90b01vZGFsSW5mb1wifSxcInB1Ymxpc2hTdWNjXCI6e30sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LW9uOmNsZWFyQ3VyUGhvdG9zXCI6XCJjbGVhckN1clBob3Rvc1wifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246Y2hhbmdlUHVibGlzaEluZm9cIjpcImNoYW5nZVB1Ymxpc2hJbmZvXCIsXCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwicHJpbnRlclBob3RvXCI6e1widi1vbjpjbG9zZVByaW50ZXJQaG90b01vZGFsXCI6XCJjbG9zZVByaW50ZXJQaG90b01vZGFsXCJ9LFwicHVibGlzaFN1Y2NcIjp7XCJ2LW9uOmNsb3NlUHVibGlzaFN1Y2NcIjpcImNsb3NlUHVibGlzaFN1Y2NcIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IFB1Ymxpc2hQaG90byxcbiAgICBwcmludGVyUGhvdG86IFByaW50ZXJQaG90byxcbiAgICBwdWJsaXNoU3VjYzogcHVibGlzaFN1Y2MsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgY29uc29sZS5sb2cob2JqKVxuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNob3dwdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuc2hvd1B1Ymxpc2hTdWNjID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VQdWJsaXNoU3VjYygpIHtcbiAgICAgIHRoaXMuc2hvd1B1Ymxpc2hTdWNjID0gZmFsc2VcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjaGFuZ2VQdWJsaXNoSW5mbyhkYXRhKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBkYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVByaW50ZXJQaG90b01vZGFsKCkge1xuICAgICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBmYWxzZVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0VGl0bGUodGl0bGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS91cGRhdGVuYW1lJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5L+u5pS55aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfkv67mlLnmiJDlip8nKVxuICAgICAgICB0aGlzLmNoYW5nZUdhbGxlcnlUaXRsZSh0aXRsZSlcbiAgICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIHBob3RvWmFuQ2hhbmdlKGlkeCwgemFuTGlzdCkge1xuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW4gPSAhdGhpcy5waG90b0xpc3RbaWR4XS5pc196YW5cbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uemFuX2xpc3QgPSB6YW5MaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYWdlRGF0YSlcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hMb2dpbigpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlcy5mcm9tID09PSAnYnV0dG9uJyA/IGDmiJHlj5HluIPkuobmlrDnmoTnhafniYfvvIzlv6vmnaXnnIvnnIvlkKdgIDogYOmCgOivt+S9oOafpeeci+acrOe+pOebuOWGjOOAiiR7dGhpcy5nYWxsZXJ5VGl0bGV944CLYCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5pc1Nob3dQcmludGVyTW9kYWwgPSBvcHRpb25zLnNob3dwcmludGVyIHx8IGZhbHNlXG4gIH1cbiAgLy8g55u45YaM5p2D6ZmQXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmlzR2V0TGlzdCwgdGhpcy5pc0xpc3RIYXNOZXh0KVxuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCAhdGhpcy5pc0xpc3RIYXNOZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHJlcy5kYXRhLmdhbGxlcnlfbmFtZSlcbiAgICAgIHRoaXMuZ3JvdXBJZCA9IHJlcy5kYXRhLmdyb3VwX2lkIHx8ICcnXG4gICAgICB0aGlzLnBob3RvTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5waG90b0xpc3QsXG4gICAgICAgIC4uLnJlcy5kYXRhLmxpc3RcbiAgICAgIF1cbiAgICAgIHRoaXMuY3VyQ3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yIHx8ICcnXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzTGlzdEhhc05leHQgPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgLy8g5LiL5ZWm5Yqg6L29XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbn1cbiJdfQ==