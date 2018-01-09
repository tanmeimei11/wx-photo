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

var _formSubmitMixin = require('./../../mixins/formSubmitMixin.js');

var _formSubmitMixin2 = _interopRequireDefault(_formSubmitMixin);

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
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": {} }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.mixins = [_formSubmitMixin2.default], _this.data = {
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
      },
      submitTitle: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return (0, _login.request)({
                    url: '/gg/gallery/add',
                    method: 'POST',
                    data: {
                      groupId: this.groupID,
                      galleryName: title
                    }
                  });

                case 3:
                  res = _context.sent;
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);

                  this.toastFail('新建失败');

                case 9:

                  if (res.succ) {
                    this.toastSucc('新建成功');
                    this.showNewAlbum = false;
                    this.loadInfo();
                    this.loadGallerylist();
                    this.$apply();
                  }

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 6]]);
        }));

        function submitTitle(_x) {
          return _ref2.apply(this, arguments);
        }

        return submitTitle;
      }()
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/info',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context2.sent;

                if (res.succ && res.data) {
                  this.groupInfo = res.data;
                  this.$apply();
                  console.log(this.groupInfo);
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadInfo() {
        return _ref3.apply(this, arguments);
      }

      return loadInfo;
    }()
  }, {
    key: 'loadGallerylist',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.data.loading) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                this.data.loading = true;
                _context3.next = 5;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    page: this.data.page
                  }
                });

              case 5:
                res = _context3.sent;

                if (!(res.succ && res.data)) {
                  _context3.next = 17;
                  break;
                }

                console.log(res);
                this.galleryList = res.data.list;
                this.data.page = this.data.page + 1;
                this.$apply();

                if (res.data.has_next) {
                  _context3.next = 15;
                  break;
                }

                this.data.noMoreNote = true;
                this.$apply();
                return _context3.abrupt('return');

              case 15:
                _context3.next = 19;
                break;

              case 17:
                this.data.noMoreNote = true;
                this.$apply();

              case 19:
                this.data.loading = false;

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadGallerylist() {
        return _ref4.apply(this, arguments);
      }

      return loadGallerylist;
    }()
  }]);

  return gallery;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/gallery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsiZ2FsbGVyeSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2luVXMiLCJuZXdBbGJ1bSIsIm1peGlucyIsImRhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJzdWJtaXRUaXRsZSIsIm1ldGhvZCIsImdyb3VwSWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInRvYXN0RmFpbCIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsIiRhcHBseSIsIm9wdGlvbnMiLCJ0aGF0Iiwic2V0VGltZW91dCIsImdyb3VwX2lkIiwibGlzdCIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLFNBQXpELEVBQVYsRUFBOEUsWUFBVyxFQUF6RixFLFFBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxtQkFBa0IsWUFBbkIsRUFBVixFQUEyQyxZQUFXLEVBQUMsc0JBQXFCLGVBQXRCLEVBQXNDLG9CQUFtQixhQUF6RCxFQUF0RCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw4QkFEVTtBQUVWQztBQUZVLEssUUFJWkMsTSxHQUFTLDJCLFFBQ1RDLEksR0FBTztBQUNMQyxnQkFBVSxTQURMO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxhQUFPLEVBSEY7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxtQkFBYSxFQUxSO0FBTUxDLGVBQVMsS0FOSjtBQU9MQyxrQkFBWSxLQVBQO0FBUUxDLFlBQU0sQ0FSRDtBQVNMQyxpQkFBVyxLQVROO0FBVUxDLG9CQUFjO0FBVlQsSyxRQVlQQyxPLEdBQVU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGVBVFEsdUJBU0k7QUFDVkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLDhDQUFrQyxLQUFLYjtBQUQzQixTQUFkO0FBR0QsT0FiTztBQWNSYyxhQWRRLG1CQWNBQyxDQWRBLEVBY0c7QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXBDO0FBQ0FULFdBQUdDLFVBQUgsQ0FBYztBQUNaQywwQ0FBOEJFLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQztBQUQxQyxTQUFkO0FBR0QsT0FuQk87QUFvQlJDLGFBcEJRLHFCQW9CRTtBQUNSLGFBQUtkLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxPQXRCTztBQXVCUmUsZ0JBdkJRLHdCQXVCSztBQUNYLGFBQUtmLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxPQXpCTztBQTBCUlgsY0ExQlEsc0JBMEJHO0FBQ1QsYUFBS1ksWUFBTCxHQUFvQixJQUFwQjtBQUNELE9BNUJPO0FBNkJSZSxtQkE3QlEsMkJBNkJRO0FBQ2QsYUFBS2YsWUFBTCxHQUFvQixLQUFwQjtBQUNELE9BL0JPO0FBZ0NGZ0IsaUJBaENFO0FBQUEsNkZBZ0NVdkIsS0FoQ1Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQWtDWSxvQkFBUTtBQUN0QlkseUJBQUssaUJBRGlCO0FBRXRCWSw0QkFBUSxNQUZjO0FBR3RCM0IsMEJBQU07QUFDSjRCLCtCQUFTLEtBQUsxQixPQURWO0FBRUoyQixtQ0FBYTFCO0FBRlQ7QUFIZ0IsbUJBQVIsQ0FsQ1o7O0FBQUE7QUFrQ0EyQixxQkFsQ0E7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUEyQ0osdUJBQUtDLFNBQUwsQ0FBZSxNQUFmOztBQTNDSTs7QUE4Q04sc0JBQUlELElBQUlFLElBQVIsRUFBYztBQUNaLHlCQUFLQyxTQUFMLENBQWUsTUFBZjtBQUNBLHlCQUFLdkIsWUFBTCxHQUFvQixLQUFwQjtBQUNBLHlCQUFLd0IsUUFBTDtBQUNBLHlCQUFLQyxlQUFMO0FBQ0EseUJBQUtDLE1BQUw7QUFDRDs7QUFwREs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7OzsyQkF1REhDLE8sRUFBUztBQUNkLFdBQUtuQyxPQUFMLEdBQWVtQyxRQUFRZixFQUF2QjtBQUNBLFdBQUtuQixLQUFMLEdBQWFrQyxRQUFRZixFQUFyQjtBQUNBLFdBQUtZLFFBQUw7QUFDQSxXQUFLQyxlQUFMO0FBQ0Q7OztvQ0FDZTtBQUNkLFVBQUksS0FBS25DLElBQUwsQ0FBVU8sVUFBZCxFQUEwQjtBQUN4QjtBQUNEO0FBQ0QsVUFBSStCLE9BQU8sSUFBWDtBQUNBQyxpQkFBVyxZQUFZO0FBQ3JCRCxhQUFLSCxlQUFMO0FBQ0QsT0FGRCxFQUVHLEdBRkg7QUFHRDs7Ozs7Ozs7Ozs7dUJBRWlCLG9CQUFRO0FBQ3RCcEIsdUJBQUssZ0JBRGlCO0FBRXRCZix3QkFBTTtBQUNKd0MsOEJBQVUsS0FBS3RDO0FBRFg7QUFGZ0IsaUJBQVIsQzs7O0FBQVo0QixtQjs7QUFNSixvQkFBSUEsSUFBSUUsSUFBSixJQUFZRixJQUFJOUIsSUFBcEIsRUFBMEI7QUFDeEIsdUJBQUtJLFNBQUwsR0FBaUIwQixJQUFJOUIsSUFBckI7QUFDQSx1QkFBS29DLE1BQUw7QUFDQWxCLDBCQUFRQyxHQUFSLENBQVksS0FBS2YsU0FBakI7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFHRyxLQUFLSixJQUFMLENBQVVNLE87Ozs7Ozs7O0FBR2QscUJBQUtOLElBQUwsQ0FBVU0sT0FBVixHQUFvQixJQUFwQjs7dUJBQ2dCLG9CQUFRO0FBQ3RCUyx1QkFBSyx1QkFEaUI7QUFFdEJmLHdCQUFNO0FBQ0p3Qyw4QkFBVSxLQUFLdEMsT0FEWDtBQUVKTSwwQkFBTSxLQUFLUixJQUFMLENBQVVRO0FBRlo7QUFGZ0IsaUJBQVIsQzs7O0FBQVpzQixtQjs7c0JBT0FBLElBQUlFLElBQUosSUFBWUYsSUFBSTlCLEk7Ozs7O0FBQ2xCa0Isd0JBQVFDLEdBQVIsQ0FBWVcsR0FBWjtBQUNBLHFCQUFLekIsV0FBTCxHQUFtQnlCLElBQUk5QixJQUFKLENBQVN5QyxJQUE1QjtBQUNBLHFCQUFLekMsSUFBTCxDQUFVUSxJQUFWLEdBQWlCLEtBQUtSLElBQUwsQ0FBVVEsSUFBVixHQUFpQixDQUFsQztBQUNBLHFCQUFLNEIsTUFBTDs7b0JBQ0tOLElBQUk5QixJQUFKLENBQVMwQyxROzs7OztBQUNaLHFCQUFLMUMsSUFBTCxDQUFVTyxVQUFWLEdBQXVCLElBQXZCO0FBQ0EscUJBQUs2QixNQUFMOzs7Ozs7OztBQUlGLHFCQUFLcEMsSUFBTCxDQUFVTyxVQUFWLEdBQXVCLElBQXZCO0FBQ0EscUJBQUs2QixNQUFMOzs7QUFFRixxQkFBS3BDLElBQUwsQ0FBVU0sT0FBVixHQUFvQixLQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJJaUMsZUFBS0UsSTs7a0JBQXJCbEIsTyIsImZpbGUiOiJnYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHJlcXVlc3Rcbn0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5pbXBvcnQgbmV3QWxidW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nYWxsZXJ5L25ld0FsYnVtJ1xuaW1wb3J0IGZvcm1TdWJtaXRNaXhpbiBmcm9tICdAL21peGlucy9mb3JtU3VibWl0TWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbGxlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9pblVzXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdyb3VwSUQuc3luY1wiOlwiZ3JvdXBJRFwifSxcIm5ld0FsYnVtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9pblVzXCI6e1widi1vbjpjbG9zZUFwcGx5XCI6XCJjbG9zZUFwcGx5XCJ9LFwibmV3QWxidW1cIjp7XCJ2LW9uOmNsb3NlTmV3QWxidW1cIjpcImNsb3NlTmV3QWxidW1cIixcInYtb246c3VibWl0VGl0bGVcIjpcInN1Ym1pdFRpdGxlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgam9pblVzOiBqb2luVXMsXG4gICAgbmV3QWxidW06IG5ld0FsYnVtXG4gIH1cbiAgbWl4aW5zID0gW2Zvcm1TdWJtaXRNaXhpbl1cbiAgZGF0YSA9IHtcbiAgICBwYWdlTmFtZTogJ2dhbGxlcnknLFxuICAgIGdyb3VwSUQ6ICcnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBncm91cEluZm86IHt9LFxuICAgIGdhbGxlcnlMaXN0OiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBub01vcmVOb3RlOiBmYWxzZSxcbiAgICBwYWdlOiAwLFxuICAgIHNob3dBcHBseTogZmFsc2UsXG4gICAgc2hvd05ld0FsYnVtOiBmYWxzZVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gY2hhbmdlQmcgKCkge1xuICAgIC8vICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9LFxuICAgIHRvU2V0dGluZygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvc2V0dGluZy9zZXR0aW5nP2lkPSR7dGhpcy5ncm91cElEfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FsYnVtKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9hbGJ1bS9hbGJ1bT9pZD0ke2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b0FwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUFwcGx5KCkge1xuICAgICAgdGhpcy5zaG93QXBwbHkgPSBmYWxzZVxuICAgIH0sXG4gICAgbmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlTmV3QWxidW0oKSB7XG4gICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgfSxcbiAgICBhc3luYyBzdWJtaXRUaXRsZSh0aXRsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2FkZCcsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElELFxuICAgICAgICAgICAgZ2FsbGVyeU5hbWU6IHRpdGxlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnRvYXN0RmFpbCgn5paw5bu65aSx6LSlJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMudG9hc3RTdWNjKCfmlrDlu7rmiJDlip8nKVxuICAgICAgICB0aGlzLnNob3dOZXdBbGJ1bSA9IGZhbHNlXG4gICAgICAgIHRoaXMubG9hZEluZm8oKVxuICAgICAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdyb3VwSUQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLmxvYWRJbmZvKClcbiAgICB0aGlzLmxvYWRHYWxsZXJ5bGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5kYXRhLm5vTW9yZU5vdGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQubG9hZEdhbGxlcnlsaXN0KClcbiAgICB9LCAzMDApXG4gIH1cbiAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElEXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkR2FsbGVyeWxpc3QoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSB0cnVlXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRCxcbiAgICAgICAgcGFnZTogdGhpcy5kYXRhLnBhZ2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuZGF0YS5wYWdlID0gdGhpcy5kYXRhLnBhZ2UgKyAxXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgIHRoaXMuZGF0YS5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgdGhpcy5kYXRhLmxvYWRpbmcgPSBmYWxzZVxuICB9XG59XG4iXX0=