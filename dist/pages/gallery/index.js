'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '群活动相册'
        }, _this.data = {
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
                    url: "/pages/setting/setting"
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
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
                                        group_id: 0
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
                                        group_id: 0,
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

    return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/gallery/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsIm1ldGhvZHMiLCJ0b1NldHRpbmciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsInRoYXQiLCJzZXRUaW1lb3V0IiwiZ3JvdXBfaWQiLCJyZXMiLCJzdWNjIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImdhbGxlcmllcyIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyx1QkFBVyxFQURSO0FBRUhDLHlCQUFhLEVBRlY7QUFHSEMscUJBQVMsS0FITjtBQUlIQyx3QkFBWSxLQUpUO0FBS0hDLGtCQUFNO0FBTEgsUyxRQU9QQyxPLEdBQVU7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLHFCQVRNLHVCQVNNO0FBQ1JDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQUs7QUFESyxpQkFBZDtBQUdIO0FBYkssUzs7Ozs7aUNBZUQ7QUFDTCxpQkFBS0MsUUFBTDtBQUNBLGlCQUFLQyxlQUFMO0FBQ0g7Ozt3Q0FDZTtBQUNaLGdCQUFJLEtBQUtaLElBQUwsQ0FBVUksVUFBZCxFQUEwQjtBQUN0QjtBQUNIO0FBQ0QsZ0JBQUlTLE9BQU8sSUFBWDtBQUNBQyx1QkFBVyxZQUFZO0FBQ25CRCxxQkFBS0QsZUFBTDtBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0g7Ozs7Ozs7Ozs7O3VDQUVtQixvQkFBUTtBQUNwQkYseUNBQUssZ0JBRGU7QUFFcEJWLDBDQUFNO0FBQ0ZlLGtEQUFVO0FBRFI7QUFGYyxpQ0FBUixDOzs7QUFBWkMsbUM7O0FBTUosb0NBQUlBLElBQUlDLElBQUosSUFBWUQsSUFBSWhCLElBQXBCLEVBQTBCO0FBQ3RCLHlDQUFLQyxTQUFMLEdBQWlCZSxJQUFJaEIsSUFBckI7QUFDQSx5Q0FBS2tCLE1BQUw7QUFDQUMsNENBQVFDLEdBQVIsQ0FBWSxLQUFLbkIsU0FBakI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FHRyxLQUFLRCxJQUFMLENBQVVHLE87Ozs7Ozs7O0FBR2QscUNBQUtILElBQUwsQ0FBVUcsT0FBVixHQUFvQixJQUFwQjs7dUNBQ2dCLG9CQUFRO0FBQ3BCTyx5Q0FBSyx1QkFEZTtBQUVwQlYsMENBQU07QUFDRmUsa0RBQVUsQ0FEUjtBQUVGViw4Q0FBTSxLQUFLTCxJQUFMLENBQVVLO0FBRmQ7QUFGYyxpQ0FBUixDOzs7QUFBWlcsbUM7O3NDQU9BQSxJQUFJQyxJQUFKLElBQVlELElBQUloQixJOzs7OztBQUNoQm1CLHdDQUFRQyxHQUFSLENBQVlKLEdBQVo7QUFDQSxxQ0FBS2QsV0FBTCxHQUFtQmMsSUFBSWhCLElBQUosQ0FBU3FCLFNBQTVCO0FBQ0EscUNBQUtyQixJQUFMLENBQVVLLElBQVYsR0FBaUIsS0FBS0wsSUFBTCxDQUFVSyxJQUFWLEdBQWlCLENBQWxDO0FBQ0EscUNBQUthLE1BQUw7O29DQUNLRixJQUFJaEIsSUFBSixDQUFTc0IsUTs7Ozs7QUFDVixxQ0FBS3RCLElBQUwsQ0FBVUksVUFBVixHQUF1QixJQUF2QjtBQUNBLHFDQUFLYyxNQUFMOzs7Ozs7OztBQUlKLHFDQUFLbEIsSUFBTCxDQUFVSSxVQUFWLEdBQXVCLElBQXZCO0FBQ0EscUNBQUtjLE1BQUw7OztBQUVKLHFDQUFLbEIsSUFBTCxDQUFVRyxPQUFWLEdBQW9CLEtBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL0UyQixlQUFLRSxJOztrQkFBbkJSLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBncm91cEluZm86IHt9LFxuICAgICAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBub01vcmVOb3RlOiBmYWxzZSxcbiAgICAgICAgcGFnZTogMCxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy8gY2hhbmdlQmcgKCkge1xuICAgICAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAvLyAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSxcbiAgICAgICAgdG9TZXR0aW5nKCkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9zZXR0aW5nL3NldHRpbmdcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWRJbmZvKClcbiAgICAgICAgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLm5vTW9yZU5vdGUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LmxvYWRHYWxsZXJ5bGlzdCgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cbiAgICBhc3luYyBsb2FkSW5mbygpIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZm8nLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGdyb3VwX2lkOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cEluZm8pXG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgbG9hZEdhbGxlcnlsaXN0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5sb2FkaW5nID0gdHJ1ZVxuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvZ2FsbGVyeWxpc3QnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGdyb3VwX2lkOiAwLFxuICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuZGF0YS5wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmdhbGxlcmllc1xuICAgICAgICAgICAgdGhpcy5kYXRhLnBhZ2UgPSB0aGlzLmRhdGEucGFnZSArIDFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gICAgfVxufSJdfQ==