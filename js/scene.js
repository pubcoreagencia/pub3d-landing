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
  buildPlate(c,x,y,w=165,h=92,alpha=.35) { c.globalAlpha=alpha;c.strokeRect(x-w/2,y-h/2,w,h);for(let i=1;i<6;i++){c.beginPath();c.moveTo(x-w/2+i*w/6,y-h/2);c.lineTo(x-w/2+i*w/6,y+h/2);c.moveTo(x-w/2,y-h/2+i*h/4);c.lineTo(x+w/2,y-h/2+i*h/4);c.stroke()} }
  printer(c,x,y,alpha=1) { c.globalAlpha=alpha;c.strokeRect(x-102,y-92,204,154);this.buildPlate(c,x,y+28,164,48,alpha);c.beginPath();c.moveTo(x-102,y-47);c.lineTo(x+102,y-47);c.moveTo(x,y-92);c.lineTo(x,y+2);c.stroke();c.fillRect(x-8,y-42,16,12);c.beginPath();c.moveTo(x-5,y-30);c.lineTo(x+5,y-30);c.lineTo(x,y-21);c.closePath();c.fill(); }
  idea(c,x,y) { this.printer(c,x,y,.44);this.buildPlate(c,x,y+28,164,48,.72);for(let i=0;i<12;i++){const px=x-52+(i%4)*35,py=y+12-Math.floor(i/4)*18;c.globalAlpha=.35;c.beginPath();c.arc(px,py,1.8,0,Math.PI*2);c.fill();if(i%2){c.beginPath();c.moveTo(px,py);c.lineTo(px+35,py);c.stroke()}}c.globalAlpha=.9;c.strokeRect(x-52,y-16,104,38); }
  layers(c,x,y,custom) { this.printer(c,x,y,.32);for(let i=0;i<9;i++){const yy=y+23-i*6, inset=Math.abs(4-i)*3;c.globalAlpha=.24+i*.065;c.strokeRect(x-48+inset,yy,96-inset*2,5);if(i===5){c.globalAlpha=1;c.fillRect(x-48+inset,yy,96-inset*2,2)}}if(custom){c.globalAlpha=.76;c.strokeRect(x-32,y-32,64,55);c.beginPath();c.moveTo(x-43,y-4);c.lineTo(x+43,y-4);c.stroke()} }
  catalog(c,x,y) { for(let i=0;i<3;i++)for(let j=0;j<2;j++){const px=x-72+i*52,py=y-47+j*56;c.globalAlpha=.22+(i+j)*.08;c.strokeRect(px,py,42,45);c.strokeRect(px+12,py+12,18,17);c.beginPath();c.moveTo(px+8,py+36);c.lineTo(px+34,py+36);c.stroke()}c.globalAlpha=1;c.strokeRect(x-72,y-47,42,45); }
  order(c,x,y) { c.globalAlpha=.4;for(let i=0;i<4;i++){const px=x-120+i*68;c.strokeRect(px,y-24,46,48);c.beginPath();c.moveTo(px+46,y);c.lineTo(px+66,y);c.stroke()}c.globalAlpha=1;c.fillRect(x-120,y-3,46,6);c.beginPath();c.arc(x+116,y,7,0,Math.PI*2);c.fill(); }
  network(c,x,y) { const nodes=[[0,0],[-90,-54],[-106,60],[84,-62],[112,48],[-8,95]];nodes.forEach(([dx,dy],i)=>nodes.slice(i+1).forEach(([ex,ey])=>{if(Math.abs(i-(i+1))<2){c.globalAlpha=.32;c.beginPath();c.moveTo(x+dx,y+dy);c.lineTo(x+ex,y+ey);c.stroke()}}));nodes.forEach(([dx,dy],i)=>{this.printer(c,x+dx,y+dy,i? .25:.6)}); }
  close(c,x,y) { c.globalAlpha=.85;c.beginPath();for(let i=0;i<6;i++){const a=-Math.PI/2+i*Math.PI/3,px=x+Math.cos(a)*68,py=y+Math.sin(a)*68;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.stroke();c.beginPath();c.moveTo(x,y-58);c.lineTo(x,y+58);c.moveTo(x-50,y-29);c.lineTo(x+50,y+29);c.moveTo(x+50,y-29);c.lineTo(x-50,y+29);c.stroke(); }
}
