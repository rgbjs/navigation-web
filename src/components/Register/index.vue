<template>
    <div class="register-container" key="register">
        <h2 class="title">Register</h2>
        <!-- 邮箱 -->
        <email @value="email"></email>
        <!-- 密码 -->
        <password @value="pwd"></password>
        <!-- 验证码 -->
        <verifyCode @value="code" :email="emailVal"></verifyCode>
        <div class="btn-container">
            <!-- 提交 -->
            <button-component @submit="submit">SUBMIT</button-component>
            <!-- 注册 -->
            <div class="login" @click="loginBtn">login</div>
        </div>
    </div>
</template>

<script>
import button from '@/common/button'
import email from './email.vue'
import password from './password.vue'
import verifyCode from './verifyCode.vue'
import request from '@/request'
import { Notification } from 'element-ui'
export default {
    components: {
        'button-component': button,
        email,
        password,
        verifyCode
    },
    data() {
        return {
            emailVal: '',
            pwdVal: '',
            codeVal: ''
        }
    },
    methods: {
        email(val) {
            this.emailVal = val
        },
        pwd(val) {
            this.pwdVal = val
        },
        code(val) {
            this.codeVal = val
        },
        submit() {
            const data = [this.emailVal, this.pwdVal, this.codeVal]
            const result = data.every(item => item !== '')
            if (result) {
                // 发送请求
                request({
                    method: 'POST',
                    url: '/api/register',
                    data: {
                        email: this.emailVal,
                        pwd: this.pwdVal,
                        code: this.codeVal
                    }
                }).then(({ data }) => {
                    if (data.code > 0) {
                        // 右上角提示框
                        Notification({
                            title: '成功',
                            message: `${data.mes} !`,
                            type: 'success'
                        })
                    } else {
                        Notification({
                            title: '警告',
                            message: `${data.mes} !`,
                            type: 'warning'
                        })
                    }
                }).catch(() => {
                    Notification({
                        title: '失败',
                        message: `注册失败 , 请重试 !`,
                        type: 'error',
                        duration: 0
                    })
                })
                return
            }

            Notification({
                title: '失败',
                message: `请将字段填写完整 !`,
                type: 'error'
            })
        },
        loginBtn() {
            this.$emit('overturn')
        }
    }
};
</script>

<style scoped lang="scss">
.register-container {
    position: relative;
    overflow: hidden;
    z-index: 10;
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-color: var(--bg-color);

    .title {
        text-align: center;
        font-size: 22px;
        color: #ccc;
    }

    >div {
        position: relative;
        margin-bottom: 40px;
    }

    // 提交
    .btn-container {
        display: flex;
        justify-content: space-between;
        height: 32px;
        --movePlace: 0;
        user-select: none;

        // 登录
        .login {
            height: 100%;
            color: var(--color);
            border: none;
            cursor: pointer;
        }
    }
}
</style>