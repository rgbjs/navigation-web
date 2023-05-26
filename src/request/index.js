import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:5002' // 开发时设置, 正式上线请删除

// 请求拦截器
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.authorization = token)
    return config
})

// 响应拦截器
axios.interceptors.response.use((config) => {
    // token 不存在或过期, 后端将返回 205 状态码 , 此处重定向到root(根路由) 由根路由进行跳转到登录路由
    const status = config.status
    if (status === 205) {
        localStorage.removeItem('token')
        location.href = '/'
        return config
    }

    const { authorization } = config.headers
    authorization && localStorage.setItem('token', authorization)
    return config
})

export default axios