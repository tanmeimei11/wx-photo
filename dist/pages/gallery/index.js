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
        }, _this.components = {
            joinUs: _joinUs2.default
        }, _this.data = {
            groupID: '',
            title: '',
            groupInfo: {},
            galleryList: [],
            loading: false,
            noMoreNote: false,
            page: 0
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
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(gallery, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.loadInfo();
            this.loadGallerylist();
            this.groupID = options.id;
            this.title = opitons.id;
            this.$apply();
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(gallery , 'pages/gallery/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdhbGxlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImpvaW5VcyIsImRhdGEiLCJncm91cElEIiwidGl0bGUiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvcHRpb25zIiwibG9hZEluZm8iLCJsb2FkR2FsbGVyeWxpc3QiLCJpZCIsIm9waXRvbnMiLCIkYXBwbHkiLCJ0aGF0Iiwic2V0VGltZW91dCIsImdyb3VwX2lkIiwicmVzIiwic3VjYyIsImNvbnNvbGUiLCJsb2ciLCJnYWxsZXJpZXMiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYTtBQUNYQztBQURXLFMsUUFJYkMsSSxHQUFPO0FBQ0hDLHFCQUFTLEVBRE47QUFFSEMsbUJBQU8sRUFGSjtBQUdIQyx1QkFBVyxFQUhSO0FBSUhDLHlCQUFhLEVBSlY7QUFLSEMscUJBQVMsS0FMTjtBQU1IQyx3QkFBWSxLQU5UO0FBT0hDLGtCQUFNO0FBUEgsUyxRQVNQQyxPLEdBQVU7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLHFCQVRNLHVCQVNNO0FBQ1JDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMsd0RBQWtDLEtBQUtYO0FBRDdCLGlCQUFkO0FBR0g7QUFiSyxTOzs7OzsrQkFlSFksTyxFQUFTO0FBQ1osaUJBQUtDLFFBQUw7QUFDQSxpQkFBS0MsZUFBTDtBQUNBLGlCQUFLZCxPQUFMLEdBQWVZLFFBQVFHLEVBQXZCO0FBQ0EsaUJBQUtkLEtBQUwsR0FBYWUsUUFBUUQsRUFBckI7QUFDQSxpQkFBS0UsTUFBTDtBQUNIOzs7d0NBQ2U7QUFDWixnQkFBSSxLQUFLbEIsSUFBTCxDQUFVTSxVQUFkLEVBQTBCO0FBQ3RCO0FBQ0g7QUFDRCxnQkFBSWEsT0FBTyxJQUFYO0FBQ0FDLHVCQUFXLFlBQVk7QUFDbkJELHFCQUFLSixlQUFMO0FBQ0gsYUFGRCxFQUVHLEdBRkg7QUFHSDs7Ozs7Ozs7Ozs7dUNBRW1CLG9CQUFRO0FBQ3BCSCx5Q0FBSyxnQkFEZTtBQUVwQlosMENBQU07QUFDRnFCLGtEQUFVLEtBQUtwQjtBQURiO0FBRmMsaUNBQVIsQzs7O0FBQVpxQixtQzs7QUFNSixvQ0FBSUEsSUFBSUMsSUFBSixJQUFZRCxJQUFJdEIsSUFBcEIsRUFBMEI7QUFDdEIseUNBQUtHLFNBQUwsR0FBaUJtQixJQUFJdEIsSUFBckI7QUFDQSx5Q0FBS2tCLE1BQUw7QUFDQU0sNENBQVFDLEdBQVIsQ0FBWSxLQUFLdEIsU0FBakI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FHRyxLQUFLSCxJQUFMLENBQVVLLE87Ozs7Ozs7O0FBR2QscUNBQUtMLElBQUwsQ0FBVUssT0FBVixHQUFvQixJQUFwQjs7dUNBQ2dCLG9CQUFRO0FBQ3BCTyx5Q0FBSyx1QkFEZTtBQUVwQlosMENBQU07QUFDRnFCLGtEQUFVLEtBQUtwQixPQURiO0FBRUZNLDhDQUFNLEtBQUtQLElBQUwsQ0FBVU87QUFGZDtBQUZjLGlDQUFSLEM7OztBQUFaZSxtQzs7c0NBT0FBLElBQUlDLElBQUosSUFBWUQsSUFBSXRCLEk7Ozs7O0FBQ2hCd0Isd0NBQVFDLEdBQVIsQ0FBWUgsR0FBWjtBQUNBLHFDQUFLbEIsV0FBTCxHQUFtQmtCLElBQUl0QixJQUFKLENBQVMwQixTQUE1QjtBQUNBLHFDQUFLMUIsSUFBTCxDQUFVTyxJQUFWLEdBQWlCLEtBQUtQLElBQUwsQ0FBVU8sSUFBVixHQUFpQixDQUFsQztBQUNBLHFDQUFLVyxNQUFMOztvQ0FDS0ksSUFBSXRCLElBQUosQ0FBUzJCLFE7Ozs7O0FBQ1YscUNBQUszQixJQUFMLENBQVVNLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQ0FBS1ksTUFBTDs7Ozs7Ozs7QUFJSixxQ0FBS2xCLElBQUwsQ0FBVU0sVUFBVixHQUF1QixJQUF2QjtBQUNBLHFDQUFLWSxNQUFMOzs7QUFFSixxQ0FBS2xCLElBQUwsQ0FBVUssT0FBVixHQUFvQixLQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZGNkIsZUFBS0UsSTs7a0JBQXJCWixPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5pbXBvcnQgam9pblVzIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2FsbGVyeS9qb2luVXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbGxlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGpvaW5Vczogam9pblVzXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgZ3JvdXBJRDogJycsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ3JvdXBJbmZvOiB7fSxcbiAgICAgICAgZ2FsbGVyeUxpc3Q6IFtdLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgICAgIHBhZ2U6IDAsXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAgICAgLy8gICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAgICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0sXG4gICAgICAgIHRvU2V0dGluZygpIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9zZXR0aW5nL3NldHRpbmc/aWQ9JHt0aGlzLmdyb3VwSUR9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5sb2FkSW5mbygpXG4gICAgICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgICAgICAgdGhpcy5ncm91cElEID0gb3B0aW9ucy5pZFxuICAgICAgICB0aGlzLnRpdGxlID0gb3BpdG9ucy5pZFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubm9Nb3JlTm90ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQubG9hZEdhbGxlcnlsaXN0KCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRJbmZvKCkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvaW5mbycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBfaWQ6IHRoaXMuZ3JvdXBJRFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBJbmZvKVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvYWRHYWxsZXJ5bGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IHRydWVcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBncm91cF9pZDogdGhpcy5ncm91cElELFxuICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuZGF0YS5wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmdhbGxlcmllc1xuICAgICAgICAgICAgdGhpcy5kYXRhLnBhZ2UgPSB0aGlzLmRhdGEucGFnZSArIDFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gICAgfVxufSJdfQ==