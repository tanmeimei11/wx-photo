import wepy from 'wepy'
import {
  request,
  wxLogin
} from '../../utils/login'
import joinUs from '../../components/gallery/joinUs'
import newAlbum from '../../components/gallery/newAlbum'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import LoadingMixin from '@/mixins/loadingMixin'
import shareConnectMixin from '@/mixins/shareConnectMixin'

var pageData = {
  pageName: 'gallery',
  groupID: '',
  title: '',
  groupInfo: {},
  galleryList: [],
  loading: false,
  noMoreNote: false,
  page: 0,
  showApply: false,
  showNewAlbum: false,
  openGId: '',
  groupName: '',
  currentCursor: 0,
  shareCallBackUrl: '/gg/gallery/join'
}

export default class gallery extends wepy.page {
  config = {
    navigationBarTitleText: '群友共享相册',
    onReachBottomDistance: '100'
  }
  components = {
    joinUs: joinUs,
    newAlbum: newAlbum
  }
  mixins = [formSubmitMixin, LoadingMixin, shareConnectMixin]
  data = Object.assign({}, pageData)
  methods = {
    // changeBg () {
    //     wx.chooseImage({
    //         count: 1,
    //         success: function(res) {
    //             console.log(res)
    //         }
    //     })
    // },
    toSetting() {
      wx.navigateTo({
        url: `/pages/setting/setting?id=${this.groupID}`
      })
    },
    toAlbum(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: `/pages/album/album?id=${e.currentTarget.dataset.id}`
      })
    },
    toApply() {
      this.showApply = true
    },
    closeApply() {
      this.showApply = false
    },
    newAlbum() {
      this.showNewAlbum = true
    },
    closeNewAlbum() {
      this.showNewAlbum = false
    },
    async submitTitle(title) {
      var res = await request({
        url: '/gg/gallery/add',
        method: 'POST',
        data: {
          groupId: this.groupID,
          galleryName: title
        }
      })

      if (res.succ) {
        this.toastSucc('新建成功')
        this.showNewAlbum = false
        this.init()
        this.$apply()
      }
    }
  }
  async onLoad(options) {
    Object.assign(this, pageData)
    this.setShare()
    this.groupID = options.id
    try {
      await wxLogin()
      this.loadingIn('加载中')
      await this.getShareFromOther(true, this.shareCallBackUrl)
      await this.init()
      this.loadingOut()
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
  // 分享
  onShareAppMessage(res) {
    return {
      title: '邀请你查看本群相册',
      path: `/pages/gallery/gallery?id=${this.groupID}`,
      success: this.shareCallBack({ ...res,
        shareCallBackUrl: this.shareCallBackUrl
      })
    }
  }
  async init() {
    this.currentCursor = 0
    this.noMoreNote = false
    this.galleryList = []
    this.$apply()
    this.loadInfo()
    await this.loadGallerylist()
  }
  async loadInfo() {
    var res = await request({
      url: '/gg/group/info',
      data: {
        group_id: this.groupID
      }
    })
    if (res.succ && res.data) {
      this.openGId = res.data.open_gid
      this.groupInfo = res.data
      this.$apply()
      console.log(this.groupInfo)
    }
  }
  async onReachBottom(e) {
    if (this.noMoreNote) {
      return
    }
    await this.loadGallerylist()
  }
  async loadGallerylist() {
    var res = await request({
      url: '/gg/group/gallerylist',
      data: {
        group_id: this.groupID,
        cursor: this.currentCursor
      }
    })
    if (res.succ && res.data) {
      console.log(res)
      this.galleryList = this.galleryList.concat(res.data.list)
      this.currentCursor = res.data.cursor
      this.$apply()
      if (!res.data.has_next) {
        this.noMoreNote = true
        this.$apply()
      }
    } else {
      this.noMoreNote = true
      this.$apply()
    }
  }
}
