import wepy from 'wepy';

export default class Index extends wepy.page {

    data = {
        motto: 'Hello World',
        userInfo: {}
    };
    methods = {
        bindViewTap () {
            console.log('button clicked');
        }
    };
    onLoad() {
        console.log('onLoad');
    };
}