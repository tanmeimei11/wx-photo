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
                key: tokenRes.data.data.key,
                token: tokenRes.data.data.token
              }
            };
            _context.next = 6;
            return (0, _common.wxPromisify)(wx.uploadFile)(uploadData);

          case 6:
            uploadRes = _context.sent;
            _res = JSON.parse(uploadRes);

            console.log(_res);
            return _context.abrupt('return', {
              // url: `${qnResUrl}${res.key}`,
              hash: _res.hash,
              key: _res.key
            });

          case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwicmVxdWVzdCIsInVybCIsInRva2VuUmVzIiwidXBsb2FkRGF0YSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwia2V5IiwiZGF0YSIsInRva2VuIiwid3giLCJ1cGxvYWRGaWxlIiwidXBsb2FkUmVzIiwiX3JlcyIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJoYXNoIiwiZG93bkludGVybmV0VXJsIiwidXJscyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiX2xlbiIsImxlbmd0aCIsImkiLCJkb3duU2lnbGVVcmwiLCJoaWRlTG9hZGluZyIsInNob3dUb2FzdCIsImR1cmF0aW9uIiwiYXV0aG9yaXplIiwic2NvcGUiLCJkb3dubG9hZEZpbGUiLCJfZG93blJlcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJ0ZW1wRmlsZVBhdGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUdBOztBQUtBOzs7Ozs7OztBQUNBOzs7O0FBSUEsSUFBTUE7QUFBQSxxRUFBcUIsaUJBQU1DLElBQU47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0osZUFBS0MsT0FBTCxDQUFhO0FBQ2hDQztBQURnQyxhQUFiLENBREk7O0FBQUE7QUFDckJDLG9CQURxQjtBQUtyQkMsc0JBTHFCLEdBS1I7QUFDZkYsc0NBRGU7QUFFZkcsd0JBQVVMLElBRks7QUFHZk0sb0JBQU0sTUFIUztBQUlmQyx3QkFBVTtBQUNSQyxxQkFBS0wsU0FBU00sSUFBVCxDQUFjQSxJQUFkLENBQW1CRCxHQURoQjtBQUVSRSx1QkFBT1AsU0FBU00sSUFBVCxDQUFjQSxJQUFkLENBQW1CQztBQUZsQjtBQUpLLGFBTFE7QUFBQTtBQUFBLG1CQWNILHlCQUFZQyxHQUFHQyxVQUFmLEVBQTJCUixVQUEzQixDQWRHOztBQUFBO0FBY3JCUyxxQkFkcUI7QUFlckJDLGdCQWZxQixHQWVkQyxLQUFLQyxLQUFMLENBQVdILFNBQVgsQ0FmYzs7QUFnQnpCSSxvQkFBUUMsR0FBUixDQUFZSixJQUFaO0FBaEJ5Qiw2Q0FpQmxCO0FBQ0w7QUFDQUssb0JBQU1MLEtBQUtLLElBRk47QUFHTFgsbUJBQUtNLEtBQUtOO0FBSEwsYUFqQmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBd0JBOzs7O0FBSUEsSUFBTVk7QUFBQSxzRUFBa0Isa0JBQWdCQyxJQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCVixlQUFHVyxXQUFILENBQWU7QUFDYkMscUJBQU8sTUFETTtBQUViQyxvQkFBTTtBQUZPLGFBQWY7QUFJQSxnQkFBSSxPQUFPSCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxxQkFBTyxDQUFDQSxJQUFELENBQVA7QUFDRDtBQUNHSSxnQkFSa0IsR0FRWEosS0FBS0ssTUFSTTtBQVNiQyxhQVRhLEdBU1QsQ0FUUzs7QUFBQTtBQUFBLGtCQVNOQSxJQUFJRixJQVRFO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBVWRHLGFBQWFQLEtBQUtNLENBQUwsQ0FBYixDQVZjOztBQUFBO0FBU0lBLGVBVEo7QUFBQTtBQUFBOztBQUFBO0FBWXRCaEIsZUFBR2tCLFdBQUg7QUFDQSxnQkFBSUYsTUFBTUYsSUFBVixFQUFnQjtBQUNkZCxpQkFBR21CLFNBQUgsQ0FBYTtBQUNYUCx1QkFBTyxNQURJO0FBRVhRLDBCQUFVLElBRkM7QUFHWFAsc0JBQU07QUFISyxlQUFiO0FBS0Q7O0FBbkJxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFsQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXNCQTs7O0FBR0EsSUFBTUk7QUFBQSxzRUFBZSxrQkFBZ0IxQixHQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVYLGVBQUs4QixTQUFMLENBQWU7QUFDbkJDLHFCQUFPO0FBRFksYUFBZixDQUZXOztBQUFBO0FBQUE7QUFBQSxtQkFLSSxlQUFLQyxZQUFMLENBQWtCO0FBQ3JDaEMsbUJBQUtBO0FBRGdDLGFBQWxCLENBTEo7O0FBQUE7QUFLYmlDLG9CQUxhO0FBQUE7QUFBQSxtQkFRWCxlQUFLQyxzQkFBTCxDQUE0QjtBQUNoQy9CLHdCQUFVOEIsU0FBU0U7QUFEYSxhQUE1QixDQVJXOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWNBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Z4Qyx3Q0FEZTtBQUVmcUI7QUFGZSxDQUFqQiIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB3eFByb21pc2lmeVxufSBmcm9tICcuL2NvbW1vbi5qcydcbmltcG9ydCB7XG4gIHFuVG9rZW5VcmwsXG4gIHFuVXBsb2FkVXJsXG4gIC8vIHFuUmVzVXJsXG59IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbi8qKlxuICog5LiK5Lyg5paH5Lu25Yiw5LiD54mbXG4gKiBAcGFyYW0geyp9IGZpbGVcbiAqL1xuY29uc3QgdXBsb2FkSW1hZ2VUb1Fpbml1ID0gYXN5bmMgZmlsZSA9PiB7XG4gIHZhciB0b2tlblJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XG4gICAgdXJsOiBxblRva2VuVXJsXG4gIH0pXG5cbiAgdmFyIHVwbG9hZERhdGEgPSB7XG4gICAgdXJsOiBxblVwbG9hZFVybCxcbiAgICBmaWxlUGF0aDogZmlsZSxcbiAgICBuYW1lOiAnZmlsZScsXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGtleTogdG9rZW5SZXMuZGF0YS5kYXRhLmtleSxcbiAgICAgIHRva2VuOiB0b2tlblJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICB9XG4gIH1cbiAgdmFyIHVwbG9hZFJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnVwbG9hZEZpbGUpKHVwbG9hZERhdGEpXG4gIHZhciBfcmVzID0gSlNPTi5wYXJzZSh1cGxvYWRSZXMpXG4gIGNvbnNvbGUubG9nKF9yZXMpXG4gIHJldHVybiB7XG4gICAgLy8gdXJsOiBgJHtxblJlc1VybH0ke3Jlcy5rZXl9YCxcbiAgICBoYXNoOiBfcmVzLmhhc2gsXG4gICAga2V5OiBfcmVzLmtleVxuICB9XG59XG5cbi8qKlxuICog5LiL6L295aSa5byg5Zu+XG4gKiBAcGFyYW0geyp9IHVybFxuICovXG5jb25zdCBkb3duSW50ZXJuZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJscykge1xuICB3eC5zaG93TG9hZGluZyh7XG4gICAgdGl0bGU6ICfmraPlnKjkuIvovb0nLFxuICAgIG1hc2s6IHRydWVcbiAgfSlcbiAgaWYgKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykge1xuICAgIHVybHMgPSBbdXJsc11cbiAgfVxuICB2YXIgX2xlbiA9IHVybHMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgYXdhaXQgZG93blNpZ2xlVXJsKHVybHNbaV0pXG4gIH1cbiAgd3guaGlkZUxvYWRpbmcoKVxuICBpZiAoaSA9PT0gX2xlbikge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogJ+S4i+i9veaIkOWKnycsXG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICog5LiL6L29XG4gKi9cbmNvbnN0IGRvd25TaWdsZVVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB3ZXB5LmF1dGhvcml6ZSh7XG4gICAgICBzY29wZTogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXG4gICAgfSlcbiAgICB2YXIgX2Rvd25SZXMgPSBhd2FpdCB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6IHVybFxuICAgIH0pXG4gICAgYXdhaXQgd2VweS5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgIGZpbGVQYXRoOiBfZG93blJlcy50ZW1wRmlsZVBhdGhcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXBsb2FkSW1hZ2VUb1Fpbml1LFxuICBkb3duSW50ZXJuZXRVcmxcbn1cbiJdfQ==