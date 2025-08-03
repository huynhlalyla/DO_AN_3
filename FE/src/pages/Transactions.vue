<template>
  <div class="relative">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm2 0h14v10H5V7z"/>
                <path d="M3 4a2 2 0 012-2h14a2 2 0 012 2v2H3V4z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Quản lý giao dịch</h1>
              <p class="text-slate-600 dark:text-slate-400">Xem và quản lý tất cả giao dịch của bạn</p>
            </div>
          </div>          <div class="flex gap-3">
            <router-link to="/Transactions/add" class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm giao dịch
            </router-link>
          </div>
        </div>
      </div>

      <!-- Filters & Stats Section -->
      <div class="grid lg:grid-cols-4 gap-6 mb-6">
        <!-- Filter Controls -->
        <div class="lg:col-span-3">
          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6">
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Bộ lọc
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Date Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Thời gian</label>
                <select v-model="dateFilter" class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tất cả</option>
                  <option value="today">Hôm nay</option>
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                  <option value="year">Năm này</option>
                </select>
              </div>
              
              <!-- Type Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Loại giao dịch</label>
                <select v-model="typeFilter" class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tất cả</option>
                  <option value="income">Thu nhập</option>
                  <option value="expense">Chi tiêu</option>
                </select>
              </div>
              
              <!-- Category Filter -->
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Danh mục</label>
                <select v-model="categoryFilter" class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tất cả danh mục</option>
                  <!-- Dữ liệu giả cho danh mục -->
                   <option v-for="category in categoriesData" :value="category._id">{{ category.name }}</option>
                </select>
              </div>
            </div>
            
            <!-- Search Bar -->
            <div class="mt-4">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tìm kiếm</label>
              <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm theo mô tả..." 
                       class="w-full px-4 py-2 pl-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="space-y-4">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3.5 12.5h17L12 2zm0 3.5L16.5 11h-9L12 5.5z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-green-700 dark:text-green-300">Tổng thu</p>
                <p class="text-lg font-bold text-green-600 dark:text-green-400">
                  {{ formatAmount(totalIncome) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200/50 dark:border-red-700/50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-red-700 dark:text-red-300">Tổng chi</p>
                <p class="text-lg font-bold text-red-600 dark:text-red-400">
                  {{ formatAmount(totalExpense) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-blue-700 dark:text-blue-300">Giao dịch</p>
                <p class="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {{ transactionsData.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
              </svg>
              Danh sách giao dịch
            </h3>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ `Hiển thị ${transactionsData.length} giao dịch` }}
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto max-h-96 custom-scrollbar">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50/80 dark:bg-slate-900/50 sticky top-0">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold">Ngày</th>
                <th scope="col" class="px-6 py-4 font-semibold">Mô tả</th>
                <th scope="col" class="px-6 py-4 font-semibold">Loại</th>
                <th scope="col" class="px-6 py-4 font-semibold">Danh mục</th>
                <th scope="col" class="px-6 py-4 font-semibold">Số tiền</th>
                <th scope="col" class="px-6 py-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>            
            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
              <!-- Dữ liệu giả cho danh sách giao dịch -->
              <tr v-for="transaction in transactionsData" class="bg-white/50 dark:bg-transparent hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-all duration-200">
                <td class="px-6 py-4 text-slate-900 dark:text-slate-200 font-medium">{{ formatDate(transaction.date) }}</td>
                <th scope="row" class="px-6 py-4 font-medium text-slate-900 dark:text-white">{{ transaction.note || 'Không có mô tả' }}</th>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    <div class="bg-green-500 w-2 h-2 rounded-full mr-2"></div>
                    {{ transaction.category_id.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {{ transaction.category_id.name }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    {
                      'text-green-600 dark:text-green-400': transaction.category_id.type === 'income',
                      'text-red-600 dark:text-red-400': transaction.category_id.type === 'expense'
                    },
                    'font-bold text-lg'
                  ]">
                    {{ `${transaction.category_id.type === 'income' ? '+' : '-'}${formatAmount(transaction.amount)}` }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>              
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <!-- <div class="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Hiển thị 1 - 5 trong tổng số 12 giao dịch
            </div>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                Trước
              </button>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-medium">
                1
              </span>
              <button class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                Sau
              </button>
            </div>
          </div>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { getTransactions } from '../composables/useTransactionAPI'
import { getCategories } from '../composables/useCategoryAPI'
const { user, initAuth } = useAuth()
const transactionsData = ref([])
const categoriesData = ref([])

const dateFilter = ref('all')
const typeFilter = ref('all')
const categoryFilter = ref('all')
const searchQuery = ref('')


const totalIncome = ref(0)
const totalExpense = ref(0)
// const currentData = ref([])
// Initialize auth and load data
onMounted(async () => {
  initAuth()
  await loadTransactions();
  await loadCategories();
})

// Load transactions from API
const loadTransactions = async () => {
  try {
    const response = await getTransactions();
    if (response.status === 'success') {
      transactionsData.value = response.data.data.transactions;
      console.log(transactionsData.value);
    } else {
      transactionsData.value = []
    }
  } catch (err) {
    console.error('Failed to load transactions:', err)
    transactionsData.value = []
  }
}

const loadCategories = async () => {
  try {
    const response = await getCategories();
    if (response.status === 'success') {
      categoriesData.value = response.data.data;
    } else {
      console.error('Failed to load categories:', response.message)
    }
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

watch(transactionsData, (newData) => {
  totalIncome.value = newData.filter(t => t.category_id.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  totalExpense.value = newData.filter(t => t.category_id.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
})

// Format currency for display
const formatAmount = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' ₫'
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
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