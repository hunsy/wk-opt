import cfg from '@/api/env.conf'
const assetsRoot = cfg.assetsRoot

/**
 * 补全资源路径
 * url资源相对路径
 */
const patchFileHttp = (url) => `${assetsRoot}/${url}`


export default {
    patchFileHttp
}
