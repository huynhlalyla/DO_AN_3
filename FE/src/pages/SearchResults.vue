<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" /></svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Kết quả tìm kiếm</h1>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">Từ khóa: <span class="font-semibold text-indigo-600 dark:text-indigo-400">"{{ query }}"</span></p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <span class="text-slate-500 dark:text-slate-400">Danh mục</span>
            <span class="font-semibold text-slate-800 dark:text-white bg-white dark:bg-slate-600 px-2 py-0.5 rounded-lg shadow-sm">{{ categories.length }}</span>
          </div>
          <div class="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <span class="text-slate-500 dark:text-slate-400">Giao dịch</span>
            <span class="font-semibold text-slate-800 dark:text-white bg-white dark:bg-slate-600 px-2 py-0.5 rounded-lg shadow-sm">{{ transactions.length }}</span>
          </div>
        </div>
      </div>
      <form method="get" action="/search" class="mt-6 relative">
        <input :value="query" name="q" class="w-full bg-white dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-xl px-5 py-3 pl-12 text-slate-700 dark:text-slate-200 focus:outline-none" />
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" /></svg>
        </div>
      </form>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-4 text-slate-500 dark:text-slate-400">
      <svg class="w-10 h-10 animate-spin text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"/><path class="opacity-75" stroke-width="4" d="M4 12a8 8 0 018-8"/></svg>
      <span>Đang tải dữ liệu...</span>
    </div>
    <div v-else class="grid lg:grid-cols-3 gap-8" v-show="!isLoading">
      <!-- Categories Column -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
          <div class="p-5 border-b border-slate-200/70 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800">
            <h2 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
              </span>
              Danh mục ({{ categories.length }})
            </h2>
          </div>
          <div class="divide-y divide-slate-100 dark:divide-slate-700/60 max-h-[480px] overflow-y-auto custom-scrollbar">
            <div v-if="!categories.length" class="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">Không có danh mục phù hợp</div>
            <div v-for="cat in categories" :key="cat._id" class="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-700/40 transition-all duration-200 flex gap-4 group">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-semibold shadow-inner" :style="{ background: cat.color || '#6366f1' }">
                <span v-html="icons[cat.icon].icon"></span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-semibold text-slate-800 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{{ cat.name }}</h3>
                  <span class="text-xs font-medium px-2 py-0.5 rounded-full" :class="cat.type==='income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300':'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'">{{ cat.type==='income' ? 'Thu' : 'Chi' }}</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">{{ cat.description || 'Không có mô tả' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Column -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
          <div class="p-5 border-b border-slate-200/70 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800">
            <h2 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              </span>
              Giao dịch ({{ transactions.length }})
            </h2>
            <div class="flex gap-2 text-xs">
              <span class="px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300 font-medium">Chi: {{ expenseCount }}</span>
              <span class="px-3 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300 font-medium">Thu: {{ incomeCount }}</span>
            </div>
          </div>
          <div class="overflow-x-auto max-h-[560px] custom-scrollbar">
            <table class="w-full text-sm">
              <thead class="text-xs text-slate-600 dark:text-slate-300 uppercase bg-slate-50/80 dark:bg-slate-900/40 sticky top-0">
                <tr>
                  <th class="px-6 py-3 text-left font-semibold">Ngày</th>
                  <th class="px-6 py-3 text-left font-semibold">Ghi chú</th>
                  <th class="px-6 py-3 text-left font-semibold">Danh mục</th>
                  <th class="px-6 py-3 text-left font-semibold">Loại</th>
                  <th class="px-6 py-3 text-right font-semibold">Số tiền</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                <tr v-if="!transactions.length">
                  <td colspan="5" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400 text-sm">Không có giao dịch phù hợp</td>
                </tr>
                <tr v-for="tx in transactions" :key="tx._id" class="bg-white/60 dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col">
                      <span class="font-medium text-slate-700 dark:text-slate-200">{{ formatDate(tx.date) }}</span>
                      <span class="text-xs text-slate-400 dark:text-slate-500">{{ formatTime(tx.date) }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-[220px] truncate">{{ tx.note || 'Không có ghi chú' }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs" :style="{ background: tx.category_id?.color || '#6366f1' }">
                        <span v-html="icons[tx.category_id.icon].icon"></span>
                      </div>
                      <span class="text-slate-700 dark:text-slate-200 text-sm font-medium">{{ tx.category_id?.name || '—' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="tx.category_id?.type==='expense' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'">{{ tx.category_id?.type==='expense' ? 'Chi' : 'Thu' }}</span>
                  </td>
                  <td class="px-6 py-4 text-right font-semibold" :class="tx.category_id?.type==='expense' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
                    {{ tx.category_id?.type==='expense' ? '-' : '+' }}{{ formatCurrency(tx.amount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/50 p-6" v-if="transactions.length">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg>
              </span>
              Dòng thời gian
            </h3>
          </div>
          <ol class="relative border-s border-slate-200 dark:border-slate-700 ml-3 space-y-8">
            <li v-for="group in groupedTimeline" :key="group.date" class="relative pl-6">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white dark:border-slate-800"></div>
              <div class="mb-3">
                <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ formatDate(group.date) }} <span class="text-xs font-normal text-slate-400 dark:text-slate-500">({{ group.items.length }} giao dịch)</span></h4>
              </div>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="item in group.items" :key="item._id" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-600/50 flex flex-col gap-2 hover:shadow-md transition-all duration-200">
                  <div class="flex items-center justify-between">
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="item.category_id?.type==='expense' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'">{{ item.category_id?.type==='expense' ? 'Chi' : 'Thu' }}</span>
                    <span class="font-semibold text-sm" :class="item.category_id?.type==='expense' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">{{ item.category_id?.type==='expense' ? '-' : '+' }}{{ formatCurrency(item.amount) }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div class="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[10px]" :style="{ background: item.category_id?.color || '#6366f1' }">
                      <span v-html="icons[item.category_id.icon]?.icon"></span>
                    </div>
                    <span class="font-medium text-slate-700 dark:text-slate-300">{{ item.category_id?.name }}</span>
                    <span class="text-slate-400 dark:text-slate-500">•</span>
                    <span>{{ formatTime(item.date) }}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{{ item.note || 'Không có ghi chú' }}</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { search } from '../composables/useAPI'
import { icons } from '../composables/useIcons'

const categories = ref([])
const transactions = ref([])
const isLoading = ref(false)

const route = useRoute()
const query = computed(() => route.query.q || '')

async function loadSearchResults() {
  isLoading.value = true
  try {
    const results = await search(query.value)
    categories.value = results.categories || []
    transactions.value = results.transactions || []
  } catch (error) {
    console.error('Error loading search results:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadSearchResults)
watch(() => route.query.q, () => loadSearchResults())

const expenseCount = computed(() => transactions.value.filter(t => t.category_id?.type === 'expense' || t.type === 'expense').length)
const incomeCount = computed(() => transactions.value.filter(t => t.category_id?.type === 'income' || t.type === 'income').length)

const groupedTimeline = computed(() => {
  const groups = {}
  transactions.value.forEach(tx => {
    const d = (tx.date || '').toString().split('T')[0]
    if(!groups[d]) groups[d] = []
    groups[d].push(tx)
  })
  return Object.keys(groups).sort((a,b)=> b.localeCompare(a)).map(date => ({ date, items: groups[date] }))
})

function formatCurrency(v){
  if(!v && v!==0) return ''
  return Number(v).toLocaleString('vi-VN') + ' ₫'
}
function formatDate(ds){
  if(!ds) return ''
  const d = new Date(ds);return d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})
}
function formatTime(ds){
  if(!ds) return ''
  const d = new Date(ds);return d.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
</style>
