import wepy from 'wepy'
import {
  request,
  wxLogin
} from '../../utils/login'
import GroupItem from '../../components/index/groupItem'
import shareOrCreateGroup from '../../components/index/shareOrCreateGroup'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import LoadingMixin from '@/mixins/loadingMixin'
import shareConnectMixin from '@/mixins/shareConnectMixin'
var pageData = {
  pageName: 'index',
  groupList: []
}
export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '群友共享相册'
  }
  // 组件
  components = {
    shareOrCreateGroup: shareOrCreateGroup,
    groupItem: GroupItem
  }
  mixins = [formSubmitMixin, LoadingMixin, shareConnectMixin]

  data = Object.assign({}, pageData)
  methods = {}
  async onLoad() {
    Object.assign(this, pageData)

    try {
      await wxLogin()
      this.loadingIn('加载中')
      if (this.$parent.globalData.shareTicket) {
        await this.getShareFromOther(true)
      } else {
        await this.getList()
      }
      this.setShare()
    } catch (e) {
      this.loadingOut()
      this.toastFail('加载失败')
    }
  }
  setShare() {
    wx.showShareMenu({
      withShareTicket: true // 要求小程序返回分享目标信息
    })
  }
  initPage() {
    Object.assign(this, pageData)
    this.getList()
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

  onShareAppMessage(res) {
    return {
      title: '一起来加入本群相册吧！',
      path: '/pages/index/index?from=index',
      imageUrl: 'https://inimg07.jiuyan.info/in/2018/01/10/BB52C836-77CE-373A-D484-BEC9405749FB.jpg',
      success: this.shareCallBack(res)
    }
  }
}
