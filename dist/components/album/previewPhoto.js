'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../utils/api.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

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
      photos: {
        type: Array,
        default: [],
        twoWay: true
      },
      photoIdx: {
        type: Number,
        default: 0,
        twoWay: true
      }
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
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
                  this.loadingIn('正在下载');
                  _context.prev = 1;
                  _context.next = 4;
                  return (0, _api.downInternetUrl)(this.photos[this.photoItemIdx].url);

                case 4:
                  this.loadingOut();
                  this.toastSucc('下载成功');
                  _context.next = 12;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](1);

                  this.loadingOut();
                  this.toastFail('下载失败');

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function downImage() {
          return _ref2.apply(this, arguments);
        }

        return downImage;
      }(),
      clearSwiper: function clearSwiper() {
        this.photoItemIdx = 0;
        this.$emit('clearCurPhotos');
      }
    }, _this.watch = {
      photoIdx: function photoIdx(newValue, oldValue) {
        console.log('change photoIdx');
        console.log(newValue);
        this.photoItemIdx = newValue;
        this.$apply();
      },
      photos: function photos(newValue) {
        console.log('change value');
        console.log(newValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PreviewPhoto;
}(_wepy2.default.component);

exports.default = PreviewPhoto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdQaG90by5qcyJdLCJuYW1lcyI6WyJQcmV2aWV3UGhvdG8iLCJwcm9wcyIsInBob3RvcyIsInR5cGUiLCJBcnJheSIsImRlZmF1bHQiLCJ0d29XYXkiLCJwaG90b0lkeCIsIk51bWJlciIsIm1peGlucyIsImRhdGEiLCJwaG90b0l0ZW1JZHgiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCIkYXBwbHkiLCJkb3duSW1hZ2UiLCJsb2FkaW5nSW4iLCJ1cmwiLCJsb2FkaW5nT3V0IiwidG9hc3RTdWNjIiwidG9hc3RGYWlsIiwiY2xlYXJTd2lwZXIiLCIkZW1pdCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsY0FBUTtBQUNOQyxjQUFNQyxLQURBO0FBRU5DLGlCQUFTLEVBRkg7QUFHTkMsZ0JBQVE7QUFIRixPQURGO0FBTU5DLGdCQUFVO0FBQ1JKLGNBQU1LLE1BREU7QUFFUkgsaUJBQVMsQ0FGRDtBQUdSQyxnQkFBUTtBQUhBO0FBTkosSyxRQVlSRyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLG9CQUFjO0FBRFQsSyxRQUdQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ0tDLENBREwsRUFDUTtBQUNkLGFBQUtILFlBQUwsR0FBb0JHLEVBQUVDLE1BQUYsQ0FBU0MsT0FBN0I7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtGQyxlQUxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1OLHVCQUFLQyxTQUFMLENBQWUsTUFBZjtBQU5NO0FBQUE7QUFBQSx5QkFRRSwwQkFBZ0IsS0FBS2pCLE1BQUwsQ0FBWSxLQUFLUyxZQUFqQixFQUErQlMsR0FBL0MsQ0FSRjs7QUFBQTtBQVNKLHVCQUFLQyxVQUFMO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZSxNQUFmO0FBVkk7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBWUosdUJBQUtELFVBQUw7QUFDQSx1QkFBS0UsU0FBTCxDQUFlLE1BQWY7O0FBYkk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFnQlJDLGlCQWhCUSx5QkFnQk07QUFDWixhQUFLYixZQUFMLEdBQW9CLENBQXBCO0FBQ0EsYUFBS2MsS0FBTCxDQUFXLGdCQUFYO0FBQ0Q7QUFuQk8sSyxRQXFCVkMsSyxHQUFRO0FBQ05uQixjQURNLG9CQUNHb0IsUUFESCxFQUNhQyxRQURiLEVBQ3VCO0FBQzNCQyxnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0FELGdCQUFRQyxHQUFSLENBQVlILFFBQVo7QUFDQSxhQUFLaEIsWUFBTCxHQUFvQmdCLFFBQXBCO0FBQ0EsYUFBS1YsTUFBTDtBQUNELE9BTks7QUFPTmYsWUFQTSxrQkFPQ3lCLFFBUEQsRUFPVztBQUNmRSxnQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQUQsZ0JBQVFDLEdBQVIsQ0FBWUgsUUFBWjtBQUNEO0FBVkssSzs7OztFQXRDZ0MsZUFBS0ksUzs7a0JBQTFCL0IsWSIsImZpbGUiOiJwcmV2aWV3UGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgZG93bkludGVybmV0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBpLmpzJztcbmltcG9ydCBMb2FkaW5nTWl4aW4gZnJvbSAnQC9taXhpbnMvbG9hZGluZ01peGluJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXdQaG90byBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGhvdG9zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBwaG90b0lkeDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMCxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH1cbiAgfTtcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgcGhvdG9JdGVtSWR4OiAwXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYXN5bmMgZG93bkltYWdlKCkge1xuICAgICAgdGhpcy5sb2FkaW5nSW4oJ+ato+WcqOS4i+i9vScpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb3duSW50ZXJuZXRVcmwodGhpcy5waG90b3NbdGhpcy5waG90b0l0ZW1JZHhdLnVybClcbiAgICAgICAgdGhpcy5sb2FkaW5nT3V0KClcbiAgICAgICAgdGhpcy50b2FzdFN1Y2MoJ+S4i+i9veaIkOWKnycpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ091dCgpXG4gICAgICAgIHRoaXMudG9hc3RGYWlsKCfkuIvovb3lpLHotKUnKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJTd2lwZXIoKSB7XG4gICAgICB0aGlzLnBob3RvSXRlbUlkeCA9IDBcbiAgICAgIHRoaXMuJGVtaXQoJ2NsZWFyQ3VyUGhvdG9zJylcbiAgICB9XG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBob3RvSWR4KG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBwaG90b0lkeCcpXG4gICAgICBjb25zb2xlLmxvZyhuZXdWYWx1ZSlcbiAgICAgIHRoaXMucGhvdG9JdGVtSWR4ID0gbmV3VmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHBob3RvcyhuZXdWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSB2YWx1ZScpXG4gICAgICBjb25zb2xlLmxvZyhuZXdWYWx1ZSlcbiAgICB9XG4gIH07XG59XG4iXX0=