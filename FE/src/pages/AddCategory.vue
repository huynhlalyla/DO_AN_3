<template>    
    <div class="min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
            <!-- Left Column - Form (2/3) -->
            <div class="lg:col-span-2 flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                    <div class="absolute inset-0" style="background-image: url('/imgs/bg-form.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                </div>                
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10"></div>
                
                <!-- Header Section -->
                <header class="relative z-10 w-full bg-gradient-to-r from-purple-900/95 via-blue-800/95 to-indigo-900/95 backdrop-blur-md p-6 shadow-2xl border-b border-white/10">
                    <div class="flex justify-between items-center max-w-6xl mx-auto">
                        <!-- Left Side - Logo & Brand -->
                        <router-link to="/" class="flex items-center space-x-4">
                            <div class="flex items-center space-x-3">
                                <!-- Logo -->
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl p-2 shadow-lg">
                                    <img src="/imgs/main-logo.jpg" alt="Logo" class="w-full h-full object-cover rounded-lg">
                                </div>
                                <!-- Brand Name -->
                                <div>
                                    <h1 class="text-2xl font-bold text-white tracking-tight">MoneyManager</h1>
                                    <p class="text-purple-200 text-sm font-medium">Quản lý tài chính thông minh</p>
                                </div>
                            </div>
                        </router-link>

                        <!-- Right Side - Navigation -->
                        <div class="flex items-center space-x-4">
                            <!-- Back to Categories Button -->
                            <router-link to="/categories" class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                <span class="font-medium">Quản lý danh mục</span>
                            </router-link>
                            
                            <!-- Menu Button -->
                            <button class="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                <!-- Form Section -->
                <div class="relative z-10 flex-1 flex justify-center items-center p-6">
                    <section class="w-full max-w-lg bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-slate-700/50">
                        <!-- Form Header -->
                        <div class="bg-gradient-to-r from-purple-600 via-blue-700 to-indigo-600 p-6">
                            <div class="flex items-center justify-center space-x-3 mb-2">
                                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                    </svg>
                                </div>
                                <h2 class="text-2xl font-bold text-white">Thêm Danh Mục Mới</h2>
                            </div>
                            <p class="text-purple-100 text-center text-sm">Tạo danh mục mới cho giao dịch</p>
                        </div>
                          
                        <!-- Form Body -->
                        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
                            <!-- Success/Error Messages -->
                            <div v-if="message" :class="messageType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'" class="p-4 border rounded-lg mb-4">
                                {{ message }}
                            </div>

                            <!-- Category Name Input -->
                            <div class="space-y-2">
                                <label for="category-name" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Tên danh mục <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input 
                                        v-model="form.name"
                                        type="text" 
                                        id="category-name" 
                                        required
                                        maxlength="50"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                        placeholder="Ví dụ: Ăn uống, Du lịch, Giải trí...">
                                </div>
                            </div>

                            <!-- Category Type -->
                            <div class="space-y-4">
                                <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Loại danh mục <span class="text-red-500">*</span>
                                </label>
                                
                                <!-- Category Type Selector -->
                                <div class="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
                                    <button 
                                        type="button"
                                        @click="setCategoryType('expense')"
                                        :class="form.type === 'expense' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'"
                                        class="py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L1 13h4v7a1 1 0 001 1h12a1 1 0 001-1v-7h4L12 2zm0 2.5L19.5 13H16v7H8v-7H4.5L12 4.5z"/>
                                        </svg>
                                        <span>Chi tiêu</span>
                                    </button>
                                    <button 
                                        type="button"
                                        @click="setCategoryType('income')"
                                        :class="form.type === 'income' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'"
                                        class="py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                        </svg>
                                        <span>Thu nhập</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Icon Selection -->
                            <div class="space-y-4">
                                <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Chọn biểu tượng
                                </label>
                                
                                <!-- Icon Grid -->
                                <div class="grid grid-cols-6 gap-3">
                                    <button 
                                        v-for="icon in availableIcons" 
                                        :key="icon.id"
                                        type="button"
                                        @click="selectIcon(icon)"
                                        :class="form.icon === icon.id ? 'ring-2 ring-purple-500 bg-purple-100 dark:bg-purple-900/50' : 'hover:bg-slate-100 dark:hover:bg-slate-700'"
                                        class="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border border-slate-200 dark:border-slate-600">
                                        <component :is="icon.component" class="w-6 h-6 text-slate-700 dark:text-slate-300" />
                                    </button>
                                </div>
                            </div>

                            <!-- Color Selection -->
                            <div class="space-y-4">
                                <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Chọn màu sắc
                                </label>
                                
                                <!-- Color Grid -->
                                <div class="grid grid-cols-8 gap-2">
                                    <button 
                                        v-for="color in availableColors" 
                                        :key="color.name"
                                        type="button"
                                        @click="selectColor(color)"
                                        :class="[
                                            color.class,
                                            form.color === color.name ? 'ring-2 ring-slate-400 scale-110' : 'hover:scale-105'
                                        ]"
                                        class="w-8 h-8 rounded-full transition-all duration-200 relative">
                                        <div v-if="form.color === color.name" class="absolute inset-0 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="space-y-2">
                                <label for="category-description" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Mô tả (tùy chọn)
                                </label>
                                <div class="relative">
                                    <div class="absolute top-4 left-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <textarea 
                                        v-model="form.description"
                                        id="category-description" 
                                        rows="3" 
                                        maxlength="200"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Mô tả ngắn về danh mục này..."></textarea>
                                </div>
                            </div>

                            <!-- Budget Limit (for expense categories) -->
                            <div v-if="form.type === 'expense'" class="space-y-2">
                                <label for="budget-limit" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Ngân sách giới hạn <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input 
                                        v-model="form.limitAmount"
                                        type="number" 
                                        id="budget-limit" 
                                        required
                                        min="1"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                        placeholder="0">
                                </div>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Số tiền tối đa có thể chi cho danh mục này trong một tháng</p>
                            </div>

                            <!-- Limit Amount for income categories too -->
                            <div v-if="form.type === 'income'" class="space-y-2">
                                <label for="target-amount" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Mục tiêu thu nhập <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input 
                                        v-model="form.limitAmount"
                                        type="number" 
                                        id="target-amount" 
                                        required
                                        min="1"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                        placeholder="0">
                                </div>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Mục tiêu thu nhập mong muốn cho danh mục này trong một tháng</p>
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4">
                                <button 
                                    type="submit"
                                    :disabled="!form.name.trim() || loading"
                                    class="w-full py-4 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:from-purple-600 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg v-if="!loading" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>{{ loading ? 'Đang tạo...' : 'Tạo danh mục' }}</span>
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            <!-- Right Column - Preview & Categories (1/3) -->
            <div class="lg:col-span-1 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 relative overflow-hidden">
                <!-- Background Pattern for Right Side -->
                <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600"></div>
                </div>
                <div class="relative z-10 space-y-6">
                    <div class="sticky top-0 space-y-6">
                        <!-- Preview Header -->
                        <div class="text-center">
                            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Xem trước</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400">Danh mục sẽ hiển thị như thế này</p>
                        </div>
                        
                        <!-- Category Preview Card -->
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div :class="getSelectedColorClass()" class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm">
                                        <component :is="getSelectedIcon()" class="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                                            {{ form.name || 'Tên danh mục' }}
                                        </h4>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">
                                            {{ form.type === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-bold text-sm text-slate-800 dark:text-slate-200">0 ₫</p>
                                    <p class="text-xs text-slate-500 dark:text-slate-400">0 giao dịch</p>
                                </div>
                            </div>
                            <div v-if="form.description" class="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 p-2 rounded-lg">
                                {{ form.description }}
                            </div>
                        </div>
                        
                        <!-- Existing Categories -->
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                    </svg>
                                </div>
                                <h4 class="font-bold text-slate-800 dark:text-slate-200">Danh mục hiện có</h4>
                            </div>
                            
                            <div class="space-y-3 max-h-64 overflow-y-auto">
                                <div v-for="category in existingCategories" :key="category.id" 
                                     class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <div :class="category.colorClass" class="w-8 h-8 rounded-lg flex items-center justify-center text-white">
                                        <component :is="category.icon" class="w-4 h-4" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{{ category.name }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ category.type === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="bg-gradient-to-br from-purple-50 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700/50">
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                    </svg>
                                </div>
                                <h4 class="font-bold text-slate-800 dark:text-slate-200">Thống kê danh mục</h4>
                            </div>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Chi tiêu</span>
                                    </div>
                                    <span class="font-bold text-red-600 dark:text-red-400">{{ expenseCount }}</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Thu nhập</span>
                                    </div>
                                    <span class="font-bold text-green-600 dark:text-green-400">{{ incomeCount }}</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg border-2 border-purple-200 dark:border-purple-500/50">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                        <span class="text-sm font-bold text-slate-800 dark:text-slate-200">Tổng cộng</span>
                                    </div>
                                    <span class="font-bold text-purple-600 dark:text-purple-400">{{ totalCount }}</span>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCategoryAPI } from '../composables/useCategoryAPI'

const router = useRouter()
const { user, initAuth } = useAuth()
const { addCategory, loading } = useCategoryAPI()

// Khởi tạo auth state khi component mount
onMounted(() => {
    initAuth()
})

// Form reactive data
const form = ref({
    name: '',
    type: 'expense',
    icon: 'shopping',
    color: 'blue',
    description: '',
    limitAmount: ''
})

// Message state
const message = ref('')
const messageType = ref('success')

// Available icons
const availableIcons = ref([
    {
        id: 'shopping',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M7 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L10.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z' })
        ])
    },
    {
        id: 'food',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z' })
        ])
    },
    {
        id: 'transport',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' })
        ])
    },
    {
        id: 'entertainment',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z' })
        ])
    },
    {
        id: 'health',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z' })
        ])
    },
    {
        id: 'education',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' })
        ])
    },
    {
        id: 'salary',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z' })
        ])
    },
    {
        id: 'investment',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' })
        ])
    },
    {
        id: 'home',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
        ])
    },
    {
        id: 'travel',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M14.12 4l1.83 2H20v12H4V6h4.05l1.83-2h4.24M15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm-3 7c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z' })
        ])
    },
    {
        id: 'gift',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z' })
        ])
    },
    {
        id: 'other',
        component: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', { d: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' })
        ])
    }
])

// Available colors
const availableColors = ref([
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'indigo', class: 'bg-indigo-500' },
    { name: 'yellow', class: 'bg-yellow-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'teal', class: 'bg-teal-500' },
    { name: 'cyan', class: 'bg-cyan-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'lime', class: 'bg-lime-500' },
    { name: 'amber', class: 'bg-amber-500' },
    { name: 'rose', class: 'bg-rose-500' },
    { name: 'slate', class: 'bg-slate-500' },
    { name: 'gray', class: 'bg-gray-500' }
])

// Existing categories (mock data)
const existingCategories = ref([
    { id: 1, name: 'Ăn uống', type: 'expense', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z' })]), colorClass: 'bg-orange-500' },
    { id: 2, name: 'Mua sắm', type: 'expense', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M7 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L10.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z' })]), colorClass: 'bg-pink-500' },
    { id: 3, name: 'Xe cộ', type: 'expense', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' })]), colorClass: 'bg-blue-500' },
    { id: 4, name: 'Lương', type: 'income', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z' })]), colorClass: 'bg-green-500' },
    { id: 5, name: 'Bonus', type: 'income', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z' })]), colorClass: 'bg-yellow-500' }
])

// Computed properties
const expenseCount = computed(() => existingCategories.value.filter(cat => cat.type === 'expense').length)
const incomeCount = computed(() => existingCategories.value.filter(cat => cat.type === 'income').length)
const totalCount = computed(() => existingCategories.value.length)

// Methods
const setCategoryType = (type) => {
    form.value.type = type
}

const selectIcon = (icon) => {
    form.value.icon = icon.id
}

const selectColor = (color) => {
    form.value.color = color.name
}

const getSelectedIcon = () => {
    const selectedIcon = availableIcons.value.find(icon => icon.id === form.value.icon)
    return selectedIcon ? selectedIcon.component : availableIcons.value[0].component
}

const getSelectedColorClass = () => {
    const selectedColor = availableColors.value.find(color => color.name === form.value.color)
    return selectedColor ? `bg-gradient-to-br from-${form.value.color}-500 to-${form.value.color}-600` : 'bg-gradient-to-br from-blue-500 to-blue-600'
}

// Handle form submission
const handleSubmit = async () => {
    try {
        // Clear previous messages
        message.value = ''
        
        // Validation
        if (!form.value.name.trim()) {
            message.value = 'Vui lòng nhập tên danh mục'
            messageType.value = 'error'
            return
        }
        
        if (!user.value?._id) {
            message.value = 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.'
            messageType.value = 'error'
            return
        }
        
        // Prepare category data
        const categoryData = {
            name: form.value.name.trim(),
            type: form.value.type,
            icon: form.value.icon,
            color: form.value.color,
            description: form.value.description.trim(),
            limit_amount: form.value.limitAmount ? parseFloat(form.value.limitAmount) : 0,
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            user_id: user.value._id
        }
        
        // Call API
        const result = await addCategory(categoryData)
        
        if (result.status === 'success') {
            message.value = result.message || 'Tạo danh mục thành công!'
            messageType.value = 'success'
            
            // Add to existing categories for preview
            const newCategory = {
                id: result.data.category._id,
                name: result.data.category.name,
                type: result.data.category.type,
                icon: getSelectedIcon(),
                colorClass: getSelectedColorClass().replace('bg-gradient-to-br from-', 'bg-').replace('-500 to-' + form.value.color + '-600', '-500')
            }
            existingCategories.value.push(newCategory)
            
            // Reset form
            form.value = {
                name: '',
                type: 'expense',
                icon: 'shopping',
                color: 'blue',
                description: '',
                limitAmount: ''
            }
            
            // Redirect to categories page after 2 seconds
            setTimeout(() => {
                router.push('/categories')
            }, 2000)
        }
        
    } catch (error) {
        console.error('Error creating category:', error)
        message.value = error.message || 'Có lỗi xảy ra khi tạo danh mục. Vui lòng thử lại!'
        messageType.value = 'error'
    }
}
</script>

<style lang="css" scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
