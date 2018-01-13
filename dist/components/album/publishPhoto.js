"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

var _login = require('./../../utils/login.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishPhoto = function (_wepy$component) {
  _inherits(PublishPhoto, _wepy$component);

  function PublishPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PublishPhoto);

    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PublishPhoto.__proto__ || Object.getPrototypeOf(PublishPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number,
      galleryId: String,
      groupId: String,
      groupUserName: String,
      publishToastInfo: {
        type: Object,
        twoWay: true
      }
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      images: [],
      video: {}
    }, _this.methods = {
      chooseType: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.galleryAuth < 2)) {
                    _context.next = 3;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: "权限提醒",
                    content: "只有本群成员才能上传视频"
                  });
                  return _context.abrupt("return");

                case 3:
                  _context.next = 5;
                  return this.readTipsFun();

                case 5:
                  _context.next = 7;
                  return _wepy2.default.showActionSheet({
                    itemList: ["照片", "视频"]
                  });

                case 7:
                  res = _context.sent;

                  if (!(res.tapIndex === 0)) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 11;
                  return this.chooseImage();

                case 11:
                  _context.next = 16;
                  break;

                case 13:
                  if (!(res.tapIndex === 1)) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 16;
                  return this.chooseVideo();

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function chooseType() {
          return _ref2.apply(this, arguments);
        }

        return chooseType;
      }(),
      readTips: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.readTipsFun();

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function readTips() {
          return _ref3.apply(this, arguments);
        }

        return readTips;
      }(),
      editAlbum: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _wepy2.default.showActionSheet({
                    itemList: ["修改相册名", "删除相册"]
                  });

                case 2:
                  res = _context3.sent;

                  if (!(res.tapIndex === 0)) {
                    _context3.next = 8;
                    break;
                  }

                  _context3.next = 6;
                  return this.openNewAlbum();

                case 6:
                  _context3.next = 9;
                  break;

                case 8:
                  this.$emit("delalbum");

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function editAlbum() {
          return _ref4.apply(this, arguments);
        }

        return editAlbum;
      }(),
      backToIndex: function backToIndex() {
        var pages = getCurrentPages().length;
        if (pages > 2) {
          _wepy2.default.navigateBack({
            delta: 1
          });
        } else {
          _wepy2.default.redirectTo({
            url: "/pages/gallery/gallery?id=" + this.groupId
          });
        }
      }
    }, _this.event = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 混合


  _createClass(PublishPhoto, [{
    key: "openNewAlbum",
    value: function openNewAlbum() {
      if (this.galleryAuth < 3) {
        _wepy2.default.showModal({
          title: "权限提醒",
          content: "\u53EA\u6709\u7FA4\u4E3B" + this.groupUserName + "\u624D\u80FD\u4FEE\u6539\u7FA4\u4FE1\u606F"
        });
        return;
      }
      this.$emit("openNewAlbum");
    }
  }, {
    key: "chooseVideo",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var upRes;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.video = null;
                _context4.next = 3;
                return _wepy2.default.chooseVideo({
                  sourceType: ["album", "camera"],
                  compressed: true,
                  maxDuration: 60
                });

              case 3:
                this.video = _context4.sent;
                _context4.prev = 4;

                this.loadingIn("正在上传");
                console.log("正在上传");
                _context4.next = 9;
                return (0, _api.uploadImageToQiniu)(this.video.tempFilePath, "mp4");

              case 9:
                upRes = _context4.sent;

                this.video = _extends({}, this.video, upRes);
                _context4.next = 13;
                return this.publish("video");

              case 13:
                _context4.next = 20;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](4);

                this.loadingOut();
                this.toastFail("上传失败");
                console.log(_context4.t0);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 15]]);
      }));

      function chooseVideo() {
        return _ref5.apply(this, arguments);
      }

      return chooseVideo;
    }()
  }, {
    key: "chooseImage",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var chooseRes, tempFilePaths;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.images = [];
                _context5.next = 3;
                return _wepy2.default.chooseImage({
                  count: 9
                });

              case 3:
                chooseRes = _context5.sent;
                tempFilePaths = chooseRes.tempFilePaths;
                _context5.prev = 5;

                this.loadingIn("正在上传");
                _context5.next = 9;
                return this.loadImages(tempFilePaths);

              case 9:
                _context5.next = 15;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](5);

                this.loadingOut();
                this.toastFail("上传失败");

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 11]]);
      }));

      function chooseImage() {
        return _ref6.apply(this, arguments);
      }

      return chooseImage;
    }()
  }, {
    key: "readTipsFun",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var m;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _login.request)({
                  url: "/gg/group/news_read",
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 2:
                m = _context6.sent;

                if (m.succ) {
                  this.publishToastInfo = false;
                  this.$apply();
                  // this.$emit("clearpublishToastInfo");
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function readTipsFun() {
        return _ref7.apply(this, arguments);
      }

      return readTipsFun;
    }()
  }, {
    key: "publishVideoFun",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _data, res;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _data = {
                  gallery_id: this.galleryId,
                  video_url: this.video.key,
                  video_duration: this.video.duration,
                  video_hash: this.video.hash,
                  video_width: this.video.width,
                  video_height: this.video.height
                };
                _context7.next = 4;
                return (0, _login.request)({
                  url: "/gg/publish/video",
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  data: _data
                });

              case 4:
                res = _context7.sent;
                return _context7.abrupt("return", res);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                throw new Error();

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      function publishVideoFun() {
        return _ref8.apply(this, arguments);
      }

      return publishVideoFun;
    }()
  }, {
    key: "publishImagesFun",
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return (0, _login.request)({
                  url: "/gg/publish/photo",
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    param: JSON.stringify(this.images),
                    gallery_id: this.galleryId
                  }
                });

              case 3:
                res = _context8.sent;
                return _context8.abrupt("return", res);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                throw new Error();

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function publishImagesFun() {
        return _ref9.apply(this, arguments);
      }

      return publishImagesFun;
    }()
  }, {
    key: "publish",
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(type) {
        var res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.loadingIn("正在发布");

                if (!(type === "image")) {
                  _context9.next = 7;
                  break;
                }

                _context9.next = 4;
                return this.publishImagesFun();

              case 4:
                res = _context9.sent;
                _context9.next = 10;
                break;

              case 7:
                _context9.next = 9;
                return this.publishVideoFun();

              case 9:
                res = _context9.sent;

              case 10:
                wx.hideLoading();
                if (res.succ && res.data) {
                  this.$emit("publishPhotoAndVideo", res.data);
                } else {
                  this.toastFail("发布失败");
                }

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function publish(_x) {
        return _ref10.apply(this, arguments);
      }

      return publish;
    }()
  }, {
    key: "loadImages",
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(files) {
        var _len, i, res;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context10.next = 11;
                  break;
                }

                _context10.next = 6;
                return (0, _api.uploadImageToQiniu)(files[i]);

              case 6:
                res = _context10.sent;

                this.images.push(res);

              case 8:
                i++;
                _context10.next = 3;
                break;

              case 11:
                this.$apply();
                this.publish("image");
                _context10.next = 18;
                break;

              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](0);
                throw new Error();

              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 15]]);
      }));

      function loadImages(_x2) {
        return _ref11.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PublishPhoto;
}(_wepy2.default.component);

exports.default = PublishPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQdWJsaXNoUGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsImdyb3VwVXNlck5hbWUiLCJwdWJsaXNoVG9hc3RJbmZvIiwidHlwZSIsIk9iamVjdCIsInR3b1dheSIsIm1peGlucyIsImRhdGEiLCJpbWFnZXMiLCJ2aWRlbyIsIm1ldGhvZHMiLCJjaG9vc2VUeXBlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwicmVhZFRpcHNGdW4iLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInJlcyIsInRhcEluZGV4IiwiY2hvb3NlSW1hZ2UiLCJjaG9vc2VWaWRlbyIsInJlYWRUaXBzIiwiZWRpdEFsYnVtIiwib3Blbk5ld0FsYnVtIiwiJGVtaXQiLCJiYWNrVG9JbmRleCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwidXJsIiwiZXZlbnQiLCJzb3VyY2VUeXBlIiwiY29tcHJlc3NlZCIsIm1heER1cmF0aW9uIiwibG9hZGluZ0luIiwiY29uc29sZSIsImxvZyIsInRlbXBGaWxlUGF0aCIsInVwUmVzIiwicHVibGlzaCIsImxvYWRpbmdPdXQiLCJ0b2FzdEZhaWwiLCJjb3VudCIsImNob29zZVJlcyIsInRlbXBGaWxlUGF0aHMiLCJsb2FkSW1hZ2VzIiwiZ2FsbGVyeV9pZCIsIm0iLCJzdWNjIiwiJGFwcGx5IiwiX2RhdGEiLCJ2aWRlb191cmwiLCJrZXkiLCJ2aWRlb19kdXJhdGlvbiIsImR1cmF0aW9uIiwidmlkZW9faGFzaCIsImhhc2giLCJ2aWRlb193aWR0aCIsIndpZHRoIiwidmlkZW9faGVpZ2h0IiwiaGVpZ2h0IiwibWV0aG9kIiwiaGVhZGVyIiwiRXJyb3IiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoSW1hZ2VzRnVuIiwicHVibGlzaFZpZGVvRnVuIiwid3giLCJoaWRlTG9hZGluZyIsImZpbGVzIiwiX2xlbiIsImkiLCJwdXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxtQkFBYUMsTUFEUDtBQUVOQyxpQkFBV0MsTUFGTDtBQUdOQyxlQUFTRCxNQUhIO0FBSU5FLHFCQUFlRixNQUpUO0FBS05HLHdCQUFrQjtBQUNoQkMsY0FBTUMsTUFEVTtBQUVoQkMsZ0JBQVE7QUFGUTtBQUxaLEssUUFXUkMsTSxHQUFTLHdCLFFBQ1RDLEksR0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTEMsYUFBTztBQUZGLEssUUFJUEMsTyxHQUFVO0FBQ1JDO0FBQUEsNEVBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBQ04sS0FBS2YsV0FBTCxHQUFtQixDQURiO0FBQUE7QUFBQTtBQUFBOztBQUVSLGlDQUFLZ0IsU0FBTCxDQUFlO0FBQ2JDLDJCQUFPLE1BRE07QUFFYkMsNkJBQVM7QUFGSSxtQkFBZjtBQUZROztBQUFBO0FBQUE7QUFBQSx5QkFRSixLQUFLQyxXQUFMLEVBUkk7O0FBQUE7QUFBQTtBQUFBLHlCQVNNLGVBQUtDLGVBQUwsQ0FBcUI7QUFDbkNDLDhCQUFVLENBQUMsSUFBRCxFQUFPLElBQVA7QUFEeUIsbUJBQXJCLENBVE47O0FBQUE7QUFTTkMscUJBVE07O0FBQUEsd0JBWU5BLElBQUlDLFFBQUosS0FBaUIsQ0FaWDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQWFGLEtBQUtDLFdBQUwsRUFiRTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx3QkFjQ0YsSUFBSUMsUUFBSixLQUFpQixDQWRsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlCQWVGLEtBQUtFLFdBQUwsRUFmRTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QUg7QUFDQSxvQkFBSXhELElBQUlrQyxJQUFKLElBQVlsQyxJQUFJWCxJQUFwQixFQUEwQjtBQUN4Qix1QkFBS2tCLEtBQUwsQ0FBVyxzQkFBWCxFQUFtQ1AsSUFBSVgsSUFBdkM7QUFDRCxpQkFGRCxNQUVPO0FBQ0wsdUJBQUtzQyxTQUFMLENBQWUsTUFBZjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhGQUdjOEIsSzs7Ozs7Ozs7QUFFVEMsb0IsR0FBT0QsTUFBTTlDLE07QUFDUmdELGlCLEdBQUksQzs7O3NCQUFHQSxJQUFJRCxJOzs7Ozs7dUJBQ0YsNkJBQW1CRCxNQUFNRSxDQUFOLENBQW5CLEM7OztBQUFaM0QsbUI7O0FBQ0oscUJBQUtWLE1BQUwsQ0FBWXNFLElBQVosQ0FBaUI1RCxHQUFqQjs7O0FBRndCMkQsbUI7Ozs7O0FBSTFCLHFCQUFLeEIsTUFBTDtBQUNBLHFCQUFLVixPQUFMLENBQWEsT0FBYjs7Ozs7OztzQkFFTSxJQUFJd0IsS0FBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUw4QixlQUFLWSxTOztrQkFBMUJyRixZIiwiZmlsZSI6InB1Ymxpc2hQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gXCIuLi8uLi91dGlscy9hcGkuanNcIjtcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbG9naW4uanNcIjtcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSBcIkAvbWl4aW5zL2xvYWRpbmdNaXhpblwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaFBob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIGdhbGxlcnlJZDogU3RyaW5nLFxuICAgIGdyb3VwSWQ6IFN0cmluZyxcbiAgICBncm91cFVzZXJOYW1lOiBTdHJpbmcsXG4gICAgcHVibGlzaFRvYXN0SW5mbzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfVxuICB9O1xuICAvLyDmt7flkIhcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgaW1hZ2VzOiBbXSxcbiAgICB2aWRlbzoge31cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaG9vc2VUeXBlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMikge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6IFwi5p2D6ZmQ5o+Q6YaSXCIsXG4gICAgICAgICAgY29udGVudDogXCLlj6rmnInmnKznvqTmiJDlkZjmiY3og73kuIrkvKDop4bpopFcIlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5yZWFkVGlwc0Z1bigpO1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHdlcHkuc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgaXRlbUxpc3Q6IFtcIueFp+eJh1wiLCBcIuinhumikVwiXVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hvb3NlSW1hZ2UoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzLnRhcEluZGV4ID09PSAxKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hvb3NlVmlkZW8oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlYWRUaXBzOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHRoaXMucmVhZFRpcHNGdW4oKTtcbiAgICB9LFxuICAgIGVkaXRBbGJ1bTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgd2VweS5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdDogW1wi5L+u5pS555u45YaM5ZCNXCIsIFwi5Yig6Zmk55u45YaMXCJdXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuTmV3QWxidW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVtaXQoXCJkZWxhbGJ1bVwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJhY2tUb0luZGV4KCkge1xuICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoO1xuICAgICAgaWYgKHBhZ2VzID4gMikge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGV2ZW50ID0ge307XG4gIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICBpZiAodGhpcy5nYWxsZXJ5QXV0aCA8IDMpIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwi5p2D6ZmQ5o+Q6YaSXCIsXG4gICAgICAgIGNvbnRlbnQ6IGDlj6rmnInnvqTkuLske3RoaXMuZ3JvdXBVc2VyTmFtZX3miY3og73kv67mlLnnvqTkv6Hmga9gXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4kZW1pdChcIm9wZW5OZXdBbGJ1bVwiKTtcbiAgfVxuICBhc3luYyBjaG9vc2VWaWRlbygpIHtcbiAgICB0aGlzLnZpZGVvID0gbnVsbDtcbiAgICB0aGlzLnZpZGVvID0gYXdhaXQgd2VweS5jaG9vc2VWaWRlbyh7XG4gICAgICBzb3VyY2VUeXBlOiBbXCJhbGJ1bVwiLCBcImNhbWVyYVwiXSxcbiAgICAgIGNvbXByZXNzZWQ6IHRydWUsXG4gICAgICBtYXhEdXJhdGlvbjogNjBcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvYWRpbmdJbihcIuato+WcqOS4iuS8oFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi5q2j5Zyo5LiK5LygXCIpO1xuICAgICAgdmFyIHVwUmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KHRoaXMudmlkZW8udGVtcEZpbGVQYXRoLCBcIm1wNFwiKTtcbiAgICAgIHRoaXMudmlkZW8gPSB7XG4gICAgICAgIC4uLnRoaXMudmlkZW8sXG4gICAgICAgIC4uLnVwUmVzXG4gICAgICB9O1xuICAgICAgYXdhaXQgdGhpcy5wdWJsaXNoKFwidmlkZW9cIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KCk7XG4gICAgICB0aGlzLnRvYXN0RmFpbChcIuS4iuS8oOWksei0pVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxuICBhc3luYyBjaG9vc2VJbWFnZSgpIHtcbiAgICB0aGlzLmltYWdlcyA9IFtdO1xuICAgIHZhciBjaG9vc2VSZXMgPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgIGNvdW50OiA5XG4gICAgfSk7XG4gICAgdmFyIHRlbXBGaWxlUGF0aHMgPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRocztcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oXCLmraPlnKjkuIrkvKBcIik7XG4gICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZXModGVtcEZpbGVQYXRocyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2FkaW5nT3V0KCk7XG4gICAgICB0aGlzLnRvYXN0RmFpbChcIuS4iuS8oOWksei0pVwiKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgcmVhZFRpcHNGdW4oKSB7XG4gICAgdmFyIG0gPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVybDogXCIvZ2cvZ3JvdXAvbmV3c19yZWFkXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG0uc3VjYykge1xuICAgICAgdGhpcy5wdWJsaXNoVG9hc3RJbmZvID0gZmFsc2U7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgLy8gdGhpcy4kZW1pdChcImNsZWFycHVibGlzaFRvYXN0SW5mb1wiKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgcHVibGlzaFZpZGVvRnVuKCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgIGdhbGxlcnlfaWQ6IHRoaXMuZ2FsbGVyeUlkLFxuICAgICAgICB2aWRlb191cmw6IHRoaXMudmlkZW8ua2V5LFxuICAgICAgICB2aWRlb19kdXJhdGlvbjogdGhpcy52aWRlby5kdXJhdGlvbixcbiAgICAgICAgdmlkZW9faGFzaDogdGhpcy52aWRlby5oYXNoLFxuICAgICAgICB2aWRlb193aWR0aDogdGhpcy52aWRlby53aWR0aCxcbiAgICAgICAgdmlkZW9faGVpZ2h0OiB0aGlzLnZpZGVvLmhlaWdodFxuICAgICAgfTtcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBcIi9nZy9wdWJsaXNoL3ZpZGVvXCIsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgcHVibGlzaEltYWdlc0Z1bigpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiL2dnL3B1Ymxpc2gvcGhvdG9cIixcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcGFyYW06IEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSxcbiAgICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfVxuICB9XG4gIGFzeW5jIHB1Ymxpc2godHlwZSkge1xuICAgIHRoaXMubG9hZGluZ0luKFwi5q2j5Zyo5Y+R5biDXCIpO1xuICAgIHZhciByZXM7XG4gICAgaWYgKHR5cGUgPT09IFwiaW1hZ2VcIikge1xuICAgICAgcmVzID0gYXdhaXQgdGhpcy5wdWJsaXNoSW1hZ2VzRnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyA9IGF3YWl0IHRoaXMucHVibGlzaFZpZGVvRnVuKCk7XG4gICAgfVxuICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB0aGlzLiRlbWl0KFwicHVibGlzaFBob3RvQW5kVmlkZW9cIiwgcmVzLmRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvYXN0RmFpbChcIuWPkeW4g+Wksei0pVwiKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfbGVuID0gZmlsZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHVwbG9hZEltYWdlVG9RaW5pdShmaWxlc1tpXSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2gocmVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB0aGlzLnB1Ymxpc2goXCJpbWFnZVwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==