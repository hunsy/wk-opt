
const TOKEN_KEY = "wk-token"

/**
 * 缓存Token
 * @param {*} token 
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 获取Token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY) || ''

/**
 * 清除Token
 */
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

