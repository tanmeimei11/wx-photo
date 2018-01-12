import {
  wxPromisify
} from './common.js'
import {
  qnTokenUrl,
  qnUploadUrl,
  qnResUrl
} from './config'
import wepy from 'wepy'
/**
 * 上传文件到七牛
 * @param {*} file
 */
const uploadImageToQiniu = async(file, type) => {
  try {
    var _data = type === 'mp4' ? {
      imgType: 'mp4'
    } : {}
    var tokenRes = await wepy.request({
      url: qnTokenUrl,
      data: _data
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
    console.log(uploadData)
    var uploadRes = await wxPromisify(wx.uploadFile)(uploadData)
    var _res = JSON.parse(uploadRes)
    console.log(_res)
    return {
      url: `${qnResUrl}${_res.key}`,
      hash: _res.hash,
      key: _res.key
    }
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * 下载多张图
 * @param {*} url
 */
const downInternetUrl = async function (urls) {
  try {
    if (typeof urls === 'string') {
      urls = [urls]
    }
    var _len = urls.length
    for (var i = 0; i < _len; i++) {
      await downSigleUrl(urls[i])
    }
  } catch (e) {
    throw new Error()
  }
}

/**
 * 下载
 */
const downSigleUrl = async function (url) {
  try {
    var m = await wepy.authorize({
      scope: 'scope.writePhotosAlbum'
    })
    var _downRes = await wepy.downloadFile({
      url: url
    })
    var k = await wepy.saveImageToPhotosAlbum({
      filePath: _downRes.tempFilePath
    })
  } catch (e) {
    throw new Error()
  }
}

module.exports = {
  uploadImageToQiniu,
  downInternetUrl
}
