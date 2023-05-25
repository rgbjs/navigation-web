<template>
    <div class="btn" ref="container">
        <button @click.prevent="submit">
            <slot name="default">submit</slot>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: {
            type: String,
            default: 'rgb(25, 25, 26)'
        },
        color: {
            type: String,
            default: '#077189'
        },
        fontSize: {
            type: String,
            default: '17px'
        },
        width: {
            type: String,
            default: 'auto'
        },
        height: {
            type: String,
            default: 'auto'
        }
    },
    mounted() {
        const container = this.$refs.container
        container.style.setProperty('--bg-color', this.bgColor)
        container.style.setProperty('--color', this.color)
        container.style.setProperty('--font-size', this.fontSize)
        container.style.setProperty('--width', this.width)
        container.style.setProperty('--height', this.height)
    },
    methods: {
        submit() {
            this.$emit('submit')
        }
    }
};
</script>

<style scoped lang="scss">
// 提交
.btn {
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: 8px;
    overflow: hidden;
    transition: .3s;
    user-select: none;

    &::before {
        content: "";
        position: absolute;
        z-index: -2;
        top: 50%;
        left: 50%;
        background: radial-gradient(circle, transparent 0, var(--color) 100%) 0 0/cover;
        width: 200%;
        height: 200%;
        transform-origin: 0 0;
        animation: rotate 2s linear infinite;
    }

    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 2px;
        left: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: var(--bg-color);
        border-radius: 8px;
    }

    @keyframes rotate {
        from {
            transform: rotateZ(0);
        }

        to {
            transform: rotateZ(365deg);
        }
    }

    button {
        display: block;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border: none;
        background-color: transparent;
        color: var(--color);
        font-size: var(--font-size);
        text-align: center;
        cursor: pointer;
    }
}
</style>