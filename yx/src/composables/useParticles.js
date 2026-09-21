// 粒子散射系统：从角色中心径向向外飘散 / 旋转 / 渐隐 / 循环
// 移植自原 app.js，封装为可复用的初始化函数
export function initParticles(canvas) {
  if (!canvas) return { stop() {} }
  const ctx = canvas.getContext('2d')
  let W = 0
  let H = 0
  const DPR = Math.min(window.devicePixelRatio || 1, 2)
  const COLORS = [
    'rgba(120,230,255,1)',
    'rgba(168,85,247,1)',
    'rgba(255,255,255,1)',
    'rgba(120,255,210,1)'
  ]
  const particles = []
  const MAX = 150
  let rafId = 0

  function resize() {
    const r = canvas.getBoundingClientRect()
    W = r.width
    H = r.height
    canvas.width = Math.max(1, Math.floor(W * DPR))
    canvas.height = Math.max(1, Math.floor(H * DPR))
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  }

  function spawn(initial) {
    const cx = W * 0.5
    const cy = H * 0.46
    const fromCenter = Math.random() < 0.8
    const ang = Math.random() * Math.PI * 2
    const radius = fromCenter ? Math.random() * 40 : 120 + Math.random() * 180
    const x = cx + Math.cos(ang) * radius
    const y = cy + Math.sin(ang) * radius * 0.8
    const speed = 0.25 + Math.random() * 1.1
    const maxLife = 120 + Math.random() * 160
    particles.push({
      x,
      y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - 0.15,
      size: 0.8 + Math.random() * 2.2,
      life: initial ? Math.random() * maxLife : maxLife,
      maxLife,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      drift: (Math.random() - 0.5) * 0.01
    })
  }

  function init() {
    resize()
    particles.length = 0
    for (let i = 0; i < MAX; i++) spawn(true)
  }

  function frame() {
    ctx.clearRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vx += p.drift
      p.vy -= 0.002
      p.rot += p.rotSpeed
      p.life--
      if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
        particles.splice(i, 1)
        if (particles.length < MAX) spawn(false)
        continue
      }
      const a = Math.max(0, p.life / p.maxLife)
      const alpha = a < 0.2 ? a * 5 : a > 0.8 ? (1 - a) * 5 : 1

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2)
      g.addColorStop(0, p.color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalAlpha = Math.min(1, alpha) * 0.9
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.strokeStyle = p.color
      ctx.lineWidth = 0.8
      ctx.globalAlpha = Math.min(1, alpha) * 0.7
      const s = p.size * 2.4
      ctx.beginPath()
      ctx.moveTo(-s, 0)
      ctx.lineTo(s, 0)
      ctx.moveTo(0, -s)
      ctx.lineTo(0, s)
      ctx.stroke()
      ctx.restore()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    rafId = requestAnimationFrame(frame)
  }

  function onResize() {
    resize()
  }

  window.addEventListener('resize', onResize)
  init()
  rafId = requestAnimationFrame(frame)

  return {
    stop() {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }
}
