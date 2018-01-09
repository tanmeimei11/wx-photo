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
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "" }, "newAlbum": {} }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.data = {
      pageName: 'gallery',
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
      toAlbum: function toAlbum() {
        console.log(this.groupID);
        wx.navigateTo({
          url: '/pages/album/album?id=' + this.groupID
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJjb25zb2xlIiwibG9nIiwidG9BcHBseSIsImNsb3NlQXBwbHkiLCJjbG9zZU5ld0FsYnVtIiwib3B0aW9ucyIsImlkIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCJ0aGF0Iiwic2V0VGltZW91dCIsImdyb3VwX2lkIiwicmVzIiwic3VjYyIsIiRhcHBseSIsImdhbGxlcmllcyIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQVYsRUFBNEIsWUFBVyxFQUF2QyxFLFFBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxtQkFBa0IsWUFBbkIsRUFBVixFQUEyQyxZQUFXLEVBQUMsc0JBQXFCLGVBQXRCLEVBQXRELEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDhCQURVO0FBRVZDO0FBRlUsSyxRQUtaQyxJLEdBQU87QUFDTEMsZ0JBQVUsU0FETDtBQUVMQyxlQUFTLEVBRko7QUFHTEMsYUFBTyxFQUhGO0FBSUxDLGlCQUFXLEVBSk47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OiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYWxsZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvaW5Vc1wiOntcInhtbG5zOnYtb25cIjpcIlwifSxcIm5ld0FsYnVtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBqb2luVXM6IGpvaW5VcyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgcGFnZU5hbWU6ICdnYWxsZXJ5JyxcbiAgICBncm91cElEOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgZ3JvdXBJbmZvOiB7fSxcbiAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgcGFnZTogMCxcbiAgICBzaG93QXBwbHk6IGZhbHNlLFxuICAgIHNob3dOZXdBbGJ1bTogZmFsc2VcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgIC8vICAgICAgICAgY291bnQ6IDEsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfSxcbiAgICB0b1NldHRpbmcoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3NldHRpbmcvc2V0dGluZz9pZD0ke3RoaXMuZ3JvdXBJRH1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9BbGJ1bSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJRClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvYWxidW0vYWxidW0/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5kYXRhLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQubG9hZEdhbGxlcnlsaXN0KClcbiAgICB9LCAzMDApXG4gIH1cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkR2FsbGVyeWxpc3QoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgcGFnZTogdGhpcy5kYXRhLnBhZ2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmdhbGxlcmllc1xuICAgICAgdGhpcy5kYXRhLnBhZ2UgPSB0aGlzLmRhdGEucGFnZSArIDFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gIH1cbn1cbiJdfQ==