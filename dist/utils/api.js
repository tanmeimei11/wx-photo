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
            _context.prev = 0;
            _context.next = 3;
            return _wepy2.default.request({
              url: _config.qnTokenUrl
            });

          case 3:
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
            _context.next = 7;
            return (0, _common.wxPromisify)(wx.uploadFile)(uploadData);

          case 7:
            uploadRes = _context.sent;
            _res = JSON.parse(uploadRes);

            console.log(_res);
            return _context.abrupt('return', {
              // url: `${qnResUrl}${res.key}`,
              hash: _res.hash,
              key: _res.key
            });

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 13]]);
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

  return function downInternetUrl(_x2) {
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

  return function downSigleUrl(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  uploadImageToQiniu: uploadImageToQiniu,
  downInternetUrl: downInternetUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwicmVxdWVzdCIsInVybCIsInRva2VuUmVzIiwidXBsb2FkRGF0YSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwia2V5IiwiZGF0YSIsInRva2VuIiwid3giLCJ1cGxvYWRGaWxlIiwidXBsb2FkUmVzIiwiX3JlcyIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJoYXNoIiwiRXJyb3IiLCJkb3duSW50ZXJuZXRVcmwiLCJ1cmxzIiwiX2xlbiIsImxlbmd0aCIsImkiLCJkb3duU2lnbGVVcmwiLCJhdXRob3JpemUiLCJzY29wZSIsIm0iLCJkb3dubG9hZEZpbGUiLCJfZG93blJlcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJ0ZW1wRmlsZVBhdGgiLCJrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFHQTs7QUFLQTs7Ozs7Ozs7QUFDQTs7OztBQUlBLElBQU1BO0FBQUEscUVBQXFCLGlCQUFNQyxJQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUYsZUFBS0MsT0FBTCxDQUFhO0FBQ2hDQztBQURnQyxhQUFiLENBRkU7O0FBQUE7QUFFbkJDLG9CQUZtQjtBQU1uQkMsc0JBTm1CLEdBTU47QUFDZkYsc0NBRGU7QUFFZkcsd0JBQVVMLElBRks7QUFHZk0sb0JBQU0sTUFIUztBQUlmQyx3QkFBVTtBQUNSQyxxQkFBS0wsU0FBU00sSUFBVCxDQUFjQSxJQUFkLENBQW1CRCxHQURoQjtBQUVSRSx1QkFBT1AsU0FBU00sSUFBVCxDQUFjQSxJQUFkLENBQW1CQztBQUZsQjtBQUpLLGFBTk07QUFBQTtBQUFBLG1CQWVELHlCQUFZQyxHQUFHQyxVQUFmLEVBQTJCUixVQUEzQixDQWZDOztBQUFBO0FBZW5CUyxxQkFmbUI7QUFnQm5CQyxnQkFoQm1CLEdBZ0JaQyxLQUFLQyxLQUFMLENBQVdILFNBQVgsQ0FoQlk7O0FBaUJ2Qkksb0JBQVFDLEdBQVIsQ0FBWUosSUFBWjtBQWpCdUIsNkNBa0JoQjtBQUNMO0FBQ0FLLG9CQUFNTCxLQUFLSyxJQUZOO0FBR0xYLG1CQUFLTSxLQUFLTjtBQUhMLGFBbEJnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkF3QmpCLElBQUlZLEtBQUosYUF4QmlCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBNEJBOzs7O0FBSUEsSUFBTUM7QUFBQSxzRUFBa0Isa0JBQWdCQyxJQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRXBCLGdCQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJBLHFCQUFPLENBQUNBLElBQUQsQ0FBUDtBQUNEO0FBQ0dDLGdCQUxnQixHQUtURCxLQUFLRSxNQUxJO0FBTVhDLGFBTlcsR0FNUCxDQU5POztBQUFBO0FBQUEsa0JBTUpBLElBQUlGLElBTkE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFPWkcsYUFBYUosS0FBS0csQ0FBTCxDQUFiLENBUFk7O0FBQUE7QUFNTUEsZUFOTjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVVkLElBQUlMLEtBQUosRUFWYzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFsQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWNBOzs7QUFHQSxJQUFNTTtBQUFBLHNFQUFlLGtCQUFnQnhCLEdBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUgsZUFBS3lCLFNBQUwsQ0FBZTtBQUMzQkMscUJBQU87QUFEb0IsYUFBZixDQUZHOztBQUFBO0FBRWJDLGFBRmE7QUFBQTtBQUFBLG1CQUtJLGVBQUtDLFlBQUwsQ0FBa0I7QUFDckM1QixtQkFBS0E7QUFEZ0MsYUFBbEIsQ0FMSjs7QUFBQTtBQUtiNkIsb0JBTGE7QUFBQTtBQUFBLG1CQVFILGVBQUtDLHNCQUFMLENBQTRCO0FBQ3hDM0Isd0JBQVUwQixTQUFTRTtBQURxQixhQUE1QixDQVJHOztBQUFBO0FBUWJDLGFBUmE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVlYLElBQUlkLEtBQUosRUFaVzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBZ0JBZSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZyQyx3Q0FEZTtBQUVmc0I7QUFGZSxDQUFqQiIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB3eFByb21pc2lmeVxufSBmcm9tICcuL2NvbW1vbi5qcydcbmltcG9ydCB7XG4gIHFuVG9rZW5VcmwsXG4gIHFuVXBsb2FkVXJsXG4gIC8vIHFuUmVzVXJsXG59IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbi8qKlxuICog5LiK5Lyg5paH5Lu25Yiw5LiD54mbXG4gKiBAcGFyYW0geyp9IGZpbGVcbiAqL1xuY29uc3QgdXBsb2FkSW1hZ2VUb1Fpbml1ID0gYXN5bmMgZmlsZSA9PiB7XG4gIHRyeSB7XG4gICAgdmFyIHRva2VuUmVzID0gYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogcW5Ub2tlblVybFxuICAgIH0pXG5cbiAgICB2YXIgdXBsb2FkRGF0YSA9IHtcbiAgICAgIHVybDogcW5VcGxvYWRVcmwsXG4gICAgICBmaWxlUGF0aDogZmlsZSxcbiAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgIGtleTogdG9rZW5SZXMuZGF0YS5kYXRhLmtleSxcbiAgICAgICAgdG9rZW46IHRva2VuUmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdXBsb2FkUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3gudXBsb2FkRmlsZSkodXBsb2FkRGF0YSlcbiAgICB2YXIgX3JlcyA9IEpTT04ucGFyc2UodXBsb2FkUmVzKVxuICAgIGNvbnNvbGUubG9nKF9yZXMpXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIHVybDogYCR7cW5SZXNVcmx9JHtyZXMua2V5fWAsXG4gICAgICBoYXNoOiBfcmVzLmhhc2gsXG4gICAgICBrZXk6IF9yZXMua2V5XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGUpXG4gIH1cbn1cblxuLyoqXG4gKiDkuIvovb3lpJrlvKDlm75cbiAqIEBwYXJhbSB7Kn0gdXJsXG4gKi9cbmNvbnN0IGRvd25JbnRlcm5ldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmxzKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykge1xuICAgICAgdXJscyA9IFt1cmxzXVxuICAgIH1cbiAgICB2YXIgX2xlbiA9IHVybHMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgIGF3YWl0IGRvd25TaWdsZVVybCh1cmxzW2ldKVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpXG4gIH1cbn1cblxuLyoqXG4gKiDkuIvovb1cbiAqL1xuY29uc3QgZG93blNpZ2xlVXJsID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xuICB0cnkge1xuICAgIHZhciBtID0gYXdhaXQgd2VweS5hdXRob3JpemUoe1xuICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJ1xuICAgIH0pXG4gICAgdmFyIF9kb3duUmVzID0gYXdhaXQgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiB1cmxcbiAgICB9KVxuICAgIHZhciBrID0gYXdhaXQgd2VweS5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgIGZpbGVQYXRoOiBfZG93blJlcy50ZW1wRmlsZVBhdGhcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXBsb2FkSW1hZ2VUb1Fpbml1LFxuICBkb3duSW50ZXJuZXRVcmxcbn1cbiJdfQ==