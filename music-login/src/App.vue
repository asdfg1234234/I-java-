<template>
  <div class="login-page">
    <!-- 古风山河 + 日月轮转背景 -->
    <SceneBackground />

    <!-- 顶部暗角，突出登录卡片 -->
    <div class="vignette"></div>

    <!-- 飘动的音符，点明音乐主题 -->
    <div class="notes">
      <span class="note n1">♪</span>
      <span class="note n2">♫</span>
      <span class="note n3">♩</span>
      <span class="note n4">♬</span>
      <span class="note n5">♪</span>
    </div>

    <!-- 登录卡片 -->
    <LoginCard />
  </div>
</template>

<script setup>
import SceneBackground from './components/SceneBackground.vue'
import LoginCard from './components/LoginCard.vue'
</script>

<style scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    120% 80% at 50% 42%,
    transparent 38%,
    rgba(8, 10, 25, 0.5) 100%
  );
}

.notes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.note {
  position: absolute;
  bottom: -40px;
  color: rgba(255, 245, 220, 0.55);
  font-size: 26px;
  text-shadow: 0 0 12px rgba(255, 220, 150, 0.5);
  animation: floatUp linear infinite;
}

.n1 { left: 12%; font-size: 22px; animation-duration: 14s; animation-delay: 0s; }
.n2 { left: 28%; font-size: 30px; animation-duration: 18s; animation-delay: 3s; }
.n3 { left: 52%; font-size: 24px; animation-duration: 16s; animation-delay: 6s; }
.n4 { left: 70%; font-size: 32px; animation-duration: 20s; animation-delay: 2s; }
.n5 { left: 86%; font-size: 20px; animation-duration: 15s; animation-delay: 8s; }

@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-105vh) rotate(25deg); opacity: 0; }
}
</style>
