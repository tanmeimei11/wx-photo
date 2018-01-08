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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 配置

  // 组件


  // data


  _createClass(Index, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                this.loadingIn('加载中');
                _context.next = 4;
                return this.getGalleryAuth();

              case 4:
                console.log(this.galleryAuth);
                if (this.galleryAuth !== 0) {
                  this.getList();
                }
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                this.loadingOut();
                wx.showToast({
                  title: '加载失败',
                  icon: 'loading'
                });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'loadingIn',
    value: function loadingIn(text) {
      wx.showLoading({
        title: text,
        mask: true
      });
    }
  }, {
    key: 'loadingOut',
    value: function loadingOut() {
      wx.hideLoading();
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
                });

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

      function onReachBottom(_x) {
        return _ref5.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {
    navigationBarTitleText: '第一次聚会',
    onReachBottomDistance: '100' };
  this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } };
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "bindgalleryId": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" } };
  this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto" } };
  this.components = {
    photoItem: _photoItem2.default,
    previewPhoto: _previewPhoto2.default,
    publishPhoto: _publishPhoto2.default };
  this.data = {
    galleryId: '1', // 相册id
    galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false
  };
  this.methods = {
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
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref6;

      var $event = (_ref6 = arguments.length - 1, arguments.length <= _ref6 ? undefined : arguments[_ref6]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0R2FsbGVyeUF1dGgiLCJjb25zb2xlIiwibG9nIiwiZ2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwidGV4dCIsInNob3dMb2FkaW5nIiwibWFzayIsImhpZGVMb2FkaW5nIiwidXJsIiwiZGF0YSIsImdhbGxlcnlfaWQiLCJnYWxsZXJ5SWQiLCJyZXMiLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiJGFwcGx5IiwiaXNHZXRMaXN0IiwiaXNHZXRMaXN0RmluaXNoIiwiY3Vyc29yIiwicGhvdG9MaXN0IiwicHVzaCIsImFwcGx5IiwibGlzdCIsImN1ckN1cnNvciIsImhhc19uZXh0IiwiZSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGhvdG9JdGVtIiwicHJldmlld1Bob3RvIiwicHVibGlzaFBob3RvIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbkI7O0FBS0E7OztBQVVBOzs7Ozs7Ozs7Ozs7O0FBeUNJLHFCQUFLQyxTQUFMLENBQWUsS0FBZjs7dUJBQ00sS0FBS0MsY0FBTCxFOzs7QUFDTkMsd0JB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LENBQWUwQixNQUFmLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCQyxHQUE1QjtBQUNBLFdBQUsvQixNQUFMO0FBQ0Q7QUFoQk8sRztPQW1CVmdDLE0sR0FBUztBQUNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBdEQsY0FBUUMsR0FBUixDQUFlLE9BQUtzRCxLQUFwQixpQkFBcUNGLE9BQU9HLElBQTVDLGNBQXlESCxPQUFPSSxNQUFQLENBQWNGLEtBQXZFO0FBQ0Q7QUFKTSxHOzs7a0JBakRVMUQsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+esrOS4gOasoeiBmuS8micsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LWJpbmQ6cGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIixcInYtYmluZDpwaG90b0lkeC5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zSWR4XCJ9LFwicHVibGlzaFBob3RvXCI6e1wiYmluZGdhbGxlcnlJZFwiOlwiZ2FsbGVyeUlkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wifSxcInByZXZpZXdQaG90b1wiOntcInYtb246Y2xlYXJDdXJQaG90b3NcIjpcImNsZWFyQ3VyUGhvdG9zXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogcHVibGlzaFBob3RvXG4gIH1cblxuICAvLyBkYXRhXG4gIGRhdGEgPSB7XG4gICAgZ2FsbGVyeUlkOiAnMScsIC8vIOebuOWGjGlkXG4gICAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkFxuXG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgICBpc0dldExpc3RGaW5pc2g6IGZhbHNlXG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cblxuICBldmVudHMgPSB7XG4gICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgIH1cbiAgfVxuICBhc3luYyBvbkxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9hZGluZ0luKCfliqDovb3kuK0nKVxuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbGxlcnlBdXRoKVxuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggIT09IDApIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKUnLFxuICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGxvYWRpbmdJbih0ZXh0KSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6IHRleHQsXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSlcbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBhc3luYyBnZXRHYWxsZXJ5QXV0aCgpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAyXG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAoIXJlcy5kYXRhLmNhbl92aWV3X3Bob3RvKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAwXG4gICAgICB9XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGlmICh0aGlzLmlzR2V0TGlzdCB8fCB0aGlzLmlzR2V0TGlzdEZpbmlzaCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnB1c2guYXBwbHkodGhpcy5waG90b0xpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvclxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNHZXRMaXN0RmluaXNoID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19