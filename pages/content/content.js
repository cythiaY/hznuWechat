// pages/content/content.js
const Api = require('../../utils/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        commentText: '',
        isPravite: 0,
        commentNum: 0,
        replyFocus: false,
        inputPlaceholder: '',
        parentCommitNo: null,
        detailInfo: {
            imgUrl: 'https://tva1.sinaimg.cn/crop.4.0.632.632.180/006AiaaWjw8f89kzrgkkyj30hs0hk3zv.jpg',
            nickname: 'white',
            time: '2018-12-12 00:00:00',
            talkContext: "双十一后要吃土的童鞋注意一下，老区的土质较差口感不好，畅志园的土比黏容易粘牙。新区食品院附近树下的土带有一点甜味，是真的评价土质的口感，了。",
            talkImg: ['https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg', 'https://wx4.sinaimg.cn/crop.0.32.790.439/7077dc1dly1fy1wga4c2yj20ly0lyarj.jpg', "https://ww1.sinaimg.cn/bmiddle/61e7f4aaly1fy79fzf64gj20hi0f4aaz.jpg"],
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
    onLoad: function (options) {
        this.data.id = options.id
        this.getDetailInfo()
        this.getCommentList()
    },
    // 获取详细信息
    getDetailInfo() {
        Api.getTalkDetail(this.data.id).then(res => {
            this.setData({
                detailInfo: res.data
            })
        })
    },
    // 获取言论的评论
    getCommentList() {
        Api.getTalkCommentDetail(this.data.id).then(res => {
            console.log(res)
            this.setData({
                comments: res.data.commitList,
                commentNum: res.data.total
            })
        })
    },
    // 回复评论
    replayPress(e) {
        this.setData({
            replyFocus: true,
            inputPlaceholder: `回复${e.target.dataset.name}`,
            parentCommitNo: e.target.dataset.commentno
        })
    },
    // 查看大图
    previewImage(e) {
        wx.previewImage({
            current: e.target.dataset.current,
            urls: this.data.content.talkImg
        })
    },
    getInputValue(e) {
        this.setData({
            inputPlaceholder: '',
            parentCommitNo: null
        })
        this.data.commentText = e.detail.value
    },
    // 点击发送评论
    clickSend() {
        if (!this.data.commentText) {
            wx.showToast({
                title: '评论内容不能为空～',
                icon: 'none',
                duration: 2000
            })
            return
        }
        let _this = this
        wx.showModal({
            title: '评论类型',
            content: '私密评论仅拥有者可见，公开则所有人可见～',
            cancelText: '公开',
            cancelColor: '#fa5167',
            confirmText: '私密',
            confirmColor: '#6b6b6b',
            success(res) {
                if (res.confirm) {
                    _this.data.isPravite = 1
                }
                let postData = {
                    talkNo: _this.data.id,
                    commentContext: _this.data.commentText,
                    hasSecret: 0
                }
                if (_this.data.parentCommitNo) {
                    postData.parentCommitNo = _this.data.parentCommitNo
                }
                _this.submitComment(postData)
            }
        })
    },
    // 提交评论
    submitComment(postData) {
        Api.addTalkComment(postData).then(res => {
            if (res.success) {
                wx.showToast({
                    title: '评论成功～',
                    icon: 'none',
                    duration: 2000
                })
                this.setData({
                    commentText: ''
                })
            } else {
                wx.showToast({
                    title: '评论失败，请稍后重试～',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})