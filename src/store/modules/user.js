import { login, getCurrentAdmin } from '@/api/admin'
import { getToken, setToken, clearToken } from '@/utils/auth'

const user = {
    //存放组件之间共享的数据
    state: {
        token: getToken(),
        name: '',
        userid: '',
        avatar: ''
    },
    //显式的更改state里的数据
    mutations: {
        SET_TOKEN: (state, token) => state.token = token,
        SET_NAME: (state, name) => state.name = name,
        SET_USERID: (state, userId) => state.userId = userId,
        SET_AVATAR: (state, avatar) => state.avatar = avatar
    },
    actions: {
        Login({ commit }, userinfo) {
            return new Promise((resolve, reject) => {
                login(userinfo)
                    .then(
                        data => {
                            const token = data['token']
                            setToken(token)
                            commit('SET_TOKEN')
                            resolve(data)
                        },
                        err => {
                            reject(err)
                        })

            })
        },
        GetAdminInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getCurrentAdmin().then(
                    data => {
                        commit('SET_USERID', data.id)
                        commit('SET_NAME', data.name)
                        commit('SET_AVATAR', data.avatar)
                        resolve(data)
                    },
                    err => {
                        reject(err)
                    }
                )

            });
        },
        Logout({ commit }) {
            return new Promise((resolve, reject) => {
                getCurrentAdmin().then(
                    data => {
                        commit('SET_USERID', '')
                        commit('SET_NAME', '')
                        commit('SET_AVATAR', '')
                        clearToken()
                        resolve(data)
                    },
                    err => {
                        reject(err)
                    }
                )

            });
        }
    }
}

export default user