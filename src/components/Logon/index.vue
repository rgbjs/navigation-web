<template>
    <div class="login-container" key="login">
        <h2 class="title">Login</h2>
        <div class="account-container">
            <input-component name="Account" @value="accountVal"></input-component>
        </div>
        <div class="password-container">
            <input-component name="Password" type="password" @value="passwordVal"></input-component>
        </div>
        <div class="btn-container">
            <!-- 提交 -->
            <div class="submit" @mouseenter="move" ref="submit">
                <button-component>SUBMIT</button-component>
            </div>
            <!-- 注册 -->
            <div class="register" @click="registerBtn">register</div>
        </div>
    </div>
</template>

<script>
import input from '@/common/input'
import button from '@/common/button'
import request from '@/request'
import { Notification } from 'element-ui'
export default {
    components: {
        'input-component': input,
        'button-component': button
    },
    data() {
        return {
            count: 0, // 移入 submit 的次数
            accountValue: '',
            passwordValue: '',
            isMoveOver: false
        }
    },
    methods: {
        accountVal(value) {
            this.accountValue = value
        },
        passwordVal(value) {
            this.passwordValue = value
        },
        move() {
            if (!(this.accountValue && this.passwordValue)) {
                return
            }

            let placeX = '0'
            let placeY = '200%'
            if (this.count === 0) {
                this.count++
                this.$refs.submit.style.transform = `translate(0, ${placeY})`
                this.$refs.submit.style.setProperty('--movePlaceY', placeY)
            } else if (this.count === 1) {
                this.count++
                placeX = '400%'
                this.$refs.submit.style.transition = '.3s'
                this.$refs.submit.style.transform = `translate(${placeX}, ${placeY})`
                this.$refs.submit.style.setProperty('--movePlaceX', placeX)
            } else {
                placeY = '800%'
                this.$refs.submit.style.setProperty('--movePlaceY', placeY)
                this.$refs.submit.classList.add('move')
                this.isMoveOver = true
                setTimeout(() => {
                    // 右上角提示框
                    Notification({
                        title: 'Enter',
                        message: `请敲击回车(Enter)键进行登录 !`,
                        type: 'success',
                        duration: 4000
                    })
                }, 1000);
            }
        },
        registerBtn() {
            this.$emit('overturn')
        },
        enter(e) {
            if (e.key === 'Enter' && this.isMoveOver && this.accountValue && this.passwordValue) {
                // 请求登录
                request({
                    method: 'POST',
                    url: '/api/login',
                    data: {
                        email: this.accountValue,
                        pwd: this.passwordValue
                    }
                }).then(({ data }) => {
                    if (data.code > 0) {
                        // 登录成功, 跳转路由
                        localStorage.setItem('token', data.data.token)
                        this.$router.push({ path: '/home' })
                    }
                    else {
                        // 右上角提示框
                        Notification({
                            title: '警告',
                            message: `${data.mes} !`,
                            type: 'warning',
                        })
                    }
                }).catch(() => {
                    // 右上角提示框
                    Notification({
                        title: '错误',
                        message: '登录失败 , 请重试 !',
                        type: 'error'
                    })
                })
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.enter)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.enter)
    }
};
</script>

<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;


    .title {
        padding: 5px 0;
        text-align: center;
        font-size: 22px;
        color: #ccc;
    }

    >div {
        margin-bottom: 50px;
    }

    // 提交
    .btn-container {
        --movePlaceX: 0;
        --movePlaceY: 400%;

        display: flex;
        justify-content: space-between;
        height: 32px;
        user-select: none;

        @keyframes move {
            from {
                opacity: 1;
            }

            to {
                transform: translate(var(--movePlaceX), var(--movePlaceY));
                opacity: 0;
                visibility: hidden;
            }
        }

        // 提交
        .submit {
            &.move {
                animation: move .3s forwards;
            }
        }

        // 注册
        .register {
            height: 100%;
            color: var(--color);
            border: none;
            cursor: pointer;
        }
    }
}
</style>