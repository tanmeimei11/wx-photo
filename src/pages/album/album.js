import wepy from 'wepy'
import PhotoItem from '../../components/album/photoItem'
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
    photoItem: PhotoItem
  }

  // data
  data = {
    photoList: []
  }

  computed = {
    now() {
      return +new Date()
    }
  }

  methods = {
    plus() {
      this.mynum++
    },
    toast() {
      let promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      })

      promise.then((d) => {
        console.log('toast done')
      })
    },
    tap() {
      console.log('do noting from ' + this.$name)
    },
    communicate() {
      console.log(this.$name + ' tap')

      this.$invoke('counter2', 'minus', 45, 6)
      this.$invoke('counter1', 'plus', 45, 6)

      this.$broadcast('index-broadcast', 1, 3, 4)
    },
    request() {
      let self = this
      let i = 10
      let map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==']
      while (i--) {
        wepy.request({
          url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
          success: function (d) {
            self.netrst += d.data + '.'
            self.$apply()
          }
        })
      }
    },
    counterEmit(...args) {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    }
  }

  events = {
    'index-emit': (...args) => {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    }
  }

  onLoad() {
    getPhotoList.then(res => {
      this.photoList = res.data.list
    })
    // this.$parent.getUserInfo(function (userInfo) {
    //   if (userInfo) {
    //     self.userInfo = userInfo
    //   }
    //   self.normalTitle = '标题已被修改'

    //   self.setTimeoutTitle = '标题三秒后会被修改'
    //   setTimeout(() => {
    //     self.setTimeoutTitle = '到三秒了'
    //     self.$apply()
    //   }, 3000)

    //   self.$apply()
    // })
  }

  var getPhotoList = async function () {
    var res = await request({
      url: '/gg/gallery/photolist',
      data: {}
    })

    return res
  }
}
