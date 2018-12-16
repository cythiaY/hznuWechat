// pages/activity/activity.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activities: [{
                img: 'https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg',
                title: '温暖平安夜，集赞领苹果',
                content: '在这充满欢乐的节日气氛里，千份平安果免费送啦！大家不要错过哦...',
                status: '进行中',
                signUpNum: 56
            },
            {
                img: 'https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg',
                title: '温暖平安夜，集赞领苹果',
                content: '在这充满欢乐的节日气氛里，千份平安果免费送啦！大家不要错过哦...',
                status: '进行中',
                signUpNum: 56
            }
        ]
    },
    goToActDetail() {
        wx.navigateTo({
            url: '/pages/activity-detail/activity-detail'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})