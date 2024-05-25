import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/LoginView.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('@/views/home/HomeView.vue'),
        children: [

            {
                path: 'info',
                name: 'info',
                component: () =>
                    import ('../views/home/profile/InfoView.vue'),
            },

            {
                path: 'coursesNav',
                name: 'coursesNav',
                component: () =>
                    import ('@/views/home/CoursesNavView.vue'),
                children: [

                ]
            },

            {
                path: 'courseDetail/:courseId',
                name: 'courseDetail',
                component: () =>
                    import ('@/views/home/course/CourseDetailView.vue'),
                children: [

                    {
                        path: 'task',
                        name: 'task',
                        component: () =>
                            import ('@/views/home/course/pages/TaskView.vue')
                    },
                    {
                        path: 'chapter',
                        name: 'chapter',
                        component: () =>
                            import ('@/views/home/course/pages/ChapterView.vue')
                    },
                    {
                        path: 'resource',
                        name: 'resource',
                        component: () =>
                            import ('@/views/home/course/pages/ResourceView.vue')
                    },
                    {
                        path: 'answering',
                        name: 'answering',
                        component: () =>
                            import ('@/views/home/course/pages/DiscussView.vue')
                    },
                    {
                        path: 'homework',
                        name: 'homework',
                        component: () =>
                            import ('@/views/home/course/pages/HomeworkView.vue')
                    },
                    {
                        path: 'examination',
                        name: 'examination',
                        component: () =>
                            import ('@/views/home/course/pages/ExaminationView.vue')
                    },
                    {
                        path: 'knowledgeGraph',
                        name: 'knowledgeGraph',
                        component: () =>
                            import ('@/views/home/course/pages/KnownledgeGraphView.vue')
                    },
                    {
                        path: 'oralTest',
                        name: 'oralTest',
                        component: () =>
                            import ('@/views/home/course/pages/OralTestView.vue')
                    },
                    {
                        path: 'recommendTask',
                        name: 'recommendTask',
                        component: () =>
                            import ('@/views/home/course/pages/RecommendTaskView.vue')
                    },
                    {
                        path: 'recommendResource',
                        name: 'recommendResource',
                        component: () =>
                            import ('@/views/home/course/pages/RecommendResourceView.vue')
                    },
                    {
                        path: 'questionBank',
                        name: 'questionBank',
                        component: () =>
                            import ('@/views/home/course/pages/QuestionBankView.vue')
                    },
                    {
                        path: 'classManager',
                        name: 'classManager',
                        component: () =>
                            import ('@/views/home/course/pages/ClassManagerView.vue')
                    }
                ]
            },
            {
                path: 'courseGate/:courseId',
                name: 'courseGate',
                component: () =>
                    import ('@/views/home/course/CourseGateView.vue'),
            },

            {
                path: 'manager',
                name: 'manager',
                component: () =>
                    import ('@/views/home/ManagerView.vue'),
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

import store from '@/store';
import homeStartPage from '@/assets/configs/homeStartPage.json'

router.beforeEach((to, from, next) => {
    const authority = store.state.authority;
    const targetName = homeStartPage[authority];

    // 当前用户权限为"none"且不在登录页面时，重定向到登录
    if (authority === 'none' && to.name !== 'login') {
        next({ name: 'login' });
    }
    // 当前路由是“/”且authority不为"none"时，重定向到home
    else if (to.path === '/' && authority !== 'none') {
        next({ name: 'home' });
    }
    // 在home且目标不是targetName且目标不是home时，重定向到targetName
    else if (to.name === 'home' && from.name !== 'home' && to.name !== targetName) {
        next({ name: targetName });
    } else {
        next(); // 其他情况，正常进行
    }
});

export default router