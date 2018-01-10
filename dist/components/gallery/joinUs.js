'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

var _loadingMixin = require('./../../mixins/loadingMixin.js');

var _loadingMixin2 = _interopRequireDefault(_loadingMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinUs = function (_wepy$component) {
  _inherits(joinUs, _wepy$component);

  function joinUs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, joinUs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = joinUs.__proto__ || Object.getPrototypeOf(joinUs)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      groupID: String
    }, _this.mixins = [_loadingMixin2.default], _this.data = {
      intro: '',
      wx: '',
      full: false
    }, _this.methods = {
      close: function close() {
        this.$emit('closeApply');
      },
      typeintro: function typeintro(e) {
        this.intro = e.detail.value;
        this.checkBtn();
      },
      typewx: function typewx(e) {
        this.wx = e.detail.value;
        this.checkBtn();
      },
      submit: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.full) {
                    _context.next = 6;
                    break;
                  }

                  console.log(this.intro, this.wx);
                  _context.next = 4;
                  return (0, _login.request)({
                    url: '/gg/group/apply2join',
                    method: 'POST',
                    header: {
                      'content-type': 'application/json;charset=UTF-8'
                    },
                    data: {
                      groupId: this.groupID,
                      bio: this.intro,
                      wxId: this.wx
                    }
                  });

                case 4:
                  res = _context.sent;


                  if (res.succ) {
                    this.$apply();
                    this.toastSucc('申请成功！');
                    this.$emit('closeApply');
                  } else if (res.code === '-1') {
                    this.toastFail(res.msg);
                  }

                case 6:

                  if (res.succ) {
                    this.groupInfo = res.data;
                    this.$apply();
                    console.log(this.groupInfo);
                  } else if (res.msg === '已经再群内') {}

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function submit() {
          return _ref2.apply(this, arguments);
        }

        return submit;
      }()
    }, _this.watch = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinUs, [{
    key: 'checkBtn',
    value: function checkBtn() {
      if (this.intro && this.wx) {
        this.full = true;
      } else {
        this.full = false;
      }
    }
  }]);

  return joinUs;
}(_wepy2.default.component);

exports.default = joinUs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5Vcy5qcyJdLCJuYW1lcyI6WyJqb2luVXMiLCJwcm9wcyIsImdyb3VwSUQiLCJTdHJpbmciLCJtaXhpbnMiLCJkYXRhIiwiaW50cm8iLCJ3eCIsImZ1bGwiLCJtZXRob2RzIiwiY2xvc2UiLCIkZW1pdCIsInR5cGVpbnRybyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNoZWNrQnRuIiwidHlwZXd4Iiwic3VibWl0IiwiY29uc29sZSIsImxvZyIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImdyb3VwSWQiLCJiaW8iLCJ3eElkIiwicmVzIiwic3VjYyIsIiRhcHBseSIsInRvYXN0U3VjYyIsImNvZGUiLCJ0b2FzdEZhaWwiLCJtc2ciLCJncm91cEluZm8iLCJ3YXRjaCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSyxHQUFRO0FBQ05DLGVBQVNDO0FBREgsSyxRQUdSQyxNLEdBQVMsd0IsUUFDVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxVQUFJLEVBRkM7QUFHTEMsWUFBTTtBQUhELEssUUFLUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLQyxLQUFMLENBQVcsWUFBWDtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJRUMsQ0FKRixFQUlLO0FBQ1gsYUFBS1AsS0FBTCxHQUFhTyxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0EsYUFBS0MsUUFBTDtBQUNELE9BUE87QUFRUkMsWUFSUSxrQkFRREosQ0FSQyxFQVFFO0FBQ1IsYUFBS04sRUFBTCxHQUFVTSxFQUFFQyxNQUFGLENBQVNDLEtBQW5CO0FBQ0EsYUFBS0MsUUFBTDtBQUNELE9BWE87QUFZRkUsWUFaRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQWFGLEtBQUtWLElBYkg7QUFBQTtBQUFBO0FBQUE7O0FBY0pXLDBCQUFRQyxHQUFSLENBQVksS0FBS2QsS0FBakIsRUFBd0IsS0FBS0MsRUFBN0I7QUFkSTtBQUFBLHlCQWVZLG9CQUFRO0FBQ3RCYyx5QkFBSyxzQkFEaUI7QUFFdEJDLDRCQUFRLE1BRmM7QUFHdEJDLDRCQUFRO0FBQ04sc0NBQWdCO0FBRFYscUJBSGM7QUFNdEJsQiwwQkFBTTtBQUNKbUIsK0JBQVMsS0FBS3RCLE9BRFY7QUFFSnVCLDJCQUFLLEtBQUtuQixLQUZOO0FBR0pvQiw0QkFBTSxLQUFLbkI7QUFIUDtBQU5nQixtQkFBUixDQWZaOztBQUFBO0FBZUFvQixxQkFmQTs7O0FBNEJKLHNCQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWix5QkFBS0MsTUFBTDtBQUNBLHlCQUFLQyxTQUFMLENBQWUsT0FBZjtBQUNBLHlCQUFLbkIsS0FBTCxDQUFXLFlBQVg7QUFDRCxtQkFKRCxNQUlPLElBQUlnQixJQUFJSSxJQUFKLEtBQWEsSUFBakIsRUFBdUI7QUFDNUIseUJBQUtDLFNBQUwsQ0FBZUwsSUFBSU0sR0FBbkI7QUFDRDs7QUFsQ0c7O0FBcUNOLHNCQUFJTixJQUFJQyxJQUFSLEVBQWM7QUFDWix5QkFBS00sU0FBTCxHQUFpQlAsSUFBSXRCLElBQXJCO0FBQ0EseUJBQUt3QixNQUFMO0FBQ0FWLDRCQUFRQyxHQUFSLENBQVksS0FBS2MsU0FBakI7QUFDRCxtQkFKRCxNQUlPLElBQUlQLElBQUlNLEdBQUosS0FBWSxPQUFoQixFQUF5QixDQUMvQjs7QUExQ0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLLFFBb0RWRSxLLEdBQVEsRTs7Ozs7K0JBUEc7QUFDVCxVQUFJLEtBQUs3QixLQUFMLElBQWMsS0FBS0MsRUFBdkIsRUFBMkI7QUFDekIsYUFBS0MsSUFBTCxHQUFZLElBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxJQUFMLEdBQVksS0FBWjtBQUNEO0FBQ0Y7Ozs7RUE3RGlDLGVBQUs0QixTOztrQkFBcEJwQyxNIiwiZmlsZSI6ImpvaW5Vcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nO1xuaW1wb3J0IExvYWRpbmdNaXhpbiBmcm9tICdAL21peGlucy9sb2FkaW5nTWl4aW4nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgam9pblVzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBncm91cElEOiBTdHJpbmdcbiAgfTtcbiAgbWl4aW5zID0gW0xvYWRpbmdNaXhpbl07XG4gIGRhdGEgPSB7XG4gICAgaW50cm86ICcnLFxuICAgIHd4OiAnJyxcbiAgICBmdWxsOiBmYWxzZVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2VBcHBseScpXG4gICAgfSxcbiAgICB0eXBlaW50cm8oZSkge1xuICAgICAgdGhpcy5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLmNoZWNrQnRuKClcbiAgICB9LFxuICAgIHR5cGV3eChlKSB7XG4gICAgICB0aGlzLnd4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuY2hlY2tCdG4oKVxuICAgIH0sXG4gICAgYXN5bmMgc3VibWl0KCkge1xuICAgICAgaWYgKHRoaXMuZnVsbCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmludHJvLCB0aGlzLnd4KVxuICAgICAgICB2YXIgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2FwcGx5MmpvaW4nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBncm91cElkOiB0aGlzLmdyb3VwSUQsXG4gICAgICAgICAgICBiaW86IHRoaXMuaW50cm8sXG4gICAgICAgICAgICB3eElkOiB0aGlzLnd4XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXMuc3VjYykge1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB0aGlzLnRvYXN0U3VjYygn55Sz6K+35oiQ5Yqf77yBJylcbiAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZUFwcGx5JylcbiAgICAgICAgfSBlbHNlIGlmIChyZXMuY29kZSA9PT0gJy0xJykge1xuICAgICAgICAgIHRoaXMudG9hc3RGYWlsKHJlcy5tc2cpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5zdWNjKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBJbmZvID0gcmVzLmRhdGFcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwSW5mbylcbiAgICAgIH0gZWxzZSBpZiAocmVzLm1zZyA9PT0gJ+W3sue7j+WGjee+pOWGhScpIHtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGNoZWNrQnRuKCkge1xuICAgIGlmICh0aGlzLmludHJvICYmIHRoaXMud3gpIHtcbiAgICAgIHRoaXMuZnVsbCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mdWxsID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgd2F0Y2ggPSB7fTtcbn1cbiJdfQ==