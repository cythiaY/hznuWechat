//index.js
const Api = require('../../utils/api.js')

Page({
    data: {
        filters: [],
        activeFilter: 0,
        listData: [],
        keyword: '',
        pageNum: 0
    },
    onLoad: function () {
        this.getChannel()
    },
    onShow() {
        if (this.data.filters.length > 0) {
            this.getTalkList()
        }
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
    // 搜索列表
    searchList(e) {
        console.log(e)
        let data = {
            talkContext: e.detail.value
        }
        this.getTalkList(data);
    },
    // 获取栏目
    getChannel() {
        Api.getTalkChannel().then(res => {
            this.getTalkList()
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
    },
    // 加载更多
    onReachBottom() {
        if (this.data.dataObj.currentIndex < this.data.totalPage) {
            this.data.dataObj.currentIndex++;
            this.getTalkList();
        } else {
            wx.showToast({
                title: '已加载全部内容哦～',
                icon: 'none',
                duration: 2000
            })
        }
    }
})