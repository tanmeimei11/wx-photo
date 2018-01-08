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
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                (0, _login.request)({
                                    url: '/gg/group/info',
                                    data: {
                                        group_id: 0
                                    }
                                }).then(function (res) {
                                    _this2.groupInfo = res.data;
                                    _this2.$apply();
                                });

                            case 1:
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
                var _this3 = this;

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
                                (0, _login.request)({
                                    url: '/gg/group/gallerylist',
                                    data: {
                                        group_id: 0,
                                        page: this.data.page
                                    }
                                }).then(function (res) {
                                    if (res.succ && res.data) {
                                        console.log(res);
                                        _this3.galleryList = res.data.galleries;
                                        _this3.data.page = _this3.data.page + 1;
                                        _this3.$apply();
                                        if (!res.data.has_next) {
                                            _this3.data.noMoreNote = true;
                                            _this3.$apply();
                                            return;
                                        }
                                    } else {
                                        _this3.data.noMoreNote = true;
                                        _this3.$apply();
                                    }
                                    _this3.data.loading = false;
                                });

                            case 4:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJncm91cEluZm8iLCJnYWxsZXJ5TGlzdCIsImxvYWRpbmciLCJub01vcmVOb3RlIiwicGFnZSIsIm1ldGhvZHMiLCJsb2FkSW5mbyIsImxvYWRHYWxsZXJ5bGlzdCIsInRoYXQiLCJzZXRUaW1lb3V0IiwidXJsIiwiZ3JvdXBfaWQiLCJ0aGVuIiwicmVzIiwiJGFwcGx5Iiwic3VjYyIsImNvbnNvbGUiLCJsb2ciLCJnYWxsZXJpZXMiLCJoYXNfbmV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNQQyxvQ0FBd0I7QUFEakIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsRUFEUjtBQUVIQyx5QkFBYSxFQUZWO0FBR0hDLHFCQUFTLEtBSE47QUFJSEMsd0JBQVksS0FKVDtBQUtIQyxrQkFBTTtBQUxILFMsUUFPUEMsTyxHQUFVO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJNLFM7Ozs7O2lDQVVEO0FBQ0wsaUJBQUtDLFFBQUw7QUFDQSxpQkFBS0MsZUFBTDtBQUNIOzs7d0NBQ2dCO0FBQ2YsZ0JBQUksS0FBS1IsSUFBTCxDQUFVSSxVQUFkLEVBQTBCO0FBQ3hCO0FBQ0Q7QUFDRCxnQkFBSUssT0FBTyxJQUFYO0FBQ0FDLHVCQUFXLFlBQVk7QUFDckJELHFCQUFLRCxlQUFMO0FBQ0QsYUFGRCxFQUVHLEdBRkg7QUFHRDs7Ozs7Ozs7Ozs7QUFFRyxvREFBUTtBQUNKRyx5Q0FBSyxnQkFERDtBQUVKWCwwQ0FBTTtBQUNGWSxrREFBVTtBQURSO0FBRkYsaUNBQVIsRUFLR0MsSUFMSCxDQUtRLFVBQUNDLEdBQUQsRUFBUTtBQUNaLDJDQUFLYixTQUFMLEdBQWlCYSxJQUFJZCxJQUFyQjtBQUNBLDJDQUFLZSxNQUFMO0FBQ0gsaUNBUkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQVdJLEtBQUtmLElBQUwsQ0FBVUcsTzs7Ozs7Ozs7QUFHZCxxQ0FBS0gsSUFBTCxDQUFVRyxPQUFWLEdBQW9CLElBQXBCO0FBQ0Esb0RBQVE7QUFDSlEseUNBQUssdUJBREQ7QUFFSlgsMENBQU07QUFDRlksa0RBQVUsQ0FEUjtBQUVGUCw4Q0FBTSxLQUFLTCxJQUFMLENBQVVLO0FBRmQ7QUFGRixpQ0FBUixFQU1HUSxJQU5ILENBTVEsVUFBQ0MsR0FBRCxFQUFRO0FBQ1osd0NBQUlBLElBQUlFLElBQUosSUFBWUYsSUFBSWQsSUFBcEIsRUFBMEI7QUFDdEJpQixnREFBUUMsR0FBUixDQUFZSixHQUFaO0FBQ0EsK0NBQUtaLFdBQUwsR0FBbUJZLElBQUlkLElBQUosQ0FBU21CLFNBQTVCO0FBQ0EsK0NBQUtuQixJQUFMLENBQVVLLElBQVYsR0FBaUIsT0FBS0wsSUFBTCxDQUFVSyxJQUFWLEdBQWlCLENBQWxDO0FBQ0EsK0NBQUtVLE1BQUw7QUFDQSw0Q0FBSSxDQUFDRCxJQUFJZCxJQUFKLENBQVNvQixRQUFkLEVBQXdCO0FBQ3BCLG1EQUFLcEIsSUFBTCxDQUFVSSxVQUFWLEdBQXVCLElBQXZCO0FBQ0EsbURBQUtXLE1BQUw7QUFDQTtBQUNIO0FBQ0oscUNBVkQsTUFVTztBQUNILCtDQUFLZixJQUFMLENBQVVJLFVBQVYsR0FBdUIsSUFBdkI7QUFDQSwrQ0FBS1csTUFBTDtBQUNIO0FBQ0QsMkNBQUtmLElBQUwsQ0FBVUcsT0FBVixHQUFvQixLQUFwQjtBQUNILGlDQXRCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW5EMkIsZUFBS0UsSTs7a0JBQW5CUixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQge3JlcXVlc3R9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e+pOa0u+WKqOebuOWGjCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBncm91cEluZm86IHt9LFxuICAgICAgICBnYWxsZXJ5TGlzdDogW10sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBub01vcmVOb3RlOiBmYWxzZSxcbiAgICAgICAgcGFnZTogMCxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy8gY2hhbmdlQmcgKCkge1xuICAgICAgICAvLyAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAvLyAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSxcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWRJbmZvKClcbiAgICAgICAgdGhpcy5sb2FkR2FsbGVyeWxpc3QoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEubm9Nb3JlTm90ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LmxvYWRHYWxsZXJ5bGlzdCgpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZEluZm8gKCkge1xuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJy9nZy9ncm91cC9pbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBncm91cF9pZDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXMpID0+e1xuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSByZXMuZGF0YVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBhc3luYyBsb2FkR2FsbGVyeWxpc3QgKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IHRydWVcbiAgICAgICAgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICcvZ2cvZ3JvdXAvZ2FsbGVyeWxpc3QnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGdyb3VwX2lkOiAwLFxuICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuZGF0YS5wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT57XG4gICAgICAgICAgICBpZiAocmVzLnN1Y2MgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgdGhpcy5nYWxsZXJ5TGlzdCA9IHJlcy5kYXRhLmdhbGxlcmllc1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wYWdlID0gdGhpcy5kYXRhLnBhZ2UgKyAxXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIGlmICghcmVzLmRhdGEuaGFzX25leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLm5vTW9yZU5vdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubm9Nb3JlTm90ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGEubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==