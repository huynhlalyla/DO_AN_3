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
                  <option v-for="category in uniqueCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
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
                  +{{ filteredStats.totalIncome.toLocaleString('vi-VN') }}₫
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
                  -{{ filteredStats.totalExpense.toLocaleString('vi-VN') }}₫
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
                  {{ filteredTransactions.length }}
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
              Hiển thị {{ filteredTransactions.length }} / {{ transactionsData.length }} giao dịch
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
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  <div class="flex flex-col items-center gap-2">
                    <svg class="w-12 h-12 text-slate-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-lg font-medium">Không có giao dịch nào</p>
                    <p class="text-sm">Thử thay đổi bộ lọc hoặc thêm giao dịch mới</p>
                  </div>
                </td>
              </tr>
              <tr v-for="item in paginatedTransactions" :key="item.transaction?._id"  
                  class="bg-white/50 dark:bg-transparent hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-all duration-200">
                <td class="px-6 py-4 text-slate-900 dark:text-slate-200 font-medium">
                  {{ formatTransactionDate(item.transaction?.date) }}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {{ item.transaction?.note || 'Không có mô tả' }}
                </th>
                <td class="px-6 py-4">
                  <span :class="{
                    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': item.transaction.category_id?.type === 'expense',
                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300': item.transaction.category_id?.type === 'income'
                  }" 
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                    <div :class="{
                      'bg-red-500': item.transaction.category_id?.type === 'expense',
                      'bg-green-500': item.transaction.category_id?.type === 'income'
                    }" class="w-2 h-2 rounded-full mr-2"></div>
                    <!-- {{ item.transaction.category_id?.type === 'expense' ? 'Chi tiêu' : 'Thu nhập' }} -->
                      {{ item.transaction }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {{ item.transaction.category_id?.name || 'Không xác định' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span :class="{
                    'text-red-600 dark:text-red-400': item.transaction.category_id?.type === 'expense',
                    'text-green-600 dark:text-green-400': item.transaction.category_id?.type === 'income'
                  }" 
                  class="font-bold text-lg">
                    {{ item.transaction.category_id?.type === 'expense' ? '-' : '+' }}{{ formatAmount(item.transaction?.amount) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="editTransaction(item.transaction?._id)"
                      class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="handleDeleteTransaction(item.transaction?._id)"
                      class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50">
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
        <div v-if="filteredTransactions.length > itemsPerPage" class="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Hiển thị {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredTransactions.length) }} 
              trong tổng số {{ filteredTransactions.length }} giao dịch
            </div>
            <div class="flex items-center gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1"
                      class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                Trước
              </button>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-medium">
                {{ currentPage }}
              </span>
              <button @click="currentPage++" :disabled="currentPage === totalPages"
                      class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Success/Error Message -->
      <div v-if="message" :class="{
        'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300': messageType === 'success',
        'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300': messageType === 'error'
      }" class="rounded-lg border p-4 mb-6">
        <div class="flex items-center">
          <svg v-if="messageType === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          {{ message }}
          <button @click="message = ''" class="ml-auto text-sm hover:opacity-70">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionAPI } from '../composables/useTransactionAPI'
import { useCategoryAPI } from '../composables/useCategoryAPI'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { getTransactions, deleteTransaction, loading } = useTransactionAPI()
const { getCategories } = useCategoryAPI()
const { user, initAuth } = useAuth()

// Reactive data
const transactionsData = ref([])
const categoriesData = ref([])
const dateFilter = ref('all')
const typeFilter = ref('all')
const categoryFilter = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Message state
const message = ref('')
const messageType = ref('success')

// Initialize auth and load data
onMounted(async () => {
  initAuth()
  await loadTransactions()
  await loadCategories()
})

// Load transactions from API
const loadTransactions = async () => {
  try {
    const result = await getTransactions()
    if (result.status === 'success') {
      // Transform API response to match frontend format
      transactionsData.value = result.data.transactions.map(transaction => ({
        transaction: {
          _id: transaction._id,
          amount: transaction.amount,
          type: getCategoryType(transaction.category_id?._id),
          note: transaction.note || '',
          date: transaction.date
        },
        category: {
          _id: transaction.category_id?._id,
          name: transaction.category_id?.name || 'Không xác định'
        }
      }))
      
      console.log('Transactions loaded successfully:', transactionsData.value.length)
    } else {
      console.warn('No transactions found or invalid response')
      transactionsData.value = []
    }
  } catch (err) {
    console.error('Failed to load transactions:', err)
    transactionsData.value = []
  }
}

// Load categories to determine transaction type
const loadCategories = async () => {
  try {
    const result = await getCategories()
    if (result.status === 'success') {
      categoriesData.value = result.data.categories
    }
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

// Get category type from category ID
const getCategoryType = (categoryId) => {
  const category = categoriesData.value.find(cat => cat._id === categoryId)
  return category?.type || 'expense'
}

// Delete transaction (real API)
const handleDeleteTransaction = async (transactionId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) return

  try {
    const result = await deleteTransaction(transactionId)
    if (result.status === 'success') {
      message.value = result.message || 'Xóa giao dịch thành công!'
      messageType.value = 'success'
      
      // Reload transactions after deletion
      await loadTransactions()
      
      // Auto hide message after 3 seconds
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }
  } catch (err) {
    console.error('Failed to delete transaction:', err)
    message.value = 'Có lỗi xảy ra khi xóa giao dịch'
    messageType.value = 'error'
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

// Navigate to edit transaction
const editTransaction = (transactionId) => {
  router.push(`/transactions/edit/${transactionId}`)
}

// Navigate to add transaction
const addTransaction = () => {
  router.push('/add-transaction')
}

// Computed properties
const uniqueCategories = computed(() => {
  const categories = transactionsData.value
    .map(item => item.category?.name)
    .filter(Boolean)
  return [...new Set(categories)].sort()
})

const filteredTransactions = computed(() => {
  let filtered = transactionsData.value

  // Date filter
  if (dateFilter.value !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(item => {
      const transactionDate = new Date(item.transaction?.date)
      
      switch (dateFilter.value) {
        case 'today':
          return transactionDate >= today
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          return transactionDate >= weekAgo
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
          return transactionDate >= monthAgo
        case 'year':
          const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
          return transactionDate >= yearAgo
        default:
          return true
      }
    })
  }

  // Type filter
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(item => item.transaction?.type === typeFilter.value)
  }

  // Category filter
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(item => item.category?.name === categoryFilter.value)
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(item => 
      item.transaction?.note?.toLowerCase().includes(query) ||
      item.category?.name?.toLowerCase().includes(query)
    )
  }

  // Sort by date (newest first)
  return filtered.sort((a, b) => 
    new Date(b.transaction?.date) - new Date(a.transaction?.date)
  )
})

const filteredStats = computed(() => {
  const transactions = filteredTransactions.value
  return {
    totalIncome: transactions
      .filter(item => item.transaction?.type === 'income')
      .reduce((sum, item) => sum + (item.transaction?.amount || 0), 0),
    totalExpense: transactions
      .filter(item => item.transaction?.type === 'expense')
      .reduce((sum, item) => sum + (item.transaction?.amount || 0), 0),
  }
})

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage.value)
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTransactions.value.slice(start, end)
})

// Watch for filter changes to reset pagination
watch([dateFilter, typeFilter, categoryFilter, searchQuery], () => {
  currentPage.value = 1
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
const formatTransactionDate = (dateString) => {
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