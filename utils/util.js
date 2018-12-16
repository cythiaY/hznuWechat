// 不同环境的 baseUrl 
// 测试环境
// const BASE_URL = 'http://wx-dev.souchelease.net/'

//正式环境
const BASE_URL = 'https://www.nwtzhuzhu.cn/'

/**
 *
 * ajax封装 
 * 校验token
 * @return new Promise
 *
 */

let getTokenBeforeAjax = null;

const ajax = function (obj) {
    let { url, method, data } = obj
    url = BASE_URL + url

    getTokenBeforeAjax = getTokenBeforeAjax || getApp().initApp();
    return getTokenBeforeAjax.then(() => {
        let header = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        data.token = getApp().globalData.token
        data.teamCode = wx.getStorageSync('teamCode')
        return new Promise((resolve, reject) => {
            wx.request({
                url,
                data,
                header,
                method: method || 'POST',
                success(res) {
                    if (res.statusCode === 200 && parseInt(res.data.code) === 200) {
                        resolve(res.data.data)
                    } else {
                        reject(res)
                    }
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    }).catch(err => Promise.reject(err.data))
}

/**
 * 
 * extend对象扩展
 * 深拷贝，支持多个源数据
 * @argument(target, source) (目标对象, 源对象)
 * 
 */
const extend = function () {
    let target = arguments[0]
    target = Object(target)
    for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];
        let keysArray = Object.keys(Object(nextSource));
        for (let nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
            let nextKey = keysArray[nextIndex];
            if (typeof keysArray[nextIndex] === "object") {
                target[nextKey] = extend(target[nextKey], nextSource[nextKey])
            } else {
                target[nextKey] = nextSource[nextKey];
            }
        }
    }
    return target
}
module.exports = {
    ajax,
    BASE_URL
}
