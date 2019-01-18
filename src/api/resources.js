import request from '@/utils/request'

const Base = '/resource/v1'

/**
 * 保存资源
 *
 * @param {} resInfo 资源信息
 */
export const saveResource = (resInfo) => request.post(Base, resInfo)

/**
 * 更新资源信息
 * @param {*} resInfo 更新信息
 */
export const updateResource = (resInfo) => request.put(Base, resInfo)

/**
 * 获取资源详情
 * @param {*} id 资源Id
 */
export const getResourceInfo = (id) => request.get(`${Base}/${id}`)

/**
 * 列表查询
 * @param {*} queryInfo 查询信息
 */
export const resourceList = (queryInfo) => request.get(`${Base}/list`, { params: queryInfo })

/**
 * 分页查询
 * @param {*} queryInfo 查询信息
 */
export const getResourcePage = (queryInfo) => request.get(`${Base}/page`, { params: queryInfo })

/**
 * 资源树
 */
export const resourceTree = () => request.get(`${Base}/tree`)
