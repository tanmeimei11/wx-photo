"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoItem = function (_wepy$component) {
  _inherits(PhotoItem, _wepy$component);

  function PhotoItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhotoItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoItem.__proto__ || Object.getPrototypeOf(PhotoItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      photoItem: [],
      photoIndex: Number,
      photoItemActiveIdx: Number
    }, _this.data = {
      isZanAjax: false
    }, _this.mixins = [_loadingMixin2.default], _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        this.$emit("changeCurPhotos", this.photoItem.photos, _photoIdx);
      },
      clickZan: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.isZanAjax === true)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  this.isZanAjax = true;
                  _context.next = 5;
                  return (0, _login.request)({
                    url: "/gg/photo/zan",
                    data: {
                      pid: this.photoItem.photo_id,
                      action: this.photoItem.is_zan ? "cancel" : "zan"
                    }
                  });

                case 5:
                  res = _context.sent;

                  if (res.succ) {
                    this.$emit("photoZanChange", this.photoIndex, res.data);
                  }
                  this.isZanAjax = false;

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function clickZan() {
          return _ref2.apply(this, arguments);
        }

        return clickZan;
      }(),
      delPhoto: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _wepy2.default.showActionSheet({
                    itemList: ["删除"],
                    itemColor: "#FF5E51"
                  });

                case 2:
                  res = _context2.sent;

                  if (res.tapIndex === 0) {
                    this.loadingIn("正在删除");
                    (0, _login.request)({
                      url: "/gg/photo/del",
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this2.$emit("deletPhoto", _this2.photoIndex);
                      _this2.$apply();
                      _this2.loadingOut();
                      _this2.toastSucc("删除成功");
                    });
                  }

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function delPhoto() {
          return _ref3.apply(this, arguments);
        }

        return delPhoto;
      }(),
      downUrl: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.photoItem.photo_type === "0") {
                    _urls = this.photoItem.photos.map(function (photo) {
                      return photo.url;
                    });
                  } else {
                    _urls = this.photoItem.video.play_url;
                  }

                  this.loadingIn("正在下载");
                  _context3.prev = 2;
                  _context3.next = 5;
                  return (0, _api.downInternetUrl)(_urls);

                case 5:
                  this.loadingOut();
                  this.toastSucc("下载成功");
                  _context3.next = 13;
                  break;

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3["catch"](2);

                  this.loadingOut();
                  this.toastFail("下载失败");

                case 13:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[2, 9]]);
        }));

        function downUrl() {
          return _ref4.apply(this, arguments);
        }

        return downUrl;
      }(),
      printerClick: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e, pid, uid) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  console.log(pid);
                  this.loadingIn("正在跳转");
                  _context4.prev = 2;
                  _context4.next = 5;
                  return (0, _login.request)({
                    url: "/gg/photo/fetchpayloadkey",
                    data: {
                      photo_id: pid || this.photoItem.photo_id,
                      user_id: uid || this.photoItem.user.user_id
                    }
                  });

                case 5:
                  res = _context4.sent;
                  _context4.next = 12;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4["catch"](2);

                  this.loadingOut();
                  this.toastFail("跳转失败了");

                case 12:

                  this.loadingOut();

                  if (res && res.succ && res.data) {
                    _context4.next = 16;
                    break;
                  }

                  this.toastFail("跳转失败了");
                  return _context4.abrupt("return");

                case 16:
                  _context4.next = 18;
                  return _wepy2.default.navigateToMiniProgram({
                    appId: "wxf34fe3fb525ea139",
                    path: "pages/transfer/transfer?payloadKey=" + res.data,
                    envVersion: "develop"
                  });

                case 18:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[2, 8]]);
        }));

        function printerClick(_x, _x2, _x3) {
          return _ref5.apply(this, arguments);
        }

        return printerClick;
      }(),
      playVideo: function playVideo() {
        if (this.photoItemActiveIdx !== this.photoIndex) {
          this.$emit("hideVideo", this.photoItemActiveIdx);
        }
        this.$emit("showVideo", this.photoIndex);
      },
      videoEnd: function videoEnd() {
        this.$emit("hiddenVideo", this.photoIndex);
      },
      videoScreenchange: function videoScreenchange(e) {
        if (!e.detail.fullScreen) {
          this.$emit("hiddenVideo", this.photoIndex);
        }
      },
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJwaG90b0l0ZW1BY3RpdmVJZHgiLCJkYXRhIiwiaXNaYW5BamF4IiwibWl4aW5zIiwibWV0aG9kcyIsImNsaWNrSW1hZ2UiLCJlIiwiX3Bob3RvSWR4IiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGVtaXQiLCJwaG90b3MiLCJjbGlja1phbiIsInVybCIsInBpZCIsInBob3RvX2lkIiwiYWN0aW9uIiwiaXNfemFuIiwicmVzIiwic3VjYyIsImRlbFBob3RvIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsImxvYWRpbmdJbiIsInRoZW4iLCIkYXBwbHkiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwiZG93blVybCIsInBob3RvX3R5cGUiLCJfdXJscyIsIm1hcCIsInBob3RvIiwidmlkZW8iLCJwbGF5X3VybCIsInRvYXN0RmFpbCIsInByaW50ZXJDbGljayIsInVpZCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyX2lkIiwidXNlciIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImVudlZlcnNpb24iLCJwbGF5VmlkZW8iLCJ2aWRlb0VuZCIsInZpZGVvU2NyZWVuY2hhbmdlIiwiZGV0YWlsIiwiZnVsbFNjcmVlbiIsInRhcCIsImRvd25JbWFnZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGtCQUFZQyxNQUZOO0FBR05DLDBCQUFvQkQ7QUFIZCxLLFFBS1JFLEksR0FBTztBQUNMQyxpQkFBVztBQUROLEssUUFHUEMsTSxHQUFTLHdCLFFBQ1RDLE8s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QixLQUFLYixVQUEvQjtBQUNELE9BakdPO0FBa0dScUQsdUJBbEdRLDZCQWtHVTdDLENBbEdWLEVBa0dhO0FBQ25CLFlBQUksQ0FBQ0EsRUFBRThDLE1BQUYsQ0FBU0MsVUFBZCxFQUEwQjtBQUN4QixlQUFLMUMsS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBS2IsVUFBL0I7QUFDRDtBQUNGLE9BdEdPO0FBdUdSd0QsU0F2R1EsaUJBdUdGLENBQUUsQ0F2R0E7QUF3R1JDLGVBeEdRLHVCQXdHSSxDQUFFO0FBeEdOLEs7Ozs7RUFWMkIsZUFBS0MsUzs7a0JBQXZCN0QsUyIsImZpbGUiOiJwaG90b0l0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gXCIuLi8uLi91dGlscy9sb2dpbi5qc1wiO1xyXG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpLmpzXCI7XHJcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSBcIkAvbWl4aW5zL2xvYWRpbmdNaXhpblwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyLFxyXG4gICAgcGhvdG9JdGVtQWN0aXZlSWR4OiBOdW1iZXJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBpc1phbkFqYXg6IGZhbHNlXHJcbiAgfTtcclxuICBtaXhpbnMgPSBbTG9hZGluZ01peGluXTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tJbWFnZShlKSB7XHJcbiAgICAgIHZhciBfcGhvdG9JZHggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xyXG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlQ3VyUGhvdG9zXCIsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbGlja1phbigpIHtcclxuICAgICAgaWYgKHRoaXMuaXNaYW5BamF4ID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNaYW5BamF4ID0gdHJ1ZTtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogXCIvZ2cvcGhvdG8vemFuXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gXCJjYW5jZWxcIiA6IFwiemFuXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVzLnN1Y2MpIHtcclxuICAgICAgICB0aGlzLiRlbWl0KFwicGhvdG9aYW5DaGFuZ2VcIiwgdGhpcy5waG90b0luZGV4LCByZXMuZGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1phbkFqYXggPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxQaG90bygpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHdlcHkuc2hvd0FjdGlvblNoZWV0KHtcclxuICAgICAgICBpdGVtTGlzdDogW1wi5Yig6ZmkXCJdLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogXCIjRkY1RTUxXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdJbihcIuato+WcqOWIoOmZpFwiKTtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogXCIvZ2cvcGhvdG8vZGVsXCIsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiZGVsZXRQaG90b1wiLCB0aGlzLnBob3RvSW5kZXgpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIHRoaXMubG9hZGluZ091dCgpO1xyXG4gICAgICAgICAgdGhpcy50b2FzdFN1Y2MoXCLliKDpmaTmiJDlip9cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKCkge1xyXG4gICAgICB2YXIgX3VybHM7XHJcbiAgICAgIGlmICh0aGlzLnBob3RvSXRlbS5waG90b190eXBlID09PSBcIjBcIikge1xyXG4gICAgICAgIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcGhvdG8udXJsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF91cmxzID0gdGhpcy5waG90b0l0ZW0udmlkZW8ucGxheV91cmw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubG9hZGluZ0luKFwi5q2j5Zyo5LiL6L29XCIpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscyk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KCk7XHJcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoXCLkuIvovb3miJDlip9cIik7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKTtcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbChcIuS4i+i9veWksei0pVwiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHByaW50ZXJDbGljayhlLCBwaWQsIHVpZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhwaWQpO1xyXG4gICAgICB0aGlzLmxvYWRpbmdJbihcIuato+WcqOi3s+i9rFwiKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6IFwiL2dnL3Bob3RvL2ZldGNocGF5bG9hZGtleVwiLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaG90b19pZDogcGlkIHx8IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxyXG4gICAgICAgICAgICB1c2VyX2lkOiB1aWQgfHwgdGhpcy5waG90b0l0ZW0udXNlci51c2VyX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdPdXQoKTtcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbChcIui3s+i9rOWksei0peS6hlwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sb2FkaW5nT3V0KCk7XHJcbiAgICAgIGlmICghKHJlcyAmJiByZXMuc3VjYyAmJiByZXMuZGF0YSkpIHtcclxuICAgICAgICB0aGlzLnRvYXN0RmFpbChcIui3s+i9rOWksei0peS6hlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgd2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgIGFwcElkOiBcInd4ZjM0ZmUzZmI1MjVlYTEzOVwiLFxyXG4gICAgICAgIHBhdGg6IGBwYWdlcy90cmFuc2Zlci90cmFuc2Zlcj9wYXlsb2FkS2V5PSR7cmVzLmRhdGF9YCxcclxuICAgICAgICBlbnZWZXJzaW9uOiBcImRldmVsb3BcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwbGF5VmlkZW8oKSB7XHJcbiAgICAgIGlmICh0aGlzLnBob3RvSXRlbUFjdGl2ZUlkeCAhPT0gdGhpcy5waG90b0luZGV4KSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdChcImhpZGVWaWRlb1wiLCB0aGlzLnBob3RvSXRlbUFjdGl2ZUlkeCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kZW1pdChcInNob3dWaWRlb1wiLCB0aGlzLnBob3RvSW5kZXgpO1xyXG4gICAgfSxcclxuICAgIHZpZGVvRW5kKCkge1xyXG4gICAgICB0aGlzLiRlbWl0KFwiaGlkZGVuVmlkZW9cIiwgdGhpcy5waG90b0luZGV4KTtcclxuICAgIH0sXHJcbiAgICB2aWRlb1NjcmVlbmNoYW5nZShlKSB7XHJcbiAgICAgIGlmICghZS5kZXRhaWwuZnVsbFNjcmVlbikge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoXCJoaWRkZW5WaWRlb1wiLCB0aGlzLnBob3RvSW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGFwKCkge30sXHJcbiAgICBkb3duSW1hZ2UoKSB7fVxyXG4gIH07XHJcbn1cclxuIl19