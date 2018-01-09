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
    checked: false,
    typeList: [],
    type_mapping: [],
    newdata: {},
    disabled: false,
    showbtn: true,
    members: []
  }
  mixins = [formSubmitMixin]
  methods = {
    bindRegionChange(e) {
      this.region = e.detail.value
      this.$apply()
      this.newdata = {
        province: this.region[0],
        city: this.region[1],
        groupId: this.groupID
      }
      this.changeSetting(this.newdata)
    },
    bindTypeChange(e) {
      this.type = this.typeList[e.detail.value]
      this.newdata = {
        type: this.type_mapping.filter(item => {
          return this.type === item.type_name
        })[0].id,
        groupId: this.groupID
      }
      this.changeSetting(this.newdata)
    },
    bindOpenChange(e) {
      this.newdata = {
        allowRec: e.detail.value ? 1 : 0,
        groupId: this.groupID
      }
      this.changeSetting(this.newdata)
    },
    exitQun() {
      var that = this
      wx.showModal({
        content: '确认退出群空间？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.newdata = {
              quitGroup: 1,
              groupId: that.groupID
            }
            that.changeSetting(that.newdata, () => {
              that.showbtn = false
              that.$apply()
              wx.showToast({
                title: '退出成功',
                icon: 'success',
                mask: true
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
  onLoad(options) {
    this.groupID = options.id
    this.loadInfo()
  }

  async changeSetting(cdata, fn) {
    this.disabled = true
    console.log(cdata)
    var res = await request({
      url: '/gg/group/updatesetting',
      method: 'POST',
      data: cdata
    })
    if (res.succ) {
      this.disabled = false
      this.$apply()
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
      this.members = res.data.members
      this.region = res.data.city ? [res.data.province, res.data.city] : this.region

      this.checked = res.data.is_rec
      this.type_mapping = res.data.type_mapping

      if (!res.data.can_modify) {
        this.disabled = true
      }
      this.$apply()

      this.type = res.data.type_name
      this.typeList = res.data.type_mapping.map(item => {
        return item.type_name
      })
      console.log(this.typelist)
      this.$apply()
    }
  }
}
