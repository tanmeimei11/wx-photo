'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _joinUs = require('./../../components/gallery/joinUs.js');

var _joinUs2 = _interopRequireDefault(_joinUs);

var _newAlbum = require('./../../components/gallery/newAlbum.js');

var _newAlbum2 = _interopRequireDefault(_newAlbum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gallery = function (_wepy$page) {
  _inherits(gallery, _wepy$page);

  function gallery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, gallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = gallery.__proto__ || Object.getPrototypeOf(gallery)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '群活动相册'
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": {} }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.data = {
      groupID: '',
      title: '',
      groupInfo: {},
      galleryList: [],
      loading: false,
      noMoreNote: false,
      page: 0,
      showApply: false,
      showNewAlbum: false
    }, _this.methods = {
      // changeBg () {
      //     wx.chooseImage({
      //         count: 1,
      //         success: function(res) {
      //             console.log(res)
      //         }
      //     })
      // },
      toSetting: function toSetting() {
        wx.navigateTo({
          url: '/pages/setting/setting?id=' + this.groupID
        });
      },
      toAlbum: function toAlbum(e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '/pages/album/album?id=' + e.currentTarget.dataset.id
        });
      },
      toApply: function toApply() {
        this.showApply = true;
      },
      closeApply: function closeApply() {
        this.showApply = false;
      },
      newAlbum: function newAlbum() {
        this.showNewAlbum = true;
      },
      closeNewAlbum: function closeNewAlbum() {
        this.showNewAlbum = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(gallery, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.groupID = options.id;
      this.title = options.id;
      this.loadInfo();
      this.loadGallerylist();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.data.noMoreNote) {
        return;
      }
      var that = this;
      setTimeout(function () {
        that.loadGallerylist();
      }, 300);
    }
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/info',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context.sent;

                if (res.succ && res.data) {
                  this.groupInfo = res.data;
                  this.$apply();
                  console.log(this.groupInfo);
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadInfo() {
        return _ref2.apply(this, arguments);
      }

      return loadInfo;
    }()
  }, {
    key: 'loadGallerylist',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.data.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                this.data.loading = true;
                _context2.next = 5;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    page: this.data.page
                  }
                });

              case 5:
                res = _context2.sent;

                if (!(res.succ && res.data)) {
                  _context2.next = 17;
                  break;
                }

                console.log(res);
                this.galleryList = res.data.galleries;
                this.data.page = this.data.page + 1;
                this.$apply();

                if (res.data.has_next) {
                  _context2.next = 15;
                  break;
                }

                this.data.noMoreNote = true;
                this.$apply();
                return _context2.abrupt('return');

              case 15:
                _context2.next = 19;
                break;

              case 17:
                this.data.noMoreNote = true;
                this.$apply();

              case 19:
                this.data.loading = false;

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadGallerylist() {
        return _ref3.apply(this, arguments);
      }

      return loadGallerylist;
    }()
  }]);

  return gallery;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/gallery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsImRhdGEiLCJncm91cElEIiwidGl0bGUiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsInNob3dBcHBseSIsInNob3dOZXdBbGJ1bSIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0FsYnVtIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwidG9BcHBseSIsImNsb3NlQXBwbHkiLCJjbG9zZU5ld0FsYnVtIiwib3B0aW9ucyIsImxvYWRJbmZvIiwibG9hZEdhbGxlcnlsaXN0IiwidGhhdCIsInNldFRpbWVvdXQiLCJncm91cF9pZCIsInJlcyIsInN1Y2MiLCIkYXBwbHkiLCJnYWxsZXJpZXMiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQyx1QkFBc0IsU0FBekQsRUFBVixFQUE4RSxZQUFXLEVBQXpGLEUsUUFDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLG1CQUFrQixZQUFuQixFQUFWLEVBQTJDLFlBQVcsRUFBQyxzQkFBcUIsZUFBdEIsRUFBdEQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkM7QUFGVSxLLFFBS1pDLEksR0FBTztBQUNMQyxlQUFT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QixNQUFMOzs7QUFFRixxQkFBS2pDLElBQUwsQ0FBVUssT0FBVixHQUFvQixLQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTlHaUMsZUFBS0UsSTs7a0JBQXJCaEIsTyIsImZpbGUiOiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvaW5Vc1wiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpncm91cElELnN5bmNcIjpcImdyb3VwSURcIn0sXCJuZXdBbGJ1bVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcImpvaW5Vc1wiOntcInYtb246Y2xvc2VBcHBseVwiOlwiY2xvc2VBcHBseVwifSxcIm5ld0FsYnVtXCI6e1widi1vbjpjbG9zZU5ld0FsYnVtXCI6XCJjbG9zZU5ld0FsYnVtXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGdyb3VwSUQ6ICcnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBncm91cEluZm86IHt9LFxuICAgIGdhbGxlcnlMaXN0OiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBub01vcmVOb3RlOiBmYWxzZSxcbiAgICBwYWdlOiAwLFxuICAgIHNob3dBcHBseTogZmFsc2UsXG4gICAgc2hvd05ld0FsYnVtOiBmYWxzZVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUFwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSBmYWxzZVxuICAgIH0sXG4gICAgbmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5sb2FkSW5mbygpXG4gICAgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5ub01vcmVOb3RlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LmxvYWRHYWxsZXJ5bGlzdCgpXG4gICAgfSwgMzAwKVxuICB9XG4gIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLmdyb3VwSW5mbyA9IHJlcy5kYXRhXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwSW5mbylcbiAgICB9XG4gIH1cbiAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgIGlmICh0aGlzLmRhdGEubG9hZGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZGF0YS5sb2FkaW5nID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9nYWxsZXJ5bGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgIHBhZ2U6IHRoaXMuZGF0YS5wYWdlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSByZXMuZGF0YS5nYWxsZXJpZXNcbiAgICAgIHRoaXMuZGF0YS5wYWdlID0gdGhpcy5kYXRhLnBhZ2UgKyAxXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSBmYWxzZVxuICB9XG59XG4iXX0=