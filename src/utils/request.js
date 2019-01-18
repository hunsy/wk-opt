import axios from 'axios'
import { getToken,clearToken } from './auth'
import store from '../store'
import router from '../router'
import { MessageBox } from 'element-ui';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:8084'
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://localhost:8090'
}

//设置超时时间
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
axios.interceptors.request.use(config => {
    // Do something before request is sent
    const token = getToken()
    config.headers['Authorization'] = `Token ${token}`
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(resp => {
    // Do something with response data
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    const data = resp.data;
    if (resp.status === 200) {
        const dataCode = data.code        
        if (dataCode == 200) {
            return Promise.resolve(data.data);
        } else {
            //鉴权失败
            if (dataCode == 403) {
                store.dispatch('Logout')
                    .then(
                        d => {
                            clearToken()
                            router.push('/login')
                        },
                        e => {

                        }
                    )
            } else {
                return Promise.reject(data.data);
            }

        }
    } else {
        return Promise.reject(data);
    }
}, (error) => {
    // Do something with response error
    return Promise.reject(error);
});

export default axios