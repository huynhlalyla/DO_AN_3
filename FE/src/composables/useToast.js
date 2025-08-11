import { ref } from 'vue'

const toasts = ref([])
let id = 0

const push = (message, type = 'success', timeout = 3000) => {
  // If an array of messages is provided, create a toast for each entry
  if (Array.isArray(message)) {
    message.forEach((m, idx) => {
      // small stagger for nicer animation cascade
      setTimeout(() => push(m, type, timeout), idx * 120)
    })
    return
  }
  const item = { id: ++id, message, type }
  toasts.value.push(item)
  if (timeout) setTimeout(() => remove(item.id), timeout)
}

// Convenience helper if caller prefers explicit name
const pushMany = (messages, type = 'success', timeout = 3000) => {
  if (!Array.isArray(messages)) return push(messages, type, timeout)
  push(messages, type, timeout)
}

const remove = (toastId) => {
  const idx = toasts.value.findIndex(t => t.id === toastId)
  if (idx !== -1) toasts.value.splice(idx, 1)
}

export function useToast() {
  return { toasts, push, pushMany, remove }
}
