import axios from '@/utils/request'

/**
 * 登录
 * @param {*} userinfo 
 */
export const login = (userinfo) => axios.post('/login', userinfo)


/**
 * 获取管理员信息
 */
export const getCurrentAdmin = () => axios.get('/v1/admin/profile')
