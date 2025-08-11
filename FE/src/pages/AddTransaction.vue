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
                                    <h1 class="text-2xl font-bold text-white tracking-tight">MONA</h1>
                                    <p class="text-blue-200 text-sm font-medium">Quản lý tài chính thông minh</p>
                                </div>
                            </div>
                        </router-link>

                        <!-- Right Side - Navigation -->
                        <div class="flex items-center space-x-4">
                            <!-- Back to Transactions Button -->
                            <router-link to="/transactions" class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                <span class="font-medium">Quản lý giao dịch</span>
                            </router-link>
                            
                            <!-- Menu Button -->
                                                                                    <div class="relative">
                                                                                    <button ref="menuButtonRef" @click.stop="toggleMenu" class="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                                <teleport to="body">
                                    <transition name="fade" mode="out-in">
                                        <div v-if="menuOpen" ref="menuRef" :style="menuStyles" class="fixed w-56 origin-top-right bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl ring-1 ring-black/5 p-2 z-[9999] backdrop-blur-sm">
                                            <div class="py-1 text-sm">
                                                <router-link @click="closeMenu" :to="{ name: 'HomePage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Trang chủ</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'TransactionsPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Giao dịch</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'CategoriesPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Danh mục</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'BudgetsPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Ngân sách</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'CategoriesAddPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Thêm danh mục</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'ReportsPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Báo cáo</router-link>
                                                <router-link @click="closeMenu" :to="{ name: 'SearchResultsPage' }" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">Tìm kiếm</router-link>
                                            </div>
                                        </div>
                                    </transition>
                                </teleport>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Form Section -->
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
                        <form class="p-8 space-y-6">

                            <!-- Amount Input -->
                            <div class="space-y-2">
                                <label for="amount-input" class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Số tiền giao dịch <span class="text-red-500">*</span>
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
                                        :value="amountDisplay"
                                        @input="onAmountInput"
                                        inputmode="numeric"
                                        autocomplete="off"
                                        id="amount-input" 
                                        required
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium tracking-wide"
                                        placeholder="0"/>
                                </div>
                            </div>

                            <!-- Transaction Type & Category -->
                            <div class="space-y-4">
                                <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Loại & Danh mục giao dịch <span class="text-red-500">*</span>
                                </label>
                                
                                <!-- Transaction Type Selector -->
                                <div v-if="typeTarget" class="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
                                    <button 
                                        @click="typeTarget = 'expense'"
                                        type="button"
                                        :class="[
                                            {
                                                'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg text-white': typeTarget === 'expense'
                                            },
                                            'py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-slate-600'
                                        ]">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
                                        </svg>
                                        <span>Chi tiêu</span>
                                    </button>
                                    <button 
                                        @click="typeTarget = 'income'"
                                        type="button"
                                        :class="[
                                            {
                                                'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg text-white': typeTarget === 'income'
                                            },
                                            'py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'
                                        ]">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                        </svg>
                                        <span>Thu nhập</span>
                                    </button>
                                </div>

                                <!-- Category Selector -->
                                <div class="relative">
                                    <select 
                                        v-model="categorySelected"
                                        required
                                        class="w-full px-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none">
                                        <option value="" disabled selected>Chọn danh mục...</option>
                                        <!--  -->
                                        <option v-for="category in categoriesWithType" :value="category._id">{{ category.name }}</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                        </svg>
                                    </div>
                                </div>
                                <router-link 
                                    to="/categories/add"
                                    class="inline-flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 border border-blue-200 dark:border-blue-600 hover:border-blue-300 dark:hover:border-blue-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <span>Thêm danh mục mới</span>
                                </router-link>
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
                                        v-model="dateSelected"
                                        type="date" 
                                        id="transaction-date" 
                                        value="2025-08-02"
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
                                        v-model="notesSelected"
                                        id="transaction-notes" 
                                        rows="4" 
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Thêm mô tả cho giao dịch của bạn..."></textarea>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4 grid grid-cols-1 gap-4">
                                <button 
                                    @click.prevent="formSubmit"
                                    type="submit"
                                    class="w-full py-4 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:from-green-600 hover:via-green-700 hover:to-emerald-700">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span>Thêm giao dịch</span>
                                </button>
                            </div>
                            <!-- Inline message removed in favor of global toast -->
                        </form>
                    </section>
                </div>
            </div><!-- Right Column - Categories (1/3) -->
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
                                type="button"
                                @click="typeTarget = 'expense'"
                                :class="[
                                    {
                                        'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg text-white': typeTarget === 'expense'
                                    },
                                    'flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2'
                                ]">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
                                </svg>
                                <span>Chi tiêu</span>
                            </button>
                            <button 
                                type="button"
                                @click="typeTarget = 'income'"
                                :class="[
                                    {
                                        'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg text-white': typeTarget === 'income'
                                    },
                                    'flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2'
                                ]">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                                </svg>
                                <span>Thu nhập</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Categories Grid -->
                    <div class="space-y-4">
                        <div class="space-y-3">
                <div v-for="category in categoriesWithType" :key="category._id" @click="selectCategory(category)" class="relative bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md transition-all duration-300 cursor-pointer border group"
                                :class="[
                                    isCategorySelected(category._id)
                                        ? 'ring-2 ring-blue-500 border-blue-400 dark:border-blue-500 shadow-lg scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 hover:scale-[1.01]'
                                ]">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-3">
                                        <div :style="{backgroundColor: category.color}" :class="[
                                            'w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform',
                                            isCategorySelected(category._id) ? 'scale-110' : 'group-hover:scale-110'
                                        ]">
                                            <span v-html="icons[category.icon].icon"></span>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ category.name }}</h4>
                                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ solveData(category._id).totalCount }} giao dịch</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-sm text-slate-800 dark:text-slate-200">{{ formatCurrency(category.limit_amount) }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ solveData(category._id).percentage }}</p>
                                    </div>
                                </div>
                                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden relative">
                                    <div :style="{backgroundColor: category.color, width: solveData(category._id).percentage }" class="h-full transition-all duration-300 ease-in-out"></div>
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
                                <span class="font-bold text-red-600 dark:text-red-400">{{ formatCurrency(totalExpense) }}</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Tổng thu</span>
                                </div>
                                <span class="font-bold text-green-600 dark:text-green-400">{{ formatCurrency(totalIncome) }}</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border-2 border-blue-200 dark:border-blue-500">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span class="text-sm font-bold text-slate-800 dark:text-slate-200">Còn lại</span>
                                </div>
                                <span class="font-bold text-blue-600 dark:text-blue-400 text-lg">{{ formatCurrency(totalBalance) }}</span>
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
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getTransactions, addTransaction } from '../composables/useTransactionAPI'
import { useToast } from '../composables/useToast'
import { getCategories, getCategoriesByType } from '../composables/useCategoryAPI'
import { icons } from '../composables/useIcons'
const { initAuth } = useAuth()
const router = useRouter()


const typeTarget = ref('expense') // Loại giao dịch mặc định là chi tiêu
const pendingCategoryId = ref('') // Giữ category được chọn khi chuyển type

const transactionsData = ref([])
const categoriesWithType = ref([])
const categories = ref([])

const amountSelected = ref(0) // numeric value for submit & validation
const amountDisplay = ref('') // formatted string shown in the input
const dateSelected = ref(new Date().toISOString().split('T')[0]) // Lấy ngày hiện tại
const notesSelected = ref('')
const categorySelected = ref('')
const isSubmitting = ref(false)

const { push: pushToast } = useToast()

// Menu navigation state & handlers
const menuOpen = ref(false)
const menuRef = ref(null)
const menuButtonRef = ref(null)
const menuStyles = ref({ top: '0px', left: '0px' })
const computeMenuPosition = () => {
    if(!menuButtonRef.value) return
    const rect = menuButtonRef.value.getBoundingClientRect()
    const width = 224 // w-56
    menuStyles.value = {
        top: `${rect.bottom + 8}px`,
        left: `${Math.min(rect.right - width, window.innerWidth - width - 8)}px`
    }
}
const toggleMenu = () => { menuOpen.value = !menuOpen.value; if(menuOpen.value) { computeMenuPosition() } }
const closeMenu = () => { menuOpen.value = false }
const onClickOutside = (e) => {
    if(!menuOpen.value) return
    if(menuRef.value && !menuRef.value.contains(e.target) && !menuButtonRef.value.contains(e.target)) menuOpen.value = false
}
const onKey = (e) => { if(e.key === 'Escape') closeMenu() }
const onResize = () => { if(menuOpen.value) computeMenuPosition() }
onMounted(() => { document.addEventListener('click', onClickOutside); window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize) })
onUnmounted(() => { document.removeEventListener('click', onClickOutside); window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) })

function formatNumber(val){
    if(val === null || val === undefined || val === '' || isNaN(val)) return ''
    const num = Number(val)
    if(!isFinite(num)) return ''
    return num.toLocaleString('vi-VN')
}

function onAmountInput(e){
    const raw = (e.target.value || '').replace(/[^0-9]/g,'')
    if(raw === ''){
        amountSelected.value = 0
        amountDisplay.value = ''
    } else {
        amountSelected.value = Number(raw)
        amountDisplay.value = formatNumber(raw)
    }
}

// Khởi tạo auth state khi component mount
onMounted( async () => {
    initAuth() // Đảm bảo user data được load từ localStorage
    await loadTransactions();
    await loadCategories();
    await loadCategoriesByType(typeTarget.value);
    // init formatted display
    amountDisplay.value = amountSelected.value ? formatNumber(amountSelected.value) : ''
})
const loadTransactions = async () => {
  try {
    const response = await getTransactions();
    if (response.status === 'success') {
      transactionsData.value = response.data;
      console.log(transactionsData.value);
    } else {
      transactionsData.value = []
    }
  } catch (err) {
    console.error('Failed to load transactions:', err)
    transactionsData.value = []
  }
}
const isCategoryActive = (cat) => {
    if(!cat) return false
    if(!cat.end_date) return true
    const end = new Date(cat.end_date)
    return end.getTime() >= Date.now()
}
const loadCategoriesByType = async (type) => {
  try {
    const response = await getCategoriesByType(type);
    if (response.status === 'success') {
            categoriesWithType.value = response.data.data.filter(isCategoryActive);
            // Nếu vừa chuyển type và có pendingCategoryId thì set lại
            if(pendingCategoryId.value){
                                const found = categoriesWithType.value.find(c => c._id === pendingCategoryId.value)
                if(found) categorySelected.value = pendingCategoryId.value
                pendingCategoryId.value = ''
            }
    } else {
      console.error('Failed to load categories by type:', response.message)
    }
  } catch (err) {
    console.error('Failed to load categories by type:', err)
  }
}
const loadCategories = async () => {
  try {
    const response = await getCategories();
    if (response.status === 'success') {
            categories.value = response.data.data.filter(isCategoryActive);
    } else {
      console.error('Failed to load categories:', response.message)
    }
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}
const totalIncome = computed(() => {
  return transactionsData.value
    .filter(tx => tx.category_id.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
});
const totalExpense = computed(() => {
  return transactionsData.value
    .filter(tx => tx.category_id.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
});
const totalBalance = computed(() => {
  return totalIncome.value - totalExpense.value;
});

function solveData(category_id) {
    const limit_amount = categories.value.find(cat => cat._id === category_id)?.limit_amount || 0;
    const category_transactions = transactionsData.value
        .filter(tx => tx.category_id._id === category_id && tx.category_id.type === typeTarget.value);

    const totalAmount = category_transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalCount = category_transactions.length;
    const percentage = totalCount > 0 ? (totalAmount / limit_amount) * 100 : 0;
    return {
        totalAmount: totalAmount,
        totalCount: totalCount,
        percentage: percentage.toFixed(2) + '%',
        limit_amount: limit_amount
    }
}

function formSubmit() {
    if (isSubmitting.value) return

    const errors = []
    if (amountSelected.value === null || amountSelected.value === undefined || amountSelected.value === '') {
        errors.push('• Chưa nhập số tiền')
    } else if (Number(amountSelected.value) <= 0) {
        errors.push('• Số tiền phải > 0')
    }
    if (!categorySelected.value) errors.push('• Chưa chọn danh mục')
    if (!dateSelected.value) errors.push('• Chưa chọn ngày')
    // Optional: basic note length constraint
    if (notesSelected.value && notesSelected.value.length > 200) errors.push('• Ghi chú tối đa 200 ký tự')

    console.log(errors);

    // Warn if exceed category remaining limit (soft warning, not blocking)
    if (categorySelected.value) {
        const cat = categories.value.find(c => c._id === categorySelected.value)
        if (cat) {
            const spentInCat = transactionsData.value
                .filter(tx => tx.category_id._id === categorySelected.value)
                .reduce((s, tx) => s + tx.amount, 0)
            if (Number(amountSelected.value) > 0 && (spentInCat + Number(amountSelected.value)) > cat.limit_amount) {
                // Only push warning if no other blocking errors, we'll surface as separate toast
                if (errors.length === 0) {
                    pushToast('Vượt hạn mức danh mục (sẽ vẫn lưu)', 'warn')
                }
            }
        }
    }

    if (errors.length > 0) {
        // Gửi từng lỗi dưới dạng toast riêng
        pushToast(errors, 'error')
        return
    }

    // Ghép ngày được chọn với thời gian hiện tại (giờ/phút/giây) theo múi giờ local
    // Lý do: gửi chuỗi dạng 'YYYY-MM-DD' lên server sẽ bị parse thành UTC 00:00 => hiển thị lệch +07:00 (07:00 sáng)
    // Cách này đảm bảo thời gian lưu phản ánh thời điểm tạo giao dịch (hoặc tối thiểu là thời điểm submit) thay vì luôn 07:00.
    const now = new Date()
    const [y,m,d] = dateSelected.value.split('-').map(Number)
    const combinedDate = new Date(y, m - 1, d, now.getHours(), now.getMinutes(), now.getSeconds()) // local time

    const newTransaction = {
        amount: amountSelected.value,
        date: combinedDate, // gửi object Date, backend mongoose sẽ lưu đúng múi giờ (ISO UTC) nhưng hiển thị sẽ quy đổi chuẩn
        note: notesSelected.value,
        category_id: categorySelected.value,
        user_id: useAuth().user.value._id // Lấy user ID từ auth state
    }

    isSubmitting.value = true
    addTransaction(newTransaction)
        .then(response => {
            if (response.status === 'success') {
                pushToast('Thêm giao dịch thành công', 'success')
                // Reset form (giữ type & categories)
                amountSelected.value = 0
                amountDisplay.value = ''
                notesSelected.value = ''
                // Optional: stay or redirect
                setTimeout(() => router.push('/transactions'), 600)
            } else {
                pushToast('Không thể thêm giao dịch', 'error')
            }
        })
        .catch(() => pushToast('Lỗi kết nối máy chủ', 'error'))
        .finally(() => { isSubmitting.value = false })
}


watch(typeTarget, async (newType, oldType) => {
    // Nếu đổi loại chủ động (không phải do selectCategory kích hoạt pending) thì reset chọn
    if(!pendingCategoryId.value){
            categorySelected.value = ''
    }
    await loadCategoriesByType(newType);
    // Sau khi load, nếu có pending thì sẽ được xử lý trong loadCategoriesByType (giữ) -> không reset nữa
});

function selectCategory(cat){
    if(!cat) return
    // Nếu chọn category khác loại hiện tại: chuyển type rồi chờ load
    if(cat.type && cat.type !== typeTarget.value){
        pendingCategoryId.value = cat._id
        typeTarget.value = cat.type
    } else {
        categorySelected.value = cat._id
    }
    pushToast(`Đã chọn danh mục: ${cat.name}`,'info',2000)
}

const isCategorySelected = (id) => id === categorySelected.value

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}
</script>

<style lang="css" scoped>

</style>