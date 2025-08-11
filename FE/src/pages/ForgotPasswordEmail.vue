<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="w-full max-w-md bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 space-y-6">
      <h2 class="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quên mật khẩu</h2>
      <p class="text-sm text-center text-slate-600 dark:text-slate-400">Nhập email để nhận mã OTP (4 số)</p>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email</label>
          <input v-model="email" type="email" placeholder="you@example.com" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <button :disabled="!valid || loading" @click="send" class="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300" :class="valid? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700':'bg-slate-400 cursor-not-allowed'">
          <span v-if="!loading">Gửi OTP</span>
          <span v-else class="animate-pulse">Đang gửi...</span>
        </button>
        <router-link to="/auth/login" class="block text-center text-sm text-blue-600 hover:text-blue-800">Quay về đăng nhập</router-link>
        <transition name="fade"><div v-if="message" :class="['text-xs p-3 rounded-lg border', typeClass]">{{ message }}</div></transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const loading = ref(false)
const message = ref('')
const type = ref('info')
const valid = computed(()=> /.+@.+\..+/.test(email.value))
const typeClass = computed(()=> ({
  'border-green-400 bg-green-50 text-green-700': type.value==='success',
  'border-red-400 bg-red-50 text-red-700': ['error','warn'].includes(type.value),
  'border-blue-400 bg-blue-50 text-blue-700': type.value==='info'
}))
function setMsg(t,m){ type.value=t; message.value=m; setTimeout(()=> message.value='',5000)}
async function send(){
  loading.value=true
  try{
    const rs = await axios.post('http://localhost:3000/user/auth/forgot-password',{ email: email.value })
    if(rs.data.type==='success'){
      sessionStorage.setItem('fp_email', email.value)
      sessionStorage.removeItem('fp_token')
      sessionStorage.setItem('fp_expires', rs.data.expiresAt)
      setMsg('success','Đã gửi OTP')
      setTimeout(()=> router.push('/auth/forgot-password/otp'),800)
    } else setMsg(rs.data.type||'warn', rs.data.message||'Không gửi được OTP')
  }catch(e){ setMsg('error','Lỗi gửi OTP') }
  finally{ loading.value=false }
}
</script>
<style scoped>.fade-enter-active,.fade-leave-active{transition:.25s}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}</style>
