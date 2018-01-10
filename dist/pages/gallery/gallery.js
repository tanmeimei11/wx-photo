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

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageData = {
  pageName: 'gallery',
  groupID: '',
  title: '',
  groupInfo: {},
  galleryList: [],
  loading: false,
  noMoreNote: false,
  page: 0,
  showApply: false,
  showNewAlbum: false,
  openGId: '',
  groupName: ''
};

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
      navigationBarTitleText: '群活动相册',
      onReachBottomDistance: '100'
    }, _this.$repeat = {}, _this.$props = { "joinUs": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:groupID.sync": "groupID" }, "newAlbum": { "v-bind:galleryTitle.sync": "galleryTitle" } }, _this.$events = { "joinUs": { "v-on:closeApply": "closeApply" }, "newAlbum": { "v-on:closeNewAlbum": "closeNewAlbum", "v-on:submitTitle": "submitTitle" } }, _this.components = {
      joinUs: _joinUs2.default,
      newAlbum: _newAlbum2.default
    }, _this.mixins = [_formSubmitMixin2.default, _loadingMixin2.default], _this.data = Object.assign({}, pageData), _this.methods = {
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
                  _context.next = 2;
                  return (0, _login.request)({
                    url: '/gg/gallery/add',
                    method: 'POST',
                    data: {
                      groupId: this.groupID,
                      galleryName: title
                    }
                  });

                case 2:
                  res = _context.sent;


                  if (res.succ) {
                    this.toastSucc('新建成功');
                    this.showNewAlbum = false;
                    this.loadInfo();
                    this.loadGallerylist();
                    this.$apply();
                  }

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
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
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Object.assign(this, pageData);
                this.groupID = options.id;
                console.log(this.groupID);
                this.init();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
    // 分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '邀请你查看本群相册',
        path: '/pages/gallery/gallery?id=' + this.groupID
      };
    }
  }, {
    key: 'init',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loadInfo();
                this.loadGallerylist();

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init() {
        return _ref4.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'loadInfo',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _login.request)({
                  url: '/gg/group/info',
                  data: {
                    group_id: this.groupID
                  }
                });

              case 2:
                res = _context4.sent;

                if (res.succ && res.data) {
                  this.openGId = res.data.open_gid;
                  this.groupInfo = res.data;
                  this.$apply();
                  console.log(this.groupInfo);
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadInfo() {
        return _ref5.apply(this, arguments);
      }

      return loadInfo;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.noMoreNote) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                _context5.next = 4;
                return this.loadGallerylist();

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onReachBottom(_x3) {
        return _ref6.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: 'loadGallerylist',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.loading) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:
                this.loading = true;
                _context6.next = 5;
                return (0, _login.request)({
                  url: '/gg/group/gallerylist',
                  data: {
                    group_id: this.groupID,
                    page: this.page
                  }
                });

              case 5:
                res = _context6.sent;

                if (!(res.succ && res.data)) {
                  _context6.next = 17;
                  break;
                }

                console.log(res);
                this.galleryList = this.galleryList.concat(res.data.list);
                this.page = this.page + 1;
                this.$apply();

                if (res.data.has_next) {
                  _context6.next = 15;
                  break;
                }

                this.noMoreNote = true;
                this.$apply();
                return _context6.abrupt('return');

              case 15:
                _context6.next = 19;
                break;

              case 17:
                this.noMoreNote = true;
                this.$apply();

              case 19:
                this.loading = false;

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadGallerylist() {
        return _ref7.apply(this, arguments);
      }

      return loadGallerylist;
    }()
  }]);

  return gallery;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/gallery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkuanMiXSwibmFtZXMiOlsicGFnZURhdGEiLCJwYWdlTmFtZSIsImdyb3VwSUQiLCJ0aXRsZSIsImdyb3VwSW5mbyIsImdhbGxlcnlMaXN0IiwibG9hZGluZyIsIm5vTW9yZU5vdGUiLCJwYWdlIiwic2hvd0FwcGx5Iiwic2hvd05ld0FsYnVtIiwib3BlbkdJZCIsImdyb3VwTmFtZSIsImdhbGxlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9pblVzIiwibmV3QWxidW0iLCJtaXhpbnMiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kcyIsInRvU2V0dGluZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRvQWxidW0iLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0b0FwcGx5IiwiY2xvc2VBcHBseSIsImNsb3NlTmV3QWxidW0iLCJzdWJtaXRUaXRsZSIsIm1ldGhvZCIsImdyb3VwSWQiLCJnYWxsZXJ5TmFtZSIsInJlcyIsInN1Y2MiLCJ0b2FzdFN1Y2MiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsIiRhcHBseSIsIm9wdGlvbnMiLCJpbml0IiwicGF0aCIsImdyb3VwX2lkIiwib3Blbl9naWQiLCJjb25jYXQiLCJsaXN0IiwiaGFzX25leHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsV0FBVztBQUNiQyxZQUFVLFNBREc7QUFFYkMsV0FBUyxFQUZJO0FBR2JDLFNBQU8sRUFITTtBQUliQyxhQUFXLEVBSkU7QUFLYkMsZUFBYSxFQUxBO0FBTWJDLFdBQVMsS0FOSTtBQU9iQyxjQUFZLEtBUEM7QUFRYkMsUUFBTSxDQVJPO0FBU2JDLGFBQVcsS0FURTtBQVViQyxnQkFBYyxLQVZEO0FBV2JDLFdBQVMsRUFYSTtBQVliQyxhQUFXO0FBWkUsQ0FBZjs7SUFlcUJDLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixPQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUlWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixTQUF6RCxFQUFWLEVBQThFLFlBQVcsRUFBQyw0QkFBMkIsY0FBNUIsRUFBekYsRSxRQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsbUJBQWtCLFlBQW5CLEVBQVYsRUFBMkMsWUFBVyxFQUFDLHNCQUFxQixlQUF0QixFQUFzQyxvQkFBbUIsYUFBekQsRUFBdEQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkM7QUFGVSxLLFFBSVpDLE0sR0FBUyxtRCxRQUNUQyxJLEdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUIsUUFBbEIsQyxRQUNQMkIsTyxHQUFVO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxlQVRRLHVCQVNJO0FBQ1ZDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyw4Q0FBa0MsS0FBSzdCO0FBRDNCLFNBQWQ7QUFHRCxPQWJPO0FBY1I4QixhQWRRLG1CQWNBQyxDQWRBLEVBY0c7QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXBDO0FBQ0FULFdBQUdDLFVBQUgsQ0FBYztBQUNaQywwQ0FBOEJFLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQztBQUQxQyxTQUFkO0FBR0QsT0FuQk87QUFvQlJDLGFBcEJRLHFCQW9CRTtBQUNSLGFBQUs5QixTQUFMLEdBQWlCLElBQWpCO0FBQ0QsT0F0Qk87QUF1QlIrQixnQkF2QlEsd0JBdUJLO0FBQ1gsYUFBSy9CLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxPQXpCTztBQTBCUmEsY0ExQlEsc0JBMEJHO0FBQ1QsYUFBS1osWUFBTCxHQUFvQixJQUFwQjtBQUNELE9BNUJPO0FBNkJSK0IsbUJBN0JRLDJCQTZCUTtBQUNkLGFBQUsvQixZQUFMLEdBQW9CLEtBQXBCO0FBQ0QsT0EvQk87QUFnQ0ZnQyxpQkFoQ0U7QUFBQSw2RkFnQ1V2QyxLQWhDVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQWlDVSxvQkFBUTtBQUN0QjRCLHlCQUFLLGlCQURpQjtBQUV0QlksNEJBQVEsTUFGYztBQUd0Qm5CLDBCQUFNO0FBQ0pvQiwrQkFBUyxLQUFLMUMsT0FEVjtBQUVKMkMsbUNBQWExQztBQUZUO0FBSGdCLG1CQUFSLENBakNWOztBQUFBO0FBaUNGMkMscUJBakNFOzs7QUEwQ04sc0JBQUlBLElBQUlDLElBQVIsRUFBYztBQUNaLHlCQUFLQyxTQUFMLENBQWUsTUFBZjtBQUNBLHlCQUFLdEMsWUFBTCxHQUFvQixLQUFwQjtBQUNBLHlCQUFLdUMsUUFBTDtBQUNBLHlCQUFLQyxlQUFMO0FBQ0EseUJBQUtDLE1BQUw7QUFDRDs7QUFoREs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7Ozs7NEZBbURHQyxPOzs7OztBQUNYM0IsdUJBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CMUIsUUFBcEI7QUFDQSxxQkFBS0UsT0FBTCxHQUFla0QsUUFBUWQsRUFBdkI7QUFDQUosd0JBQVFDLEdBQVIsQ0FBWSxLQUFLakMsT0FBakI7QUFDQSxxQkFBS21ELElBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRjs7Ozt3Q0FDb0I7QUFDbEIsYUFBTztBQUNMbEQsZUFBTyxXQURGO0FBRUxtRCw2Q0FBbUMsS0FBS3BEO0FBRm5DLE9BQVA7QUFJRDs7Ozs7Ozs7O0FBRUMscUJBQUsrQyxRQUFMO0FBQ0EscUJBQUtDLGVBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdnQixvQkFBUTtBQUN0Qm5CLHVCQUFLLGdCQURpQjtBQUV0QlAsd0JBQU07QUFDSitCLDhCQUFVLEtBQUtyRDtBQURYO0FBRmdCLGlCQUFSLEM7OztBQUFaNEMsbUI7O0FBTUosb0JBQUlBLElBQUlDLElBQUosSUFBWUQsSUFBSXRCLElBQXBCLEVBQTBCO0FBQ3hCLHVCQUFLYixPQUFMLEdBQWVtQyxJQUFJdEIsSUFBSixDQUFTZ0MsUUFBeEI7QUFDQSx1QkFBS3BELFNBQUwsR0FBaUIwQyxJQUFJdEIsSUFBckI7QUFDQSx1QkFBSzJCLE1BQUw7QUFDQWpCLDBCQUFRQyxHQUFSLENBQVksS0FBSy9CLFNBQWpCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBRWlCNkIsQzs7Ozs7cUJBQ2QsS0FBSzFCLFU7Ozs7Ozs7Ozt1QkFHSCxLQUFLMkMsZUFBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUdGLEtBQUs1QyxPOzs7Ozs7OztBQUdULHFCQUFLQSxPQUFMLEdBQWUsSUFBZjs7dUJBQ2dCLG9CQUFRO0FBQ3RCeUIsdUJBQUssdUJBRGlCO0FBRXRCUCx3QkFBTTtBQUNKK0IsOEJBQVUsS0FBS3JELE9BRFg7QUFFSk0sMEJBQU0sS0FBS0E7QUFGUDtBQUZnQixpQkFBUixDOzs7QUFBWnNDLG1COztzQkFPQUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdEIsSTs7Ozs7QUFDbEJVLHdCQUFRQyxHQUFSLENBQVlXLEdBQVo7QUFDQSxxQkFBS3pDLFdBQUwsR0FBbUIsS0FBS0EsV0FBTCxDQUFpQm9ELE1BQWpCLENBQXdCWCxJQUFJdEIsSUFBSixDQUFTa0MsSUFBakMsQ0FBbkI7QUFDQSxxQkFBS2xELElBQUwsR0FBWSxLQUFLQSxJQUFMLEdBQVksQ0FBeEI7QUFDQSxxQkFBSzJDLE1BQUw7O29CQUNLTCxJQUFJdEIsSUFBSixDQUFTbUMsUTs7Ozs7QUFDWixxQkFBS3BELFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSzRDLE1BQUw7Ozs7Ozs7O0FBSUYscUJBQUs1QyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUs0QyxNQUFMOzs7QUFFRixxQkFBSzdDLE9BQUwsR0FBZSxLQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaElpQyxlQUFLRSxJOztrQkFBckJLLE8iLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuaW1wb3J0IGpvaW5VcyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dhbGxlcnkvam9pblVzJ1xuaW1wb3J0IG5ld0FsYnVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9uZXdBbGJ1bSdcbmltcG9ydCBmb3JtU3VibWl0TWl4aW4gZnJvbSAnQC9taXhpbnMvZm9ybVN1Ym1pdE1peGluJ1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nXG5cbnZhciBwYWdlRGF0YSA9IHtcbiAgcGFnZU5hbWU6ICdnYWxsZXJ5JyxcbiAgZ3JvdXBJRDogJycsXG4gIHRpdGxlOiAnJyxcbiAgZ3JvdXBJbmZvOiB7fSxcbiAgZ2FsbGVyeUxpc3Q6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gIHBhZ2U6IDAsXG4gIHNob3dBcHBseTogZmFsc2UsXG4gIHNob3dOZXdBbGJ1bTogZmFsc2UsXG4gIG9wZW5HSWQ6ICcnLFxuICBncm91cE5hbWU6ICcnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbGxlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCcsXG4gICAgb25SZWFjaEJvdHRvbURpc3RhbmNlOiAnMTAwJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJqb2luVXNcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z3JvdXBJRC5zeW5jXCI6XCJncm91cElEXCJ9LFwibmV3QWxidW1cIjp7XCJ2LWJpbmQ6Z2FsbGVyeVRpdGxlLnN5bmNcIjpcImdhbGxlcnlUaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJqb2luVXNcIjp7XCJ2LW9uOmNsb3NlQXBwbHlcIjpcImNsb3NlQXBwbHlcIn0sXCJuZXdBbGJ1bVwiOntcInYtb246Y2xvc2VOZXdBbGJ1bVwiOlwiY2xvc2VOZXdBbGJ1bVwiLFwidi1vbjpzdWJtaXRUaXRsZVwiOlwic3VibWl0VGl0bGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBqb2luVXM6IGpvaW5VcyxcbiAgICBuZXdBbGJ1bTogbmV3QWxidW1cbiAgfVxuICBtaXhpbnMgPSBbZm9ybVN1Ym1pdE1peGluLCBMb2FkaW5nTWl4aW5dXG4gIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYWdlRGF0YSlcbiAgbWV0aG9kcyA9IHtcbiAgICAvLyBjaGFuZ2VCZyAoKSB7XG4gICAgLy8gICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAvLyAgICAgICAgIGNvdW50OiAxLFxuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH0sXG4gICAgdG9TZXR0aW5nKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9zZXR0aW5nL3NldHRpbmc/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQWxidW0oZSkge1xuICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2FsYnVtL2FsYnVtP2lkPSR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IHRydWVcbiAgICB9LFxuICAgIGNsb3NlQXBwbHkoKSB7XG4gICAgICB0aGlzLnNob3dBcHBseSA9IGZhbHNlXG4gICAgfSxcbiAgICBuZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VOZXdBbGJ1bSgpIHtcbiAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICB9LFxuICAgIGFzeW5jIHN1Ym1pdFRpdGxlKHRpdGxlKSB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9nYWxsZXJ5L2FkZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZ3JvdXBJZDogdGhpcy5ncm91cElELFxuICAgICAgICAgIGdhbGxlcnlOYW1lOiB0aXRsZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+aWsOW7uuaIkOWKnycpXG4gICAgICAgIHRoaXMuc2hvd05ld0FsYnVtID0gZmFsc2VcbiAgICAgICAgdGhpcy5sb2FkSW5mbygpXG4gICAgICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFnZURhdGEpXG4gICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJRClcbiAgICB0aGlzLmluaXQoKVxuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfpgoDor7fkvaDmn6XnnIvmnKznvqTnm7jlhownLFxuICAgICAgcGF0aDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgIH1cbiAgfVxuICBhc3luYyBpbml0KCkge1xuICAgIHRoaXMubG9hZEluZm8oKVxuICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgfVxuICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSURcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgdGhpcy5vcGVuR0lkID0gcmVzLmRhdGEub3Blbl9naWRcbiAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgIH1cbiAgfVxuICBhc3luYyBvblJlYWNoQm90dG9tKGUpIHtcbiAgICBpZiAodGhpcy5ub01vcmVOb3RlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICB9XG4gIGFzeW5jIGxvYWRHYWxsZXJ5bGlzdCgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9nZy9ncm91cC9nYWxsZXJ5bGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdyb3VwX2lkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aGlzLmdhbGxlcnlMaXN0ID0gdGhpcy5nYWxsZXJ5TGlzdC5jb25jYXQocmVzLmRhdGEubGlzdClcbiAgICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZSArIDFcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgdGhpcy5ub01vcmVOb3RlID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gIH1cbn1cbiJdfQ==