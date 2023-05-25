<template>
    <div class="curtain">
        <div class="box">
            <div class="container" ref="container">
                <Logon class="logon" @overturn="overturn"></Logon>
                <Register class="register" @overturn="overturn"></Register>
            </div>
        </div>

        <!-- 备案信息 -->
        <Copyright></Copyright>

        <!-- 粒子背景 -->
        <div class="bg">
            <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
                linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
            </vue-particles>
        </div>
    </div>
</template>

<script>
import '@/assets/css/transparent-scroll.css'
import Logon from '@/components/Logon'
import Register from '@/components/Register'
import Copyright from '@/components/Copyright'
export default {
    components: { Logon, Register, Copyright },
    methods: {
        overturn() {
            const container = this.$refs.container
            container.classList.toggle('overturn')
        }
    }
};
</script>

<style scoped lang="scss">
// 幕布
.curtain {
    --color: #077189;
    --bg-color: rgba(25, 25, 26, 1);

    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    background-color: rgb(51, 52, 53);

    .box {
        opacity: .8;
        z-index: 10;
    }

    // 容器
    .container {
        position: relative;
        z-index: 1;
        width: 600px;
        height: 400px;
        transform-style: preserve-3d;
        background-color: var(--bg-color);
        border-radius: 22px;
        box-shadow: 0px 0px 5px 5px var(--bg-color);
        transition: .5s;

        // 翻转
        &.overturn {
            transform: perspective(1000px) rotateY(180deg);
        }

        .logon {
            backface-visibility: hidden;
        }

        .register {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
        }

        .register {
            transform: rotateY(-180deg);
            backface-visibility: hidden;
        }
    }
}

.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>