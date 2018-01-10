'use strict';

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../../utils/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import {
//   wxPromisify
// } from '../../utils/common'


var shareCallBack = function shareCallBack(res) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
      var ticket, loginRes, shareInfoRes, _data, dispatcherRes;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('这里是 分享的点进来的');
              wx.showLoading({
                title: '相册分享中',
                mask: true
              });
              _context.prev = 2;

              if (!res.shareTickets) {
                _context.next = 18;
                break;
              }

              ticket = res.shareTickets[0];

              console.log(ticket);
              _context.next = 8;
              return _wepy2.default.login({
                withCredentials: true
              });

            case 8:
              loginRes = _context.sent;
              _context.next = 11;
              return _wepy2.default.getShareInfo({
                shareTicket: ticket
              });

            case 11:
              shareInfoRes = _context.sent;

              if (!(loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv)) {
                _context.next = 18;
                break;
              }

              _data = {
                encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                iv: shareInfoRes.iv, // 加密算法的初始向量
                code: loginRes.code
              };
              _context.next = 16;
              return (0, _login.request)({
                url: '/gg/group/index/dispatcher',
                data: _data
              });

            case 16:
              dispatcherRes = _context.sent;


              if (dispatcherRes && dispatcherRes.succ) {
                wx.hideLoading();
                wx.redirectTo({
                  url: dispatcherRes.data.redirect_path
                });
              }

            case 18:
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](2);

              undefined.loadingOut();

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 20]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

module.exports = shareCallBack;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlLmpzIl0sIm5hbWVzIjpbInNoYXJlQ2FsbEJhY2siLCJyZXMiLCJjb25zb2xlIiwibG9nIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInNoYXJlVGlja2V0cyIsInRpY2tldCIsImxvZ2luIiwid2l0aENyZWRlbnRpYWxzIiwibG9naW5SZXMiLCJnZXRTaGFyZUluZm8iLCJzaGFyZVRpY2tldCIsInNoYXJlSW5mb1JlcyIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJfZGF0YSIsInVybCIsImRhdGEiLCJkaXNwYXRjaGVyUmVzIiwic3VjYyIsImhpZGVMb2FkaW5nIiwicmVkaXJlY3RUbyIsInJlZGlyZWN0X3BhdGgiLCJsb2FkaW5nT3V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUtBOzs7Ozs7QUFIQTtBQUNBO0FBQ0E7OztBQUlBLElBQUlBLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsR0FBRCxFQUFTO0FBQzNCO0FBQUEsdUVBQU8saUJBQU1BLEdBQU47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMQyxzQkFBUUMsR0FBUixDQUFZLGFBQVo7QUFDQUMsaUJBQUdDLFdBQUgsQ0FBZTtBQUNiQyx1QkFBTyxPQURNO0FBRWJDLHNCQUFNO0FBRk8sZUFBZjtBQUZLOztBQUFBLG1CQU9DTixJQUFJTyxZQVBMO0FBQUE7QUFBQTtBQUFBOztBQVFHQyxvQkFSSCxHQVFZUixJQUFJTyxZQUFKLENBQWlCLENBQWpCLENBUlo7O0FBU0ROLHNCQUFRQyxHQUFSLENBQVlNLE1BQVo7QUFUQztBQUFBLHFCQVVvQixlQUFLQyxLQUFMLENBQVc7QUFDOUJDLGlDQUFpQjtBQURhLGVBQVgsQ0FWcEI7O0FBQUE7QUFVR0Msc0JBVkg7QUFBQTtBQUFBLHFCQWF3QixlQUFLQyxZQUFMLENBQWtCO0FBQ3pDQyw2QkFBYUw7QUFENEIsZUFBbEIsQ0FieEI7O0FBQUE7QUFhR00sMEJBYkg7O0FBQUEsb0JBZ0JHSCxTQUFTSSxJQUFULElBQWlCRCxhQUFhRSxhQUE5QixJQUErQ0YsYUFBYUcsRUFoQi9EO0FBQUE7QUFBQTtBQUFBOztBQWlCS0MsbUJBakJMLEdBaUJhO0FBQ1ZGLCtCQUFlRixhQUFhRSxhQURsQixFQUNpQztBQUMzQ0Msb0JBQUlILGFBQWFHLEVBRlAsRUFFVztBQUNyQkYsc0JBQU1KLFNBQVNJO0FBSEwsZUFqQmI7QUFBQTtBQUFBLHFCQXVCMkIsb0JBQVE7QUFDaENJLHFCQUFLLDRCQUQyQjtBQUVoQ0Msc0JBQU1GO0FBRjBCLGVBQVIsQ0F2QjNCOztBQUFBO0FBdUJLRywyQkF2Qkw7OztBQTRCQyxrQkFBSUEsaUJBQWlCQSxjQUFjQyxJQUFuQyxFQUF5QztBQUN2Q25CLG1CQUFHb0IsV0FBSDtBQUNBcEIsbUJBQUdxQixVQUFILENBQWM7QUFDWkwsdUJBQUtFLGNBQWNELElBQWQsQ0FBbUJLO0FBRFosaUJBQWQ7QUFHRDs7QUFqQ0Y7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFxQ0gsd0JBQUtDLFVBQUw7O0FBckNHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3Q0QsQ0F6Q0Q7O0FBMkNBQyxPQUFPQyxPQUFQLEdBQWlCN0IsYUFBakIiLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vLyBpbXBvcnQge1xuLy8gICB3eFByb21pc2lmeVxuLy8gfSBmcm9tICcuLi8uLi91dGlscy9jb21tb24nXG5pbXBvcnQge1xuICByZXF1ZXN0XG59IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2luJ1xudmFyIHNoYXJlQ2FsbEJhY2sgPSAocmVzKSA9PiB7XG4gIHJldHVybiBhc3luYyhyZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZygn6L+Z6YeM5pivIOWIhuS6q+eahOeCuei/m+adpeeahCcpXG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfnm7jlhozliIbkuqvkuK0nLFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pXG4gICAgdHJ5IHtcbiAgICAgIGlmIChyZXMuc2hhcmVUaWNrZXRzKSB7XG4gICAgICAgIHZhciB0aWNrZXQgPSByZXMuc2hhcmVUaWNrZXRzWzBdXG4gICAgICAgIGNvbnNvbGUubG9nKHRpY2tldClcbiAgICAgICAgdmFyIGxvZ2luUmVzID0gYXdhaXQgd2VweS5sb2dpbih7XG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBzaGFyZUluZm9SZXMgPSBhd2FpdCB3ZXB5LmdldFNoYXJlSW5mbyh7XG4gICAgICAgICAgc2hhcmVUaWNrZXQ6IHRpY2tldFxuICAgICAgICB9KVxuICAgICAgICBpZiAobG9naW5SZXMuY29kZSAmJiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSAmJiBzaGFyZUluZm9SZXMuaXYpIHtcbiAgICAgICAgICB2YXIgX2RhdGEgPSB7XG4gICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBzaGFyZUluZm9SZXMuZW5jcnlwdGVkRGF0YSwgLy8gIOino+WvhuWQjuS4uuS4gOS4qiBKU09OIOe7k+aehO+8iG9wZW5HSWQgICAg576k5a+55b2T5YmN5bCP56iL5bqP55qE5ZSv5LiAIElE77yJXG4gICAgICAgICAgICBpdjogc2hhcmVJbmZvUmVzLml2LCAvLyDliqDlr4bnrpfms5XnmoTliJ3lp4vlkJHph49cbiAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZGlzcGF0Y2hlclJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnL2dnL2dyb3VwL2luZGV4L2Rpc3BhdGNoZXInLFxuICAgICAgICAgICAgZGF0YTogX2RhdGFcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKGRpc3BhdGNoZXJSZXMgJiYgZGlzcGF0Y2hlclJlcy5zdWNjKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgdXJsOiBkaXNwYXRjaGVyUmVzLmRhdGEucmVkaXJlY3RfcGF0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvYWRpbmdPdXQoKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlQ2FsbEJhY2tcbiJdfQ==