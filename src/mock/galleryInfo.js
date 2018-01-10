module.exports = {
  data: {
    msg: '',
    code: '200003',
    data: {
      can_publish: true, // 是否照片有发布权限
      can_view_photo: true, // 是否能浏览图片
      publish_txt: '您没有该相册的权限，无法发布图片', // can_publish为false的情况下的提示文案
      can_modify_info: true, // 是否有修改相册权限
      gallery_name: '默认相册',
      group_info: {
        group_id: 11, // 群ID
        group_master_name: '群主',
        group_master_avatar: 'http://inimg02.jiuyan.info/in/2017/12/06/267B9C9E-6B01-FE2F-4B7A-8783B402C622.png'
      },
      toast_info: {
        avatar: 'http://inimg02.jiuyan.info/in/2017/10/12/3094CFE5-3ADE-33D0-9C16-6EE372A0015D.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
        inviter_name: '后知也是一休',
        invite_action: '邀请你',
        txt: '大家快来上传活动照片啦，没人都能免费打印12张照片',
        is_show: true // 是否展示
      }
    },
    succ: true,
    timestamp: '1515046666'
  }
}
