/* =========================================================
   游戏登录 / 注册  ·  交互与动效脚本
   - 粒子散射动画（角色向外飘散 / 旋转 / 渐隐 / 循环）
   - 登录入口处理（微信 / QQ / 手机号）
   - 注册表单校验
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 通用 Toast ---------- */
  function toast(msg, ms) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), ms || 2200);
  }
  window.__toast = toast;

  /* =======================================================
     粒子散射系统
     ======================================================= */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["rgba(120,230,255,1)", "rgba(168,85,247,1)", "rgba(255,255,255,1)", "rgba(120,255,210,1)"];
    const particles = [];
    const MAX = 150;

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function spawn(initial) {
      // 80% 从角色中心径向向外飘散，20% 从中环升起
      const cx = W * 0.5, cy = H * 0.46;
      const fromCenter = Math.random() < 0.8;
      const ang = Math.random() * Math.PI * 2;
      const radius = fromCenter ? Math.random() * 40 : 120 + Math.random() * 180;
      const x = cx + Math.cos(ang) * radius;
      const y = cy + Math.sin(ang) * radius * 0.8;
      const speed = 0.25 + Math.random() * 1.1;
      const maxLife = 120 + Math.random() * 160;
      particles.push({
        x, y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - 0.15,        // 轻微上浮
        size: 0.8 + Math.random() * 2.2,
        life: initial ? Math.random() * maxLife : maxLife,
        maxLife,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        drift: (Math.random() - 0.5) * 0.01
      });
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < MAX; i++) spawn(true);
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx += p.drift; p.vy -= 0.002;        // 持续向外 + 缓缓上浮
        p.rot += p.rotSpeed;
        p.life--;
        if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
          particles.splice(i, 1);
          if (particles.length < MAX) spawn(false);
          continue;
        }
        const a = Math.max(0, p.life / p.maxLife);
        const alpha = a < 0.2 ? a * 5 : (a > 0.8 ? (1 - a) * 5 : 1); // 渐隐/渐显
        ctx.globalAlpha = Math.min(1, alpha) * 0.9;

        // 光晕核心
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2);
        g.addColorStop(0, p.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // 旋转十字星芒
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = Math.min(1, alpha) * 0.7;
        const s = p.size * 2.4;
        ctx.beginPath();
        ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
        ctx.moveTo(0, -s); ctx.lineTo(0, s);
        ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    init();
    requestAnimationFrame(frame);
  }

  /* =======================================================
     登录页：入口处理
     ======================================================= */
  const wechat = document.querySelector(".btn-wechat");
  const qq = document.querySelector(".btn-qq");
  const phoneLogin = document.querySelector(".btn-phone");

  if (wechat) wechat.addEventListener("click", () => toast("正在调起微信授权登录…"));
  if (qq) qq.addEventListener("click", () => toast("正在调起 QQ 授权登录…"));

  // 顶部“用户名 + 密码”登录
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("loginUser").value.trim();
      const p = document.getElementById("loginPwd").value;
      if (!u) { toast("请输入用户名或手机号"); return; }
      if (!p) { toast("请输入密码"); return; }
      if (p.length < 6) { toast("密码长度至少 6 位"); return; }
      toast("登录成功，正在进入游戏…");
    });
  }

  // 简单图标入口：QQ / 微信
  const iconWechat = document.getElementById("iconWechat");
  const iconQQ = document.getElementById("iconQQ");
  const iconPhone = document.getElementById("iconPhone");
  if (iconWechat) iconWechat.addEventListener("click", () => toast("正在调起微信授权登录…"));
  if (iconQQ) iconQQ.addEventListener("click", () => toast("正在调起 QQ 授权登录…"));

  // 手机号登录：弹出内联登录面板（手机号 + 短信验证码）
  const modal = document.getElementById("phoneModal");
  const modalClose = document.getElementById("modalClose");
  const modalGet = document.getElementById("modalGetCode");
  const modalLogin = document.getElementById("modalLogin");
  const modalPhone = document.getElementById("modalPhone");
  const modalCode = document.getElementById("modalCode");
  const modalPhoneErr = document.getElementById("modalPhoneErr");

  if (modal) {
    const open = () => modal.classList.add("show");
    const close = () => modal.classList.remove("show");
    if (phoneLogin) phoneLogin.addEventListener("click", open);
    if (iconPhone) iconPhone.addEventListener("click", open);
    if (modalClose) modalClose.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    const isPhone = (v) => /^1[3-9]\d{9}$/.test(v);
    if (modalGet) modalGet.addEventListener("click", () => {
      if (!isPhone(modalPhone.value.trim())) {
        modalPhoneErr.style.display = "block";
        modalPhoneErr.textContent = "请输入正确的手机号";
        return;
      }
      modalPhoneErr.style.display = "none";
      let n = 60; modalGet.disabled = true;
      modalGet.textContent = n + "s";
      toast("验证码已发送，请注意查收");
      const t = setInterval(() => {
        n--; modalGet.textContent = n + "s";
        if (n <= 0) { clearInterval(t); modalGet.disabled = false; modalGet.textContent = "获取验证码"; }
      }, 1000);
    });
    if (modalLogin) modalLogin.addEventListener("click", () => {
      if (!isPhone(modalPhone.value.trim())) { modalPhoneErr.style.display = "block"; modalPhoneErr.textContent = "请输入正确的手机号"; return; }
      if (!/^\d{4,6}$/.test(modalCode.value.trim())) { modalPhoneErr.style.display = "block"; modalPhoneErr.textContent = "请输入正确的短信验证码"; return; }
      modalPhoneErr.style.display = "none";
      toast("登录成功，正在进入游戏…");
      setTimeout(close, 900);
    });
  }

  /* =======================================================
     注册页：校验逻辑
     ======================================================= */
  const regForm = document.getElementById("registerForm");
  if (regForm) {
    const phone = document.getElementById("regPhone");
    const code = document.getElementById("regCode");
    const pwd = document.getElementById("regPwd");
    const pwd2 = document.getElementById("regConfirm");
    const getCode = document.getElementById("btnGetCode");
    const submit = document.getElementById("btnRegister");
    const meter = document.querySelector(".password-meter");

    const fldPhone = document.getElementById("fldPhone");
    const fldPwd = document.getElementById("fldPwd");
    const fldPwd2 = document.getElementById("fldPwd2");

    const isPhone = (v) => /^1[3-9]\d{9}$/.test(v);

    // 密码规则：6—15位，含大写 + 小写 + 数字，不允许空格
    function passwordErrors(v) {
      const errs = [];
      if (!v) { errs.push("请输入密码"); return errs; }
      if (v.length < 6 || v.length > 15) errs.push("密码长度需为6—15位");
      if (/\s/.test(v)) errs.push("密码不能包含空格");
      const hasUp = /[A-Z]/.test(v);
      const hasLow = /[a-z]/.test(v);
      const hasNum = /\d/.test(v);
      if (!hasUp || !hasLow || !hasNum) errs.push("密码必须包含大写字母、小写字母和数字");
      return errs;
    }

    function strength(v) {
      if (!v) return 0;
      let s = 0;
      if (v.length >= 6 && v.length <= 15) s++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)) s++;
      if (s === 2 && !/\s/.test(v)) s++;
      return s;
    }

    function setError(field, msg) {
      field.classList.add("invalid");
      field.classList.remove("valid");
      const e = field.querySelector(".error");
      if (e && msg) e.textContent = msg;
    }
    function clearError(field) {
      field.classList.remove("invalid");
    }
    function setValid(field) {
      field.classList.remove("invalid");
      field.classList.add("valid");
    }

    pwd.addEventListener("input", () => {
      const v = pwd.value;
      const s = strength(v);
      if (meter) {
        const segs = meter.querySelectorAll("i");
        segs.forEach((seg, i) => {
          seg.className = "";
          if (i < s) seg.className = "on" + s;
        });
      }
      if (!v) { clearError(fldPwd); return; }
      const errs = passwordErrors(v);
      if (errs.length) setError(fldPwd, errs[0]);
      else setValid(fldPwd);
    });

    pwd2.addEventListener("input", () => {
      if (!pwd2.value) { clearError(fldPwd2); return; }
      if (pwd2.value !== pwd.value) setError(fldPwd2, "两次输入的密码不一致");
      else setValid(fldPwd2);
    });

    phone.addEventListener("input", () => {
      if (phone.value && isPhone(phone.value)) setValid(fldPhone);
      else clearError(fldPhone);
    });

    if (getCode) getCode.addEventListener("click", () => {
      if (!isPhone(phone.value.trim())) { setError(fldPhone, "请输入正确的手机号"); return; }
      clearError(fldPhone);
      let n = 60; getCode.disabled = true; getCode.textContent = n + "s";
      toast("验证码已发送，请注意查收");
      const t = setInterval(() => {
        n--; getCode.textContent = n + "s";
        if (n <= 0) { clearInterval(t); getCode.disabled = false; getCode.textContent = "获取验证码"; }
      }, 1000);
    });

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      let ok = true;

      if (!isPhone(phone.value.trim())) { setError(fldPhone, "请输入正确的手机号"); ok = false; }
      else setValid(fldPhone);

      if (!/^\d{4,6}$/.test(code.value.trim())) { setError(document.getElementById("fldCode"), "请输入正确的短信验证码"); ok = false; }
      else setValid(document.getElementById("fldCode"));

      const perrs = passwordErrors(pwd.value);
      if (perrs.length) { setError(fldPwd, perrs[0]); ok = false; }
      else setValid(fldPwd);

      if (pwd2.value !== pwd.value) { setError(fldPwd2, "两次输入的密码不一致"); ok = false; }
      else if (pwd2.value) setValid(fldPwd2);

      if (!ok) { toast("请检查表单填写"); return; }

      // 模拟注册成功
      submit.disabled = true;
      submit.textContent = "注册中…";
      toast("注册成功，即将跳转登录页");
      setTimeout(() => { window.location.href = "index.html"; }, 1100);
    });
  }
})();
