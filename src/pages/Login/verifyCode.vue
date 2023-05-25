<template>
    <div>
        <input-component name="VerifyCode" @value="value"></input-component>
        <button-component class="verify-code" fontSize="14px" width="auto" height="28px" @submit="getCode">
            {{ verifyCode }}
        </button-component>
    </div>
</template>

<script>
import input from '@/common/input'
import button from '@/common/button'
import request from '@/request'
import { Notification } from 'element-ui'
export default {
    components: {
        "input-component": input,
        'button-component': button,
    },
    props: {
        email: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            verifyCode: '获取验证码'
        }
    },
    methods: {
        value(val) {
            this.$emit('value', val)
        },
        // 获取验证码
        getCode() {
            if (!this.email) {
                return
            }

            if (this.verifyCode === '获取验证码') {
                const countdown = () => {
                    this.verifyCode = 30
                    let timer = setInterval(() => {
                        if (this.verifyCode <= 0) {
                            clearInterval(timer)
                            this.verifyCode = '获取验证码'
                            return
                        }
                        this.verifyCode--
                    }, 1000)
                }

                this.verifyCode = '获取中'

                // 发送请求
                request({
                    method: 'GET',
                    url: `/api/verifyCode`,
                    params: {
                        email: this.email
                    }
                }).then(() => {
                    countdown()
                }).catch(() => {
                    this.verifyCode = '获取验证码'
                    // 右上角提示框
                    Notification({
                        title: '错误',
                        message: '获取验证码失败 , 请重试 !',
                        type: 'error',
                        duration: 0
                    })
                })

            }
        },
    }
};
</script>

<style scoped>
.verify-code {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
}
</style>