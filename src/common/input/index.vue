<template>
    <div class="input-container" ref="inputContainer" key="inputContainer">
        <span :class="{ active: isActive }">{{ name }}</span>
        <input :type="type" v-model="val" @change="change" @focus="isFocus = true" @blur="isFocus = false">
    </div>
</template>

<script>
export default {
    props: {
        width: { // 容器宽度, 同时也是input的宽度
            type: String,
            default: '100%'
        },
        height: { // 容器高度, 同时也是 input 的高
            type: String,
            default: '40px'
        },
        name: { // span 的名字
            type: String,
            default: 'name'
        },
        type: {
            type: String, // input 的类型
            default: 'text'
        },
        color: { // 字体颜色
            type: String,
            default: '#077189'
        },
    },
    data() {
        return {
            val: '', // input 内容
            isFocus: false, // input 聚焦状态
        }
    },
    mounted() {
        const container = this.$refs.inputContainer
        container.style.setProperty('--color', this.color)
        container.style.setProperty('--width', this.width)
        container.style.setProperty('--height', this.height)
    },
    methods: {
        change(e) {
            this.$emit('change', e.target.value)
        }
    },
    computed: {
        isActive() {
            // 输入内容不为空, 或正在聚焦中都为激活状态
            return this.val !== '' || this.isFocus
        }
    },
    watch: {
        val: {
            handler(value) {
                this.$emit('value', value)
            }
        }
    }
};
</script>

<style scoped lang="scss">
.input-container {
    position: relative;
    z-index: 1000;
    display: flex;
    width: var(--width);
    height: var(--height);
    border-bottom: 1px solid #ccc;
    color: var(--color);
    font-size: 17px;

    span {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        transition: .3s;
    }

    span.active {
        transform: translateY(-150%);
    }

    input {
        flex: 1 0 0;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        color: #ccc;
    }
}
</style>