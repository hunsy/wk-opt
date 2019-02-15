import axios from '@/utils/request'

const Base = "/admin/merchant";


/**
 * 获取商户分页数据
 * 
 * @param {*} queryInfo 
 */
export const getPage = (queryInfo) => axios.get(`${Base}/page`, {
  params: queryInfo
})


/**
 * 获取商户下的支付账号
 * 
 * @param {*} merchantId 
 */
export const getThirdAccount = (merchantId) => axios.get(`${Base}/thirdAccount/list/${merchantId}`)


/**
 * 获取商户的提现记录分页
 * 
 * @param {*} query 
 */
export const getWithdrawalPage = (query) => axios.get(`${Base}/withdrawal/page`, query)

/**
 * 保存商户与产品实例的关联
 * 
 * @param {*} info 
 */
export const saveMerchantProduct = (info) => axios.post(`${Base}/product`, info)
