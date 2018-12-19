//app.js
const Util = require('./utils/util.js')
App({
    onLaunch() {
        wx.showLoading({
            title: '加载中',
        })
        this.globalData.token = wx.getStorageSync('sid') || ''
        // wx.setStorageSync('sid', 'HPWobeVy6OJVzrfAcNtlB4a5gTws')
        this.initApp()
    },
    /**
     * 
     * 初始小程序 token和其他数据
     * @argument arguments[0] 强制重新login
     * @returns Promise
     * 
     */
    initApp() {
        let _this = this
        if (!wx.getStorageSync('sid')) {
            return new Promise((resolve, reject) => {
                    wx.login({
                        success(res) {
                            console.log('res', res)
                            resolve(res.code)
                        },
                        fail(res) {
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
        let _this = this
        let obj = {
            url: 'light/author/wechat/default',
            data: {
                code: arguments[0]
            },
            method: 'post',
        }
        return this.ajax(obj).then(res => {
            wx.setStorageSync('sid', res)
            _this.globalData.token = res
        }).catch((res) => {
            wx.showToast({
                title: '抱歉，获取token失败',
                icon: 'none',
                duration: 3000
            })
            return Promise.reject(res)
        })
    },
    /**
     * 
     * 小程序数据初始化，前提有token
     * @returns Promise
     * 
     */
    initData() {
        let _this = this
        let initObj = {
            url: 'init/initAction/init.json',
            data: {
                shareCode: wx.getStorageSync('shareCode'),
                token: _this.globalData.token,
            },
            header: {
                // 'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'get',
        }
        return this.ajax(initObj).then(res => {
            for (let key in res) {
                if (res.hasOwnProperty(key)) {
                    wx.setStorageSync(key, res[key])
                }
            }
            wx.hideLoading()
        }).catch((res) => {
            wx.showToast({
                title: '抱歉，官网内容丢失，请您联系更换二维码后，重新扫描识别。',
                icon: 'none',
                duration: 4000
            })
            return Promise.reject(res)
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
                    console.log('request', res)
                    if (res.statusCode === 200 && res.data.success) {
                        console.log(1)
                        resolve(res.data.data)
                    } else {
                        console.log(2)
                        reject(res.data)
                    }
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    },
    globalData: {
        token: ''
    }
})