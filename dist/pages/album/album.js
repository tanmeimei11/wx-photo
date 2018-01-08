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
    value: function onLoad() {
      this.loadingIn('加载中');
      this.getList();
    }
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
    key: 'getList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.isGetList || this.isGetListFinish)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                this.isGetList = true;
                _context.next = 5;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: 1,
                    cursor: 0
                  }
                });

              case 5:
                res = _context.sent;

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
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getList() {
        return _ref2.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getList();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReachBottom(_x) {
        return _ref3.apply(this, arguments);
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

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false,

    publishAfterInfo: null // 发布照片之后气泡信息
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
    },
    showPublishBubal: function showPublishBubal(data) {
      this.publishAfterInfo = data;
      this.$apply();
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref4;

      var $event = (_ref4 = arguments.length - 1, arguments.length <= _ref4 ? undefined : arguments[_ref4]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0TGlzdCIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJpc0dldExpc3QiLCJpc0dldExpc3RGaW5pc2giLCJ1cmwiLCJkYXRhIiwiZ2FsbGVyeV9pZCIsImN1cnNvciIsInJlcyIsInBob3RvTGlzdCIsInB1c2giLCJhcHBseSIsImxpc3QiLCJjdXJDdXJzb3IiLCJsb2FkaW5nT3V0IiwiaGFzX25leHQiLCIkYXBwbHkiLCJlIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJnYWxsZXJ5SWQiLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsInB1Ymxpc2hBZnRlckluZm8iLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiY2hhbmdlWmFuTGlzdCIsInBob3RvSWQiLCJ6YW5saXN0IiwiX3Bob3RvIiwicGhvdG9faWQiLCJ6YW5fbGlzdCIsInNob3dQdWJsaXNoQnViYWwiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbkI7O0FBS0E7OztBQVVBOzs7Ozs2QkF5RFM7QUFDUCxXQUFLQyxT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TCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBZSxPQUFLQyxLQUFwQixpQkFBcUNKLE9BQU9LLElBQTVDLGNBQXlETCxPQUFPTSxNQUFQLENBQWNGLEtBQXZFO0FBQ0Q7QUFKTSxHOzs7a0JBbkVVL0QsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+esrOS4gOasoeiBmuS8micsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gIC8vIOe7hOS7tlxuICRyZXBlYXQgPSB7XCJwaG90b0xpc3RcIjp7XCJjb21cIjpcInBob3RvSXRlbVwiLFwicHJvcHNcIjpcInBob3RvSXRlbVwifX07XHJcbiRwcm9wcyA9IHtcInBob3RvSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0luZGV4Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicHJldmlld1Bob3RvXCI6e1widi1iaW5kOnBob3Rvcy5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zXCIsXCJ2LWJpbmQ6cGhvdG9JZHguc3luY1wiOlwicHJldmlld1Bob3Rvc0lkeFwifSxcInB1Ymxpc2hQaG90b1wiOntcImJpbmRnYWxsZXJ5SWRcIjpcImdhbGxlcnlJZFwiLFwidi1iaW5kOnB1Ymxpc2hBZnRlckluZm8uc3luY1wiOlwicHVibGlzaEFmdGVySW5mb1wifX07XHJcbiRldmVudHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ2LW9uOmNoYW5nZUN1clBob3Rvc1wiOlwiY2hhbmdlQ3VyUGhvdG9zXCIsXCJ2LW9uOmRlbGV0UGhvdG9cIjpcImRlbGV0UGhvdG9cIixcInYtb246Y2hhbmdlWmFuTGlzdFwiOlwiY2hhbmdlWmFuTGlzdFwifSxcInByZXZpZXdQaG90b1wiOntcInYtb246Y2xlYXJDdXJQaG90b3NcIjpcImNsZWFyQ3VyUGhvdG9zXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogcHVibGlzaFBob3RvXG4gIH1cblxuICAvLyBkYXRhXG4gIGRhdGEgPSB7XG4gICAgZ2FsbGVyeUlkOiAnMTIzJywgLy8g55u45YaMaWRcblxuICAgIHBob3RvTGlzdDogW10sXG4gICAgcHJldmlld1Bob3RvczogW10sIC8vIOmihOiniOeFp+eJh1xuICAgIHByZXZpZXdQaG90b3NJZHg6IDAsIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuXG4gICAgY3VyQ3Vyc29yOiAwLFxuICAgIGlzR2V0TGlzdDogZmFsc2UsXG4gICAgaXNHZXRMaXN0RmluaXNoOiBmYWxzZSxcblxuICAgIHB1Ymxpc2hBZnRlckluZm86IG51bGwgLy8g5Y+R5biD54Wn54mH5LmL5ZCO5rCU5rOh5L+h5oGvXG4gIH1cblxuICBjb21wdXRlZCA9IHtcbiAgICBub3coKSB7XG4gICAgICByZXR1cm4gK25ldyBEYXRlKClcbiAgICB9XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNoYW5nZVphbkxpc3QoaWR4LCBwaG90b0lkLCB6YW5saXN0KSB7XG4gICAgICB2YXIgX3Bob3RvID0gdGhpcy5waG90b0xpc3RbaWR4XVxuICAgICAgaWYgKF9waG90by5waG90b19pZCA9PT0gcGhvdG9JZCkge1xuICAgICAgICBfcGhvdG8uemFuX2xpc3QgPSB6YW5saXN0XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzaG93UHVibGlzaEJ1YmFsKGRhdGEpIHtcbiAgICAgIHRoaXMucHVibGlzaEFmdGVySW5mbyA9IGRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cblxuICBldmVudHMgPSB7XG4gICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBsb2FkaW5nSW4odGV4dCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiB0ZXh0LFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pXG4gIH1cbiAgbG9hZGluZ091dCgpIHtcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH1cbiAgYXN5bmMgZ2V0TGlzdCgpIHtcbiAgICBpZiAodGhpcy5pc0dldExpc3QgfHwgdGhpcy5pc0dldExpc3RGaW5pc2gpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmlzR2V0TGlzdCA9IHRydWVcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ2FsbGVyeS9waG90b2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiAxLFxuICAgICAgICBjdXJzb3I6IDBcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMucGhvdG9MaXN0LnB1c2guYXBwbHkodGhpcy5waG90b0xpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvclxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNHZXRMaXN0RmluaXNoID0gcmVzLmRhdGEuaGFzX25leHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRMaXN0KClcbiAgfVxufVxuIl19