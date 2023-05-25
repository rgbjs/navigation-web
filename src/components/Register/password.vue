<template>
    <div>
        <input-component :type="passwordType" @change="passwordVal" name="Password"></input-component>
        <div class="tip" ref="passwordTip">
            <span class="iconfont view" :class="[iconClass]" @click="view"></span>
            {{ passwordTip }}
        </div>
    </div>
</template>

<script>
import input from '@/common/input'
import check from './js/check.js'
import './css/tip.css'

export default {
    components: {
        "input-component": input
    },
    data() {
        return {
            passwordTip: '',
            iconClass: 'icon-yanjing_yincang_o',
            passwordType: 'password',
            isView: false
        }
    },
    methods: {
        passwordVal(value) {
            if (!(value.length >= 6 && value.length <= 32)) {
                check.call(this, {
                    name: 'passwordTip',
                    result: false,
                    err: '字符长度需为 6 - 32 位'
                })
                return
            }
            const reg = /^[\w]{6,32}$/
            const result = reg.test(value)
            check.call(this, {
                name: 'passwordTip',
                result,
                err: '密码只能包含 A-Za-z0-9_'
            }, () => {
                this.$emit('value', value)
            })
        },

        // 是否显示密码
        view() {
            if (this.isView) {
                // 隐藏
                this.passwordType = 'password'
                this.iconClass = 'icon-yanjing_yincang_o'
            } else {
                // 显示
                this.passwordType = 'text'
                this.iconClass = 'icon-yanjing_xianshi_o'
            }
            this.isView = !this.isView
        },
    }
};
</script>

<style scoped>
/* 小眼睛, 查看密码 */
.view {
    cursor: pointer;
}

.iconfont {
    color: var(--color);
    font-size: 22px !important;
}
</style>