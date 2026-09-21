<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from '../composables/useToast'

const props = defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits(['close'])
const { show: toast } = useToast()

const phone = ref('')
const code = ref('')
const phoneErr = ref('')
const countdown = ref(0)
let timer = null

const isPhone = (v) => /^1[3-9]\d{9}$/.test(v)

// 打开时重置表单
watch(
  () => props.show,
  (v) => {
    if (v) {
      phone.value = ''
      code.value = ''
      phoneErr.value = ''
    }
  }
)

function sendCode() {
  if (!isPhone(phone.value.trim())) {
    phoneErr.value = '请输入正确的手机号'
    return
  }
  phoneErr.value = ''
  toast('验证码已发送，请注意查收')
  let n = 60
  countdown.value = n
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    n--
    countdown.value = n
    if (n <= 0) {
      clearInterval(timer)
      timer = null
      countdown.value = 0
    }
  }, 1000)
}

function onLogin() {
  if (!isPhone(phone.value.trim())) {
    phoneErr.value = '请输入正确的手机号'
    return
  }
  if (!/^\d{4,6}$/.test(code.value.trim())) {
    phoneErr.value = '请输入正确的短信验证码'
    return
  }
  phoneErr.value = ''
  toast('登录成功，正在进入游戏…')
  setTimeout(() => emit('close'), 900)
}

function onKeydown(e) {
  if (e.key === 'Escape' && props.show) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="modal" :class="{ show }" @click.self="emit('close')">
    <div class="modal-panel">
      <button class="close" type="button" aria-label="关闭" @click="emit('close')">×</button>
      <div class="title">手机号登录</div>

      <div class="field" :class="{ invalid: !!phoneErr }">
        <label>手机号</label>
        <div class="control">
          <span class="prefix">+86</span>
          <input v-model="phone" type="tel" maxlength="11" placeholder="请输入手机号" />
        </div>
        <div class="error">{{ phoneErr }}</div>
      </div>

      <div class="field">
        <label>短信验证码</label>
        <div class="control">
          <input v-model="code" type="text" maxlength="6" placeholder="请输入验证码" />
          <button class="btn-code" type="button" :disabled="countdown > 0" @click="sendCode">
            {{ countdown > 0 ? countdown + 's' : '获取验证码' }}
          </button>
        </div>
      </div>

      <button class="btn btn-primary" type="button" style="width: 100%; margin-top: 8px" @click="onLogin">
        登 录
      </button>
    </div>
  </div>
</template>
