<template>
  <div class="relative">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto p-6">      
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"/>
            </svg>
          </div>
          Giao dịch
          <small class="text-lg font-medium text-slate-600 dark:text-slate-400">{{ getTimeRangeLabel() }}</small>
        </h1>

        <!-- Time Filter Tabs -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
            <button
              @click="timeFilter = 'today'"  
             :class="[
              {
                  'bg-white shadow-sm dark:bg-slate-600' : timeFilter === 'today'
              },
              'px-4 py-2 text-slate-800 dark:text-white rounded-md font-medium transition-all duration-200'
            ]">
              Hôm nay
            </button>
            <button
              @click="timeFilter = 'week'"  
             :class="[
              {
                  'bg-white shadow-sm dark:bg-slate-600' : timeFilter === 'week'
              },
              'px-4 py-2 text-slate-800 dark:text-white rounded-md font-medium transition-all duration-200'
            ]">
              Tuần này
            </button>
            <button
              @click="timeFilter = 'month'"  
             :class="[
              {
                  'bg-white shadow-sm dark:bg-slate-600' : timeFilter === 'month'
              },
              'px-4 py-2 text-slate-800 dark:text-white rounded-md font-medium transition-all duration-200'
            ]">
              Tháng này
            </button>
          </div>
          
          <div class="text-sm text-slate-600 dark:text-slate-400">
            {{ filteredTransactions.length }} giao dịch
          </div>
        </div>

        <!-- Financial Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Total Income -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Tổng thu</p>
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                  +{{ totalIncome.toLocaleString('vi-VN') }} ₫
                </p>
                <p class="text-xs text-green-600/70 dark:text-green-400/70">{{ incomeCount }} giao dịch</p>
              </div>
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3.5 12.5h17L12 2zm0 3.5L16.5 11h-9L12 5.5z"/>
                  <path d="M12 13l4.5 4.5h-9L12 13z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Expense -->
          <div class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200/50 dark:border-red-700/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Tổng chi</p>
                <p class="text-2xl font-bold text-red-600 dark:text-red-400">
                  -{{ totalExpense.toLocaleString('vi-VN') }} ₫
                </p>
                <p class="text-xs text-red-600/70 dark:text-red-400/70">{{ expenseCount }} giao dịch</p>
              </div>
              <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
                  <path d="M12 13l-4.5 4.5h9L12 13z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Net Balance -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Số dư</p>
                <p class="text-2xl font-bold" :class="{
                  'text-green-600 dark:text-green-400': netBalance >= 0,
                  'text-red-600 dark:text-red-400': netBalance < 0
                }">
                  {{ netBalance >= 0 ? '+' : '' }}{{ netBalance.toLocaleString('vi-VN') }} ₫
                </p>
                <p class="text-xs text-blue-600/70 dark:text-blue-400/70">{{ totalTransactions }} giao dịch tổng</p>
              </div>
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
                </svg>
              </div>
            </div>
          </div>        </div>
      </div>

      
        
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Chart Section -->
        <div class="lg:col-span-1">
          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-slate-700/50 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-slate-800 dark:text-white">Thống kê</h3>
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 011-1h2a1 1 0 011 1v1h2a2 2 0 012 2v2zm-2 0V6H6v10h8V8z"/>
                </svg>
              </div>
            </div>
            <div class="py-4 max-h-80" id="pie-chart"></div>
          </div>
        </div>

        <!-- Table Section -->
        <div class="lg:col-span-2">
          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
            <div class="bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white">Danh sách giao dịch</h3>
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="overflow-x-auto max-h-80 custom-scrollbar">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50/80 dark:bg-slate-900/50 sticky top-0">
                  <tr>
                    <th scope="col" class="px-6 py-4 font-semibold">Thời gian</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Ghi chú</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Loại</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Danh mục</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Chi phí</th>
                    <th scope="col" class="px-6 py-4 font-semibold">
                      <span class="sr-only">Sửa</span>
                    </th>
                  </tr>
                </thead>                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                  <!-- Empty state when no transactions -->
                  <tr v-if="filteredTransactions.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center justify-center space-y-4">
                        <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                          <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                        </div>
                        <div class="text-center">
                          <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Chưa có giao dịch nào</h3>
                          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Bạn chưa có giao dịch nào {{ getTimeRangeLabel() }}. Hãy thêm giao dịch đầu tiên!</p>
                          <router-link to="/transactions/add" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm giao dịch
                          </router-link>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Transaction rows when data exists -->
                  <tr v-for="transaction in filteredTransactions" :key="transaction._id"  
                      class="bg-white/50 dark:bg-transparent hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-all duration-200">
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <div class="flex flex-col">
                        <span class="font-medium">{{ formatDate(transaction.date) }}</span>
                        <span class="text-xs text-slate-500 dark:text-slate-500">{{ formatTime(transaction.date) }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <span class="text-sm">{{ transaction.note || 'Không có ghi chú' }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span :class="{
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': transaction.category_id?.type === 'expense',
                        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300': transaction.category_id?.type === 'income'
                      }" 
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                        <div :class="{
                          'bg-red-500': transaction.category_id?.type === 'expense',
                          'bg-green-500': transaction.category_id?.type === 'income'
                        }" class="w-2 h-2 rounded-full mr-2"></div>
                        {{ transaction.category_id?.type === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-900 dark:text-slate-200">
                      <div class="flex items-center gap-2">
                        <div v-if="transaction.category_id?.icon" 
                             :style="{backgroundColor: transaction.category_id?.color || '#6b7280'}"
                             class="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs">
                          <span v-html="icons[transaction.category_id.icon]?.icon"></span>
                        </div>
                        {{ transaction.category_id?.name || 'Không xác định' }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span :class="{
                        'text-red-600 dark:text-red-400': transaction.category_id?.type === 'expense',
                        'text-green-600 dark:text-green-400': transaction.category_id?.type === 'income'
                      }" class="font-semibold">
                        {{ transaction.category_id?.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button class="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Popular Categories Section -->
      <div class="my-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            Danh mục thường dùng
          </h2>
          <div class="text-sm text-slate-600 dark:text-slate-400">
            {{ popularCategories.length }} danh mục
          </div>
        </div>        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Empty state when no categories -->
          <div v-if="popularCategories.length === 0" class="col-span-full flex flex-col items-center justify-center py-12">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Chưa có danh mục nào</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Khi bạn có giao dịch {{ getTimeRangeLabel() }}, các danh mục thường dùng sẽ hiển thị ở đây</p>
            <router-link to="/transactions/add" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm giao dịch đầu tiên
            </router-link>
          </div>

          <!-- Category cards when data exists -->
          <div v-for="category in popularCategories" :key="category.name" 
               class="bg-gradient-to-br rounded-xl p-4 border transition-all duration-200 hover:transform hover:scale-105 cursor-pointer"
               :class="{
                 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/50 hover:shadow-green-200/50': category.type === 'income',
                 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200/50 dark:border-red-700/50 hover:shadow-red-200/50': category.type === 'expense'
               }">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <div :style="{backgroundColor: category.color}" 
                     class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs">
                  <span v-html="icons[category.icon]?.icon"></span>
                </div>
                <span class="text-xs px-2 py-1 rounded-full font-medium"
                      :class="{
                        'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300': category.type === 'income',
                        'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300': category.type === 'expense'
                      }">
                  {{ category.type === 'income' ? 'Thu' : 'Chi' }}
                </span>
              </div>
              <div class="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {{ category.transactionCount }} GD
              </div>
            </div>
            
            <h3 class="font-semibold text-slate-800 dark:text-white mb-2 truncate">
              {{ category.name }}
            </h3>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold" :class="{
                  'text-green-600 dark:text-green-400': category.type === 'income',
                  'text-red-600 dark:text-red-400': category.type === 'expense'
                }">
                  {{ category.type === 'expense' ? '-' : '+' }}{{ formatCurrency(category.totalAmount) }}
                </span>
              </div>
              
              <!-- Progress bar for both expense and income categories -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-600 dark:text-slate-400">{{ getProgressLabel(category.type) }}</span>
                  <span class="font-medium text-slate-700 dark:text-slate-300">{{ category.percentage }}%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div :class="['h-2 rounded-full transition-all duration-300', 'bg-gradient-to-r', getProgressBarColor(category.percentage, category.type)]"
                       :style="{ width: Math.min(category.percentage, 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DialOption />
  </div>
</template>

<script setup>
import {  onMounted, 
          ref,
          computed,
          watch,
          nextTick 
        }                       from    'vue';
import ApexCharts               from    'apexcharts';
import { initFlowbite }         from    "flowbite";
import DialOption               from    '../components/DialOption.vue';
import { useAuth }              from    '../composables/useAuth';
import { getCategories }        from    '../composables/useCategoryAPI';
import { getTransactions }      from    '../composables/useTransactionAPI';
import { icons }                from    '../composables/useIcons';

const { initAuth }              =       useAuth();

const transactionsData          =       ref([]);
const categories                =       ref([]);
const timeFilter                =       ref('today'); // 'today', 'week', 'month'

// Helper functions for date filtering
const isToday = (date) => {
  const today = new Date();
  const transactionDate = new Date(date);
  return transactionDate.toDateString() === today.toDateString();
};

const isThisWeek = (date) => {
  const today = new Date();
  const transactionDate = new Date(date);
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  startOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setHours(23, 59, 59, 999);
  return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
};

const isThisMonth = (date) => {
  const today = new Date();
  const transactionDate = new Date(date);
  return transactionDate.getMonth() === today.getMonth() && 
         transactionDate.getFullYear() === today.getFullYear();
};

const getTimeRangeLabel = () => {
  switch (timeFilter.value) {
    case 'today': return 'trong hôm nay';
    case 'week': return 'trong tuần này';
    case 'month': return 'trong tháng này';
    default: return 'trong hôm nay';
  }
};

// Filtered transactions based on time filter
const filteredTransactions = computed(() => {
  return transactionsData.value.filter(transaction => {
    const transactionDate = transaction.date;
    switch (timeFilter.value) {
      case 'today':
        return isToday(transactionDate);
      case 'week':
        return isThisWeek(transactionDate);
      case 'month':
        return isThisMonth(transactionDate);
      default:
        return isToday(transactionDate);
    }
  });
});

// Computed properties for financial calculations
const totalIncome = computed(() => {
  return filteredTransactions.value
    .filter(transaction => transaction.category_id?.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
});

const totalExpense = computed(() => {
  return filteredTransactions.value
    .filter(transaction => transaction.category_id?.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
});

const netBalance = computed(() => {
  return totalIncome.value - totalExpense.value;
});

const incomeCount = computed(() => {
  return filteredTransactions.value.filter(transaction => transaction.category_id?.type === 'income').length;
});

const expenseCount = computed(() => {
  return filteredTransactions.value.filter(transaction => transaction.category_id?.type === 'expense').length;
});

const totalTransactions = computed(() => {
  return filteredTransactions.value.length;
});

// Computed property for popular categories
const popularCategories = computed(() => {
  // Group transactions by category using filtered transactions
  const categoryGroups = filteredTransactions.value.reduce((groups, transaction) => {
    const categoryName = transaction.category_id?.name || 'Không xác định';
    const categoryType = transaction.category_id?.type || 'expense';
    const key = `${categoryName}-${categoryType}`;
    
    if (!groups[key]) {
      groups[key] = {
        name: categoryName,
        type: categoryType,
        icon: transaction.category_id?.icon || 'other',
        color: transaction.category_id?.color || '#6b7280',
        transactions: [],
        totalAmount: 0,
        transactionCount: 0
      };
    }
    groups[key].transactions.push(transaction);
    groups[key].totalAmount += transaction.amount;
    groups[key].transactionCount += 1;
    return groups;
  }, {});

  // Convert to array and calculate percentages for both expense and income categories
  const categoriesArray = Object.values(categoryGroups);
  
  // Calculate percentage for both expense and income categories
  categoriesArray.forEach(category => {
    if (category.type === 'expense') {
      category.percentage = totalExpense.value > 0
        ? ((category.totalAmount / totalExpense.value) * 100).toFixed(2)
        : 0;
    } else if (category.type === 'income') {
      category.percentage = totalIncome.value > 0
        ? ((category.totalAmount / totalIncome.value) * 100).toFixed(2)
        : 0;
    }
  });

  // Sort by transaction count (most used first) and return top categories
  return categoriesArray
    .sort((a, b) => b.transactionCount - a.transactionCount)
    .slice(0, 8); // Show top 8 categories
});

// Computed properties for chart data
const chartData = computed(() => {
  const countExpense = filteredTransactions.value.reduce((total, transaction) => {
    return transaction.category_id?.type === "expense" ? total + 1 : total;
  }, 0);
  const countIncome = filteredTransactions.value.reduce((total, transaction) => {
    return transaction.category_id?.type === "income" ? total + 1 : total;
  }, 0);
  
  return { countExpense, countIncome };
});

// Chart rendering function
const renderChart = () => {
  const chartElement = document.getElementById("pie-chart");
  if (!chartElement) return;

  // Clear previous chart content
  chartElement.innerHTML = '';
  
  const { countExpense, countIncome } = chartData.value;
  
  if (countExpense === 0 && countIncome === 0) {
    // Show empty state for chart
    chartElement.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full py-8">
        <div class="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 text-center">Chưa có dữ liệu<br>để hiển thị biểu đồ</p>
      </div>
    `;
    return;
  }

  // Render chart with data
  const getChartOptions = () => {
    return {
      series: [countExpense, countIncome],
      colors: ["#EF4444", "#10B981"], // Red for expense, Green for income - matching our theme
      chart: {
        height: 280,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Chi tiêu", "Thu nhập"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          colors: ["#ffffff"]
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        labels: {
          colors: "#64748B"
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }]
    };
  };

  if (typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(chartElement, getChartOptions());
    chart.render();
  }
};
const loadCategories = async () => {
  try {
    const response = await getCategories();
    if (response.status === 'success') {
      categories.value = response.data.data;
    } else {
      console.error('Failed to load categories:', response.message);
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
};

const loadTransactions = async () => {
  try {
    const response = await getTransactions();
    if (response.status === 'success') {
      transactionsData.value = response.data;
    } else {
      console.error('Failed to load transactions:', response.message);
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
  }
};

// Format currency helper
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Format time helper
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get progress bar color based on percentage and type
const getProgressBarColor = (percentage, type) => {
  if (type === 'expense') {
    // Chi tiêu: Xanh (thấp) -> Cam (trung bình) -> Đỏ (cao)
    if (percentage <= 30) return 'from-green-500 to-emerald-500';
    if (percentage <= 70) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-pink-500';
  } else {
    // Thu nhập: Đỏ (thấp) -> Cam (trung bình) -> Xanh (cao)
    if (percentage <= 30) return 'from-red-500 to-pink-500';
    if (percentage <= 70) return 'from-orange-500 to-amber-500';
    return 'from-green-500 to-emerald-500';
  }
};

// Get progress text label
const getProgressLabel = (type) => {
  return type === 'expense' ? 'Tỷ lệ chi tiêu' : 'Tỷ lệ thu nhập';
};

// Watch for changes in filtered transactions or time filter to re-render chart
watch([filteredTransactions, timeFilter], async () => {
  await nextTick();
  renderChart();
}, { deep: true });

onMounted(async () => {
  // Khởi tạo auth và Flowbite
  initAuth();
  initFlowbite();  
  
  // Load dữ liệu thật từ API
  await loadCategories();
  await loadTransactions();
  
  // Render chart after data is loaded
  await nextTick();
  renderChart();
});
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