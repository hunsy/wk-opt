import axios from '@/utils/request'

/**
 * 获取七牛上传文件的token
 */
export const getUpToken = () => {
    return axios.get('/qiniu/token')
}