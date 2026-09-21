<script setup>
import PosterStage from './components/PosterStage.vue'
import ToastHost from './components/ToastHost.vue'
</script>

<template>
  <!-- 全局背景：角色海报 + 流动光效 + 粒子（登录/注册两页共享） -->
  <PosterStage />

  <!-- 路由页：登录 / 注册 面板 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- 全局 Toast -->
  <ToastHost />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
