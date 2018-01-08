"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 封装wxPromisefy
 */
var wxPromisify = function wxPromisify(fn) {
  return function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isNotCheck = arguments[1];

    return new Promise(function (resolve, reject) {
      obj.isNotCheck = isNotCheck;
      obj.success = function (res) {
        if (res.data) {
          resolve(res.data);
        }
        resolve(res);
      };
      obj.fail = function (res) {
        reject(res);
      };
      fn(obj);
    });
  };
};
exports.wxPromisify = wxPromisify;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJ3eFByb21pc2lmeSIsImZuIiwib2JqIiwiaXNOb3RDaGVjayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7QUFHQSxJQUFJQSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsRUFBRCxFQUFRO0FBQ3hCLFNBQU8sWUFBZ0M7QUFBQSxRQUF0QkMsR0FBc0IsdUVBQWhCLEVBQWdCO0FBQUEsUUFBWkMsVUFBWTs7QUFDckMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDSixVQUFJQyxVQUFKLEdBQWlCQSxVQUFqQjtBQUNBRCxVQUFJSyxPQUFKLEdBQWMsVUFBVUMsR0FBVixFQUFlO0FBQzNCLFlBQUlBLElBQUlDLElBQVIsRUFBYztBQUNaSixrQkFBUUcsSUFBSUMsSUFBWjtBQUNEO0FBQ0RKLGdCQUFRRyxHQUFSO0FBQ0QsT0FMRDtBQU1BTixVQUFJUSxJQUFKLEdBQVcsVUFBVUYsR0FBVixFQUFlO0FBQ3hCRixlQUFPRSxHQUFQO0FBQ0QsT0FGRDtBQUdBUCxTQUFHQyxHQUFIO0FBQ0QsS0FaTSxDQUFQO0FBYUQsR0FkRDtBQWVELENBaEJEO1FBa0JFRixXLEdBQUFBLFciLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlsIHoo4V3eFByb21pc2VmeVxuICovXG52YXIgd3hQcm9taXNpZnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSwgaXNOb3RDaGVjaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvYmouaXNOb3RDaGVjayA9IGlzTm90Q2hlY2tcbiAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfVxuICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlamVjdChyZXMpXG4gICAgICB9XG4gICAgICBmbihvYmopXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IHtcbiAgd3hQcm9taXNpZnlcbn1cbiJdfQ==