import wepy from 'wepy';
import {request} from '../../utils/login'
import GroupItem from '../../components/index/groupItem'
import shareOrCreateGroup from '../../components/index/shareOrCreateGroup'

export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '群工具首页'
    }
    // 组件
    components = {
      shareOrCreateGroup: shareOrCreateGroup,
      groupItem: GroupItem
    }

    data = {
      groupList: [],
    }
    methods = {
    }
    async onLoad() {
      console.log(22122)
      wx.showShareMenu({
        // 要求小程序返回分享目标信息
        withShareTicket: true
       });

      await this.getList()
    }
    onShow(e) {
      wx.showShareMenu({
       withShareTicket: true
      })
     }

    async getList() {
      console.log(123432)
      var res = await request({
        url: '/gg/index/grouplist',
        data: {
          cursor: 0
        }
      })
      if (res && res.data) {
        console.log(res.data)
        this.groupList.push.apply(this.groupList, res.data.list)
        console.log(this.groupList)
        this.$apply()
        this.loadingOut()
      }
    }
    loadingOut() {
      wx.hideLoading()
    }
    onShareAppMessage(res) {
      console.log(res)
      return {
        title: '快来上传图片吧~',
        path: '/page/share/dispatcher?from=index',
        success: function(res) {
          
          console.log(res);
          if (res.shareTickets) {
            var ticket = res.shareTickets[0]
            wx.getShareInfo({
              shareTicket: ticket,
              success(res) {
                var encryptedData = res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                var iv = res.iv; // 加密算法的初始向量
                wx.login({
                  withCredentials : true,
                  success: function (res) {
                    console.log(res)
                    if (res.code) {
                      var code = res.code
                      console.log(res.code) // 使用这个 code 向微信换取 session_key
                      console.log(14);
                      request({
                          url: '/gg/group/index/dispatcher',
                          data: {
                            encryptedData: encryptedData,
                            code: code,
                            iv: iv
                          }
                      }).then((res) =>{
                        console.log(15);
                          console.log(res);
                          if(res.succ) {
                            var redirect_path = res.data.redirect_path
                            wx.navigateTo({
                              url: redirect_path
                            })
                          }
                      })
                    }
                
                
                  }
                })
                
              },
              fail() {},
              complete() {}
            })
          }
        },
        fail: function(res) {
          
        }
      }
    }
}