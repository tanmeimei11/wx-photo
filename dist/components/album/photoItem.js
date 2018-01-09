'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _api = require('./../../utils/api.js');

var _common = require('./../../utils/common.js');

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
      photoIndex: Number
    }, _this.data = {
      image: [1, 2, 3, 4, 5, 6, 7]
    }, _this.watch = {}, _this.methods = {
      clickImage: function clickImage(e) {
        var _photoIdx = e.target.dataset.index;
        this.$emit('changeCurPhotos', this.photoItem.photos, _photoIdx);
      },
      clickZan: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res, zanListRes;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _login.request)({
                    url: '/gg/photo/zan',
                    data: {
                      pid: this.photoItem.photo_id,
                      action: this.photoItem.is_zan ? 'cancel' : 'zan'
                    }
                  });

                case 2:
                  res = _context.sent;
                  _context.next = 5;
                  return (0, _login.request)({
                    url: '/gg/photo/zan_list',
                    data: {
                      pid: this.photoItem.photo_id
                    }
                  });

                case 5:
                  zanListRes = _context.sent;


                  if (res.succ && zanListRes.succ && zanListRes.data) {
                    this.photoItem.is_zan = !this.photoItem.is_zan;
                    this.photoItem.zan_list = zanListRes.data;
                    this.$apply();
                  }

                case 7:
                case 'end':
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
                  return (0, _common.wxPromisify)(wx.showActionSheet)({
                    itemList: ['删除'],
                    itemColor: '#FF5E51'
                  });

                case 2:
                  res = _context2.sent;

                  if (res.tapIndex === 0) {
                    (0, _login.request)({
                      url: '/gg/photo/del',
                      data: {
                        pid: this.photoItem.photo_id
                      }
                    }).then(function (res) {
                      _this2.$emit('deletPhoto', _this2.photoIndex);
                      _this2.$apply();
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        mask: true
                      });
                    });
                  }

                case 4:
                case 'end':
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
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
          var _urls;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _urls = this.photoItem.photos.map(function (photo) {
                    return photo.url;
                  });
                  _context3.next = 3;
                  return (0, _api.downInternetUrl)(_urls);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function downUrl(_x) {
          return _ref4.apply(this, arguments);
        }

        return downUrl;
      }(),
      tap: function tap() {},
      downImage: function downImage() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PhotoItem;
}(_wepy2.default.component);

exports.default = PhotoItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvSXRlbS5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsIiRlbWl0IiwicGhvdG9zIiwiY2xpY2taYW4iLCJ1cmwiLCJwaWQiLCJwaG90b19pZCIsImFjdGlvbiIsImlzX3phbiIsInJlcyIsInphbkxpc3RSZXMiLCJzdWNjIiwiemFuX2xpc3QiLCIkYXBwbHkiLCJkZWxQaG90byIsInd4Iiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwiZG93blVybCIsIl91cmxzIiwibWFwIiwicGhvdG8iLCJ0YXAiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU87QUFDTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CO0FBREYsSyxRQUdQQyxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLFlBQVlELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakM7QUFDQSxhQUFLQyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2IsU0FBTCxDQUFlYyxNQUE3QyxFQUFxREwsU0FBckQ7QUFDRCxPQUpPO0FBS0ZNLGNBTEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQU1VLG9CQUFRO0FBQ3RCQyx5QkFBSyxlQURpQjtBQUV0QmIsMEJBQU07QUFDSmMsMkJBQUssS0FBS2pCLFNBQUwsQ0FBZWtCLFFBRGhCO0FBRUpDLDhCQUFRLEtBQUtuQixTQUFMLENBQWVvQixNQUFmLEdBQXdCLFFBQXhCLEdBQW1DO0FBRnZDO0FBRmdCLG1CQUFSLENBTlY7O0FBQUE7QUFNRkMscUJBTkU7QUFBQTtBQUFBLHlCQWNpQixvQkFBUTtBQUM3QkwseUJBQUssb0JBRHdCO0FBRTdCYiwwQkFBTTtBQUNKYywyQkFBSyxLQUFLakIsU0FBTCxDQUFla0I7QUFEaEI7QUFGdUIsbUJBQVIsQ0FkakI7O0FBQUE7QUFjRkksNEJBZEU7OztBQXFCTixzQkFBSUQsSUFBSUUsSUFBSixJQUFZRCxXQUFXQyxJQUF2QixJQUErQkQsV0FBV25CLElBQTlDLEVBQW9EO0FBQ2xELHlCQUFLSCxTQUFMLENBQWVvQixNQUFmLEdBQXdCLENBQUMsS0FBS3BCLFNBQUwsQ0FBZW9CLE1BQXhDO0FBQ0EseUJBQUtwQixTQUFMLENBQWV3QixRQUFmLEdBQTBCRixXQUFXbkIsSUFBckM7QUFDQSx5QkFBS3NCLE1BQUw7QUFDRDs7QUF6Qks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEyQkZDLGNBM0JFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkE0QlUseUJBQVlDLEdBQUdDLGVBQWYsRUFBZ0M7QUFDOUNDLDhCQUFVLENBQUMsSUFBRCxDQURvQztBQUU5Q0MsK0JBQVc7QUFGbUMsbUJBQWhDLENBNUJWOztBQUFBO0FBNEJGVCxxQkE1QkU7O0FBZ0NOLHNCQUFJQSxJQUFJVSxRQUFKLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLHdDQUFRO0FBQ05mLDJCQUFLLGVBREM7QUFFTmIsNEJBQU07QUFDSmMsNkJBQUssS0FBS2pCLFNBQUwsQ0FBZWtCO0FBRGhCO0FBRkEscUJBQVIsRUFLR2MsSUFMSCxDQUtRLGVBQU87QUFDYiw2QkFBS25CLEtBQUwsQ0FBVyxZQUFYLEVBQXlCLE9BQUtaLFVBQTlCO0FBQ0EsNkJBQUt3QixNQUFMO0FBQ0FFLHlCQUFHTSxTQUFILENBQWE7QUFDWEMsK0JBQU8sTUFESTtBQUVYQyw4QkFBTSxTQUZLO0FBR1hDLDhCQUFNO0FBSEssdUJBQWI7QUFLRCxxQkFiRDtBQWNEOztBQS9DSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlERkMsYUFqREU7QUFBQSw4RkFpRE1yQixHQWpETjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0RGc0IsdUJBbERFLEdBa0RNLEtBQUt0QyxTQUFMLENBQWVjLE1BQWYsQ0FBc0J5QixHQUF0QixDQUEwQixpQkFBUztBQUM3QywyQkFBT0MsTUFBTXhCLEdBQWI7QUFDRCxtQkFGVyxDQWxETjtBQUFBO0FBQUEseUJBcURBLDBCQUFnQnNCLEtBQWhCLENBckRBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBdURSRyxTQXZEUSxpQkF1REYsQ0FBRSxDQXZEQTtBQXdEUkMsZUF4RFEsdUJBd0RJLENBQUU7QUF4RE4sSzs7OztFQVQyQixlQUFLQyxTOztrQkFBdkI3QyxTIiwiZmlsZSI6InBob3RvSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luLmpzJztcclxuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcclxuaW1wb3J0IHsgd3hQcm9taXNpZnkgfSBmcm9tICcuLi8uLi91dGlscy9jb21tb24uanMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90b0l0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBwaG90b0l0ZW06IFtdLFxyXG4gICAgcGhvdG9JbmRleDogTnVtYmVyXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgaW1hZ2U6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XVxyXG4gIH07XHJcbiAgd2F0Y2ggPSB7fTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tJbWFnZShlKSB7XHJcbiAgICAgIHZhciBfcGhvdG9JZHggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUN1clBob3RvcycsIHRoaXMucGhvdG9JdGVtLnBob3RvcywgX3Bob3RvSWR4KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNsaWNrWmFuKCkge1xyXG4gICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZCxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gJ2NhbmNlbCcgOiAnemFuJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHZhciB6YW5MaXN0UmVzID0gYXdhaXQgcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbl9saXN0JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKHJlcy5zdWNjICYmIHphbkxpc3RSZXMuc3VjYyAmJiB6YW5MaXN0UmVzLmRhdGEpIHtcclxuICAgICAgICB0aGlzLnBob3RvSXRlbS5pc196YW4gPSAhdGhpcy5waG90b0l0ZW0uaXNfemFuXHJcbiAgICAgICAgdGhpcy5waG90b0l0ZW0uemFuX2xpc3QgPSB6YW5MaXN0UmVzLmRhdGFcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxQaG90bygpIHtcclxuICAgICAgdmFyIHJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnNob3dBY3Rpb25TaGVldCkoe1xyXG4gICAgICAgIGl0ZW1MaXN0OiBbJ+WIoOmZpCddLFxyXG4gICAgICAgIGl0ZW1Db2xvcjogJyNGRjVFNTEnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXMudGFwSW5kZXggPT09IDApIHtcclxuICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRQaG90bycsIHRoaXMucGhvdG9JbmRleClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5oiQ5YqfJyxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xyXG4gICAgICB2YXIgX3VybHMgPSB0aGlzLnBob3RvSXRlbS5waG90b3MubWFwKHBob3RvID0+IHtcclxuICAgICAgICByZXR1cm4gcGhvdG8udXJsXHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IGRvd25JbnRlcm5ldFVybChfdXJscylcclxuICAgIH0sXHJcbiAgICB0YXAoKSB7fSxcclxuICAgIGRvd25JbWFnZSgpIHt9XHJcbiAgfTtcclxufVxyXG4iXX0=