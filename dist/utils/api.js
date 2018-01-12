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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, type) {
    var _data, tokenRes, uploadData, uploadRes, _res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _data = type === 'mp4' ? {
              imgType: 'mp4'
            } : {};
            _context.next = 4;
            return _wepy2.default.request({
              url: _config.qnTokenUrl,
              data: _data
            });

          case 4:
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

            console.log(uploadData);
            _context.next = 9;
            return (0, _common.wxPromisify)(wx.uploadFile)(uploadData);

          case 9:
            uploadRes = _context.sent;
            _res = JSON.parse(uploadRes);

            console.log(_res);
            return _context.abrupt('return', {
              url: '' + _config.qnResUrl + _res.key,
              hash: _res.hash,
              key: _res.key
            });

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function uploadImageToQiniu(_x, _x2) {
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
            _context2.prev = 0;

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
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);
            throw new Error();

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 12]]);
  }));

  return function downInternetUrl(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 下载
 */
var downSigleUrl = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
    var m, _downRes, k;

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
            m = _context3.sent;
            _context3.next = 6;
            return _wepy2.default.downloadFile({
              url: url
            });

          case 6:
            _downRes = _context3.sent;
            _context3.next = 9;
            return _wepy2.default.saveImageToPhotosAlbum({
              filePath: _downRes.tempFilePath
            });

          case 9:
            k = _context3.sent;
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);
            throw new Error();

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 12]]);
  }));

  return function downSigleUrl(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  uploadImageToQiniu: uploadImageToQiniu,
  downInternetUrl: downInternetUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwidHlwZSIsIl9kYXRhIiwiaW1nVHlwZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwidG9rZW5SZXMiLCJ1cGxvYWREYXRhIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJrZXkiLCJ0b2tlbiIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInVwbG9hZEZpbGUiLCJ1cGxvYWRSZXMiLCJfcmVzIiwiSlNPTiIsInBhcnNlIiwiaGFzaCIsIkVycm9yIiwiZG93bkludGVybmV0VXJsIiwidXJscyIsIl9sZW4iLCJsZW5ndGgiLCJpIiwiZG93blNpZ2xlVXJsIiwiYXV0aG9yaXplIiwic2NvcGUiLCJtIiwiZG93bmxvYWRGaWxlIiwiX2Rvd25SZXMiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwidGVtcEZpbGVQYXRoIiwiayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBR0E7O0FBS0E7Ozs7Ozs7O0FBQ0E7Ozs7QUFJQSxJQUFNQTtBQUFBLHFFQUFxQixpQkFBTUMsSUFBTixFQUFZQyxJQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVuQkMsaUJBRm1CLEdBRVhELFNBQVMsS0FBVCxHQUFpQjtBQUMzQkUsdUJBQVM7QUFEa0IsYUFBakIsR0FFUixFQUptQjtBQUFBO0FBQUEsbUJBS0YsZUFBS0MsT0FBTCxDQUFhO0FBQ2hDQyxxQ0FEZ0M7QUFFaENDLG9CQUFNSjtBQUYwQixhQUFiLENBTEU7O0FBQUE7QUFLbkJLLG9CQUxtQjtBQVVuQkMsc0JBVm1CLEdBVU47QUFDZkgsc0NBRGU7QUFFZkksd0JBQVVULElBRks7QUFHZlUsb0JBQU0sTUFIUztBQUlmQyx3QkFBVTtBQUNSQyxxQkFBS0wsU0FBU0QsSUFBVCxDQUFjQSxJQUFkLENBQW1CTSxHQURoQjtBQUVSQyx1QkFBT04sU0FBU0QsSUFBVCxDQUFjQSxJQUFkLENBQW1CTztBQUZsQjtBQUpLLGFBVk07O0FBbUJ2QkMsb0JBQVFDLEdBQVIsQ0FBWVAsVUFBWjtBQW5CdUI7QUFBQSxtQkFvQkQseUJBQVlRLEdBQUdDLFVBQWYsRUFBMkJULFVBQTNCLENBcEJDOztBQUFBO0FBb0JuQlUscUJBcEJtQjtBQXFCbkJDLGdCQXJCbUIsR0FxQlpDLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQXJCWTs7QUFzQnZCSixvQkFBUUMsR0FBUixDQUFZSSxJQUFaO0FBdEJ1Qiw2Q0F1QmhCO0FBQ0xkLDJDQUFtQmMsS0FBS1AsR0FEbkI7QUFFTFUsb0JBQU1ILEtBQUtHLElBRk47QUFHTFYsbUJBQUtPLEtBQUtQO0FBSEwsYUF2QmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQTZCakIsSUFBSVcsS0FBSixhQTdCaUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFpQ0E7Ozs7QUFJQSxJQUFNQztBQUFBLHNFQUFrQixrQkFBZ0JDLElBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFcEIsZ0JBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkEscUJBQU8sQ0FBQ0EsSUFBRCxDQUFQO0FBQ0Q7QUFDR0MsZ0JBTGdCLEdBS1RELEtBQUtFLE1BTEk7QUFNWEMsYUFOVyxHQU1QLENBTk87O0FBQUE7QUFBQSxrQkFNSkEsSUFBSUYsSUFOQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQU9aRyxhQUFhSixLQUFLRyxDQUFMLENBQWIsQ0FQWTs7QUFBQTtBQU1NQSxlQU5OO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBVWQsSUFBSUwsS0FBSixFQVZjOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBY0E7OztBQUdBLElBQU1NO0FBQUEsc0VBQWUsa0JBQWdCeEIsR0FBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSCxlQUFLeUIsU0FBTCxDQUFlO0FBQzNCQyxxQkFBTztBQURvQixhQUFmLENBRkc7O0FBQUE7QUFFYkMsYUFGYTtBQUFBO0FBQUEsbUJBS0ksZUFBS0MsWUFBTCxDQUFrQjtBQUNyQzVCLG1CQUFLQTtBQURnQyxhQUFsQixDQUxKOztBQUFBO0FBS2I2QixvQkFMYTtBQUFBO0FBQUEsbUJBUUgsZUFBS0Msc0JBQUwsQ0FBNEI7QUFDeEMxQix3QkFBVXlCLFNBQVNFO0FBRHFCLGFBQTVCLENBUkc7O0FBQUE7QUFRYkMsYUFSYTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBWVgsSUFBSWQsS0FBSixFQVpXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFnQkFlLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnhDLHdDQURlO0FBRWZ5QjtBQUZlLENBQWpCIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHd4UHJvbWlzaWZ5XG59IGZyb20gJy4vY29tbW9uLmpzJ1xuaW1wb3J0IHtcbiAgcW5Ub2tlblVybCxcbiAgcW5VcGxvYWRVcmwsXG4gIHFuUmVzVXJsXG59IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbi8qKlxuICog5LiK5Lyg5paH5Lu25Yiw5LiD54mbXG4gKiBAcGFyYW0geyp9IGZpbGVcbiAqL1xuY29uc3QgdXBsb2FkSW1hZ2VUb1Fpbml1ID0gYXN5bmMoZmlsZSwgdHlwZSkgPT4ge1xuICB0cnkge1xuICAgIHZhciBfZGF0YSA9IHR5cGUgPT09ICdtcDQnID8ge1xuICAgICAgaW1nVHlwZTogJ21wNCdcbiAgICB9IDoge31cbiAgICB2YXIgdG9rZW5SZXMgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBxblRva2VuVXJsLFxuICAgICAgZGF0YTogX2RhdGFcbiAgICB9KVxuXG4gICAgdmFyIHVwbG9hZERhdGEgPSB7XG4gICAgICB1cmw6IHFuVXBsb2FkVXJsLFxuICAgICAgZmlsZVBhdGg6IGZpbGUsXG4gICAgICBuYW1lOiAnZmlsZScsXG4gICAgICBmb3JtRGF0YToge1xuICAgICAgICBrZXk6IHRva2VuUmVzLmRhdGEuZGF0YS5rZXksXG4gICAgICAgIHRva2VuOiB0b2tlblJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codXBsb2FkRGF0YSlcbiAgICB2YXIgdXBsb2FkUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3gudXBsb2FkRmlsZSkodXBsb2FkRGF0YSlcbiAgICB2YXIgX3JlcyA9IEpTT04ucGFyc2UodXBsb2FkUmVzKVxuICAgIGNvbnNvbGUubG9nKF9yZXMpXG4gICAgcmV0dXJuIHtcbiAgICAgIHVybDogYCR7cW5SZXNVcmx9JHtfcmVzLmtleX1gLFxuICAgICAgaGFzaDogX3Jlcy5oYXNoLFxuICAgICAga2V5OiBfcmVzLmtleVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihlKVxuICB9XG59XG5cbi8qKlxuICog5LiL6L295aSa5byg5Zu+XG4gKiBAcGFyYW0geyp9IHVybFxuICovXG5jb25zdCBkb3duSW50ZXJuZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJscykge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgdXJscyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVybHMgPSBbdXJsc11cbiAgICB9XG4gICAgdmFyIF9sZW4gPSB1cmxzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICBhd2FpdCBkb3duU2lnbGVVcmwodXJsc1tpXSlcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICB9XG59XG5cbi8qKlxuICog5LiL6L29XG4gKi9cbmNvbnN0IGRvd25TaWdsZVVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICB2YXIgbSA9IGF3YWl0IHdlcHkuYXV0aG9yaXplKHtcbiAgICAgIHNjb3BlOiAnc2NvcGUud3JpdGVQaG90b3NBbGJ1bSdcbiAgICB9KVxuICAgIHZhciBfZG93blJlcyA9IGF3YWl0IHdlcHkuZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogdXJsXG4gICAgfSlcbiAgICB2YXIgayA9IGF3YWl0IHdlcHkuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICBmaWxlUGF0aDogX2Rvd25SZXMudGVtcEZpbGVQYXRoXG4gICAgfSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHVwbG9hZEltYWdlVG9RaW5pdSxcbiAgZG93bkludGVybmV0VXJsXG59XG4iXX0=