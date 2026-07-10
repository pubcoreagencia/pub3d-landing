const $ = (s, p = document) => p.querySelector(s);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.brand').forEach((brand, index) => {
  const image = document.createElement('img');
  image.className = 'brand-logo';
  image.src = 'assets/pub-logo-transparent.png';
  image.alt = 'PUB 3D';
  image.width = 1536;
  image.height = 1024;
  brand.replaceChildren(image);
  if (index === 0) brand.setAttribute('aria-label', 'PUB 3D, início');
});
const finalCta = $('.final-cta');
if (finalCta?.tagName === 'SECTION') { const region = document.createElement('div'); region.className = finalCta.className; region.setAttribute('role', 'region'); region.setAttribute('aria-label', 'Próximos passos'); region.innerHTML = finalCta.innerHTML; finalCta.replaceWith(region); }
const nav = $('#nav'), toggle = $('.menu-toggle');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', !open); nav.classList.toggle('open', !open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
$('#year').textContent = new Date().getFullYear();
document.querySelectorAll('form').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault(); const utms = new URLSearchParams(location.search); const fields = [...new FormData(form).entries()].filter(([,v]) => v); ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(key => { if (utms.get(key)) fields.push([key, utms.get(key)]); }); const body = fields.map(([k,v]) => `${k}: ${v}`).join('\n'); const result = $('.form-result', form); const phone = window.PUB3D?.contact?.whatsapp; if (phone) { location.href = `https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(body)}`; return; } result.textContent = 'Dados organizados. Defina o WhatsApp ou um endpoint seguro para concluir o envio.'; navigator.clipboard?.writeText(body).catch(()=>{});
}));
if (!reduced) {
  const canvas = $('#hero-canvas'), ctx = canvas.getContext('2d'); let w, h, raf, t = 0;
  const resize = () => { w = canvas.width = canvas.offsetWidth * Math.min(devicePixelRatio, 1.5); h = canvas.height = canvas.offsetHeight * Math.min(devicePixelRatio, 1.5); ctx.scale(Math.min(devicePixelRatio,1.5), Math.min(devicePixelRatio,1.5)); w = canvas.offsetWidth; h = canvas.offsetHeight; };
  function box(x,y,s,depth,off) { ctx.save(); ctx.translate(x,y); ctx.rotate(-.42); for(let i=0;i<5;i++){const z=i*depth/5+off;ctx.fillStyle=`rgba(${220-i*18},${48+i*8},${27+i*8},${.75-i*.09})`;ctx.fillRect(-s/2+z*.28,-s/2-z*.12,s,s*.72);ctx.strokeStyle='rgba(255,232,218,.28)';ctx.lineWidth=1;ctx.strokeRect(-s/2+z*.28,-s/2-z*.12,s,s*.72)}ctx.restore(); }
  function draw(){ctx.clearRect(0,0,w,h); const sy=Math.min(window.scrollY,800); const px=w*.73+Math.sin(t*.0004)*18, py=h*.52-sy*.06; ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;for(let i=-8;i<9;i++){ctx.beginPath();ctx.moveTo(px+i*28,py-190);ctx.lineTo(px+i*42,py+200);ctx.stroke()} box(px,py,Math.min(w*.25,290),92,Math.sin(t*.001)*12); ctx.fillStyle='rgba(245,238,224,.75)';ctx.font='11px monospace';ctx.fillText('LAYER INDEX / '+String(Math.round((sy/800)*100)).padStart(3,'0'),px-125,py+190);t+=16;raf=requestAnimationFrame(draw)}
  resize(); addEventListener('resize', resize, {passive:true}); draw(); document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else draw()});
}
