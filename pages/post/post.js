// pages/post/post.js
const Util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tags: [{
                value: 0,
                label: '推荐'
            }, {
                value: 1,
                label: '二手'
            }, {
                value: 2,
                label: '表白'
            }, {
                value: 3,
                label: '组队'
            },
            {
                value: 4,
                label: '帖子'
            }, {
                value: 5,
                label: '考研'
            }, {
                value: 6,
                label: '帮帮'
            }
        ],
        activeIndex: null,
        submitData: {
            imgs: ['https://wx4.sinaimg.cn/orj360/006AiaaWly1fy37z8vourj31120ku40g.jpg', 'https://wx4.sinaimg.cn/crop.0.32.790.439/7077dc1dly1fy1wga4c2yj20ly0lyarj.jpg', "https://ww1.sinaimg.cn/bmiddle/61e7f4aaly1fy79fzf64gj20hi0f4aaz.jpg"],
        },
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
    },
    /**
     * 获取用户信息
     */
    getUserInfo(e) {
        console.log(e);

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