// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: {
            imgUrl: 'https://tva1.sinaimg.cn/crop.4.0.632.632.180/006AiaaWjw8f89kzrgkkyj30hs0hk3zv.jpg',
            nickname: 'white',
            time: '2018-12-12 00:00:00',
            talkContext: "双十一后要吃土的童鞋注意一下，老区的土质较差口感不好，畅志园的土比黏容易粘牙。新区食品院附近树下的土带有一点甜味，是真的评价土质的口感，了。",
            talkImg: ['https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg', 'https://wx4.sinaimg.cn/crop.0.32.790.439/7077dc1dly1fy1wga4c2yj20ly0lyarj.jpg', "https://ww1.sinaimg.cn/bmiddle/61e7f4aaly1fy79fzf64gj20hi0f4aaz.jpg"],
            commentNum: 50,
        },
        comments: [{
                imgUrl: 'https://tva1.sinaimg.cn/crop.4.0.632.632.180/006AiaaWjw8f89kzrgkkyj30hs0hk3zv.jpg',
                nickname: 'white',
                time: '2018-12-12 00:00:00',
                commentContext: '这是一条评论',
                replies: [{
                        nickname: 'white',
                        replyContext: '这是一条评论回复',
                    },
                    {
                        nickname: 'white',
                        replyContext: '这是另一条评论回复',
                    }
                ]
            },
            {
                imgUrl: 'https://tva1.sinaimg.cn/crop.4.0.632.632.180/006AiaaWjw8f89kzrgkkyj30hs0hk3zv.jpg',
                nickname: 'white',
                time: '2018-12-12 00:00:00',
                commentContext: '这是一条评论',
                replies: [{
                        nickname: 'white',
                        replyContext: '这是一条评论回复',
                    },
                    {
                        nickname: 'white',
                        replyContext: '这是另一条评论回复',
                    }
                ]
            }
        ]
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

    },
    /**
     * 查看大图
     * @param {*} e 
     */
    previewImage(e) {
        wx.previewImage({
            current: e.target.dataset.current,
            urls: this.data.content.talkImg
        })
    },
    /**
     * 发表评论
     */
    submitComment() {}
})