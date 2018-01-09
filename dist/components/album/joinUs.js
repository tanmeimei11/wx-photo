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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJQaG90b0l0ZW0iLCJwcm9wcyIsInBob3RvSXRlbSIsInBob3RvSW5kZXgiLCJOdW1iZXIiLCJkYXRhIiwiaW1hZ2UiLCJ3YXRjaCIsIm1ldGhvZHMiLCJjbGlja0ltYWdlIiwiZSIsIl9waG90b0lkeCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsIiRlbWl0IiwicGhvdG9zIiwiY2xpY2taYW4iLCJ1cmwiLCJwaWQiLCJwaG90b19pZCIsImFjdGlvbiIsImlzX3phbiIsInJlcyIsInphbkxpc3RSZXMiLCJzdWNjIiwiemFuX2xpc3QiLCIkYXBwbHkiLCJkZWxQaG90byIsInd4Iiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJpdGVtQ29sb3IiLCJ0YXBJbmRleCIsInRoZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwiZG93blVybCIsIl91cmxzIiwibWFwIiwicGhvdG8iLCJ0YXAiLCJkb3duSW1hZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsa0JBQVlDO0FBRk4sSyxRQUlSQyxJLEdBQU87QUFDTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CO0FBREYsSyxRQUdQQyxLLEdBQVEsRSxRQUNSQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLFlBQVlELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakM7QUFDQSxhQUFLQyxLQUFMLENBQVcsaUJBQVgsRUFBOEIsS0FBS2IsU0FBTCxDQUFlYyxNQUE3QyxFQUFxREwsU0FBckQ7QUFDRCxPQUpPO0FBS0ZNLGNBTEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQU1VLG9CQUFRO0FBQ3RCQyx5QkFBSyxlQURpQjtBQUV0QmIsMEJBQU07QUFDSmMsMkJBQUssS0FBS2pCLFNBQUwsQ0FBZWtCLFFBRGhCO0FBRUpDLDhCQUFRLEtBQUtuQixTQUFMLENBQWVvQixNQUFmLEdBQXdCLFFBQXhCLEdBQW1DO0FBRnZDO0FBRmdCLG1CQUFSLENBTlY7O0FBQUE7QUFNRkMscUJBTkU7QUFBQTtBQUFBLHlCQWNpQixvQkFBUTtBQUM3QkwseUJBQUssb0JBRHdCO0FBRTdCYiwwQkFBTTtBQUNKYywyQkFBSyxLQUFLakIsU0FBTCxDQUFla0I7QUFEaEI7QUFGdUIsbUJBQVIsQ0FkakI7O0FBQUE7QUFjRkksNEJBZEU7OztBQXFCTixzQkFBSUQsSUFBSUUsSUFBSixJQUFZRCxXQUFXQyxJQUF2QixJQUErQkQsV0FBV25CLElBQTlDLEVBQW9EO0FBQ2xELHlCQUFLSCxTQUFMLENBQWVvQixNQUFmLEdBQXdCLENBQUMsS0FBS3BCLFNBQUwsQ0FBZW9CLE1BQXhDO0FBQ0EseUJBQUtwQixTQUFMLENBQWV3QixRQUFmLEdBQTBCRixXQUFXbkIsSUFBckM7QUFDQSx5QkFBS3NCLE1BQUw7QUFDRDs7QUF6Qks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEyQkZDLGNBM0JFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkE0QlUseUJBQVlDLEdBQUdDLGVBQWYsRUFBZ0M7QUFDOUNDLDhCQUFVLENBQUMsSUFBRCxDQURvQztBQUU5Q0MsK0JBQVc7QUFGbUMsbUJBQWhDLENBNUJWOztBQUFBO0FBNEJGVCxxQkE1QkU7O0FBZ0NOLHNCQUFJQSxJQUFJVSxRQUFKLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLHdDQUFRO0FBQ05mLDJCQUFLLGVBREM7QUFFTmIsNEJBQU07QUFDSmMsNkJBQUssS0FBS2pCLFNBQUwsQ0FBZWtCO0FBRGhCO0FBRkEscUJBQVIsRUFLR2MsSUFMSCxDQUtRLGVBQU87QUFDYiw2QkFBS25CLEtBQUwsQ0FBVyxZQUFYLEVBQXlCLE9BQUtaLFVBQTlCO0FBQ0EsNkJBQUt3QixNQUFMO0FBQ0FFLHlCQUFHTSxTQUFILENBQWE7QUFDWEMsK0JBQU8sTUFESTtBQUVYQyw4QkFBTSxTQUZLO0FBR1hDLDhCQUFNO0FBSEssdUJBQWI7QUFLRCxxQkFiRDtBQWNEOztBQS9DSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlERkMsYUFqREU7QUFBQSw4RkFpRE1yQixHQWpETjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0RGc0IsdUJBbERFLEdBa0RNLEtBQUt0QyxTQUFMLENBQWVjLE1BQWYsQ0FBc0J5QixHQUF0QixDQUEwQixpQkFBUztBQUM3QywyQkFBT0MsTUFBTXhCLEdBQWI7QUFDRCxtQkFGVyxDQWxETjtBQUFBO0FBQUEseUJBcURBLDBCQUFnQnNCLEtBQWhCLENBckRBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBdURSRyxTQXZEUSxpQkF1REYsQ0FBRSxDQXZEQTtBQXdEUkMsZUF4RFEsdUJBd0RJLENBQUU7QUF4RE4sSzs7OztFQVQyQixlQUFLQyxTOztrQkFBdkI3QyxTIiwiZmlsZSI6ImpvaW5Vcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4uanMnO1xuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCB7IHd4UHJvbWlzaWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGhvdG9JdGVtOiBbXSxcbiAgICBwaG90b0luZGV4OiBOdW1iZXJcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZTogWzEsIDIsIDMsIDQsIDUsIDYsIDddXG4gIH07XG4gIHdhdGNoID0ge307XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xpY2tJbWFnZShlKSB7XG4gICAgICB2YXIgX3Bob3RvSWR4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlQ3VyUGhvdG9zJywgdGhpcy5waG90b0l0ZW0ucGhvdG9zLCBfcGhvdG9JZHgpXG4gICAgfSxcbiAgICBhc3luYyBjbGlja1phbigpIHtcbiAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnL2dnL3Bob3RvL3phbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBwaWQ6IHRoaXMucGhvdG9JdGVtLnBob3RvX2lkLFxuICAgICAgICAgIGFjdGlvbjogdGhpcy5waG90b0l0ZW0uaXNfemFuID8gJ2NhbmNlbCcgOiAnemFuJ1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB2YXIgemFuTGlzdFJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvZ2cvcGhvdG8vemFuX2xpc3QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcGlkOiB0aGlzLnBob3RvSXRlbS5waG90b19pZFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAocmVzLnN1Y2MgJiYgemFuTGlzdFJlcy5zdWNjICYmIHphbkxpc3RSZXMuZGF0YSkge1xuICAgICAgICB0aGlzLnBob3RvSXRlbS5pc196YW4gPSAhdGhpcy5waG90b0l0ZW0uaXNfemFuXG4gICAgICAgIHRoaXMucGhvdG9JdGVtLnphbl9saXN0ID0gemFuTGlzdFJlcy5kYXRhXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGRlbFBob3RvKCkge1xuICAgICAgdmFyIHJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnNob3dBY3Rpb25TaGVldCkoe1xuICAgICAgICBpdGVtTGlzdDogWyfliKDpmaQnXSxcbiAgICAgICAgaXRlbUNvbG9yOiAnI0ZGNUU1MSdcbiAgICAgIH0pXG4gICAgICBpZiAocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgIHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJy9nZy9waG90by9kZWwnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBpZDogdGhpcy5waG90b0l0ZW0ucGhvdG9faWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldFBob3RvJywgdGhpcy5waG90b0luZGV4KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLFxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBkb3duVXJsKHVybCkge1xuICAgICAgdmFyIF91cmxzID0gdGhpcy5waG90b0l0ZW0ucGhvdG9zLm1hcChwaG90byA9PiB7XG4gICAgICAgIHJldHVybiBwaG90by51cmxcbiAgICAgIH0pXG4gICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwoX3VybHMpXG4gICAgfSxcbiAgICB0YXAoKSB7fSxcbiAgICBkb3duSW1hZ2UoKSB7fVxuICB9O1xufVxuIl19