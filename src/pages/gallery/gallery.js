import wepy from 'wepy'
import {
  request
} from '../../utils/login'
import joinUs from '../../components/gallery/joinUs'
import newAlbum from '../../components/gallery/newAlbum'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import LoadingMixin from '@/mixins/loadingMixin'

export default class gallery extends wepy.page {
  config = {
    navigationBarTitleText: '群活动相册'
  }
  components = {
    joinUs: joinUs,
    newAlbum: newAlbum
  }
  mixins = [formSubmitMixin, LoadingMixin]
  data = {
    pageName: 'gallery',
    groupID: '',
    title: '',
    groupInfo: {},
    galleryList: [],
    loading: false,
    noMoreNote: false,
    page: 0,
    showApply: false,
    showNewAlbum: false
  }
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
        this.loadInfo()
        this.loadGallerylist()
        this.$apply()
      }
    }
  }
  onLoad(options) {
    this.groupID = options.id
    this.title = options.id
    this.loadInfo()
    this.loadGallerylist()
  }
  onReachBottom() {
    if (this.data.noMoreNote) {
      return
    }
    let that = this
    setTimeout(function () {
      that.loadGallerylist()
    }, 300)
  }
  async loadInfo() {
    var res = await request({
      url: '/gg/group/info',
      data: {
        group_id: this.groupID
      }
    })
    if (res.succ && res.data) {
      this.groupInfo = res.data
      this.$apply()
      console.log(this.groupInfo)
    }
  }
  async loadGallerylist() {
    if (this.data.loading) {
      return
    }
    this.data.loading = true
    var res = await request({
      url: '/gg/group/gallerylist',
      data: {
        group_id: this.groupID,
        page: this.data.page
      }
    })
    if (res.succ && res.data) {
      console.log(res)
      this.galleryList = res.data.list
      this.data.page = this.data.page + 1
      this.$apply()
      if (!res.data.has_next) {
        this.data.noMoreNote = true
        this.$apply()
        return
      }
    } else {
      this.data.noMoreNote = true
      this.$apply()
    }
    this.data.loading = false
  }
}
