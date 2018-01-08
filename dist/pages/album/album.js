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
                _context.next = 3;
                return this.getGalleryAuth();

              case 3:
                this.loadingIn('加载中');
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
                  if (res.data.can_publish) {
                    this.galleryAuth = 1;
                  }
                  if (res.data.can_view_photo) {
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
                    gallery_id: 1,
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
  this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem" } };
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.once": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "bindgalleryId": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" } };
  this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto", "v-on:changeZanList": "changeZanList" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto" } };
  this.components = {
    photoItem: _photoItem2.default,
    previewPhoto: _previewPhoto2.default,
    publishPhoto: _publishPhoto2.default };
  this.data = {
    galleryId: '123', // 相册id
    galleryAuth: 2, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false

    // publishAfterInfo: null // 发布照片之后气泡信息
  };
  this.computed = {
    now: function now() {
      return +new Date();
    }
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
    },
    changeZanList: function changeZanList(idx, photoId, zanlist) {
      var _photo = this.photoList[idx];
      if (_photo.photo_id === photoId) {
        _photo.zan_list = zanlist;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZ2V0R2FsbGVyeUF1dGgiLCJsb2FkaW5nSW4iLCJjb25zb2xlIiwibG9nIiwiZ2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwidGV4dCIsInNob3dMb2FkaW5nIiwibWFzayIsImhpZGVMb2FkaW5nIiwidXJsIiwiZGF0YSIsImdhbGxlcnlfaWQiLCJnYWxsZXJ5SWQiLCJyZXMiLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiJGFwcGx5IiwiaXNHZXRMaXN0IiwiaXNHZXRMaXN0RmluaXNoIiwiY3Vyc29yIiwicGhvdG9MaXN0IiwicHVzaCIsImFwcGx5IiwibGlzdCIsImN1ckN1cnNvciIsImhhc19uZXh0IiwiZSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGhvdG9JdGVtIiwicHJldmlld1Bob3RvIiwicHVibGlzaFBob3RvIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiY2hhbmdlWmFuTGlzdCIsInBob3RvSWQiLCJ6YW5saXN0IiwiX3Bob3RvIiwicGhvdG9faWQiLCJ6YW5fbGlzdCIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs7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R0FUSCxFQVNRO0FBQ2QsV0FBSzNCLFNBQUwsQ0FBZTZCLE1BQWYsQ0FBc0JGLEdBQXRCLEVBQTJCLENBQTNCO0FBQ0EsV0FBSy9CLE1BQUw7QUFDRCxLQVpPO0FBYVJxQixnQkFiUSx3QkFhS2EsR0FiTCxFQWFVO0FBQ2hCLFdBQUs5QixTQUFMLENBQWU2QixNQUFmLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCQyxHQUE1QjtBQUNBLFdBQUtsQyxNQUFMO0FBQ0QsS0FoQk87QUFpQlJtQyxpQkFqQlEseUJBaUJNSixHQWpCTixFQWlCV0ssT0FqQlgsRUFpQm9CQyxPQWpCcEIsRUFpQjZCO0FBQ25DLFVBQUlDLFNBQVMsS0FBS2xDLFNBQUwsQ0FBZTJCLEdBQWYsQ0FBYjtBQUNBLFVBQUlPLE9BQU9DLFFBQVAsS0FBb0JILE9BQXhCLEVBQWlDO0FBQy9CRSxlQUFPRSxRQUFQLEdBQWtCSCxPQUFsQjtBQUNEO0FBQ0QsV0FBS3JDLE1BQUw7QUFDRDtBQXZCTyxHO09BMEJWeUMsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0EvRCxjQUFRQyxHQUFSLENBQWUsT0FBSytELEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkFoRVVuRSxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IHB1Ymxpc2hQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56ys5LiA5qyh6IGa5LyaJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LWJpbmQ6cGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIixcInYtYmluZDpwaG90b0lkeC5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zSWR4XCJ9LFwicHVibGlzaFBob3RvXCI6e1wiYmluZGdhbGxlcnlJZFwiOlwiZ2FsbGVyeUlkXCIsXCJ2LWJpbmQ6cHVibGlzaEFmdGVySW5mby5zeW5jXCI6XCJwdWJsaXNoQWZ0ZXJJbmZvXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wiLFwidi1vbjpjaGFuZ2VaYW5MaXN0XCI6XCJjaGFuZ2VaYW5MaXN0XCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG9cbiAgfVxuXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBnYWxsZXJ5SWQ6ICcxMjMnLCAvLyDnm7jlhoxpZFxuICAgIGdhbGxlcnlBdXRoOiAyLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkFxuXG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgICBpc0dldExpc3RGaW5pc2g6IGZhbHNlXG5cbiAgICAvLyBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsIC8vIOWPkeW4g+eFp+eJh+S5i+WQjuawlOazoeS/oeaBr1xuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG4gICAgbm93KCkge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaGFuZ2VaYW5MaXN0KGlkeCwgcGhvdG9JZCwgemFubGlzdCkge1xuICAgICAgdmFyIF9waG90byA9IHRoaXMucGhvdG9MaXN0W2lkeF1cbiAgICAgIGlmIChfcGhvdG8ucGhvdG9faWQgPT09IHBob3RvSWQpIHtcbiAgICAgICAgX3Bob3RvLnphbl9saXN0ID0gemFubGlzdFxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5nZXRHYWxsZXJ5QXV0aCgpXG4gICAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2FsbGVyeUF1dGgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgbG9hZGluZ0luKHRleHQpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogdGV4dCxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgaWYgKHJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAocmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8IHRoaXMuaXNHZXRMaXN0RmluaXNoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogMSxcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5wdXNoLmFwcGx5KHRoaXMucGhvdG9MaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzR2V0TGlzdEZpbmlzaCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbn1cbiJdfQ==