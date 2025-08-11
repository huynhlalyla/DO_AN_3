<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="w-full max-w-md bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 space-y-6">
      <h2 class="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Xác thực OTP</h2>
      <p class="text-sm text-center text-slate-600 dark:text-slate-400">Nhập OTP đã gửi tới: <b>{{ email }}</b></p>
      <div class="space-y-4" v-if="!hasSession">
        <div>
          <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">OTP (4 số)</label>
          <input v-model="otp" maxlength="4" placeholder="____" class="tracking-widest text-center text-lg font-bold w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 outline-none" />
          <div class="flex justify-between items-center mt-1 text-xs text-slate-500">
            <span v-if="remaining>0">Hết hạn sau {{ remaining }}s</span>
            <button v-else @click="resend" class="text-blue-600 hover:underline">Gửi lại OTP</button>
          </div>
        </div>
        <button :disabled="otp.length!==4 || loading" @click="verify" class="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300" :class="otp.length===4? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700':'bg-slate-400 cursor-not-allowed'">
          <span v-if="!loading">Xác thực</span>
          <span v-else class="animate-pulse">Đang kiểm tra...</span>
        </button>
      </div>
      <div v-else class="text-center space-y-4">
        <p class="text-green-600 dark:text-green-400 font-medium">OTP đã xác thực. Đang chuyển tới trang đặt lại mật khẩu...</p>
        <div class="animate-pulse text-sm text-slate-500">Vui lòng chờ</div>
      </div>
      <router-link to="/auth/forgot-password" class="block text-center text-sm text-blue-600 hover:text-blue-800">Quay lại nhập email</router-link>
      <transition name="fade"><div v-if="message" :class="['text-xs p-3 rounded-lg border', typeClass]">{{ message }}</div></transition>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = sessionStorage.getItem('fp_email') || ''
const otp = ref('')
const loading = ref(false)
const message = ref('')
const type = ref('info')
const expiresAt = ref(sessionStorage.getItem('fp_expires'))
const remaining = ref(0)
const timer = ref(null)
const hasSession = ref(false)
const existingToken = sessionStorage.getItem('fp_token')
if(existingToken && expiresAt.value && new Date(expiresAt.value).getTime() > Date.now()){
  hasSession.value = true
  setTimeout(()=> router.push('/auth/forgot-password/reset'),600)
}
const typeClass = computed(()=> ({
  'border-green-400 bg-green-50 text-green-700': type.value==='success',
  'border-red-400 bg-red-50 text-red-700': ['error','warn'].includes(type.value),
  'border-blue-400 bg-blue-50 text-blue-700': type.value==='info'
}))
function setMsg(t,m){ type.value=t; message.value=m; setTimeout(()=> message.value='',5000)}
function tick(){
  if(!expiresAt.value) return
  const diff = new Date(expiresAt.value).getTime() - Date.now()
  remaining.value = diff>0? Math.floor(diff/1000):0
  if(remaining.value===0 && timer.value){ clearInterval(timer.value); timer.value=null }
}
onMounted(()=>{ tick(); timer.value=setInterval(tick,1000) })
onUnmounted(()=> timer.value && clearInterval(timer.value))
async function resend(){
  if(loading.value) return
  if(!email) return
  loading.value=true
  try{
    const rs = await axios.post('http://localhost:3000/user/auth/forgot-password',{ email })
    if(rs.data.type==='success'){
      expiresAt.value = rs.data.expiresAt
      sessionStorage.setItem('fp_expires', rs.data.expiresAt)
      tick()
      setMsg('success','Đã gửi lại OTP')
    } else setMsg(rs.data.type||'warn', rs.data.message||'Không gửi được OTP')
  }catch(e){ setMsg('error','Lỗi gửi lại OTP') }
  finally{ loading.value=false }
}
async function verify(){
  loading.value=true
  try{
    const rs = await axios.post('http://localhost:3000/user/auth/verify-otp',{ email, otp: otp.value })
    if(rs.data.type==='success'){
      sessionStorage.setItem('fp_token', rs.data.token)
      sessionStorage.setItem('fp_expires', rs.data.expiresAt)
      hasSession.value = true
      setMsg('success','OTP hợp lệ')
      setTimeout(()=> router.push('/auth/forgot-password/reset'),700)
    } else setMsg(rs.data.type||'warn', rs.data.message||'OTP không hợp lệ')
  }catch(e){ setMsg('error','Lỗi xác thực OTP') }
  finally{ loading.value=false }
}
</script>
<style scoped>.fade-enter-active,.fade-leave-active{transition:.25s}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}</style>
