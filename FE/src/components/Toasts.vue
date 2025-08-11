<template>
  <div class="fixed inset-0 pointer-events-none z-[999] flex flex-col items-end p-4 gap-2">
    <transition-group name="toast-fade" tag="div" class="flex flex-col gap-2 w-full sm:w-auto">
      <div v-for="t in toasts" :key="t.id" class="pointer-events-auto flex items-start gap-3 rounded-xl shadow-lg border px-4 py-3 w-full sm:w-80 backdrop-blur-md"
           :class="toastClass(t)">
        <div class="flex-1 text-sm font-medium leading-snug" v-text="t.message" />
        <button @click="remove(t.id)" class="text-slate-200/80 hover:text-white transition-colors">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { toasts, remove } = useToast()

const toastClass = (t) => {
  switch (t.type) {
    case 'error': return 'bg-red-600/90 border-red-400/40 text-white'
    case 'warn': return 'bg-amber-500/90 border-amber-300/40 text-white'
    case 'info': return 'bg-blue-600/90 border-blue-400/40 text-white'
    default: return 'bg-emerald-600/90 border-emerald-400/40 text-white'
  }
}
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active { transition: all .25s ease; }
.toast-fade-enter-from { opacity:0; transform: translateY(8px) scale(.95); }
.toast-fade-leave-to { opacity:0; transform: translateY(-4px) scale(.95); }
</style>
