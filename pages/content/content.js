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
        detailInfo: {},
        comments: [],
        hasToken: false
    },
    onLoad: function (options) {
        this.data.id = options.id
        this.setData({
            hasToken: Boolean(wx.getStorageSync('hasAuth'))
        })
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
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
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
        let arr = this.data.detailInfo.imgs.map((element) => element.imgUrl)
        wx.previewImage({
            current: e.target.dataset.current,
            urls: arr
        })
    },
    getInputValue(e) {
        this.setData({
            inputPlaceholder: '',
            parentCommitNo: null
        })
        this.data.commentText = e.detail.value
    },
    /**
     * 获取用户信息
     */
    getUserInfo(e) {
        let data = {
            wechatNickName: e.detail.userInfo.nickName,
            wechatAvatar: e.detail.userInfo.avatarUrl
        }
        Api.saveUserInfo(data).then(res => {
            this.setData({
                hasToken: true
            })
            wx.setStorageSync('hasAuth', true)
            this.clickSend()
        })
    },
    // 点击发送评论
    clickSend(event) {
        if (event && event.detail.value) {
            this.setData({
                commentText: event.detail.value
            })
        }
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
                this.getCommentList()
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.getDetailInfo()
        this.getCommentList()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            // imageUrl: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000001.png',
            title: '发现一个有趣的内容，分享给你哦～',
            path: `pages/content/content?id=${this.data.id}`
        }
    },
})