import { createRouter, 
        createWebHistory}               from 'vue-router'
import Home                             from '../pages/Home.vue'
import Transactions                     from '../pages/Transactions.vue'
import Categories                       from '../pages/Categories.vue'
import Budgets                          from '../pages/Budgets.vue'
import Login                            from '../pages/Login.vue'
import Register                         from '../pages/Register.vue'
import MainLayout                       from '../layouts/MainLayout.vue'
import NoneLayout                       from '../layouts/NoneLayout.vue'
import AuthLayout                       from '../layouts/AuthLayout.vue'
import AddTransaction                   from '../pages/AddTransaction.vue'
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
        name: 'Transactions',
        path: '/Transactions',
        children: [
            {
                path: '',
                name: 'TransactionsPage',
                component: Transactions,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            },
            {
                path: 'add',
                name: 'TransactionsAddPage',
                component: AddTransaction,
                meta: {
                    requiresAuth: true,
                    layout: NoneLayout
                }
            },
            {
                path: ':slug',
                name: 'TransactionsDetailPage',
                component: Transactions,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            }
        ]
    },
    {
        name: 'Categories',
        path: '/categories',
        children: [
            {
                path: '',
                name: 'CategoriesPage',
                component: Categories,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            },
            {
                path: ':slug',
                name: 'CategoriesDetailPage',
                component: Categories,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            }
        ]
    },
    {
        name: 'Budgets',
        path: '/budgets',
        children: [
            {
                path: '',
                name: 'BudgetsPage',
                component: Budgets,
                meta: {
                    requiresAuth: true,
                    layout: MainLayout
                }
            },
            {
                path: ':slug',
                name: 'BudgetsDetailPage',
                component: Budgets,
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

// Kiểm tra trạng thái đăng nhập
const isAuthenticated = () => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    return authStatus === 'true' && user;
}

// Navigation guard để kiểm tra authentication
router.beforeEach((to, from, next) => {
    // Kiểm tra xem route có yêu cầu authentication không
    const requiresAuth = to.matched.some(page => page.meta.requiresAuth);
    
    if (requiresAuth && !isAuthenticated()) {
        // Nếu cần đăng nhập nhưng chưa đăng nhập, chuyển hướng đến trang login
        next('/auth/login');
    } else if (!requiresAuth && isAuthenticated() && (to.path === '/auth/login' || to.path === '/auth/register')) {
        // Nếu đã đăng nhập và đang cố truy cập trang login/register, chuyển về trang chủ
        next('/');
    } else {
        // Cho phép tiếp tục
        next();
    }
});

export default router