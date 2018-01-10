module.exports = {
  data: {
    msg: '',
    code: '200003',
    data: {
      can_publish: false, // 是否照片有发布权限
      can_view_photo: true, // 是否能浏览图片
      can_modify_info: true,
      gallery_name: '默认相册',
      group_id: 11, // 群ID
      group_master_name: '群主',
      is_show_tips: true,
      publish_txt: '您没有该相册的权限，无法发布图片' // can_publish为false的情况下的提示文案
    },
    succ: true,
    timestamp: '1515046666'
  }
}
