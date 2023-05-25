/**
 * 节流
 * @param {function} callback 要被节流的方法
 * @param {Number} time 节流的时长
 * @param {Boolean} immediate 第一次是否可以立即触发
 * @return {function} 返回一个节流函数
 */
export default function (callback, time = 300, immediate = true) {
    if (immediate) {
        let start
        return (...args) => {
            if (!start || Data.now() - start >= time) {
                callback(...args)
                start = Date.now()
            }
        }
    }

    let timer
    return (...args) => {
        if (timer) {
            return
        }

        timer = setTimeout(() => {
            callback(...args)
            timer = null
        }, time)
    }
}