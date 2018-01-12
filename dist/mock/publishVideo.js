'use strict';

module.exports = {
  data: {
    'succ': true,
    'code': '0',
    'data': {
      'photo_info': {
        is_zan: false, // 是否点赞
        photo_id: '1123244', // 图片id
        fmt_time: '刚刚', // 发图距离现在时间
        has_auth: true, // 是否有权限
        photos: [{
          url: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }],
        user: {
          name: '想想',
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283' // 图片作者id
        },
        zan_list: []
      }
    },
    'msg': '',
    'time': '1433155969'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hWaWRlby5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZGF0YSIsImlzX3phbiIsInBob3RvX2lkIiwiZm10X3RpbWUiLCJoYXNfYXV0aCIsInBob3RvcyIsInVybCIsIm9yaWdpbl91cmwiLCJhbGJ1bV9pZCIsInVzZXIiLCJuYW1lIiwiYXZhdGFyIiwidXNlcl9pZCIsInphbl9saXN0Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSixZQUFRLElBREo7QUFFSixZQUFRLEdBRko7QUFHSixZQUFRO0FBQ04sb0JBQWM7QUFDWkMsZ0JBQVEsS0FESSxFQUNHO0FBQ2ZDLGtCQUFVLFNBRkUsRUFFUztBQUNyQkMsa0JBQVUsSUFIRSxFQUdJO0FBQ2hCQyxrQkFBVSxJQUpFLEVBSUk7QUFDaEJDLGdCQUFRLENBQUM7QUFDUEMsZUFBSyw0SUFERSxFQUM0STtBQUNuSkMsc0JBQVksc0dBRkwsRUFFNkc7QUFDcEhMLG9CQUFVLFNBSEgsRUFHYztBQUNyQk0sb0JBQVUsTUFKSCxDQUlVO0FBSlYsU0FBRCxDQUxJO0FBV1pDLGNBQU07QUFDSkMsZ0JBQU0sSUFERjtBQUVKQyxrQkFBUSw0SUFGSjtBQUdKQyxtQkFBUyxNQUhMLENBR1k7QUFIWixTQVhNO0FBZ0JaQyxrQkFBVTtBQWhCRTtBQURSLEtBSEo7QUF1QkosV0FBTyxFQXZCSDtBQXdCSixZQUFRO0FBeEJKO0FBRFMsQ0FBakIiLCJmaWxlIjoicHVibGlzaFZpZGVvLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRhdGE6IHtcbiAgICAnc3VjYyc6IHRydWUsXG4gICAgJ2NvZGUnOiAnMCcsXG4gICAgJ2RhdGEnOiB7XG4gICAgICAncGhvdG9faW5mbyc6IHtcbiAgICAgICAgaXNfemFuOiBmYWxzZSwgLy8g5piv5ZCm54K56LWeXG4gICAgICAgIHBob3RvX2lkOiAnMTEyMzI0NCcsIC8vIOWbvueJh2lkXG4gICAgICAgIGZtdF90aW1lOiAn5Yia5YiaJywgLy8g5Y+R5Zu+6Led56a7546w5Zyo5pe26Ze0XG4gICAgICAgIGhhc19hdXRoOiB0cnVlLCAvLyDmmK/lkKbmnInmnYPpmZBcbiAgICAgICAgcGhvdG9zOiBbe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9pbmltZzAyLmppdXlhbi5pbmZvL2luLzIwMTYvMTIvMDEvMzJBRUQ2MTAtMTRERC02OEY4LUFBRjItMTIzQkVFMjRDRkZDLTFFSnFyLmpwZz9pbWFnZU1vZ3IyL2Zvcm1hdC9qcGcvdGh1bWJuYWlsLzUweCUzRS9xdWFsaXR5LzkwIScsIC8vIOeUqOS6juWxleekuueahOWbvueJh+WIl+ihqFxuICAgICAgICAgIG9yaWdpbl91cmw6ICdodHRwczovL2luaW1nMDcuaml1eWFuLmluZm8vYVc0dk1qQXhOeTh4TUM4eU5pODVOVVExUkRrMk5TMUZNakUxTFRZd1JFUXRRa0l4UlMwd1FrWXhRamxET1RVeE0wUXVhbkJuJywgLy8g5Y6f5Zu+XG4gICAgICAgICAgcGhvdG9faWQ6ICcxMTIzMjQ0JywgLy8g5Zu+54mHaWRcbiAgICAgICAgICBhbGJ1bV9pZDogJzIyMzMnIC8vIOWkmuWbvuebuOeJh+S4reafkOW8oOWbvueJh+eahGlkXG4gICAgICAgIH1dLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgbmFtZTogJ+aDs+aDsycsXG4gICAgICAgICAgYXZhdGFyOiAnaHR0cDovL2luaW1nMDIuaml1eWFuLmluZm8vaW4vMjAxNi8xMi8wMS8zMkFFRDYxMC0xNERELTY4RjgtQUFGMi0xMjNCRUUyNENGRkMtMUVKcXIuanBnP2ltYWdlTW9ncjIvZm9ybWF0L2pwZy90aHVtYm5haWwvNTB4JTNFL3F1YWxpdHkvOTAhJyxcbiAgICAgICAgICB1c2VyX2lkOiAnMTI4MycgLy8g5Zu+54mH5L2c6ICFaWRcbiAgICAgICAgfSxcbiAgICAgICAgemFuX2xpc3Q6IFtdXG4gICAgICB9XG4gICAgfSxcbiAgICAnbXNnJzogJycsXG4gICAgJ3RpbWUnOiAnMTQzMzE1NTk2OSdcbiAgfVxufVxuIl19