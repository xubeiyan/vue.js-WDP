import state from '../state'
import router from '../router'

let baseUrl;

export default {
    install(Vue, options) {
        console.log('Installed!', options)
        // 插件选项
        baseUrl = options.baseUrl

        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions)
    if (response.ok) {
        const data = await response.json()
        return data
    } else if (response.status === 403) {
        // 如果会话不再有效
        // 我们登出
        state.user = null
        // 如果这个路由是私有的
        // 我们跳转到登录页面
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            router.replace({
                name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath,
                }
            })
        }

    } else {
        const message = await response.text()
        const error = new Error(message)
        error.response = response
        throw error
    }
}