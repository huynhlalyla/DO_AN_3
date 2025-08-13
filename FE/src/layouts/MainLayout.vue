<template>
  <!-- Modern Navigation -->
  <nav class="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-white rounded-lg sm:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <a href="/" class="flex lg:flex-row ms-2 md:me-24 items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-2 shadow-lg">
              <img src="/imgs/main-logo.jpg" class="w-full h-full object-cover rounded-lg" alt="Logo" />
            </div>
            <div>
              <span class="text-xl font-bold text-white tracking-tight">MONA</span>
              <p class="text-blue-200 text-xs font-medium lg:block hidden">Quản lý tài chính của bạn.</p>
            </div>
          </a>
        </div>
        <div class="flex items-center lg:flex-1">
          <!-- Search Form -->
          <form method="get" action="/search" class="max-w-md mx-auto flex-1 lg:block hidden">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Tìm kiếm</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" name="q" id="default-search" class="block w-full p-3 ps-10 text-sm border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-300 placeholder-white/60 text-white transition-all duration-300" placeholder="Giao dịch, danh mục,..." required />
              <button type="submit" class="text-white absolute end-2 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 transition-all duration-300">
                Tìm kiếm
              </button>
            </div>
          </form>

          <div class="flex items-center ms-3">
            <!-- Add Transaction Button -->
            <router-link to="/transactions/add" class="lg:flex items-center space-x-2 px-4 py-2 bg-green-600/90 hover:bg-green-700/90 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-green-500/30 hover:border-green-400/50 mr-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="font-medium hidden sm:block">Thêm giao dịch</span>
            </router-link>
            
            <div>
              <button type="button" class="flex text-sm bg-white/10 rounded-full focus:ring-4 focus:ring-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {{ initials }}
                </div>
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white/98 backdrop-blur-lg divide-y divide-slate-200 rounded-xl shadow-2xl border border-white/30" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ displayName }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  {{ userEmail }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Cập nhật hồ sơ</router-link>
                </li>
                <li>
                  <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" role="menuitem">Đăng xuất</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mx-4 flex gap-4 items-center border-1 p-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
            <span v-if="isDark" @click="toggleDarkMode" class="cursor-pointer">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
              </svg>
            </span>

            <span v-else @click="toggleDarkMode" class="cursor-pointer">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd"/>
              </svg>
            </span>

          </div>
          
        </div>
    </div>
  </div>
</nav>

<!-- Modern Sidebar -->
<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-100 border-r border-blue-200/50 sm:translate-x-0 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700 backdrop-blur-lg" aria-label="Sidebar">
   <div class="h-full px-4 pb-4 overflow-y-auto">
      <ul class="space-y-3 font-medium pt-2">
         <li>
            <router-link 
              to="/" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isHomePage,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isHomePage
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isHomePage,
                 'bg-blue-100 text-blue-600 group-hover:bg-blue-200': !isHomePage
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                </svg>
               </div>
               <span class="font-medium">Trang chủ</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/transactions" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isTransactions,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isTransactions
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isTransactions,
                 'bg-green-100 text-green-600 group-hover:bg-green-200': !isTransactions
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 3h2v2H6V8zm4 0h8v2h-8V8zm-4 4h2v2H6v-2zm4 0h8v2h-8v-2zm-4 4h2v2H6v-2zm4 0h8v2h-8v-2z"/>
                 </svg>
               </div>
               <span class="font-medium">Giao dịch</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/categories" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isCategories,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isCategories
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isCategories,
                 'bg-purple-100 text-purple-600 group-hover:bg-purple-200': !isCategories
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" clip-rule="evenodd"/>
                </svg>
               </div>
               <span class="font-medium">Danh mục</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/budgets" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isbudgets,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isbudgets
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isbudgets,
                 'bg-orange-100 text-orange-600 group-hover:bg-orange-200': !isbudgets
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                 </svg>
               </div>
               <span class="font-medium">Ngân sách</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/reports" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isReports,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isReports
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isReports,
                 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200': !isReports
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/>
                 </svg>
               </div>
               <span class="font-medium">Báo cáo</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/reports/comparison" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isComparison,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isComparison
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isComparison,
                 'bg-pink-100 text-pink-600 group-hover:bg-pink-200': !isComparison
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M5 3h2v18H5V3zm12 0h2v18h-2V3zM10 9h2v12h-2V9zm4-4h2v16h-2V5z" />
                 </svg>
               </div>
               <span class="font-medium">So sánh tháng</span>
            </router-link>
         </li>
         <li>
            <router-link 
              to="/chatbot" 
              :class="{
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0': isChatBot,
                'text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50': !isChatBot
              }"
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm">
               <div :class="{
                 'bg-white/20 text-white': isChatBot,
                 'bg-purple-100 text-purple-600 group-hover:bg-purple-200': !isChatBot
               }" class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
                </svg>
               </div>
               <span class="font-medium">AI Assistant</span>
            </router-link>
         </li>
      </ul>
   </div>
</aside>

<!-- Main Content Area -->
<div class=" sm:ml-64 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 min-h-screen flex flex-col">
  <div class="flex-1">
    <router-view class="mt-20"></router-view>
  </div>
  
  <!-- Modern Footer -->
  <footer class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-slate-700/50 mt-12 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2 shadow-lg">
              <img src="/imgs/main-logo.jpg" class="w-full h-full object-cover rounded-lg" alt="Logo" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-slate-800 dark:text-white">MONA</h3>
              <p class="text-blue-600 dark:text-blue-400 text-sm font-medium">Quản lý tài chính thông minh</p>
            </div>
          </div>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-2">
            <span class="font-semibold text-slate-800 dark:text-slate-200">Slogan:</span>
            Mới mẻ • Ổn định • Nhanh chóng • An toàn
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-slate-800 dark:text-white mb-4">Liên kết nhanh</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Trang chủ
              </router-link>
            </li>
            <li>
              <router-link to="/transactions" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                </svg>
                Giao dịch
              </router-link>
            </li>
            <li>
              <router-link to="/add-transaction" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Thêm giao dịch
              </router-link>
            </li>
            <li>
              <router-link to="/categories" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 4H9v16h6V4zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16z"/>
                </svg>
                Danh mục
              </router-link>
            </li>
            <li>
              <router-link to="/budgets" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
                Ngân sách
              </router-link>
            </li>
            <li>
              <router-link to="/chatbot" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
                </svg>
                AI Assistant
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-lg font-semibold text-slate-800 dark:text-white mb-4">Hỗ trợ</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Liên hệ hỗ trợ
              </a>
            </li>
            <li>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-slate-200 dark:border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <div class="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
          © 2025 MONA. Tất cả quyền được bảo lưu.
        </div>
        <div class="flex items-center space-x-6 text-sm">
          <span class="text-slate-600 dark:text-slate-400">Phiên bản 1.0.0</span>
          <div class="flex items-center space-x-2 text-slate-500 dark:text-slate-500">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Được phát triển với đam mê</span>
          </div>
        </div>
      </div>
    </div>  </footer>

  <!-- Mini Chat Widget - xuất hiện ở mọi trang -->
  <MiniChatWidget />
  <!-- Global Toasts -->
  <Toasts />
</div>

</template>

<script setup>
import { ref,
      onMounted,
      computed
 }                          from  "vue";
import {initFlowbite}       from  "flowbite";
import {useRoute, useRouter}           from  "vue-router";
import router from "../router";
import MiniChatWidget from "../components/MiniChatWidget.vue";
import Toasts from "../components/Toasts.vue";
import { useAuth } from "../composables/useAuth";

// Lấy luôn hàm logout đúng (xóa sessionStorage) từ composable
const { user, logout } = useAuth();

const displayName = computed(() => user.value?.fullname || user.value?.name || "Người dùng");
const userEmail = computed(() => user.value?.email || "");
const initials = computed(() => (displayName.value || 'U').split(' ').map(w => w?.[0]).filter(Boolean).slice(0,2).join('').toUpperCase());
console.log(user.value);

const route                 =     useRoute();
const routerInstance        =     useRouter();
const isHomePage            =     computed(() => route.path === "/");
const isTransactions        =     computed(() => route.path === "/transactions");
const isCategories          =     computed(() => route.path === "/categories");
const isbudgets             =     computed(() => route.path === "/budgets");
const isChatBot             =     computed(() => route.path === "/chatbot");
const isReports             =     computed(() => route.path === "/reports");
const isComparison          =     computed(() => route.path === "/reports/comparison");
console.log(isHomePage.value);


const isDark                =     ref(false);

onMounted(() => {
  //set theme
  const theme = localStorage.getItem('theme') || 'light'
  if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      isDark.value = true;
  } else {
      document.documentElement.classList.remove('dark');
      isDark.value = false;
  }

  // init Flowbite interactions (dropdown)
  try { initFlowbite(); } catch {}
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

</script>

<style lang="css" scoped>

</style>