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
          <small class="text-lg font-medium text-slate-600 dark:text-slate-400">trong hôm nay</small>
        </h1>

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
                    <th scope="col" class="px-6 py-4 font-semibold">Mô tả</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Loại</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Danh mục</th>
                    <th scope="col" class="px-6 py-4 font-semibold">Chi phí</th>
                    <th scope="col" class="px-6 py-4 font-semibold">
                      <span class="sr-only">Sửa</span>
                    </th>
                  </tr>
                </thead>                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                  <!-- Empty state when no transactions -->
                  <tr v-if="transactionsData.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center justify-center space-y-4">
                        <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                          <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                        </div>
                        <div class="text-center">
                          <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Chưa có giao dịch nào</h3>
                          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Bạn chưa có giao dịch nào trong hôm nay. Hãy thêm giao dịch đầu tiên!</p>
                          <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm giao dịch
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Transaction rows when data exists -->
                  <tr v-for="transaction in transactionsData" :key="transaction.date"  
                      class="bg-white/50 dark:bg-transparent hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-all duration-200">
                    <th scope="row" class="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {{ transaction.description }}
                    </th>
                    <td class="px-6 py-4">
                      <span :class="{
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': transaction.type === 'expense',
                        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300': transaction.type === 'income'
                      }" 
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                        <div :class="{
                          'bg-red-500': transaction.type === 'expense',
                          'bg-green-500': transaction.type === 'income'
                        }" class="w-2 h-2 rounded-full mr-2"></div>
                        {{ transaction.type === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-900 dark:text-slate-200">
                      {{ transaction.category }}
                    </td>
                    <td class="px-6 py-4">
                      <span :class="{
                        'text-red-600 dark:text-red-400': transaction.type === 'expense',
                        'text-green-600 dark:text-green-400': transaction.type === 'income'
                      }" class="font-semibold">
                        {{ transaction.type === 'expense' ? '-' : '+' }}{{ transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
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
            <p class="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Khi bạn có giao dịch, các danh mục thường dùng sẽ hiển thị ở đây</p>
            <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm giao dịch đầu tiên
            </button>
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
                <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                     :class="{
                       'bg-green-500/20': category.type === 'income',
                       'bg-red-500/20': category.type === 'expense'
                     }">
                  <svg class="w-4 h-4" :class="{
                         'text-green-600 dark:text-green-400': category.type === 'income',
                         'text-red-600 dark:text-red-400': category.type === 'expense'
                       }" fill="currentColor" viewBox="0 0 24 24">
                    <path v-if="category.type === 'income'" d="M12 2L3.5 12.5h17L12 2zm0 3.5L16.5 11h-9L12 5.5z"/>
                    <path v-else d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
                  </svg>
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
                  {{ category.type === 'expense' ? '-' : '+' }}{{ category.totalAmount.toLocaleString('vi-VN') }}₫
                </span>
              </div>
              
              <!-- Progress bar for expense categories only -->
              <div v-if="category.type === 'expense'" class="space-y-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-600 dark:text-slate-400">Tỷ lệ chi tiêu</span>
                  <span class="font-medium text-slate-700 dark:text-slate-300">{{ category.percentage }}%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                       :style="{ width: category.percentage + '%' }"></div>
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
          computed 
        }                       from    'vue';
import ApexCharts               from    'apexcharts';
import { initFlowbite }         from    "flowbite";
import DialOption               from    '../components/DialOption.vue';


const transactionsData          =       ref([]);

// Computed properties for financial calculations
const totalIncome = computed(() => {
  return transactionsData.value
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
});

const totalExpense = computed(() => {
  return transactionsData.value
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
});

const netBalance = computed(() => {
  return totalIncome.value - totalExpense.value;
});

const incomeCount = computed(() => {
  return transactionsData.value.filter(transaction => transaction.type === 'income').length;
});

const expenseCount = computed(() => {
  return transactionsData.value.filter(transaction => transaction.type === 'expense').length;
});

const totalTransactions = computed(() => {
  return transactionsData.value.length;
});

// Computed property for popular categories
const popularCategories = computed(() => {
  // Group transactions by category
  const categoryGroups = transactionsData.value.reduce((groups, transaction) => {
    const key = `${transaction.category}-${transaction.type}`;
    if (!groups[key]) {
      groups[key] = {
        name: transaction.category,
        type: transaction.type,
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

  // Convert to array and calculate percentages for expense categories
  const categories = Object.values(categoryGroups);
  
  // Calculate percentage for expense categories
  categories.forEach(category => {
    if (category.type === 'expense') {
      category.percentage = totalExpense.value > 0 
        ? Math.round((category.totalAmount / totalExpense.value) * 100)
        : 0;
    }
  });

  // Sort by transaction count (most used first) and return top categories
  return categories
    .sort((a, b) => b.transactionCount - a.transactionCount)
    .slice(0, 8); // Show top 8 categories
});

onMounted(() => {
  // Khởi tạo Flowbite
  initFlowbite();  
  
  // Dữ liệu giả cho giao dịch (Mock data)
  transactionsData.value = [
    { type: "expense", amount: 100000, date: "2025-07-01", description: "Mua sắm quần áo", category: "Mua sắm" },
    { type: "income", amount: 2500000, date: "2025-06-30", description: "Lương tháng 6", category: "Lương" },
    { type: "expense", amount: 150000, date: "2025-07-01", description: "Ăn trưa", category: "Ăn uống" },
    { type: "expense", amount: 50000, date: "2025-07-01", description: "Xe bus", category: "Di chuyển" },
    { type: "expense", amount: 300000, date: "2025-06-30", description: "Tiền điện", category: "Hóa đơn" },
    { type: "income", amount: 200000, date: "2025-06-29", description: "Bán đồ cũ", category: "Thu nhập khác" },
    { type: "expense", amount: 80000, date: "2025-06-29", description: "Cafe với bạn", category: "Giải trí" },
    { type: "expense", amount: 120000, date: "2025-06-28", description: "Mua sách", category: "Giáo dục" },
  ]


  const countExpense            =       transactionsData.value.reduce((total, transaction) => {
    return transaction.type     ===     "expense" ? total + 1 : total;
  }, 0);
  const countIncome             =       transactionsData.value.reduce((total, transaction) => {
    return transaction.type     ===     "income" ? total + 1 : total;
  }, 0);

const getChartOptions           =       () => {
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
  }
}

if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
  // Only render chart if there is data
  if (countExpense > 0 || countIncome > 0) {
    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
    chart.render();
  } else {
    // Show empty state for chart
    const chartElement = document.getElementById("pie-chart");
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
  }
}

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