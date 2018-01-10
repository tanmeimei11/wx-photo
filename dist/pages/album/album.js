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
  isSubmitFormId: true, // 允许提交formid

  publishAfterInfo: null
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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:publishAfterInfo.sync": "publishAfterInfo", "v-bind:galleryId.sync": "galleryId" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:photoZanChange": "photoZanChange" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:changePublishInfo": "changePublishInfo", "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
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
                wx.showToast({
                  title: '加载失败',
                  icon: 'loading'
                });

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbInBhZ2VEYXRhIiwicGFnZU5hbWUiLCJncm91cElkIiwiZ2FsbGVyeUlkIiwiZ2FsbGVyeVRpdGxlIiwiZ2FsbGVyeUF1dGgiLCJwaG90b0xpc3QiLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsImN1ckN1cnNvciIsImlzR2V0TGlzdCIsImlzTGlzdEhhc05leHQiLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsImlzU3VibWl0Rm9ybUlkIiwicHVibGlzaEFmdGVySW5mbyIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCIkYXBwbHkiLCJvYmoiLCJvcGVuTmV3QWxidW0iLCJjbG9zZU5ld0FsYnVtIiwiY2hhbmdlUHVibGlzaEluZm8iLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiaWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInRvYXN0RmFpbCIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJjaGFuZ2VHYWxsZXJ5VGl0bGUiLCJwaG90b1phbkNoYW5nZSIsInphbkxpc3QiLCJpc196YW4iLCJ6YW5fbGlzdCIsImV2ZW50cyIsIm9wdGlvbnMiLCJsb2FkaW5nSW4iLCJpbml0T3B0aW9ucyIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsImxvYWRpbmdPdXQiLCJ3eCIsInNob3dUb2FzdCIsImljb24iLCJwYXRoIiwidGV4dCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImdhbGxlcnlfaWQiLCJjYW5fbW9kaWZ5X2luZm8iLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiY29uc29sZSIsImxvZyIsImN1cnNvciIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2lkIiwibGlzdCIsImhhc19uZXh0IiwiZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFJQSxXQUFXO0FBQ2JDLFlBQVUsT0FERztBQUViQyxXQUFTLEVBRkk7QUFHYkMsYUFBVyxHQUhFLEVBR0c7QUFDaEJDLGdCQUFjLEVBSkQ7QUFLYkMsZUFBYSxDQUFDLENBTEQsRUFLSTs7QUFFakJDLGFBQVcsRUFQRTtBQVFiQyxpQkFBZSxFQVJGLEVBUU07QUFDbkJDLG9CQUFrQixDQVRMLEVBU1E7O0FBRXJCQyxhQUFXLENBWEU7QUFZYkMsYUFBVyxLQVpFO0FBYWJDLGlCQUFlLElBYkY7O0FBZWJDLGtCQUFnQixLQWZILEVBZVU7QUFDdkJDLGlCQUFlLFFBaEJGOztBQWtCYkMsa0JBQWdCLEtBbEJILEVBa0JVO0FBQ3ZCQyxrQkFBZ0IsSUFuQkgsRUFtQlM7O0FBRXRCQyxvQkFBa0I7QUFyQkwsQ0FBZjs7SUF3QnFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsZ0JBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQWhCLEVBQTJGLHlCQUF3QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sV0FBcEMsRUFBZ0QsUUFBTyxNQUF2RCxFQUE4RCxTQUFRLE9BQXRFLEVBQThFLE9BQU0sT0FBcEYsRUFBbkgsRUFBZ04sMEJBQXlCLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxXQUF0QyxFQUFrRCxRQUFPLE1BQXpELEVBQWdFLFNBQVEsT0FBeEUsRUFBZ0YsT0FBTSxPQUF0RixFQUF6TyxFQUF3VSxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFyVixFQUFiLEVBQThhLGdCQUFlLEVBQUMsc0JBQXFCLGVBQXRCLEVBQXNDLHdCQUF1QixrQkFBN0QsRUFBN2IsRUFBOGdCLGdCQUFlLEVBQUMsMkJBQTBCLGFBQTNCLEVBQXlDLHVCQUFzQixTQUEvRCxFQUF5RSxnQ0FBK0Isa0JBQXhHLEVBQTJILHlCQUF3QixXQUFuSixFQUE3aEIsRUFBNnJCLFlBQVcsRUFBQyw0QkFBMkIsY0FBNUIsRUFBMkMsNkJBQTRCLGVBQXZFLEVBQXhzQixFLFFBQ1RDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyx3QkFBdUIsaUJBQXhCLEVBQTBDLG1CQUFrQixZQUE1RCxFQUF5RSx1QkFBc0IsZ0JBQS9GLEVBQWIsRUFBOEgsZ0JBQWUsRUFBQyx1QkFBc0IsZ0JBQXZCLEVBQTdJLEVBQXNMLGdCQUFlLEVBQUMsMEJBQXlCLG1CQUExQixFQUE4QyxxQkFBb0IsY0FBbEUsRUFBaUYscUJBQW9CLGNBQXJHLEVBQXJNLEVBQTBULFlBQVcsRUFBQyxzQkFBcUIsZUFBdEIsRUFBc0Msb0JBQW1CLGFBQXpELEVBQXJVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLG9DQURVO0FBRVZDLDBDQUZVO0FBR1ZDLDBDQUhVO0FBSVZDO0FBRUY7QUFOWSxLLFFBT1pDLE0sR0FBUyxnRixRQUVUQyxJLEdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCaEMsUUFBbEIsQyxRQUNQaUMsTyxHQUFVO0FBQ1JDLG9CQURRLDRCQUNTO0FBQ2YsYUFBSzNCLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxhQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNELE9BSk87QUFLUjJCLHFCQUxRLDJCQUtRQyxNQUxSLEVBS2dCQyxHQUxoQixFQUtxQjtBQUMzQixhQUFLOUIsYUFBTCxHQUFxQjZCLE1BQXJCO0FBQ0EsYUFBSzVCLGdCQUFMLEdBQXdCNkIsR0FBeEI7QUFDRCxPQVJPO0FBU1JDLGdCQVRRLHNCQVNHRCxHQVRILEVBU1E7QUFDZCxhQUFLL0IsU0FBTCxDQUFlaUMsTUFBZixDQUFzQkYsR0FBdEIsRUFBMkIsQ0FBM0I7QUFDQSxhQUFLRyxNQUFMO0FBQ0QsT0FaTztBQWFSYixrQkFiUSx3QkFhS2MsR0FiTCxFQWFVO0FBQ2hCLGFBQUtuQyxTQUFMLENBQWVpQyxNQUFmLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCRSxHQUE1QjtBQUNBLGFBQUtELE1BQUw7QUFDRCxPQWhCTztBQWlCUkUsa0JBakJRLDBCQWlCTztBQUNiLGFBQUs5QixjQUFMLEdBQXNCLElBQXRCO0FBQ0QsT0FuQk87QUFvQlIrQixtQkFwQlEsMkJBb0JRO0FBQ2QsYUFBSy9CLGNBQUwsR0FBc0IsS0FBdEI7QUFDRCxPQXRCTztBQXVCUmdDLHVCQXZCUSw2QkF1QlVkLElBdkJWLEVBdUJnQjtBQUN0QixhQUFLZCxnQkFBTCxHQUF3QmMsSUFBeEI7QUFDQSxhQUFLVSxNQUFMO0FBQ0QsT0ExQk87QUEyQkZLLGlCQTNCRTtBQUFBLDZGQTJCVUMsS0EzQlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQTZCWSxvQkFBUTtBQUN0QkMseUJBQUssd0JBRGlCO0FBRXRCQyw0QkFBUSxNQUZjO0FBR3RCQyw0QkFBUTtBQUNOLHNDQUFnQjtBQURWLHFCQUhjO0FBTXRCbkIsMEJBQU07QUFDSm9CLDBCQUFJLEtBQUsvQyxTQURMO0FBRUpnRCxtQ0FBYUw7QUFGVDtBQU5nQixtQkFBUixDQTdCWjs7QUFBQTtBQTZCQU0scUJBN0JBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBeUNKLHVCQUFLQyxTQUFMLENBQWUsTUFBZjs7QUF6Q0k7O0FBNENOLHNCQUFJRCxJQUFJRSxJQUFSLEVBQWM7QUFDWix5QkFBS0MsU0FBTCxDQUFlLE1BQWY7QUFDQSx5QkFBS0Msa0JBQUwsQ0FBd0JWLEtBQXhCO0FBQ0EseUJBQUtsQyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0EseUJBQUs0QixNQUFMO0FBQ0Q7O0FBakRLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBbURSaUIsb0JBbkRRLDBCQW1ET3BCLEdBbkRQLEVBbURZcUIsT0FuRFosRUFtRHFCO0FBQzNCLGFBQUtwRCxTQUFMLENBQWUrQixHQUFmLEVBQW9Cc0IsTUFBcEIsR0FBNkIsQ0FBQyxLQUFLckQsU0FBTCxDQUFlK0IsR0FBZixFQUFvQnNCLE1BQWxEO0FBQ0EsYUFBS3JELFNBQUwsQ0FBZStCLEdBQWYsRUFBb0J1QixRQUFwQixHQUErQkYsT0FBL0I7QUFDQSxhQUFLbEIsTUFBTDtBQUNEO0FBdkRPLEssUUF5RFZxQixNLEdBQVMsRTs7QUE1RVQ7O0FBaUJBOzs7Ozs7NEZBNERhQyxPOzs7OztBQUNYL0IsdUJBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CaEMsUUFBcEI7OztBQUVFLHFCQUFLK0QsU0FBTCxDQUFlLEtBQWY7QUFDQSxxQkFBS0MsV0FBTCxDQUFpQkYsT0FBakI7O3VCQUNNLDBCOzs7O3VCQUNBLEtBQUtHLGNBQUwsRTs7O0FBQ04sb0JBQUksS0FBSzVELFdBQUwsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsdUJBQUs2RCxPQUFMO0FBQ0Q7Ozs7Ozs7O0FBRUQscUJBQUtDLFVBQUw7QUFDQUMsbUJBQUdDLFNBQUgsQ0FBYTtBQUNYdkIseUJBQU8sTUFESTtBQUVYd0Isd0JBQU07QUFGSyxpQkFBYjs7Ozs7Ozs7Ozs7Ozs7OztBQU1KOzs7O3dDQUNvQjtBQUNsQixhQUFPO0FBQ0x4QixlQUFPLEtBQUsxQyxZQURQO0FBRUxtRSx5Q0FBK0IsS0FBS3BFO0FBRi9CLE9BQVA7QUFJRDtBQUNEOzs7O3VDQUNtQnFFLEksRUFBTTtBQUN2QixXQUFLcEUsWUFBTCxHQUFvQm9FLFFBQVEsTUFBNUI7QUFDQSxxQkFBS0MscUJBQUwsQ0FBMkI7QUFDekIzQixlQUFPLEtBQUsxQztBQURhLE9BQTNCO0FBR0Q7QUFDRDs7OztnQ0FDWTBELE8sRUFBUztBQUNuQixXQUFLM0QsU0FBTCxHQUFpQjJELFFBQVFaLEVBQVIsSUFBYyxHQUEvQjtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozt1QkFFa0Isb0JBQVE7QUFDdEJILHVCQUFLLGtCQURpQjtBQUV0QmpCLHdCQUFNO0FBQ0o0QyxnQ0FBWSxLQUFLdkU7QUFEYjtBQUZnQixpQkFBUixDOzs7QUFBWmlELG1COztzQkFNQUEsT0FBT0EsSUFBSXRCLEk7Ozs7O0FBQ2IscUJBQUt6QixXQUFMLEdBQW1CLEVBQW5CO0FBQ0Esb0JBQUksQ0FBQytDLElBQUl0QixJQUFKLENBQVM2QyxlQUFkLEVBQStCO0FBQzdCLHVCQUFLdEUsV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Qsb0JBQUksQ0FBQytDLElBQUl0QixJQUFKLENBQVM4QyxXQUFkLEVBQTJCO0FBQ3pCLHVCQUFLdkUsV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Qsb0JBQUksQ0FBQytDLElBQUl0QixJQUFKLENBQVMrQyxjQUFkLEVBQThCO0FBQzVCLHVCQUFLeEUsV0FBTCxHQUFtQixDQUFuQjtBQUNEOztBQUVELHFCQUFLOEQsVUFBTDtBQUNBLHFCQUFLM0IsTUFBTDs7a0RBRU8sS0FBS25DLFc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHaEI7Ozs7Ozs7Ozs7O0FBRUV5RSx3QkFBUUMsR0FBUixDQUFZLEtBQUtyRSxTQUFqQixFQUE0QixLQUFLQyxhQUFqQzs7c0JBQ0ksS0FBS0QsU0FBTCxJQUFrQixDQUFDLEtBQUtDLGE7Ozs7Ozs7O0FBRzVCLHFCQUFLRCxTQUFMLEdBQWlCLElBQWpCOzt1QkFDZ0Isb0JBQVE7QUFDdEJxQyx1QkFBSyx1QkFEaUI7QUFFdEJqQix3QkFBTTtBQUNKNEMsZ0NBQVksS0FBS3ZFLFNBRGI7QUFFSjZFLDRCQUFRLEtBQUt2RTtBQUZUO0FBRmdCLGlCQUFSLEM7OztBQUFaMkMsbUI7O0FBT0osb0JBQUlBLE9BQU9BLElBQUl0QixJQUFmLEVBQXFCO0FBQ25CLHVCQUFLMEIsa0JBQUwsQ0FBd0JKLElBQUl0QixJQUFKLENBQVNtRCxZQUFqQztBQUNBLHVCQUFLL0UsT0FBTCxHQUFla0QsSUFBSXRCLElBQUosQ0FBU29ELFFBQVQsSUFBcUIsRUFBcEM7QUFDQSx1QkFBSzVFLFNBQUwsZ0NBQ0ssS0FBS0EsU0FEVixzQkFFSzhDLElBQUl0QixJQUFKLENBQVNxRCxJQUZkO0FBSUEsdUJBQUsxRSxTQUFMLEdBQWlCMkMsSUFBSXRCLElBQUosQ0FBU2tELE1BQVQsSUFBbUIsRUFBcEM7QUFDQSx1QkFBS3RFLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsYUFBTCxHQUFxQnlDLElBQUl0QixJQUFKLENBQVNzRCxRQUE5QjtBQUNBLHVCQUFLNUMsTUFBTDtBQUNBLHVCQUFLMkIsVUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUg7Ozs7OzRGQUNvQmtCLEM7Ozs7Ozt1QkFDWixLQUFLbkIsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUt5QixlQUFLb0IsSTs7a0JBQW5CckUsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgcHVibGlzaFBob3RvIGZyb20gJ0AvY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IHJlZnJlc2hJbmRleE1peGluIGZyb20gJ0AvbWl4aW5zL3JlZnJlc2hJbmRleE1peGluJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJ0AvY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuXG5pbXBvcnQge1xuICByZXF1ZXN0LFxuICB3eENoZWNrTG9naW5cbn0gZnJvbSAnQC91dGlscy9sb2dpbidcblxudmFyIHBhZ2VEYXRhID0ge1xuICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgZ3JvdXBJZDogJycsXG4gIGdhbGxlcnlJZDogJzEnLCAvLyDnm7jlhoxpZFxuICBnYWxsZXJ5VGl0bGU6ICcnLFxuICBnYWxsZXJ5QXV0aDogLTEsIC8vIOebuOWGjOadg+mZkCAvLzAg6ZqQ56eBIDEg6IO955yL5LiN6IO95LiK5LygIDIg5YWo6YOo5p2D6ZmQIDMg5LiN6IO95L+u5pS55ZCN56ewXG5cbiAgcGhvdG9MaXN0OiBbXSxcbiAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICBjdXJDdXJzb3I6IDAsXG4gIGlzR2V0TGlzdDogZmFsc2UsXG4gIGlzTGlzdEhhc05leHQ6IHRydWUsXG5cbiAgaXNTaG93TmV3QWxidW06IGZhbHNlLCAvLyDkv67mlLnlkI3np7DlvLnnqpdcbiAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgaXNSZWZyZXNoSW5kZXg6IGZhbHNlLCAvLyDku47liJvlu7rov4fmnaXnmoRcbiAgaXNTdWJtaXRGb3JtSWQ6IHRydWUsIC8vIOWFgeiuuOaPkOS6pGZvcm1pZFxuXG4gIHB1Ymxpc2hBZnRlckluZm86IG51bGxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5QXV0aC5zeW5jXCI6XCJnYWxsZXJ5QXV0aFwiLFwidi1iaW5kOmdyb3VwSWQuc3luY1wiOlwiZ3JvdXBJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wiLFwidi1iaW5kOmdhbGxlcnlJZC5zeW5jXCI6XCJnYWxsZXJ5SWRcIn0sXCJuZXdBbGJ1bVwiOntcInYtYmluZDpnYWxsZXJ5VGl0bGUuc3luY1wiOlwiZ2FsbGVyeVRpdGxlXCIsXCJ2LWJpbmQ6bmV3QWxidW1UaXRsZS5vbmNlXCI6XCJuZXdBbGJ1bVRpdGxlXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpwaG90b1phbkNoYW5nZVwiOlwicGhvdG9aYW5DaGFuZ2VcIn0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LW9uOmNsZWFyQ3VyUGhvdG9zXCI6XCJjbGVhckN1clBob3Rvc1wifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246Y2hhbmdlUHVibGlzaEluZm9cIjpcImNoYW5nZVB1Ymxpc2hJbmZvXCIsXCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG8sXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2VEYXRhKVxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBjaGFuZ2VQdWJsaXNoSW5mbyhkYXRhKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hBZnRlckluZm8gPSBkYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3VwZGF0ZW5hbWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgICAgICBnYWxsZXJ5TmFtZTogdGl0bGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkv67mlLnlpLHotKUnKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S/ruaUueaIkOWKnycpXG4gICAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHRpdGxlKVxuICAgICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhvdG9aYW5DaGFuZ2UoaWR4LCB6YW5MaXN0KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phbiA9ICF0aGlzLnBob3RvTGlzdFtpZHhdLmlzX3phblxuICAgICAgdGhpcy5waG90b0xpc3RbaWR4XS56YW5fbGlzdCA9IHphbkxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhZ2VEYXRhKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgICBhd2FpdCB0aGlzLmdldEdhbGxlcnlBdXRoKClcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoICE9PSAwKSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZSxcbiAgICAgIHBhdGg6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH1gXG4gICAgfVxuICB9XG4gIC8vIOS/ruaUueagh+mimFxuICBjaGFuZ2VHYWxsZXJ5VGl0bGUodGV4dCkge1xuICAgIHRoaXMuZ2FsbGVyeVRpdGxlID0gdGV4dCB8fCAn55u45YaM6K+m5oOFJ1xuICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZVxuICAgIH0pXG4gIH1cbiAgLy8g5Yid5aeL5YyW6YWN572uXG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gIH1cbiAgLy8g55u45YaM5p2D6ZmQXG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDEwXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9tb2RpZnlfaW5mbykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMlxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fcHVibGlzaCkge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMVxuICAgICAgfVxuICAgICAgaWYgKCFyZXMuZGF0YS5jYW5fdmlld19waG90bykge1xuICAgICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuXG4gICAgICByZXR1cm4gdGhpcy5nYWxsZXJ5QXV0aFxuICAgIH1cbiAgfVxuICAvLyDnhafniYfliJfooahcbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmlzR2V0TGlzdCwgdGhpcy5pc0xpc3RIYXNOZXh0KVxuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCAhdGhpcy5pc0xpc3RIYXNOZXh0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogdGhpcy5jdXJDdXJzb3JcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHJlcy5kYXRhLmdhbGxlcnlfbmFtZSlcbiAgICAgIHRoaXMuZ3JvdXBJZCA9IHJlcy5kYXRhLmdyb3VwX2lkIHx8ICcnXG4gICAgICB0aGlzLnBob3RvTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5waG90b0xpc3QsXG4gICAgICAgIC4uLnJlcy5kYXRhLmxpc3RcbiAgICAgIF1cbiAgICAgIHRoaXMuY3VyQ3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yIHx8ICcnXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzTGlzdEhhc05leHQgPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICB9XG4gIH1cbiAgLy8g5LiL5ZWm5Yqg6L29XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbn1cbiJdfQ==