// pages/activity-detail/activity-detail.js
const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        showForm: false,
        signUpNo: '',
        myProgress: {
            status: null, // 0: 未参与; 1: 参与进行中; 2: 完成积赞;
            finishedCount: null,
            performableCount: null,
            precentNum: null,
        },
        otherProgress: {
            status: null, // 帮好友点赞; 
            finishedCount: null,
            performableCount: null,
            precentNum: null,
        },
        shareBgImg: '',
        cxCodeImg: ''
    },
    onLoad: function (options) {
        this.data.id = options.id
        if (options.signUpNo) {
            this.data.signUpNo = options.signUpNo
        }
    },
    onShow: function () {
        wx.showLoading()
        if (this.data.signUpNo) {
            this.getOthersProgress()
        }
        this.getUserProgress()
    },
    // 查看进度
    getUserProgress() {
        // 查看自己的进度
        Api.getUserProgress(this.data.id).then(res => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            wx.hideLoading()
            switch (res.data.status) {
                // 未参与
                case 'NOT_INVOLVED':
                    {
                        this.setData({
                            'myProgress.status': 0,
                        })
                        break;
                    }
                    // 进行中
                case 'ONGOING':
                    {
                        this.setData({
                            'myProgress.status': 1,
                            'myProgress.finishedCount': res.data.finishedCount,
                            'myProgress.performableCount': res.data.performableCount,
                            'myProgress.precentNum': parseInt(res.data.finishedCount / res.data.performableCount * 100)
                        })
                        break;
                    }
                    // 已完成
                case 'FINISHED':
                    {
                        this.setData({
                            'myProgress.status': 2,
                        })
                        break;
                    }
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
                'otherProgress.status': 3,
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
        this.getUserProgress()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let param = ''
        if (this.data.signUpNo) {
            param = `activityNo=${this.data.id}&signUpNo=${this.data.signUpNo}`
        } else {
            return
        }
        console.log(param)
        return {
            imageUrl: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000001.png',
            title: '帮我助力，免费领取平安果，你也可以参加哦',
            path: `pages/activity-detail/activity-detail?${param}`
        }
    },
    // 预先生成分享图
    getShareBgImg() {
        wx.showLoading({
            title: '正在生成分享图...',
            mask: true
        })
        let _this = this
        return new Promise((resolve) => {
            wx.getImageInfo({
                src: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000002.png',
                success: function (res) {
                    _this.data.shareBgImg = res.path
                    wx.getImageInfo({
                        src: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812190000030.png',
                        success: function (res) {
                            _this.data.cxCodeImg = res.path
                            resolve()
                        }
                    })
                }
            })
        })
    },
    // 生成分享图到本地相册
    createImg() {
        this.getShareBgImg().then(() => {
            const context = wx.createCanvasContext('shareCanvas')
            context.drawImage(this.data.shareBgImg, 0, 0, 375, 667)
            context.drawImage(this.data.cxCodeImg, 0, 0, 100, 100, 140, 330, 100, 100)
            context.draw(true, function () {
                wx.canvasToTempFilePath({
                    canvasId: 'shareCanvas',
                    success: function (res) {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '保存本地成功，可以在朋友圈分享哦～',
                            icon: 'none',
                            duration: 3000
                        })
                    }
                })
            })
        })
    }
})