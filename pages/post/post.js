// pages/post/post.js
const Util = require('../../utils/util.js')
const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        filters: [],
        activeIndex: 0,
        hasToken: false,
        imageUrls: [],
        textareaInput: '',
        hasSubmit: false
    },
    // 选择类型
    chooseTag(e) {
        if (this.data.activeIndex === parseInt(e.target.dataset.index)) {
            this.setData({
                activeIndex: 0
            })
        } else {
            this.setData({
                activeIndex: parseInt(e.target.dataset.index)
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(Boolean(wx.getStorageSync('hasAuth')))
        // if(wx.getStorageSync('hasAuth')){
        this.setData({
            hasToken: Boolean(wx.getStorageSync('hasAuth'))
        })
        // }
        this.getChannel()
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
            console.log(res);
            this.setData({
                hasToken: true
            })
            wx.setStorageSync('hasAuth', true)
            this.postHandler()
        })
    },
    // 获取栏目
    getChannel() {
        Api.getTalkChannel().then(res => {
            this.setData({
                filters: res.data
            })
        })
    },
    // 上传图片
    chooseLocalImg() {
        let _this = this
        wx.chooseImage({
            success(res) {
                wx.showLoading({
                    title: '加载中',
                })
                const tempFilePaths = res.tempFilePaths
                console.log(res.tempFilePaths)
                tempFilePaths.forEach(element => {
                    wx.uploadFile({
                        url: Util.BASE_URL + 'light/upload', // 仅为示例，非真实的接口地址
                        filePath: element,
                        name: 'file',
                        method: "Post",
                        formData: {
                            user: 'test'
                        },
                        header: {
                            'content-type': 'multipart/form-data',
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache'
                        },
                        success(res) {
                            _this.data.imageUrls.push(JSON.parse(res.data).imgUrl)
                            _this.setData({
                                imageUrls: _this.data.imageUrls
                            })
                            wx.hideLoading()
                        }
                    })
                });
            }
        })
    },
    getTextArea(e) {
        this.data.textareaInput = e.detail.value
    },
    // 发表事件
    postHandler() {
        if (this.data.hasSubmit) return
        if (!this.data.textareaInput) {
            wx.showToast({
                title: '还没写点内容呢～',
                icon: 'none',
                duration: 3000
            })
            return
        }
        this.data.hasSubmit = true
        let arr = this.data.imageUrls.map((element, index) => {
            return {
                'index': index + 1,
                "imgUrl": element
            }
        })
        let postData = {
            talkContext: this.data.textareaInput,
            arrImg: arr,
            channelId: this.data.activeIndex
        }
        Api.postConent(postData).then(res => {
            this.data.hasSubmit = false
            console.log(res)
            if (res.success) {
                wx.showToast({
                    title: '发表成功～去首页看看吧',
                    icon: 'none',
                    duration: 3000
                })
                this.setData({
                    activeIndex: 0,
                    imageUrls: [],
                    textareaInput: ''
                })
            }
        })
    }
})