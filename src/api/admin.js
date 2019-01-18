import axios from '@/utils/request'

const Base = "/admin/v1";
/**
 * 登录
 * @param {*} userinfo 
 */
export const login = (userinfo) => axios.post('/login', userinfo)


/**
 * 获取管理员信息
 */
export const getCurrentAdmin = () => axios.get(`${Base}/profile`)

/**
 * 获取管理员分页数据
 * 
 * @param {*} queryInfo 
 */
export const getPage = (queryInfo) => axios.get(`${Base}/page`, { params: queryInfo })

/**
 * 保存管理员
 * @param {*} admin 
 */
export const saveAdmin = (admin) => axios.post(`${Base}`, admin)

/**
 * 更新管理员信息
 * @param {*} admin 
 */
export const updateAdmin = (admin) => axios.put(`${Base}`, admin)

/**
 * 获取管理员信息
 * @param {*} id 
 */
export const getAdminInfo = (id) => axios.get(`${Base}/${id}`)

/**
 * 获取管理员拥有的角色
 * @param {*} id 
 */
export const getAdminRoles = (id) => axios.get(`${Base}/roles/${id}`)

/**
 * 新增角色id
 *
 * @param {Long} id 管理员id
 * @param {*} roleId 角色id
 */
export const addRole = (id, roleIds) => axios.post(`${Base}/addRole/${id}`, roleIds)

/**
 * 删除角色id
 * @param {*} id 管理员id
 * @param {*} roleId 角色id
 */
export const rmRole = (id, roleIds) => axios.put(`${Base}/rmRole/${id}`, roleIds)

