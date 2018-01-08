'use strict';

var _common = require('./common.js');

var _config = require('./config.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 上传文件到七牛
 * @param {*} file
 */
var uploadImageToQiniu = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var tokenRes, uploadData, uploadRes, _res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _wepy2.default.request({
              url: _config.qnTokenUrl
            });

          case 2:
            tokenRes = _context.sent;
            uploadData = {
              url: _config.qnUploadUrl,
              filePath: file,
              name: 'file',
              formData: {
                key: tokenRes.data.key,
                token: tokenRes.data.token
              }
            };
            _context.next = 6;
            return (0, _common.wxPromisify)(wx.uploadFile)(uploadData);

          case 6:
            uploadRes = _context.sent;
            _res = JSON.parse(uploadRes);
            return _context.abrupt('return', {
              // url: `${qnResUrl}${res.key}`,
              hash: _res.hash,
              key: _res.key
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function uploadImageToQiniu(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 下载多张图
 * @param {*} url
 */
var downInternetUrl = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(urls) {
    var _len, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wx.showLoading({
              title: '正在下载',
              mask: true
            });
            if (typeof urls === 'string') {
              urls = [urls];
            }
            _len = urls.length;
            i = 0;

          case 4:
            if (!(i < _len)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 7;
            return downSigleUrl(urls[i]);

          case 7:
            i++;
            _context2.next = 4;
            break;

          case 10:
            wx.hideLoading();
            if (i === _len) {
              wx.showToast({
                title: '下载成功',
                duration: 2000,
                mask: true
              });
            }

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function downInternetUrl(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 下载
 */
var downSigleUrl = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
    var _downRes;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _wepy2.default.authorize({
              scope: 'scope.writePhotosAlbum'
            });

          case 3:
            _context3.next = 5;
            return _wepy2.default.downloadFile({
              url: url
            });

          case 5:
            _downRes = _context3.sent;
            _context3.next = 8;
            return _wepy2.default.saveImageToPhotosAlbum({
              filePath: _downRes.tempFilePath
            });

          case 8:
            _context3.next = 12;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 10]]);
  }));

  return function downSigleUrl(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  uploadImageToQiniu: uploadImageToQiniu,
  downInternetUrl: downInternetUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwicmVxdWVzdCIsInVybCIsInRva2VuUmVzIiwidXBsb2FkRGF0YSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwia2V5IiwiZGF0YSIsInRva2VuIiwid3giLCJ1cGxvYWRGaWxlIiwidXBsb2FkUmVzIiwiX3JlcyIsIkpTT04iLCJwYXJzZSIsImhhc2giLCJkb3duSW50ZXJuZXRVcmwiLCJ1cmxzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJfbGVuIiwibGVuZ3RoIiwiaSIsImRvd25TaWdsZVVybCIsImhpZGVMb2FkaW5nIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJhdXRob3JpemUiLCJzY29wZSIsImRvd25sb2FkRmlsZSIsIl9kb3duUmVzIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsInRlbXBGaWxlUGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBR0E7O0FBS0E7Ozs7Ozs7O0FBQ0E7Ozs7QUFJQSxJQUFNQTtBQUFBLHFFQUFxQixpQkFBTUMsSUFBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDSixlQUFLQyxPQUFMLENBQWE7QUFDaENDO0FBRGdDLGFBQWIsQ0FESTs7QUFBQTtBQUNyQkMsb0JBRHFCO0FBS3JCQyxzQkFMcUIsR0FLUjtBQUNmRixzQ0FEZTtBQUVmRyx3QkFBVUwsSUFGSztBQUdmTSxvQkFBTSxNQUhTO0FBSWZDLHdCQUFVO0FBQ1JDLHFCQUFLTCxTQUFTTSxJQUFULENBQWNELEdBRFg7QUFFUkUsdUJBQU9QLFNBQVNNLElBQVQsQ0FBY0M7QUFGYjtBQUpLLGFBTFE7QUFBQTtBQUFBLG1CQWNILHlCQUFZQyxHQUFHQyxVQUFmLEVBQTJCUixVQUEzQixDQWRHOztBQUFBO0FBY3JCUyxxQkFkcUI7QUFlckJDLGdCQWZxQixHQWVkQyxLQUFLQyxLQUFMLENBQVdILFNBQVgsQ0FmYztBQUFBLDZDQWdCbEI7QUFDTDtBQUNBSSxvQkFBTUgsS0FBS0csSUFGTjtBQUdMVCxtQkFBS00sS0FBS047QUFITCxhQWhCa0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUF1QkE7Ozs7QUFJQSxJQUFNVTtBQUFBLHNFQUFrQixrQkFBZ0JDLElBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdEJSLGVBQUdTLFdBQUgsQ0FBZTtBQUNiQyxxQkFBTyxNQURNO0FBRWJDLG9CQUFNO0FBRk8sYUFBZjtBQUlBLGdCQUFJLE9BQU9ILElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJBLHFCQUFPLENBQUNBLElBQUQsQ0FBUDtBQUNEO0FBQ0dJLGdCQVJrQixHQVFYSixLQUFLSyxNQVJNO0FBU2JDLGFBVGEsR0FTVCxDQVRTOztBQUFBO0FBQUEsa0JBU05BLElBQUlGLElBVEU7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFVZEcsYUFBYVAsS0FBS00sQ0FBTCxDQUFiLENBVmM7O0FBQUE7QUFTSUEsZUFUSjtBQUFBO0FBQUE7O0FBQUE7QUFZdEJkLGVBQUdnQixXQUFIO0FBQ0EsZ0JBQUlGLE1BQU1GLElBQVYsRUFBZ0I7QUFDZFosaUJBQUdpQixTQUFILENBQWE7QUFDWFAsdUJBQU8sTUFESTtBQUVYUSwwQkFBVSxJQUZDO0FBR1hQLHNCQUFNO0FBSEssZUFBYjtBQUtEOztBQW5CcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBbEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFzQkE7OztBQUdBLElBQU1JO0FBQUEsc0VBQWUsa0JBQWdCeEIsR0FBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFWCxlQUFLNEIsU0FBTCxDQUFlO0FBQ25CQyxxQkFBTztBQURZLGFBQWYsQ0FGVzs7QUFBQTtBQUFBO0FBQUEsbUJBS0ksZUFBS0MsWUFBTCxDQUFrQjtBQUNyQzlCLG1CQUFLQTtBQURnQyxhQUFsQixDQUxKOztBQUFBO0FBS2IrQixvQkFMYTtBQUFBO0FBQUEsbUJBUVgsZUFBS0Msc0JBQUwsQ0FBNEI7QUFDaEM3Qix3QkFBVTRCLFNBQVNFO0FBRGEsYUFBNUIsQ0FSVzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFjQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmdEMsd0NBRGU7QUFFZm1CO0FBRmUsQ0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgd3hQcm9taXNpZnlcbn0gZnJvbSAnLi9jb21tb24uanMnXG5pbXBvcnQge1xuICBxblRva2VuVXJsLFxuICBxblVwbG9hZFVybFxuICAvLyBxblJlc1VybFxufSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4vKipcbiAqIOS4iuS8oOaWh+S7tuWIsOS4g+eJm1xuICogQHBhcmFtIHsqfSBmaWxlXG4gKi9cbmNvbnN0IHVwbG9hZEltYWdlVG9RaW5pdSA9IGFzeW5jIGZpbGUgPT4ge1xuICB2YXIgdG9rZW5SZXMgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgIHVybDogcW5Ub2tlblVybFxuICB9KVxuXG4gIHZhciB1cGxvYWREYXRhID0ge1xuICAgIHVybDogcW5VcGxvYWRVcmwsXG4gICAgZmlsZVBhdGg6IGZpbGUsXG4gICAgbmFtZTogJ2ZpbGUnLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBrZXk6IHRva2VuUmVzLmRhdGEua2V5LFxuICAgICAgdG9rZW46IHRva2VuUmVzLmRhdGEudG9rZW5cbiAgICB9XG4gIH1cbiAgdmFyIHVwbG9hZFJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnVwbG9hZEZpbGUpKHVwbG9hZERhdGEpXG4gIHZhciBfcmVzID0gSlNPTi5wYXJzZSh1cGxvYWRSZXMpXG4gIHJldHVybiB7XG4gICAgLy8gdXJsOiBgJHtxblJlc1VybH0ke3Jlcy5rZXl9YCxcbiAgICBoYXNoOiBfcmVzLmhhc2gsXG4gICAga2V5OiBfcmVzLmtleVxuICB9XG59XG5cbi8qKlxuICog5LiL6L295aSa5byg5Zu+XG4gKiBAcGFyYW0geyp9IHVybFxuICovXG5jb25zdCBkb3duSW50ZXJuZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJscykge1xuICB3eC5zaG93TG9hZGluZyh7XG4gICAgdGl0bGU6ICfmraPlnKjkuIvovb0nLFxuICAgIG1hc2s6IHRydWVcbiAgfSlcbiAgaWYgKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykge1xuICAgIHVybHMgPSBbdXJsc11cbiAgfVxuICB2YXIgX2xlbiA9IHVybHMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgYXdhaXQgZG93blNpZ2xlVXJsKHVybHNbaV0pXG4gIH1cbiAgd3guaGlkZUxvYWRpbmcoKVxuICBpZiAoaSA9PT0gX2xlbikge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogJ+S4i+i9veaIkOWKnycsXG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICog5LiL6L29XG4gKi9cbmNvbnN0IGRvd25TaWdsZVVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB3ZXB5LmF1dGhvcml6ZSh7XG4gICAgICBzY29wZTogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXG4gICAgfSlcbiAgICB2YXIgX2Rvd25SZXMgPSBhd2FpdCB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6IHVybFxuICAgIH0pXG4gICAgYXdhaXQgd2VweS5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgIGZpbGVQYXRoOiBfZG93blJlcy50ZW1wRmlsZVBhdGhcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXBsb2FkSW1hZ2VUb1Fpbml1LFxuICBkb3duSW50ZXJuZXRVcmxcbn1cbiJdfQ==