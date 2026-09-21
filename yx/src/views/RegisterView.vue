<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const { show: toast } = useToast()
const router = useRouter()

const phone = ref('')
const code = ref('')
const pwd = ref('')
const pwd2 = ref('')

// 每个字段的状态：'' / 'valid' / 'invalid' + 错误文案
const phoneState = ref('')
const phoneErr = ref('')
const codeState = ref('')
const codeErr = ref('')
const pwdState = ref('')
const pwdErr = ref('')
const pwd2State = ref('')
const pwd2Err = ref('')

const strengthLevel = ref(0)
const countdown = ref(0)
const submitting = ref(false)
let timer = null

const isPhone = (v) => /^1[3-9]\d{9}$/.test(v)

// 密码规则：6—15位，含大写 + 小写 + 数字，不允许空格
function passwordErrors(v) {
  const errs = []
  if (!v) return ['请输入密码']
  if (v.length < 6 || v.length > 15) errs.push('密码长度需为6—15位')
  if (/\s/.test(v)) errs.push('密码不能包含空格')
  const hasUp = /[A-Z]/.test(v)
  const hasLow = /[a-z]/.test(v)
  const hasNum = /\d/.test(v)
  if (!hasUp || !hasLow || !hasNum) errs.push('密码必须包含大写字母、小写字母和数字')
  return errs
}

function strength(v) {
  if (!v) return 0
  let s = 0
  if (v.length >= 6 && v.length <= 15) s++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)) s++
  if (s === 2 && !/\s/.test(v)) s++
  return s
}

function onPwdInput() {
  strengthLevel.value = strength(pwd.value)
  if (!pwd.value) {
    pwdState.value = ''
    pwdErr.value = ''
    return
  }
  const errs = passwordErrors(pwd.value)
  if (errs.length) {
    pwdState.value = 'invalid'
    pwdErr.value = errs[0]
  } else {
    pwdState.value = 'valid'
    pwdErr.value = ''
  }
  // 密码变化时同步校验确认密码
  if (pwd2.value) onPwd2Input()
}

function onPwd2Input() {
  if (!pwd2.value) {
    pwd2State.value = ''
    pwd2Err.value = ''
    return
  }
  if (pwd2.value !== pwd.value) {
    pwd2State.value = 'invalid'
    pwd2Err.value = '两次输入的密码不一致'
  } else {
    pwd2State.value = 'valid'
    pwd2Err.value = ''
  }
}

function onPhoneInput() {
  if (phone.value && isPhone(phone.value)) {
    phoneState.value = 'valid'
    phoneErr.value = ''
  } else {
    phoneState.value = ''
    phoneErr.value = ''
  }
}

function sendCode() {
  if (!isPhone(phone.value.trim())) {
    phoneState.value = 'invalid'
    phoneErr.value = '请输入正确的手机号'
    return
  }
  phoneState.value = 'valid'
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

function onCodeInput() {
  if (codeState.value === 'invalid') {
    codeState.value = ''
    codeErr.value = ''
  }
}

function onSubmit(e) {
  e.preventDefault()
  let ok = true

  if (!isPhone(phone.value.trim())) {
    phoneState.value = 'invalid'
    phoneErr.value = '请输入正确的手机号'
    ok = false
  } else {
    phoneState.value = 'valid'
    phoneErr.value = ''
  }

  if (!/^\d{4,6}$/.test(code.value.trim())) {
    codeState.value = 'invalid'
    codeErr.value = '请输入正确的短信验证码'
    ok = false
  } else {
    codeState.value = 'valid'
    codeErr.value = ''
  }

  const perrs = passwordErrors(pwd.value)
  if (perrs.length) {
    pwdState.value = 'invalid'
    pwdErr.value = perrs[0]
    ok = false
  } else {
    pwdState.value = 'valid'
    pwdErr.value = ''
  }

  if (pwd2.value !== pwd.value) {
    pwd2State.value = 'invalid'
    pwd2Err.value = '两次输入的密码不一致'
    ok = false
  } else if (pwd2.value) {
    pwd2State.value = 'valid'
    pwd2Err.value = ''
  }

  if (!ok) {
    toast('请检查表单填写')
    return
  }

  submitting.value = true
  toast('注册成功，即将跳转登录页')
  setTimeout(() => {
    router.push('/login')
  }, 1100)
}
</script>

<template>
  <div class="screen">
    <div class="panel">
      <div class="brand">
        <div class="logo">幻</div>
        <div>
          <h1>创建账号</h1>
          <div class="sub">JOIN THE FANTASY REALM</div>
        </div>
      </div>

      <div class="title">注册你的游戏账号</div>

      <form id="registerForm" novalidate @submit="onSubmit">
        <div class="field" :class="phoneState" id="fldPhone">
          <label>手机号</label>
          <div class="control">
            <span class="prefix">+86</span>
            <input v-model="phone" type="tel" maxlength="11" placeholder="请输入手机号" autocomplete="off" @input="onPhoneInput" />
          </div>
          <div class="error">{{ phoneErr }}</div>
        </div>

        <div class="field" :class="codeState" id="fldCode">
          <label>短信验证码</label>
          <div class="control">
            <input v-model="code" type="text" maxlength="6" placeholder="请输入验证码" autocomplete="off" @input="onCodeInput" />
            <button class="btn-code" type="button" :disabled="countdown > 0" @click="sendCode">
              {{ countdown > 0 ? countdown + 's' : '获取验证码' }}
            </button>
          </div>
          <div class="error">{{ codeErr }}</div>
        </div>

        <div class="field" :class="pwdState" id="fldPwd">
          <label>密码</label>
          <div class="control">
            <input v-model="pwd" type="password" maxlength="15" placeholder="请设置登录密码" autocomplete="new-password" @input="onPwdInput" />
          </div>
          <div class="hint">密码需为6—15位，且同时包含大写字母、小写字母和数字。</div>
          <div class="password-meter">
            <i v-for="i in 3" :key="i" :class="strengthLevel >= i ? 'on' + strengthLevel : ''"></i>
          </div>
          <div class="error">{{ pwdErr }}</div>
        </div>

        <div class="field" :class="pwd2State" id="fldPwd2">
          <label>确认密码</label>
          <div class="control">
            <input v-model="pwd2" type="password" maxlength="15" placeholder="请再次输入密码" autocomplete="new-password" @input="onPwd2Input" />
          </div>
          <div class="error">{{ pwd2Err }}</div>
        </div>

        <button class="btn btn-primary" type="submit" style="width: 100%; margin-top: 6px" :disabled="submitting">
          {{ submitting ? '注册中…' : '注 册' }}
        </button>
      </form>

      <div class="inline-link">
        已有账号？<router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>
</template>
