import axios from '@/utils/request'
const Base = `/v1/app`

/**
 * 获取应用分页
 * @param {*} queryInfo 
 */
export const getPage = (queryInfo) => axios.get(`${Base}/page`, { params: queryInfo })

/**
 * 获取应用详情
 * @param {*} id 
 */
export const getAppInfo = (id) => axios.get(`${Base}/${id}`)

/**
 * 新增、更新应用的配置信息 
 * @param {*} cfg 
 */
export const cfg = (cfg) => axios.put(`${Base}/cfg`, cfg)

/**
 * 保存应用
 * @param {*} app 
 */
export const saveApp = (app) => axios.post(`${Base}`, app)

/**
 * 更新应用
 * @param {*} app 
 */
export const updateApp = (app) => axios.put(`${Base}`, app)

