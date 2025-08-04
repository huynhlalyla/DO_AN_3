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
              8 danh mục
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Ăn uống - Chi tiêu -->
            <div v-for="category in categories" 
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
                      // {
                      //   'bg-red-500/20' : category.type === 'expense',
                      //   'bg-green-500/20' : category.type === 'income',
                      // }
                    ]">
                      <!-- <svg :class="[
                        {
                          'text-red-600 dark:text-red-400' : category.type === 'expense',
                          'text-green-600 dark:text-green-400' : category.type === 'income',
                        },
                        'w-6 h-6'
                      ]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l8.5 10.5h-17L12 2zm0 3.5L7.5 11h9L12 5.5z"/>
                      </svg> -->

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
                      ]">{{ category.type }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button class="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" title="Chỉnh sửa">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button class="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100" title="Xóa">
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
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
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
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { getCategories } from '../composables/useCategoryAPI'
import { getTransactions } from '../composables/useTransactionAPI'
import { icons } from '../composables/useIcons'

const { initAuth } = useAuth()


const categories = ref([])
const transactions = ref([])
const totalActiveCategories = ref(0)
// Initialize auth
onMounted(async () => {
  initAuth();
  await loadCategories();
  await loadTransactions();
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


const solveCategory = (category_id) => {
  const limitAmount = categories.value.find(c => c._id === category_id).limit_amount
  const totalTransactions = transactions.value.filter(t => t.category_id._id === category_id);
  const totalAmount = totalTransactions.reduce((sum, t) => sum + t.amount, 0)
  const percentage = (totalAmount / limitAmount) * 100
  const isActive = new Date(categories.value.find(c => c._id === category_id).end_date).getTime() > new Date().getTime() || !categories.value.find(c => c._id === category_id).end_date
  
  return {
    totalTransactions,
    totalAmount,
    percentage,
    isActive
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
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