'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./config.js');

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
            return _wepy2.default.uploadFile(uploadData);

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
              title: '正在下载'
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
            wx.showToast({
              title: '下载成功',
              duration: 2000
            });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwicmVxdWVzdCIsInVybCIsInRva2VuUmVzIiwidXBsb2FkRGF0YSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwia2V5IiwiZGF0YSIsInRva2VuIiwidXBsb2FkRmlsZSIsInVwbG9hZFJlcyIsIl9yZXMiLCJKU09OIiwicGFyc2UiLCJoYXNoIiwiZG93bkludGVybmV0VXJsIiwidXJscyIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIl9sZW4iLCJsZW5ndGgiLCJpIiwiZG93blNpZ2xlVXJsIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsImF1dGhvcml6ZSIsInNjb3BlIiwiZG93bmxvYWRGaWxlIiwiX2Rvd25SZXMiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwidGVtcEZpbGVQYXRoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFNQTs7OztBQUlBLElBQU1BO0FBQUEscUVBQXFCLGlCQUFNQyxJQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNKLGVBQUtDLE9BQUwsQ0FBYTtBQUNoQ0M7QUFEZ0MsYUFBYixDQURJOztBQUFBO0FBQ3JCQyxvQkFEcUI7QUFLckJDLHNCQUxxQixHQUtSO0FBQ2ZGLHNDQURlO0FBRWZHLHdCQUFVTCxJQUZLO0FBR2ZNLG9CQUFNLE1BSFM7QUFJZkMsd0JBQVU7QUFDUkMscUJBQUtMLFNBQVNNLElBQVQsQ0FBY0QsR0FEWDtBQUVSRSx1QkFBT1AsU0FBU00sSUFBVCxDQUFjQztBQUZiO0FBSkssYUFMUTtBQUFBO0FBQUEsbUJBY0gsZUFBS0MsVUFBTCxDQUFnQlAsVUFBaEIsQ0FkRzs7QUFBQTtBQWNyQlEscUJBZHFCO0FBZXJCQyxnQkFmcUIsR0FlZEMsS0FBS0MsS0FBTCxDQUFXSCxTQUFYLENBZmM7QUFBQSw2Q0FnQmxCO0FBQ0w7QUFDQUksb0JBQU1ILEtBQUtHLElBRk47QUFHTFIsbUJBQUtLLEtBQUtMO0FBSEwsYUFoQmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBdUJBOzs7O0FBSUEsSUFBTVM7QUFBQSxzRUFBa0Isa0JBQWdCQyxJQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCQyxlQUFHQyxXQUFILENBQWU7QUFDYkMscUJBQU87QUFETSxhQUFmO0FBR0EsZ0JBQUksT0FBT0gsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkEscUJBQU8sQ0FBQ0EsSUFBRCxDQUFQO0FBQ0Q7QUFDR0ksZ0JBUGtCLEdBT1hKLEtBQUtLLE1BUE07QUFRYkMsYUFSYSxHQVFULENBUlM7O0FBQUE7QUFBQSxrQkFRTkEsSUFBSUYsSUFSRTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVNkRyxhQUFhUCxLQUFLTSxDQUFMLENBQWIsQ0FUYzs7QUFBQTtBQVFJQSxlQVJKO0FBQUE7QUFBQTs7QUFBQTtBQVd0QkwsZUFBR08sV0FBSDtBQUNBUCxlQUFHUSxTQUFILENBQWE7QUFDWE4scUJBQU8sTUFESTtBQUVYTyx3QkFBVTtBQUZDLGFBQWI7O0FBWnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBa0JBOzs7QUFHQSxJQUFNSDtBQUFBLHNFQUFlLGtCQUFnQnZCLEdBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVgsZUFBSzJCLFNBQUwsQ0FBZTtBQUNuQkMscUJBQU87QUFEWSxhQUFmLENBRlc7O0FBQUE7QUFBQTtBQUFBLG1CQUtJLGVBQUtDLFlBQUwsQ0FBa0I7QUFDckM3QixtQkFBS0E7QUFEZ0MsYUFBbEIsQ0FMSjs7QUFBQTtBQUtiOEIsb0JBTGE7QUFBQTtBQUFBLG1CQVFYLGVBQUtDLHNCQUFMLENBQTRCO0FBQ2hDNUIsd0JBQVUyQixTQUFTRTtBQURhLGFBQTVCLENBUlc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBY0FDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnJDLHdDQURlO0FBRWZrQjtBQUZlLENBQWpCIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQge1xuICBxblRva2VuVXJsLFxuICBxblVwbG9hZFVybFxuICAvLyBxblJlc1VybFxufSBmcm9tICcuL2NvbmZpZydcblxuLyoqXG4gKiDkuIrkvKDmlofku7bliLDkuIPniZtcbiAqIEBwYXJhbSB7Kn0gZmlsZVxuICovXG5jb25zdCB1cGxvYWRJbWFnZVRvUWluaXUgPSBhc3luYyBmaWxlID0+IHtcbiAgdmFyIHRva2VuUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICB1cmw6IHFuVG9rZW5VcmxcbiAgfSlcblxuICB2YXIgdXBsb2FkRGF0YSA9IHtcbiAgICB1cmw6IHFuVXBsb2FkVXJsLFxuICAgIGZpbGVQYXRoOiBmaWxlLFxuICAgIG5hbWU6ICdmaWxlJyxcbiAgICBmb3JtRGF0YToge1xuICAgICAga2V5OiB0b2tlblJlcy5kYXRhLmtleSxcbiAgICAgIHRva2VuOiB0b2tlblJlcy5kYXRhLnRva2VuXG4gICAgfVxuICB9XG4gIHZhciB1cGxvYWRSZXMgPSBhd2FpdCB3ZXB5LnVwbG9hZEZpbGUodXBsb2FkRGF0YSlcbiAgdmFyIF9yZXMgPSBKU09OLnBhcnNlKHVwbG9hZFJlcylcbiAgcmV0dXJuIHtcbiAgICAvLyB1cmw6IGAke3FuUmVzVXJsfSR7cmVzLmtleX1gLFxuICAgIGhhc2g6IF9yZXMuaGFzaCxcbiAgICBrZXk6IF9yZXMua2V5XG4gIH1cbn1cblxuLyoqXG4gKiDkuIvovb3lpJrlvKDlm75cbiAqIEBwYXJhbSB7Kn0gdXJsXG4gKi9cbmNvbnN0IGRvd25JbnRlcm5ldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmxzKSB7XG4gIHd4LnNob3dMb2FkaW5nKHtcbiAgICB0aXRsZTogJ+ato+WcqOS4i+i9vSdcbiAgfSlcbiAgaWYgKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykge1xuICAgIHVybHMgPSBbdXJsc11cbiAgfVxuICB2YXIgX2xlbiA9IHVybHMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgYXdhaXQgZG93blNpZ2xlVXJsKHVybHNbaV0pXG4gIH1cbiAgd3guaGlkZUxvYWRpbmcoKVxuICB3eC5zaG93VG9hc3Qoe1xuICAgIHRpdGxlOiAn5LiL6L295oiQ5YqfJyxcbiAgICBkdXJhdGlvbjogMjAwMFxuICB9KVxufVxuXG4vKipcbiAqIOS4i+i9vVxuICovXG5jb25zdCBkb3duU2lnbGVVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgd2VweS5hdXRob3JpemUoe1xuICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJ1xuICAgIH0pXG4gICAgdmFyIF9kb3duUmVzID0gYXdhaXQgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiB1cmxcbiAgICB9KVxuICAgIGF3YWl0IHdlcHkuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICBmaWxlUGF0aDogX2Rvd25SZXMudGVtcEZpbGVQYXRoXG4gICAgfSlcbiAgfSBjYXRjaCAoZSkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHVwbG9hZEltYWdlVG9RaW5pdSxcbiAgZG93bkludGVybmV0VXJsXG59XG4iXX0=