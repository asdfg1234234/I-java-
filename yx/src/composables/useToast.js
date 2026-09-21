import { ref } from 'vue'

// 全局 Toast 状态（单例），任意组件调用 show() 即可
const message = ref('')
const visible = ref(false)
let timer = null

export function useToast() {
  function show(msg, ms = 2200) {
    message.value = msg
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, ms)
  }
  return { message, visible, show }
}
