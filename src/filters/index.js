import cfg from '@/api/env.conf'
const assetsRoot = cfg.assetsRoot
export {
    patchFileHttp
} from '@/utils'


// 补全图片路径
export const patchImgHttp = (url) => `${assetsRoot}/${url}`
