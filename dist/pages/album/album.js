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

  isShowPrinterModal: false, // 是否展示跳转打印的弹窗
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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:galleryId.sync": "galleryId" }, "printerPhoto": { "v-bind:printerPhotoModalInfo.sync": "printerPhotoModalInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:changePublishInfo": "changePublishInfo", "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
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

                this.loadingIn('加载中');
                this.initOptions(options);
                _context2.next = 6;
                return (0, _login.wxCheckLogin)();

              case 6:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cElkIiwiZ2FsbGVyeUlkIiwiZ2FsbGVyeVRpdGxlIiwiZ2FsbGVyeUF1dGgiLCJwaG90b0xpc3QiLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsImN1ckN1cnNvciIsImlzR2V0TGlzdCIsImlzTGlzdEhhc05leHQiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsInB1Ymxpc2hBZnRlckluZm8iLCJpc1Nob3dQcmludGVyTW9kYWwiLCJwcmludGVyUGhvdG9Nb2RhbEluZm8iLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmludGVyUGhvdG8iLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwiJGFwcGx5Iiwib2JqIiwib3Blbk5ld0FsYnVtIiwiY2xvc2VOZXdBbGJ1bSIsImNoYW5nZVB1Ymxpc2hJbmZvIiwic3VibWl0VGl0bGUiLCJ0aXRsZSIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImlkIiwiZ2FsbGVyeU5hbWUiLCJyZXMiLCJ0b2FzdEZhaWwiLCJzdWNjIiwidG9hc3RTdWNjIiwiY2hhbmdlR2FsbGVyeVRpdGxlIiwicGhvdG9aYW5DaGFuZ2UiLCJ6YW5MaXN0IiwiaXNfemFuIiwiemFuX2xpc3QiLCJldmVudHMiLCJvcHRpb25zIiwibG9hZGluZ0luIiwiaW5pdE9wdGlvbnMiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJsb2FkaW5nT3V0IiwicGF0aCIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsImNvbnNvbGUiLCJsb2ciLCJjdXJzb3IiLCJnYWxsZXJ5X25hbWUiLCJncm91cF9pZCIsImxpc3QiLCJoYXNfbmV4dCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsYUFBVyxHQUhFLEVBR0c7QUFDaEJDLGdCQUFjLEVBSkQ7QUFLYkMsZUFBYSxDQUFDLENBTEQsRUFLSTs7QUFFakJDLGFBQVcsRUFQRTtBQVFiQyxpQkFBZSxFQVJGLEVBUU07QUFDbkJDLG9CQUFrQixDQVRMLEVBU1E7O0FBRXJCQyxhQUFXLENBWEU7QUFZYkMsYUFBVyxLQVpFO0FBYWJDLGlCQUFlLElBYkY7O0FBZWJDLGtCQUFnQixLQWZILEVBZVU7QUFDdkJDLGlCQUFlLFFBaEJGOztBQWtCYkMsa0JBQWdCLEtBbEJILEVBa0JVOztBQUV2QkMsb0JBQWtCLElBcEJMLEVBb0JXOztBQUV4QkMsc0JBQW9CLEtBdEJQLEVBc0JjO0FBQzNCQyx5QkFBdUIsSUF2QlYsQ0F1QmU7QUF2QmYsQ0FBZjs7SUEwQnFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsZ0JBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxT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Ozs7QUFFRXdFLHdCQUFRQyxHQUFSLENBQVksS0FBS3BFLFNBQWpCLEVBQTRCLEtBQUtDLGFBQWpDOztzQkFDSSxLQUFLRCxTQUFMLElBQWtCLENBQUMsS0FBS0MsYTs7Ozs7Ozs7QUFHNUIscUJBQUtELFNBQUwsR0FBaUIsSUFBakI7O3VCQUNnQixvQkFBUTtBQUN0QnVDLHVCQUFLLHVCQURpQjtBQUV0QmpCLHdCQUFNO0FBQ0p5QyxnQ0FBWSxLQUFLdEUsU0FEYjtBQUVKNEUsNEJBQVEsS0FBS3RFO0FBRlQ7QUFGZ0IsaUJBQVIsQzs7O0FBQVo2QyxtQjs7QUFPSixvQkFBSUEsT0FBT0EsSUFBSXRCLElBQWYsRUFBcUI7QUFDbkIsdUJBQUswQixrQkFBTCxDQUF3QkosSUFBSXRCLElBQUosQ0FBU2dELFlBQWpDO0FBQ0EsdUJBQUs5RSxPQUFMLEdBQWVvRCxJQUFJdEIsSUFBSixDQUFTaUQsUUFBVCxJQUFxQixFQUFwQztBQUNBLHVCQUFLM0UsU0FBTCxnQ0FDSyxLQUFLQSxTQURWLHNCQUVLZ0QsSUFBSXRCLElBQUosQ0FBU2tELElBRmQ7QUFJQSx1QkFBS3pFLFNBQUwsR0FBaUI2QyxJQUFJdEIsSUFBSixDQUFTK0MsTUFBVCxJQUFtQixFQUFwQztBQUNBLHVCQUFLckUsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHVCQUFLQyxhQUFMLEdBQXFCMkMsSUFBSXRCLElBQUosQ0FBU21ELFFBQTlCO0FBQ0EsdUJBQUt6QyxNQUFMO0FBQ0EsdUJBQUsyQixVQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7NEZBQ29CZSxDOzs7Ozs7dUJBQ1osS0FBS2hCLE9BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXhLeUIsZUFBS2lCLEk7O2tCQUFuQm5FLEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IFB1Ymxpc2hQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IFByaW50ZXJQaG90byBmcm9tICdAL2NvbXBvbmVudHMvYWxidW0vcHJpbnRlclBob3RvJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5pbXBvcnQgZm9ybVN1Ym1pdE1peGluIGZyb20gJ0AvbWl4aW5zL2Zvcm1TdWJtaXRNaXhpbidcbmltcG9ydCByZWZyZXNoSW5kZXhNaXhpbiBmcm9tICdAL21peGlucy9yZWZyZXNoSW5kZXhNaXhpbidcbmltcG9ydCBuZXdBbGJ1bSBmcm9tICdAL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcblxuaW1wb3J0IHtcbiAgcmVxdWVzdCxcbiAgd3hDaGVja0xvZ2luXG59IGZyb20gJ0AvdXRpbHMvbG9naW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdhbGJ1bScsXG4gIGdyb3VwSWQ6ICcnLFxuICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgZ2FsbGVyeVRpdGxlOiAnJyxcbiAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkCAzIOS4jeiDveS/ruaUueWQjeensFxuXG4gIHBob3RvTGlzdDogW10sXG4gIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgY3VyQ3Vyc29yOiAwLFxuICBpc0dldExpc3Q6IGZhbHNlLFxuICBpc0xpc3RIYXNOZXh0OiB0cnVlLFxuXG4gIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gIG5ld0FsYnVtVGl0bGU6ICfkv67mlLnnm7jlhozlkI3np7AnLFxuXG4gIGlzUmVmcmVzaEluZGV4OiBmYWxzZSwgLy8g5LuO5Yib5bu66L+H5p2l55qEXG5cbiAgcHVibGlzaEFmdGVySW5mbzogbnVsbCwgLy8g5Y+R5biD5Zu+54mH5ZCO55qE5L+h5oGvXG5cbiAgaXNTaG93UHJpbnRlck1vZGFsOiBmYWxzZSwgLy8g5piv5ZCm5bGV56S66Lez6L2s5omT5Y2w55qE5by556qXXG4gIHByaW50ZXJQaG90b01vZGFsSW5mbzogbnVsbCAvLyDot7PovazmiZPljbDnmoTlvLnnqpfkv6Hmga9cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5QXV0aC5zeW5jXCI6XCJnYWxsZXJ5QXV0aFwiLFwidi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wiLFwidi1iaW5kOmdhbGxlcnlJZC5zeW5jXCI6XCJnYWxsZXJ5SWRcIn0sXCJwcmludGVyUGhvdG9cIjp7XCJ2LWJpbmQ6cHJpbnRlclBob3RvTW9kYWxJbmZvLnN5bmNcIjpcInByaW50ZXJQaG90b01vZGFsSW5mb1wifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCIsXCJ2LW9uOnBob3RvWmFuQ2hhbmdlXCI6XCJwaG90b1phbkNoYW5nZVwifSxcInByZXZpZXdQaG90b1wiOntcInYtb246Y2xlYXJDdXJQaG90b3NcIjpcImNsZWFyQ3VyUGhvdG9zXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpjaGFuZ2VQdWJsaXNoSW5mb1wiOlwiY2hhbmdlUHVibGlzaEluZm9cIixcInYtb246cHVibGlzaFBob3RvXCI6XCJwdWJsaXNoUGhvdG9cIixcInYtb246b3Blbk5ld0FsYnVtXCI6XCJvcGVuTmV3QWxidW1cIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IFB1Ymxpc2hQaG90byxcbiAgICBwcmludGVyUGhvdG86IFByaW50ZXJQaG90byxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbiwgZm9ybVN1Ym1pdE1peGluLCByZWZyZXNoSW5kZXhNaXhpbl1cbiAgLy8gZGF0YVxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFnZURhdGEpXG4gIG1ldGhvZHMgPSB7XG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGNoYW5nZVB1Ymxpc2hJbmZvKGRhdGEpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwaG90b1phbkNoYW5nZShpZHgsIHphbkxpc3QpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuID0gIXRoaXMucGhvdG9MaXN0W2lkeF0uaXNfemFuXG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFuTGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7fVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgdGhpcy5pbml0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgYXdhaXQgd3hDaGVja0xvZ2luKClcbiAgICAgIGF3YWl0IHRoaXMuZ2V0R2FsbGVyeUF1dGgoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy50b2FzdEZhaWwoJ+WKoOi9veWksei0pScpXG4gICAgfVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlLFxuICAgICAgcGF0aDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWBcbiAgICB9XG4gIH1cbiAgLy8g5L+u5pS55qCH6aKYXG4gIGNoYW5nZUdhbGxlcnlUaXRsZSh0ZXh0KSB7XG4gICAgdGhpcy5nYWxsZXJ5VGl0bGUgPSB0ZXh0IHx8ICfnm7jlhozor6bmg4UnXG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlXG4gICAgfSlcbiAgfVxuICAvLyDliJ3lp4vljJbphY3nva5cbiAgaW5pdE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuZ2FsbGVyeUlkID0gb3B0aW9ucy5pZCB8fCAnMSdcbiAgfVxuICAvLyDnm7jlhozmnYPpmZBcbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMTBcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeV9pbmZvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAyXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl92aWV3X3Bob3RvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAwXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgIHJldHVybiB0aGlzLmdhbGxlcnlBdXRoXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaXNHZXRMaXN0LCB0aGlzLmlzTGlzdEhhc05leHQpXG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8ICF0aGlzLmlzTGlzdEhhc05leHQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgY3Vyc29yOiB0aGlzLmN1ckN1cnNvclxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUocmVzLmRhdGEuZ2FsbGVyeV9uYW1lKVxuICAgICAgdGhpcy5ncm91cElkID0gcmVzLmRhdGEuZ3JvdXBfaWQgfHwgJydcbiAgICAgIHRoaXMucGhvdG9MaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBob3RvTGlzdCxcbiAgICAgICAgLi4ucmVzLmRhdGEubGlzdFxuICAgICAgXVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3IgfHwgJydcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMaXN0SGFzTmV4dCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxuICAvLyDkuIvllabliqDovb1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19