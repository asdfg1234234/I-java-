<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { initParticles } from '../composables/useParticles'

const canvas = ref(null)
let stop = null

onMounted(() => {
  stop = initParticles(canvas.value)
})
onBeforeUnmount(() => {
  if (stop) stop()
})
</script>

<template>
  <div class="stage">
    <div class="poster">
      <img class="poster-img" src="/poster.png" alt="游戏角色海报" />
    </div>
    <div class="poster-flow"></div>
    <canvas id="particles" ref="canvas"></canvas>
    <div class="stage-mask"></div>
  </div>
</template>
