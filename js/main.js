import { SceneController } from './scene.js';
import { setupNavigation } from './navigation.js';
import { setupForms } from './forms.js';
import { reducedMotion, stateIds } from './config.js';

document.querySelectorAll('.brand').forEach((brand, index) => { const image = document.createElement('img'); image.className = 'brand-logo'; image.src = 'assets/pub-logo-transparent.png'; image.alt = 'PUB 3D'; image.width = 1132; image.height = 622; brand.replaceChildren(image); if (index === 0) brand.setAttribute('aria-label', 'PUB 3D, início'); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.hero-meta span:first-child').textContent = 'ACOMPANHE A OPERAÇÃO';
document.querySelector('.hero-meta span:last-child').textContent = 'IDEIA → REDE';
setupNavigation(); setupForms();
if (!reducedMotion) { const sections = stateIds.map(id => document.getElementById(id)).filter(Boolean); const connect = scene => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) scene.setState(entry.target.id); }), { rootMargin: '-34% 0px -48% 0px', threshold: 0 }); sections.forEach(section => observer.observe(section)); }; import('./webgl-scene.js').then(({ WebGLScene }) => connect(new WebGLScene())).catch(() => connect(new SceneController())); }
const operation = document.querySelector('#operacao .operation-copy');
if (operation) { const tabset = document.createElement('div'); tabset.className = 'operation-tabs'; tabset.innerHTML = '<div role="tablist" aria-label="Fluxos da operação"><button role="tab" aria-selected="true" aria-controls="fluxo-personalizado" id="tab-personalizado">Personalizado</button><button role="tab" aria-selected="false" aria-controls="fluxo-marketplace" id="tab-marketplace" tabindex="-1">Marketplace</button></div><div id="fluxo-personalizado" role="tabpanel" aria-labelledby="tab-personalizado">Briefing → modelagem → produção → acabamento → entrega</div><div id="fluxo-marketplace" role="tabpanel" aria-labelledby="tab-marketplace" hidden>Demanda → produto → anúncio → pedido → embalagem → expedição → análise</div>';
  operation.append(tabset); const tabs=[...tabset.querySelectorAll('[role=tab]')]; tabs.forEach(tab=>tab.addEventListener('click',()=>tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',active);item.tabIndex=active?0:-1;tabset.querySelector(`#${item.getAttribute('aria-controls')}`).hidden=!active;}))); tabset.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();tabs[(tabs.indexOf(document.activeElement)+ (event.key==='ArrowRight'?1:tabs.length-1))%tabs.length].focus();}); }
