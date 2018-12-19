// pages/activity-detail/activity-detail.js
const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        showForm: false,
        status: 3,
        num: 10,
        precentNum: parseInt(10 / 60 * 100)
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        console.log(3)
    },
    onShow: function () {
        console.log(1)
        this.getUserProgress()
    },
    getUserProgress() {
        Api.getUserProgress(this.data.id).then(res => {
            switch (res.data.status) {
                case 'NOT_INVOLVED':
                    {

                    }
                case 'ONGOING':
                    {

                    }
                case 'FINISHED':
                    {

                    }
            }
            if (res.success) {
                this.setData({
                    performableCount
                })
                wx.showToast({
                    title: '报名成功，快分享给好友帮你助力吧～',
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
        console.log(e.detail.value)
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
        this.getUserProgress()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '帮我助力，免费领取平安果，你也可以参加哦',
            path: 'pages/activity-detail/activity-detail'
        }
    }
})