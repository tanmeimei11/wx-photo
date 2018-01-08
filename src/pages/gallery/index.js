import wepy from 'wepy';
import {request} from '../../utils/login'

export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '群活动相册'
    }

    data = {
        groupInfo: {}
    };
    methods = {
        changeBg () {
            wx.chooseImage({
                count: 1,
                success: function(res) {
                    console.log(res)
                }
            })
        }
    };
    onLoad() {
        request({
            url: '/gg/group/info',
            data: {
                group_id: 0
            }
        }).then((res) =>{
            this.groupInfo = res
            this.$apply()
            console.log(this.groupInfo)
        })
    };
}