const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
export function setupForms() {
  document.querySelector('#interest')?.setAttribute('id', 'interesse');
  document.querySelectorAll('a[href="#interest"]').forEach(link => link.setAttribute('href', '#interesse'));
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const values = [...new FormData(form).entries()].filter(([, value]) => value);
    const query = new URLSearchParams(location.search);
    utmKeys.forEach(key => { if (query.get(key)) values.push([key, query.get(key)]); });
    const message = values.map(([key, value]) => `${key}: ${value}`).join('\n');
    const result = form.querySelector('.form-result');
    const phone = window.PUB3D?.contact?.whatsapp;
    if (phone) { location.href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`; return; }
    result.textContent = 'Dados preparados. Defina o WhatsApp ou um endpoint seguro para concluir o envio.';
    navigator.clipboard?.writeText(message).catch(() => {});
  }));
}
