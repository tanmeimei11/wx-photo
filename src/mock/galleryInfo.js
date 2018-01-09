module.exports = {
  data: {
    msg: '',
    code: '200003',
    data: {
      can_publish: true, // 是否照片有发布权限
      can_view_photo: true, // 是否能浏览图片
      can_modify_info: true,
      publish_txt: '您没有该相册的权限，无法发布图片' // can_publish为false的情况下的提示文案
    },
    succ: true,
    timestamp: '1515046666'
  }
}
