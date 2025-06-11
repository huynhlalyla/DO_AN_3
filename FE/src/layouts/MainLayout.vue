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
          <a href="/" class="flex ms-2 md:me-24 items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-2 shadow-lg">
              <img src="/imgs/main-logo.jpg" class="w-full h-full object-cover rounded-lg" alt="Logo" />
            </div>
            <div>
              <span class="text-xl font-bold text-white tracking-tight">MoneyManager</span>
              <p class="text-blue-200 text-xs font-medium">Quản lý tài chính thông minh</p>
            </div>
          </a>
        </div>
        <div class="flex items-center lg:flex-1">
          <!-- Search Form -->
          <form class="max-w-md mx-auto flex-1 lg:block hidden">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Tìm kiếm</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-3 ps-10 text-sm text-slate-900 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-300 placeholder-white/60 text-white transition-all duration-300" placeholder="Giao dịch, danh mục,..." required />
              <button type="submit" class="text-white absolute end-2 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 transition-all duration-300">
                Tìm kiếm
              </button>
            </div>
          </form>

          <div class="flex items-center ms-3">
            <!-- Add Transaction Button -->
            <router-link to="/add-transaction" class="flex items-center space-x-2 px-4 py-2 bg-green-600/90 hover:bg-green-700/90 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-green-500/30 hover:border-green-400/50 mr-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="font-medium hidden sm:block">Thêm giao dịch</span>
            </router-link>
            
            <div>
              <button type="button" class="flex text-sm bg-white/10 rounded-full focus:ring-4 focus:ring-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white/98 backdrop-blur-lg divide-y divide-slate-200 rounded-xl shadow-2xl border border-white/30" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
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

            <span class="">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z"/>
                <path fill-rule="evenodd" d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z" clip-rule="evenodd"/>
                <path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z"/>
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
              to="/add-transaction" 
              class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white border border-transparent hover:border-green-200/50">
               <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 bg-emerald-100 text-emerald-600 group-hover:bg-white/20 group-hover:text-white">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                 </svg>
               </div>
               <span class="font-medium">Thêm giao dịch</span>
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
            <a href="#" class="flex items-center p-3 rounded-xl group transition-all duration-300 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-blue-100/70 dark:hover:bg-slate-700/70 border border-transparent hover:border-blue-200/50">
               <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200">
                 <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/>
                 </svg>
               </div>
               <span class="font-medium">Báo cáo</span>
            </a>
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
              <h3 class="text-2xl font-bold text-slate-800 dark:text-white">MoneyManager</h3>
              <p class="text-blue-600 dark:text-blue-400 text-sm font-medium">Quản lý tài chính thông minh</p>
            </div>
          </div>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Ứng dụng quản lý tài chính cá nhân giúp bạn theo dõi thu chi, lập ngân sách và đạt được mục tiêu tài chính một cách hiệu quả.
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
          </div>
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                Ngân sách
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Hướng dẫn sử dụng
              </a>
            </li>
            <li>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Câu hỏi thường gặp
              </a>
            </li>
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
            <li>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                </svg>
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-slate-200 dark:border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <div class="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
          © 2025 MoneyManager. Tất cả quyền được bảo lưu.
        </div>
        <div class="flex items-center space-x-6 text-sm">
          <span class="text-slate-600 dark:text-slate-400">Phiên bản 1.0.0</span>
          <div class="flex items-center space-x-2 text-slate-500 dark:text-slate-500">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Được phát triển với tình yêu</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
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

const route                 =     useRoute();
const routerInstance        =     useRouter();
const isHomePage            =     computed(() => route.path === "/");
const isTransactions        =     computed(() => route.path === "/transactions");
const isCategories          =     computed(() => route.path === "/categories");
const isbudgets             =     computed(() => route.path === "/budgets");
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

// Hàm đăng xuất
const logout = () => {
  // Xóa thông tin đăng nhập khỏi localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  
  // Chuyển hướng về trang đăng nhập
  routerInstance.push('/auth/login');
};

</script>

<style lang="css" scoped>

</style>