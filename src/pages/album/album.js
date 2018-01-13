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
  downInternetUrl
} from '../../utils/api.js'
import shareConnectMixin from '@/mixins/shareConnectMixin'

import {
  request,
  wxLogin
} from '@/utils/login'

var pageData = {
  pageName: 'album',
  groupUserName: '', // 群主名字
  groupId: '',
  galleryId: '1', // 相册id
  galleryTitle: '',
  galleryAuth: -1, // 相册权限 //0 隐私 1 能看不能上传 2 全部权限 3 不能修改名称

  photoList: [],

  isShowPreViewModal: false,
  previewPhotos: [], // 预览照片
  previewPhotosIdx: 0, // 预览照片开始位置

  curCursor: 0,
  isGetList: false,
  isListHasNext: true,

  photoIdx: 0,
  photoItemIdx: 0,
  photoItemActiveIdx: -1, // 主要是给视频用一次只能播放一个视频

  isShowNewAlbum: false, // 修改名称弹窗
  newAlbumTitle: '修改相册名称',

  isRefreshIndex: false, // 从创建过来的

  publishToastInfo: null, // 发布图片后的信息
  isShowPublishSucc: false,
  isShowTips: false,
  publishPhotoInfo: null, // 发图之后的photo信息

  isShowPrinterModal: true, // 是否展示跳转打印的弹窗
  printerPhotoModalInfo: null, // 跳转打印的弹窗信息
  shareCallBackUrl: '/gg/group/join'
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
  mixins = [LoadingMixin, formSubmitMixin, refreshIndexMixin, shareConnectMixin]
  // data
  data = Object.assign({}, pageData)
  methods = {
    swiperChange(e) {
      this.photoItemIdx = e.detail.current
      console.log(this.photoItemIdx)
      this.$apply()
    },
    async downImage() {
      this.loadingIn('正在下载')
      console.log(this.previewPhotos[this.photoItemIdx].url)
      try {
        await downInternetUrl(this.previewPhotos[this.photoItemIdx].url)
        this.loadingOut()
        this.toastSucc('下载成功')
      } catch (e) {
        this.loadingOut()
        this.toastFail('下载失败')
      }
    },
    clearSwiper() {
      this.photoItemIdx = 0
      this.isShowPreViewModal = false
      this.previewPhotos = []
      this.previewPhotosIdx = 0
    },
    clearCurPhotos() {
      this.isShowPreViewModal = false
      this.previewPhotos = []
      this.previewPhotosIdx = 0
    },
    changeCurPhotos(photos, idx) {
      this.previewPhotos = photos
      this.isShowPreViewModal = true
      console.log('------preview-----')
      console.log(this.previewPhotos, idx)
      this.previewPhotosIdx = idx
      this.photoItemIdx = idx
      this.$apply()
    },
    deletPhoto(idx) {
      this.photoList.splice(idx, 1)
      this.refreshGallery()
      this.$apply()
    },
    clearpublishToastInfo() {
      this.publishToastInfo = null
      this.$apply()
    },
    publishPhotoAndVideo(obj) {
      this.photoList.splice(0, 0, obj)
      this.isShowPublishSucc = true
      this.publishToastInfo = null
      this.publishPhotoInfo = obj
      this.refreshGallery()
      this.$apply()
    },
    closePublishSucc() {
      this.isShowPublishSucc = false
    },
    openNewAlbum() {
      this.isShowNewAlbum = true
    },
    closeNewAlbum() {
      this.isShowNewAlbum = false
    },
    closePrinterPhotoModal() {
      this.isShowPrinterModal = false
    },
    publishPrintPhoto() {
      this.$invoke('photoItem', 'printerClick', {}, this.publishPhotoInfo.id, this.publishPhotoInfo.user_id)
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
  events = {
    showVideo(idx) {
      console.log(idx)
      var _activeVideo = this.photoList[idx]
      _activeVideo.isShowVideo = true
      // 进入全屏播放
      _activeVideo.videoContext = wepy.createVideoContext(`video${idx}`)
      _activeVideo.videoContext.requestFullScreen()
    },
    hiddenVideo(idx) {
      var _activeVideo = this.photoList[idx]
      _activeVideo.videoContext.exitFullScreen()
      _activeVideo.isShowVideo = false
    },
    delalbum() {
      if (this.photoList.length) {
        this.toastFail('相册还有图片 不能删除')
        return
      }
      request({
        url: '/gg/gallery/del',
        data: {
          gallery_id: this.galleryId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.succ) {
          wepy.redirectTo({
            url: `/pages/gallery/gallery?id=${this.groupId}`
          })
        }
      })
    }
  }
  async onLoad(options) {
    Object.assign(this, pageData)
    this.setShare()
    try {
      this.initOptions(options)
      await wxLogin()
      this.loadingIn('加载中')
      await this.getShareFromOther(true, this.shareCallBackUrl)
      await this.getGalleryAuth()
      if (this.galleryAuth !== 0) {
        this.getList()
      }
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
    this.isShowPublishSucc = false
    var image = ''
    var type = '照片'
    if (this.publishPhotoInfo) {
      image = this.publishPhotoInfo.photo_type === '0' ? this.publishPhotoInfo.photos[0].url : this.publishPhotoInfo.video.cover_url
      this.publishPhotoInfo.photo_type === '3' && (type = '视频')
    }
    console.log(image)
    return {
      title: res.from === 'button' ? `我发布了新的${type}，快来看看吧` : `邀请你查看本群相册《${this.galleryTitle}》`,
      path: `/pages/album/album?id=${this.galleryId}`,
      imageUrl: image || 'https://inimg02.jiuyan.info/in/2018/01/13/156D8D56-6C5B-AD0D-F6E6-4FD1A272AA13.jpg'
      // success: this.shareCallBack({ ...res,
      //   shareCallBackUrl: this.shareCallBackUrl
      // })
    }
  }
  refreshGallery() {
    var pages = getCurrentPages()
    for (var i = 0; i < pages.length; i++) {
      pages[i].data.pageName === 'gallery' && (pages[i].init())
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
    this.isShowPrinterModal = options.isnew || false
  }
  // 设置相册信息
  setAlbumInfo(data) {
    this.changeGalleryTitle(data.gallery_name)
    this.groupId = data.group_info.group_id || ''
    this.groupUserName = data.group_info.group_master_name || ''
    this.publishToastInfo = data.toast_info
    this.$apply()
  }
  // 相册信息
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

      this.setAlbumInfo(res.data)
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
      if (res.data.list) {
        res.data.list = res.data.list.map((item) => {
          if (item.photo_type === '3') {
            item.isShowVideo = false
            item.videoContext = null
          }
          return item
        })
      }
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
