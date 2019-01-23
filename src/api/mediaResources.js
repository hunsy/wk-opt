import request from '@/utils/request'

const Base = "/mediaResource";

/**
 * 批量保存媒体文件
 * @param {*} medias 
 */
export const batchSaveMedias = (medias) => request.post(`${Base}/batch`, medias)