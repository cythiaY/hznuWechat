//index.js
const Api = require('../../utils/api.js')

Page({
    data: {
        filters: [],
        activeFilter: 0,
        listData: [],
        keyword: '',
        pageNum: 0,
        hasMore: true
    },
    onLoad: function () {
        this.getChannel()
    },
    onShow() {
        if (this.data.filters.length > 0) {
            this.setData({
                keyword: '',
                activeFilter: 0
            })
            this.getTalkList()
        }
    },
    // 获取校友圈列表
    getTalkList(data = {}) {
        this.data.pageNum = 0
        data.offset = 0
        Api.getTalkList(data).then(res => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            this.setData({
                listData: res.data
            })
        }).catch(err => {
            wx.setStorageSync('sid', '');
            wx.setStorageSync('teamCode', '');
            this.getTalkList()
            console.warn(err)
        })
    },
    // 筛选列表
    fliterList(e) {
        let data = {
            channelId: e.currentTarget.dataset.tag
        }
        this.setData({
            activeFilter: e.currentTarget.dataset.tag,
            keyword: ''
        });
        this.getTalkList(data);
    },
    // 搜索列表
    searchList(e) {
        this.setData({
            keyword: e.detail.value
        });
        this.getTalkList({
            talkContext: this.data.keyword
        });
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
    // 下拉加载
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        this.getTalkList()
    },
    // 加载更多
    onReachBottom() {
        if (!this.data.hasMore) return
        let postData = {
            offset: this.data.pageNum * 10,
            talkContext: this.data.keyword,
            channelId: this.data.activeFilter
        }
        Api.getTalkList(postData).then(res => {
            if (res.data.length === 0) {
                this.data.hasMore = false
                wx.showToast({
                    title: '已加载全部内容哦～',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            this.data.pageNum++;
            this.setData({
                listData: this.data.listData.concat(res.data),
            })
            console.log('list', this.data.listData)
        })
    }
})