<template>
  <div class="relative">
    <div class="max-w-5xl mx-auto p-6">
      <!-- Header -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-3.866 0-7 3.134-7 7v1h14v-1c0-3.866-3.134-7-7-7z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-800 dark:text-white">Hồ sơ tài khoản</h1>
              <p class="text-slate-600 dark:text-slate-400">Quản lý thông tin cá nhân và bảo mật</p>
            </div>
          </div>
          <button @click="handleLogout" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">Đăng xuất</button>
        </div>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: User card -->
        <div class="lg:col-span-1">
          <div class="bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl p-6">
            <div class="flex flex-col items-center text-center gap-4">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-3xl font-bold">
                {{ initials }}
              </div>
              <div>
                <div class="text-xl font-semibold text-slate-800 dark:text-white">{{ displayName }}</div>
                <div class="text-slate-500 dark:text-slate-400 text-sm">{{ userEmail }}</div>
              </div>
              <div class="w-full h-px bg-slate-200 dark:bg-slate-700 my-2"/>
              <div class="grid grid-cols-3 gap-3 w-full">
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div class="text-xs text-slate-500 dark:text-slate-400">Danh mục</div>
                  <div class="font-bold text-slate-800 dark:text-white">{{ stats.categories }}</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div class="text-xs text-slate-500 dark:text-slate-400">Giao dịch</div>
                  <div class="font-bold text-slate-800 dark:text-white">{{ stats.transactions }}</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div class="text-xs text-slate-500 dark:text-slate-400">Tháng này</div>
                  <div class="font-bold text-emerald-600 truncate" :title="formatCurrency(stats.monthlyNet)">{{ formatMoneyCompact(stats.monthlyNet) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: forms and actions -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Account info -->
          <div class="bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl">
            <div class="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-800 dark:text-white">Thông tin tài khoản</h2>
              <button @click="toggleEdit()" class="px-3 py-1.5 rounded-lg text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600">{{ isEditing ? 'Hủy' : 'Chỉnh sửa' }}</button>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-500 dark:text-slate-400 mb-1">Họ và tên</label>
                <input v-model="form.name" :disabled="!isEditing" class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 disabled:opacity-70" placeholder="Tên của bạn"/>
              </div>
              <div>
                <label class="block text-sm text-slate-500 dark:text-slate-400 mb-1">Email</label>
                <input v-model="form.email" disabled class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100" placeholder="email@domain.com"/>
              </div>
              <div class="md:col-span-2 flex gap-3">
                <button @click="saveProfile" :disabled="!isEditing" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">Lưu thay đổi</button>
                <button @click="resetProfile" :disabled="!isEditing" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50">Đặt lại</button>
              </div>
            </div>
          </div>

          <!-- Security -->
          <div class="bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl">
            <div class="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 class="text-lg font-semibold text-slate-800 dark:text-white">Bảo mật</h2>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-500 dark:text-slate-400 mb-1">Mật khẩu hiện tại</label>
                <input v-model="security.current" type="password" class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100" placeholder="••••••"/>
              </div>
              <div>
                <label class="block text-sm text-slate-500 dark:text-slate-400 mb-1">Mật khẩu mới</label>
                <input v-model="security.newPass" type="password" class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100" placeholder="••••••"/>
              </div>
              <div class="md:col-span-2 flex gap-3">
                <button @click="changePass" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">Đổi mật khẩu</button>
                <button @click="clearSecurity" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">Xóa</button>
              </div>
            </div>
          </div>

          <!-- Danger zone -->
          
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { getCategories } from '../composables/useCategoryAPI'
import { getTransactions } from '../composables/useTransactionAPI'
import axios from 'axios'
const baseAPI = import.meta.env.VITE_BASE_API || 'http://localhost:3000'
const { user, logout, initAuth, updateUser } = useAuth()

const form = ref({ name: '', email: '' })
const isEditing = ref(false)

const security = ref({ current: '', newPass: '' })

const categories = ref([])
const transactions = ref([])

const displayName = computed(() => user.value?.fullname || user.value?.name || 'Người dùng')
const userEmail = computed(() => user.value?.email || 'chưa có email')
const initials = computed(() => (displayName.value || 'U').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase())

const stats = computed(() => {
  const totalIncome = transactions.value.filter(t => t?.category_id?.type === 'income').reduce((s, t) => s + (Number(t.amount) || 0), 0)
  const totalExpense = transactions.value.filter(t => t?.category_id?.type === 'expense').reduce((s, t) => s + (Number(t.amount) || 0), 0)
  const month = new Date().getMonth(); const year = new Date().getFullYear()
  const inMonth = transactions.value.filter(t => { const d = new Date(t?.date || t?.createdAt); return !isNaN(d) && d.getMonth()===month && d.getFullYear()===year })
  const monthlyIncome = inMonth.filter(t => t?.category_id?.type==='income').reduce((s,t)=>s+(Number(t.amount)||0),0)
  const monthlyExpense = inMonth.filter(t => t?.category_id?.type==='expense').reduce((s,t)=>s+(Number(t.amount)||0),0)
  return {
    categories: categories.value.length,
    transactions: transactions.value.length,
    monthlyNet: Math.max(0, monthlyIncome - monthlyExpense)
  }
})

const formatCurrency = (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v||0)

// Hiển thị rút gọn: từ 10 triệu trở lên -> tr/tỷ (VD: 10tr, 10.5tr, 1tỷ)
const formatMoneyCompact = (v, threshold = 10_000_000) => {
  const n = Number(v) || 0
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  const trimZeros = (s) => s.replace(/\.0$/, '')

  if (abs >= 1_000_000_000) { // tỷ
    const val = abs / 1_000_000_000
    const str = val >= 10 ? trimZeros(val.toFixed(0)) : trimZeros(val.toFixed(1))
    return `${sign}${str}tỷ`
  }
  if (abs >= threshold) { // từ 10 triệu trở lên -> tr
    const val = abs / 1_000_000
    const str = Number.isInteger(val) ? val.toFixed(0) : trimZeros(val.toFixed(1))
    return `${sign}${str}tr`
  }
  return formatCurrency(n)
}

const toggleEdit = () => { isEditing.value = !isEditing.value }
const saveProfile = async () => {
  try {
    const payload = { userId: user.value?._id, name: form.value.name, email: form.value.email }
    await axios.post(`${baseAPI}/user/update-profile`, payload)
    // update local session so UI and reload show new data
    updateUser({ name: form.value.name, email: form.value.email })
    isEditing.value = false
  } catch (e) {
    console.error('Update profile failed', e)
  }
}
const changePass = async () => {
  const { current, newPass } = security.value
  if (!user.value?._id) return
  try {
    const res = await axios.post(`${baseAPI}/user/change-password`, {
      userId: user.value._id,
      oldPassword: current,
      newPassword: newPass,
    })
    if (res?.data?.status === 200) {
      clearSecurity()
    }
  } catch (e) {
    console.error('Change password failed', e)
  }
}
const clearSecurity = () => { security.value = { current: '', newPass: '' } }
const deactivateAccount = () => { /* TODO: call deactivate API */ }
const handleLogout = () => logout()

onMounted(async () => {
  initAuth()
  form.value = { name: displayName.value, email: userEmail.value }
  const c = await getCategories(); if (c.status==='success') categories.value = c.data.data
  const t = await getTransactions(); if (t.status==='success') transactions.value = t.data
})
</script>

<style scoped>
</style>
