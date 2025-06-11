<template>    
    <div class="min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
            <!-- Left Column - Form (2/3) -->
            <div class="lg:col-span-2 flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                    <div class="absolute inset-0" style="background-image: url('/imgs/bg-transaction.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                </div>                
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
                  <!-- Header Section -->
                <header class="relative z-10 w-full bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-md p-6 shadow-2xl border-b border-white/10">
                    <div class="flex justify-between items-center max-w-6xl mx-auto">
                        <!-- Left Side - Logo & Brand -->
                        <router-link to="/" class="flex items-center space-x-4">
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
                        </router-link>

                        <!-- Right Side - Navigation -->
                        <div class="flex items-center space-x-4">
                            <!-- Back to Transactions Button -->
                            <button class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                <span class="font-medium">Quản lý giao dịch</span>
                            </button>
                            
                            <!-- Menu Button -->
                            <button class="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header><!-- Form Section -->
                <div class="relative z-10 flex-1 flex justify-center items-center p-6">
                    <section class="w-full max-w-lg bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-slate-700/50">
                        <!-- Form Header -->
                        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 p-6">
                            <div class="flex items-center justify-center space-x-3 mb-2">
                                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </div>
                                <h2 class="text-2xl font-bold text-white">Chi Tiết Giao Dịch</h2>
                            </div>
                            <p class="text-blue-100 text-center text-sm">Thêm thông tin giao dịch mới</p>
                        </div>
                          <!-- Form Body -->
                        <div class="p-8 space-y-6">
                            <!-- Amount Input -->
                            <div class="space-y-2">
                                <label for="amount-input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Số tiền giao dịch
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
                                        type="text" 
                                        id="amount-input" 
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                        placeholder="0 VNĐ">
                                </div>
                            </div>

                            <!-- Transaction Type & Category -->
                            <div class="space-y-4">
                                <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Loại & Danh mục giao dịch
                                </label>
                                
                                <!-- Transaction Type Selector -->
                                <div class="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
                                    <button 
                                        @click="categoriesType = 'expense'"
                                        :class="categoriesType === 'expense' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'"
                                        class="py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
                                        </svg>
                                        <span>Chi tiêu</span>
                                    </button>
                                    <button 
                                        @click="categoriesType = 'income'"
                                        :class="categoriesType === 'income' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'"
                                        class="py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                        </svg>
                                        <span>Thu nhập</span>
                                    </button>
                                </div>

                                <!-- Category Selector -->
                                <div class="relative">
                                    <select class="w-full px-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none">
                                        <option selected disabled>Chọn danh mục...</option>
                                        <option v-for="category in list" :key="category.name" :value="category.name">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Date Input -->
                            <div class="space-y-2">
                                <label for="transaction-date" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Ngày giao dịch
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input 
                                        type="date" 
                                        id="transaction-date" 
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                </div>
                            </div>

                            <!-- Description/Notes -->
                            <div class="space-y-2">
                                <label for="transaction-notes" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Ghi chú
                                </label>
                                <div class="relative">
                                    <div class="absolute top-4 left-4 pointer-events-none">
                                        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <textarea 
                                        id="transaction-notes" 
                                        rows="4" 
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Thêm mô tả cho giao dịch của bạn..."></textarea>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4">
                                <button 
                                    class="w-full py-4 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span>Xác nhận giao dịch</span>                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>            <!-- Right Column - Categories (1/3) -->
            <div class="lg:col-span-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 relative overflow-hidden">
                <!-- Background Pattern for Right Side -->
                <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
                </div>
                <div class="relative z-10 space-y-6">
                    <div class="sticky top-0 space-y-6">
                    <!-- Categories Header -->
                    <div class="text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Quản lý danh mục</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Chọn danh mục phù hợp cho giao dịch</p>
                    </div>
                    
                    <!-- Category Type Tabs -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg">
                        <div class="flex space-x-1">
                            <button 
                                @click="categoriesType = 'expense'"
                                :class="categoriesType === 'expense' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                                class="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
                                </svg>
                                <span>Chi tiêu</span>
                            </button>
                            <button 
                                @click="categoriesType = 'income'"
                                :class="categoriesType === 'income' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                                class="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                </svg>
                                <span>Thu nhập</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Categories Grid -->
                    <div class="space-y-4">
                        <div v-if="categoriesType === 'expense'" class="space-y-3">
                            <!-- Expense Categories -->
                            <div v-for="(category, index) in expenseCategories" :key="index" 
                                 class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 group">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-3">
                                        <div :class="category.color" class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" v-html="category.icon"></svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ category.name }}</h4>
                                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ category.transactions }} giao dịch</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-sm text-slate-800 dark:text-slate-200">{{ formatCurrency(category.spent) }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ category.percentage }}%</p>
                                    </div>
                                </div>
                                <!-- Progress Bar -->
                                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                    <div :class="category.color.replace('bg-', 'bg-').split(' ')[0]" 
                                         :style="`width: ${category.percentage}%`" 
                                         class="h-2 rounded-full transition-all duration-500 relative">
                                        <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="categoriesType === 'income'" class="space-y-3">
                            <!-- Income Categories -->
                            <div v-for="(category, index) in incomeCategories" :key="index" 
                                 class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500 group">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div :class="category.color" class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" v-html="category.icon"></svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ category.name }}</h4>
                                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ category.transactions }} giao dịch</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-sm text-green-600 dark:text-green-400">+{{ formatCurrency(category.amount) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Stats -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-5 border border-blue-200 dark:border-slate-700">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2h-4zM10 4h4v2h-4V4zm6 15a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8h8v11z"/>
                                </svg>
                            </div>
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">Thống kê tháng này</h4>
                        </div>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Tổng chi</span>
                                </div>
                                <span class="font-bold text-red-600 dark:text-red-400">1,250,000 ₫</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Tổng thu</span>
                                </div>
                                <span class="font-bold text-green-600 dark:text-green-400">3,500,000 ₫</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border-2 border-blue-200 dark:border-blue-500">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span class="text-sm font-bold text-slate-800 dark:text-slate-200">Còn lại</span>
                                </div>
                                <span class="font-bold text-blue-600 dark:text-blue-400 text-lg">2,250,000 ₫</span>                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { initFlowbite } from 'flowbite';
    import { onMounted, nextTick, ref, computed } from 'vue';

    const categoriesType = ref('expense');
    
    const expenseCategories = ref([
        { 
            name: 'Mua sắm', 
            spent: 1000000, 
            budget: 1500000,
            percentage: 67,
            transactions: 5,
            color: 'bg-gradient-to-br from-pink-500 to-rose-500',
            icon: '<path d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"/>'
        },
        { 
            name: 'Ăn uống', 
            spent: 800000, 
            budget: 1000000,
            percentage: 80,
            transactions: 12,
            color: 'bg-gradient-to-br from-orange-500 to-red-500',
            icon: '<path d="M8.5 11.5 11 7l2.5 4.5h-5zM12 2L3.5 12.5h17L12 2zM12 15.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>'
        },
        { 
            name: 'Vui chơi', 
            spent: 300000, 
            budget: 500000,
            percentage: 60,
            transactions: 3,
            color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
            icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 ten 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
        },
        { 
            name: 'Xe cộ', 
            spent: 200000, 
            budget: 800000,
            percentage: 25,
            transactions: 2,
            color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
            icon: '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>'
        },
        { 
            name: 'Nhà cửa', 
            spent: 1200000, 
            budget: 2000000,
            percentage: 60,
            transactions: 4,
            color: 'bg-gradient-to-br from-green-500 to-emerald-500',
            icon: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
        }
    ]);

    const incomeCategories = ref([
        { 
            name: 'Lương', 
            amount: 2500000,
            transactions: 1,
            color: 'bg-gradient-to-br from-green-500 to-emerald-500',
            icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>'
        },
        { 
            name: 'Thưởng', 
            amount: 500000,
            transactions: 1,
            color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
            icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
        },
        { 
            name: 'Kinh doanh', 
            amount: 300000,
            transactions: 2,
            color: 'bg-gradient-to-br from-blue-500 to-purple-500',
            icon: '<path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16z"/>'
        },
        { 
            name: 'Đầu tư', 
            amount: 200000,
            transactions: 1,
            color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
            icon: '<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>'
        }
    ]);

    const data = {
        'expense': expenseCategories.value,
        'income': incomeCategories.value
    }
    
    const list = computed(() => {
        return data[categoriesType.value];
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    onMounted(() => {
        nextTick(() => {
            initFlowbite();
        });
    });
</script>

<style lang="css" scoped>

</style>