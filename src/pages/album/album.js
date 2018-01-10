import wepy from 'wepy'
import PhotoItem from '@/components/album/photoItem'
import PreviewPhoto from '@/components/album/previewPhoto'
import PublishPhoto from '@/components/album/publishPhoto'
import publishSucc from '@/components/album/publishSucc'
import PrinterPhoto from '@/components/album/printerPhoto'
import LoadingMixin from '@/mixins/loadingMixin'
import formSubmitMixin from '@/mixins/formSubmitMixin'
import refreshIndexMixin from '@/mixins/refreshIndexMixin'
import newAlbum from '@/components/gallery/newAlbum'

import {
  request,
  wxCheckLogin
} from '@/utils/login'

var pageData = {
  pageName: 'album',
  groupId: '',
  galleryId: '1', // 相册id
  galleryTitle: '',
  galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

  photoList: [],
  previewPhotos: [], // 预览照片
  previewPhotosIdx: 0, // 预览照片开始位置

  curCursor: 0,
  isGetList: false,
  isListHasNext: true,

  isShowNewAlbum: false, // 修改名称弹窗
  newAlbumTitle: '修改相册名称',

  isRefreshIndex: false, // 从创建过来的

  publishAfterInfo: null, // 发布图片后的信息
  showPublishSucc: true,

  isShowPrinterModal: false, // 是否展示跳转打印的弹窗
  printerPhotoModalInfo: null // 跳转打印的弹窗信息
}

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
    publishPhoto: PublishPhoto,
    printerPhoto: PrinterPhoto,
    publishSucc: publishSucc,
    newAlbum: newAlbum
  }
  // 混合
  mixins = [LoadingMixin, formSubmitMixin, refreshIndexMixin]
  // data
  data = Object.assign({}, pageData)
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
      console.log(obj)
      this.photoList.splice(0, 0, obj)
      this.$apply()
    },
    showpublishSucc() {
      this.showPublishSucc = true
    },
    closePublishSucc() {
      this.showPublishSucc = false
    },
    openNewAlbum() {
      this.isShowNewAlbum = true
    },
    closeNewAlbum() {
      this.isShowNewAlbum = false
    },
    changePublishInfo(data) {
      this.publishAfterInfo = data
      this.$apply()
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
    },
    photoZanChange(idx, zanList) {
      this.photoList[idx].is_zan = !this.photoList[idx].is_zan
      this.photoList[idx].zan_list = zanList
      this.$apply()
    }
  }
  events = {}
  async onLoad(options) {
    Object.assign(this, pageData)
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
      this.toastFail('加载失败')
    }
  }
  // 分享
  onShareAppMessage(res) {
    return {
      title: res.from === 'button' ? `我发布了新的照片，快来看看吧` : `邀请你查看本群相册《${this.galleryTitle}》`,
      path: `/pages/album/album?id=${this.galleryId}`
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

      return this.galleryAuth
    }
  }
  // 照片列表
  async getList() {
    console.log(this.isGetList, this.isListHasNext)
    if (this.isGetList || !this.isListHasNext) {
      return
    }
    this.isGetList = true
    var res = await request({
      url: '/gg/gallery/photolist',
      data: {
        gallery_id: this.galleryId,
        cursor: this.curCursor
      }
    })
    if (res && res.data) {
      this.changeGalleryTitle(res.data.gallery_name)
      this.groupId = res.data.group_id || ''
      this.photoList = [
        ...this.photoList,
        ...res.data.list
      ]
      this.curCursor = res.data.cursor || ''
      this.isGetList = false
      this.isListHasNext = res.data.has_next
      this.$apply()
      this.loadingOut()
    }
  }
  // 下啦加载
  async onReachBottom(e) {
    await this.getList()
  }
}
