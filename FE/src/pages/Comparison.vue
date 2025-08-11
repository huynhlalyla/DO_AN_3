<template>
  <div class="min-h-screen flex flex-col gap-10 px-6 md:px-10 lg:px-14 py-6">
    <!-- Header & Year -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow">≋</span>
          So sánh chi tiêu theo tháng
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Năm {{ year }} • Thẻ hiển thị các tháng có dữ liệu. Chọn 2 tháng để so sánh chi tiết.</p>
      </div>
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex flex-col">
          <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Năm</label>
            <input type="number" v-model.number="year" min="2000" max="2100" class="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none w-28" />
        </div>
        <button @click="reload" class="h-10 mt-5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow hover:from-indigo-600 hover:to-purple-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0 1 19 5"/></svg>
          Tải lại
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow flex flex-col gap-1">
        <span class="text-xs uppercase font-semibold tracking-wide">Tổng chi</span>
        <span class="text-lg font-bold">{{ formatMoney(totalExpense) }}</span>
        <span class="text-[11px] text-white/80">{{ monthsCount }} tháng</span>
      </div>
      <div class="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow flex flex-col gap-1">
        <span class="text-xs uppercase font-semibold tracking-wide">Tổng thu</span>
        <span class="text-lg font-bold">{{ formatMoney(totalIncome) }}</span>
        <span class="text-[11px] text-white/80">{{ monthsCount }} tháng</span>
      </div>
      <div class="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow flex flex-col gap-1">
        <span class="text-xs uppercase font-semibold tracking-wide">Bình quân chi / tháng</span>
        <span class="text-lg font-bold">{{ formatMoney(avgExpensePerMonth) }}</span>
        <span class="text-[11px] text-white/80">Mean</span>
      </div>
      <div class="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow flex flex-col gap-1">
        <span class="text-xs uppercase font-semibold tracking-wide">Bình quân thu / tháng</span>
        <span class="text-lg font-bold">{{ formatMoney(avgIncomePerMonth) }}</span>
        <span class="text-[11px] text-white/80">Mean</span>
      </div>
    </div>

    <!-- Month Cards -->
    <div>
      <h2 class="font-semibold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">Các tháng {{ monthsCount ? '('+monthsCount+')' : '' }}
        <span v-if="loading" class="text-xs text-indigo-500 animate-pulse">Đang tải...</span>
      </h2>
      <!-- Replaced original single grid with responsive mobile scroll + desktop grid -->
      <!-- Mobile horizontal scroll list -->
      <div class="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-thin">
        <div v-for="m in monthsList" :key="'m-mobile-'+m" @click="selectMonthForCompare(m)" class="min-w-[210px] snap-start group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg backdrop-blur" :class="monthCardClass(m)">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold bg-orange-600 text-slate-200 shadow-inner" :class="badgeClass(m)">{{ m }}</span>
              <span class="text-sm font-semibold tracking-wide" :class="titleTextClass(m)">T{{ m }}</span>
            </div>
            <span v-if="isAnomaly(m)" class="text-[10px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-400/40 font-medium">Bất thường</span>
          </div>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Chi</span><span class="font-medium text-rose-600 dark:text-rose-400">{{ formatMoneyShort2(agg(m).expense) }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Thu</span><span class="font-medium text-emerald-600 dark:text-emerald-400">{{ formatMoneyShort2(agg(m).income) }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Chi%</span><span class="font-medium">{{ (agg(m).expense/(totalExpense||1)*100).toFixed(1) }}%</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Thu%</span><span class="font-medium">{{ (agg(m).income/(totalIncome||1)*100).toFixed(1) }}%</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Net</span><span :class="agg(m).net>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoneyShort2(agg(m).net) }}</span></div>
          </div>
          <div class="absolute -top-2 -right-2">
            <span v-if="compareA===m" class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow">A</span>
            <span v-else-if="compareB===m" class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow">B</span>
          </div>
        </div>
      </div>
      <!-- Desktop / larger screens grid -->
      <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="m in monthsList" :key="'m-desktop-'+m" @click="selectMonthForCompare(m)" class="group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg backdrop-blur" :class="monthCardClass(m)">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-xl flex items-center justify-center text-base font-semibold bg-orange-600 text-slate-200 shadow-inner" :class="badgeClass(m)">{{ m }}</span>
              <span class="text-sm font-semibold tracking-wide" :class="titleTextClass(m)">Tháng {{ m }}</span>
            </div>
            <span v-if="isAnomaly(m)" class="text-[10px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-400/40 font-medium">Bất thường</span>
          </div>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Chi</span><span class="font-medium text-rose-600 dark:text-rose-400">{{ formatMoneyShort2(agg(m).expense) }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Thu</span><span class="font-medium text-emerald-600 dark:text-emerald-400">{{ formatMoneyShort2(agg(m).income) }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Tỷ trọng chi</span><span class="font-medium">{{ (agg(m).expense/ (totalExpense||1) *100).toFixed(1) }}%</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Tỷ trọng thu</span><span class="font-medium">{{ (agg(m).income/ (totalIncome||1) *100).toFixed(1) }}%</span></div>
            <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Net</span><span :class="agg(m).net>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoneyShort2(agg(m).net) }}</span></div>
          </div>
          <!-- Selection badges -->
          <div class="absolute -top-2 -right-2">
            <span v-if="compareA===m" class="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow">A</span>
            <span v-else-if="compareB===m" class="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow">B</span>
          </div>
        </div>
      </div>
      <p v-if="!monthsList.length && !loading" class="text-sm text-slate-500 dark:text-slate-400 mt-2">Không có dữ liệu giao dịch trong năm này.</p>
    </div>

    <!-- Two-Month Comparison -->
    <div v-if="compareA && compareB" class="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-200/60 dark:border-slate-700/50 p-6 shadow relative">
      <div class="flex items-start justify-between mb-4">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">So sánh Tháng {{ compareA }} & Tháng {{ compareB }}</h3>
        <div class="flex gap-2">
          <button class="px-3 py-1.5 text-xs rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200" @click="swapCompare">Đổi A/B</button>
          <button class="px-3 py-1.5 text-xs rounded-lg bg-rose-500 hover:bg-rose-600 text-white" @click="clearCompare">Xóa chọn</button>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-6 text-sm">
        <div class="space-y-3">
          <h4 class="text-xs uppercase font-semibold text-indigo-600 dark:text-indigo-400">Tháng {{ compareA }}</h4>
          <div class="flex justify-between"><span>Chi</span><span class="font-medium text-rose-600 dark:text-rose-400">{{ formatMoney(agg(compareA).expense) }}</span></div>
          <div class="flex justify-between"><span>Thu</span><span class="font-medium text-emerald-600 dark:text-emerald-400">{{ formatMoney(agg(compareA).income) }}</span></div>
          <div class="flex justify-between"><span>Net</span><span :class="agg(compareA).net>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoney(agg(compareA).net) }}</span></div>
          <div class="flex justify-between"><span>Tỷ trọng chi</span><span>{{ (agg(compareA).expense/(totalExpense||1)*100).toFixed(1) }}%</span></div>
          <div class="flex justify-between"><span>Tỷ trọng thu</span><span>{{ (agg(compareA).income/(totalIncome||1)*100).toFixed(1) }}%</span></div>
        </div>
        <div class="space-y-3">
          <h4 class="text-xs uppercase font-semibold text-purple-600 dark:text-purple-400">Tháng {{ compareB }}</h4>
          <div class="flex justify-between"><span>Chi</span><span class="font-medium text-rose-600 dark:text-rose-400">{{ formatMoney(agg(compareB).expense) }}</span></div>
          <div class="flex justify-between"><span>Thu</span><span class="font-medium text-emerald-600 dark:text-emerald-400">{{ formatMoney(agg(compareB).income) }}</span></div>
          <div class="flex justify-between"><span>Net</span><span :class="agg(compareB).net>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoney(agg(compareB).net) }}</span></div>
          <div class="flex justify-between"><span>Tỷ trọng chi</span><span>{{ (agg(compareB).expense/(totalExpense||1)*100).toFixed(1) }}%</span></div>
          <div class="flex justify-between"><span>Tỷ trọng thu</span><span>{{ (agg(compareB).income/(totalIncome||1)*100).toFixed(1) }}%</span></div>
        </div>
        <div class="space-y-3">
          <h4 class="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Chênh lệch (B - A)</h4>
          <div class="flex justify-between"><span>Chi</span><span :class="diff.expense>=0?'text-rose-600 dark:text-rose-400':'text-emerald-600 dark:text-emerald-400'" class="font-medium">{{ formatMoney(diff.expense) }} ({{ pct.diffExpense }}%)</span></div>
          <div class="flex justify-between"><span>Thu</span><span :class="diff.income>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoney(diff.income) }} ({{ pct.diffIncome }}%)</span></div>
            <div class="flex justify-between"><span>Net</span><span :class="diff.net>=0?'text-emerald-600 dark:text-emerald-400':'text-rose-600 dark:text-rose-400'" class="font-medium">{{ formatMoney(diff.net) }}</span></div>
            <div class="flex justify-between"><span>Chi (% tổng)</span><span>{{ pct.expenseShareA }}% → {{ pct.expenseShareB }}%</span></div>
            <div class="flex justify-between"><span>Thu (% tổng)</span><span>{{ pct.incomeShareA }}% → {{ pct.incomeShareB }}%</span></div>
        </div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 whitespace-pre-line" v-if="compareInsight">
        <b>Nhận xét:</b> {{ compareInsight }}
      </div>
    </div>

    <!-- Chart Section (moved to bottom) -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-200/60 dark:border-slate-700/50 p-6 shadow relative">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">Biểu đồ tổng hợp thu - chi các tháng
          <span v-if="loading" class="text-xs font-normal text-indigo-500 animate-pulse">Đang tải...</span>
        </h2>
        <div class="flex gap-3 text-xs">
          <div class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-rose-500 inline-block"></span>Chi tiêu</div>
          <div class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span>Thu nhập</div>
        </div>
      </div>
      <div id="monthlyChart" class="w-full" style="min-height:300px"></div>
      <div v-if="anomalies.length" class="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-sm">
        <b>Tháng bất thường:</b> {{ anomalies.map(a=>`T${a.month}(${a.type==='high'?'cao':'thấp'})`).join(', ') }}
      </div>
    </div>

    <!-- Modal Month Detail (unchanged) -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur" @click="closeModal"></div>
        <div class="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
            <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Chi tiết Tháng {{ modalMonth }}</h3>
            <button @click="closeModal" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5 space-y-6 overflow-y-auto custom-scrollbar">
            <!-- ...existing stats from previous modal... -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30">
                <p class="text-xs uppercase font-semibold text-rose-600 dark:text-rose-300">Chi tiêu</p>
                <p class="mt-1 text-lg font-bold text-rose-700 dark:text-rose-200">{{ formatMoney(monthDetail.expense) }}</p>
              </div>
              <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
                <p class="text-xs uppercase font-semibold text-emerald-600 dark:text-emerald-300">Thu nhập</p>
                <p class="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-200">{{ formatMoney(monthDetail.income) }}</p>
              </div>
              <div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30">
                <p class="text-xs uppercase font-semibold text-indigo-600 dark:text-indigo-300">Số giao dịch</p>
                <p class="mt-1 text-lg font-bold text-indigo-700 dark:text-indigo-200">{{ monthDetail.count }}</p>
              </div>
              <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                <p class="text-xs uppercase font-semibold text-amber-600 dark:text-amber-300">Trung bình / giao dịch</p>
                <p class="mt-1 text-lg font-bold text-amber-700 dark:text-amber-200">{{ formatMoney(monthDetail.avg) }}</p>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">Danh mục chính</h4>
              <div class="grid md:grid-cols-3 gap-3">
                <div v-for="c in monthDetail.topCategories" :key="c.name" class="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ c.name }} ({{ c.type==='expense' ? 'Chi':'Thu' }})</p>
                  <p class="font-semibold text-slate-700 dark:text-slate-200">{{ formatMoney(c.total) }}</p>
                  <p class="text-[10px] text-slate-400 mt-1">{{ c.count }} giao dịch • {{ (c.percent*100).toFixed(1) }}%</p>
                </div>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-slate-700 dark:text-slate-200 mb-2">Nhận xét AI</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">{{ monthDetail.aiNote || 'Đang tạo...' }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import ApexCharts from 'apexcharts'

const year = ref(new Date().getFullYear())
const rawTransactions = ref([])
const loading = ref(false)
const anomalies = ref([])

// Comparison selection (two months)
const compareA = ref(null)
const compareB = ref(null)
const compareInsight = ref('')

// Modal state
const showModal = ref(false)
const modalMonth = ref(null)
const monthDetail = ref({ expense:0, income:0, count:0, avg:0, topCategories:[], aiNote:'' })

async function fetchData(){
  loading.value = true
  try{
    const user = JSON.parse(sessionStorage.getItem('user')||'{}')
    if(!user._id){ rawTransactions.value=[]; return }
    const rs = await axios.get(`http://localhost:3000/transaction?user=${user._id}`)
    rawTransactions.value = rs.data || []
    buildChart()
    detectAnomalies()
    buildCompareInsight()
  }catch(e){ console.error('Fetch transactions failed', e)}
  finally{ loading.value=false }
}

function monthKey(d){ const dt = new Date(d); return dt.getMonth()+1 }
function isYear(d){ return new Date(d).getFullYear() === year.value }

const monthlyAgg = computed(()=>{
  const agg = {}
  for(const t of rawTransactions.value){
    if(!t.date || !isYear(t.date)) continue
    const m = monthKey(t.date)
    if(!agg[m]) agg[m] = { expense:0, income:0, count:0, items:[], categories:{} }
    const amount = Number(t.amount)||0
    const type = t.category_id?.type === 'income' ? 'income':'expense'
    agg[m][type]+= amount
    agg[m].count++
    agg[m].items.push(t)
    const cname = t.category_id?.name||'Khác'
    if(!agg[m].categories[cname]) agg[m].categories[cname] = { total:0, type, count:0 }
    agg[m].categories[cname].total += amount
    agg[m].categories[cname].count++
  }
  return agg
})

const monthsList = computed(()=> Object.keys(monthlyAgg.value).map(Number).sort((a,b)=> a-b))
const monthsCount = computed(()=> monthsList.value.length )

const totalExpense = computed(()=> monthsList.value.reduce((s,m)=> s + (monthlyAgg.value[m]?.expense||0),0))
const totalIncome = computed(()=> monthsList.value.reduce((s,m)=> s + (monthlyAgg.value[m]?.income||0),0))
const avgExpensePerMonth = computed(()=> monthsCount.value? totalExpense.value/monthsCount.value:0)
const avgIncomePerMonth = computed(()=> monthsCount.value? totalIncome.value/monthsCount.value:0)

function agg(m){
  const data = monthlyAgg.value[m] || { expense:0, income:0, count:0 }
  return { ...data, net: (data.income||0)-(data.expense||0) }
}

function selectMonthForCompare(m){
  // If clicking while holding shift? (not needed). Basic toggle logic.
  if(compareA.value===m){ compareA.value=null; buildCompareInsight(); return }
  if(compareB.value===m){ compareB.value=null; buildCompareInsight(); return }
  if(!compareA.value){ compareA.value=m; buildCompareInsight(); return }
  if(!compareB.value){ compareB.value=m; buildCompareInsight(); return }
  // If both filled, replace the oldest (A)
  compareA.value = compareB.value
  compareB.value = m
  buildCompareInsight()
}
function clearCompare(){ compareA.value=null; compareB.value=null; compareInsight.value='' }
function swapCompare(){ const tmp=compareA.value; compareA.value=compareB.value; compareB.value=tmp; buildCompareInsight() }

const diff = computed(()=>{
  if(!(compareA.value && compareB.value)) return { expense:0, income:0, net:0 }
  const A = agg(compareA.value); const B = agg(compareB.value)
  return { expense: B.expense - A.expense, income: B.income - A.income, net: B.net - A.net }
})
const pct = computed(()=>{
  if(!(compareA.value && compareB.value)) return { diffExpense:0, diffIncome:0, expenseShareA:0, expenseShareB:0, incomeShareA:0, incomeShareB:0 }
  const A = agg(compareA.value); const B = agg(compareB.value)
  return {
    diffExpense: A.expense? ((B.expense - A.expense)/A.expense*100).toFixed(1):'0.0',
    diffIncome: A.income? ((B.income - A.income)/A.income*100).toFixed(1):'0.0',
    expenseShareA: (A.expense/(totalExpense.value||1)*100).toFixed(1),
    expenseShareB: (B.expense/(totalExpense.value||1)*100).toFixed(1),
    incomeShareA: (A.income/(totalIncome.value||1)*100).toFixed(1),
    incomeShareB: (B.income/(totalIncome.value||1)*100).toFixed(1)
  }
})

function buildCompareInsight(){
  if(!(compareA.value && compareB.value)){ compareInsight.value=''; return }
  const A = agg(compareA.value); const B = agg(compareB.value)
  const dirExpense = diff.value.expense>0? 'cao hơn':'thấp hơn'
  const dirIncome = diff.value.income>0? 'cao hơn':'thấp hơn'
  const noteAnomA = isAnomaly(compareA.value)? ' (A bất thường)':''
  const noteAnomB = isAnomaly(compareB.value)? ' (B bất thường)':''
  compareInsight.value = `Tháng ${compareB.value}${noteAnomB} chi ${dirExpense} tháng ${compareA.value}${noteAnomA} ${Math.abs(pct.value.diffExpense)}%. Thu ${dirIncome} ${Math.abs(pct.value.diffIncome)}%. Tỷ trọng chi (${pct.value.expenseShareA}% → ${pct.value.expenseShareB}%). Tỷ trọng thu (${pct.value.incomeShareA}% → ${pct.value.incomeShareB}%).`
}

function openMonth(m){
  const data = monthlyAgg.value[m]
  if(!data) return
  modalMonth.value = m
  const total = data.expense + data.income
  const cats = Object.entries(data.categories).map(([name,val])=> ({ name, type: val.type, total: val.total, count: val.count, percent: total? val.total/total:0 }))
  cats.sort((a,b)=> b.total - a.total)
  monthDetail.value = {
    expense: data.expense,
    income: data.income,
    count: data.count,
    avg: data.count? (data.expense+data.income)/data.count:0,
    topCategories: cats.slice(0,9),
    aiNote: buildMonthAINote(m, data)
  }
  showModal.value = true
}
function closeModal(){ showModal.value=false }

// Anomaly detection
function detectAnomalies(){
  const values = Object.values(monthlyAgg.value).map(v=> v.expense)
  if(values.length<3){ anomalies.value=[]; return }
  const mean = values.reduce((a,b)=>a+b,0)/values.length
  const stdev = Math.sqrt(values.reduce((a,b)=> a+ Math.pow(b-mean,2),0)/values.length)
  anomalies.value = Object.entries(monthlyAgg.value).filter(([m,v])=> stdev>0 && Math.abs((v.expense-mean)/stdev)>=1.5).map(([m,v])=> ({ month:Number(m), type: v.expense>mean? 'high':'low', expense:v.expense }))
}
function isAnomaly(m){ return anomalies.value.some(a=> a.month===m) }

function buildMonthAINote(m, data){
  const net = data.income - data.expense
  const status = net>=0? 'thặng dư':'thâm hụt'
  const top = Object.entries(data.categories).sort((a,b)=> b[1].total - a[1].total).slice(0,3).map(([name,val])=> `${name}: ${formatMoney(val.total)} (${val.type==='income'?'thu':'chi'})`).join('; ')
  return `Tháng ${m} ${status} ${formatMoney(Math.abs(net))}. Tổng chi: ${formatMoney(data.expense)}, thu: ${formatMoney(data.income)}. Nhóm chính: ${top}`
}

// Chart (unchanged except label)
function buildChart(){
  const months = Array.from({length:12},(_,i)=>i+1)
  const expenseSeries = months.map(m=> monthlyAgg.value[m]?.expense||0)
  const incomeSeries = months.map(m=> monthlyAgg.value[m]?.income||0)
  const options = {
    chart:{ type:'bar', height:320, stacked:false, toolbar:{show:false}, animations:{ enabled:true } },
    series:[
      { name:'Chi tiêu', data: expenseSeries, color:'#f43f5e' },
      { name:'Thu nhập', data: incomeSeries, color:'#10b981' }
    ],
    xaxis:{ categories: months.map(m=>'T'+m), labels:{ style:{ colors:'#64748b' } } },
    yaxis:{ labels:{ formatter: v=> formatMoneyShort(v) } },
    dataLabels:{ enabled:false },
    legend:{ fontSize:'12px' },
    tooltip:{ y:{ formatter: v=> formatMoney(v) } },
    plotOptions:{ bar:{ borderRadius:4, columnWidth:'55%' } }
  }
  nextTick(()=>{
    const el = document.querySelector('#monthlyChart')
    if(!el) return
    if(el._apexcharts){ el._apexcharts.destroy() }
    const chart = new ApexCharts(el, options)
    chart.render()
    el._apexcharts = chart
  })
}

function formatMoney(v){ return v.toLocaleString('vi-VN',{ style:'currency', currency:'VND'}) }
function formatMoneyShort(v){ if(v>=1e9) return (v/1e9).toFixed(1)+'B'; if(v>=1e6) return (v/1e6).toFixed(1)+'M'; if(v>=1e3) return (v/1e3).toFixed(0)+'K'; return v }
function formatMoneyShort2(v){ return formatMoneyShort(Math.abs(v)) + (v<0?'-':'') }

// Card styling helpers
function monthCardClass(m){
  const base = 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:shadow-xl hover:-translate-y-0.5'
  const selA = compareA.value===m
  const selB = compareB.value===m
  if(selA) return base + ' ring-2 ring-indigo-500/70'
  if(selB) return base + ' ring-2 ring-purple-500/70'
  return base
}
function badgeClass(m){
  if(compareA.value===m) return 'bg-indigo-600'
  if(compareB.value===m) return 'bg-purple-600'
  return 'bg-slate-900/80 dark:bg-slate-700'
}
function titleTextClass(m){
  if(compareA.value===m) return 'text-indigo-600 dark:text-indigo-400'
  if(compareB.value===m) return 'text-purple-600 dark:text-purple-400'
  return 'text-slate-700 dark:text-slate-200'
}

watch(year, fetchData)
watch([compareA, compareB], buildCompareInsight)

onMounted(fetchData)

function reload(){ fetchData() }
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}.dark .custom-scrollbar::-webkit-scrollbar-thumb{background:#475569}
.fade-enter-active,.fade-leave-active{transition:.25s ease}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}
/* thin horizontal scrollbar for month list */
.scrollbar-thin::-webkit-scrollbar{height:6px}
.scrollbar-thin::-webkit-scrollbar-track{background:transparent}
.scrollbar-thin::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
.dark .scrollbar-thin::-webkit-scrollbar-thumb{background:#475569}
</style>
