<template>
    <div class="nav">
        <div class="nav-item">google</div>
        <div class="nav-item">收藏</div>
        <div class="nav-item">信息</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    padding: 0 20px;

    > .nav-item {
        padding: 0 10px;
    }
}
</style>