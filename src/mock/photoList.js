module.exports = {
  data: {
    msg: '',
    code: '200003',
    succ: true,
    data: {
      has_next: true, // 是否还有下一页
      list: [{
        is_zan: false, // 是否点赞
        photo_id: '1123244', // 图片id
        fmt_time: '8分钟', // 发图距离现在时间
        has_auth: true, // 是否有权限
        photo_type: '3',
        // photos: [{
        //   url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 用于展示的图片列表
        //   origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
        //   photo_id: '1123244', // 图片id
        //   album_id: '2233' // 多图相片中某张图片的id
        // }],
        'video': {
          'duration': '', // 视频时长
          'play_url': 'http:\/\/video01.jiuyan.info\/in\/2018\/01\/12\/3DFF0636-00FD-0DC8-14FA-4F7EEBE8A45D-1WnZPypP.mp4', // 视频地址
          'cover_url': 'http:\/\/inimg05.jiuyan.info\/in\/2018\/01\/12\/BC8B5ACD-DA7D-F990-AAD3-F4433B5FA5E7-1WnZPypP.jpg?imageMogr2\/format\/jpg\/thumbnail\/720x%3E\/quality\/90!', // 视频封面图
          'video_width': '100',
          'video_height': '200'
        },
        user: {
          name: '王小虎',
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283' // 图片作者id
        },
        zan_list: []
      }, {
        is_zan: false, // 是否点赞
        photo_id: '1123244', // 图片id
        fmt_time: '8分钟', // 发图距离现在时间
        has_auth: true, // 是否有权限
        photo_type: '0',
        photos: [{
          url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }],
        user: {
          name: '王小虎',
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283' // 图片作者id
        },
        zan_list: []
      }, {
        is_zan: false, // 是否点赞
        photo_id: '1123244', // 图片id
        fmt_time: '8分钟', // 发图距离现在时间
        photo_type: '0',
        photos: [{
          url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }, {
          url: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }],
        user: {
          name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283' // 图片作者id
        },
        zan_list: [{
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283'
        },
        {
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283'
        }

        ]
      }, {
        is_zan: false, // 是否点赞
        photo_id: '1123244', // 图片id
        fmt_time: '8分钟', // 发图距离现在时间
        photo_type: '0',
        photos: [{
          url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }, {
          url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 用于展示的图片列表
          origin_url: 'https://inimg07.jiuyan.info/aW4vMjAxNy8xMC8yNi85NUQ1RDk2NS1FMjE1LTYwREQtQkIxRS0wQkYxQjlDOTUxM0QuanBn', // 原图
          photo_id: '1123244', // 图片id
          album_id: '2233' // 多图相片中某张图片的id
        }],
        user: {
          name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283' // 图片作者id
        },
        zan_list: [{
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283'
        },
        {
          avatar: 'http://inimg02.jiuyan.info/in/2016/12/01/32AED610-14DD-68F8-AAF2-123BEE24CFFC-1EJqr.jpg?imageMogr2/format/jpg/thumbnail/50x%3E/quality/90!',
          user_id: '1283'
        }
        ]
      }]
    },
    timestamp: '1515055637'
  }

}
