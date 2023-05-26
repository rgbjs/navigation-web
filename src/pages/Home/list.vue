<template>
    <div class="list">
        <!-- 列表标题 -->
        <h2 class="list-name">{{ name }}</h2>
        <!-- 列表 -->
        <ul class="list-container">
            <!-- 标签(Tag) -->
            <li v-for="(item, i) in tagList" :key="i">
                <a :href="item.url" target="_blank">
                    <div class="icon"></div>
                    <div class="title">{{ item.title }}</div>
                    <div class="func"></div>
                </a>
            </li>
            <!-- 添加Tag项 -->
            <li class="add-itme el-icon-circle-plus-outline" :data-list-name="name" @click="addTag(name)">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        tagList: {
            type: Array,
            required: true
        }
    },
    methods: {
        addTag(name) {
            this.$emit('addTag', name)
        }
    }
};
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    height: 100%;
}

.list-name {
    padding: 15px 0;
    margin-left: 27px;
    font-size: 20px;
}

.list-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    >li {
        width: 112px;
        height: 112px;
        margin: 10px 27px;
        outline: 1px solid #077189;

        a {
            display: block;
            width: 100%;
            height: 100%;
            padding-top: 16px;
            box-sizing: border-box;
            color: #424242;
        }

        .icon {
            width: 48px;
            height: 48px;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
            background-color: antiquewhite;
        }

        .title {
            height: 36px;
            margin-top: 6px;
            line-height: 36px;
            text-align: center;
        }

        &.add-itme {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: auto;
            font-size: 60px;
            cursor: pointer;
            color: #077189;
            opacity: 0;
            transition: .5s;

            &:hover {
                opacity: 1;
            }
        }
    }
}
</style>