import wepy from 'wepy'
import {
  request,
  wxCheckLogin
} from '../../utils/login'
import GroupItem from '../../components/index/groupItem'
import shareOrCreateGroup from '../../components/index/shareOrCreateGroup'
import formSubmitMixin from '@/mixins/formSubmitMixin'

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '群活动相册'
  }
  // 组件
  components = {
    shareOrCreateGroup: shareOrCreateGroup,
    groupItem: GroupItem
  }
  mixins = [formSubmitMixin]

  data = {
    pageName: 'index',
    groupList: []
  }
  methods = {}
  async onLoad() {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    })
    var token = await wxCheckLogin()
    if (token) {
      await this.getList()
    }
  }
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }

  async getList() {
    var res = await request({
      url: '/gg/index/grouplist',
      data: {
        cursor: 0
      },
      isCheck: true
    })
    if (res && res.data) {
      console.log(res.data)
      this.groupList.push.apply(this.groupList, res.data.list)
      console.log(this.groupList)
      this.$apply()
      this.loadingOut()
    }
  }
  loadingOut() {
    wx.hideLoading()
  }
  ShareCallBack(res) {
    console.log('111')
    return async(res) => {
      console.log('share succ', res)
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
            code: loginRes.code
          }

          var dispatcherRes = await request({
            url: '/gg/group/index/dispatcher',
            data: _data
          })

          console.log(dispatcherRes)
          if (dispatcherRes && dispatcherRes.succ) {
            wx.navigateTo({
              url: dispatcherRes.data.redirect_path
            })
          }
        }
      }
    }
  }
  onShareAppMessage(res) {
    return {
      title: '快来上传图片吧~',
      path: '/page/share/dispatcher?from=index',
      success: this.ShareCallBack(res)
    }
  }
}
