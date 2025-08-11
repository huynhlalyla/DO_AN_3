<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: url('/imgs/bg-login2.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        
        <!-- Toast Container với transition -->
        <transition class="fixed top-10 right-10" name="toast" appear>
            <div v-if="toast" class="w-full max-w-xs">                            <!-- Success Toast -->
                <div 
                    v-if="toast.type === 'success'"
                    id="toast-success" 
                    class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 border-green-500 dark:text-gray-400 dark:bg-gray-800" 
                    role="alert">
                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                    </div>
                    <div class="ms-3 text-sm font-medium">{{ toast.message }}</div>
                    <button 
                        type="button" 
                        @click="closeToast"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                        aria-label="Close">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>                            <!-- Error Toast -->
                <div
                    v-if="toast.type === 'error'"
                    id="toast-danger" 
                    class="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 border-red-500 dark:text-gray-400 dark:bg-gray-800" 
                    role="alert">
                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                    </div>
                    <div class="ms-3 text-sm font-medium">{{ toast.message }}</div>
                    <button 
                        type="button" 
                        @click="closeToast"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                        aria-label="Close">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>                            <!-- Warning Toast -->
                <div 
                    v-if="toast.type === 'warn'"
                    id="toast-warning" 
                    class="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 border-orange-500 dark:text-gray-400 dark:bg-gray-800" 
                    role="alert">
                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                        </svg>
                    </div>
                    <div class="ms-3 text-sm font-medium">{{ toast.message }}</div>
                    <button 
                        type="button" 
                        @click="closeToast"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                        aria-label="Close">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>        </transition>

        <!-- Main Content -->
        <div class="relative z-10 flex justify-center items-center flex-1 p-6" style="min-height: calc(100vh - 88px);">
            <transition name="fade" appear>
                <div class="w-full max-w-md bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-slate-700/50">
                    <!-- Form Header -->
                    <div class="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 p-8 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 shadow-lg backdrop-blur-sm">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">Đăng ký tài khoản</h2>
                        <p class="text-green-100 text-sm">Tạo tài khoản mới để bắt đầu</p>
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

                        <!-- Name Input -->
                        <div class="space-y-2">
                            <label for="name_input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                Họ và tên
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <div class="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v1c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-1c0-3.3-6.7-5-10-5Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    id="name_input" 
                                    :class="{
                                        'border-red-300 focus:ring-red-500 focus:border-red-500': inputNameMessage,
                                        'border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500': !inputNameMessage
                                    }"
                                    class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    placeholder="Nhập họ và tên..."
                                    @focus="inputNameMessage = ''"
                                    @blur="checkNameData()"
                                    @input="inputName = $event.target.value"
                                />
                            </div>
                            <p v-show="inputNameMessage" :class="{'animation-custom': inputNameMessage}" class="text-sm text-red-600 dark:text-red-400">
                                <span class="font-medium">{{ inputNameMessage }}</span>
                            </p>
                        </div>

                        <!-- Email Input -->
                        <div class="space-y-2">
                            <label for="email_input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                Email
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    type="email" 
                                    id="email_input" 
                                    :class="{
                                        'border-red-300 focus:ring-red-500 focus:border-red-500': inputEmailMessage,
                                        'border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500': !inputEmailMessage
                                    }"
                                    class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    placeholder="Nhập email..."
                                    @focus="inputEmailMessage = ''"
                                    @blur="checkEmailData()"
                                    @input="inputEmail = $event.target.value"
                                />
                            </div>
                            <p v-show="inputEmailMessage" :class="{'animation-custom': inputEmailMessage}" class="text-sm text-red-600 dark:text-red-400">
                                <span class="font-medium">{{ inputEmailMessage }}</span>
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
                        </div>

                        <!-- Confirm Password Input -->
                        <div class="space-y-2">
                            <label for="confirm_password_input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                Xác nhận mật khẩu
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <div class="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    id="confirm_password_input" 
                                    :class="{
                                        'border-red-300 focus:ring-red-500 focus:border-red-500': inputConfirmPasswordMessage,
                                        'border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500': !inputConfirmPasswordMessage
                                    }"
                                    class="w-full pl-16 pr-14 py-4 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    placeholder="Nhập lại mật khẩu..."
                                    @focus="inputConfirmPasswordMessage = ''"
                                    @blur="checkConfirmPasswordData()"
                                    @input="inputConfirmPassword = $event.target.value"
                                />
                                <button 
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg v-if="!showConfirmPassword" class="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                    </svg>
                                    <svg v-if="showConfirmPassword" class="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
                                        <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                        <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                    </svg>
                                </button>
                            </div>
                            <p v-show="inputConfirmPasswordMessage" :class="{'animation-custom': inputConfirmPasswordMessage}" class="text-sm text-red-600 dark:text-red-400">
                                <span class="font-medium">{{ inputConfirmPasswordMessage }}</span>
                            </p>
                        </div>                        <!-- Register Button -->
                        <div class="pt-4">
                            <button 
                                @click="registerform()"
                                :disabled="!inputPhone || !inputName || !inputEmail || !inputPassword || !inputConfirmPassword"
                                :class="{
                                    'bg-slate-400 cursor-not-allowed': !inputPhone || !inputName || !inputEmail || !inputPassword || !inputConfirmPassword,
                                    'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 transform hover:scale-[1.02] cursor-pointer': inputPhone && inputName && inputEmail && inputPassword && inputConfirmPassword
                                }"
                                class="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                </svg>
                                <span>Đăng ký tài khoản</span>
                            </button>
                        </div>

                        <!-- Links -->
                        <div class="flex justify-center items-center text-sm">
                            <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Đã có tài khoản? Đăng nhập ngay
                            </router-link>
                        </div>

                        <!-- Divider -->
                        <div class="border-t border-slate-200 dark:border-slate-700"></div>

                        <!-- Footer -->
                        <div class="text-center">
                            <p class="text-slate-600 dark:text-slate-400 text-sm">
                                Bằng việc đăng ký, bạn đồng ý với 
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
import {ref, onMounted}                                    from    'vue'
import {useRouter}                              from    'vue-router'
import axios                                    from    'axios'
import { initFlowbite } from 'flowbite';

const inputPhone                                =       ref('');
const inputEmail                                =       ref('');
const inputName                                 =       ref('');
const inputPassword                             =       ref('');
const inputConfirmPassword                      =       ref('');
const inputPhoneMessage                         =       ref('');
const inputEmailMessage                         =       ref('');
const inputNameMessage                          =       ref('');
const inputPasswordMessage                      =       ref('');
const inputConfirmPasswordMessage               =       ref('');

const toast                                     =       ref(null);
const router                                    =       useRouter();

const showPassword                              =       ref(false);
const showConfirmPassword                       =       ref(false);

// Hàm đóng toast
const closeToast = () => {
    toast.value = null;
};

// Hàm hiển thị toast với auto-hide
const showToast = (type, message, autoHide = true, duration = 3000) => {
    toast.value = { type, message };
    
    if (autoHide) {
        setTimeout(() => {
            closeToast();
        }, duration);
    }
};

onMounted(() => {
    initFlowbite();
});

const checkFormData                             =       () => {
    if(!inputPhone.value) {
        inputPhoneMessage.value                 =       'Số điện thoại không được để trống';
    } else {
        inputPhoneMessage.value                 =       '';
    }
    if(!inputPassword.value) {
        inputPasswordMessage.value              =       'Mât khẩu không được để trống';
    } else {
        inputPasswordMessage.value              =       '';
    }
    if(!inputName.value) {
        inputNameMessage.value                  =       'Họ và tên không được để trống';
    } else if(inputName.value.length < 2) {
        inputNameMessage.value                  =       'Họ và tên quá ngắn';
    } else {
        inputNameMessage.value                  =       '';
    }
    if(!inputEmail.value) {
        inputEmailMessage.value                 =       'Email không được để trống';
    } else {
        inputEmailMessage.value                 =       '';
    }
    if(!inputConfirmPassword.value) {
        inputConfirmPasswordMessage.value       =       'Phần này không được để trống';
    } else if(inputConfirmPassword.value        !==     inputPassword.value) {
        inputConfirmPasswordMessage.value       =       'Mật khẩu không khớp';
    } else {
        inputConfirmPasswordMessage.value       =       '';
    }

    return !inputPhoneMessage.value && 
           !inputNameMessage.value &&
           !inputEmailMessage.value && 
           !inputPasswordMessage.value && 
           !inputConfirmPasswordMessage.value;
}

const checkPhoneData = () => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if(!inputPhone.value) {
        inputPhoneMessage.value                 =       'Số điện thoại không được để trống';
    } else if(!phoneRegex.test(inputPhone.value)) {
        inputPhoneMessage.value                 =       'Số điện thoại không đúng định dạng';
    } else if(inputPhone.value.length < 10 || inputPhone.value.length > 11) {
        inputPhoneMessage.value                 =       'Số điện thoại không đúng định dạng';
    } else {
        inputPhoneMessage.value                 =       '';
    }
}
const checkPassworData                          =       () => {
    const passwordRegex                         =       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!inputPassword.value) {
        inputPasswordMessage.value              =       'Mât khẩu không được để trống';
    } else if(!passwordRegex.test(inputPassword.value)) {
        inputPasswordMessage.value              =       'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số';
    } else {
        inputPasswordMessage.value              =       '';
    }
}
const checkEmailData                            =       () => {
    const emailRegex                            =       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!inputEmail.value) {
        inputEmailMessage.value                 =       'Email không được để trống';
    } else if(!emailRegex.test(inputEmail.value)) {
        inputEmailMessage.value                 =       'Email không đúng định dạng';
    } else {
        inputEmailMessage.value                 =       '';
    }
}
const checkNameData = () => {
    if(!inputName.value) {
        inputNameMessage.value = 'Họ và tên không được để trống';
    } else if(inputName.value.length < 2) {
        inputNameMessage.value = 'Họ và tên quá ngắn';
    } else if(inputName.value.length > 50) {
        inputNameMessage.value = 'Họ và tên quá dài';
    } else {
        inputNameMessage.value = '';
    }
}
const checkConfirmPasswordData                  =       () => {
    if(!inputConfirmPassword.value) {
        inputConfirmPasswordMessage.value       =       'Phần này không được để trống';
    } else if(inputConfirmPassword.value        !==     inputPassword.value) {
        inputConfirmPasswordMessage.value       =       'Mật khẩu không khớp';
    } else {
        inputConfirmPasswordMessage.value       =       '';
    }
}

const registerform                              =       async function() {
    const isValid                               =       checkFormData();
    if(!isValid) {
        return;
    }

    const data                                  =       {
        phone:                                          inputPhone.value,
    name:                                           inputName.value.trim(),
        email:                                          inputEmail.value,
        password:                                       inputPassword.value,
    };
    try {
        const response = await axios.post('http://localhost:3000/user/auth/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = response.data;
        console.log('Registration result:', result);          if(result.type == 'success') {
            showToast('success', result.message, true, 2000);
            // Chuyển hướng đến trang đăng nhập sau 2 giây
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } else if(result.type == 'warn') {
            // Hiển thị lỗi cụ thể từ server
            if(result.message) {
                if(result.message.includes('điện thoại')) {
                    inputPhoneMessage.value = result.message;
                } else if(result.message.includes('Email')) {
                    inputEmailMessage.value = result.message;
                } else {
                    showToast('warn', result.message);
                }
            } else {
                showToast('warn', 'Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        } else if(result.type == 'error') {
            showToast('error', result.message || 'Đã xảy ra lỗi, vui lòng thử lại sau.');
        }    } catch (error) {
        toast.value = {
            type: 'error',
            message: 'Đã xảy ra lỗi, vui lòng thử lại sau.'
        };
    }
}
</script>

<style lang="css" scoped>
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

    /* Toast animations */
    .toast-enter-active,
    .toast-leave-active {
        transition: all 0.3s ease-out;
    }
    
    .toast-enter-from {
        opacity: 0;
        transform: translateX(100%);
    }
    
    .toast-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }
    
    .toast-enter-to,
    .toast-leave-from {
        opacity: 1;
        transform: translateX(0);
    }
</style>