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
/**
 * 获取个人活动进度
 * @param {*} activityNo 
 */
export function getUserProgress(activityNo = '') {
    return Util.ajax({
        url: `light/activity/user/get?activityNo=${activityNo}`,
        method: 'get',
    })
}

/**
 * 获取朋友的活动进度
 * @param {*} activityNo 
 */
export function getOthersProgress(signUpNo = '') {
    return Util.ajax({
        url: `light/activity/progresses?signUpNo=${signUpNo}`,
        method: 'get',
    })
}

/**
 * 保存用户授权信息
 * @param {*} opts 
 */
export function saveUserInfo(opts = {}) {
    return Util.ajax({
        url: 'light/author/save/userInfo',
        method: 'post',
        data: opts
    })
}
/**
 * 获取活动列表
 * @param {*}  
 */
export function getActivityList() {
    return Util.ajax({
        url: 'light/activity/list',
        method: 'get',
    })
}

/**
 * 发表文章
 * @param {*} opts 
 */
export function postConent(opts = {}) {
    return Util.ajax({
        url: 'light/content/add',
        method: 'post',
        data: opts
    })
}
/**
 * 帮助好友点赞
 * @param {*}  
 */
export function helpFriend(activityNo = '', signUpNo = '') {
    return Util.ajax({
        url: `light/activity/like?activityNo=${activityNo}&signUpNo=${signUpNo}`,
        method: 'get',
    })
}
/**
 * 获取二维码
 * @param {*}  
 */
export function getQrcode(scene = '') {
    return Util.ajax({
        url: `light/wechat/qrcode?scene=${scene}&page=pages/other-act-detail/other-detail&width=100`,
        method: 'get',
    })
}