'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var newAlbum = function (_wepy$component) {
  _inherits(newAlbum, _wepy$component);

  function newAlbum() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, newAlbum);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = newAlbum.__proto__ || Object.getPrototypeOf(newAlbum)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupId: String
    }, _this.data = {
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closePrinterPhotoModal');
      },
      goEdit: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _wepy2.default.navigateTo({
                    url: '/pages/setting/setting?id=' + this.groupId
                  });

                case 2:
                  this.$emit('closePrinterPhotoModal');

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function goEdit() {
          return _ref2.apply(this, arguments);
        }

        return goEdit;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return newAlbum;
}(_wepy2.default.component);

exports.default = newAlbum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50ZXJQaG90by5qcyJdLCJuYW1lcyI6WyJuZXdBbGJ1bSIsInByb3BzIiwiZ3JvdXBJZCIsIlN0cmluZyIsImRhdGEiLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsImdvRWRpdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsSyxHQUFRO0FBQ05DLGVBQVNDO0FBREgsSyxRQUdSQyxJLEdBQU87QUFDTEMsVUFBSSxFQURDO0FBRUxDLFlBQU07QUFGRCxLLFFBSVBDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS0MsS0FBTCxDQUFXLHdCQUFYO0FBQ0QsT0FITztBQUlGQyxZQUpFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBS0EsZUFBS0MsVUFBTCxDQUFnQjtBQUNwQkMsd0RBQWtDLEtBQUtWO0FBRG5CLG1CQUFoQixDQUxBOztBQUFBO0FBUU4sdUJBQUtPLEtBQUwsQ0FBVyx3QkFBWDs7QUFSTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7RUFSMEIsZUFBS0ksUzs7a0JBQXRCYixRIiwiZmlsZSI6InByaW50ZXJQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBuZXdBbGJ1bSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZ3JvdXBJZDogU3RyaW5nXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgd3g6ICcnLFxuICAgIGZ1bGw6IGZhbHNlXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjbG9zZVByaW50ZXJQaG90b01vZGFsJylcbiAgICB9LFxuICAgIGFzeW5jIGdvRWRpdCgpIHtcbiAgICAgIGF3YWl0IHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9zZXR0aW5nL3NldHRpbmc/aWQ9JHt0aGlzLmdyb3VwSWR9YFxuICAgICAgfSlcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlUHJpbnRlclBob3RvTW9kYWwnKVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==