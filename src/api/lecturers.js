import request from '@/utils/request'
const Base = `/v1/lecturer`

/**
 * 保存讲师
 *
 * @param {} lectureInfo 讲师信息
 */
export const saveLecturer = (lectureInfo) => request.post(Base, lectureInfo)


/**
 * 更新讲师信息
 * @param {*} lectureInfo 更新信息
 */
export const updateLecturer = (lectureInfo) => request.put(Base, lectureInfo)

/**
 * 获取讲师详情
 * @param {*} id 讲师Id
 */
export const getLecturer = (id) => request.get(`${Base}/${id}`)


/**
 * 列表查询
 * @param {*} queryInfo 查询信息
 */
export const getLecturerList = (queryInfo) => request.get(`${Base}/list`, { params: queryInfo })

/**
 * 分页查询
 * @param {*} queryInfo 查询信息
 */
export const getLecturerPage = (queryInfo) => request.get(`${Base}/page`, { params: queryInfo })
