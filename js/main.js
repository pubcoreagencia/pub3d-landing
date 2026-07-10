import { setupNavigation } from './navigation.js';
import { setupForms } from './forms.js';
import { setupVisualSystem } from './visual-system.js';

document.querySelectorAll('.brand').forEach((brand, index) => {
  const image = document.createElement('img');
  image.className = 'brand-logo';
  image.src = 'assets/pub-logo-transparent.png';
  image.alt = 'PUB 3D';
  image.width = 1132;
  image.height = 622;
  brand.replaceChildren(image);
  if (index === 0) brand.setAttribute('aria-label', 'PUB 3D, início');
});

document.querySelector('#year').textContent = new Date().getFullYear();
setupNavigation();
setupForms();
setupVisualSystem();

const operation = document.querySelector('#operacao .operation-copy');
if (operation) {
  const tabset = document.createElement('div');
  tabset.className = 'operation-tabs';
  tabset.innerHTML = '<div role="tablist" aria-label="Fluxos da operação"><button role="tab" aria-selected="true" aria-controls="fluxo-personalizado" id="tab-personalizado">Personalizado</button><button role="tab" aria-selected="false" aria-controls="fluxo-marketplace" id="tab-marketplace" tabindex="-1">Marketplace</button></div><div id="fluxo-personalizado" role="tabpanel" aria-labelledby="tab-personalizado">Briefing → modelagem → produção → acabamento → entrega</div><div id="fluxo-marketplace" role="tabpanel" aria-labelledby="tab-marketplace" hidden>Demanda → produto → anúncio → pedido → embalagem → expedição → análise</div>';
  operation.append(tabset);

  const tabs = [...tabset.querySelectorAll('[role="tab"]')];
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      tabset.querySelector(`#${item.getAttribute('aria-controls')}`).hidden = !active;
    });
  }));

  tabset.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : tabs.length - 1;
    tabs[(tabs.indexOf(document.activeElement) + offset) % tabs.length].focus();
  });
}
