import wepy from 'wepy'
import {
  qnTokenUrl,
  qnUploadUrl,
  qnResUrl
} from './config'
import {
  wxPromisify
} from './common'

/**
 * 上传文件到七牛
 * @param {*} file
 */
const uploadImageToQiniu = (file) => {
  return wxPromisify(wx.request)({
    url: qnTokenUrl
  }).then(res => {
    var data = {
      file: file,
      token: res.data.token,
      key: res.data.key
    }
    var uploadData = {
      url: qnUploadUrl,
      filePath: data.file,
      name: 'file',
      formData: {
        key: data.key,
        token: data.token
      }
    }
    return wxPromisify(wx.uploadFile)(uploadData)
  }).then(res => {
    res = JSON.parse(res)
    // console.log(`${qnResUrl}${res.key}`)
    return {
      // url: `${qnResUrl}${res.key}`,
      hash: res.hash,
      key: res.key
    }
  })
}

/**
 * 下载多张图
 * @param {*} url
 */
const downInternetUrl = async function (urls) {
  wx.showLoading({
    title: '正在下载'
  })
  if (typeof urls === 'string') {
    urls = [urls]
  }
  var _len = urls.length
  for (var i = 0; i < _len; i++) {
    await downSigleUrl(urls[i])
  }
  wx.hideLoading()
  wx.showToast({
    title: '下载成功',
    duration: 2000
  })
}

/**
 * 下载
 */
const downSigleUrl = async function (url) {
  try {
    await wxPromisify(wx.authorize)({
      scope: 'scope.writePhotosAlbum'
    })
    var _downRes = await wxPromisify(wx.downloadFile)({
      url: url
    })
    await wxPromisify(wx.saveImageToPhotosAlbum)({
      filePath: _downRes.tempFilePath
    })
  } catch (e) {}
}

module.exports = {
  uploadImageToQiniu,
  downInternetUrl
}
