// pages/activity-detail/activity-detail.js
const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        signUpNo: '',
        showForm: false,
        status: null, // 0: 未参与; 1: 参与进行中; 2: 完成积赞; 3: 帮好友点赞; 
        num: 10,
        finishedCount: null,
        performableCount: null,
        precentNum: null,
        mysrc: ''
    },
    onLoad: function (options) {
        this.data.id = options.id
        console.log(3, options)
        if (options.signUpNo) {
            this.data.signUpNo = options.signUpNo
        }
    },
    onShow: function () {
        console.log(1)
        this.getUserProgress()
    },
    // 查看进度
    getUserProgress() {
        if (this.data.signUpNo) {
            this.getOthersProgress()
        } else {
            // 查看自己的进度
            Api.getUserProgress(this.data.id).then(res => {
                switch (res.data.status) {
                    // 未参与
                    case 'NOT_INVOLVED':
                        {
                            this.setData({
                                status: 0,
                            })
                            break;
                        }
                        // 进行中
                    case 'ONGOING':
                        {
                            this.setData({
                                status: 1,
                                finishedCount: res.data.finishedCount,
                                performableCount: res.data.performableCount,
                                precentNum: parseInt(res.data.finishedCount / res.data.performableCount * 100)
                            })
                            break;
                        }
                        // 已完成
                    case 'FINISHED':
                        {
                            this.setData({
                                status: 2,
                            })
                            break;
                        }
                }
            })
        }
    },
    // 查看朋友的进度
    getOthersProgress() {
        Api.getOthersProgress(this.data.signUpNo).then(res => {
            this.setData({
                status: 3,
                finishedCount: res.data.finishedCount,
                performableCount: res.data.performableCount,
                precentNum: parseInt(res.data.finishedCount / res.data.performableCount * 100)
            })
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
                    status: 1,
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
            param = `activityNo=${this.data.id}`
        }
        console.log(param)
        return {
            imageUrl: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000001.png',
            title: '帮我助力，免费领取平安果，你也可以参加哦',
            path: `pages/activity-detail/activity-detail?${param}`
        }
    },
    createImg() {
        let _this = this
        let canvasWidth, canvasHeight, path
        wx.getSystemInfo({
            success: function (res) {
                // _this.setData({
                // screenWidth: res.screenWidth,
                // screenHeight: res.screenHeight,
                canvasWidth = res.screenWidth / 375 * 350
                canvasHeight = res.screenHeight / 667 * 500
                //   })
            }
        })
        wx.getImageInfo({
            src: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000020.png',
            success: function (res) {
                _this.data.mysrc = res.path
                // TODO 绘制分享canvas图draw 
                // TODO 绘制成功后，把canvas转化成图片wx.canvasToTempFilePath 
                // TODO 转成功后，自动保存图片到系统相册wx.saveImageToPhotosAlbum    
            }
        })
        // wx.downloadFile({
        //     url: 'https://light-real.oss-cn-hangzhou.aliyuncs.com/6011812210000020.png',
        //     success: function (sres) {
        //         console.log(sres);
        //         _this.data.mysrc = sres.tempFilePath
        //     },
        //     fail: function (fres) {

        //     }
        // })

        wx.showLoading({
            title: '正在生成分享图...',
            mask: true
        })
        const context = wx.createCanvasContext('shareCanvas')
        context.drawImage(this.data.mysrc, 0, 0, canvasWidth, canvasHeight)
        context.draw()
        // context.save()
        context.draw(true, setTimeout(function () {
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
        }, 1000))


        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        // setTimeout(() => {
        //     wx.canvasToTempFilePath({
        //             canvasId: 'shareCanvas',
        //             success: function (res) {
        //                 wx.hideLoading()
        //                 // _this.setData({
        //                 //     imagePath: res.tempFilePath
        //                 // })
        //                 wx.saveImageToPhotosAlbum({
        //                     filePath: res.tempFilePath,
        //                   })
        //             },
        //             fail: function (res) {
        //                 console.log(res.errMsg)
        //             }
        //         },
        //         this
        //     )
        // }, 2000)
    }
})