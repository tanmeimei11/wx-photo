import wepy from 'wepy'

export default class refreshIndexMixin extends wepy.mixin {
  data = {
    isSubmitFormId: true
  }
  refreshPage(e) {
    var pages = getCurrentPages()
    for (var i = 0; i < pages.length; i++) {
      pages[i].data.pageName === 'index' && (pages[i].getList())
    }
  }
}
