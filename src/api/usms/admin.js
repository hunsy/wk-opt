import axios from '@/utils/request'

const Base = "/admin";

/**
 * 登录
 * @param {*} userinfo 
 */
export const login = (userinfo) => axios.post(`${Base}/login`, userinfo)

/**
 * 获取管理员分页数据
 * 
 * @param {*} queryInfo 
 */
export const getPage = (queryInfo) => axios.get(`${Base}/page`, { params: queryInfo })

/**
 * 获取管理员信息
 */
export const getCurrentAdmin = () => axios.get(`${Base}/profile`)