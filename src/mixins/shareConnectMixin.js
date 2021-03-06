import wepy from 'wepy'
import {
  request
} from '@/utils/login'

export default class shareConnectMixin extends wepy.mixin {
  async getShareFromOther(isLoading, url, ids) {
    try {
      var _shareTickets = this.$parent.globalData.shareTicket
      if (_shareTickets) {
        var m = this.shareCallBack('share', 'share')
        if (!ids) {
          ids = {}
        }
        await m({
          'shareTickets': [_shareTickets],
          'shareCallBackUrl': url,
          'from': 'onload',
          'groupID': ids.groupID || '',
          'galleryID': ids.galleryID || ''
        }, isLoading)
      }
    } catch (e) {
      throw new Error()
    }
  }
  shareCallBack(res) {
    return async(res, isLoading) => {
      console.log('shareCallBack');
      (!isLoading) && this.loadingIn('请稍后')
      try {
        if (res.shareTickets) {
          var ticket = res.shareTickets[0]
          var loginRes = await wepy.login({
            withCredentials: true
          })
          var shareInfoRes = await wepy.getShareInfo({
            shareTicket: ticket
          })
          if (loginRes.code && shareInfoRes.encryptedData && shareInfoRes.iv) {
            var _data = {
              encryptedData: shareInfoRes.encryptedData, //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
              iv: shareInfoRes.iv, // 加密算法的初始向量
              code: loginRes.code,
              groupID: res.groupID || '',
              galleryID: res.galleryID || ''
            }

            var dispatcherRes = await request({
              url: res.shareCallBackUrl || '/gg/group/index/dispatcher',
              data: _data
            })

            if (dispatcherRes && dispatcherRes.succ) {
              if (typeof this.initPage === 'function') {
                await this.initPage()
              }

              this.loadingOut()
              wx.navigateTo({
                url: dispatcherRes.data.redirect_path
              })
            }
          } else {
            throw new Error()
          }
        } else if (!isLoading) {
          this.loadingOut()
          this.toastFail('请分享到群聊天', 3000)
        }
      } catch (e) {
        throw new Error()
      }

      this.loadingOut()
    }
  }
}
