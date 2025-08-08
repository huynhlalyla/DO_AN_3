<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 dark:text-white">Báo cáo tháng {{ monthLabel }}</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Tổng hợp thu nhập và chi tiêu trong tháng hiện tại</p>
      </div>
      <div class="flex gap-2">
        <button @click="exportCSV" class="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600">Xuất CSV</button>
        <button @click="exportPDF" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Xuất PDF</button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="text-xs text-slate-500 dark:text-slate-400">Tổng thu</div>
        <div class="text-xl font-bold text-emerald-600">{{ formatCurrency(totalIncome) }}</div>
      </div>
      <div class="p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="text-xs text-slate-500 dark:text-slate-400">Tổng chi</div>
        <div class="text-xl font-bold text-rose-600">{{ formatCurrency(totalExpense) }}</div>
      </div>
      <div class="p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="text-xs text-slate-500 dark:text-slate-400">Còn lại</div>
        <div class="text-xl font-bold" :class="net >= 0 ? 'text-emerald-600' : 'text-rose-600'">{{ formatCurrency(net) }}</div>
      </div>
      <div class="p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="text-xs text-slate-500 dark:text-slate-400">Số giao dịch</div>
        <div class="text-xl font-bold text-slate-800 dark:text-slate-100">{{ monthTx.length }}</div>
      </div>
    </div>

    <div id="report-capture" class="space-y-6">
      <!-- Chart: Daily income/expense -->
      <div class="p-4 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-semibold text-slate-800 dark:text-white">Diễn biến thu/chi theo ngày</h2>
        </div>
        <div ref="lineChartEl"></div>
      </div>

      <!-- Chart: Expense by category -->
      <div class="p-4 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-semibold text-slate-800 dark:text-white">Chi theo danh mục</h2>
        </div>
        <div ref="barChartEl"></div>
      </div>

      <!-- Table: transactions -->
      <div class="p-4 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/30 dark:border-slate-700/50 shadow">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-semibold text-slate-800 dark:text-white">Chi tiết giao dịch tháng</h2>
        </div>
        <div class="overflow-auto">
          <table class="min-w-full text-sm">
            <thead class="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th class="py-2 pr-4">Ngày</th>
                <th class="py-2 pr-4">Loại</th>
                <th class="py-2 pr-4">Danh mục</th>
                <th class="py-2 pr-4">Số tiền</th>
                <th class="py-2 pr-4">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in monthTx" :key="t._id" class="border-b border-slate-100 dark:border-slate-700/40">
                <td class="py-2 pr-4">{{ formatDate(t.date || t.createdAt) }}</td>
                <td class="py-2 pr-4">
                  <span :class="t?.category_id?.type==='income' ? 'text-emerald-600' : 'text-rose-600'">{{ t?.category_id?.type==='income' ? 'Thu' : 'Chi' }}</span>
                </td>
                <td class="py-2 pr-4">{{ t?.category_id?.name || '-' }}</td>
                <td class="py-2 pr-4 font-medium">{{ formatCurrency(t.amount) }}</td>
                <td class="py-2 pr-4 truncate max-w-[300px]" :title="t?.note">{{ t?.note || '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { getTransactions } from '../composables/useTransactionAPI'
import { getCategories } from '../composables/useCategoryAPI'
import jsPDF from 'jspdf'
import '../fonts/Roboto-Regular-normal.js';
const transactions = ref([])
const categories = ref([])

const today = new Date()
const month = today.getMonth()
const year = today.getFullYear()
const monthLabel = computed(() => `${String(month+1).padStart(2,'0')}/${year}`)

const monthTx = computed(() => {
  return transactions.value.filter(t => {
    const d = new Date(t?.date || t?.createdAt)
    return !isNaN(d) && d.getMonth()===month && d.getFullYear()===year
  }).sort((a,b) => new Date(a?.date||a?.createdAt) - new Date(b?.date||b?.createdAt))
})

const totalIncome = computed(() => monthTx.value.filter(t=>t?.category_id?.type==='income').reduce((s,t)=>s+(Number(t.amount)||0),0))
const totalExpense = computed(() => monthTx.value.filter(t=>t?.category_id?.type==='expense').reduce((s,t)=>s+(Number(t.amount)||0),0))
const net = computed(() => totalIncome.value - totalExpense.value)

const formatCurrency = (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(v)||0)
const two = (n)=> String(n).padStart(2,'0')
const formatDate = (v) => { const d=new Date(v); return isNaN(d)?'':`${two(d.getDate())}/${two(d.getMonth()+1)}/${d.getFullYear()}` }

// Charts
const lineChartEl = ref(null)
const barChartEl = ref(null)
let lineChart, barChart

const buildDailySeries = () => {
  const daysInMonth = new Date(year, month+1, 0).getDate()
  const x = Array.from({length: daysInMonth}, (_,i)=> i+1)
  const incomeByDay = Array(daysInMonth).fill(0)
  const expenseByDay = Array(daysInMonth).fill(0)
  for (const t of monthTx.value) {
    const d = new Date(t?.date || t?.createdAt)
    const day = d.getDate()
    const amt = Number(t.amount)||0
    if (t?.category_id?.type==='income') incomeByDay[day-1]+=amt
    else if (t?.category_id?.type==='expense') expenseByDay[day-1]+=amt
  }
  return { x, incomeByDay, expenseByDay }
}

const renderOrUpdateLine = () => {
  const { x, incomeByDay, expenseByDay } = buildDailySeries()
  const options = {
    chart: { type: 'area', height: 320, toolbar: { show: true } },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: { categories: x.map(d=>`${two(d)}/${two(month+1)}`), labels: { style: { colors: '#94a3b8' } } },
    yaxis: { labels: { formatter: (v)=> new Intl.NumberFormat('vi-VN').format(v) } },
    tooltip: { y: { formatter: (v)=> formatCurrency(v) } },
    series: [
      { name: 'Thu', data: incomeByDay },
      { name: 'Chi', data: expenseByDay }
    ],
    colors: ['#10b981', '#ef4444'],
    theme: { mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }
  }
  if (!lineChart) { lineChart = new ApexCharts(lineChartEl.value, options); lineChart.render() }
  else { lineChart.updateOptions(options) }
}

const renderOrUpdateBar = () => {
  // Sum expenses by category
  const map = new Map()
  for (const t of monthTx.value) {
    if (t?.category_id?.type !== 'expense') continue
    const name = t?.category_id?.name || 'Khác'
    map.set(name, (map.get(name)||0) + (Number(t.amount)||0))
  }
  const labels = Array.from(map.keys())
  const data = Array.from(map.values())
  const options = {
    chart: { type: 'bar', height: 320, toolbar: { show: true } },
    plotOptions: { bar: { horizontal: false, columnWidth: '45%', borderRadius: 6 } },
    dataLabels: { enabled: false },
    xaxis: { categories: labels },
    yaxis: { labels: { formatter: (v)=> new Intl.NumberFormat('vi-VN').format(v) } },
    tooltip: { y: { formatter: (v)=> formatCurrency(v) } },
    series: [ { name: 'Chi', data } ],
    colors: ['#6366f1'],
    theme: { mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }
  }
  if (!barChart) { barChart = new ApexCharts(barChartEl.value, options); barChart.render() }
  else { barChart.updateOptions(options) }
}

const exportCSV = () => {
  const headers = ['Date','Type','Category','Amount','Description']
  const rows = monthTx.value.map(t => [
    formatDate(t?.date || t?.createdAt),
    t?.category_id?.type || '',
    t?.category_id?.name || '',
    (Number(t.amount)||0).toString(),
    (t?.note||'').replace(/\n/g,' ')
  ])
  const csvBody = [headers, ...rows].map(r=> r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  // Prepend UTF-8 BOM and Excel separator hint to help Excel detect Unicode and delimiter
  const bom = '\uFEFF'
  const sep = 'sep=,\n'
  const blob = new Blob([bom + sep + csvBody], { type: 'text/csv;charset=utf-8;' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `report_${year}-${two(month+1)}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}

const exportPDF = async () => {
  try {
    const pdf = new jsPDF('p','mm','a4')
    pdf.setFont('Roboto-Regular');
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const contentWidth = pageWidth - 20

    // Title (ASCII safe)
    pdf.setFontSize(16)
    pdf.text(`Báo cáo tháng ${monthLabel.value}`, 10, 12)

    // KPIs (ASCII safe labels)
    pdf.setFontSize(11)
    const kpiY = 20
    const fmtNum = (n) => new Intl.NumberFormat('vi-VN').format(Number(n)||0)
    pdf.text(`Thu: ${fmtNum(totalIncome.value)} VND`, 10, kpiY)
    pdf.text(`Chi: ${fmtNum(totalExpense.value)} VND`, 10, kpiY + 6)
    pdf.text(`Còn lại: ${fmtNum(net.value)} VND`, 10, kpiY + 12)
    pdf.text(`Số giao dịch: ${monthTx.value.length}`, 10, kpiY + 18)

    // Charts as images from ApexCharts
    const chartHeight = 80
    let y = kpiY + 26
    try {
      const res = await lineChart?.dataURI();
      const img = res?.imgURI
      if (img) { pdf.addImage(img, 'PNG', 10, y, contentWidth, chartHeight); y += chartHeight + 8 }
    } catch {}
    try {
      const res2 = await barChart?.dataURI();
      const img2 = res2?.imgURI
      if (img2) {
        if (y + chartHeight + 10 > pageHeight) { pdf.addPage(); y = 10 }
        pdf.addImage(img2, 'PNG', 10, y, contentWidth, chartHeight)
        y += chartHeight + 8
      }
    } catch {}

    // Draw table: under the expense-by-category chart
    const marginX = 10
    const colWidths = (() => {
      const date = 26, type = 16, category = 40, amount = 30
      const used = date + type + category + amount
      const note = contentWidth - used
      return { date, type, category, amount, note }
    })()

    const drawHeader = () => {
      if (y + 12 > pageHeight) { pdf.addPage(); y = 10 }
      pdf.setFontSize(14)
      pdf.text('Chi tiết giao dịch tháng', marginX, y)
      y += 6
      pdf.setFillColor(230)
      pdf.rect(marginX, y, contentWidth, 7, 'F')
      pdf.setFontSize(10)
      let x = marginX
      const headers = ['Ngày','Loại','Danh mục','Số tiền','Ghi chú']
      const widths = [colWidths.date, colWidths.type, colWidths.category, colWidths.amount, colWidths.note]
      for (let i=0;i<headers.length;i++) { pdf.text(headers[i], x + 2, y + 5); x += widths[i] }
      y += 7
    }

    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 10) {
        pdf.addPage(); y = 10; drawHeader()
      }
    }

    const wrap = (text, width) => pdf.splitTextToSize(String(text ?? ''), width - 4)
    drawHeader()
    pdf.setFontSize(10)
    const lineH = 5
    for (const t of monthTx.value) {
      const row = [
        formatDate(t?.date || t?.createdAt),
        (t?.category_id?.type==='income' ? 'Thu' : 'Chi'),
        (t?.category_id?.name || ''),
        new Intl.NumberFormat('vi-VN').format(Number(t?.amount)||0) + ' VND',
        (t?.note || '')
      ]
      const widths = [colWidths.date, colWidths.type, colWidths.category, colWidths.amount, colWidths.note]
      const cells = row.map((v, i) => wrap(v, widths[i]))
      const rowH = Math.max(...cells.map(c => c.length)) * lineH
      ensureSpace(rowH)
      // zebra background
      pdf.setFillColor(246); pdf.rect(marginX, y, contentWidth, rowH, 'F')
      let x = marginX
      for (let i=0;i<cells.length;i++) {
        const lines = cells[i]
        let yy = y + 4
        if (i === 3) { // right align amount
          for (const ln of lines) { const w = pdf.getTextWidth(ln); pdf.text(ln, x + widths[i] - 2 - w, yy); yy += lineH }
        } else {
          for (const ln of lines) { pdf.text(ln, x + 2, yy); yy += lineH }
        }
        pdf.setDrawColor(225); pdf.rect(x, y, widths[i], rowH)
        x += widths[i]
      }
      y += rowH
    }

    pdf.save(`report_${year}-${two(month+1)}.pdf`)
  } catch (e) {
    console.error('Export PDF failed', e)
  }
}

onMounted(async () => {
  const c = await getCategories(); if (c?.status==='success') categories.value = c.data.data
  const t = await getTransactions(); if (t?.status==='success') transactions.value = t.data
  renderOrUpdateLine(); renderOrUpdateBar()
})

watch(monthTx, () => { renderOrUpdateLine(); renderOrUpdateBar() })
</script>

<style scoped>
</style>
