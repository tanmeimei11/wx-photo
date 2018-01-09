import wepy from 'wepy'

export default class LoadingMixin extends wepy.mixin {
  data = {
    a: 1
  }
  loadingIn(text) {
    wx.showLoading({
      title: text,
      mask: true
    })
  }
  loadingOut() {
    wx.hideLoading()
  }
}
