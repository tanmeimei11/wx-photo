'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PreviewPhoto.__proto__ || Object.getPrototypeOf(PreviewPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      photos: Array,
      photoIdx: {
        type: Number,
        default: 0,
        twoWay: true
      }
    }, _this.data = {
      photoItemIdx: 0
    }, _this.methods = {
      swiperChange: function swiperChange(e) {
        this.photoItemIdx = e.detail.current;
        this.$apply();
        console.log(this.photoItemIdx);
      },
      downImage: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _api.downInternetUrl)(this.photos[this.photoItemIdx].url);

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function downImage() {
          return _ref2.apply(this, arguments);
        }

        return downImage;
      }(),
      clearSwiper: function clearSwiper() {
        // console.log(this.photos)
        console.log('clearCurPhotos');
        this.$emit('clearCurPhotos');
      }
    }, _this.watch = {
      photoIdx: function photoIdx(newValue, oldValue) {
        console.log(newValue);
        this.photoItemIdx = newValue;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInBob3RvcyIsIkFycmF5IiwicGhvdG9JZHgiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsInR3b1dheSIsImRhdGEiLCJwaG90b0l0ZW1JZHgiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZG93bkltYWdlIiwidXJsIiwiY2xlYXJTd2lwZXIiLCIkZW1pdCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsY0FBUUMsS0FERjtBQUVOQyxnQkFBVTtBQUNSQyxjQUFNQyxNQURFO0FBRVJDLGlCQUFTLENBRkQ7QUFHUkMsZ0JBQVE7QUFIQTtBQUZKLEssUUFRUkMsSSxHQUFPO0FBQ0xDLG9CQUFjO0FBRFQsSyxRQUdQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ0tDLENBREwsRUFDUTtBQUNkLGFBQUtILFlBQUwsR0FBb0JHLEVBQUVDLE1BQUYsQ0FBU0MsT0FBN0I7QUFDQSxhQUFLQyxNQUFMO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS1IsWUFBakI7QUFDRCxPQUxPO0FBTUZTLGVBTkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFPQSwwQkFBZ0IsS0FBS2pCLE1BQUwsQ0FBWSxLQUFLUSxZQUFqQixFQUErQlUsR0FBL0MsQ0FQQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQVNSQyxpQkFUUSx5QkFTTTtBQUNaO0FBQ0FKLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxhQUFLSSxLQUFMLENBQVcsZ0JBQVg7QUFDRDtBQWJPLEssUUFlVkMsSyxHQUFRO0FBQ05uQixjQURNLG9CQUNHb0IsUUFESCxFQUNhQyxRQURiLEVBQ3VCO0FBQzNCUixnQkFBUUMsR0FBUixDQUFZTSxRQUFaO0FBQ0EsYUFBS2QsWUFBTCxHQUFvQmMsUUFBcEI7QUFDQSxhQUFLUixNQUFMO0FBQ0Q7QUFMSyxLOzs7O0VBM0JnQyxlQUFLVSxTOztrQkFBMUIxQixZIiwiZmlsZSI6InByZXZpZXdQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBkb3duSW50ZXJuZXRVcmwgfSBmcm9tICcuLi8uLi91dGlscy9hcGkuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1Bob3RvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBwaG90b3M6IEFycmF5LFxuICAgIHBob3RvSWR4OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfVxuICB9O1xuICBkYXRhID0ge1xuICAgIHBob3RvSXRlbUlkeDogMFxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGhvdG9JdGVtSWR4KVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgfSxcbiAgICBjbGVhclN3aXBlcigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucGhvdG9zKVxuICAgICAgY29uc29sZS5sb2coJ2NsZWFyQ3VyUGhvdG9zJylcbiAgICAgIHRoaXMuJGVtaXQoJ2NsZWFyQ3VyUGhvdG9zJylcbiAgICB9XG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBob3RvSWR4KG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWUpXG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IG5ld1ZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9O1xufVxuIl19