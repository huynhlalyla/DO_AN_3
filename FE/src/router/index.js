import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Transactions from '../pages/Transactions.vue'
import Categories from '../pages/Categories.vue'
import AddCategory from '../pages/AddCategory.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/ForgotPassword.vue' // reset page
import ForgotPasswordEmail from '../pages/ForgotPasswordEmail.vue'
import ForgotPasswordOtp from '../pages/ForgotPasswordOtp.vue'
import ChatBot from '../pages/ChatBot.vue'
import MainLayout from '../layouts/MainLayout.vue'
import NoneLayout from '../layouts/NoneLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AddTransaction from '../pages/AddTransaction.vue'
import Budgets from '../pages/Budgets.vue'
import Profile from '../pages/Profile.vue'
import Reports from '../pages/Reports.vue'
import SearchResults from '../pages/SearchResults.vue'
import Comparison from '../pages/Comparison.vue'
const routes = [
    {
        name: 'Home',
        path: '/',
        children: [
            {
                path: '',
                name: 'HomePage',
                component: Home,
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'Transactions',
        path: '/transactions',
        children: [
            {
                path: '',
                name: 'TransactionsPage',
                component: Transactions,
                meta: { requiresAuth: true, layout: MainLayout }
            },
            {
                path: 'add',
                name: 'TransactionsAddPage',
                component: AddTransaction,
                meta: { requiresAuth: true, layout: NoneLayout }
            },
            {
                path: ':slug',
                name: 'TransactionsDetailPage',
                component: Transactions,
                meta: { requiresAuth: true, layout: MainLayout }
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
                meta: { requiresAuth: true, layout: MainLayout }
            },
            {
                path: 'add',
                name: 'CategoriesAddPage',
                component: AddCategory,
                meta: { requiresAuth: true, layout: NoneLayout }
            },
            {
                path: ':slug',
                name: 'CategoriesDetailPage',
                component: Categories,
                meta: { requiresAuth: true, layout: MainLayout }
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
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'Reports',
        path: '/reports',
        children: [
            {
                path: '',
                name: 'ReportsPage',
                component: Reports,
                meta: { requiresAuth: true, layout: MainLayout }
            },
            {
                path: 'comparison',
                name: 'ComparisonPage',
                component: Comparison,
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'Profile',
        path: '/profile',
        children: [
            {
                path: '',
                name: 'ProfilePage',
                component: Profile,
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'Search',
        path: '/search',
        children: [
            {
                path: '',
                name: 'SearchResultsPage',
                component: SearchResults,
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'ChatBot',
        path: '/chatbot',
        children: [
            {
                path: '',
                name: 'ChatBotPage',
                component: ChatBot,
                // Use MainLayout to provide standard header & footer
                meta: { requiresAuth: true, layout: MainLayout }
            }
        ]
    },
    {
        name: 'Auth',
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', name: 'AuthLoginPage', component: Login },
            { path: 'register', name: 'AuthRegisterPage', component: Register },
            { path: 'forgot-password', name: 'AuthForgotPasswordEmailPage', component: ForgotPasswordEmail },
            { path: 'forgot-password/otp', name: 'AuthForgotPasswordOtpPage', component: ForgotPasswordOtp },
            { path: 'forgot-password/reset', name: 'AuthForgotPasswordResetPage', component: ForgotPassword }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Kiểm tra trạng thái đăng nhập (dùng sessionStorage để chỉ giữ phiên hiện tại)
const isAuthenticated = () => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    const user = sessionStorage.getItem('user');
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