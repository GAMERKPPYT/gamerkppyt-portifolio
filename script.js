const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .tech-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function makeParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.5 + 0.1
  };
}

for (let i = 0; i < 80; i++) particles.push(makeParticle());

function drawCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
    ctx.fill();
  });
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawCanvas);
}
drawCanvas();

const codeLines = [
  '<span class="kw">const</span> <span class="var">dev</span> = {',
  '  <span class="key">name</span>:     <span class="str">"GAMERKPPYT"</span>,',
  '  <span class="key">role</span>:     <span class="str">"Full Stack Dev"</span>,',
  '  <span class="key">location</span>: <span class="str">"Brazil 🇧🇷"</span>,',
  '  <span class="key">stack</span>: [',
  '    <span class="str">"Ruby"</span>, <span class="str">"Go"</span>, <span class="str">"Python"</span>,',
  '    <span class="str">"Node.js"</span>, <span class="str">"C#"</span>, <span class="str">"C++"</span>,',
  '    <span class="str">"JS"</span>, <span class="str">"HTML"</span>, <span class="str">"CSS"</span>',
  '  ],',
  '  <span class="key">available</span>: <span class="bool">true</span>,',
  '}',
  '',
  '<span class="kw">export default</span> dev',
];

const typedEl = document.getElementById('typed-code');
let lineIdx = 0;

function typeLine() {
  if (lineIdx >= codeLines.length) {
    typedEl.innerHTML = codeLines.join('\n') + '\n<span class="caret">█</span>';
    return;
  }
  typedEl.innerHTML = codeLines.slice(0, lineIdx + 1).join('\n') + '\n<span class="caret">█</span>';
  lineIdx++;
  setTimeout(typeLine, 80);
}
setTimeout(typeLine, 700);

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const selected = tab.dataset.tab;
    document.querySelectorAll('.tech-card').forEach(card => {
      if (selected === 'all' || card.dataset.tab === selected) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

document.querySelectorAll('.tech-card').forEach(card => {
  const color = card.dataset.color;
  if (color) {
    const r = parseInt(color.slice(1,3),16);
    const g = parseInt(color.slice(3,5),16);
    const b = parseInt(color.slice(5,7),16);
    card.style.setProperty('--tc-color', color);
    card.style.setProperty('--tc-glow', `rgba(${r},${g},${b},0.1)`);
    card.style.setProperty('--tc-border', `rgba(${r},${g},${b},0.3)`);
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-main, .project-side, .stack-section h2, .contact-section h2, .contact-card, .feature').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

const langObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(fill => fill.classList.add('visible'));
    }
  });
}, { threshold: 0.3 });

const heroEl = document.querySelector('.hero');
if (heroEl) langObserver.observe(heroEl);

document.getElementById('yr').textContent = new Date().getFullYear();
