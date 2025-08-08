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
                        <form class="p-8 space-y-6">
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
                                        v-model="categoryName"
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
                                        @click="categoryType = 'expense'"
                                        :class="[
                                            {
                                                'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg': categoryType === 'expense'
                                            },
                                            'py-3 px-4 rounded-lg font-medium transition-all text-black duration-300 flex items-center justify-center space-x-2'
                                        ]">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L1 13h4v7a1 1 0 001 1h12a1 1 0 001-1v-7h4L12 2zm0 2.5L19.5 13H16v7H8v-7H4.5L12 4.5z"/>
                                        </svg>
                                        <span>Chi tiêu</span>
                                    </button>
                                    <button 
                                        type="button"
                                        @click="categoryType = 'income'"
                                        :class="[
                                            {
                                                'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg': categoryType === 'income'
                                            },
                                            'py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'
                                        ]">
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
                                <div class="flex flex-wrap gap-3">
                                    <!-- Food Icon - Selected -->
                                    <button 
                                        @click="selectedIcon = icon.name"
                                        v-for="icon in icons"
                                        type="button"
                                        :class="[
                                            {
                                                'ring-2 ring-purple-500 scale-110': selectedIcon === icon.name,
                                                'hover:scale-105': selectedIcon !== icon.name
                                            },
                                            'w-12 h-12 inline-flex rounded-lg items-center justify-center transition-all duration-200 border border-slate-200 dark:border-slate-600'
                                        ]">
                                        <span v-html="icon.icon"></span>
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
                                    <!-- Red - Selected -->
                                    <button
                                    @click="selectedColor = color"
                                    v-for="color in colors"
                                    :style="`background-color: ${color}`"
                                    :class="[
                                        selectedColor === color ? 'ring-2 ring-slate-400 scale-110' : 'hover:scale-105'
                                    ]"
                                     type="button" class="w-8 h-8 rounded-full transition-all duration-200 relative scale-110">
                                        <div v-if="selectedColor === color" class="absolute inset-0 flex items-center justify-center">
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
                                        v-model="categoryDescription"
                                        id="category-description" 
                                        rows="3" 
                                        maxlength="200"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Mô tả ngắn về danh mục này..."></textarea>
                                </div>
                            </div>

                            <!-- Budget Limit (for expense categories) -->
                            <div class="space-y-2">
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
                                        v-model="budgetLimit"
                                        type="number" 
                                        id="budget-limit" 
                                        required
                                        min="1"
                                        class="w-full pl-16 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                        placeholder="0">
                                </div>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Số tiền tối đa có thể chi cho danh mục này trong một tháng</p>
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4">
                                <button 
                                    type="submit"
                                    @click.prevent="submitForm"
                                    class="w-full py-4 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:from-purple-600 hover:via-blue-700 hover:to-indigo-700">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span>Tạo danh mục</span>
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
                                    <div :style="{backgroundColor: selectedColor}" class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm">
                                        <span v-html="icons[selectedIcon].icon"></span>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                                            {{ categoryName || 'Tên danh mục' }}
                                        </h4>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">
                                            {{ categoryType === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-bold text-sm text-slate-800 dark:text-slate-200">{{ formatCurrency(budgetLimit) }}</p>
                                </div>
                            </div>
                            <div class="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 p-2 rounded-lg">
                                {{ categoryDescription || 'Mô tả danh mục' }}
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
                                <!-- Existing Categories - Static Data -->
                                <div v-for="category in categories" :key="category._id" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <div :style="{backgroundColor: category.color}" class="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-blue-500">
                                        <span v-html="icons[category.icon].icon"></span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{{ category.name }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ category.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}</p>
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
                                    <span class="font-bold text-red-600 dark:text-red-400">{{ categories.filter(category => category.type === 'expense').length }}</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Thu nhập</span>
                                    </div>
                                    <span class="font-bold text-green-600 dark:text-green-400">{{ categories.filter(category => category.type === 'income').length }}</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg border-2 border-purple-200 dark:border-purple-500/50">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                        <span class="text-sm font-bold text-slate-800 dark:text-slate-200">Tổng cộng</span>
                                    </div>
                                    <span class="font-bold text-purple-600 dark:text-purple-400">{{ categories.length }}</span>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
        
        <!-- Notification Toast -->
        <div 
            v-if="notification.show" 
            class="fixed top-20 right-6 z-50 transition-all duration-500 ease-in-out transform"
            :class="notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'">
            <div 
                class="min-w-80 max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-l-4 overflow-hidden"
                :class="{
                    'border-green-500': notification.type === 'success',
                    'border-red-500': notification.type === 'error'
                }">
                <div class="p-4">
                    <div class="flex items-start space-x-3">
                        <!-- Icon -->
                        <div 
                            class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                            :class="{
                                'bg-green-100 dark:bg-green-900/30': notification.type === 'success',
                                'bg-red-100 dark:bg-red-900/30': notification.type === 'error'
                            }">
                            <!-- Success Icon -->
                            <svg 
                                v-if="notification.type === 'success'"
                                class="w-5 h-5 text-green-600 dark:text-green-400" 
                                fill="currentColor" 
                                viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <!-- Error Icon -->
                            <svg 
                                v-if="notification.type === 'error'"
                                class="w-5 h-5 text-red-600 dark:text-red-400" 
                                fill="currentColor" 
                                viewBox="0 0 24 24">
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                            </svg>
                        </div>
                        
                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <h4 
                                class="font-semibold text-sm mb-1"
                                :class="{
                                    'text-green-800 dark:text-green-200': notification.type === 'success',
                                    'text-red-800 dark:text-red-200': notification.type === 'error'
                                }">
                                {{ notification.title }}
                            </h4>
                            <p class="text-sm text-slate-600 dark:text-slate-400">
                                {{ notification.content }}
                            </p>
                        </div>
                        
                        <!-- Close Button -->
                        <button 
                            @click="hideNotification"
                            class="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <svg class="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div 
                    class="h-1 transition-all duration-300 ease-linear"
                    :class="{
                        'bg-green-500': notification.type === 'success',
                        'bg-red-500': notification.type === 'error'
                    }"
                    :style="{width: `${notification.progress}%`}">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { icons } from '../composables/useIcons'
import { getCategories, createCategory } from '../composables/useCategoryAPI'
import { getTransactions } from '../composables/useTransactionAPI'
import { useRouter } from 'vue-router'

const { initAuth } = useAuth()
const colors = ref([
    'red', 'blue', 'green', 'orange', 'purple', 'pink', 'indigo', 'gray'
])

const router = useRouter()

const categories = ref([])
const transactions = ref([])

const selectedColor = ref('red')
const selectedIcon = ref('food')
const categoryName = ref('')
const categoryType = ref('expense')
const categoryDescription = ref('')
const budgetLimit = ref(0)

// Notification state
const notification = ref({
    show: false,
    type: 'success', // 'success' or 'error'
    title: '',
    content: '',
    progress: 100
})

// Initialize auth
onMounted( async () => {
//   initAuth();
  await loadCategories();
})

const loadCategories = async () => {
    try {
        const response = await getCategories()
        categories.value = response.data.data;
        console.log('Categories loaded:', categories.value)
    } catch (error) {
        console.error('Error loading categories:', error)
    }
}



const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value)
}

// Notification functions
const showNotification = (type, title, content) => {
    notification.value = {
        show: true,
        type: type,
        title: title,
        content: content,
        progress: 100
    }
    
    // Auto hide after 5 seconds with progress bar
    let progress = 100
    const interval = setInterval(() => {
        progress -= 2
        notification.value.progress = progress
        
        if (progress <= 0) {
            clearInterval(interval)
            hideNotification()
        }
    }, 100)
}

const hideNotification = () => {
    notification.value.show = false
}

// Form submission
const submitForm = async () => {
    if (!categoryName.value.trim()) {
        showNotification('error', 'Lỗi xác thực', 'Vui lòng nhập tên danh mục')
        return
    }
    
    if (!budgetLimit.value || budgetLimit.value <= 0) {
        showNotification('error', 'Lỗi xác thực', 'Vui lòng nhập ngân sách giới hạn hợp lệ')
        return
    }
    const newCategory = {
        name: categoryName.value.trim(),
        type: categoryType.value,
        icon: selectedIcon.value,
        color: selectedColor.value,
        description: categoryDescription.value.trim(),
        limit_amount: budgetLimit.value,
        user_id: useAuth().user.value._id
    }

    const response = await createCategory(newCategory)
    if(response.status === 'success') {
        showNotification('success', 'Thành công!', `Danh mục "${categoryName.value}" đã được tạo thành công`)

        setTimeout(() => {
            showNotification('success', 'Quay lại', 'Trở lại trang danh mục sau 5s');
        }, 300)

        setTimeout(() => {
            router.push('/categories')
        }, 5000)
    }
    else {
        showNotification('error', 'Lỗi', 'Không thể tạo danh mục. Vui lòng thử lại sau.')
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
