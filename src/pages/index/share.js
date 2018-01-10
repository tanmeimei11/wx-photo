import wepy from 'wepy'

// import {
//   wxPromisify
// } from '../../utils/common'
import {
  request
} from '../../utils/login'
var shareCallBack = (res) => {
  return async(res) => {
    console.log('这里是 分享的点进来的')
    wx.showLoading({
      title: '相册分享中',
      mask: true
    })
    try {
      if (res.shareTickets) {
        var ticket = res.shareTickets[0]
        console.log(ticket)
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
            code: loginRes.code
          }

          var dispatcherRes = await request({
            url: '/gg/group/index/dispatcher',
            data: _data
          })

          if (dispatcherRes && dispatcherRes.succ) {
            wx.hideLoading()
            wx.redirectTo({
              url: dispatcherRes.data.redirect_path
            })
          }
        }
      }
    } catch (e) {
      this.loadingOut()
    }
  }
}

module.exports = shareCallBack
