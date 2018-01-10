'use strict';

module.exports = {
  data: {
    msg: '',
    code: '200003',
    data: {
      can_publish: true, // 是否照片有发布权限
      can_view_photo: true, // 是否能浏览图片
      publish_txt: '您没有该相册的权限，无法发布图片', // can_publish为false的情况下的提示文案
      can_modify_info: true, // 是否有修改相册权限
      gallery_name: '默认相册',
      group_info: {
        group_id: 11, // 群ID
        group_master_name: '群主',
        group_master_avatar: 'http://inimg02.jiuyan.info/in/2017/12/06/267B9C9E-6B01-FE2F-4B7A-8783B402C622.png'
      },
      toast_info: {
        avatar: 'http://inimg02.jiuyan.info/in/2017/10/12/3094CFE5-3ADE-33D0-9C16-6EE372A0015D.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
        inviter_name: '后知也是一休',
        invite_action: '邀请你',
        txt: '大家快来上传活动照片啦，没人都能免费打印12张照片',
        is_show: true // 是否展示
      }
    },
    succ: true,
    timestamp: '1515046666'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnlJbmZvLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhIiwibXNnIiwiY29kZSIsImNhbl9wdWJsaXNoIiwiY2FuX3ZpZXdfcGhvdG8iLCJwdWJsaXNoX3R4dCIsImNhbl9tb2RpZnlfaW5mbyIsImdhbGxlcnlfbmFtZSIsImdyb3VwX2luZm8iLCJncm91cF9pZCIsImdyb3VwX21hc3Rlcl9uYW1lIiwiZ3JvdXBfbWFzdGVyX2F2YXRhciIsInRvYXN0X2luZm8iLCJhdmF0YXIiLCJpbnZpdGVyX25hbWUiLCJpbnZpdGVfYWN0aW9uIiwidHh0IiwiaXNfc2hvdyIsInN1Y2MiLCJ0aW1lc3RhbXAiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxTQUFLLEVBREQ7QUFFSkMsVUFBTSxRQUZGO0FBR0pGLFVBQU07QUFDSkcsbUJBQWEsSUFEVCxFQUNlO0FBQ25CQyxzQkFBZ0IsSUFGWixFQUVrQjtBQUN0QkMsbUJBQWEsa0JBSFQsRUFHNkI7QUFDakNDLHVCQUFpQixJQUpiLEVBSW1CO0FBQ3ZCQyxvQkFBYyxNQUxWO0FBTUpDLGtCQUFZO0FBQ1ZDLGtCQUFVLEVBREEsRUFDSTtBQUNkQywyQkFBbUIsSUFGVDtBQUdWQyw2QkFBcUI7QUFIWCxPQU5SO0FBV0pDLGtCQUFZO0FBQ1ZDLGdCQUFRLHNJQURFO0FBRVZDLHNCQUFjLFFBRko7QUFHVkMsdUJBQWUsS0FITDtBQUlWQyxhQUFLLDJCQUpLO0FBS1ZDLGlCQUFTLElBTEMsQ0FLSTtBQUxKO0FBWFIsS0FIRjtBQXNCSkMsVUFBTSxJQXRCRjtBQXVCSkMsZUFBVztBQXZCUDtBQURTLENBQWpCIiwiZmlsZSI6ImdhbGxlcnlJbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRhdGE6IHtcbiAgICBtc2c6ICcnLFxuICAgIGNvZGU6ICcyMDAwMDMnLFxuICAgIGRhdGE6IHtcbiAgICAgIGNhbl9wdWJsaXNoOiB0cnVlLCAvLyDmmK/lkKbnhafniYfmnInlj5HluIPmnYPpmZBcbiAgICAgIGNhbl92aWV3X3Bob3RvOiB0cnVlLCAvLyDmmK/lkKbog73mtY/op4jlm77niYdcbiAgICAgIHB1Ymxpc2hfdHh0OiAn5oKo5rKh5pyJ6K+l55u45YaM55qE5p2D6ZmQ77yM5peg5rOV5Y+R5biD5Zu+54mHJywgLy8gY2FuX3B1Ymxpc2jkuLpmYWxzZeeahOaDheWGteS4i+eahOaPkOekuuaWh+ahiFxuICAgICAgY2FuX21vZGlmeV9pbmZvOiB0cnVlLCAvLyDmmK/lkKbmnInkv67mlLnnm7jlhozmnYPpmZBcbiAgICAgIGdhbGxlcnlfbmFtZTogJ+m7mOiupOebuOWGjCcsXG4gICAgICBncm91cF9pbmZvOiB7XG4gICAgICAgIGdyb3VwX2lkOiAxMSwgLy8g576kSURcbiAgICAgICAgZ3JvdXBfbWFzdGVyX25hbWU6ICfnvqTkuLsnLFxuICAgICAgICBncm91cF9tYXN0ZXJfYXZhdGFyOiAnaHR0cDovL2luaW1nMDIuaml1eWFuLmluZm8vaW4vMjAxNy8xMi8wNi8yNjdCOUM5RS02QjAxLUZFMkYtNEI3QS04NzgzQjQwMkM2MjIucG5nJ1xuICAgICAgfSxcbiAgICAgIHRvYXN0X2luZm86IHtcbiAgICAgICAgYXZhdGFyOiAnaHR0cDovL2luaW1nMDIuaml1eWFuLmluZm8vaW4vMjAxNy8xMC8xMi8zMDk0Q0ZFNS0zQURFLTMzRDAtOUMxNi02RUUzNzJBMDAxNUQuanBnP2ltYWdlTW9ncjIvZm9ybWF0L2pwZy90aHVtYm5haWwvNTB4JTNFL3F1YWxpdHkvOTAhJyxcbiAgICAgICAgaW52aXRlcl9uYW1lOiAn5ZCO55+l5Lmf5piv5LiA5LyRJyxcbiAgICAgICAgaW52aXRlX2FjdGlvbjogJ+mCgOivt+S9oCcsXG4gICAgICAgIHR4dDogJ+Wkp+WutuW/q+adpeS4iuS8oOa0u+WKqOeFp+eJh+WVpu+8jOayoeS6uumDveiDveWFjei0ueaJk+WNsDEy5byg54Wn54mHJyxcbiAgICAgICAgaXNfc2hvdzogdHJ1ZSAvLyDmmK/lkKblsZXnpLpcbiAgICAgIH1cbiAgICB9LFxuICAgIHN1Y2M6IHRydWUsXG4gICAgdGltZXN0YW1wOiAnMTUxNTA0NjY2NidcbiAgfVxufVxuIl19