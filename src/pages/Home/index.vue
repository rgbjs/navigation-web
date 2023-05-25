<template>
    <div class="container">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(list, i) in tagList" :key="i">
                    <!-- 列表标题 -->
                    <h2 class="list-name">{{ i }}</h2>
                    <!-- 列表 -->
                    <ul class="list-container">
                        <!-- 标签(Tag) -->
                        <li v-for="(item, j) in list" :key="j">
                            <a :href="item.url" target="_blank">
                                <div class="icon"></div>
                                <div class="title">{{ item.title }}</div>
                                <div class="func"></div>
                            </a>
                        </li>
                        <!-- 添加Tag项 -->
                        <li class="add-itme el-icon-circle-plus-outline" :data-list-name="i" @click="addTag(i)">
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <!-- 添加tag的弹窗 -->
        <el-dialog title="添加一个标签(Tag)" :visible.sync="centerDialogVisible" center>

            <!-- 表单内容 -->
            <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                <el-form-item label="名称">
                    <el-input v-model="formLabelAlign.title"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="formLabelAlign.url"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formLabelAlign.des"></el-input>
                </el-form-item>
            </el-form>

            <!-- 底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="createTag" :disabled="!isCreate">立即创建</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import '@/assets/css/transparent-scroll.css'
import request from '@/request'
import parseToken from '@/utils/paseToken'
import { Message } from 'element-ui';
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            centerDialogVisible: false,
            listName: 'default',
            isCreate: true,
            formLabelAlign: {
                title: '',
                url: '',
                des: ''
            }
        }
    },
    methods: {
        ...mapActions('tag', ['getTagList']),
        async addTag(which) {
            this.centerDialogVisible = true
            this.listName = which

        },

        async createTag() {
            if (!this.isCreate) {
                return
            }
            this.isCreate = false

            try {
                const { email } = parseToken()
                const result = await request({
                    method: 'POST',
                    url: '/api/tag',
                    data: {
                        email,
                        ...this.formLabelAlign
                    }
                })

                if (result.code < 0) {
                    Message({
                        message: '添加失败了, 请重试 !',
                        type: 'error'
                    })
                }
                else {
                    Message({
                        message: '恭喜你 , 添加成功了 !',
                        type: 'success'
                    })

                    this.getTagList() // 重新请求标签数据
                }

            } catch (err) {
                Message({
                    message: '添加失败了, 请重试 !',
                    type: 'error'
                })
            }

            this.isCreate = true
        }
    },
    mounted() {
        document.body.style.backgroundColor = 'rgb(203, 220, 247)' // 设置body背景颜色
        this.getTagList() // 请求标签数据

        this.swiper = new Swiper(this.$refs.swiper, {
            direction: 'vertical', // 垂直切换选项
            pagination: {
                el: '.swiper-pagination',
            },
            mousewheel: true,
            speed: 500,
            watchOverflow: true,
            simulateTouch: false
        })
    },
    beforeDestroy() {
        document.body.style.backgroundColor = '' // 移出body背景颜色
        this.swiper.destroy()
    },
    computed: {
        ...mapState('tag', ['tagList'])
    }
};
</script>

<style scoped lang="scss">
.swiper-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 500px;
    border: 1px solid black;
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