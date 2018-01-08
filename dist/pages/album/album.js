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
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.once": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.sync": "previewPhotos", "v-bind:photoIdx.sync": "previewPhotosIdx" } };
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
      this.previewPhotosIdx = 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0TGlzdCIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiaGlkZUxvYWRpbmciLCJpc0dldExpc3QiLCJ1cmwiLCJkYXRhIiwiZ2FsbGVyeV9pZCIsImN1cnNvciIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJsaXN0IiwicGhvdG9MaXN0IiwicHVzaCIsImFwcGx5IiwiY3VyQ3Vyc29yIiwiJGFwcGx5IiwibG9hZGluZ091dCIsImUiLCJwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBob3RvSXRlbSIsInByZXZpZXdQaG90byIsInB1Ymxpc2hQaG90byIsInByZXZpZXdQaG90b3MiLCJwcmV2aWV3UGhvdG9zSWR4IiwiY29tcHV0ZWQiLCJub3ciLCJEYXRlIiwibWV0aG9kcyIsImNsZWFyQ3VyUGhvdG9zIiwiY2hhbmdlQ3VyUGhvdG9zIiwicGhvdG9zIiwiaWR4IiwiZGVsZXRQaG90byIsInNwbGljZSIsIm9iaiIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ25COztBQUtBOzs7QUFVQTs7Ozs7NkJBMkNTO0FBQ1AsV0FBS0MsU0FBTCxDQUFlLEtBQWY7QUFDQSxXQUFLQyxPQUFMO0FBQ0Q7Ozs4QkFDU0MsSSxFQUFNO0FBQ2RDLFNBQUdDLFdBQUgsQ0FBZTtBQUNiQyxlQUFPSCxJQURNO0FBRWJJLGNBQU07QUFGTyxPQUFmO0FBSUQ7OztpQ0FDWTtBQUNYSCxTQUFHSSxXQUFIO0FBQ0Q7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LE1BQXJCO0FBQ0EsV0FBS1AsZ0JBQUwsR0FBd0JRLEdBQXhCO0FBQ0QsS0FUTztBQVVSQyxjQVZRLHNCQVVHRCxHQVZILEVBVVE7QUFDZDlCLGNBQVFDLEdBQVIsQ0FBWTZCLEdBQVo7QUFDQSxXQUFLM0IsU0FBTCxDQUFlNkIsTUFBZixDQUFzQkYsR0FBdEIsRUFBMkIsQ0FBM0I7QUFDQSxXQUFLdkIsTUFBTDtBQUNELEtBZE87QUFlUmEsZ0JBZlEsd0JBZUthLEdBZkwsRUFlVTtBQUNoQixXQUFLOUIsU0FBTCxDQUFlNkIsTUFBZixDQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QkMsR0FBNUI7QUFDQSxXQUFLMUIsTUFBTDtBQUNEO0FBbEJPLEc7T0FxQlYyQixNLEdBQVM7QUFDUCxrQkFBYyxxQkFBYTtBQUFBOztBQUN6QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQXBDLGNBQVFDLEdBQVIsQ0FBZSxPQUFLb0MsS0FBcEIsaUJBQXFDRixPQUFPRyxJQUE1QyxjQUF5REgsT0FBT0ksTUFBUCxDQUFjRixLQUF2RTtBQUNEO0FBSk0sRzs7O2tCQXJEVXBELEsiLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFBob3RvSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3Bob3RvSXRlbSdcbmltcG9ydCBQcmV2aWV3UGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wcmV2aWV3UGhvdG8nXG5pbXBvcnQgcHVibGlzaFBob3RvIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcHVibGlzaFBob3RvJ1xuaW1wb3J0IHtcbiAgcmVxdWVzdFxufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvLyDphY3nva5cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnrKzkuIDmrKHogZrkvJonLFxuICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogJzEwMCdcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwaG90b3Muc3luY1wiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOnBob3RvSWR4LnN5bmNcIjpcInByZXZpZXdQaG90b3NJZHhcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCJ9LFwicHJldmlld1Bob3RvXCI6e1widi1vbjpjbGVhckN1clBob3Rvc1wiOlwiY2xlYXJDdXJQaG90b3NcIn0sXCJwdWJsaXNoUGhvdG9cIjp7XCJ2LW9uOnB1Ymxpc2hQaG90b1wiOlwicHVibGlzaFBob3RvXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG9cbiAgfVxuXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBwaG90b0xpc3Q6IFtdLFxuICAgIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgICBwcmV2aWV3UGhvdG9zSWR4OiAwLCAvLyDpooTop4jnhafniYflvIDlp4vkvY3nva5cblxuICAgIGN1ckN1cnNvcjogMCxcbiAgICBpc0dldExpc3Q6IGZhbHNlXG4gIH1cblxuICBjb21wdXRlZCA9IHtcbiAgICBub3coKSB7XG4gICAgICByZXR1cm4gK25ldyBEYXRlKClcbiAgICB9XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGNsZWFyQ3VyUGhvdG9zKCkge1xuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gW11cbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IDBcbiAgICB9LFxuICAgIGNoYW5nZUN1clBob3RvcyhwaG90b3MsIGlkeCkge1xuICAgICAgY29uc29sZS5sb2cocGhvdG9zLCBpZHgpXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3MgPSBwaG90b3NcbiAgICAgIHRoaXMucHJldmlld1Bob3Rvc0lkeCA9IGlkeFxuICAgIH0sXG4gICAgZGVsZXRQaG90byhpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkeClcbiAgICAgIHRoaXMucGhvdG9MaXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwdWJsaXNoUGhvdG8ob2JqKSB7XG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoMCwgMCwgb2JqKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIGxvYWRpbmdJbih0ZXh0KSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6IHRleHQsXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSlcbiAgfVxuICBsb2FkaW5nT3V0KCkge1xuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfVxuICBhc3luYyBnZXRMaXN0KCkge1xuICAgIGlmICh0aGlzLmlzR2V0TGlzdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaXNHZXRMaXN0ID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9nYWxsZXJ5L3Bob3RvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IDEsXG4gICAgICAgIGN1cnNvcjogMFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubGlzdClcbiAgICAgIHRoaXMucGhvdG9MaXN0LnB1c2guYXBwbHkodGhpcy5waG90b0xpc3QsIHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLmN1ckN1cnNvciA9IHJlcy5kYXRhLmN1cnNvclxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgIHRoaXMuaXNHZXRMaXN0ID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFjaEJvdHRvbShlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICBhd2FpdCB0aGlzLmdldExpc3QoKVxuICB9XG59XG4iXX0=