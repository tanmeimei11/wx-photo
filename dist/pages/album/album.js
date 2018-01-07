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
                _context.next = 2;
                return (0, _login.request)({
                  url: '/gg/gallery/photolist',
                  data: {
                    gallery_id: 1,
                    cursor: 0
                  }
                });

              case 2:
                res = _context.sent;


                if (res && res.data) {
                  console.log(res.data.list);
                  this.photoList = res.data.list;
                  this.$apply();
                  this.loadingOut();
                }

              case 4:
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
    key: 'onPageScroll',
    value: function onPageScroll() {}
  }]);

  return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {
    navigationBarTitleText: '第一次聚会' };
  this.$repeat = { "photoList": { "com": "photoItem", "props": "photoItem" } };
  this.$props = { "photoItem": { "xmlns:v-bind": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoItem.once": { "value": "item", "type": "item", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "v-bind:photoIndex.once": { "value": "index", "type": "index", "for": "photoList", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "photoList", "item": "item", "index": "index", "key": "index" } }, "previewPhoto": { "v-bind:photos.once": "previewPhotos", "v-bind:index.once": "previewPhotosIdx", "xmlns:wx": "" } };
  this.$events = { "photoItem": { "v-on:changeCurPhotos": "changeCurPhotos", "v-on:deletPhoto": "deletPhoto" } };
  this.components = {
    photoItem: _photoItem2.default,
    previewPhoto: _previewPhoto2.default,
    publishPhoto: _publishPhoto2.default };
  this.data = {
    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0 // 预览照片开始位置
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
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref3;

      var $event = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/album/album'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibG9hZGluZ0luIiwiZ2V0TGlzdCIsInRleHQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJoaWRlTG9hZGluZyIsInVybCIsImRhdGEiLCJnYWxsZXJ5X2lkIiwiY3Vyc29yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxpc3QiLCJwaG90b0xpc3QiLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwaG90b0l0ZW0iLCJwcmV2aWV3UGhvdG8iLCJwdWJsaXNoUGhvdG8iLCJwcmV2aWV3UGhvdG9zIiwicHJldmlld1Bob3Rvc0lkeCIsImNvbXB1dGVkIiwibm93IiwiRGF0ZSIsIm1ldGhvZHMiLCJjbGVhckN1clBob3RvcyIsImNoYW5nZUN1clBob3RvcyIsInBob3RvcyIsImlkeCIsImRlbGV0UGhvdG8iLCJzcGxpY2UiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlxQkEsSzs7Ozs7Ozs7Ozs7Ozs7OztBQUNuQjs7QUFJQTs7O0FBVUE7Ozs7OzZCQW1DUztBQUNQLFdBQUtDLFNBQUwsQ0FBZSxLQUFmO0FBQ0EsV0FBS0MsT0FBTDtBQUNEOzs7OEJBQ1NDLEksRUFBTTtBQUNkQyxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBT0g7QUFETSxPQUFmO0FBR0Q7OztpQ0FDWTtBQUNYQyxTQUFHRyxXQUFIO0FBQ0Q7Ozs7Ozs7Ozs7O3VCQUVpQixvQkFBUTtBQUN0QkMsdUJBQUssdUJBRGlCO0FBRXRCQyx3QkFBTTtBQUNKQyxnQ0FBWSxDQURSO0FBRUpDLDRCQUFRO0FBRko7QUFGZ0IsaUJBQVIsQzs7O0FBQVpDLG1COzs7QUFRSixvQkFBSUEsT0FBT0EsSUFBSUgsSUFBZixFQUFxQjtBQUNuQkksMEJBQVFDLEdBQVIsQ0FBWUYsSUFBSUgsSUFBSixDQUFTTSxJQUFyQjtBQUNBLHVCQUFLQyxTQUFMLEdBQWlCSixJQUFJSCxJQUFKLENBQVNNLElBQTFCO0FBQ0EsdUJBQUtFLE1BQUw7QUFDQSx1QkFBS0MsVUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBR1ksQ0FFZDs7OztFQWpGZ0MsZUFBS0MsSTs7Ozs7T0FFdENDLE0sR0FBUztBQUNQQyw0QkFBd0IsT0FEakIsRTtPQUlWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsV0FBM0IsRUFBYixFO09BQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxXQUFwQyxFQUFnRCxRQUFPLE1BQXZELEVBQThELFNBQVEsT0FBdEUsRUFBOEUsT0FBTSxPQUFwRixFQUFuSCxFQUFnTiwwQkFBeUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxPQUF4QixFQUFnQyxPQUFNLFdBQXRDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLE9BQXRGLEVBQXpPLEVBQXdVLGNBQWEsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQXJWLEVBQWIsRUFBOGEsZ0JBQWUsRUFBQyxzQkFBcUIsZUFBdEIsRUFBc0MscUJBQW9CLGtCQUExRCxFQUE2RSxZQUFXLEVBQXhGLEVBQTdiLEU7T0FDVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLHdCQUF1QixpQkFBeEIsRUFBMEMsbUJBQWtCLFlBQTVELEVBQWIsRTtPQUNUQyxVLEdBQWE7QUFDVkMsa0NBRFU7QUFFVkMsd0NBRlU7QUFHVkMsd0NBSFUsRTtPQU9abkIsSSxHQUFPO0FBQ0xPLGVBQVcsRUFETjtBQUVMYSxtQkFBZSxFQUZWLEVBRWM7QUFDbkJDLHNCQUFrQixDQUhiLENBR2U7QUFIZixHO09BTVBDLFEsR0FBVztBQUNUQyxPQURTLGlCQUNIO0FBQ0osYUFBTyxDQUFDLElBQUlDLElBQUosRUFBUjtBQUNEO0FBSFEsRztPQU1YQyxPLEdBQVU7QUFDUkMsa0JBRFEsNEJBQ1M7QUFDZixXQUFLTixhQUFMLEdBQXFCLEVBQXJCO0FBQ0QsS0FITztBQUlSTyxtQkFKUSwyQkFJUUMsTUFKUixFQUlnQkMsR0FKaEIsRUFJcUI7QUFDM0J6QixjQUFRQyxHQUFSLENBQVl1QixNQUFaLEVBQW9CQyxHQUFwQjtBQUNBLFdBQUtULGFBQUwsR0FBcUJRLE1BQXJCO0FBQ0EsV0FBS1AsZ0JBQUwsR0FBd0JRLEdBQXhCO0FBQ0QsS0FSTztBQVNSQyxjQVRRLHNCQVNHRCxHQVRILEVBU1E7QUFDZHpCLGNBQVFDLEdBQVIsQ0FBWXdCLEdBQVo7QUFDQSxXQUFLdEIsU0FBTCxDQUFld0IsTUFBZixDQUFzQkYsR0FBdEIsRUFBMkIsQ0FBM0I7QUFDQSxXQUFLckIsTUFBTDtBQUNEO0FBYk8sRztPQWdCVndCLE0sR0FBUztBQUNQLGtCQUFjLHFCQUFhO0FBQUE7O0FBQ3pCLFVBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBOUIsY0FBUUMsR0FBUixDQUFlLE9BQUs4QixLQUFwQixpQkFBcUNGLE9BQU9HLElBQTVDLGNBQXlESCxPQUFPSSxNQUFQLENBQWNGLEtBQXZFO0FBQ0Q7QUFKTSxHOzs7a0JBNUNVNUMsSyIsImZpbGUiOiJhbGJ1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgUGhvdG9JdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWxidW0vcGhvdG9JdGVtJ1xuaW1wb3J0IFByZXZpZXdQaG90byBmcm9tICcuLi8uLi9jb21wb25lbnRzL2FsYnVtL3ByZXZpZXdQaG90bydcbmltcG9ydCBwdWJsaXNoUGhvdG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9hbGJ1bS9wdWJsaXNoUGhvdG8nXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOmFjee9rlxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+esrOS4gOasoeiBmuS8midcbiAgfVxuICAvLyDnu4Tku7ZcbiAkcmVwZWF0ID0ge1wicGhvdG9MaXN0XCI6e1wiY29tXCI6XCJwaG90b0l0ZW1cIixcInByb3BzXCI6XCJwaG90b0l0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJwaG90b0l0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnBob3RvSXRlbS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicGhvdG9MaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6cGhvdG9JbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJwaG90b0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInBob3RvTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInByZXZpZXdQaG90b1wiOntcInYtYmluZDpwaG90b3Mub25jZVwiOlwicHJldmlld1Bob3Rvc1wiLFwidi1iaW5kOmluZGV4Lm9uY2VcIjpcInByZXZpZXdQaG90b3NJZHhcIixcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wicGhvdG9JdGVtXCI6e1widi1vbjpjaGFuZ2VDdXJQaG90b3NcIjpcImNoYW5nZUN1clBob3Rvc1wiLFwidi1vbjpkZWxldFBob3RvXCI6XCJkZWxldFBob3RvXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcGhvdG9JdGVtOiBQaG90b0l0ZW0sXG4gICAgcHJldmlld1Bob3RvOiBQcmV2aWV3UGhvdG8sXG4gICAgcHVibGlzaFBob3RvOiBwdWJsaXNoUGhvdG9cbiAgfVxuXG4gIC8vIGRhdGFcbiAgZGF0YSA9IHtcbiAgICBwaG90b0xpc3Q6IFtdLFxuICAgIHByZXZpZXdQaG90b3M6IFtdLCAvLyDpooTop4jnhafniYdcbiAgICBwcmV2aWV3UGhvdG9zSWR4OiAwIC8vIOmihOiniOeFp+eJh+W8gOWni+S9jee9rlxuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG4gICAgbm93KCkge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjbGVhckN1clBob3RvcygpIHtcbiAgICAgIHRoaXMucHJldmlld1Bob3RvcyA9IFtdXG4gICAgfSxcbiAgICBjaGFuZ2VDdXJQaG90b3MocGhvdG9zLCBpZHgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHBob3RvcywgaWR4KVxuICAgICAgdGhpcy5wcmV2aWV3UGhvdG9zID0gcGhvdG9zXG4gICAgICB0aGlzLnByZXZpZXdQaG90b3NJZHggPSBpZHhcbiAgICB9LFxuICAgIGRlbGV0UGhvdG8oaWR4KSB7XG4gICAgICBjb25zb2xlLmxvZyhpZHgpXG4gICAgICB0aGlzLnBob3RvTGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAnaW5kZXgtZW1pdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmxvYWRpbmdJbign5Yqg6L295LitJylcbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIGxvYWRpbmdJbih0ZXh0KSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6IHRleHRcbiAgICB9KVxuICB9XG4gIGxvYWRpbmdPdXQoKSB7XG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9XG4gIGFzeW5jIGdldExpc3QoKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dhbGxlcnkvcGhvdG9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ2FsbGVyeV9pZDogMSxcbiAgICAgICAgY3Vyc29yOiAwXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmxpc3QpXG4gICAgICB0aGlzLnBob3RvTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgfVxuICB9XG5cbiAgb25QYWdlU2Nyb2xsKCkge1xuXG4gIH1cbn1cbiJdfQ==