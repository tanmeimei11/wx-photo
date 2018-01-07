'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./config.js');

var _common = require('./common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 上传文件到七牛
 * @param {*} file
 */
var uploadImageToQiniu = function uploadImageToQiniu(file) {
  return (0, _common.wxPromisify)(wx.request)({
    url: _config.qnTokenUrl
  }).then(function (res) {
    var data = {
      file: file,
      token: res.data.token,
      key: res.data.key
    };
    var uploadData = {
      url: _config.qnUploadUrl,
      filePath: data.file,
      name: 'file',
      formData: {
        key: data.key,
        token: data.token
      }
    };
    return (0, _common.wxPromisify)(wx.uploadFile)(uploadData);
  }).then(function (res) {
    res = JSON.parse(res);
    // console.log(`${qnResUrl}${res.key}`)
    return {
      // url: `${qnResUrl}${res.key}`,
      hash: res.hash,
      key: res.key
    };
  });
};

/**
 * 下载多张图
 * @param {*} url
 */
var downInternetUrl = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urls) {
    var _len, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return downSigleUrl(urls[i]);

          case 7:
            i++;
            _context.next = 4;
            break;

          case 10:
            wx.hideLoading();
            wx.showToast({
              title: '下载成功',
              duration: 2000
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function downInternetUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 下载
 */
var downSigleUrl = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var _downRes;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _common.wxPromisify)(wx.authorize)({
              scope: 'scope.writePhotosAlbum'
            });

          case 3:
            _context2.next = 5;
            return (0, _common.wxPromisify)(wx.downloadFile)({
              url: url
            });

          case 5:
            _downRes = _context2.sent;
            _context2.next = 8;
            return (0, _common.wxPromisify)(wx.saveImageToPhotosAlbum)({
              filePath: _downRes.tempFilePath
            });

          case 8:
            _context2.next = 12;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 10]]);
  }));

  return function downSigleUrl(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  uploadImageToQiniu: uploadImageToQiniu,
  downInternetUrl: downInternetUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwid3giLCJyZXF1ZXN0IiwidXJsIiwidGhlbiIsImRhdGEiLCJ0b2tlbiIsInJlcyIsImtleSIsInVwbG9hZERhdGEiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsInVwbG9hZEZpbGUiLCJKU09OIiwicGFyc2UiLCJoYXNoIiwiZG93bkludGVybmV0VXJsIiwidXJscyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJfbGVuIiwibGVuZ3RoIiwiaSIsImRvd25TaWdsZVVybCIsImhpZGVMb2FkaW5nIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJhdXRob3JpemUiLCJzY29wZSIsImRvd25sb2FkRmlsZSIsIl9kb3duUmVzIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsInRlbXBGaWxlUGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFLQTs7Ozs7O0FBSUE7Ozs7QUFJQSxJQUFNQSxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxJQUFELEVBQVU7QUFDbkMsU0FBTyx5QkFBWUMsR0FBR0MsT0FBZixFQUF3QjtBQUM3QkM7QUFENkIsR0FBeEIsRUFFSkMsSUFGSSxDQUVDLGVBQU87QUFDYixRQUFJQyxPQUFPO0FBQ1RMLFlBQU1BLElBREc7QUFFVE0sYUFBT0MsSUFBSUYsSUFBSixDQUFTQyxLQUZQO0FBR1RFLFdBQUtELElBQUlGLElBQUosQ0FBU0c7QUFITCxLQUFYO0FBS0EsUUFBSUMsYUFBYTtBQUNmTiw4QkFEZTtBQUVmTyxnQkFBVUwsS0FBS0wsSUFGQTtBQUdmVyxZQUFNLE1BSFM7QUFJZkMsZ0JBQVU7QUFDUkosYUFBS0gsS0FBS0csR0FERjtBQUVSRixlQUFPRCxLQUFLQztBQUZKO0FBSkssS0FBakI7QUFTQSxXQUFPLHlCQUFZTCxHQUFHWSxVQUFmLEVBQTJCSixVQUEzQixDQUFQO0FBQ0QsR0FsQk0sRUFrQkpMLElBbEJJLENBa0JDLGVBQU87QUFDYkcsVUFBTU8sS0FBS0MsS0FBTCxDQUFXUixHQUFYLENBQU47QUFDQTtBQUNBLFdBQU87QUFDTDtBQUNBUyxZQUFNVCxJQUFJUyxJQUZMO0FBR0xSLFdBQUtELElBQUlDO0FBSEosS0FBUDtBQUtELEdBMUJNLENBQVA7QUEyQkQsQ0E1QkQ7O0FBOEJBOzs7O0FBSUEsSUFBTVM7QUFBQSxxRUFBa0IsaUJBQWdCQyxJQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCakIsZUFBR2tCLFdBQUgsQ0FBZTtBQUNiQyxxQkFBTztBQURNLGFBQWY7QUFHQSxnQkFBSSxPQUFPRixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxxQkFBTyxDQUFDQSxJQUFELENBQVA7QUFDRDtBQUNHRyxnQkFQa0IsR0FPWEgsS0FBS0ksTUFQTTtBQVFiQyxhQVJhLEdBUVQsQ0FSUzs7QUFBQTtBQUFBLGtCQVFOQSxJQUFJRixJQVJFO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBU2RHLGFBQWFOLEtBQUtLLENBQUwsQ0FBYixDQVRjOztBQUFBO0FBUUlBLGVBUko7QUFBQTtBQUFBOztBQUFBO0FBV3RCdEIsZUFBR3dCLFdBQUg7QUFDQXhCLGVBQUd5QixTQUFILENBQWE7QUFDWE4scUJBQU8sTUFESTtBQUVYTyx3QkFBVTtBQUZDLGFBQWI7O0FBWnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBa0JBOzs7QUFHQSxJQUFNSDtBQUFBLHNFQUFlLGtCQUFnQnJCLEdBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVgseUJBQVlGLEdBQUcyQixTQUFmLEVBQTBCO0FBQzlCQyxxQkFBTztBQUR1QixhQUExQixDQUZXOztBQUFBO0FBQUE7QUFBQSxtQkFLSSx5QkFBWTVCLEdBQUc2QixZQUFmLEVBQTZCO0FBQ2hEM0IsbUJBQUtBO0FBRDJDLGFBQTdCLENBTEo7O0FBQUE7QUFLYjRCLG9CQUxhO0FBQUE7QUFBQSxtQkFRWCx5QkFBWTlCLEdBQUcrQixzQkFBZixFQUF1QztBQUMzQ3RCLHdCQUFVcUIsU0FBU0U7QUFEd0IsYUFBdkMsQ0FSVzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFjQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmcEMsd0NBRGU7QUFFZmtCO0FBRmUsQ0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7XG4gIHFuVG9rZW5VcmwsXG4gIHFuVXBsb2FkVXJsLFxuICBxblJlc1VybFxufSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7XG4gIHd4UHJvbWlzaWZ5XG59IGZyb20gJy4vY29tbW9uJ1xuXG4vKipcbiAqIOS4iuS8oOaWh+S7tuWIsOS4g+eJm1xuICogQHBhcmFtIHsqfSBmaWxlXG4gKi9cbmNvbnN0IHVwbG9hZEltYWdlVG9RaW5pdSA9IChmaWxlKSA9PiB7XG4gIHJldHVybiB3eFByb21pc2lmeSh3eC5yZXF1ZXN0KSh7XG4gICAgdXJsOiBxblRva2VuVXJsXG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGZpbGU6IGZpbGUsXG4gICAgICB0b2tlbjogcmVzLmRhdGEudG9rZW4sXG4gICAgICBrZXk6IHJlcy5kYXRhLmtleVxuICAgIH1cbiAgICB2YXIgdXBsb2FkRGF0YSA9IHtcbiAgICAgIHVybDogcW5VcGxvYWRVcmwsXG4gICAgICBmaWxlUGF0aDogZGF0YS5maWxlLFxuICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgdG9rZW46IGRhdGEudG9rZW5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHd4UHJvbWlzaWZ5KHd4LnVwbG9hZEZpbGUpKHVwbG9hZERhdGEpXG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICByZXMgPSBKU09OLnBhcnNlKHJlcylcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtxblJlc1VybH0ke3Jlcy5rZXl9YClcbiAgICByZXR1cm4ge1xuICAgICAgLy8gdXJsOiBgJHtxblJlc1VybH0ke3Jlcy5rZXl9YCxcbiAgICAgIGhhc2g6IHJlcy5oYXNoLFxuICAgICAga2V5OiByZXMua2V5XG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIOS4i+i9veWkmuW8oOWbvlxuICogQHBhcmFtIHsqfSB1cmxcbiAqL1xuY29uc3QgZG93bkludGVybmV0VXJsID0gYXN5bmMgZnVuY3Rpb24gKHVybHMpIHtcbiAgd3guc2hvd0xvYWRpbmcoe1xuICAgIHRpdGxlOiAn5q2j5Zyo5LiL6L29J1xuICB9KVxuICBpZiAodHlwZW9mIHVybHMgPT09ICdzdHJpbmcnKSB7XG4gICAgdXJscyA9IFt1cmxzXVxuICB9XG4gIHZhciBfbGVuID0gdXJscy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICBhd2FpdCBkb3duU2lnbGVVcmwodXJsc1tpXSlcbiAgfVxuICB3eC5oaWRlTG9hZGluZygpXG4gIHd4LnNob3dUb2FzdCh7XG4gICAgdGl0bGU6ICfkuIvovb3miJDlip8nLFxuICAgIGR1cmF0aW9uOiAyMDAwXG4gIH0pXG59XG5cbi8qKlxuICog5LiL6L29XG4gKi9cbmNvbnN0IGRvd25TaWdsZVVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB3eFByb21pc2lmeSh3eC5hdXRob3JpemUpKHtcbiAgICAgIHNjb3BlOiAnc2NvcGUud3JpdGVQaG90b3NBbGJ1bSdcbiAgICB9KVxuICAgIHZhciBfZG93blJlcyA9IGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmRvd25sb2FkRmlsZSkoe1xuICAgICAgdXJsOiB1cmxcbiAgICB9KVxuICAgIGF3YWl0IHd4UHJvbWlzaWZ5KHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0pKHtcbiAgICAgIGZpbGVQYXRoOiBfZG93blJlcy50ZW1wRmlsZVBhdGhcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXBsb2FkSW1hZ2VUb1Fpbml1LFxuICBkb3duSW50ZXJuZXRVcmxcbn1cbiJdfQ==