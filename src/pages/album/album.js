import wepy from 'wepy'
import PhotoItem from '@/components/album/photoItem'
import PreviewPhoto from '@/components/album/previewPhoto'
import publishPhoto from '@/components/album/publishPhoto'
import LoadingMixin from '@/mixins/loadingMixin'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import newAlbum from '@/components/gallery/newAlbum'

import {
  request,
  wxCheckLogin
} from '@/utils/login'

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
    publishPhoto: publishPhoto,
    newAlbum: newAlbum
  }
  // 混合
  mixins = [LoadingMixin, formSubmitMixin]
  // data
  data = {
    groupId: '',
    galleryId: '1', // 相册id
    galleryTitle: '',
    galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0, // 预览照片开始位置

    curCursor: 0,
    isGetList: false,
    isGetListFinish: false,

    isShowNewAlbum: false, // 修改名称弹窗
    newAlbumTitle: '修改相册名称',

    isRefreshIndex: false, // 从创建过来的
    isSubmitFormId: true // 允许提交formid
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
    openNewAlbum() {
      this.isShowNewAlbum = true
    },
    closeNewAlbum() {
      this.isShowNewAlbum = false
    },
    async submitTitle(title) {
      try {
        var res = await request({
          url: '/gg/gallery/updatename',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            id: this.galleryId,
            galleryName: title
          }
        })
      } catch (e) {
        this.toastFail('修改失败')
      }

      if (res.succ) {
        this.toastSucc('修改成功')
        this.changeGalleryTitle(title)
        this.isShowNewAlbum = false
        this.$apply()
      }
    }
  }
  events = {}
  async onLoad(options) {
    try {
      this.loadingIn('加载中')
      this.initOptions(options)
      await wxCheckLogin()
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
  // 分享
  onShareAppMessage() {
    return {
      title: this.galleryTitle,
      path: `/page/album/album?id=${this.galleryId}`
    }
  }
  // 修改标题
  changeGalleryTitle(text) {
    this.galleryTitle = text || '相册详情'
    wepy.setNavigationBarTitle({
      title: this.galleryTitle
    })
  }
  // 初始化配置
  initOptions(options) {
    this.galleryId = options.id || '1'
  }
  // 相册权限
  async getGalleryAuth() {
    var res = await request({
      url: '/gg/gallery/info',
      data: {
        gallery_id: this.galleryId
      }
    })
    if (res && res.data) {
      this.galleryAuth = 10
      if (!res.data.can_modify_info) {
        this.galleryAuth = 2
      }
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
  // 照片列表
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
      this.changeGalleryTitle(res.data.gallery_name)
      this.groupId = res.data.group_id || ''
      this.photoList.push.apply(this.photoList, res.data.list)
      this.curCursor = res.data.cursor
      this.loadingOut()
      this.isGetList = false
      this.isGetListFinish = res.data.has_next
      this.$apply()
    }
  }
  // 下啦加载
  async onReachBottom(e) {
    await this.getList()
  }
}
