export function setupNavigation() {
  const nav = document.querySelector('#nav');
  const toggle = document.querySelector('.menu-toggle');
  const close = () => { nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };
  toggle?.addEventListener('click', () => { const opened = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!opened)); nav.classList.toggle('open', !opened); document.body.classList.toggle('menu-open', !opened); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); toggle?.focus(); } });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  const links = [...document.querySelectorAll('#nav a[href^="#"]')];
  const sections = links.map(link => [link, document.querySelector(link.getAttribute('href'))]).filter(([, section]) => section);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; sections.forEach(([link, section]) => link.toggleAttribute('aria-current', section === entry.target)); }), { rootMargin: '-25% 0px -62% 0px', threshold: 0 });
  sections.forEach(([, section]) => observer.observe(section));
}
