import request from '@/utils/request'

const Base = `/role/v1`

/**
 * 新增角色
 * @param {*} roleInfo 角色信息
 */
export const saveRole = (roleInfo) => request.post(`${Base}`, roleInfo)

/**
 * 编辑角色
 * @param {*} roleInfo 角色信息
 */
export const updateRole = (roleInfo) => request.put(`${Base}`, roleInfo)

/**
 * 获取角色信息
 * @param {Long} id 角色id 
 */
export const getRoleInfo = (id) => request.get(`${Base}/${id}`)

/**
 * 查询列表
 * @param {adminId:'',name:''} queryInfo 查询信息
 */
export const roleList = (adminId) => request.get(`${Base}/list?adminId=${adminId}`)

/**
 * 分页查询
 * @param {name:''} queryInfo 查询信息
 */
export const getPage = (queryInfo) => request.get(`${Base}/page`, { params: queryInfo })

/**
 * 角色下的资源列表
 * @param {*} id 角色ID
 */
export const roleResources = (id) => request.get(`${Base}/resourceIds/${id}`)

/**
 * 设置角色下的资源id
 * @param {*} id 角色id
 * @param {*} resIds 资源id
 */
export const setRoleResources = (id, resIds) => request.put(`${Base}/resourceIds/${id}`, resIds)