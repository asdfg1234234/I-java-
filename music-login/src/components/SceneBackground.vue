<template>
  <div class="scene">
    <!-- 三层天空：昼 / 暮 / 夜 交叉淡入淡出 -->
    <div class="sky sky-day"></div>
    <div class="sky sky-dusk"></div>
    <div class="sky sky-night"></div>

    <!-- 山河 + 日月 + 云 + 飞鸟 -->
    <svg
      class="landscape"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff7da" />
          <stop offset="45%" stop-color="#ffd874" />
          <stop offset="100%" stop-color="#ffb347" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fbfdff" />
          <stop offset="55%" stop-color="#d6e1ff" />
          <stop offset="100%" stop-color="#aab8e8" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a3556" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#101733" />
        </linearGradient>
      </defs>

      <!-- 太阳：沿椭圆轨道运行，白天段可见 -->
      <g>
        <circle r="92" fill="#ffd87a" opacity="0.28" />
        <circle r="54" fill="url(#sunGlow)" />
        <animateMotion
          dur="24s"
          repeatCount="indefinite"
          rotate="0"
          path="M120,560 A600,540 0 0 1 1320,560 A600,540 0 0 1 120,560"
        />
        <animate
          attributeName="opacity"
          values="1;1;0;0"
          keyTimes="0;0.5;0.5;1"
          dur="24s"
          repeatCount="indefinite"
        />
      </g>

      <!-- 月亮：与太阳相差半周期，夜晚段可见（日月轮转） -->
      <g>
        <circle r="80" fill="#aebfe8" opacity="0.22" />
        <circle r="48" fill="url(#moonGlow)" />
        <animateMotion
          dur="24s"
          begin="-12s"
          repeatCount="indefinite"
          rotate="0"
          path="M120,560 A600,540 0 0 1 1320,560 A600,540 0 0 1 120,560"
        />
        <animate
          attributeName="opacity"
          values="1;1;0;0"
          keyTimes="0;0.5;0.5;1"
          dur="24s"
          begin="-12s"
          repeatCount="indefinite"
        />
      </g>

      <!-- 夜晚星河：仅在夜段浮现，并稀疏眨眼 -->
      <g class="stars" fill="#fff7e6">
        <circle cx="120" cy="90" r="1.8" />
        <circle cx="220" cy="160" r="1.3" />
        <circle cx="340" cy="70" r="2.1">
          <animate attributeName="opacity" values="1;0.2;1" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="460" cy="200" r="1.5" />
        <circle cx="560" cy="110" r="1.9">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="680" cy="60" r="1.4" />
        <circle cx="780" cy="180" r="2.0" />
        <circle cx="880" cy="90" r="1.6">
          <animate attributeName="opacity" values="1;0.25;1" dur="3.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="1000" cy="150" r="1.3" />
        <circle cx="1120" cy="70" r="2.0" />
        <circle cx="1220" cy="200" r="1.5" />
        <circle cx="1300" cy="120" r="1.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="4.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="1380" cy="90" r="1.4" />
        <circle cx="60" cy="210" r="1.6" />
        <circle cx="420" cy="260" r="1.2" />
        <circle cx="940" cy="230" r="1.7">
          <animate attributeName="opacity" values="1;0.3;1" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes="0;0.5;0.58;0.86;0.94;1"
          dur="24s"
          repeatCount="indefinite"
        />
      </g>

      <!-- 飘云 -->
      <g class="clouds" fill="#ffffff" opacity="0.16">
        <g>
          <ellipse cx="200" cy="180" rx="120" ry="22" />
          <ellipse cx="300" cy="165" rx="80" ry="18" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-200 0"
            to="500 0"
            dur="60s"
            repeatCount="indefinite"
          />
        </g>
        <g>
          <ellipse cx="900" cy="120" rx="150" ry="20" />
          <ellipse cx="1020" cy="108" rx="90" ry="16" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-600 0"
            dur="80s"
            repeatCount="indefinite"
          />
        </g>
      </g>

      <!-- 远山（最浅、最高、最后） -->
      <path
        class="mtn mtn-far"
        d="M0,520 C200,470 360,560 560,500 C760,450 980,540 1180,490 C1320,460 1440,520 1440,520 L1440,900 L0,900 Z"
      />

      <!-- 中山 -->
      <path
        class="mtn mtn-mid"
        d="M0,620 C240,560 420,650 640,592 C880,540 1080,648 1320,588 C1400,566 1440,612 1440,612 L1440,900 L0,900 Z"
      />

      <!-- 近山（最深、最低、最前） -->
      <path
        class="mtn mtn-near"
        d="M0,712 C220,660 380,734 600,690 C840,646 1040,738 1260,690 C1360,666 1440,706 1440,706 L1440,824 L0,824 Z"
      />

      <!-- 水面 -->
      <rect x="0" y="820" width="1440" height="80" fill="url(#water)" />

      <!-- 飞鸟 -->
      <g class="birds" stroke="#3a2f25" stroke-width="2.5" fill="none" opacity="0.5">
        <path d="M0,0 q8,-9 16,0 q8,-9 16,0">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="150 250"
            to="1300 180"
            dur="38s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M0,0 q7,-8 14,0 q7,-8 14,0">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="300 300"
            to="1250 240"
            dur="46s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M0,0 q6,-7 12,0 q6,-7 12,0">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="500 220"
            to="1200 150"
            dur="42s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>

    <!-- 流动云雾：营造山河在云雾中转换的意境 -->
    <div class="mist mist-a"></div>
    <div class="mist mist-b"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.sky {
  position: absolute;
  inset: 0;
  will-change: opacity;
}

.sky-day {
  background: linear-gradient(180deg, #7fb4e6 0%, #bfe0f5 55%, #eaf3f7 100%);
  animation: dayFade 24s linear infinite;
}

.sky-dusk {
  background: linear-gradient(180deg, #3a2c5a 0%, #c4633f 45%, #f0a85a 70%, #f6d9a0 100%);
  animation: duskFade 24s linear infinite;
}

.sky-night {
  background: linear-gradient(180deg, #070b22 0%, #141d44 50%, #26305c 100%);
  animation: nightFade 24s linear infinite;
}

.landscape {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: shade 24s linear infinite;
}

.mtn {
  will-change: transform;
}
.mtn-far {
  fill: #7d8aa8;
  opacity: 0.85;
  animation: driftFar 38s ease-in-out infinite alternate;
}
.mtn-mid {
  fill: #4f5d7d;
  animation: driftMid 30s ease-in-out infinite alternate;
}
.mtn-near {
  fill: #2c3656;
  animation: driftNear 24s ease-in-out infinite alternate;
}

.mist {
  position: absolute;
  left: -20%;
  right: -20%;
  height: 38%;
  pointer-events: none;
  mix-blend-mode: screen;
}
.mist-a {
  top: 46%;
  background: radial-gradient(60% 100% at 30% 50%, rgba(255, 250, 235, 0.18), transparent 70%);
  animation: mistA 26s ease-in-out infinite;
}
.mist-b {
  top: 60%;
  background: radial-gradient(55% 100% at 70% 50%, rgba(220, 230, 255, 0.14), transparent 70%);
  animation: mistB 34s ease-in-out infinite;
}

/* 昼夜：天空三层交叉淡入淡出 */
@keyframes dayFade {
  0% { opacity: 1; }
  48% { opacity: 1; }
  56% { opacity: 0; }
  88% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes nightFade {
  0% { opacity: 0; }
  50% { opacity: 0; }
  58% { opacity: 1; }
  86% { opacity: 1; }
  94% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes duskFade {
  0% { opacity: 0; }
  44% { opacity: 0; }
  50% { opacity: 1; }
  56% { opacity: 0; }
  86% { opacity: 0; }
  94% { opacity: 1; }
  100% { opacity: 0; }
}

/* 山体随昼夜变暗 */
@keyframes shade {
  0% { filter: brightness(1); }
  48% { filter: brightness(1); }
  58% { filter: brightness(0.55); }
  86% { filter: brightness(0.55); }
  94% { filter: brightness(0.85); }
  100% { filter: brightness(1); }
}

/* 山峦视差漂移，制造山河变换的流动感 */
@keyframes driftFar {
  from { transform: translateX(-14px); }
  to { transform: translateX(14px); }
}
@keyframes driftMid {
  from { transform: translateX(20px); }
  to { transform: translateX(-20px); }
}
@keyframes driftNear {
  from { transform: translateX(-28px); }
  to { transform: translateX(28px); }
}

/* 云雾流动 */
@keyframes mistA {
  0% { transform: translateX(-8%) scale(1); opacity: 0.5; }
  50% { transform: translateX(12%) scale(1.1); opacity: 0.9; }
  100% { transform: translateX(-8%) scale(1); opacity: 0.5; }
}
@keyframes mistB {
  0% { transform: translateX(10%) scale(1.05); opacity: 0.4; }
  50% { transform: translateX(-12%) scale(1); opacity: 0.8; }
  100% { transform: translateX(10%) scale(1.05); opacity: 0.4; }
}
</style>
