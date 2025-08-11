<template>
  <div class="relative">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Quản lý danh mục</h1>
              <p class="text-slate-600 dark:text-slate-400">Tổng quan và quản lý các danh mục giao dịch</p>
            </div>
          </div>
          <div class="flex gap-3">
            <router-link to="/categories/add" class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm danh mục
            </router-link>
          </div>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Tổng danh mục</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ categories.length }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Thu nhập</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ categories.filter(c => c.type === 'income').length }}</p>
            </div>
            <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3.5 12.5h17L12 2zm0 3.5L16.5 11h-9L12 5.5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200/50 dark:border-red-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Chi tiêu</p>
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ categories.filter(c => c.type === 'expense').length }}</p>
            </div>
            <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200/50 dark:border-amber-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">Hoạt động</p>
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ totalActiveCategories }}</p>
            </div>
            <div class="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage Statistics Chart -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden mb-6">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              Thống kê mức sử dụng danh mục
            </h3>
            <!-- Tab Navigation -->
            <div class="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
              <button
                @click="chartTab = 'expense'"  
               :class="[
                {
                    'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm' : chartTab === 'expense'
                },
                'px-4 py-2 text-slate-800 dark:text-white rounded-md font-medium'
              ]">
                Chi tiêu
              </button>
              <button
                @click="chartTab = 'income'"  
               :class="[
                {
                    'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm' : chartTab === 'income'
                },
                'px-4 py-2 text-slate-800 dark:text-white rounded-md font-medium'
              ]">
                Thu nhập
              </button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <!-- Chart Container -->
          <div ref="barChartEl" class="w-full h-80"></div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              Danh sách danh mục
            </h3>
            <div class="flex items-center gap-4 flex-wrap">
              <!-- Status Filter -->
              <div class="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
                <button
                  @click="categoryStatusFilter = 'all'"
                  :class="[
                    {'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm': categoryStatusFilter === 'all'},
                    'px-3 py-1.5 text-xs md:text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 transition-all'
                  ]"
                >Tất cả</button>
                <button
                  @click="categoryStatusFilter = 'active'"
                  :class="[
                    {'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm': categoryStatusFilter === 'active'},
                    'px-3 py-1.5 text-xs md:text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 transition-all'
                  ]"
                >Hoạt động</button>
                <button
                  @click="categoryStatusFilter = 'inactive'"
                  :class="[
                    {'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-sm': categoryStatusFilter === 'inactive'},
                    'px-3 py-1.5 text-xs md:text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 transition-all'
                  ]"
                >Ngừng hoạt động</button>
              </div>
              <div class="text-sm text-slate-600 dark:text-slate-400">
                {{ displayedCategories.length }} danh mục
              </div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Ăn uống - Chi tiêu -->
            <div v-for="category in displayedCategories" 
            :class="[
              {
                'bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 border-pink-200/50 dark:border-pink-700/50' : category.type === 'expense',
                'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/50' : category.type === 'income',
              },
              'group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-red-200/50'
            ]">
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div :style="{backgroundColor: category.color}" :class="[
                      'w-12 h-12 rounded-xl flex items-center justify-center text-white',
                    ]">
                      <span v-html="icons[category.icon].icon"></span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-slate-800 dark:text-white text-lg">{{ category.name }}</h4>
                      <span :class="[
                        {
                          'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : category.type === 'expense',
                          'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : category.type === 'income',
                        },
                        'text-xs px-2 py-1 rounded-full font-medium'
                      ]">{{ category.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      @click="openEditModal(category)"
                      class="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" title="Chỉnh sửa">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="openDeleteModal(category)"
                      class="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" title="Xóa">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Giao dịch</span>
                    <span class="font-medium text-slate-700 dark:text-slate-300">{{ solveCategory(category._id).totalTransactions.length }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Hiện tại</span>
                    <span class="font-medium text-red-600 dark:text-red-400">{{ formatCurrency(solveCategory(category._id).totalAmount) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Chu kỳ</span>
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ formatDate(category.start_date) }} → {{ formatDate(category.end_date) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Trạng thái</span>
                    <span 
                    :class="[
                      {
                        'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : !solveCategory(category._id).isActive,
                        'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : solveCategory(category._id).isActive
                      },
                      'text-xs px-2 py-1 rounded-full font-medium'
                    ]">{{ solveCategory(category._id).isActive ? 'Hoạt động' : 'Ngừng hoạt động' }}</span>
                  </div>
                  <div class="space-y-1">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-600 dark:text-slate-400">Mức độ sử dụng</span>
                      <span class="text-slate-400">{{ solveCategory(category._id).percentage }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div v-if="category.type === 'income'" :class="[
                        {
                          'bg-red-400 to-red-600' : solveCategory(category._id).percentage < 50,
                          'bg-yellow-400 to-yellow-600' : solveCategory(category._id).percentage >= 50 && solveCategory(category._id).percentage < 75,
                          'bg-green-400 to-green-600' : solveCategory(category._id).percentage >= 75
                        },
                        'h-2 rounded-full transition-all duration-300 bg-gradient-to-r'
                      ]" :style="{ width: solveCategory(category._id).percentage + '%' }"></div>

                      <div v-else :class="[
                        {
                          'bg-green-400 to-green-600' : solveCategory(category._id).percentage < 50,
                          'bg-yellow-400 to-yellow-600' : solveCategory(category._id).percentage >= 50 && solveCategory(category._id).percentage < 75,
                          'bg-red-400 to-red-600' : solveCategory(category._id).percentage >= 75
                        },
                        'h-2 rounded-full transition-all duration-300 bg-gradient-to-r'
                      ]" :style="{ width: solveCategory(category._id).percentage + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="deleteModal.show" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="closeDeleteModal">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-700 transform transition-all duration-300">
        <!-- Modal Header -->
        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Xác nhận xóa danh mục</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">Hành động này không thể hoàn tác</p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- Category Info -->
            <div class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
              <div class="flex items-center space-x-3 mb-3">
                <div 
                  :style="{backgroundColor: deleteModal.category?.color}" 
                  class="w-10 h-10 rounded-lg flex items-center justify-center text-white">
                  <span v-html="icons[deleteModal.category?.icon]?.icon"></span>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-800 dark:text-white">{{ deleteModal.category?.name }}</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    {{ deleteModal.category?.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}
                  </p>
                </div>
              </div>
              <div class="text-sm text-slate-600 dark:text-slate-400">
                <p><span class="font-medium">Giao dịch:</span> {{ solveCategory(deleteModal.category?._id).totalTransactions.length }}</p>
                <p><span class="font-medium">Tổng tiền:</span> {{ formatCurrency(solveCategory(deleteModal.category?._id).totalAmount) }}</p>
              </div>
            </div>

            <!-- Warning Message -->
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-4">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div class="text-sm">
                  <p class="font-medium text-red-800 dark:text-red-200 mb-1">Cảnh báo quan trọng!</p>
                  <p class="text-red-700 dark:text-red-300">
                    Việc xóa danh mục sẽ ảnh hưởng đến tất cả giao dịch liên quan. 
                    Bạn có chắc chắn muốn tiếp tục?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
          <button 
            @click="closeDeleteModal"
            class="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors">
            Hủy
          </button>
          <button 
            @click="confirmDelete"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors">
            Xóa danh mục
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Category Modal -->
    <div 
      v-if="editModal.show" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="closeEditModal">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Chỉnh sửa danh mục</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400">Cập nhật thông tin danh mục</p>
              </div>
            </div>
            <button 
              @click="closeEditModal"
              class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Category Name -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Tên danh mục <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="editModal.form.name"
              type="text" 
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập tên danh mục">
          </div>

          <!-- Category Type -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Loại danh mục <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button"
                @click="editModal.form.type = 'expense'"
                :class="[
                  editModal.form.type === 'expense' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600',
                  'py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2'
                ]">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 13h4v7a1 1 0 001 1h12a1 1 0 001-1v-7h4L12 2z"/>
                </svg>
                <span>Chi tiêu</span>
              </button>
              <button 
                type="button"
                @click="editModal.form.type = 'income'"
                :class="[
                  editModal.form.type === 'income' 
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600',
                  'py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2'
                ]">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
                </svg>
                <span>Thu nhập</span>
              </button>
            </div>
          </div>

          <!-- Icon Selection -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Chọn biểu tượng
            </label>
            <div class="grid grid-cols-8 gap-2">
              <button 
                v-for="(icon, key) in icons" 
                :key="key"
                @click="editModal.form.icon = key"
                type="button"
                :class="[
                  editModal.form.icon === key 
                    ? 'ring-2 ring-blue-500 scale-110 bg-blue-50 dark:bg-blue-900/30' 
                    : 'hover:scale-105 hover:bg-slate-100 dark:hover:bg-slate-700',
                  'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border border-slate-200 dark:border-slate-600'
                ]">
                <span v-html="icon.icon" class="text-slate-600 dark:text-slate-400"></span>
              </button>
            </div>
          </div>

          <!-- Color Selection -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Chọn màu sắc
            </label>
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="color in availableColors"
                :key="color"
                @click="editModal.form.color = color"
                :style="`background-color: ${color}`"
                :class="[
                  editModal.form.color === color ? 'ring-2 ring-slate-400 scale-110' : 'hover:scale-105'
                ]"
                type="button" 
                class="w-8 h-8 rounded-full transition-all duration-200 relative">
                <div v-if="editModal.form.color === color" class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Mô tả
            </label>
            <textarea 
              v-model="editModal.form.description"
              rows="3" 
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Mô tả ngắn về danh mục..."></textarea>
          </div>

          <!-- Budget Limit -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Ngân sách giới hạn <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="editModal.form.limit_amount"
              type="number" 
              min="1"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0">
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3 sticky bottom-0 bg-white dark:bg-slate-800 rounded-b-2xl">
          <button 
            @click="closeEditModal"
            class="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors">
            Hủy
          </button>
          <button 
            @click="saveEdit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { getCategories, deleteCategory, editCategory } from '../composables/useCategoryAPI'
import { useToast } from '../composables/useToast'
import { getTransactions } from '../composables/useTransactionAPI'
import { icons } from '../composables/useIcons'
import ApexCharts from 'apexcharts'

const { initAuth } = useAuth()
const { push: pushToast } = useToast()


const categories = ref([])
const transactions = ref([])
const totalActiveCategories = ref(0)
// UI filter state for category list (all | active | inactive)
const categoryStatusFilter = ref('all')

// Chart tab state
const chartTab = ref('expense')

// Computed property for filtered categories based on chart tab
const filteredCategories = computed(() => {
  return categories.value.filter(category => category.type === chartTab.value)
})

// Modal states
const deleteModal = ref({
  show: false,
  category: null
})

const editModal = ref({
  show: false,
  category: null,
  form: {
    name: '',
    type: 'expense',
    icon: 'food',
    color: '#ef4444',
    description: '',
    limit_amount: 0
  }
})

// Available colors for selection
const availableColors = ref([
  'red', 'blue', 'green', 'orange', 'purple', 'pink', 'indigo', 'gray'
])

// Bar chart refs
const barChartEl = ref(null)
let barChart = null

// Initialize auth
onMounted(async () => {
  initAuth();
  await loadCategories();
  await loadTransactions();

  renderOrUpdateBarChart()
})

async function loadCategories() {
  try {
    const response = await getCategories()
    if (response.status === 'success') {
      categories.value = response.data.data
    } else {
      console.error('Failed to load categories:', response.message)
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

async function loadTransactions() {
  try {
    const response = await getTransactions()
    if (response.status === 'success') {
      transactions.value = response.data
    } else {
      console.error('Failed to load transactions:', response.message)
    }
  } catch (error) {
    console.error('Error loading transactions:', error)
  }
}

watch(categories, (newCategories) => {
  totalActiveCategories.value = newCategories.filter(c => {
    //kiểm tra ngày hết hạn có lớn hơn hiện tại không
    return new Date(c.end_date).getTime() > new Date().getTime() || !c.end_date
  }).length
})


// Date helpers
const getTxDate = (tx) => new Date(tx?.date || tx?.createdAt)
const isWithinCategoryPeriod = (tx, cat) => {
  if (!cat) return false
  const d = getTxDate(tx)
  if (isNaN(d)) return false
  const start = cat.start_date ? new Date(cat.start_date) : null
  const end = cat.end_date ? new Date(cat.end_date) : null
  const afterStart = start ? d >= start : true
  const beforeEnd = end ? d <= end : true
  return afterStart && beforeEnd
}

const solveCategory = (category_id) => {
  const cat = categories.value.find(c => c._id === category_id)
  const limitAmount = Number(cat?.limit_amount) || 0
  const totalTransactions = transactions.value.filter(t => t?.category_id?._id === category_id)
  const totalAmount = totalTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0)
  const rawPct = limitAmount > 0 ? (totalAmount / limitAmount) * 100 : 0
  const percentage = Number.isFinite(rawPct) ? rawPct : 0
  const endDate = cat?.end_date ? new Date(cat.end_date) : null
  const isActive = endDate ? endDate.getTime() > Date.now() : true
  
  return {
    totalTransactions,
    totalAmount,
    percentage: percentage.toFixed(2),
    isActive
  }
}

// Displayed categories according to status filter
const displayedCategories = computed(() => {
  if (!categories.value) return []
  if (categoryStatusFilter.value === 'all') return categories.value
  return categories.value.filter(c => {
    const analysis = solveCategory(c._id)
    return categoryStatusFilter.value === 'active' ? analysis.isActive : !analysis.isActive
  })
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

const formatDate = (value) => {
  if(!value) return '-'
  const d = new Date(value)
  if(isNaN(d)) return '-'
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// Modal functions
const openDeleteModal = (category) => {
  deleteModal.value = {
    show: true,
    category: category
  }
}

const closeDeleteModal = () => {
  deleteModal.value = {
    show: false,
    category: null
  }
}

const confirmDelete = async () => {
  try {
    const category_id = deleteModal.value.category._id
    const response = await deleteCategory(category_id)
    if (response.status === 'success') {
      await loadCategories() // Reload categories after deletion
      closeDeleteModal()
      pushToast('Xóa danh mục thành công', 'success')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    pushToast('Xóa danh mục thất bại', 'error')
  }
}

const openEditModal = (category) => {
  editModal.value = {
    show: true,
    category: category,
    form: {
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
      description: category.description || '',
      limit_amount: category.limit_amount
    }
  }
}

const closeEditModal = () => {
  editModal.value = {
    show: false,
    category: null,
    form: {
      name: '',
      type: 'expense',
      icon: 'food',
      color: '#ef4444',
      description: '',
      limit_amount: 0
    }
  }
}

const saveEdit = async () => {
  const { name, type, icon, color, description, limit_amount } = editModal.value.form
  const category_id = editModal.value.category._id
  const updatedCategory = {
    name,
    type,
    icon,
    color,
    description,
    limit_amount
  }
  console.log(updatedCategory);
  try {
    const response = await editCategory(category_id, updatedCategory)
    if (response.status === 'success') {
      await loadCategories() // Reload categories after edit
      closeEditModal()
      pushToast('Cập nhật danh mục thành công', 'success')
    } else {
      console.error('Failed to update category:', response.message)
      pushToast('Cập nhật danh mục thất bại', 'error')
    }
  } catch (error) {
    console.error('Error updating category:', error)
    pushToast('Cập nhật danh mục thất bại', 'error')
  }
}

// ===== ApexCharts: Bar chart (usage by category) =====
const buildBarChartData = () => {
  const cats = filteredCategories.value
  const labels = []
  const usedData = []

  cats.forEach((cat) => {
    if (!cat) return
    const used = transactions.value
      .filter((t) => t?.category_id?._id === cat._id)
      .reduce((s, t) => s + (Number(t.amount) || 0), 0)
    labels.push(cat.name)
    usedData.push(Math.max(0, Math.round(used)))
  })

  // Keep original order (no sort) to match UI; if needed, can sort later.
  return { labels, usedData }
}

const renderOrUpdateBarChart = () => {
  let { labels, usedData } = buildBarChartData()
  const dark = document.documentElement.classList.contains('dark')
  const usedColor = chartTab.value === 'income' ? '#22c55e' : '#ef4444'

  // Guard empty dataset to avoid ApexCharts internal forEach on undefined
  if (!labels || labels.length === 0) {
    labels = ['Không có dữ liệu']
  usedData = [0]
  }

  const options = {
    chart: {
      type: 'bar',
      height: Math.max(360, 60 + labels.length * 36),
      toolbar: { show: false },
      foreColor: dark ? '#cbd5e1' : '#475569',
    },
    series: [
      { name: chartTab.value === 'income' ? 'Đã thu' : 'Đã chi', data: usedData },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -6,
      style: { colors: [dark ? '#e2e8f0' : '#1f2937'], fontSize: '11px' },
      formatter: (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v),
    },
    xaxis: {
      categories: labels,
      labels: { rotate: -25 },
    },
    yaxis: {
      labels: { 
        show: true,
        formatter: (v) => new Intl.NumberFormat('vi-VN').format(Math.round(v))
      },
    },
    grid: { strokeDashArray: 4 },
    colors: [usedColor],
    tooltip: { y: { formatter: (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v) } },
    legend: { show: false },
  }

  if (barChart) {
  const { series, ...optsNoSeries } = options
  barChart.updateOptions(optsNoSeries, false, true)
  barChart.updateSeries(series, true)
  } else if (barChartEl.value) {
    barChart = new ApexCharts(barChartEl.value, options)
    barChart.render()
  }
}

watch([categories, transactions, chartTab], () => {
  renderOrUpdateBarChart()
})

onUnmounted(() => {
  if (barChart) {
    barChart.destroy()
    barChart = null
  }
})

</script>

<style lang="css" scoped>
/* Modern custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

/* Dark mode scrollbar */
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #64748b;
}
</style>