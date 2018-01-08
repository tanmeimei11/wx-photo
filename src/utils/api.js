import {
  wxPromisify
} from './common.js'
import {
  qnTokenUrl,
  qnUploadUrl
  // qnResUrl
} from './config'

/**
 * 上传文件到七牛
 * @param {*} file
 */
const uploadImageToQiniu = async file => {
  var tokenRes = await wxPromisify(wx.request)({
    url: qnTokenUrl
  })

  var uploadData = {
    url: qnUploadUrl,
    filePath: file,
    name: 'file',
    formData: {
      key: tokenRes.data.key,
      token: tokenRes.data.token
    }
  }
  var uploadRes = await wxPromisify(wx.uploadFile)(uploadData)
  var _res = JSON.parse(uploadRes)
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
