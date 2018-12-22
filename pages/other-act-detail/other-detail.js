const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        signUpNo: '',
        myProgressStatus: true, // 我是否参与活动
        otherProgress: {
            finishedCount: null,
            performableCount: null,
            precentNum: null,
        }
    },
    onLoad: function (options) {
        console.log('share', options)
        let strs = decodeURIComponent(options.scene).split('&')
        let idParams = strs[0].split('=');
        let noParams = strs[1].split('=');
        this.data.id = idParams[1]
        this.data.signUpNo = noParams[1]
    },
    onShow: function () {
        wx.showLoading()
        this.getOthersProgress()
        this.getMyProgress()
    },
    // 查看自己的进度
    getMyProgress() {
        Api.getUserProgress(this.data.id).then(res => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            wx.hideLoading()
            if (res.data.status === 'NOT_INVOLVED') {
                this.setData({
                    myProgressStatus: false,
                })
            }
        })
    },
    // 查看朋友的进度
    getOthersProgress() {
        Api.getOthersProgress(this.data.signUpNo).then(res => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            wx.hideLoading()
            this.setData({
                'otherProgress.finishedCount': res.data.finishedCount,
                'otherProgress.performableCount': res.data.performableCount,
                'otherProgress.precentNum': parseInt(res.data.finishedCount / res.data.performableCount * 100)
            })
        })
    },
    // 从好友分享页面切换到我的进度页面
    showMyProgress() {
        wx.redirectTo({
            url: `/pages/activity-detail/activity-detail?id=${this.data.id}`
        });
    },
    // 帮好友点赞
    helpFriend() {
        Api.helpFriend(this.data.id, this.data.signUpNo).then((res) => {
            if (res.success) {
                wx.showToast({
                    title: '真棒，你又帮一位好友助力啦！',
                    icon: 'none',
                    duration: 3000
                })
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    },
    openForm() {
        this.setData({
            showForm: true
        })
    },
    closeFrom() {
        this.setData({
            showForm: false
        })
    },
    submitForm(e) {
        if (!e.detail.value.consignee) {
            wx.showToast({
                title: '请输入收货人姓名',
                icon: 'none',
                duration: 3000
            })
            return
        }
        if (!e.detail.value.consigneePhone) {
            wx.showToast({
                title: '请输入收货人手机号',
                icon: 'none',
                duration: 3000
            })
            return
        }
        if (!e.detail.value.consigneeAdd) {
            wx.showToast({
                title: '请先输入收货人地址',
                icon: 'none',
                duration: 3000
            })
            return
        }
        if (!(/^1\d{10}$/.test(e.detail.value.consigneePhone))) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 3000
            })
            return
        }
        let postData = {
            activityNo: this.data.id || '1001',
            userMobile: e.detail.value.phone,
            winner: e.detail.value.consignee,
            winnerMobile: e.detail.value.consigneePhone,
            winnerAddress: e.detail.value.consigneeAdd
        }
        Api.applyActivity(postData).then(res => {
            if (res.success) {
                this.setData({
                    'myProgress.status': 1,
                    showForm: false
                })
                wx.showToast({
                    title: '报名成功，快分享给好友帮你助力吧～',
                    icon: 'none',
                    duration: 3000
                })
            } else {
                wx.showToast({
                    title: res.msg || 'sorry，系统异常请稍后重试',
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        this.getOthersProgress()
    }
})