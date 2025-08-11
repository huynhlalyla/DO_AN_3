<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="w-full max-w-md bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 space-y-6">
      <h2 class="text-2xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Đặt lại mật khẩu</h2>
      <p class="text-sm text-center text-slate-600 dark:text-slate-400">Nhập mật khẩu mới cho tài khoản <b>{{ email }}</b></p>
      <div v-if="!expired" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Mật khẩu mới</label>
          <input v-model="newPassword" :type="showPassword? 'text':'password'" placeholder="Mật khẩu mới" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Xác nhận mật khẩu</label>
          <input v-model="confirmPassword" :type="showPassword? 'text':'password'" placeholder="Nhập lại mật khẩu" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-pink-500 outline-none" />
          <button type="button" @click="showPassword=!showPassword" class="mt-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">{{ showPassword? 'Ẩn':'Hiện' }} mật khẩu</button>
        </div>
        <p class="text-xs text-slate-500" v-if="remaining>0">Phiên sẽ hết hạn sau {{ remaining }}s</p>
        <button :disabled="!canSubmit || loading" @click="submit" class="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300" :class="canSubmit? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700':'bg-slate-400 cursor-not-allowed'">
          <span v-if="!loading">Cập nhật mật khẩu</span>
          <span v-else class="animate-pulse">Đang xử lý...</span>
        </button>
      </div>
      <div v-else class="text-center space-y-4">
        <p class="text-red-600 dark:text-red-400 font-medium">Phiên đặt lại đã hết hạn.</p>
        <router-link to="/auth/forgot-password" class="text-blue-600 hover:underline text-sm">Gửi lại yêu cầu</router-link>
      </div>
      <router-link to="/auth/login" class="block text-center text-sm text-blue-600 hover:text-blue-800">Quay về đăng nhập</router-link>
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
const token = sessionStorage.getItem('fp_token')
const expiresAt = ref(sessionStorage.getItem('fp_expires'))
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const type = ref('info')
const remaining = ref(0)
const timer = ref(null)
const expired = ref(false)
if(!email || !token){ router.push('/auth/forgot-password/otp') }
const canSubmit = computed(()=> newPassword.value && newPassword.value===confirmPassword.value && newPassword.value.length>=8)
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
  if(remaining.value===0){ expired.value=true; if(timer.value){clearInterval(timer.value);timer.value=null}}
}
onMounted(()=> { tick(); timer.value=setInterval(tick,1000) })
onUnmounted(()=> timer.value && clearInterval(timer.value))
async function submit(){
  if(!canSubmit.value) return
  loading.value=true
  try{
    const rs = await axios.post('http://localhost:3000/user/auth/reset-password',{ email, token, newPassword: newPassword.value })
    if(rs.data.type==='success'){
      setMsg('success','Đặt lại mật khẩu thành công. Chuyển hướng đăng nhập...')
      sessionStorage.removeItem('fp_token'); sessionStorage.removeItem('fp_expires');
      setTimeout(()=> router.push('/auth/login'),1500)
    } else setMsg(rs.data.type||'warn', rs.data.message||'Không thể đặt lại mật khẩu')
  }catch(e){ setMsg('error','Lỗi đặt lại mật khẩu') }
  finally{ loading.value=false }
}
</script>

<style scoped>.fade-enter-active,.fade-leave-active{transition:.3s}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}</style>
