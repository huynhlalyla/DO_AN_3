// Composable để quản lý authentication state
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const isAuthenticated = ref(false)

export const useAuth = () => {
    const router = useRouter()
    
    // Khởi tạo trạng thái từ localStorage
    const initAuth = () => {
        const userData = localStorage.getItem('user')
        const authStatus = localStorage.getItem('isAuthenticated')
        
        if (userData && authStatus === 'true') {
            user.value = JSON.parse(userData)
            isAuthenticated.value = true
        }
    }
    
    // Đăng nhập
    const login = (userData) => {
        user.value = userData
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', 'true')
    }
    
    // Đăng xuất
    const logout = () => {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        router.push('/auth/login')
    }
    
    // Khởi tạo khi load
    initAuth()
    
    return {
        user: computed(() => user.value),
        isAuthenticated: computed(() => isAuthenticated.value),
        login,
        logout,
        initAuth
    }
}
