import request from '@/utils/request'
const Base = `/v1/course`

// 1.1 新增课程
export const saveCourse = (data) => request.post(`${Base}`, data)

// 1.2 新增课程
export const updateCourse = (data) => request.put(`${Base}`, data)

// 1.3 获取课程详情
export const getCourse = (id) => request.get(`${Base}/${id}`)

// 1.4 获取课程列表
export const courseList = (queryInfo) => request.get(`${Base}/list`, { params: queryInfo })

// 1.5 分页
export const getCoursePage = (queryInfo) => request.get(`${Base}/page`, { params: queryInfo })

// 1.6启禁用
export function disable(id) {
    return request.put(`${Base}/disable/${id}`)
}

// 1.7 新增课程内容
export function saveContent(content) {
    console.log(content)
    return request.post(`${Base}/content`, content)
}
// 1.8 新增课程内容
export function updateContent(content) {
    return request.put(`${Base}/content`, content)
}
// 1.9 新增课程内容
export function getContent(id) {
    return request.get(`${Base}/content/${id}`)
}
// 1.10 课程下的课程内容列表
export function contentList(courseId) {
    return request.get(`${Base}/content/list/${courseId}`)
}
// 1.11 课程下的启用课程内容列表
export function contentEnableList(courseId) {
    return request.get(`${Base}/content/list/enable/${courseId}`)
}
// 1.12 课程内容启禁用
export function contentDisable(id) {
    return request.put(`${Base}/content/disable/${id}`)
}
// 1.12 课程内容启禁用
export function contentSort(ids) {
    return request.post(`${Base}/content/sort`, ids)
}