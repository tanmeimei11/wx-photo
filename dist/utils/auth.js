'use strict';

var wxPromisify = require('./common.js').wxPromisify;

/**
 * 方法promise化
 */
var authPromisify = ['login', 'getUserInfo', 'authorize', 'getSetting', 'startRecord', 'stopRecord', 'showModal', 'openSetting'].reduce(function (acc, cur) {
  acc[cur] = wxPromisify(wx[cur]);

  return acc;
}, {
  wxPromisify: wxPromisify
});

/**
 *
 * @param {*} key  授权的信息
 * @param {*} isforce 强制授权会循环弹窗
 */
function get(key, isforce, gps) {
  var scope = 'scope.' + key;
  return new Promise(function (authRes, authRej) {
    authPromisify.getSetting().then(function (res) {
      console.log(res);
      if (res.authSetting[scope]) {
        authRes(true);
      } else {
        console.log(scope);
        authPromisify.authorize({
          scope: scope
        }).then(function (suc) {
          console.log('suc', suc);
          authRes(suc);
        }, function (rej) {
          console.log('rej', rej);
          reGet(scope, authRes, isforce, gps);
        });
      }
    });
  });
}

/**
 *
 * @param {*} scope 授权信息
 * @param {*} authRes 回调
 * @param {*} isforce 强制弹窗
 */
function reGet(scope, authRes, isforce, gps) {
  authPromisify.showModal({
    title: gps ? '请在设置中打开地理位置授权' : '请在设置中打开用户信息授权',
    content: gps ? '未获取您的地理位置将无法使用离我最近功能' : '未获取您的公开信息（昵称、头像等）将无法使用鼓励金和报名活动',
    confirmText: '去设置',
    showCancel: true
  }).then(function (a) {
    if (a.confirm) {
      authPromisify.openSetting().then(function (r) {
        console.log('r', r);
        authPromisify.getSetting().then(function (res) {
          console.log('res', res);
          if (r.authSetting[scope] || res.authSetting[scope]) {
            console.log('succ');
            authRes();
          } else {
            if (isforce) {
              setTimeout(function () {
                reGet(scope, authRes, isforce);
              }, 100);
            }
          }
        });
      });
    }
  });
}

module.exports = {
  get: get
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOlsid3hQcm9taXNpZnkiLCJyZXF1aXJlIiwiYXV0aFByb21pc2lmeSIsInJlZHVjZSIsImFjYyIsImN1ciIsInd4IiwiZ2V0Iiwia2V5IiwiaXNmb3JjZSIsImdwcyIsInNjb3BlIiwiUHJvbWlzZSIsImF1dGhSZXMiLCJhdXRoUmVqIiwiZ2V0U2V0dGluZyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiYXV0aFNldHRpbmciLCJhdXRob3JpemUiLCJzdWMiLCJyZWoiLCJyZUdldCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNvbmZpcm1UZXh0Iiwic2hvd0NhbmNlbCIsImEiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJyIiwic2V0VGltZW91dCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxhQUFSLEVBQXVCRCxXQUF6Qzs7QUFFQTs7O0FBR0EsSUFBSUUsZ0JBQWdCLENBQ2xCLE9BRGtCLEVBQ1QsYUFEUyxFQUNNLFdBRE4sRUFDbUIsWUFEbkIsRUFDaUMsYUFEakMsRUFDZ0QsWUFEaEQsRUFFbEIsV0FGa0IsRUFFTCxhQUZLLEVBR2xCQyxNQUhrQixDQUdYLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3JCRCxNQUFJQyxHQUFKLElBQVdMLFlBQVlNLEdBQUdELEdBQUgsQ0FBWixDQUFYOztBQUVBLFNBQU9ELEdBQVA7QUFDRCxDQVBtQixFQU9qQjtBQUNESixlQUFhQTtBQURaLENBUGlCLENBQXBCOztBQVdBOzs7OztBQUtBLFNBQVNPLEdBQVQsQ0FBYUMsR0FBYixFQUFrQkMsT0FBbEIsRUFBMkJDLEdBQTNCLEVBQWdDO0FBQzlCLE1BQUlDLFFBQVEsV0FBV0gsR0FBdkI7QUFDQSxTQUFPLElBQUlJLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBc0I7QUFDdkNaLGtCQUFjYSxVQUFkLEdBQTJCQyxJQUEzQixDQUFnQyxlQUFPO0FBQ3JDQyxjQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQSxVQUFJQSxJQUFJQyxXQUFKLENBQWdCVCxLQUFoQixDQUFKLEVBQTRCO0FBQzFCRSxnQkFBUSxJQUFSO0FBQ0QsT0FGRCxNQUVPO0FBQ0xJLGdCQUFRQyxHQUFSLENBQVlQLEtBQVo7QUFDQVQsc0JBQWNtQixTQUFkLENBQXdCO0FBQ3RCVixpQkFBT0E7QUFEZSxTQUF4QixFQUVHSyxJQUZILENBRVEsZUFBTztBQUNiQyxrQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBbUJJLEdBQW5CO0FBQ0FULGtCQUFRUyxHQUFSO0FBQ0QsU0FMRCxFQUtHLGVBQU87QUFDUkwsa0JBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CSyxHQUFuQjtBQUNBQyxnQkFBTWIsS0FBTixFQUFhRSxPQUFiLEVBQXNCSixPQUF0QixFQUErQkMsR0FBL0I7QUFDRCxTQVJEO0FBU0Q7QUFDRixLQWhCRDtBQWlCRCxHQWxCTSxDQUFQO0FBbUJEOztBQUVEOzs7Ozs7QUFNQSxTQUFTYyxLQUFULENBQWViLEtBQWYsRUFBc0JFLE9BQXRCLEVBQStCSixPQUEvQixFQUF3Q0MsR0FBeEMsRUFBNkM7QUFDM0NSLGdCQUFjdUIsU0FBZCxDQUF3QjtBQUN0QkMsV0FBT2hCLE1BQU0sZUFBTixHQUF3QixlQURUO0FBRXRCaUIsYUFBU2pCLE1BQU0sc0JBQU4sR0FBK0IsZ0NBRmxCO0FBR3RCa0IsaUJBQWEsS0FIUztBQUl0QkMsZ0JBQVk7QUFKVSxHQUF4QixFQUtHYixJQUxILENBS1EsVUFBQ2MsQ0FBRCxFQUFPO0FBQ2IsUUFBSUEsRUFBRUMsT0FBTixFQUFlO0FBQ2I3QixvQkFBYzhCLFdBQWQsR0FBNEJoQixJQUE1QixDQUFpQyxVQUFDaUIsQ0FBRCxFQUFPO0FBQ3RDaEIsZ0JBQVFDLEdBQVIsQ0FBWSxHQUFaLEVBQWlCZSxDQUFqQjtBQUNBL0Isc0JBQWNhLFVBQWQsR0FBMkJDLElBQTNCLENBQWdDLGVBQU87QUFDckNDLGtCQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQkMsR0FBbkI7QUFDQSxjQUFJYyxFQUFFYixXQUFGLENBQWNULEtBQWQsS0FBd0JRLElBQUlDLFdBQUosQ0FBZ0JULEtBQWhCLENBQTVCLEVBQW9EO0FBQ2xETSxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQUw7QUFDRCxXQUhELE1BR087QUFDTCxnQkFBSUosT0FBSixFQUFhO0FBQ1h5Qix5QkFBVyxZQUFNO0FBQ2ZWLHNCQUFNYixLQUFOLEVBQWFFLE9BQWIsRUFBc0JKLE9BQXRCO0FBQ0QsZUFGRCxFQUVHLEdBRkg7QUFHRDtBQUNGO0FBQ0YsU0FaRDtBQWFELE9BZkQ7QUFnQkQ7QUFDRixHQXhCRDtBQXlCRDs7QUFFRDBCLE9BQU9DLE9BQVAsR0FBaUI7QUFDZjdCO0FBRGUsQ0FBakIiLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB3eFByb21pc2lmeSA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJykud3hQcm9taXNpZnlcblxuLyoqXG4gKiDmlrnms5Vwcm9taXNl5YyWXG4gKi9cbnZhciBhdXRoUHJvbWlzaWZ5ID0gW1xuICAnbG9naW4nLCAnZ2V0VXNlckluZm8nLCAnYXV0aG9yaXplJywgJ2dldFNldHRpbmcnLCAnc3RhcnRSZWNvcmQnLCAnc3RvcFJlY29yZCcsXG4gICdzaG93TW9kYWwnLCAnb3BlblNldHRpbmcnXG5dLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcbiAgYWNjW2N1cl0gPSB3eFByb21pc2lmeSh3eFtjdXJdKVxuXG4gIHJldHVybiBhY2Ncbn0sIHtcbiAgd3hQcm9taXNpZnk6IHd4UHJvbWlzaWZ5XG59KVxuXG4vKipcbiAqXG4gKiBAcGFyYW0geyp9IGtleSAg5o6I5p2D55qE5L+h5oGvXG4gKiBAcGFyYW0geyp9IGlzZm9yY2Ug5by65Yi25o6I5p2D5Lya5b6q546v5by556qXXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGlzZm9yY2UsIGdwcykge1xuICB2YXIgc2NvcGUgPSAnc2NvcGUuJyArIGtleVxuICByZXR1cm4gbmV3IFByb21pc2UoKGF1dGhSZXMsIGF1dGhSZWopID0+IHtcbiAgICBhdXRoUHJvbWlzaWZ5LmdldFNldHRpbmcoKS50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmF1dGhTZXR0aW5nW3Njb3BlXSkge1xuICAgICAgICBhdXRoUmVzKHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhzY29wZSlcbiAgICAgICAgYXV0aFByb21pc2lmeS5hdXRob3JpemUoe1xuICAgICAgICAgIHNjb3BlOiBzY29wZVxuICAgICAgICB9KS50aGVuKHN1YyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N1YycsIHN1YylcbiAgICAgICAgICBhdXRoUmVzKHN1YylcbiAgICAgICAgfSwgcmVqID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncmVqJywgcmVqKVxuICAgICAgICAgIHJlR2V0KHNjb3BlLCBhdXRoUmVzLCBpc2ZvcmNlLCBncHMpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSBzY29wZSDmjojmnYPkv6Hmga9cbiAqIEBwYXJhbSB7Kn0gYXV0aFJlcyDlm57osINcbiAqIEBwYXJhbSB7Kn0gaXNmb3JjZSDlvLrliLblvLnnqpdcbiAqL1xuZnVuY3Rpb24gcmVHZXQoc2NvcGUsIGF1dGhSZXMsIGlzZm9yY2UsIGdwcykge1xuICBhdXRoUHJvbWlzaWZ5LnNob3dNb2RhbCh7XG4gICAgdGl0bGU6IGdwcyA/ICfor7flnKjorr7nva7kuK3miZPlvIDlnLDnkIbkvY3nva7mjojmnYMnIDogJ+ivt+WcqOiuvue9ruS4reaJk+W8gOeUqOaIt+S/oeaBr+aOiOadgycsXG4gICAgY29udGVudDogZ3BzID8gJ+acquiOt+WPluaCqOeahOWcsOeQhuS9jee9ruWwhuaXoOazleS9v+eUqOemu+aIkeacgOi/keWKn+iDvScgOiAn5pyq6I635Y+W5oKo55qE5YWs5byA5L+h5oGv77yI5pi156ew44CB5aS05YOP562J77yJ5bCG5peg5rOV5L2/55So6byT5Yqx6YeR5ZKM5oql5ZCN5rS75YqoJyxcbiAgICBjb25maXJtVGV4dDogJ+WOu+iuvue9ricsXG4gICAgc2hvd0NhbmNlbDogdHJ1ZVxuICB9KS50aGVuKChhKSA9PiB7XG4gICAgaWYgKGEuY29uZmlybSkge1xuICAgICAgYXV0aFByb21pc2lmeS5vcGVuU2V0dGluZygpLnRoZW4oKHIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3InLCByKVxuICAgICAgICBhdXRoUHJvbWlzaWZ5LmdldFNldHRpbmcoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlcycsIHJlcylcbiAgICAgICAgICBpZiAoci5hdXRoU2V0dGluZ1tzY29wZV0gfHwgcmVzLmF1dGhTZXR0aW5nW3Njb3BlXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2MnKVxuICAgICAgICAgICAgYXV0aFJlcygpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc2ZvcmNlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlR2V0KHNjb3BlLCBhdXRoUmVzLCBpc2ZvcmNlKVxuICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRcbn1cbiJdfQ==