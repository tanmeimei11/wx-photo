import wepy from 'wepy'
import {
  request
} from '@/utils/login'

export default class formSubmitMixin extends wepy.mixin {
  data = {
    isSubmitFormId: true
  }
  methods = {
    async formSubmit(e) {
      if (this.isSubmitFormId) {
        var res = await request({
          url: '/gg/tmpl//formid/submit',
          data: {
            formId: e.detail.formId
          }
        })
        if (res.succ) {
          // console.log('发送成功')
        } else {
          this.isSubmitFormId = false
        }
      }
    }
  }
}
