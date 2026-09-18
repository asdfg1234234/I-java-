<template>
  <div class="card-wrap">
    <div class="card">
      <!-- 印章式标题 -->
      <div class="brand">
        <div class="seal">听</div>
        <div class="brand-text">
          <h1 class="title">听风吟</h1>
          <p class="subtitle">古韵流音 · 登录听风</p>
        </div>
      </div>

      <p class="poem">泠泠七弦上，静听松风寒</p>

      <form class="form" @submit.prevent="onLogin">
        <div class="field" :class="{ active: account }">
          <span class="ico">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
              />
            </svg>
          </span>
          <input v-model="account" type="text" placeholder="请输入账号 / 手机号" />
        </div>

        <div class="field" :class="{ active: password }">
          <span class="ico">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5zM12 14v3"
              />
            </svg>
          </span>
          <input v-model="password" type="password" placeholder="请输入密码" />
        </div>

        <div class="row">
          <label class="remember">
            <input v-model="remember" type="checkbox" />
            <span>记住此客</span>
          </label>
          <a class="link" @click="toast('已托飞鸽传书，请查收')">忘了暗号？</a>
        </div>

        <button class="btn-login" type="submit">登 录 入 座</button>
      </form>

      <div class="divider"><span>其他方式</span></div>

      <div class="others">
        <button class="oauth wx" title="微信登录" @click="oauth('微信')">
          <span>微</span>
        </button>
        <button class="oauth qq" title="QQ 登录" @click="oauth('QQ')">
          <span>Q</span>
        </button>
        <button class="oauth wb" title="微博登录" @click="oauth('微博')">
          <span>博</span>
        </button>
      </div>

      <p class="signup">
        新来客？<a @click="toast('请移步前台，登记入册')">邀您入座 · 注册</a>
      </p>
    </div>

    <transition name="fade">
      <div v-if="msg" class="toast">{{ msg }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const account = ref('')
const password = ref('')
const remember = ref(true)
const msg = ref('')
let timer = null

function toast(text) {
  msg.value = text
  clearTimeout(timer)
  timer = setTimeout(() => (msg.value = ''), 2200)
}

function onLogin() {
  if (!account.value.trim()) return toast('请先告知尊号')
  if (!password.value.trim()) return toast('暗号尚未落笔')
  toast(`正在为您拨弦入境，${account.value}…`)
}

function oauth(name) {
  toast(`已唤起${name}登录`)
}
</script>

<style scoped>
.card-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.card {
  width: 380px;
  max-width: calc(100vw - 40px);
  padding: 38px 34px 30px;
  border-radius: 18px;
  background: rgba(22, 17, 32, 0.46);
  border: 1px solid rgba(255, 240, 210, 0.22);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  color: #f5efe2;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.seal {
  width: 52px;
  height: 52px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-family: 'Ma Shan Zheng', 'STKaiti', serif;
  font-size: 30px;
  color: #fff;
  background: linear-gradient(135deg, #b23a2e, #8c241c);
  box-shadow: 0 6px 16px rgba(178, 58, 46, 0.45),
    inset 0 0 0 2px rgba(255, 230, 210, 0.5);
}
.brand-text { line-height: 1.1; }
.title {
  font-family: 'Ma Shan Zheng', 'STKaiti', serif;
  font-size: 34px;
  letter-spacing: 4px;
  color: #f7e9cf;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}
.subtitle {
  margin-top: 4px;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(245, 239, 226, 0.7);
}

.poem {
  margin: 16px 0 22px;
  font-size: 13px;
  letter-spacing: 1px;
  color: rgba(245, 239, 226, 0.55);
  text-align: center;
}

.form { display: flex; flex-direction: column; gap: 16px; }

.field {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 240, 210, 0.16);
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
}
.field.active,
.field:focus-within {
  border-color: rgba(255, 196, 120, 0.7);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(255, 196, 120, 0.12);
}
.ico { color: rgba(245, 239, 226, 0.6); display: flex; }
.field input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f5efe2;
  font-size: 15px;
  letter-spacing: 0.5px;
}
.field input::placeholder { color: rgba(245, 239, 226, 0.4); }

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(245, 239, 226, 0.7);
}
.remember { display: flex; align-items: center; gap: 7px; cursor: pointer; }
.remember input { accent-color: #c75b3f; width: 15px; height: 15px; }
.link { color: rgba(255, 210, 160, 0.85); cursor: pointer; }
.link:hover { text-decoration: underline; }

.btn-login {
  margin-top: 4px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  letter-spacing: 6px;
  color: #fff7ec;
  cursor: pointer;
  background: linear-gradient(135deg, #c0473a, #9a2c22);
  box-shadow: 0 10px 24px rgba(154, 44, 34, 0.45);
  transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
}
.btn-login:hover {
  filter: brightness(1.08);
  box-shadow: 0 14px 30px rgba(154, 44, 34, 0.6);
}
.btn-login:active { transform: translateY(1px) scale(0.99); }

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0 16px;
  color: rgba(245, 239, 226, 0.45);
  font-size: 12px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 240, 210, 0.3), transparent);
}

.others { display: flex; justify-content: center; gap: 20px; }
.oauth {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 240, 210, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-family: 'Ma Shan Zheng', 'STKaiti', serif;
  font-size: 19px;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.2s;
}
.oauth span { display: grid; place-items: center; }
.oauth.wx { background: linear-gradient(135deg, #3eb13e, #2c8f2c); }
.oauth.qq { background: linear-gradient(135deg, #4a9bf5, #2f7fe0); }
.oauth.wb { background: linear-gradient(135deg, #e0722f, #c4541c); }
.oauth:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}

.signup {
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: rgba(245, 239, 226, 0.6);
}
.signup a {
  color: rgba(255, 210, 160, 0.9);
  cursor: pointer;
  margin-left: 2px;
}
.signup a:hover { text-decoration: underline; }

.toast {
  position: fixed;
  left: 50%;
  bottom: 42px;
  transform: translateX(-50%);
  padding: 11px 22px;
  border-radius: 999px;
  background: rgba(20, 16, 30, 0.82);
  border: 1px solid rgba(255, 240, 210, 0.25);
  color: #f5efe2;
  font-size: 14px;
  letter-spacing: 1px;
  backdrop-filter: blur(8px);
  z-index: 50;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
