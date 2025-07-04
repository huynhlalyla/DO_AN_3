<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: url('/imgs/bg-login2.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        
        <!-- Header -->
        <header class="relative z-10 w-full bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-md p-6 shadow-2xl border-b border-white/10">
            <div class="flex justify-center items-center max-w-6xl mx-auto">
                <!-- Logo & Brand -->
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-3">
                        <!-- Logo -->
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-2 shadow-lg">
                            <img src="/imgs/main-logo.jpg" alt="Logo" class="w-full h-full object-cover rounded-lg">
                        </div>
                        <!-- Brand Name -->
                        <div>
                            <h1 class="text-2xl font-bold text-white tracking-tight">MoneyManager</h1>
                            <p class="text-blue-200 text-sm font-medium">Quản lý tài chính thông minh</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="relative z-10 flex justify-center items-center flex-1 p-6" style="min-height: calc(100vh - 88px);">
            <transition name="fade" appear>
                <div class="w-full max-w-md bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-slate-700/50">
                    <!-- Form Header -->
                    <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 p-8 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 shadow-lg backdrop-blur-sm">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">Đăng nhập</h2>
                        <p class="text-blue-100 text-sm">Chào mừng bạn quay lại</p>
                    </div>                    
                    <!-- Form Body -->
                    <div class="p-8 space-y-6">
                        <!-- Phone Input -->
                        <div class="space-y-2">
                            <label for="phone_input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                Số điện thoại
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    id="phone_input" 
                                    :class="{
                                        'border-red-300 focus:ring-red-500 focus:border-red-500': inputPhoneMessage,
                                        'border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500': !inputPhoneMessage
                                    }"
                                    class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    placeholder="Nhập số điện thoại..."
                                    @focus="inputPhoneMessage = ''"
                                    @blur="checkPhoneData()"
                                    @input="inputPhone = $event.target.value"
                                />
                            </div>
                            <p v-show="inputPhoneMessage" :class="{'animation-custom': inputPhoneMessage}" class="text-sm text-red-600 dark:text-red-400">
                                <span class="font-medium">{{ inputPhoneMessage }}</span>
                            </p>
                        </div>

                        <!-- Password Input -->
                        <div class="space-y-2">
                            <label for="password_input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                Mật khẩu
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password_input" 
                                    :class="{
                                        'border-red-300 focus:ring-red-500 focus:border-red-500': inputPasswordMessage,
                                        'border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500': !inputPasswordMessage
                                    }"
                                    class="w-full pl-16 pr-14 py-4 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    placeholder="Nhập mật khẩu..."
                                    @focus="inputPasswordMessage = ''"
                                    @blur="checkPassworData()"
                                    @input="inputPassword = $event.target.value"
                                />
                                <button 
                                    @click="showPassword = !showPassword"
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg v-if="!showPassword" class="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                    </svg>
                                    <svg v-if="showPassword" class="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
                                        <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                        <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                    </svg>
                                </button>
                            </div>
                            <p v-show="inputPasswordMessage" :class="{'animation-custom': inputPasswordMessage}" class="text-sm text-red-600 dark:text-red-400">
                                <span class="font-medium">{{ inputPasswordMessage }}</span>
                            </p>
                        </div>                        <!-- Login Button -->
                        <div class="pt-4">
                            <button 
                                @click="loginForm()"
                                :disabled="!inputPhone || !inputPassword"
                                :class="{
                                    'bg-slate-400 cursor-not-allowed': !inputPhone || !inputPassword,
                                    'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 transform hover:scale-[1.02] cursor-pointer': inputPhone && inputPassword
                                }"
                                class="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <span>Đăng nhập</span>
                            </button>
                        </div>

                        <!-- Links -->
                        <div class="flex justify-between items-center text-sm space-x-4">
                            <button class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Quên mật khẩu?
                            </button>
                            <router-link to="/auth/register" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Đăng ký tài khoản
                            </router-link>
                        </div>

                        <!-- Divider -->
                        <div class="border-t border-slate-200 dark:border-slate-700"></div>
                        
                        <!-- Footer -->
                        <div class="text-center">
                            <p class="text-slate-600 dark:text-slate-400 text-sm">
                                Bằng việc đăng nhập, bạn đồng ý với 
                                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Điều khoản sử dụng</a>
                            </p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import {
        ref, 
        onMounted
        }                               from   'vue'
import {useRouter}                      from   'vue-router'
import { useAuth }                      from   '../composables/useAuth'
import axios                            from    'axios'

const router = useRouter();
const { login } = useAuth();
const inputPhone                        =       ref('')
const inputPassword                     =       ref('')
const inputPhoneMessage                 =       ref('');
const inputPasswordMessage              =       ref('');
const showPassword                      =       ref(false);

const checkFormData                     =       () => {
    if(!inputPhone.value) {
        inputPhoneMessage.value         =       'Số điện thoại không được để trống';
    } else {
        inputPhoneMessage.value         =       '';
    }
    if(!inputPassword.value) {
        inputPasswordMessage.value      =       'Mât khẩu không được để trống';
    } else {
        inputPasswordMessage.value      =       '';
    }

    return !inputPhoneMessage.value     &&      !inputPasswordMessage.value;
}

const checkPhoneData = () => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if(!inputPhone.value) {
        inputPhoneMessage.value         =       'Số điện thoại không được để trống';
    } else if(!phoneRegex.test(inputPhone.value)) {
        inputPhoneMessage.value         =       'Số điện thoại không đúng định dạng';
    } else if(inputPhone.value.length < 10 || inputPhone.value.length > 11) {
        inputPhoneMessage.value         =       'Số điện thoại không đúng định dạng';
    } else {
        inputPhoneMessage.value         =       '';
    }
}
const checkPassworData = () => {
    const passwordRegex                 =       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!inputPassword.value) {
        inputPasswordMessage.value      =       'Mât khẩu không được để trống';
    } else if(!passwordRegex.test(inputPassword.value)) {
        inputPasswordMessage.value      =       'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số';
    } else {
        inputPasswordMessage.value      =       '';
    }
}

const loginForm                         =       async () => {
    const isValid                       =       checkFormData();
    if(!isValid) {
        return;
    }

    const data                          =       {
        phone:                                  inputPhone.value,
        password:                               inputPassword.value
    }
    console.log(data);    try {
        const response                  =       await axios.post('http://localhost:3000/user/auth/login', data);
        const result                    =       response.data;
        console.log(result);        if(result.status === 200) {
            // Đăng nhập thành công - sử dụng useAuth để lưu thông tin user
            login(result.userData);
            
            // Chuyển hướng về trang chủ
            router.push('/');
            
        } else if(result.status === 400) {
            // Lỗi đăng nhập - hiển thị thông báo lỗi
            if(result.message) {
                if(result.message.includes('điện thoại')) {
                    inputPhoneMessage.value = result.message;
                } else if(result.message.includes('mật khẩu')) {
                    inputPasswordMessage.value = result.message;
                } else {
                    alert(result.message);
                }
            } else {
                alert('Số điện thoại hoặc mật khẩu không đúng');
            }
        } else if(result.status === 500) {
            alert('Lỗi kết nối máy chủ');
        }
    } catch(error) {
        console.error('Login error:', error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Không thể kết nối đến máy chủ');
        }
    }
}
</script>

<style lang="css" scoped>
    .pattern {
        /* background-color: #DFDBE5; */
        background-image: url("/imgs/bg-login2.jpg");
    }
    .animation-custom {
        animation: showError 0.5s ease-in-out;
    }
    @keyframes showError {
        0% {
            transform: translateX(-5px);
        } 25% {
            transform: translateX(5px);
        }
        50% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }
    
    
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease-in-out;
    }
    
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(1.5rem);
    }
    
    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

</style>