const Util = require('./util.js')

/**
 * 
 * 获取官网信息
 * @param {*} obj 
 * 
 */
export function getHomeInfo(obj = {}) {
    return Util.ajax({
        url: 'companyInfo/companyInfoAction/getCompanyInfoByTeam.json',
        method: 'get',
        data: obj
    })
}
/**
 * 
 * 获取官网热门车型
 * @param {*} obj 
 * 
 */
export function getSimpleCarList(obj = {}) {
    return Util.ajax({
        url: 'carModel/carModelAction/getSimpleModelByTeamCode.json',
        method: 'get',
        data: obj
    })
}
/**
 * 
 * 获取全部车型
 * @param {*} obj 
 * 
 */
export function getAllCarList(obj = {}) {
    return Util.ajax({
        url: 'carModel/carModelAction/getAllModelByTeamCode.json',
        method: 'get',
        data: obj
    })
}
/**
 * 
 * 获取车型详情
 * @param {*} obj 
 * 
 */
export function getCarDetail(obj = {}) {
    return Util.ajax({
        url: 'carModel/carModelAction/loadCarModelInfo.json',
        method: 'get',
        data: obj
    })
}
/**
 * 
 * 获取拨打电话线索
 * @param {*} obj 
 * 
 */
export function getPhoneNumber(obj = {}) {
    return Util.ajax({
        url: 'clue/clueAction/addPhoneClue.json',
        method: 'post',
        data: obj
    })
}
/**
 * 
 * 获取预约咨询线索
 * @param {*} obj 
 * 
 */
export function postBookForm(obj = {}) {
    return Util.ajax({
        url: 'clue/clueAction/addAppointmentClue.json',
        method: 'post',
        data: obj
    })
}
/**
 * 
 * 获取车型分享信息
 * @param {*} obj 
 * 
 */
export function getDetailShareCode(obj = {}) {
    return Util.ajax({
        url: 'carModel/carModelAction/shareCarModel.json',
        method: 'post',
        data: obj
    })
}
/**
 * 
 * 获取官网分享信息
 * @param {*} obj 
 * 
 */
export function getHomeShareCode(obj = {}) {
    return Util.ajax({
        url: 'companyInfo/companyInfoAction/shareCompany.json',
        method: 'post',
        data: obj
    })
}