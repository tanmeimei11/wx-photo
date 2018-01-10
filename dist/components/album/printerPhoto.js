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

var PrinterPhoto = function (_wepy$component) {
  _inherits(PrinterPhoto, _wepy$component);

  function PrinterPhoto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PrinterPhoto);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PrinterPhoto.__proto__ || Object.getPrototypeOf(PrinterPhoto)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
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
        this.$emit('clearCurPhotos');
      }
    }, _this.watch = {
      photoIdx: function photoIdx(newValue, oldValue) {
        this.photoItemIdx = newValue;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PrinterPhoto;
}(_wepy2.default.component);

exports.default = PrinterPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50ZXJQaG90by5qcyJdLCJuYW1lcyI6WyJQcmludGVyUGhvdG8iLCJwcm9wcyIsInBob3RvcyIsIkFycmF5IiwicGhvdG9JZHgiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsInR3b1dheSIsImRhdGEiLCJwaG90b0l0ZW1JZHgiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCIkYXBwbHkiLCJkb3duSW1hZ2UiLCJ1cmwiLCJjbGVhclN3aXBlciIsIiRlbWl0Iiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxjQUFRQyxLQURGO0FBRU5DLGdCQUFVO0FBQ1JDLGNBQU1DLE1BREU7QUFFUkMsaUJBQVMsQ0FGRDtBQUdSQyxnQkFBUTtBQUhBO0FBRkosSyxRQVFSQyxJLEdBQU87QUFDTEMsb0JBQWM7QUFEVCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxFQUNRO0FBQ2QsYUFBS0gsWUFBTCxHQUFvQkcsRUFBRUMsTUFBRixDQUFTQyxPQUE3QjtBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS0ZDLGVBTEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFNQSwwQkFBZ0IsS0FBS2YsTUFBTCxDQUFZLEtBQUtRLFlBQWpCLEVBQStCUSxHQUEvQyxDQU5BOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBUVJDLGlCQVJRLHlCQVFNO0FBQ1osYUFBS0MsS0FBTCxDQUFXLGdCQUFYO0FBQ0Q7QUFWTyxLLFFBWVZDLEssR0FBUTtBQUNOakIsY0FETSxvQkFDR2tCLFFBREgsRUFDYUMsUUFEYixFQUN1QjtBQUMzQixhQUFLYixZQUFMLEdBQW9CWSxRQUFwQjtBQUNBLGFBQUtOLE1BQUw7QUFDRDtBQUpLLEs7Ozs7RUF4QmdDLGVBQUtRLFM7O2tCQUExQnhCLFkiLCJmaWxlIjoicHJpbnRlclBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IGRvd25JbnRlcm5ldFVybCB9IGZyb20gJy4uLy4uL3V0aWxzL2FwaS5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmludGVyUGhvdG8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHBob3RvczogQXJyYXksXG4gICAgcGhvdG9JZHg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9XG4gIH07XG4gIGRhdGEgPSB7XG4gICAgcGhvdG9JdGVtSWR4OiAwXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgYXdhaXQgZG93bkludGVybmV0VXJsKHRoaXMucGhvdG9zW3RoaXMucGhvdG9JdGVtSWR4XS51cmwpXG4gICAgfSxcbiAgICBjbGVhclN3aXBlcigpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsZWFyQ3VyUGhvdG9zJylcbiAgICB9XG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBob3RvSWR4KG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgdGhpcy5waG90b0l0ZW1JZHggPSBuZXdWYWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==