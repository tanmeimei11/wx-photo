import wepy from 'wepy'
import PhotoItem from '../../components/album/photoItem'
import PreviewPhoto from '../../components/album/previewPhoto'
import {
  request
} from '../../utils/login'

export default class Index extends wepy.page {
  // 配置
  config = {
    navigationBarTitleText: '第一次聚会'
  }
  // 组件
  components = {
    photoItem: PhotoItem,
    previewPhoto: PreviewPhoto
  }

  // data
  data = {
    photoList: [],
    previewPhotos: [], // 预览照片
    previewPhotosIdx: 0 // 预览照片开始位置
  }

  computed = {
    now() {
      return +new Date()
    }
  }

  methods = {
    clearCurPhotos() {
      this.previewPhotos = []
    },
    changeCurPhotos(photos, idx) {
      console.log(photos, idx)
      this.previewPhotos = photos
      this.previewPhotosIdx = idx
    }
  }

  events = {
    'index-emit': (...args) => {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    }
  }
  onLoad() {
    this.getList()
  }

  getList() {
    request({
      url: '/gg/gallery/photolist',
      data: {}
    }).then(data => {
      this.photoList = data.list
      // this.previewPhotos = data.list[0].photo
      this.$apply()
      console.log(this.photoList)
    }, res => {
      console.log(res)
    })
  }

  onPageScroll() {

  }
}
