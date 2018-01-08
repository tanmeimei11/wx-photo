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
  this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem.sync" } };
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.sync": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" }, "publishPhoto": { "bindgalleryId": "galleryId", "v-bind:publishAfterInfo.sync": "publishAfterInfo" } };
  this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto" } };
  this.components = {
    photoItem: _photoItem2.default,
    previewPhoto: _previewPhoto2.default,
    publishPhoto: _publishPhoto2.default };
  this.data = {
    galleryId: '123', // 相册id
    galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限

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
    }
    // changeZanList(idx, photoId, zanlist) {
    //   var _photo = this.photoList[idx]
    //   console.log(photoId, _photo.photo_id, zanlist)
    //   if (_photo.photo_id === photoId) {
    //     this.photoList[idx].zan_list = zanlist
    //   }
    //   this.$apply()
    // }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0R2FsbGVyeUF1dGgiLCJjb25zb2xlIiwibG9nIiwiZ2FsbGVyeUF1dGgiLCJnZXRMaXN0IiwibG9hZGluZ091dCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwidGV4dCIsInNob3dMb2FkaW5nIiwibWFzayIsImhpZGVMb2FkaW5nIiwidXJsIiwiZGF0YSIsImdhbGxlcnlfaWQiLCJnYWxsZXJ5SWQiLCJyZXMiLCJjYW5fcHVibGlzaCIsImNhbl92aWV3X3Bob3RvIiwiJGFwcGx5IiwiaXNHZXRMaXN0IiwiaXNHZXRMaXN0RmluaXNoIiwiY3Vyc29yIiwicGhvdG9MaXN0IiwicHVzaCIsImFwcGx5IiwibGlzdCIsImN1ckN1cnNvciIsImhhc19uZXh0IiwiZSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGhvdG9JdGVtIiwicHJldmlld1Bob3RvIiwicHVibGlzaFBob3RvIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbkI7O0FBS0E7OztBQVVBOzs7Ozs7Ozs7Ozs7O0FBeURJLHFCQUFLQyxTQUFMLENBQWUsS0FBZjs7dUJBQ00s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TDtBQUNELEtBWk87QUFhUnFCLGdCQWJRLHdCQWFLYSxHQWJMLEVBYVU7QUFDaEIsV0FBSzlCLFNBQUwsQ0FBZTZCLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEJDLEdBQTVCO0FBQ0EsV0FBS2xDLE1BQUw7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBeEJRLEc7T0EyQlZtQyxNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQXpELGNBQVFDLEdBQVIsQ0FBZSxPQUFLeUQsS0FBcEIsaUJBQXFDRixPQUFPRyxJQUE1QyxjQUF5REgsT0FBT0ksTUFBUCxDQUFjRixLQUF2RTtBQUNEO0FBSk0sRzs7O2tCQWpFVTdELEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgcHVibGlzaFBob3RvIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnrKzkuIDmrKHogZrkvJonLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcImJpbmRnYWxsZXJ5SWRcIjpcImdhbGxlcnlJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIn0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LW9uOmNsZWFyQ3VyUGhvdG9zXCI6XCJjbGVhckN1clBob3Rvc1wifSxcInB1Ymxpc2hQaG90b1wiOntcInYtb246cHVibGlzaFBob3RvXCI6XCJwdWJsaXNoUGhvdG9cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBwaG90b0l0ZW06IFBob3RvSXRlbSxcbiAgICBwcmV2aWV3UGhvdG86IFByZXZpZXdQaG90byxcbiAgICBwdWJsaXNoUGhvdG86IHB1Ymxpc2hQaG90b1xuICB9XG5cbiAgLy8gZGF0YVxuICBkYXRhID0ge1xuICAgIGdhbGxlcnlJZDogJzEyMycsIC8vIOebuOWGjGlkXG4gICAgZ2FsbGVyeUF1dGg6IC0xLCAvLyDnm7jlhozmnYPpmZAgLy8wIOmakOengSAxIOiDveeci+S4jeiDveS4iuS8oCAyIOWFqOmDqOadg+mZkFxuXG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZSxcbiAgICBpc0dldExpc3RGaW5pc2g6IGZhbHNlXG5cbiAgICAvLyBwdWJsaXNoQWZ0ZXJJbmZvOiBudWxsIC8vIOWPkeW4g+eFp+eJh+S5i+WQjuawlOazoeS/oeaBr1xuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG4gICAgbm93KCkge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSAwXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IHBob3Rvc1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zSWR4ID0gaWR4XG4gICAgfSxcbiAgICBkZWxldFBob3RvKGlkeCkge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHB1Ymxpc2hQaG90byhvYmopIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZSgwLCAwLCBvYmopXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIC8vIGNoYW5nZVphbkxpc3QoaWR4LCBwaG90b0lkLCB6YW5saXN0KSB7XG4gICAgLy8gICB2YXIgX3Bob3RvID0gdGhpcy5waG90b0xpc3RbaWR4XVxuICAgIC8vICAgY29uc29sZS5sb2cocGhvdG9JZCwgX3Bob3RvLnBob3RvX2lkLCB6YW5saXN0KVxuICAgIC8vICAgaWYgKF9waG90by5waG90b19pZCA9PT0gcGhvdG9JZCkge1xuICAgIC8vICAgICB0aGlzLnBob3RvTGlzdFtpZHhdLnphbl9saXN0ID0gemFubGlzdFxuICAgIC8vICAgfVxuICAgIC8vICAgdGhpcy4kYXBwbHkoKVxuICAgIC8vIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgICBhd2FpdCB0aGlzLmdldEdhbGxlcnlBdXRoKClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2FsbGVyeUF1dGgpXG4gICAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmdldExpc3QoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgbG9hZGluZ0luKHRleHQpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogdGV4dCxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIGFzeW5jIGdldEdhbGxlcnlBdXRoKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgaWYgKHJlcy5kYXRhLmNhbl9wdWJsaXNoKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeUF1dGggPSAxXG4gICAgICB9XG4gICAgICBpZiAocmVzLmRhdGEuY2FuX3ZpZXdfcGhvdG8pIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5QXV0aCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgaWYgKHRoaXMuaXNHZXRMaXN0IHx8IHRoaXMuaXNHZXRMaXN0RmluaXNoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5pc0dldExpc3QgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogMSxcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5wdXNoLmFwcGx5KHRoaXMucGhvdG9MaXN0LCByZXMuZGF0YS5saXN0KVxuICAgICAgdGhpcy5jdXJDdXJzb3IgPSByZXMuZGF0YS5jdXJzb3JcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICB0aGlzLmlzR2V0TGlzdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzR2V0TGlzdEZpbmlzaCA9IHJlcy5kYXRhLmhhc19uZXh0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0TGlzdCgpXG4gIH1cbn1cbiJdfQ==