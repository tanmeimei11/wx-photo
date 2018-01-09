import wepy from 'wepy';
import { request } from '../../utils/login'

export default class setting extends wepy.page {
  config = {
    navigationBarTitleText: '设置'
  }

  data = {
    groupInfo: {},
    region: ['广东省', '广州市', ''],
    type: '',
    checked: true,
    typeList: []
  }
  methods = {
    bindRegionChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.region = e.detail.value
      // this.setData({
      //   region: e.detail.value
      // })
      this.$apply()
      console.log(this.region)
    },
    bindTypeChange(e) {

    },
    bindOpenChange(e) {
      console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    },
    exitQun() {

    }
  }
  onLoad(options) {
    this.loadInfo()
    this.groupID = options.id
  }

  async loadInfo() {
    request({
      url: '/gg/group/setting',
      data: {
        group_id: groupID
      }
    }).then((res) => {
      this.groupInfo = res.data
      this.region = [res.data.province, res.data.city]
      // this.type = res.data.type_mapping.map(item => {
      //   console.log()
      // })
      this.type = res.data.type_mapping.filter(item => {
        return res.data.type === item.id
      })[0].type_name
      this.checked = res.data.is_rec
      this.typeList = res.data.type_mapping
      this.$apply()
      console.log(this.typeList)
    })
  }
}