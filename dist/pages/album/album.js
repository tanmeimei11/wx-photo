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
        title: text
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
                if (!this.isGetList) {
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
                  console.log(res.data.list);
                  this.photoList.push.apply(this.photoList, res.data.list);
                  this.curCursor = res.data.cursor;
                  this.$apply();
                  this.loadingOut();
                  this.isGetList = false;
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
                console.log(e);
                _context2.next = 3;
                return this.getList();

              case 3:
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
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.once": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:index.sync": "previewPhotosIdx", "xmlns:wx": "" } };
  this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" }, "previewPhoto": { "v-on:clearCurPhotos": "clearCurPhotos" }, "publishPhoto": { "v-on:publishPhoto": "publishPhoto" } };
  this.components = {
    photoItem: _photoItem2.default,
    previewPhoto: _previewPhoto2.default,
    publishPhoto: _publishPhoto2.default };
  this.data = {
    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false
  };
  this.computed = {
    now: function now() {
      return +new Date();
    }
  };
  this.methods = {
    clearCurPhotos: function clearCurPhotos() {
      this.previewPhotos = [];
    },
    changeCurPhotos: function changeCurPhotos(photos, idx) {
      console.log(photos, idx);
      this.previewPhotos = photos;
      this.previewPhotosIdx = idx;
    },
    deletPhoto: function deletPhoto(idx) {
      console.log(idx);
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
      var _ref4;

      var $event = (_ref4 = arguments.length - 1, arguments.length <= _ref4 ? undefined : arguments[_ref4]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0TGlzdCIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJoaWRlTG9hZGluZyIsImlzR2V0TGlzdCIsInVybCIsImRhdGEiLCJnYWxsZXJ5X2lkIiwiY3Vyc29yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxpc3QiLCJwaG90b0xpc3QiLCJwdXNoIiwiYXBwbHkiLCJjdXJDdXJzb3IiLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwiZSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGhvdG9JdGVtIiwicHJldmlld1Bob3RvIiwicHVibGlzaFBob3RvIiwicHJldmlld1Bob3RvcyIsInByZXZpZXdQaG90b3NJZHgiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwiY2xlYXJDdXJQaG90b3MiLCJjaGFuZ2VDdXJQaG90b3MiLCJwaG90b3MiLCJpZHgiLCJkZWxldFBob3RvIiwic3BsaWNlIiwib2JqIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbkI7O0FBS0E7OztBQVVBOzs7Ozs2QkEwQ1M7QUFDUCxXQUFLQyxTQUFMLENBQWUsS0FBZjtBQUNBLFdBQUtDLE9BQUw7QUFDRDs7OzhCQUNTQyxJLEVBQU07QUFDZEMsU0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGVBQU9IO0FBRE0sT0FBZjtBQUdEOzs7aUNBQ1k7QUFDWEMsU0FBR0csV0FBSDtBQUNEOzs7Ozs7Ozs7O3FCQUVLLEtBQUtDLFM7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QjtBQUNELEtBUk87QUFTUkMsY0FUUSxzQkFTR0QsR0FUSCxFQVNRO0FBQ2Q5QixjQUFRQyxHQUFSLENBQVk2QixHQUFaO0FBQ0EsV0FBSzNCLFNBQUwsQ0FBZTZCLE1BQWYsQ0FBc0JGLEdBQXRCLEVBQTJCLENBQTNCO0FBQ0EsV0FBS3ZCLE1BQUw7QUFDRCxLQWJPO0FBY1JhLGdCQWRRLHdCQWNLYSxHQWRMLEVBY1U7QUFDaEIsV0FBSzlCLFNBQUwsQ0FBZTZCLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEJDLEdBQTVCO0FBQ0EsV0FBSzFCLE1BQUw7QUFDRDtBQWpCTyxHO09Bb0JWMkIsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FwQyxjQUFRQyxHQUFSLENBQWUsT0FBS29DLEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkFwRFVuRCxLIiwiZmlsZSI6ImFsYnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQaG90b0l0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9waG90b0l0ZW0nXG5pbXBvcnQgUHJldmlld1Bob3RvIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcHJldmlld1Bob3RvJ1xuaW1wb3J0IHB1Ymxpc2hQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3B1Ymxpc2hQaG90bydcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgLy8g6YWN572uXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56ys5LiA5qyh6IGa5LyaJyxcbiAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6ICcxMDAnXG4gIH1cbiAgLy8g57uE5Lu2XG4gJHJlcGVhdCA9IHtcInBob3RvTGlzdFwiOntcImNvbVwiOlwicGhvdG9JdGVtXCIsXCJwcm9wc1wiOlwicGhvdG9JdGVtXCJ9fTtcclxuJHByb3BzID0ge1wicGhvdG9JdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpwaG90b0l0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSW5kZXgub25jZVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJwcmV2aWV3UGhvdG9cIjp7XCJ2LWJpbmQ6cGhvdG9zLnN5bmNcIjpcInByZXZpZXdQaG90b3NcIixcInYtYmluZDppbmRleC5zeW5jXCI6XCJwcmV2aWV3UGhvdG9zSWR4XCIsXCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBob3RvSXRlbVwiOntcInYtb246Y2hhbmdlQ3VyUGhvdG9zXCI6XCJjaGFuZ2VDdXJQaG90b3NcIixcInYtb246ZGVsZXRQaG90b1wiOlwiZGVsZXRQaG90b1wifSxcInByZXZpZXdQaG90b1wiOntcInYtb246Y2xlYXJDdXJQaG90b3NcIjpcImNsZWFyQ3VyUGhvdG9zXCJ9LFwicHVibGlzaFBob3RvXCI6e1widi1vbjpwdWJsaXNoUGhvdG9cIjpcInB1Ymxpc2hQaG90b1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBob3RvSXRlbTogUGhvdG9JdGVtLFxuICAgIHByZXZpZXdQaG90bzogUHJldmlld1Bob3RvLFxuICAgIHB1Ymxpc2hQaG90bzogcHVibGlzaFBob3RvXG4gIH1cblxuICAvLyBkYXRhXG4gIGRhdGEgPSB7XG4gICAgcGhvdG9MaXN0OiBbXSxcbiAgICBwcmV2aWV3UGhvdG9zOiBbXSwgLy8g6aKE6KeI54Wn54mHXG4gICAgcHJldmlld1Bob3Rvc0lkeDogMCwgLy8g6aKE6KeI54Wn54mH5byA5aeL5L2N572uXG5cbiAgICBjdXJDdXJzb3I6IDAsXG4gICAgaXNHZXRMaXN0OiBmYWxzZVxuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG4gICAgbm93KCkge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHBob3RvcywgaWR4KVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICBjb25zb2xlLmxvZyhpZHgpXG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHVibGlzaFBob3RvKG9iaikge1xuICAgICAgdGhpcy5waG90b0xpc3Quc3BsaWNlKDAsIDAsIG9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cblxuICBldmVudHMgPSB7XG4gICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5sb2FkaW5nSW4oJ+WKoOi9veS4rScpXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgfVxuICBsb2FkaW5nSW4odGV4dCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiB0ZXh0XG4gICAgfSlcbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGlmICh0aGlzLmlzR2V0TGlzdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IDEsXG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubGlzdClcbiAgICAgIHRoaXMucGhvdG9MaXN0LnB1c2guYXBwbHkodGhpcy5waG90b0xpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvclxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=