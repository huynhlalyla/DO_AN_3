<template>
  <div class="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: url('/imgs/bg-transaction.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Quản lý ngân sách</h1>
              <p class="text-slate-600 dark:text-slate-400">Theo dõi và kiểm soát chi tiêu theo danh mục</p>
            </div>
          </div>
          <div class="flex gap-3">
            <router-link to="/categories" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              Quản lý danh mục
            </router-link>
          </div>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <!-- Total Budget -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">{{ activeTab === 'income' ? 'Mục tiêu thu nhập' : 'Tổng ngân sách' }}</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(total) }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Used Budget -->
        <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-orange-700 dark:text-orange-300 mb-1">{{ activeTab === 'income' ? 'Đã đạt được' : 'Đã sử dụng' }}</p>
              <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ formatCurrency(used) }}</p>
            </div>
            <div class="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Remaining Budget -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-700 dark:text-green-300 mb-1">{{ progress > 100 ? 'vượt chỉ tiêu' : 'Còn lại' }}</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency(remaining) }}</p>
            </div>
            <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Budget Progress -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Tiến độ</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ progress }}%</p>
            </div>
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Budget Tabs -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden mb-6">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z"/>
              </svg>
              Ngân sách theo danh mục
            </h3>
            <!-- Tab Navigation -->
            <div class="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
              <button
                @click="activeTab = 'expense'"  
               :class="[
                {
                    'bg-white shadow-sm' : activeTab === 'expense'
                },
                'px-4 py-2 dark:bg-slate-600 text-slate-800 dark:text-white rounded-md font-medium'
              ]">
                Chi tiêu
              </button>
              <button
                @click="activeTab = 'income'"  
               :class="[
                {
                    'bg-white shadow-sm' : activeTab === 'income'
                },
                'px-4 py-2 dark:bg-slate-600 text-slate-800 dark:text-white rounded-md font-medium'
              ]">
                Thu nhập
              </button>
            </div>
          </div>
        </div>

        <!-- Expense Budgets -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Food Budget -->
            <div v-for="category in categories.filter(tx => tx.type === activeTab)" :key="category._id" class="bg-gradient-to-br from-slate-50 to-slate-50 dark:from-slate-900/20 dark:to-slate-900/20 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div :style="{backgroundColor: category.color}" class="w-12 h-12 rounded-xl flex items-center justify-center text-white">
                    <span v-html="icons[category.icon].icon"></span>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800 dark:text-white">{{ category.name }}</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ category.type === 'income' ? 'Thu nhập' : 'Chi tiêu' }}</p>
                  </div>
                </div>
                <div v-if="category.type === 'expense'">
                  <span class="text-xs bg-green-400 text-green-800 p-1 rounded-full" v-if="solveCategory(category).percentage < 50">An toàn</span>
                  <span class="text-xs bg-orange-400 text-orange-800 p-1 rounded-full" v-else-if="solveCategory(category).percentage >= 50">Cảnh báo</span>
                  <span class="text-xs bg-red-400 text-red-800 p-1 rounded-full" v-else>Vượt ngân sách</span>
                </div>
                <div v-else>
                  <span class="text-xs bg-green-400 text-green-800 p-1 rounded-full" v-if="solveCategory(category).percentage > 100">Tốt hơn dự kiến</span>
                  <span class="text-xs bg-orange-400 text-orange-800 p-1 rounded-full" v-else-if="solveCategory(category).percentage >= 50">Thuận lợi</span>
                  <span class="text-xs bg-red-400 text-red-800 p-1 rounded-full" v-else>Thu nhập thấp</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">Ngân sách</span>
                  <span class="font-bold text-slate-800 dark:text-white">{{ formatCurrency(category.limit_amount) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">{{ category.type === 'income' ? 'Đã thu' : 'Đã chi' }}</span>
                  <span class="font-bold text-red-600 dark:text-red-400">{{ formatCurrency(solveCategory(category).totalAmount) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">{{ solveCategory(category).percentage <= 100 ? 'Còn lại' : 'Vượt mức' }}</span>
                  <span class="font-bold text-green-600 dark:text-green-400">{{ formatCurrency(solveCategory(category).remaining) }}</span>
                </div>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-600 dark:text-slate-400">Tiến độ sử dụng</span>
                    <span class="text-yellow-600 dark:text-yellow-400 font-medium">{{ solveCategory(category).percentage }}%</span>
                  </div>
                  <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <!-- Progress bar cho Chi tiêu -->
                  <div v-if="category.type === 'expense'" :class="[
                      {
                        'bg-gradient-to-br from-red-600 to-red-700' : solveCategory(category).percentage > 100,
                        'bg-gradient-to-br from-orange-500 to-red-500' : solveCategory(category).percentage >= 75 && solveCategory(category).percentage <= 100,
                        'bg-gradient-to-br from-yellow-500 to-orange-500' : solveCategory(category).percentage >= 50 && solveCategory(category).percentage < 75,
                        'bg-gradient-to-br from-green-500 to-green-600' : solveCategory(category).percentage < 50,
                      },
                      'h-3 rounded-full transition-all duration-300'
                  ]" :style="{width: Math.min(solveCategory(category).percentage, 100) + '%' }"></div>
                  
                  <!-- Progress bar cho Thu nhập -->
                  <div v-else :class="[
                      {
                        'bg-gradient-to-br from-green-600 to-emerald-600' : solveCategory(category).percentage >= 100,
                        'bg-gradient-to-br from-green-400 to-green-500' : solveCategory(category).percentage >= 75 && solveCategory(category).percentage < 100,
                        'bg-gradient-to-br from-yellow-500 to-orange-500' : solveCategory(category).percentage >= 50 && solveCategory(category).percentage < 75,
                        'bg-gradient-to-br from-red-500 to-red-600' : solveCategory(category).percentage < 50,
                      },
                      'h-3 rounded-full transition-all duration-300'
                  ]" :style="{width: solveCategory(category).percentage + '%' }"></div>
                </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Monthly Budget Progress Chart (Optional) -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Tổng quan ngân sách tháng này
          </h3>
        </div>

        <div class="p-6">
          <!-- First Row: Budget Summary and Alerts -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Budget vs Spending Chart -->
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-800 dark:text-white">Ngân sách vs Chi tiêu thực tế</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Tổng ngân sách</span>
                  <span class="font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(total) }}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Đã chi tiêu</span>
                  <span class="font-bold text-red-600 dark:text-red-400">{{ formatCurrency(used) }}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Còn lại</span>
                  <span class="font-bold text-green-600 dark:text-green-400">{{ formatCurrency(remaining) }}</span>
                </div>
              </div>
            </div>

            <!-- Budget Alerts -->
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-800 dark:text-white">Cảnh báo ngân sách</h4>
              <div class="space-y-3">
                <div v-for="alert in budgetAlerts" :key="alert.id" class="flex items-center gap-3 p-3 rounded-lg" :class="{
                  'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50': alert.type === 'danger',
                  'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50': alert.type === 'warning',
                  'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50': alert.type === 'success'
                }">
                  <div class="w-2 h-2 rounded-full" :class="{
                    'bg-red-500': alert.type === 'danger',
                    'bg-yellow-500': alert.type === 'warning',
                    'bg-green-500': alert.type === 'success'
                  }"></div>
                  <span class="text-sm" :class="{
                    'text-red-700 dark:text-red-300': alert.type === 'danger',
                    'text-yellow-700 dark:text-yellow-300': alert.type === 'warning',
                    'text-green-700 dark:text-green-300': alert.type === 'success'
                  }">{{ alert.message }}</span>
                </div>
              </div>
              
              <!-- Quick Stats -->
              <div class="mt-6 space-y-3">
                <h5 class="font-medium text-slate-800 dark:text-white text-sm">Thống kê nhanh</h5>
                <div class="grid grid-cols-1 gap-2">
                  <div class="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span class="text-xs text-blue-600 dark:text-blue-400">Danh mục hoạt động</span>
                    <span class="font-bold text-blue-700 dark:text-blue-300">{{ activeCategories }}</span>
                  </div>
                  <div class="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span class="text-xs text-purple-600 dark:text-purple-400">Tiết kiệm tháng này</span>
                    <span class="font-bold text-purple-700 dark:text-purple-300">{{ formatCurrency(monthlySavings) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Second Row: Full Width Chart -->
          <div class="space-y-4">
            <!-- Income vs Expense Pie Chart -->
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-800 dark:text-white">Biểu đồ Thu nhập vs Chi tiêu (Tháng hiện tại)</h4>
              <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                <!-- Chart Container -->
                <div ref="lineChartEl" class="w-full h-72"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '../composables/useCategoryAPI'
import { getTransactions } from '../composables/useTransactionAPI'
import { icons } from '../composables/useIcons'
import ApexCharts from 'apexcharts'

const categories = ref([])
const transactions = ref([])
const showTooltip = ref(null)

// Line chart refs
const lineChartEl = ref(null)
let lineChart = null

const incomeCategories = computed(() => categories.value.filter(category => category.type === 'income'))
const expenseCategories = computed(() => categories.value.filter(category => category.type === 'expense'))

const total = ref(0);
const used = ref(0);
const remaining = ref(0);
const progress = ref(0);
// Tab state
const activeTab = ref('expense')

// Chart data and computed values
const incomeAverage = computed(() => {
  const totalIncomeTransactions = transactions.value.filter(tx => 
    tx.category_id && tx.category_id.type === 'income'
  )
  return totalIncomeTransactions.length > 0 ? 
    totalIncomeTransactions.reduce((sum, tx) => sum + tx.amount, 0) / totalIncomeTransactions.length : 0
})

const expenseAverage = computed(() => {
  const totalExpenseTransactions = transactions.value.filter(tx => 
    tx.category_id && tx.category_id.type === 'expense'
  )
  return totalExpenseTransactions.length > 0 ? 
    totalExpenseTransactions.reduce((sum, tx) => sum + tx.amount, 0) / totalExpenseTransactions.length : 0
})

// Tính toán dữ liệu cho biểu đồ tròn
const pieChartData = computed(() => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  // Lấy giao dịch tháng hiện tại
  const currentMonthTransactions = transactions.value.filter(tx => {
    const txDate = new Date(tx?.date || tx?.createdAt)
    return txDate.getMonth() === currentMonth && 
           txDate.getFullYear() === currentYear
  })
  
  const totalIncome = currentMonthTransactions
    .filter(tx => tx.category_id && tx.category_id.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
    
  const totalExpense = currentMonthTransactions
    .filter(tx => tx.category_id && tx.category_id.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
  
  const total = totalIncome + totalExpense
  
  if (total === 0) {
    return {
      income: { value: 0, percentage: 0, angle: 0 },
      expense: { value: 0, percentage: 0, angle: 0 },
      total: 0
    }
  }
  
  const incomePercentage = (totalIncome / total) * 100
  const expensePercentage = (totalExpense / total) * 100
  
  // Tính góc cho SVG (360 độ = 2π radians)
  const incomeAngle = (totalIncome / total) * 360
  const expenseAngle = (totalExpense / total) * 360
  
  return {
    income: { 
      value: totalIncome, 
      percentage: incomePercentage.toFixed(1), 
      angle: incomeAngle 
    },
    expense: { 
      value: totalExpense, 
      percentage: expensePercentage.toFixed(1), 
      angle: expenseAngle 
    },
    total: total
  }
})

// Tạo path cho SVG pie chart
const createPieSlice = (startAngle, endAngle, radius = 80, centerX = 100, centerY = 100) => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  
  return [
    "M", centerX, centerY,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ")
}

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

const budgetAlerts = computed(() => {
  const alerts = []
  
  categories.value.forEach(category => {
    const categoryData = solveCategory(category)
    if (category.type === 'expense') {
      if (categoryData.percentage > 100) {
        alerts.push({
          id: category._id + '_danger',
          type: 'danger',
          message: `${category.name} vượt ngân sách ${(categoryData.percentage - 100).toFixed(0)}%`
        })
      } else if (categoryData.percentage >= 75) {
        alerts.push({
          id: category._id + '_warning',
          type: 'warning',
          message: `${category.name} đã sử dụng ${categoryData.percentage}% ngân sách`
        })
      } else if (categoryData.percentage < 30) {
        alerts.push({
          id: category._id + '_success',
          type: 'success',
          message: `${category.name} tiết kiệm tốt (${categoryData.percentage}%)`
        })
      }
    }
  })
  
  return alerts.slice(0, 5) // Limit to 5 alerts
})

const activeCategories = computed(() => {
  return categories.value.filter(category => {
    const categoryData = solveCategory(category)
    return categoryData.totalAmount > 0
  }).length
})

const monthlySavings = computed(() => {
  const totalIncome = transactions.value
    .filter(tx => tx.category_id && tx.category_id.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpense = transactions.value
    .filter(tx => tx.category_id && tx.category_id.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
  return Math.max(0, totalIncome - totalExpense)
})


onMounted( async () => {
  await loadCategories();
  await loadTransactions();

  //khởi tạo giá trị tổng quát
  manage(activeTab.value);

  // render line chart once data is ready
  renderOrUpdateLineChart();
})

watch(activeTab, (newTab) => {
  manage(newTab);
})

const loadCategories = async () => {
  try {
    const response = await getCategories();
    if(response.status === 'success') {
      categories.value = response.data.data;
    } else {
      console.error('Failed to load categories:', response.message);
    }
    
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const loadTransactions = async () => {
  try {
    const response = await getTransactions();
    if(response.status === 'success') {
      transactions.value = response.data;
    } else {
      console.error('Failed to load transactions:', response.message);
    }
    
  } catch (error) {
    console.error('Error loading transactions:', error)
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

const solveCategory = function(category) {
    const totalAmount = transactions.value
      .filter(tx => tx.category_id._id === category._id)
      .reduce((sum, tx) => sum + tx.amount, 0);
    const percentage = (totalAmount / category.limit_amount) * 100;
    const remaining = category.limit_amount - totalAmount;
    return {
      totalAmount: totalAmount,
      percentage: percentage.toFixed(2),
      remaining: category.type === 'expense' ? remaining : Math.abs(remaining)
    };
}

const manage = function(type) {
  if (type === 'income') {
    total.value = incomeCategories.value.reduce((sum, category) => sum + category.limit_amount, 0);
    used.value = transactions.value
      .filter(tx => tx.category_id && tx.category_id.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    remaining.value = Math.abs(total.value - used.value);
    progress.value = total.value > 0 ? ((used.value / total.value) * 100).toFixed(2) : 0;
  } else {
    total.value = expenseCategories.value.reduce((sum, category) => sum + category.limit_amount, 0);
    used.value = transactions.value
      .filter(tx => tx.category_id && tx.category_id.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    remaining.value = total.value - used.value;
    progress.value = total.value > 0 ? ((used.value / total.value) * 100).toFixed(2) : 0;
  }
  if(progress.value === 'NaN' || !progress.value) {
    progress.value = 0;
  }
}

// Helpers to build daily percentage line chart for current month
const getTxDate = (tx) => new Date(tx?.date || tx?.createdAt)

const buildLineChartData = () => {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${month + 1}`)
  const daySums = Array.from({ length: daysInMonth }, () => ({ income: 0, expense: 0 }))

  transactions.value.forEach((tx) => {
    if (!tx?.category_id) return
    const d = getTxDate(tx)
    if (isNaN(d)) return
    if (d.getMonth() !== month || d.getFullYear() !== year) return
    const idx = d.getDate() - 1
    if (tx.category_id.type === 'income') daySums[idx].income += Number(tx.amount) || 0
    if (tx.category_id.type === 'expense') daySums[idx].expense += Number(tx.amount) || 0
  })

  const incomePct = []
  const expensePct = []
  for (let i = 0; i < daysInMonth; i++) {
    const total = daySums[i].income + daySums[i].expense
    if (total > 0) {
      incomePct.push(+(((daySums[i].income / total) * 100).toFixed(1)))
      expensePct.push(+(((daySums[i].expense / total) * 100).toFixed(1)))
    } else {
      incomePct.push(0)
      expensePct.push(0)
    }
  }

  return {
    labels,
    series: [
      { name: 'Thu nhập (%)', data: incomePct },
      { name: 'Chi tiêu (%)', data: expensePct },
    ],
  }
}

const renderOrUpdateLineChart = () => {
  const { labels, series } = buildLineChartData()
  const dark = document.documentElement.classList.contains('dark')

  const options = {
    chart: {
      type: 'line',
      height: 320,
      toolbar: { show: false },
      foreColor: dark ? '#cbd5e1' : '#475569',
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#22c55e', '#ef4444'],
    dataLabels: { enabled: false },
    series,
    xaxis: {
      categories: labels,
      labels: { rotate: -45 },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { formatter: (v) => `${v}%` },
    },
    tooltip: {
      y: { formatter: (v) => `${typeof v === 'number' ? v.toFixed(1) : v}%` },
    },
    grid: { strokeDashArray: 4 },
    legend: { position: 'top' },
  }

  if (lineChart) {
    lineChart.updateOptions(
      {
        xaxis: options.xaxis,
        yaxis: options.yaxis,
        grid: options.grid,
        legend: options.legend,
        colors: options.colors,
        chart: options.chart,
      },
      false,
      true,
    )
    lineChart.updateSeries(series, true)
  } else if (lineChartEl.value) {
    lineChart = new ApexCharts(lineChartEl.value, options)
    lineChart.render()
  }
}

watch(transactions, () => {
  renderOrUpdateLineChart()
})

onUnmounted(() => {
  if (lineChart) {
    lineChart.destroy()
    lineChart = null
  }
})
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

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
