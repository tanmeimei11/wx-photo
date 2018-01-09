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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryAuth.sync": "galleryAuth", "v-bind:groupId.sync": "groupId", "v-bind:galleryId.sync": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle", "v-bind:newAlbumTitle.once": "newAlbumTitle" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto", "v-on:openNewAlbum": "openNewAlbum" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default,
      newAlbum: _newAlbum2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default, _formSubmitMixin2.default, _refreshIndexMixin2.default], _this.data = {
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
      isGetListFinish: false,

      isShowNewAlbum: false, // 修改名称弹窗
      newAlbumTitle: '修改相册名称',

      isRefreshIndex: false, // 从创建过来的
      isSubmitFormId: true // 允许提交formid
    }, _this.methods = {
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
      }()
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
                this.refreshIndex();
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
        path: '/page/album/album?id=' + this.galleryId
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

                if (res && res.data) {
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
                }

              case 4:
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
                if (!(this.isGetList || this.isGetListFinish)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                this.isGetList = true;
                _context4.next = 5;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: this.galleryId,
                    cursor: 0
                  }
                });

              case 5:
                res = _context4.sent;

                if (res && res.data) {
                  this.changeGalleryTitle(res.data.gallery_name);
                  this.groupId = res.data.group_id || '';
                  this.photoList.push.apply(this.photoList, res.data.list);
                  this.curCursor = res.data.cursor;
                  this.loadingOut();
                  this.isGetList = false;
                  this.isGetListFinish = res.data.has_next;
                  this.$apply();
                }

              case 7:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm5ld0FsYnVtIiwibWl4aW5zIiwiZGF0YSIsInBhZ2VOYW1lIiwiZ3JvdXBJZCIsImdhbGxlcnlJZCIsImdhbGxlcnlUaXRsZSIsImdhbGxlcnlBdXRoIiwicGhvdG9MaXN0IiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjdXJDdXJzb3IiLCJpc0dldExpc3QiLCJpc0dldExpc3RGaW5pc2giLCJpc1Nob3dOZXdBbGJ1bSIsIm5ld0FsYnVtVGl0bGUiLCJpc1JlZnJlc2hJbmRleCIsImlzU3VibWl0Rm9ybUlkIiwibWV0aG9kcyIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsIiRhcHBseSIsIm9iaiIsIm9wZW5OZXdBbGJ1bSIsImNsb3NlTmV3QWxidW0iLCJzdWJtaXRUaXRsZSIsInRpdGxlIiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiaWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInRvYXN0RmFpbCIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJjaGFuZ2VHYWxsZXJ5VGl0bGUiLCJldmVudHMiLCJvcHRpb25zIiwicmVmcmVzaEluZGV4IiwibG9hZGluZ0luIiwiaW5pdE9wdGlvbnMiLCJnZXRHYWxsZXJ5QXV0aCIsImdldExpc3QiLCJsb2FkaW5nT3V0Iiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwicGF0aCIsInRleHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJnYWxsZXJ5X2lkIiwiY2FuX21vZGlmeV9pbmZvIiwiY2FuX3B1Ymxpc2giLCJjYW5fdmlld19waG90byIsImN1cnNvciIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2lkIiwicHVzaCIsImFwcGx5IiwibGlzdCIsImhhc19uZXh0IiwiZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBS3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsZ0JBQTNCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQWhCLEVBQTJGLHlCQUF3QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sV0FBcEMsRUFBZ0QsUUFBTyxNQUF2RCxFQUE4RCxTQUFRLE9BQXRFLEVBQThFLE9BQU0sT0FBcEYsRUFBbkgsRUFBZ04sMEJBQXlCLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxXQUF0QyxFQUFrRCxRQUFPLE1BQXpELEVBQWdFLFNBQVEsT0FBeEUsRUFBZ0YsT0FBTSxPQUF0RixFQUF6TyxFQUF3VSxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFyVixFQUFiLEVBQThhLGdCQUFlLEVBQUMsc0JBQXFCLGVBQXRCLEVBQXNDLHdCQUF1QixrQkFBN0QsRUFBN2IsRUFBOGdCLGdCQUFlLEVBQUMsMkJBQTBCLGFBQTNCLEVBQXlDLHVC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Qzs7Ozs7O3VCQUNaLEtBQUtuQixPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvS3lCLGVBQUtvQixJOztrQkFBbkI5RSxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnQC9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5pbXBvcnQgcmVmcmVzaEluZGV4TWl4aW4gZnJvbSAnQC9taXhpbnMvcmVmcmVzaEluZGV4TWl4aW4nXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnQC9jb21wb25lbnRzL2dhbGxlcnkvbmV3QWxidW0nXG5cbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICdAL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjOivpuaDhScsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LWJpbmQ6cGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIixcInYtYmluZDpwaG90b0lkeC5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zSWR4XCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1iaW5kOmdhbGxlcnlBdXRoLnN5bmNcIjpcImdhbGxlcnlBdXRoXCIsXCJ2LWJpbmQ6Z3JvdXBJZC5zeW5jXCI6XCJncm91cElkXCIsXCJ2LWJpbmQ6Z2FsbGVyeUlkLnN5bmNcIjpcImdhbGxlcnlJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wifSxcIm5ld0FsYnVtXCI6e1widi1iaW5kOmdhbGxlcnlUaXRsZS5zeW5jXCI6XCJnYWxsZXJ5VGl0bGVcIixcInYtYmluZDpuZXdBbGJ1bVRpdGxlLm9uY2VcIjpcIm5ld0FsYnVtVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCIsXCJ2LW9uOm9wZW5OZXdBbGJ1bVwiOlwib3Blbk5ld0FsYnVtXCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG8sXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW4sIGZvcm1TdWJtaXRNaXhpbiwgcmVmcmVzaEluZGV4TWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBwYWdlTmFtZTogJ2FsYnVtJyxcbiAgICBncm91cElkOiAnJyxcbiAgICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgICBnYWxsZXJ5VGl0bGU6ICcnLFxuICAgIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZAgMyDkuI3og73kv67mlLnlkI3np7BcblxuICAgIHBob3RvTGlzdDogW10sXG4gICAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICAgIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gICAgY3VyQ3Vyc29yOiAwLFxuICAgIGlzR2V0TGlzdDogZmFsc2UsXG4gICAgaXNHZXRMaXN0RmluaXNoOiBmYWxzZSxcblxuICAgIGlzU2hvd05ld0FsYnVtOiBmYWxzZSwgLy8g5L+u5pS55ZCN56ew5by556qXXG4gICAgbmV3QWxidW1UaXRsZTogJ+S/ruaUueebuOWGjOWQjeensCcsXG5cbiAgICBpc1JlZnJlc2hJbmRleDogZmFsc2UsIC8vIOS7juWIm+W7uui/h+adpeeahFxuICAgIGlzU3VibWl0Rm9ybUlkOiB0cnVlIC8vIOWFgeiuuOaPkOS6pGZvcm1pZFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xlYXJDdXJQaG90b3MoKSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBbXVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gMFxuICAgIH0sXG4gICAgY2hhbmdlQ3VyUGhvdG9zKHBob3RvcywgaWR4KSB7XG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgb3Blbk5ld0FsYnVtKCkge1xuICAgICAgdGhpcy5pc1Nob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLmlzU2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvdXBkYXRlbmFtZScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdhbGxlcnlJZCxcbiAgICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdEZhaWwoJ+S/ruaUueWksei0pScpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICB0aGlzLnRvYXN0U3VjYygn5L+u5pS55oiQ5YqfJylcbiAgICAgICAgdGhpcy5jaGFuZ2VHYWxsZXJ5VGl0bGUodGl0bGUpXG4gICAgICAgIHRoaXMuaXNTaG93TmV3QWxidW0gPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9XG4gIGFzeW5jIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5yZWZyZXNoSW5kZXgoKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICAgIGF3YWl0IHd4Q2hlY2tMb2dpbigpXG4gICAgICBhd2FpdCB0aGlzLmdldEdhbGxlcnlBdXRoKClcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoICE9PSAwKSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLmdhbGxlcnlUaXRsZSxcbiAgICAgIHBhdGg6IGAvcGFnZS9hbGJ1bS9hbGJ1bT9pZD0ke3RoaXMuZ2FsbGVyeUlkfWBcbiAgICB9XG4gIH1cbiAgLy8g5L+u5pS55qCH6aKYXG4gIGNoYW5nZUdhbGxlcnlUaXRsZSh0ZXh0KSB7XG4gICAgdGhpcy5nYWxsZXJ5VGl0bGUgPSB0ZXh0IHx8ICfnm7jlhozor6bmg4UnXG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMuZ2FsbGVyeVRpdGxlXG4gICAgfSlcbiAgfVxuICAvLyDliJ3lp4vljJbphY3nva5cbiAgaW5pdE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuZ2FsbGVyeUlkID0gb3B0aW9ucy5pZCB8fCAnMSdcbiAgfVxuICAvLyDnm7jlhozmnYPpmZBcbiAgYXN5bmMgZ2V0R2FsbGVyeUF1dGgoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdhbGxlcnlBdXRoID0gMTBcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX21vZGlmeV9pbmZvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAyXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl92aWV3X3Bob3RvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAwXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIC8vIOeFp+eJh+WIl+ihqFxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCB0aGlzLmlzR2V0TGlzdEZpbmlzaCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuY2hhbmdlR2FsbGVyeVRpdGxlKHJlcy5kYXRhLmdhbGxlcnlfbmFtZSlcbiAgICAgIHRoaXMuZ3JvdXBJZCA9IHJlcy5kYXRhLmdyb3VwX2lkIHx8ICcnXG4gICAgICB0aGlzLnBob3RvTGlzdC5wdXNoLmFwcGx5KHRoaXMucGhvdG9MaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzR2V0TGlzdEZpbmlzaCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIC8vIOS4i+WVpuWKoOi9vVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=