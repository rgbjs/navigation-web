import VueRouter from 'vue-router'

// 重写push
let originpush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originpush.call(this, location, resolve, reject)
    } else {
        originpush.call(this, location, () => { }, () => { })
    }
}

// replace重写
let originreplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplace.call(this, location, resolve, reject)
    } else {
        originreplace.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('../pages/Root/index.vue')
        },
        {
            path: '/home',
            component: () => import('../pages/Home/index.vue')
        },
        {
            path: '/login',
            component: () => import('../pages/Login/index.vue')
        },
        {
            path: '*', // 404
            component: () => import('../pages/NotFound/index.vue')
        }
    ]
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path === '/login' || token) {
        next()
        return
    }

    next({ path: '/login' })
})

export default router