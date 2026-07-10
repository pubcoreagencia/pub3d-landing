import { reducedMotion, isCoarsePointer, states } from './config.js';

export class SceneController {
  constructor() {
    this.canvas = document.createElement('canvas'); this.canvas.id = 'narrative-canvas'; this.canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(this.canvas); this.ctx = this.canvas.getContext('2d'); this.state = states.topo; this.active = true; this.inViewport = true;
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 }; this.time = 0; this.frame = 0; this.resize = this.resize.bind(this); this.draw = this.draw.bind(this);
    this.resize(); addEventListener('resize', this.resize, { passive: true });
    if (!isCoarsePointer && !reducedMotion) addEventListener('pointermove', event => { this.pointer.tx = (event.clientX / innerWidth - .5); this.pointer.ty = (event.clientY / innerHeight - .5); }, { passive: true });
    document.addEventListener('visibilitychange', () => { this.inViewport = !document.hidden; if (this.inViewport) this.start(); });
    this.start();
  }
  resize() { const ratio = Math.min(devicePixelRatio || 1, isCoarsePointer ? 1.15 : 1.5); this.w = innerWidth; this.h = innerHeight; this.canvas.width = Math.round(this.w * ratio); this.canvas.height = Math.round(this.h * ratio); this.canvas.style.width = `${this.w}px`; this.canvas.style.height = `${this.h}px`; this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0); }
  setState(id) { if (!states[id]) return; this.state = states[id]; document.body.dataset.scene = this.state.mode; }
  start() { if (this.running || reducedMotion || !this.inViewport) return; this.running = true; requestAnimationFrame(this.draw); }
  draw() { if (!this.running || document.hidden) { this.running = false; return; } const c = this.ctx; const { w, h, state } = this; c.clearRect(0, 0, w, h); this.pointer.x += (this.pointer.tx - this.pointer.x) * .04; this.pointer.y += (this.pointer.ty - this.pointer.y) * .04; this.time += .012; const x = w * .78 + this.pointer.x * 18, y = h * .54 + this.pointer.y * 12; c.save(); c.globalAlpha = .86; c.strokeStyle = state.accent; c.fillStyle = state.accent; c.lineWidth = 1;
    if (state.mode === 'idea') this.idea(c, x, y); else if (state.mode === 'layers' || state.mode === 'custom') this.layers(c, x, y, state.mode); else if (state.mode === 'catalog') this.catalog(c, x, y); else if (state.mode === 'order') this.order(c, x, y); else if (state.mode === 'network') this.network(c, x, y); else this.close(c, x, y); c.restore(); this.frame++; requestAnimationFrame(this.draw); }
  printer(c,x,y,alpha=1) { c.globalAlpha=alpha;c.strokeRect(x-102,y-92,204,154);c.strokeRect(x-82,y+40,164,24);c.beginPath();c.moveTo(x-102,y-47);c.lineTo(x+102,y-47);c.moveTo(x,y-92);c.lineTo(x,y+24);c.stroke();c.fillRect(x-8,y-42,16,12); }
  idea(c,x,y) { this.printer(c,x,y,.46); for(let i=0;i<14;i++){const px=x-62+(i%5)*31,py=y+24-Math.floor(i/5)*28;c.globalAlpha=.25+(i%3)*.15;c.beginPath();c.arc(px,py,2,0,Math.PI*2);c.fill();if(i%2){c.beginPath();c.moveTo(x, y);c.lineTo(px,py);c.stroke()}} c.globalAlpha=.86;c.strokeRect(x-58,y-12,116,42); }
  layers(c,x,y,custom) { this.printer(c,x,y,.35); for(let i=0;i<10;i++){const yy=y+28-i*7, inset=Math.abs(5-i)*3;c.globalAlpha=.25+i*.06;c.strokeRect(x-56+inset,yy,112-inset*2,6);if(i===6){c.globalAlpha=1;c.fillRect(x-56+inset,yy,112-inset*2,2)}} if(custom){c.globalAlpha=.75;c.strokeRect(x-38,y-40,76,68);c.beginPath();c.moveTo(x-48,y-11);c.lineTo(x+48,y-11);c.stroke()} }
  catalog(c,x,y) { for(let i=0;i<4;i++)for(let j=0;j<2;j++){const px=x-84+i*46,py=y-48+j*56;c.globalAlpha=.2+(i+j)*.09;c.strokeRect(px,py,36,43);c.beginPath();c.arc(px+18,py+19,10,0,Math.PI*2);c.stroke()} c.globalAlpha=1;c.strokeRect(x-84,y-48,36,43); }
  order(c,x,y) { c.globalAlpha=.4;for(let i=0;i<4;i++){const px=x-120+i*68;c.strokeRect(px,y-24,46,48);c.beginPath();c.moveTo(px+46,y);c.lineTo(px+66,y);c.stroke()}c.globalAlpha=1;c.fillRect(x-120,y-3,46,6);c.beginPath();c.arc(x+116,y,7,0,Math.PI*2);c.fill(); }
  network(c,x,y) { const nodes=[[0,0],[-90,-54],[-106,60],[84,-62],[112,48],[-8,95]];nodes.forEach(([dx,dy],i)=>nodes.slice(i+1).forEach(([ex,ey])=>{if(Math.abs(i-(i+1))<2){c.globalAlpha=.32;c.beginPath();c.moveTo(x+dx,y+dy);c.lineTo(x+ex,y+ey);c.stroke()}}));nodes.forEach(([dx,dy],i)=>{this.printer(c,x+dx,y+dy,i? .25:.6)}); }
  close(c,x,y) { c.globalAlpha=.85;c.beginPath();for(let i=0;i<6;i++){const a=-Math.PI/2+i*Math.PI/3,px=x+Math.cos(a)*68,py=y+Math.sin(a)*68;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.stroke();c.beginPath();c.moveTo(x,y-58);c.lineTo(x,y+58);c.moveTo(x-50,y-29);c.lineTo(x+50,y+29);c.moveTo(x+50,y-29);c.lineTo(x-50,y+29);c.stroke(); }
}
