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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsIm1ldGhvZHMiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsInRoYXQiLCJzZXRUaW1lb3V0IiwidXJsIiwiZ3JvdXBfaWQiLCJyZXMiLCJzdWNjIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsImdhbGxlcmllcyIsImhhc19uZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyx1QkFBVyxFQURSO0FBRUhDLHlCQUFhLEVBRlY7QUFHSEMscUJBQVMsS0FITjtBQUlIQyx3QkFBWSxLQUpUO0FBS0hDLGtCQUFNO0FBTEgsUyxRQU9QQyxPLEdBQVU7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUk0sUzs7Ozs7aUNBVUQ7QUFDTCxpQkFBS0MsUUFBTDtBQUNBLGlCQUFLQyxlQUFMO0FBQ0g7Ozt3Q0FDZTtBQUNaLGdCQUFJLEtBQUtSLElBQUwsQ0FBVUksVUFBZCxFQUEwQjtBQUN0QjtBQUNIO0FBQ0QsZ0JBQUlLLE9BQU8sSUFBWDtBQUNBQyx1QkFBVyxZQUFZO0FBQ25CRCxxQkFBS0QsZUFBTDtBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0g7Ozs7Ozs7Ozs7O3VDQUVtQixvQkFBUTtBQUNwQkcseUNBQUssZ0JBRGU7QUFFcEJYLDBDQUFNO0FBQ0ZZLGtEQUFVO0FBRFI7QUFGYyxpQ0FBUixDOzs7QUFBWkMsbUM7O0FBTUosb0NBQUdBLElBQUlDLElBQUosSUFBWUQsSUFBSWIsSUFBbkIsRUFBeUI7QUFDckIseUNBQUtDLFNBQUwsR0FBaUJZLElBQUliLElBQXJCO0FBQ0EseUNBQUtlLE1BQUw7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FHRyxLQUFLZixJQUFMLENBQVVHLE87Ozs7Ozs7O0FBR2QscUNBQUtILElBQUwsQ0FBVUcsT0FBVixHQUFvQixJQUFwQjs7dUNBQ2dCLG9CQUFRO0FBQ3BCUSx5Q0FBSyx1QkFEZTtBQUVwQlgsMENBQU07QUFDRlksa0RBQVUsQ0FEUjtBQUVGUCw4Q0FBTSxLQUFLTCxJQUFMLENBQVVLO0FBRmQ7QUFGYyxpQ0FBUixDOzs7QUFBWlEsbUM7O3NDQU9BQSxJQUFJQyxJQUFKLElBQVlELElBQUliLEk7Ozs7O0FBQ2hCZ0Isd0NBQVFDLEdBQVIsQ0FBWUosR0FBWjtBQUNBLHFDQUFLWCxXQUFMLEdBQW1CVyxJQUFJYixJQUFKLENBQVNrQixTQUE1QjtBQUNBLHFDQUFLbEIsSUFBTCxDQUFVSyxJQUFWLEdBQWlCLEtBQUtMLElBQUwsQ0FBVUssSUFBVixHQUFpQixDQUFsQztBQUNBLHFDQUFLVSxNQUFMOztvQ0FDS0YsSUFBSWIsSUFBSixDQUFTbUIsUTs7Ozs7QUFDVixxQ0FBS25CLElBQUwsQ0FBVUksVUFBVixHQUF1QixJQUF2QjtBQUNBLHFDQUFLVyxNQUFMOzs7Ozs7OztBQUlKLHFDQUFLZixJQUFMLENBQVVJLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSxxQ0FBS1csTUFBTDs7O0FBRUoscUNBQUtmLElBQUwsQ0FBVUcsT0FBVixHQUFvQixLQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXpFMkIsZUFBS0UsSTs7a0JBQW5CUixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvqTmtLvliqjnm7jlhownXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgZ3JvdXBJbmZvOiB7fSxcbiAgICAgICAgZ2FsbGVyeUxpc3Q6IFtdLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgbm9Nb3JlTm90ZTogZmFsc2UsXG4gICAgICAgIHBhZ2U6IDAsXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIC8vIGNoYW5nZUJnICgpIHtcbiAgICAgICAgLy8gICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgLy8gICAgICAgICBjb3VudDogMSxcbiAgICAgICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0sXG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkSW5mbygpXG4gICAgICAgIHRoaXMubG9hZEdhbGxlcnlsaXN0KClcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5ub01vcmVOb3RlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC5sb2FkR2FsbGVyeWxpc3QoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZEluZm8oKSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBncm91cF9pZDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZihyZXMuc3VjYyAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvYWRHYWxsZXJ5bGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IHRydWVcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2dhbGxlcnlsaXN0JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBncm91cF9pZDogMCxcbiAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLmRhdGEucGFnZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUxpc3QgPSByZXMuZGF0YS5nYWxsZXJpZXNcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wYWdlID0gdGhpcy5kYXRhLnBhZ2UgKyAxXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBpZiAoIXJlcy5kYXRhLmhhc19uZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLmxvYWRpbmcgPSBmYWxzZVxuICAgIH1cbn0iXX0=