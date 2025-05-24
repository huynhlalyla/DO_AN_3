<template>
    <div class="pattern flex justify-center items-center w-full h-screen">
        <transition
        name="fade"
        appear
        >
            <div
            class="bg-white flex flex-col justify-center items-center lg:p-32 p-6 shadow-md rounded-lg"
            id="login-form">
                <h1 class="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl"><span class="lg:text-4xl uppercase text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Đăng nhập</span> Tài khoản</h1>
                <div class="w-full max-w-xs">
                    <div  
                        :class="{
                            'border-red-500': inputPhoneMessage,
                            'border-gray-300': !inputPhoneMessage,
                        }"
                        class="relative w-full my-2 flex items-center border-1 rounded-lg border-gray-300 appearance-none">
                        <input 
                            type="text" 
                            id="floating_outlined" 
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" 
                            @focus="inputPhoneMessage = ''"
                            @blur="checkPhoneData()"
                            @input="inputPhone = $event.target.value"
                            />
                        <label for="floating_outlined" class="absolute flex items-center text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            <span class="">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                </svg>
                            </span>
                            Phone
                        </label>
                    </div>
                    <p 
                        v-show="inputPhoneMessage"
                        :class="{'animation-custom': inputPhoneMessage }"
                        class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oops!</span> {{ inputPhoneMessage }}.
                    </p>
                </div>
                <div class="w-full max-w-xs">
                    <div 
                        :class="{
                            'border-red-500': inputPasswordMessage,
                            'border-gray-300': !inputPasswordMessage
                        }"
                        class="relative w-full my-2 flex items-center border-1 rounded-lg border-gray-300 appearance-none">                        
                        <input 
                            :type="showPassword ? 'text' : 'password'"
                            id="floating_outlined" 
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" 
                            @focus="inputPasswordMessage = ''"
                            @blur="checkPassworData()"
                            @input="inputPassword = $event.target.value"
                            />
                            <span 
                            @click="showPassword = !showPassword"
                            class="cursor-pointer px-2.5 py-2.5 border-l-1 bg-slate-600 text-white appearance-auto border-y-1 border-gray-300 rounded-r-lg">
                                <svg v-if="!showPassword" class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                </svg>
                                <svg v-if="showPassword" class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
                                    <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                    <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                </svg>

                            </span>
                        <label for="floating_outlined" class="absolute flex items-center text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            <span class="">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                                </svg>
                            </span>
                            Password
                        </label>
                    </div>
                    <p 
                        v-show="inputPasswordMessage"
                        :class="{'animation-custom': inputPasswordMessage }"
                        class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oops!</span> {{ inputPasswordMessage }}.
                    </p>
                </div>
                <button 
                    @click="loginForm()"
                    :class="{
                        'bg-gray-500 text-gray-300 pointer-events-none': inputPhoneMessage || inputPasswordMessage,
                        'bg-green-600 text-white cursor-pointer': !inputPhoneMessage && !inputPasswordMessage
                    }"
                    class="text-lg w-full max-w-xs rounded-md py-2 mt-6">Đăng nhập</button>
                <div class="flex justify-between items-center w-full max-w-xs my-2 text-sm">
                    <span class="cursor-pointer hover:underline hover:text-blue-300">Quên mật khẩu?</span>
                    <router-link to="/auth/register" class="cursor-pointer hover:underline hover:text-blue-300">Đăng kí tài khoản</router-link>
                </div>
                <div class="border-t-1 border-gray-300 w-full my-2">

                </div>
            </div>
        </transition>        
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const inputPhone = ref('')
const inputPassword = ref('')
const inputPhoneMessage = ref('');
const inputPasswordMessage = ref('');
const showPassword = ref(false);

const checkFormData = () => {
    if(!inputPhone.value) {
        inputPhoneMessage.value = 'Số điện thoại không được để trống';
    } else {
        inputPhoneMessage.value = '';
    }
    if(!inputPassword.value) {
        inputPasswordMessage.value = 'Mât khẩu không được để trống';
    } else {
        inputPasswordMessage.value = '';
    }

    return !inputPhoneMessage.value && !inputPasswordMessage.value;
}

const checkPhoneData = () => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if(!inputPhone.value) {
        inputPhoneMessage.value = 'Số điện thoại không được để trống';
    } else if(!phoneRegex.test(inputPhone.value)) {
        inputPhoneMessage.value = 'Số điện thoại không đúng định dạng';
    } else if(inputPhone.value.length < 10 || inputPhone.value.length > 11) {
        inputPhoneMessage.value = 'Số điện thoại không đúng định dạng';
    } else {
        inputPhoneMessage.value = '';
    }
}
const checkPassworData = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!inputPassword.value) {
        inputPasswordMessage.value = 'Mât khẩu không được để trống';
    } else if(!passwordRegex.test(inputPassword.value)) {
        inputPasswordMessage.value = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số';
    } else {
        inputPasswordMessage.value = '';
    }
}

const loginForm = async () => {
    const isValid = checkFormData();
    if(!isValid) {
        return;
    }

    const data = {
        phone: inputPhone.value,
        password: inputPassword.value
    }
    try {
        const response = await fetch('http://localhost:3000/user/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if(result.status === 200) {
            //đăng nhập thành công
        } if(result.status === 400) {
            //lỗi đăng nhập
        } else if(result.status === 500) {
            //không có kết nối
        }
    } catch(error) {
        console.error(error);
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