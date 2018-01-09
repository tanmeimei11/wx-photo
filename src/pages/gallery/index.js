import wepy from 'wepy';
import { request } from '../../utils/login'

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText: '群活动相册'
    }

    data = {
        groupInfo: {},
        galleryList: [],
        loading: false,
        noMoreNote: false,
        page: 0,
    }
    methods = {
        // changeBg () {
        //     wx.chooseImage({
        //         count: 1,
        //         success: function(res) {
        //             console.log(res)
        //         }
        //     })
        // },
    }
    onLoad() {
        this.loadInfo()
        this.loadGallerylist()
    }
    onReachBottom() {
        if (this.data.noMoreNote) {
            return
        }
        let that = this;
        setTimeout(function () {
            that.loadGallerylist();
        }, 300);
    }
    async loadInfo() {
        var res = await request({
            url: '/gg/group/info',
            data: {
                group_id: 0
            }
        })
        if(res.succ && res.data) {
            this.groupInfo = res.data
            this.$apply()
        }
    }
    async loadGallerylist() {
        if (this.data.loading) {
            return
        }
        this.data.loading = true
        var res = await request({
            url: '/gg/group/gallerylist',
            data: {
                group_id: 0,
                page: this.data.page
            }
        })
        if (res.succ && res.data) {
            console.log(res)
            this.galleryList = res.data.galleries
            this.data.page = this.data.page + 1
            this.$apply()
            if (!res.data.has_next) {
                this.data.noMoreNote = true
                this.$apply()
                return
            }
        } else {
            this.data.noMoreNote = true
            this.$apply()
        }
        this.data.loading = false
    }
}