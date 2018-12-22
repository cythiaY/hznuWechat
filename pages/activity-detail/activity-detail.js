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
        shareBgImg: '',
        cxCodeImg: ''
    },
    onLoad: function (options) {
        this.data.id = options.id
    },
    onShow: function () {
        wx.showLoading()
        this.getUserProgress()
    },
    // 查看自己的进度
    getUserProgress() {
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
                            signUpNo: res.data.signUpNo
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
                            'myProgress.precentNum': parseInt(res.data.finishedCount / res.data.performableCount * 100),
                            signUpNo: res.data.signUpNo
                        })
                        break;
                    }
                    // 已完成
                case 'FINISHED':
                    {
                        this.setData({
                            'myProgress.status': 2,
                            signUpNo: res.data.signUpNo
                        })
                        break;
                    }
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
        this.getUserProgress()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            imageUrl: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000001.png',
            title: '帮我助力，免费领取平安果，你也可以参加哦',
            path: `pages/other-act-detail/other-detail?activityNo=${this.data.id}&signUpNo=${this.data.signUpNo}`
        }
    },
    // 预先生成分享图
    getShareBgImg() {
        wx.showLoading({
            title: '正在生成分享图...',
            mask: true
        })
        let _this = this
        return new Promise((resolve, reject) => {
            Api.getQrcode(`id=${_this.data.id}&signUpNo=${_this.data.signUpNo}`).then((res) => {
                console.log('code', res)
                if (res.success) {
                    let codeImgUrl = wx.arrayBufferToBase64(res.data);
                    wx.getImageInfo({
                        src: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000002.png',
                        success: function (res) {
                            _this.data.shareBgImg = res.path
                            wx.getImageInfo({
                                src: codeImgUrl,
                                success: function (res) {
                                    _this.data.cxCodeImg = res.path
                                    resolve()
                                }
                            })
                        }
                    })
                } else {
                    reject()
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
        }).catch(() => {
            wx.showToast({
                title: '生成图片失败，请稍后重试～',
                icon: 'none',
                duration: 3000
            })
        })
    }
})