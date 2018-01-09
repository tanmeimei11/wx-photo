import wepy from 'wepy';
import { request } from '../../utils/login'
import joinUs from '../../components/gallery/joinUs'

export default class gallery extends wepy.page {
    config = {
        navigationBarTitleText: '群活动相册'
    }
    components = {
      joinUs: joinUs
    }

    data = {
        groupID: '',
        title: '',
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
        toSetting() {
            wx.navigateTo({
                url: `/pages/setting/setting?id=${this.groupID}`
            });
        },
        toAlbum() {
            wx.navigateTo({
                url: `/pages/album/album?id=${this.groupID}`
            });
        }
    }
    onLoad(options) {
        this.loadInfo()
        this.loadGallerylist()
        this.groupID = options.id
        this.title = opitons.id
        this.$apply()
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
                group_id: this.groupID
            }
        })
        if (res.succ && res.data) {
            this.groupInfo = res.data
            this.$apply()
            console.log(this.groupInfo)
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
                group_id: this.groupID,
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