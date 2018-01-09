'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewPhoto = function (_wepy$component) {
  _inherits(PreviewPhoto, _wepy$component);

  function PreviewPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PreviewPhoto);

    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      galleryAuth: Number,
      galleryId: String,
      groupId: String,
      publishAfterInfo: Object
    }, _this.data = {
      images: []
    }, _this.methods = {
      chooseImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var chooseRes, tempFilePaths;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.galleryAuth < 2)) {
                    _context.next = 3;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: '没有权限',
                    content: '没有权限'
                  });
                  return _context.abrupt('return');

                case 3:
                  _context.prev = 3;
                  _context.next = 6;
                  return _wepy2.default.chooseImage({
                    count: 9
                  });

                case 6:
                  chooseRes = _context.sent;
                  tempFilePaths = chooseRes.tempFilePaths;

                  wx.showLoading({
                    title: '正在上传',
                    mask: true
                  });
                  _context.next = 11;
                  return this.loadImages(tempFilePaths);

                case 11:
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context['catch'](3);

                  console.log(_context.t0);

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 13]]);
        }));

        function chooseImage() {
          return _ref2.apply(this, arguments);
        }

        return chooseImage;
      }(),
      readTips: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _login.request)({
                    url: '/gg/group/news_read',
                    data: {
                      gallery_id: this.galleryId
                    }
                  });

                case 2:
                case 'end':
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
      openNewAlbum: function openNewAlbum() {
        if (this.galleryAuth < 3) {
          _wepy2.default.showModal({
            title: '没有权限',
            content: '没有权限'
          });
          return;
        }
        this.$emit('openNewAlbum');
      },
      backToIndex: function backToIndex() {
        _wepy2.default.redirectTo({
          url: '/pages/gallery/gallery?id=' + this.groupId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PreviewPhoto, [{
    key: 'pushlish',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                wx.showLoading({
                  title: '正在发布',
                  mask: true
                });
                _context3.next = 3;
                return (0, _login.request)({
                  url: '/gg/publish/photo',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    param: JSON.stringify(this.images),
                    gallery_id: this.galleryId
                  }
                });

              case 3:
                res = _context3.sent;

                if (res.succ && res.data) {
                  wx.hideLoading();
                  this.$emit('publishPhoto', res.data);
                }
                _context3.next = 7;
                return this.pushlishAfter();

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function pushlish() {
        return _ref4.apply(this, arguments);
      }

      return pushlish;
    }()
  }, {
    key: 'pushlishAfter',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var newsRes;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.images = [];
                _context4.next = 3;
                return (0, _login.request)({
                  url: '/gg/group/news',
                  data: {
                    gallery_id: this.galleryId
                  }
                });

              case 3:
                newsRes = _context4.sent;

                if (newsRes.succ && newsRes.data) {
                  this.$emit('changePublishInfo', newsRes.data);
                }

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function pushlishAfter() {
        return _ref5.apply(this, arguments);
      }

      return pushlishAfter;
    }()
  }, {
    key: 'loadImages',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(files) {
        var _this2 = this;

        var _load, _len, i;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _load = function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(file) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return (0, _api.uploadImageToQiniu)(file);

                          case 2:
                            res = _context5.sent;

                            _this2.images.push(res);
                            _this2.$apply();

                          case 5:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this2);
                  }));

                  return function _load(_x2) {
                    return _ref7.apply(this, arguments);
                  };
                }();

                _len = files.length;
                i = 0;

              case 3:
                if (!(i < _len)) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 6;
                return _load(files[i]);

              case 6:
                i++;
                _context6.next = 3;
                break;

              case 9:
                this.pushlish();

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadImages(_x) {
        return _ref6.apply(this, arguments);
      }

      return loadImages;
    }()
  }]);

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsImdhbGxlcnlBdXRoIiwiTnVtYmVyIiwiZ2FsbGVyeUlkIiwiU3RyaW5nIiwiZ3JvdXBJZCIsInB1Ymxpc2hBZnRlckluZm8iLCJPYmplY3QiLCJkYXRhIiwiaW1hZ2VzIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJsb2FkSW1hZ2VzIiwiY29uc29sZSIsImxvZyIsInJlYWRUaXBzIiwidXJsIiwiZ2FsbGVyeV9pZCIsIm9wZW5OZXdBbGJ1bSIsIiRlbWl0IiwiYmFja1RvSW5kZXgiLCJyZWRpcmVjdFRvIiwibWV0aG9kIiwiaGVhZGVyIiwicGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwicHVzaGxpc2hBZnRlciIsIm5ld3NSZXMiLCJmaWxlcyIsIl9sb2FkIiwiZmlsZSIsInB1c2giLCIkYXBwbHkiLCJfbGVuIiwibGVuZ3RoIiwiaSIsInB1c2hsaXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhQyxNQURQO0FBRU5DLGlCQUFXQyxNQUZMO0FBR05DLGVBQVNELE1BSEg7QUFJTkUsd0JBQWlCQztBQUpYLEssUUFNUkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFESCxLLFFBR1BDLE8sR0FBVTtBQUNSQztBQUFBLDRFQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUNQLEtBQUtWLFdBQUwsR0FBbUIsQ0FEWjtBQUFBO0FBQUE7QUFBQTs7QUFFVCxpQ0FBS1csU0FBTCxDQUFlO0FBQ2JDLDJCQUFPLE1BRE07QUFFYkMsNkJBQVM7QUFGSSxtQkFBZjtBQUZTOztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQVNhLGVBQUtILFdBQUwsQ0FBaUI7QUFDckNJLDJCQUFPO0FBRDhCLG1CQUFqQixDQVRiOztBQUFBO0FBU0xDLDJCQVRLO0FBWUxDLCtCQVpLLEdBWVdELFVBQVVDLGFBWnJCOztBQWFUQyxxQkFBR0MsV0FBSCxDQUFlO0FBQ2JOLDJCQUFPLE1BRE07QUFFYk8sMEJBQU07QUFGTyxtQkFBZjtBQWJTO0FBQUEseUJBaUJILEtBQUtDLFVBQUwsQ0FBZ0JKLGFBQWhCLENBakJHOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBbUJUSywwQkFBUUMsR0FBUjs7QUFuQlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxTQURRO0FBdUJSQztBQUFBLDRFQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUNGLG9CQUFRO0FBQ1pDLHlCQUFLLHFCQURPO0FBRVpqQiwwQkFBTTtBQUNKa0Isa0NBQVksS0FBS3ZCO0FBRGI7QUFGTSxtQkFBUixDQURFOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsU0F2QlE7QUErQlJ3QixrQkEvQlEsMEJBK0JPO0FBQ2IsWUFBSSxLQUFLMUIsV0FBTCxHQUFtQixDQUF2QixFQUEwQjtBQUN4Qix5QkFBS1csU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLE1BRE07QUFFYkMscUJBQVM7QUFGSSxXQUFmO0FBSUE7QUFDRDtBQUNELGFBQUtjLEtBQUwsQ0FBVyxjQUFYO0FBQ0QsT0F4Q087QUF5Q1JDLGlCQXpDUSx5QkF5Q007QUFDWix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkTCw4Q0FBa0MsS0FBS3BCO0FBRHpCLFNBQWhCO0FBR0Q7QUE3Q08sSzs7Ozs7Ozs7Ozs7O0FBaURSYSxtQkFBR0MsV0FBSCxDQUFlO0FBQ2JOLHlCQUFPLE1BRE07QUFFYk8sd0JBQU07QUFGTyxpQkFBZjs7dUJBSWdCLG9CQUFRO0FBQ3RCSyx1QkFBSyxtQkFEaUI7QUFFdEJNLDBCQUFRLE1BRmM7QUFHdEJDLDBCQUFRO0FBQ04sb0NBQWdCO0FBRFYsbUJBSGM7QUFNdEJ4Qix3QkFBTTtBQUNKeUIsMkJBQU9DLEtBQUtDLFNBQUwsQ0FBZSxLQUFLMUIsTUFBcEIsQ0FESDtBQUVKaUIsZ0NBQVksS0FBS3ZCO0FBRmI7QUFOZ0IsaUJBQVIsQzs7O0FBQVppQyxtQjs7QUFXSixvQkFBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJNUIsSUFBcEIsRUFBMEI7QUFDeEJVLHFCQUFHb0IsV0FBSDtBQUNBLHVCQUFLVixLQUFMLENBQVcsY0FBWCxFQUEyQlEsSUFBSTVCLElBQS9CO0FBQ0Q7O3VCQUNLLEtBQUsrQixhQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHTixxQkFBSzlCLE1BQUwsR0FBYyxFQUFkOzt1QkFDb0Isb0JBQVE7QUFDMUJnQix1QkFBSyxnQkFEcUI7QUFFMUJqQix3QkFBTTtBQUNKa0IsZ0NBQVksS0FBS3ZCO0FBRGI7QUFGb0IsaUJBQVIsQzs7O0FBQWhCcUMsdUI7O0FBTUosb0JBQUlBLFFBQVFILElBQVIsSUFBZ0JHLFFBQVFoQyxJQUE1QixFQUFrQztBQUNoQyx1QkFBS29CLEtBQUwsQ0FBVyxtQkFBWCxFQUFnQ1ksUUFBUWhDLElBQXhDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBRWNpQyxLOzs7Ozs7Ozs7QUFDWEMscUI7c0ZBQVEsa0JBQU1DLElBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FDTSw2QkFBbUJBLElBQW5CLENBRE47O0FBQUE7QUFDTlAsK0JBRE07O0FBRVYsbUNBQUszQixNQUFMLENBQVltQyxJQUFaLENBQWlCUixHQUFqQjtBQUNBLG1DQUFLUyxNQUFMOztBQUhVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1COztrQ0FBUkgsSzs7Ozs7QUFNQUksb0IsR0FBT0wsTUFBTU0sTTtBQUNSQyxpQixHQUFJLEM7OztzQkFBR0EsSUFBSUYsSTs7Ozs7O3VCQUNaSixNQUFNRCxNQUFNTyxDQUFOLENBQU4sQzs7O0FBRGtCQSxtQjs7Ozs7QUFHMUIscUJBQUtDLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2R3NDLGVBQUtDLFM7O2tCQUExQm5ELFkiLCJmaWxlIjoicHVibGlzaFBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHVwbG9hZEltYWdlVG9RaW5pdSB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBnYWxsZXJ5QXV0aDogTnVtYmVyLFxuICAgIGdhbGxlcnlJZDogU3RyaW5nLFxuICAgIGdyb3VwSWQ6IFN0cmluZyxcbiAgICBwdWJsaXNoQWZ0ZXJJbmZvOk9iamVjdFxuICB9O1xuICBkYXRhID0ge1xuICAgIGltYWdlczogW10sXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeUF1dGggPCAyKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+ayoeacieadg+mZkCcsXG4gICAgICAgICAgY29udGVudDogJ+ayoeacieadg+mZkCdcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNob29zZVJlcyA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiA5XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gY2hvb3NlUmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5LiK5LygJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlcyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVhZFRpcHM6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJy9nZy9ncm91cC9uZXdzX3JlYWQnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZ2FsbGVyeV9pZDogdGhpcy5nYWxsZXJ5SWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9wZW5OZXdBbGJ1bSgpIHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlBdXRoIDwgMykge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInmnYPpmZAnLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmnYPpmZAnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ29wZW5OZXdBbGJ1bScpXG4gICAgfSxcbiAgICBiYWNrVG9JbmRleCgpIHtcbiAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9nYWxsZXJ5L2dhbGxlcnk/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgfSlcbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgcHVzaGxpc2goKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfmraPlnKjlj5HluIMnLFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pXG4gICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL3B1Ymxpc2gvcGhvdG8nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXJhbTogSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpLFxuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5zdWNjICYmIHJlcy5kYXRhKSB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICB0aGlzLiRlbWl0KCdwdWJsaXNoUGhvdG8nLCByZXMuZGF0YSlcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wdXNobGlzaEFmdGVyKClcbiAgfVxuICBhc3luYyBwdXNobGlzaEFmdGVyKCkge1xuICAgIHRoaXMuaW1hZ2VzID0gW11cbiAgICB2YXIgbmV3c1JlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2dnL2dyb3VwL25ld3MnLFxuICAgICAgZGF0YToge1xuICAgICAgICBnYWxsZXJ5X2lkOiB0aGlzLmdhbGxlcnlJZFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG5ld3NSZXMuc3VjYyAmJiBuZXdzUmVzLmRhdGEpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZVB1Ymxpc2hJbmZvJywgbmV3c1Jlcy5kYXRhKVxuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkSW1hZ2VzKGZpbGVzKSB7XG4gICAgdmFyIF9sb2FkID0gYXN5bmMgZmlsZSA9PiB7XG4gICAgICB2YXIgcmVzID0gYXdhaXQgdXBsb2FkSW1hZ2VUb1Fpbml1KGZpbGUpXG4gICAgICB0aGlzLmltYWdlcy5wdXNoKHJlcylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9O1xuXG4gICAgdmFyIF9sZW4gPSBmaWxlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgYXdhaXQgX2xvYWQoZmlsZXNbaV0pXG4gICAgfVxuICAgIHRoaXMucHVzaGxpc2goKVxuICB9XG59XG4iXX0=