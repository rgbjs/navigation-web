<template>
    <div class="container">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <template v-if="Object.keys(tagList).length > 0">
                    <div class="swiper-slide" v-for="(list, i) in tagList" :key="i">
                        <list :name="i" :tag-list="list" @addTag="addTag"></list>
                    </div>
                </template>
                <template v-else>
                    <div class="swiper-slide">
                        <list name="default" :tag-list="[]" @addTag="addTag"></list>
                    </div>
                </template>
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
import request from '@/request'
import parseToken from '@/utils/paseToken'
import { Message } from 'element-ui'
import list from './list.vue'
import { mapActions, mapState } from 'vuex'
import './style/index.css'
export default {
    components: { list },
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
        document.body.classList.add('home') // 为body添加home路由特定样式
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
        document.body.classList.remove('home') // 为body移出home路由的特定样式
        this.swiper.destroy()
    },
    computed: {
        ...mapState('tag', ['tagList'])
    }
};
</script>

<style scoped lang="scss">
.swiper-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 500px;
    margin-top: 100px;
    outline: 1px solid black;
}
</style>