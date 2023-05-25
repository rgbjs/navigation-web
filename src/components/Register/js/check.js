export default function (options, callback) {
    const { name, result, through = '校验通过', err = '校验未通过' } = options
    if (result) {
        this[name] = through
        this.$refs[name].classList.add('through')
        this.$refs[name].classList.remove('err')
        if (callback) {
            callback()
        }
    } else {
        this[name] = err
        this.$refs[name].classList.add('err')
        this.$refs[name].classList.remove('through')
    }
}