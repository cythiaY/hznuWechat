// pages/post/post.js
const Util = require('../../utils/util.js')
const Api = require('../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        filters: [],
        activeIndex: null,
        hasToken: false,
        imageUrls: []
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
        // if(wx.getStorageSync('token')){
        // this.setData({
        //     hasToken: Boolean(getApp().globalData.token)
        // })
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
    chooseLocalImg() {
        let _this = this
        wx.chooseImage({
            success(res) {
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
                        }
                    })
                });
            }
        })
    }
})