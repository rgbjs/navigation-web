<template>
    <div class="footer">
        <span>{{ info }}</span>
        <a :href="url">
            {{ content }}
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: '© 2022 - feiYu | ',
            url: 'https://beian.miit.gov.cn/',
            content: '粤ICP备2022057054号'
        }
    }
}
</script>

<style scoped>
.footer {
    position: fixed;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, 0);
    color: #ccc;
}

.footer>a {
    color: #ccc;
}
</style>