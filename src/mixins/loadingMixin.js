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
  toastSucc(text) {
    wx.showToast({
      title: text,
      mask: true
    })
  }
  toastFail(text, duration) {
    wx.showToast({
      title: text,
      image: '../../images/toast-fail.png',
      mask: true,
      duration: duration || 2000

    })
  }
}
