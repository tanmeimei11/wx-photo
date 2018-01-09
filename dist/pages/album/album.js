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
    }, _this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } }, _this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "v-bind:galleryId.sync": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" } }, _this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto" } }, _this.components = {
      photoItem: _photoItem2.default,
      previewPhoto: _previewPhoto2.default,
      publishPhoto: _publishPhoto2.default
      // 混合
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      galleryId: '1', // 相册id
      galleryTitle: '',
      galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限

      photoList: [],
      previewPhotos: [], // 预览照片
      previewPhotosIdx: 0, // 预览照片开始位置

      curCursor: 0,
      isGetList: false,
      isGetListFinish: false
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
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 配置

  // data


  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                this.loadingIn('加载中');
                this.initOptions(options);
                _context.next = 5;
                return (0, _login.wxCheckLogin)();

              case 5:
                _context.next = 7;
                return this.getGalleryAuth();

              case 7:
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](0);

                this.loadingOut();
                wx.showToast({
                  title: '加载失败',
                  icon: 'loading'
                });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: this.galleryTitle,
        path: '/page/album/album?id=' + this.galleryId + '&title=' + this.galleryTitle
      };
    }
  }, {
    key: 'initOptions',
    value: function initOptions(options) {
      this.galleryId = options.id || '1';
      this.galleryTitle = options.title;
      _wepy2.default.setNavigationBarTitle({
        title: options.title || '相册详情'
      });
    }
  }, {
    key: 'getGalleryAuth',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _login.request)({
                  url: '/gg/gallery/info',
                  data: {
                    gallery_id: this.galleryId
                  }
                }, true);

              case 2:
                res = _context2.sent;

                if (res && res.data) {
                  this.galleryAuth = 2;
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
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getGalleryAuth() {
        return _ref3.apply(this, arguments);
      }

      return getGalleryAuth;
    }()
  }, {
    key: 'getList',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.isGetList || this.isGetListFinish)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                this.isGetList = true;
                _context3.next = 5;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: this.galleryId,
                    cursor: 0
                  }
                });

              case 5:
                res = _context3.sent;

                if (res && res.data) {
                  this.photoList.push.apply(this.photoList, res.data.list);
                  this.curCursor = res.data.cursor;
                  this.loadingOut();
                  this.isGetList = false;
                  this.isGetListFinish = res.data.has_next;
                  this.$apply();
                }

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getList() {
        return _ref4.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getList();

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onReachBottom(_x2) {
        return _ref5.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsIm1peGlucyIsImRhdGEiLCJnYWxsZXJ5SWQiLCJnYWxsZXJ5VGl0bGUiLCJnYWxsZXJ5QXV0aCIsInBob3RvTGlzdCIsInByZXZpZXdQaG90b3MiLCJwcmV2aWV3UGhvdG9zSWR4IiwiY3VyQ3Vyc29yIiwiaXNHZXRMaXN0IiwiaXNHZXRMaXN0RmluaXNoIiwibWV0aG9kcyIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsIiRhcHBseSIsIm9iaiIsImV2ZW50cyIsIm9wdGlvbnMiLCJsb2FkaW5nSW4iLCJpbml0T3B0aW9ucyIsImdldEdhbGxlcnlBdXRoIiwiZ2V0TGlzdCIsImxvYWRpbmdPdXQiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInBhdGgiLCJpZCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInVybCIsImdhbGxlcnlfaWQiLCJyZXMiLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiY3Vyc29yIiwicHVzaCIsImFwcGx5IiwibGlzdCIsImhhc19uZXh0IiwiZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBS3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRXpCO0FBSlMsSyxRQUtWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVB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TCxDQUFlbUMsSUFBZixDQUFvQkMsS0FBcEIsQ0FBMEIsS0FBS3BDLFNBQS9CLEVBQTBDK0IsSUFBSW5DLElBQUosQ0FBU3lDLElBQW5EO0FBQ0EsdUJBQUtsQyxTQUFMLEdBQWlCNEIsSUFBSW5DLElBQUosQ0FBU3NDLE1BQTFCO0FBQ0EsdUJBQUtiLFVBQUw7QUFDQSx1QkFBS2pCLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0MsZUFBTCxHQUF1QjBCLElBQUluQyxJQUFKLENBQVMwQyxRQUFoQztBQUNBLHVCQUFLekIsTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUVpQjBCLEM7Ozs7Ozt1QkFDWixLQUFLbkIsT0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNUh5QixlQUFLb0IsSTs7a0JBQW5CeEQsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQgTG9hZGluZ01peGluIGZyb20gJ0AvbWl4aW5zL2xvYWRpbmdNaXhpbidcbmltcG9ydCB7XG4gIHJlcXVlc3QsXG4gIHd4Q2hlY2tMb2dpblxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhozor6bmg4UnLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcInYtYmluZDpnYWxsZXJ5SWQuc3luY1wiOlwiZ2FsbGVyeUlkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wifSxcInByZXZpZXdQaG90b1wiOntcInYtb246Y2xlYXJDdXJQaG90b3NcIjpcImNsZWFyQ3VyUGhvdG9zXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogcHVibGlzaFBob3RvXG4gIH1cbiAgLy8g5re35ZCIXG4gIG1peGlucyA9IFtMb2FkaW5nTWl4aW5dXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBnYWxsZXJ5SWQ6ICcxJywgLy8g55u45YaMaWRcbiAgICBnYWxsZXJ5VGl0bGU6ICcnLFxuICAgIGdhbGxlcnlBdXRoOiAtMSwgLy8g55u45YaM5p2D6ZmQIC8vMCDpmpDnp4EgMSDog73nnIvkuI3og73kuIrkvKAgMiDlhajpg6jmnYPpmZBcblxuICAgIHBob3RvTGlzdDogW10sXG4gICAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICAgIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gICAgY3VyQ3Vyc29yOiAwLFxuICAgIGlzR2V0TGlzdDogZmFsc2UsXG4gICAgaXNHZXRMaXN0RmluaXNoOiBmYWxzZVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG5cbiAgZXZlbnRzID0ge31cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICB0aGlzLmluaXRPcHRpb25zKG9wdGlvbnMpXG4gICAgICBhd2FpdCB3eENoZWNrTG9naW4oKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLy8g5YiG5LqrXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5nYWxsZXJ5VGl0bGUsXG4gICAgICBwYXRoOiBgL3BhZ2UvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdhbGxlcnlJZH0mdGl0bGU9JHt0aGlzLmdhbGxlcnlUaXRsZX1gXG4gICAgfVxuICB9XG4gIGluaXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdhbGxlcnlJZCA9IG9wdGlvbnMuaWQgfHwgJzEnXG4gICAgdGhpcy5nYWxsZXJ5VGl0bGUgPSBvcHRpb25zLnRpdGxlXG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IG9wdGlvbnMudGl0bGUgfHwgJ+ebuOWGjOivpuaDhSdcbiAgICB9KVxuICB9XG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0sIHRydWUpXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDJcbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3B1Ymxpc2gpIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDFcbiAgICAgIH1cbiAgICAgIGlmICghcmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8IHRoaXMuaXNHZXRMaXN0RmluaXNoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWQsXG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5waG90b0xpc3QucHVzaC5hcHBseSh0aGlzLnBob3RvTGlzdCwgcmVzLmRhdGEubGlzdClcbiAgICAgIHRoaXMuY3VyQ3Vyc29yID0gcmVzLmRhdGEuY3Vyc29yXG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy5pc0dldExpc3QgPSBmYWxzZVxuICAgICAgdGhpcy5pc0dldExpc3RGaW5pc2ggPSByZXMuZGF0YS5oYXNfbmV4dFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=