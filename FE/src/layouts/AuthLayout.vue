<template>
    <div>
        <Toasts />
    </div>
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
                            <h1 class="text-2xl font-bold text-white tracking-tight">MONA</h1>
                            <p class="text-blue-200 text-sm font-medium">Quản lý tài chính thông minh</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    <router-view class=""></router-view>
</template>

<script>
import Toasts from '../components/Toasts.vue'
</script>

<style lang="css" scoped>

</style>