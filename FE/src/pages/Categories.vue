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
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm danh mục
            </button>
          </div>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Tổng danh mục</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalCategories }}</p>
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
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ incomeCategories.length }}</p>
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
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ expenseCategories.length }}</p>
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
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ activeCategories.length }}</p>
            </div>
            <div class="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid lg:grid-cols-2 gap-6 mb-6">        <!-- Line Chart - Income vs Expense Ratio -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-6H7v6zm4 0h2V7h-2v10zm4 0h2v-8h-2v8z"/>
              </svg>
              Tỷ lệ Thu nhập vs Chi tiêu theo tháng
            </h3>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-xs text-slate-600 dark:text-slate-400">Thu nhập</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="text-xs text-slate-600 dark:text-slate-400">Chi tiêu</span>
              </div>
            </div>
          </div>
          <div id="line-chart" class="h-80"></div>
        </div>

        <!-- Bar Chart - Category Distribution -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6">
          <div class="flex items-center justify-between mb-6">            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-6H7v6zm4 0h2V7h-2v10zm4 0h2v-8h-2v8z"/>
              </svg>
              Phân bố số tiền theo danh mục
            </h3>
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <span>Đa dạng màu sắc</span>
              </div>
            </div>
          </div>
          <div id="bar-chart" class="h-80"></div>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Loại danh mục</label>
            <select v-model="typeFilter" class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="all">Tất cả</option>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Trạng thái</label>
            <select v-model="statusFilter" class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tìm kiếm</label>
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Tìm kiếm danh mục..." 
                     class="w-full px-4 py-2 pl-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              Danh sách danh mục
            </h3>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ filteredCategories.length }} danh mục
            </div>
          </div>
        </div>

        <div class="p-6">
          <div v-if="filteredCategories.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            <p class="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">Không có danh mục nào</p>
            <p class="text-sm text-slate-400 dark:text-slate-500">Thử thay đổi bộ lọc hoặc thêm danh mục mới</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="category in filteredCategories" :key="category.id" 
                 class="group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer"
                 :class="{
                   'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/50 hover:shadow-lg hover:shadow-green-200/50': category.type === 'income',
                   'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200/50 dark:border-red-700/50 hover:shadow-lg hover:shadow-red-200/50': category.type === 'expense'
                 }">
              
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                         :class="{
                           'bg-green-500/20': category.type === 'income',
                           'bg-red-500/20': category.type === 'expense'
                         }">
                      <svg class="w-6 h-6" :class="{
                             'text-green-600 dark:text-green-400': category.type === 'income',
                             'text-red-600 dark:text-red-400': category.type === 'expense'
                           }" fill="currentColor" viewBox="0 0 24 24">
                        <path v-if="category.type === 'income'" d="M12 2L3.5 12.5h17L12 2zm0 3.5L16.5 11h-9L12 5.5z"/>
                        <path v-else d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-slate-800 dark:text-white text-lg">{{ category.name }}</h4>
                      <span class="text-xs px-2 py-1 rounded-full font-medium"
                            :class="{
                              'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300': category.type === 'income',
                              'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300': category.type === 'expense'
                            }">
                        {{ category.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <button class="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" 
                            title="Chỉnh sửa">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button class="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" 
                            title="Xóa">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Giao dịch</span>
                    <span class="font-semibold text-slate-800 dark:text-white">{{ category.transactionCount }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Tổng tiền</span>
                    <span class="font-bold" :class="{
                      'text-green-600 dark:text-green-400': category.type === 'income',
                      'text-red-600 dark:text-red-400': category.type === 'expense'
                    }">
                      {{ category.type === 'expense' ? '-' : '+' }}{{ category.totalAmount.toLocaleString('vi-VN') }}₫
                    </span>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600 dark:text-slate-400">Trạng thái</span>
                    <span class="text-xs px-2 py-1 rounded-full font-medium"
                          :class="{
                            'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300': category.isActive,
                            'bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300': !category.isActive
                          }">
                      {{ category.isActive ? 'Hoạt động' : 'Không hoạt động' }}
                    </span>
                  </div>

                  <!-- Progress bar for category usage -->
                  <div class="space-y-1">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-600 dark:text-slate-400">Mức độ sử dụng</span>
                      <span class="font-medium text-slate-700 dark:text-slate-300">{{ category.usagePercentage }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div class="h-2 rounded-full transition-all duration-300" 
                           :class="{
                             'bg-gradient-to-r from-green-500 to-emerald-500': category.type === 'income',
                             'bg-gradient-to-r from-red-500 to-pink-500': category.type === 'expense'
                           }"
                           :style="{ width: category.usagePercentage + '%' }"></div>
                    </div>
                  </div>
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
import { ref, computed, onMounted } from 'vue';
import ApexCharts from 'apexcharts';

// Reactive data
const categoriesData = ref([]);
const typeFilter = ref('all');
const statusFilter = ref('all');
const searchQuery = ref('');

// Sample data - Mock categories
onMounted(() => {
  // Enhanced mock categories data
  categoriesData.value = [
    { id: 1, name: 'Lương', type: 'income', transactionCount: 12, totalAmount: 60000000, isActive: true, color: '#10B981', icon: '💰', description: 'Lương hàng tháng' },
    { id: 2, name: 'Tiền thưởng', type: 'income', transactionCount: 8, totalAmount: 12000000, isActive: true, color: '#F59E0B', icon: '🎁', description: 'Tiền thưởng và bonus' },
    { id: 3, name: 'Freelance', type: 'income', transactionCount: 15, totalAmount: 18000000, isActive: true, color: '#3B82F6', icon: '💼', description: 'Thu nhập từ freelance' },
    { id: 4, name: 'Đầu tư', type: 'income', transactionCount: 5, totalAmount: 8000000, isActive: false, color: '#8B5CF6', icon: '📈', description: 'Lợi nhuận từ đầu tư' },
    { id: 5, name: 'Ăn uống', type: 'expense', transactionCount: 45, totalAmount: 15000000, isActive: true, color: '#EF4444', icon: '🍽️', description: 'Chi phí ăn uống hàng ngày' },
    { id: 6, name: 'Mua sắm', type: 'expense', transactionCount: 32, totalAmount: 12000000, isActive: true, color: '#EC4899', icon: '🛍️', description: 'Mua sắm cá nhân' },
    { id: 7, name: 'Di chuyển', type: 'expense', transactionCount: 28, totalAmount: 3500000, isActive: true, color: '#F97316', icon: '🚗', description: 'Chi phí giao thông' },
    { id: 8, name: 'Giải trí', type: 'expense', transactionCount: 20, totalAmount: 8000000, isActive: true, color: '#8B5CF6', icon: '🎬', description: 'Vui chơi giải trí' },
    { id: 9, name: 'Y tế', type: 'expense', transactionCount: 12, totalAmount: 5000000, isActive: true, color: '#06B6D4', icon: '🏥', description: 'Chi phí y tế' },
    { id: 10, name: 'Giáo dục', type: 'expense', transactionCount: 8, totalAmount: 6000000, isActive: false, color: '#10B981', icon: '📚', description: 'Học tập và đào tạo' },
    { id: 11, name: 'Tiết kiệm', type: 'expense', transactionCount: 24, totalAmount: 20000000, isActive: true, color: '#84CC16', icon: '💰', description: 'Tiết kiệm và đầu tư' },
    { id: 12, name: 'Khác', type: 'expense', transactionCount: 10, totalAmount: 2000000, isActive: false, color: '#6B7280', icon: '📝', description: 'Chi phí khác' },
  ];

  // Calculate usage percentage for each category
  const maxTransactions = Math.max(...categoriesData.value.map(c => c.transactionCount));
  categoriesData.value.forEach(category => {
    category.usagePercentage = Math.round((category.transactionCount / maxTransactions) * 100);
  });

  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeCharts();
  }, 100);
});

// Computed properties
const totalCategories = computed(() => categoriesData.value.length);

const incomeCategories = computed(() => 
  categoriesData.value.filter(c => c.type === 'income')
);

const expenseCategories = computed(() => 
  categoriesData.value.filter(c => c.type === 'expense')
);

const activeCategories = computed(() => 
  categoriesData.value.filter(c => c.isActive)
);

const filteredCategories = computed(() => {
  let filtered = categoriesData.value;

  // Type filter
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(category => category.type === typeFilter.value);
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active';
    filtered = filtered.filter(category => category.isActive === isActive);
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(category => 
      category.name.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => b.transactionCount - a.transactionCount);
});

// Chart initialization
const initializeCharts = () => {
  // Check if DOM elements exist before initializing
  const lineChartElement = document.getElementById("line-chart");
  const barChartElement = document.getElementById("bar-chart");
  
  if (lineChartElement) {
    initLineChart();
  } else {
    console.warn('Line chart element not found');
  }
  
  if (barChartElement) {
    initBarChart();
  } else {
    console.warn('Bar chart element not found');
  }
};

const initLineChart = () => {
  const lineChartOptions = {
    series: [
      {
        name: 'Thu nhập',
        data: [45, 52, 48, 55, 58, 62],
        color: '#10B981'
      },
      {
        name: 'Chi tiêu',
        data: [35, 42, 38, 45, 48, 52],
        color: '#EF4444'
      }
    ],
    chart: {
      height: 320,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    colors: ['#10B981', '#EF4444'],
    stroke: {
      width: 4,
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        },
        formatter: function (val) {
          return val + 'M';
        }
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: '#64748B'
      }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 5
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' triệu VND';
        }
      }
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      strokeColors: ['#10B981', '#EF4444'],
      fillColors: ['#10B981', '#EF4444']
    }
  };

  try {
    const lineChart = new ApexCharts(document.getElementById("line-chart"), lineChartOptions);
    lineChart.render();
    console.log('Line chart rendered successfully');
  } catch (error) {
    console.error('Error rendering line chart:', error);
  }
};

const initBarChart = () => {
  // Tạo mảng màu đa dạng cho từng danh mục
  const categoryColors = [
    '#6366F1', // Indigo
    '#8B5CF6', // Violet  
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#F97316', // Orange
    '#84CC16', // Lime
    '#06B6D4', // Cyan
    '#8B5A2B', // Brown
    '#6B7280', // Gray
    '#F472B6', // Additional pink
    '#FBBF24', // Additional amber
    '#34D399', // Additional emerald
    '#60A5FA'  // Additional blue
  ];

  // Gradient colors tương ứng với các màu chính
  const gradientColors = [
    '#818CF8', // Lighter indigo
    '#A78BFA', // Lighter violet
    '#F472B6', // Lighter pink
    '#FBBF24', // Lighter amber
    '#F87171', // Lighter red
    '#34D399', // Lighter emerald
    '#60A5FA', // Lighter blue
    '#FB923C', // Lighter orange
    '#A3E635', // Lighter lime
    '#22D3EE', // Lighter cyan
    '#A3845A', // Lighter brown
    '#9CA3AF', // Lighter gray
    '#F9A8D4', // Additional lighter pink
    '#FCD34D', // Additional lighter amber
    '#6EE7B7', // Additional lighter emerald
    '#93C5FD'  // Additional lighter blue
  ];

  const barChartOptions = {
    series: [
      {
        name: 'Tổng tiền giao dịch',
        data: [25, 12, 3.5, 8, 5, 6, 20, 15, 9, 4, 7, 11]
      }
    ],
    chart: {
      type: 'bar',
      height: 320,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        borderRadius: 8,
        dataLabels: {
          position: 'top'
        },
        distributed: true // Cho phép mỗi cột có màu khác nhau
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px',
        colors: ['#374151']
      },
      offsetY: -20,
      formatter: function (val) {
        return val + 'M';
      }
    },
    xaxis: {
      categories: ['Lương', 'Ăn uống', 'Mua sắm', 'Di chuyển', 'Giải trí', 'Y tế', 'Giáo dục', 'Tiết kiệm', 'Thể thao', 'Làm đẹp', 'Gia đình', 'Khác'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif'
        },
        rotate: -45,
        maxHeight: 120
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        },
        formatter: function (val) {
          return val + 'M';
        }
      }
    },
    colors: categoryColors,
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: gradientColors,
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.6,
        stops: [0, 100]
      }
    },
    legend: {
      show: false // Ẩn legend vì mỗi cột đã có màu riêng
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 3,
      yaxis: {
        lines: {
          show: true
        }
      },
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      y: {
        formatter: function (val) {
          return val + ' triệu VND';
        }
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    }
  };

  try {
    const barChart = new ApexCharts(document.getElementById("bar-chart"), barChartOptions);
    barChart.render();
    console.log('Bar chart rendered successfully');
  } catch (error) {
    console.error('Error rendering bar chart:', error);
  }
};
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