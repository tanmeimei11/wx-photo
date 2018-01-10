import wepy from 'wepy'
import {
  request,
  wxCheckLogin
} from '../../utils/login'
import GroupItem from '../../components/index/groupItem'
import shareOrCreateGroup from '../../components/index/shareOrCreateGroup'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import LoadingMixin from '@/mixins/loadingMixin'
var pageData = {
  pageName: 'index',
  groupList: []
}
export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '群活动相册'
  }
  // 组件
  components = {
    shareOrCreateGroup: shareOrCreateGroup,
    groupItem: GroupItem
  }
  mixins = [formSubmitMixin, LoadingMixin]

  data = Object.assign({}, pageData)
  methods = {}
  async onLoad() {
    console.log('1231')
    Object.assign(this, pageData)
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
  initPage() {
    this.groupList = []
    this.getList()
  }
  async getList() {
    console.log('other refresh')
    var res = await request({
      url: '/gg/index/grouplist',
      data: {
        cursor: 0
      },
      isCheck: true
    })
    if (res && res.data) {
      console.log(this.groupList)
      this.groupList = [
        ...this.groupList,
        ...res.data.list
      ]
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
    this.loadingIn('相册分享中')
    return async(res) => {
      this.loadingIn()
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
              code: loginRes.code
            }

            var dispatcherRes = await request({
              url: '/gg/group/index/dispatcher',
              data: _data
            })

            if (dispatcherRes && dispatcherRes.succ) {
              this.loadingOut()
              await this.initPage()
              wx.navigateTo({
                url: dispatcherRes.data.redirect_path
              })
            }
          }
        }
        this.loadingIn()
      } catch (e) {
        this.loadingOut()
      }
    }
  }
  onShareAppMessage(res) {
    return {
      title: '快来上传图片吧~',
      path: '/pages/share/dispatcher?from=index',
      success: this.ShareCallBack(res)
    }
  }
}
