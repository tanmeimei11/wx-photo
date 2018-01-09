import wepy from 'wepy'
import {
  request
} from '../../utils/login'
import formSubmitMixin from '@/mixins/formSubmitMixin'

export default class setting extends wepy.page {
  config = {
    navigationBarTitleText: '设置'
  }

  data = {
    groupID: '',
    groupInfo: {},
    region: ['', '未填写', ''],
    type: '未填写',
    checked: true,
    typeList: [],
    type_mapping: [],
    newdata: {},
    disabled: false
  }
  mixins = [formSubmitMixin]
  methods = {
    bindRegionChange(e) {
      this.region = e.detail.value
      this.$apply()
      this.newdata = {
        province: this.region[0],
        city: this.region[1]
      }
      this.changeSetting(this.newdata)
    },
    bindTypeChange(e) {
      this.type = this.typeList[e.detail.value]
      this.newdata = {
        type: this.type_mapping.filter(item => {
          return this.type === item.type_name
        })[0].id
      }
      this.changeSetting(this.newdata)
    },
    bindOpenChange(e) {
      this.newdata = {
        allow_rec: e.detail.value ? 1 : 0
      }
      this.changeSetting(this.newdata)
    },
    exitQun() {
      this.newdata = {
        quit_group: 1
      }
      this.changeSetting(this.newdata, () => {
        this.groupInfo.is_show_quit_btn = false
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          mask: true
        })
        this.$apply()
      })
    }
  }
  onLoad(options) {
    this.groupID = options.id
    this.loadInfo()
  }

  async changeSetting(cdata, fn) {
    this.disabled = false
    console.log(cdata)
    var res = await request({
      url: '/gg/group/updatesetting',
      method: 'POST',
      data: cdata
    })
    if (res.succ) {
      this.disabled = true
      fn && fn()
    }
  }

  async loadInfo() {
    var res = await request({
      url: '/gg/group/setting',
      data: {
        group_id: this.groupID
      }
    })
    if (res.succ) {
      this.groupInfo = res.data
      this.region = [res.data.province, res.data.city]

      this.type = res.data.type_mapping.filter(item => {
        return res.data.type === item.id
      })[0].type_name
      this.typeList = res.data.type_mapping.map(item => {
        return item.type_name
      })
      this.type_mapping = res.data.type_mapping

      this.checked = res.data.is_rec

      if (!res.data.can_modify) {
        this.disabled = true
      }
      this.$apply()
      console.log(this.typeList)
    }
  }
}
