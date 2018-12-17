//index.js
const Api = require('../../utils/api.js')

Page({
    data: {
        filters: [{
                value: 0,
                label: '推荐'
            }, {
                value: 1,
                label: '二手'
            }, {
                value: 2,
                label: '表白'
            }, {
                value: 3,
                label: '组队'
            },
            {
                value: 4,
                label: '帖子'
            }, {
                value: 5,
                label: '考研'
            }, {
                value: 6,
                label: '帮帮'
            }
        ],
        activeFilter: 0,
        listData: [{
            imgUrl: 'https://tva1.sinaimg.cn/crop.4.0.632.632.180/006AiaaWjw8f89kzrgkkyj30hs0hk3zv.jpg',
            nickname: 'white',
            uploadImgs: ['https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg', 'https://wx4.sinaimg.cn/crop.0.32.790.439/7077dc1dly1fy1wga4c2yj20ly0lyarj.jpg'],
            likeNum: 54,
            commentNum: 10,
        }, {
            imgUrl: 'https://tvax3.sinaimg.cn/crop.0.0.1080.1080.180/006UeIMUly8fxa8ik2tpgj30u00u0q6h.jpg',
            nickname: '白开水',
            likeNum: 54,
            commentNum: 10,
            uploadImgs: ["https://ww1.sinaimg.cn/bmiddle/61e7f4aaly1fy79fzf64gj20hi0f4aaz.jpg"]
        }, {
            imgUrl: 'https://tvax1.sinaimg.cn/crop.0.0.996.996.180/006ajZGLly8fwwygg0ok4j30ro0rowgb.jpg',
            nickname: '多涂防晒',
        }]
    },

    onLoad: function () {
        this.getTalkList()
        this.getChannel()
    },
    // 获取校友圈列表
    getTalkList() {
        Api.getTalkList().then(res => {
            console.log('11', res.data)
            this.setData({
                listData: res.data
            })
        })
    },
    // 获取栏目
    getChannel() {
        Api.getTalkChannel().then(res => {
            console.log(res)
        })
    },
    // 跳转校友圈详情页面
    goToTalkDetail(e) {
        wx.navigateTo({
            url: `/pages/content/content?id=${e.currentTarget.dataset.id}`
        })
    }
})