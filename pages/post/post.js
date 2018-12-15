// pages/post/post.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tags: [{
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
        activeIndex: null,
        submitData: {
            imgs: ['https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg', 'https://wx4.sinaimg.cn/crop.0.32.790.439/7077dc1dly1fy1wga4c2yj20ly0lyarj.jpg', "https://ww1.sinaimg.cn/bmiddle/61e7f4aaly1fy79fzf64gj20hi0f4aaz.jpg"],
        }
    },
    chooseTag(e) {
        this.setData({
            activeIndex: parseInt(e.target.dataset.index)
        })
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