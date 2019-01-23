import request from '@/utils/request'

const Base = "/mediaResource";

/**
 * 批量保存媒体文件
 * @param {*} medias 
 */
export const batchSaveMedias = (medias) => request.post(`${Base}/batch`, medias)

/**
 * 分页查询
 * 
 * @param {*} queryInfo 
 */
export const getMediaPage = (queryInfo) => request.get(`${Base}/page`, { params: queryInfo })

/**
 * 更新媒体文件
 * @param {*} media 
 */
export const updateMedia = (media) => request.put(`${Base}`, media)