const Util = require('./util.js')


/**
 * 
 * 获取校友圈列表
 * @param {*} obj 
 * 
 */
export function getUserInfo(obj = {}) {
    return Util.ajax({
        url: 'light/author/wechat/getUser',
        method: 'post',
        data: obj
    })
}
/**
 * 
 * 获取校友圈列表
 * @param {*} obj 
 * 
 */
export function getTalkList(obj = {}) {
    return Util.ajax({
        url: 'light/content/list',
        method: 'post',
        data: obj
    })
}
/**
 * 
 * 获取言论详情
 * @param {*} talkNo 
 * 
 */
export function getTalkDetail(talkNo = '') {
    return Util.ajax({
        url: `light/content/get/${talkNo}`,
        method: 'get'
    })
}
/**
 * 
 * 获取言论详情
 * @param {*} talkNo 
 * 
 */
export function getTalkCommentDetail(talkNo = '') {
    return Util.ajax({
        url: `light/content/commit/get/${talkNo}`,
        method: 'get'
    })
}
/**
 * 
 * 增加评论
 * @param {*} talkNo 
 * 
 */
export function addTalkComment(opts = {}) {
    return Util.ajax({
        url: 'light/content/comment/add',
        method: 'post',
        data: opts
    })
}
/**
 * 
 * 获取栏目
 * @param {*} talkNo 
 * 
 */
export function getTalkChannel() {
    return Util.ajax({
        url: 'light/channel/list',
        method: 'get'
    })
}
/**
 * 
 * 报名活动
 * @param {*} talkNo 
 * 
 */
export function applyActivity(opts = {}) {
    return Util.ajax({
        url: 'light/activity/signUp',
        method: 'post',
        data: opts
    })
}

export function getUserProgress(activityNo = '') {
    return Util.ajax({
        url: `light/activity/user/get?activityNo=${activityNo}`,
        method: 'get',
    })
}