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
    navigationBarTitleText: '相册详情',
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
    galleryId: '1', // 相册id
    galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false
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
    }
  }

  events = {}
  async onLoad(options) {
    try {
      this.loadingIn('加载中')
      this.initOptions(options)

      await this.getGalleryAuth()
      if (this.galleryAuth !== 0) {
        this.getList()
      }
    } catch (e) {
      this.loadingOut()
      wx.showToast({
        title: '加载失败',
        icon: 'loading'
      })
    }
  }
  initOptions(options) {
    this.galleryId = options.id || '1'
    wepy.setNavigationBarTitle({
      title: options.title || '相册详情'
    })
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
  async getGalleryAuth() {
    var res = await request({
      url: '/gg/gallery/info',
      data: {
        gallery_id: this.galleryId
      }
    }, true)
    if (res && res.data) {
      this.galleryAuth = 2
      if (!res.data.can_publish) {
        this.galleryAuth = 1
      }
      if (!res.data.can_view_photo) {
        this.galleryAuth = 0
      }
      this.loadingOut()
      this.$apply()
    }
  }
  async getList() {
    if (this.isGetList || this.isGetListFinish) {
      return
    }
    this.isGetList = true
    var res = await request({
      url: '/gg/gallery/photolist',
      data: {
        gallery_id: this.galleryId,
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
