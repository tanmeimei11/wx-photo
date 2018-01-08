import wepy from 'wepy'
import PhotoItem from '../../components/album/photoItem'
import PreviewPhoto from '../../components/album/previewPhoto'
import publishPhoto from '../../components/album/publishPhoto'
import {
  request
} from '../../utils/login'

export default class Index extends wepy.page {
  // 配置
  config = {
    navigationBarTitleText: '第一次聚会',
    onReachBottomDistance: '100'
  }
  // 组件
  components = {
    photoItem: PhotoItem,
    previewPhoto: PreviewPhoto,
    publishPhoto: publishPhoto
  }

  // data
  data = {
    galleryId: '123', // 相册id

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false,

    publishAfterInfo: null // 发布照片之后气泡信息
  }

  computed = {
    now() {
      return +new Date()
    }
  }

  methods = {
    clearCurPhotos() {
      this.previewPhotos = []
      this.previewPhotosIdx = 0
    },
    changeCurPhotos(photos, idx) {
      this.previewPhotos = photos
      this.previewPhotosIdx = idx
    },
    deletPhoto(idx) {
      this.photoList.splice(idx, 1)
      this.$apply()
    },
    publishPhoto(obj) {
      this.photoList.splice(0, 0, obj)
      this.$apply()
    },
    changeZanList(idx, photoId, zanlist) {
      var _photo = this.photoList[idx]
      if (_photo.photo_id === photoId) {
        _photo.zan_list = zanlist
      }
      this.$apply()
    },
    showPublishBubal(data) {
      this.publishAfterInfo = data
      this.$apply()
    }
  }

  events = {
    'index-emit': (...args) => {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    }
  }
  onLoad() {
    this.loadingIn('加载中')
    this.getList()
  }
  loadingIn(text) {
    wx.showLoading({
      title: text,
      mask: true
    })
  }
  loadingOut() {
    wx.hideLoading()
  }
  async getList() {
    if (this.isGetList || this.isGetListFinish) {
      return
    }
    this.isGetList = true
    var res = await request({
      url: '/gg/gallery/photolist',
      data: {
        gallery_id: 1,
        cursor: 0
      }
    })
    if (res && res.data) {
      this.photoList.push.apply(this.photoList, res.data.list)
      this.curCursor = res.data.cursor
      this.loadingOut()
      this.isGetList = false
      this.isGetListFinish = res.data.has_next
      this.$apply()
    }
  }
  async onReachBottom(e) {
    await this.getList()
  }
}
