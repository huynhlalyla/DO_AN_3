// Composable để quản lý authentication state
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const BASE_API = import.meta.env.VITE_BASE_API

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

    const changePassword = async (oldPassword, newPassword) => {
        try {
            const response = await axios.post(`${BASE_API}/user/change-password`, {
                oldPassword,
                newPassword,
                userId: user.value._id
            })
            return response.data
        } catch (error) {
            console.error('Error changing password:', error)
            return { status: 'error', message: error.message }
        }
    }

    const updateProfile = async (name, email) => {
        try {
            const response = await axios.post(`${BASE_API}/user/update-profile`, {
                name,
                email,
                userId: user.value._id
            })
            return response.data
        } catch (error) {
            console.error('Error updating profile:', error)
            return { status: 'error', message: error.message }
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
    
    // Cập nhật thông tin người dùng trong phiên (sau khi API cập nhật thành công)
    const updateUser = (partial) => {
        if (!user.value) return
        user.value = { ...user.value, ...partial }
        localStorage.setItem('user', JSON.stringify(user.value))
    }
    
    // Khởi tạo khi load
    initAuth()
    
    return {
        user: computed(() => user.value),
        isAuthenticated: computed(() => isAuthenticated.value),
        login,
        logout,
    updateUser,
        initAuth,
        changePassword,
        updateProfile
    }
}
