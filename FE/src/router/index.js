import { createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
const routes = [
    {
        name: 'Home',
        path: '/',
        children: [
            {
                path: '',
                name: 'HomePage',
                component: Home,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            }
        ]
    },
    {
        name: 'Auth',
        path: '/auth',
        children: [
            {
                path: 'login',
                name: 'loginPage',
                component: Login,
                meta: {
                    requiresAuth: false,
                    layout: AuthLayout
                }
            },
            {
                path: 'register',
                name: 'registerPage',
                component: Register,
                meta: {
                    requiresAuth: false,
                    layout: AuthLayout
                }
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router