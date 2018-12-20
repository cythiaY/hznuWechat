//index.js
const Api = require('../../utils/api.js')

Page({
    data: {
        filters: [],
        activeFilter: 0,
        listData: []
    },
    onLoad: function () {
        this.getTalkList()
        this.getChannel()
    },
    // 获取校友圈列表
    getTalkList(data = {}) {
        Api.getTalkList(data).then(res => {
            this.setData({
                listData: res.data
            })
        })
    },
    // 筛选列表
    fliterList(e) {
        let data = {
            channelId: e.currentTarget.dataset.tag
        }
        this.setData({
            activeFilter: e.currentTarget.dataset.tag
        });
        this.getTalkList(data);
    },
    // 获取栏目
    getChannel() {
        Api.getTalkChannel().then(res => {
            res.data.unshift({
                channelName: '推荐',
                id: 0
            })
            this.setData({
                filters: res.data
            })
        })
    },
    // 跳转校友圈详情页面
    goToTalkDetail(e) {
        wx.navigateTo({
            url: `/pages/content/content?id=${e.currentTarget.dataset.id}`
        })
    }
})