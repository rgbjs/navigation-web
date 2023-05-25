/**
 * 解析token中的信息
 */
export default () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return
    }

    try {
        const tokenInfo = token.split('.')
        const info = JSON.parse(window.atob(tokenInfo[1]))
        return {
            email: info.email
        }
    } catch (err) {
        return
    }
}

