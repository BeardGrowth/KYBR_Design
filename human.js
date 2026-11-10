(() => {
  const menu = document.getElementById('human-menu');
  const links = document.getElementById('human-links');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close menu' : 'Menu';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
      menu.textContent='Menu';
    }));
  }
  const year = document.getElementById('human-year');
  if (year) year.textContent = String(new Date().getFullYear());
  const form = document.getElementById('human-contact');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const subject = 'KYBR marketing inquiry — ' + String(d.get('company') || '');
    const body = [
      'Name: ' + d.get('name'),
      'Email: ' + d.get('email'),
      'Company: ' + d.get('company'),
      'Locations: ' + d.get('locations'),
      '',
      'How KYBR can help:',
      d.get('goals') || '(not specified)'
    ].join('\n');
    const status = document.getElementById('human-form-status');
    if (status) status.textContent='An email draft will open. Please review and send it yourself. No information has been submitted to KYBR from this form.';
    window.location.href = 'mailto:hello@kybrmarketing.ai?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();