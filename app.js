//app.js
const Util = require('./utils/util.js')
App({
    onLaunch() {
        wx.showLoading({
            title: '加载中',
        })
    },
    /**
     * 
     * 初始小程序 token和其他数据
     * @returns Promise
     * 
     */
    initApp() {
        let _this = this
        if (!wx.getStorageSync('sid')) {
            return new Promise((resolve, reject) => {
                    wx.login({
                        success(res) {
                            resolve(res.code)
                        },
                        fail(res) {
                            wx.hideLoading()
                            reject(res)
                        }
                    })
                })
                .then(_this.initToken)
        } else {
            wx.hideLoading()
            return Promise.resolve()
        }
    },
    /**
     * 
     * 获取token
     * @returns Promise
     * 
     */
    initToken() {
        let obj = {
            url: 'light/author/wechat/default',
            data: {
                code: arguments[0]
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
        }
        let _this = this
        return this.ajax(obj).then(res => {
            wx.hideLoading()
            wx.setStorageSync('sid', res.sid)
        }).catch((res) => {
            console.log(res)
            if (res.code === "1001") {
                wx.setStorageSync('sid', '')
                _this.initApp()
            } else {
                // wx.showToast({
                //     title: '抱歉，获取token失败',
                //     icon: 'none',
                //     duration: 3000
                // })
                return Promise.reject(res)
            }
        })
    },
    /**
     * 
     * ajax封装
     * @param obj 请求参数
     * 
     */
    ajax(obj) {
        return new Promise((resolve, reject) => {
            let {
                url,
                data,
                method,
                header
            } = obj
            wx.request({
                url: Util.BASE_URL + url,
                data,
                header,
                method,
                success(res) {
                    if (res.statusCode === 200 && res.data.success) {
                        resolve(res.data.data)
                    } else {
                        reject(res.data)
                    }
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    }
})