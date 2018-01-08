'use strict';

var _common = require('./common.js');

var _config = require('./config.js');

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
            return (0, _common.wxPromisify)(wx.request)({
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
            return (0, _common.wxPromisify)(wx.authorize)({
              scope: 'scope.writePhotosAlbum'
            });

          case 3:
            _context3.next = 5;
            return (0, _common.wxPromisify)(wx.downloadFile)({
              url: url
            });

          case 5:
            _downRes = _context3.sent;
            _context3.next = 8;
            return (0, _common.wxPromisify)(wx.saveImageToPhotosAlbum)({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwid3giLCJyZXF1ZXN0IiwidXJsIiwidG9rZW5SZXMiLCJ1cGxvYWREYXRhIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJrZXkiLCJkYXRhIiwidG9rZW4iLCJ1cGxvYWRGaWxlIiwidXBsb2FkUmVzIiwiX3JlcyIsIkpTT04iLCJwYXJzZSIsImhhc2giLCJkb3duSW50ZXJuZXRVcmwiLCJ1cmxzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIl9sZW4iLCJsZW5ndGgiLCJpIiwiZG93blNpZ2xlVXJsIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsImF1dGhvcml6ZSIsInNjb3BlIiwiZG93bmxvYWRGaWxlIiwiX2Rvd25SZXMiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwidGVtcEZpbGVQYXRoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFHQTs7OztBQU1BOzs7O0FBSUEsSUFBTUE7QUFBQSxxRUFBcUIsaUJBQU1DLElBQU47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0oseUJBQVlDLEdBQUdDLE9BQWYsRUFBd0I7QUFDM0NDO0FBRDJDLGFBQXhCLENBREk7O0FBQUE7QUFDckJDLG9CQURxQjtBQUtyQkMsc0JBTHFCLEdBS1I7QUFDZkYsc0NBRGU7QUFFZkcsd0JBQVVOLElBRks7QUFHZk8sb0JBQU0sTUFIUztBQUlmQyx3QkFBVTtBQUNSQyxxQkFBS0wsU0FBU00sSUFBVCxDQUFjRCxHQURYO0FBRVJFLHVCQUFPUCxTQUFTTSxJQUFULENBQWNDO0FBRmI7QUFKSyxhQUxRO0FBQUE7QUFBQSxtQkFjSCx5QkFBWVYsR0FBR1csVUFBZixFQUEyQlAsVUFBM0IsQ0FkRzs7QUFBQTtBQWNyQlEscUJBZHFCO0FBZXJCQyxnQkFmcUIsR0FlZEMsS0FBS0MsS0FBTCxDQUFXSCxTQUFYLENBZmM7QUFBQSw2Q0FnQmxCO0FBQ0w7QUFDQUksb0JBQU1ILEtBQUtHLElBRk47QUFHTFIsbUJBQUtLLEtBQUtMO0FBSEwsYUFoQmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBdUJBOzs7O0FBSUEsSUFBTVM7QUFBQSxzRUFBa0Isa0JBQWdCQyxJQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCbEIsZUFBR21CLFdBQUgsQ0FBZTtBQUNiQyxxQkFBTztBQURNLGFBQWY7QUFHQSxnQkFBSSxPQUFPRixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxxQkFBTyxDQUFDQSxJQUFELENBQVA7QUFDRDtBQUNHRyxnQkFQa0IsR0FPWEgsS0FBS0ksTUFQTTtBQVFiQyxhQVJhLEdBUVQsQ0FSUzs7QUFBQTtBQUFBLGtCQVFOQSxJQUFJRixJQVJFO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBU2RHLGFBQWFOLEtBQUtLLENBQUwsQ0FBYixDQVRjOztBQUFBO0FBUUlBLGVBUko7QUFBQTtBQUFBOztBQUFBO0FBV3RCdkIsZUFBR3lCLFdBQUg7QUFDQXpCLGVBQUcwQixTQUFILENBQWE7QUFDWE4scUJBQU8sTUFESTtBQUVYTyx3QkFBVTtBQUZDLGFBQWI7O0FBWnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBa0JBOzs7QUFHQSxJQUFNSDtBQUFBLHNFQUFlLGtCQUFnQnRCLEdBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVgseUJBQVlGLEdBQUc0QixTQUFmLEVBQTBCO0FBQzlCQyxxQkFBTztBQUR1QixhQUExQixDQUZXOztBQUFBO0FBQUE7QUFBQSxtQkFLSSx5QkFBWTdCLEdBQUc4QixZQUFmLEVBQTZCO0FBQ2hENUIsbUJBQUtBO0FBRDJDLGFBQTdCLENBTEo7O0FBQUE7QUFLYjZCLG9CQUxhO0FBQUE7QUFBQSxtQkFRWCx5QkFBWS9CLEdBQUdnQyxzQkFBZixFQUF1QztBQUMzQzNCLHdCQUFVMEIsU0FBU0U7QUFEd0IsYUFBdkMsQ0FSVzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFjQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmckMsd0NBRGU7QUFFZm1CO0FBRmUsQ0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgd3hQcm9taXNpZnlcbn0gZnJvbSAnLi9jb21tb24uanMnXG5pbXBvcnQge1xuICBxblRva2VuVXJsLFxuICBxblVwbG9hZFVybFxuICAvLyBxblJlc1VybFxufSBmcm9tICcuL2NvbmZpZydcblxuLyoqXG4gKiDkuIrkvKDmlofku7bliLDkuIPniZtcbiAqIEBwYXJhbSB7Kn0gZmlsZVxuICovXG5jb25zdCB1cGxvYWRJbWFnZVRvUWluaXUgPSBhc3luYyBmaWxlID0+IHtcbiAgdmFyIHRva2VuUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3gucmVxdWVzdCkoe1xuICAgIHVybDogcW5Ub2tlblVybFxuICB9KVxuXG4gIHZhciB1cGxvYWREYXRhID0ge1xuICAgIHVybDogcW5VcGxvYWRVcmwsXG4gICAgZmlsZVBhdGg6IGZpbGUsXG4gICAgbmFtZTogJ2ZpbGUnLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBrZXk6IHRva2VuUmVzLmRhdGEua2V5LFxuICAgICAgdG9rZW46IHRva2VuUmVzLmRhdGEudG9rZW5cbiAgICB9XG4gIH1cbiAgdmFyIHVwbG9hZFJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnVwbG9hZEZpbGUpKHVwbG9hZERhdGEpXG4gIHZhciBfcmVzID0gSlNPTi5wYXJzZSh1cGxvYWRSZXMpXG4gIHJldHVybiB7XG4gICAgLy8gdXJsOiBgJHtxblJlc1VybH0ke3Jlcy5rZXl9YCxcbiAgICBoYXNoOiBfcmVzLmhhc2gsXG4gICAga2V5OiBfcmVzLmtleVxuICB9XG59XG5cbi8qKlxuICog5LiL6L295aSa5byg5Zu+XG4gKiBAcGFyYW0geyp9IHVybFxuICovXG5jb25zdCBkb3duSW50ZXJuZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJscykge1xuICB3eC5zaG93TG9hZGluZyh7XG4gICAgdGl0bGU6ICfmraPlnKjkuIvovb0nXG4gIH0pXG4gIGlmICh0eXBlb2YgdXJscyA9PT0gJ3N0cmluZycpIHtcbiAgICB1cmxzID0gW3VybHNdXG4gIH1cbiAgdmFyIF9sZW4gPSB1cmxzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICAgIGF3YWl0IGRvd25TaWdsZVVybCh1cmxzW2ldKVxuICB9XG4gIHd4LmhpZGVMb2FkaW5nKClcbiAgd3guc2hvd1RvYXN0KHtcbiAgICB0aXRsZTogJ+S4i+i9veaIkOWKnycsXG4gICAgZHVyYXRpb246IDIwMDBcbiAgfSlcbn1cblxuLyoqXG4gKiDkuIvovb1cbiAqL1xuY29uc3QgZG93blNpZ2xlVXJsID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xuICB0cnkge1xuICAgIGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmF1dGhvcml6ZSkoe1xuICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJ1xuICAgIH0pXG4gICAgdmFyIF9kb3duUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3guZG93bmxvYWRGaWxlKSh7XG4gICAgICB1cmw6IHVybFxuICAgIH0pXG4gICAgYXdhaXQgd3hQcm9taXNpZnkod3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSkoe1xuICAgICAgZmlsZVBhdGg6IF9kb3duUmVzLnRlbXBGaWxlUGF0aFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB1cGxvYWRJbWFnZVRvUWluaXUsXG4gIGRvd25JbnRlcm5ldFVybFxufVxuIl19