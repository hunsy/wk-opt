import axios from '@/utils/request'

const Base = "/admin/product";

/**
 * 获取产品分页数据
 * 
 * @param {*} queryInfo 
 */
export const getPage = (queryInfo) => axios.get(`${Base}/page`, {
  params: queryInfo
})



/**
 * 获取产品配置信息
 * 
 * @param {*} queryInfo 
 */
export const getConfigList = (productId) => axios.get(`${Base}/config/list/${productId}`)



/**
 * 获取产品实例分页信息
 * 
 * @param {*} queryInfo 
 */
export const getInventoryPage = (query) => axios.get(`${Base}/inventory/page`, query)
