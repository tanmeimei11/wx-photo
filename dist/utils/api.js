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
            wx.showToast({
              title: '下载成功',
              duration: 2000,
              mask: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRJbWFnZVRvUWluaXUiLCJmaWxlIiwid3giLCJyZXF1ZXN0IiwidXJsIiwidG9rZW5SZXMiLCJ1cGxvYWREYXRhIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJrZXkiLCJkYXRhIiwidG9rZW4iLCJ1cGxvYWRGaWxlIiwidXBsb2FkUmVzIiwiX3JlcyIsIkpTT04iLCJwYXJzZSIsImhhc2giLCJkb3duSW50ZXJuZXRVcmwiLCJ1cmxzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJfbGVuIiwibGVuZ3RoIiwiaSIsImRvd25TaWdsZVVybCIsImhpZGVMb2FkaW5nIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJhdXRob3JpemUiLCJzY29wZSIsImRvd25sb2FkRmlsZSIsIl9kb3duUmVzIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsInRlbXBGaWxlUGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBR0E7Ozs7QUFNQTs7OztBQUlBLElBQU1BO0FBQUEscUVBQXFCLGlCQUFNQyxJQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNKLHlCQUFZQyxHQUFHQyxPQUFmLEVBQXdCO0FBQzNDQztBQUQyQyxhQUF4QixDQURJOztBQUFBO0FBQ3JCQyxvQkFEcUI7QUFLckJDLHNCQUxxQixHQUtSO0FBQ2ZGLHNDQURlO0FBRWZHLHdCQUFVTixJQUZLO0FBR2ZPLG9CQUFNLE1BSFM7QUFJZkMsd0JBQVU7QUFDUkMscUJBQUtMLFNBQVNNLElBQVQsQ0FBY0QsR0FEWDtBQUVSRSx1QkFBT1AsU0FBU00sSUFBVCxDQUFjQztBQUZiO0FBSkssYUFMUTtBQUFBO0FBQUEsbUJBY0gseUJBQVlWLEdBQUdXLFVBQWYsRUFBMkJQLFVBQTNCLENBZEc7O0FBQUE7QUFjckJRLHFCQWRxQjtBQWVyQkMsZ0JBZnFCLEdBZWRDLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQWZjO0FBQUEsNkNBZ0JsQjtBQUNMO0FBQ0FJLG9CQUFNSCxLQUFLRyxJQUZOO0FBR0xSLG1CQUFLSyxLQUFLTDtBQUhMLGFBaEJrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXVCQTs7OztBQUlBLElBQU1TO0FBQUEsc0VBQWtCLGtCQUFnQkMsSUFBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN0QmxCLGVBQUdtQixXQUFILENBQWU7QUFDYkMscUJBQU8sTUFETTtBQUViQyxvQkFBTTtBQUZPLGFBQWY7QUFJQSxnQkFBSSxPQUFPSCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxxQkFBTyxDQUFDQSxJQUFELENBQVA7QUFDRDtBQUNHSSxnQkFSa0IsR0FRWEosS0FBS0ssTUFSTTtBQVNiQyxhQVRhLEdBU1QsQ0FUUzs7QUFBQTtBQUFBLGtCQVNOQSxJQUFJRixJQVRFO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBVWRHLGFBQWFQLEtBQUtNLENBQUwsQ0FBYixDQVZjOztBQUFBO0FBU0lBLGVBVEo7QUFBQTtBQUFBOztBQUFBO0FBWXRCeEIsZUFBRzBCLFdBQUg7QUFDQTFCLGVBQUcyQixTQUFILENBQWE7QUFDWFAscUJBQU8sTUFESTtBQUVYUSx3QkFBVSxJQUZDO0FBR1hQLG9CQUFNO0FBSEssYUFBYjs7QUFic0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBbEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFvQkE7OztBQUdBLElBQU1JO0FBQUEsc0VBQWUsa0JBQWdCdkIsR0FBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFWCx5QkFBWUYsR0FBRzZCLFNBQWYsRUFBMEI7QUFDOUJDLHFCQUFPO0FBRHVCLGFBQTFCLENBRlc7O0FBQUE7QUFBQTtBQUFBLG1CQUtJLHlCQUFZOUIsR0FBRytCLFlBQWYsRUFBNkI7QUFDaEQ3QixtQkFBS0E7QUFEMkMsYUFBN0IsQ0FMSjs7QUFBQTtBQUtiOEIsb0JBTGE7QUFBQTtBQUFBLG1CQVFYLHlCQUFZaEMsR0FBR2lDLHNCQUFmLEVBQXVDO0FBQzNDNUIsd0JBQVUyQixTQUFTRTtBQUR3QixhQUF2QyxDQVJXOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWNBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Z0Qyx3Q0FEZTtBQUVmbUI7QUFGZSxDQUFqQiIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB3eFByb21pc2lmeVxufSBmcm9tICcuL2NvbW1vbi5qcydcbmltcG9ydCB7XG4gIHFuVG9rZW5VcmwsXG4gIHFuVXBsb2FkVXJsXG4gIC8vIHFuUmVzVXJsXG59IGZyb20gJy4vY29uZmlnJ1xuXG4vKipcbiAqIOS4iuS8oOaWh+S7tuWIsOS4g+eJm1xuICogQHBhcmFtIHsqfSBmaWxlXG4gKi9cbmNvbnN0IHVwbG9hZEltYWdlVG9RaW5pdSA9IGFzeW5jIGZpbGUgPT4ge1xuICB2YXIgdG9rZW5SZXMgPSBhd2FpdCB3eFByb21pc2lmeSh3eC5yZXF1ZXN0KSh7XG4gICAgdXJsOiBxblRva2VuVXJsXG4gIH0pXG5cbiAgdmFyIHVwbG9hZERhdGEgPSB7XG4gICAgdXJsOiBxblVwbG9hZFVybCxcbiAgICBmaWxlUGF0aDogZmlsZSxcbiAgICBuYW1lOiAnZmlsZScsXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGtleTogdG9rZW5SZXMuZGF0YS5rZXksXG4gICAgICB0b2tlbjogdG9rZW5SZXMuZGF0YS50b2tlblxuICAgIH1cbiAgfVxuICB2YXIgdXBsb2FkUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3gudXBsb2FkRmlsZSkodXBsb2FkRGF0YSlcbiAgdmFyIF9yZXMgPSBKU09OLnBhcnNlKHVwbG9hZFJlcylcbiAgcmV0dXJuIHtcbiAgICAvLyB1cmw6IGAke3FuUmVzVXJsfSR7cmVzLmtleX1gLFxuICAgIGhhc2g6IF9yZXMuaGFzaCxcbiAgICBrZXk6IF9yZXMua2V5XG4gIH1cbn1cblxuLyoqXG4gKiDkuIvovb3lpJrlvKDlm75cbiAqIEBwYXJhbSB7Kn0gdXJsXG4gKi9cbmNvbnN0IGRvd25JbnRlcm5ldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmxzKSB7XG4gIHd4LnNob3dMb2FkaW5nKHtcbiAgICB0aXRsZTogJ+ato+WcqOS4i+i9vScsXG4gICAgbWFzazogdHJ1ZVxuICB9KVxuICBpZiAodHlwZW9mIHVybHMgPT09ICdzdHJpbmcnKSB7XG4gICAgdXJscyA9IFt1cmxzXVxuICB9XG4gIHZhciBfbGVuID0gdXJscy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICBhd2FpdCBkb3duU2lnbGVVcmwodXJsc1tpXSlcbiAgfVxuICB3eC5oaWRlTG9hZGluZygpXG4gIHd4LnNob3dUb2FzdCh7XG4gICAgdGl0bGU6ICfkuIvovb3miJDlip8nLFxuICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgIG1hc2s6IHRydWVcbiAgfSlcbn1cblxuLyoqXG4gKiDkuIvovb1cbiAqL1xuY29uc3QgZG93blNpZ2xlVXJsID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xuICB0cnkge1xuICAgIGF3YWl0IHd4UHJvbWlzaWZ5KHd4LmF1dGhvcml6ZSkoe1xuICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJ1xuICAgIH0pXG4gICAgdmFyIF9kb3duUmVzID0gYXdhaXQgd3hQcm9taXNpZnkod3guZG93bmxvYWRGaWxlKSh7XG4gICAgICB1cmw6IHVybFxuICAgIH0pXG4gICAgYXdhaXQgd3hQcm9taXNpZnkod3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSkoe1xuICAgICAgZmlsZVBhdGg6IF9kb3duUmVzLnRlbXBGaWxlUGF0aFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB1cGxvYWRJbWFnZVRvUWluaXUsXG4gIGRvd25JbnRlcm5ldFVybFxufVxuIl19