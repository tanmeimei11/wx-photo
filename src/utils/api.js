import {
  wxPromisify
} from './common.js'
import {
  qnTokenUrl,
  qnUploadUrl
  // qnResUrl
} from './config'
import wepy from 'wepy'
/**
 * 上传文件到七牛
 * @param {*} file
 */
const uploadImageToQiniu = async file => {
  var tokenRes = await wepy.request({
    url: qnTokenUrl
  })

  var uploadData = {
    url: qnUploadUrl,
    filePath: file,
    name: 'file',
    formData: {
      key: tokenRes.data.data.key,
      token: tokenRes.data.data.token
    }
  }
  var uploadRes = await wxPromisify(wx.uploadFile)(uploadData)
  var _res = JSON.parse(uploadRes)
  console.log(_res)
  return {
    // url: `${qnResUrl}${res.key}`,
    hash: _res.hash,
    key: _res.key
  }
}

/**
 * 下载多张图
 * @param {*} url
 */
const downInternetUrl = async function (urls) {
  wx.showLoading({
    title: '正在下载',
    mask: true
  })
  if (typeof urls === 'string') {
    urls = [urls]
  }
  var _len = urls.length
  for (var i = 0; i < _len; i++) {
    await downSigleUrl(urls[i])
  }
  wx.hideLoading()
  if (i === _len) {
    wx.showToast({
      title: '下载成功',
      duration: 2000,
      mask: true
    })
  }
}

/**
 * 下载
 */
const downSigleUrl = async function (url) {
  try {
    await wepy.authorize({
      scope: 'scope.writePhotosAlbum'
    })
    var _downRes = await wepy.downloadFile({
      url: url
    })
    await wepy.saveImageToPhotosAlbum({
      filePath: _downRes.tempFilePath
    })
  } catch (e) {}
}

module.exports = {
  uploadImageToQiniu,
  downInternetUrl
}
