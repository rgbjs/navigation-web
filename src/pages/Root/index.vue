<template>
</template>

<script>
export default {
    mounted() {
        const token = localStorage.getItem("token")
        if (token) {
            this.$router.push('/home')
        } else {
            this.$router.push('/login')
        }
    }
};
</script>

<style scoped></style>