(() => {
  const menu = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  menu?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
  });
  links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = 'Menu';
  }));
  const views = {
    network: ['12,846', '27', '3,982', '5.8×'],
    top: ['4,186', '12', '1,265', '4.6×'],
    regional: ['7,350', '19', '2,047', '4.9×']
  };
  document.getElementById('location-view')?.addEventListener('change', event => {
    const values = views[event.target.value] || views.network;
    ['metric-leads','metric-campaigns','metric-conversions','metric-roi'].forEach((id,index) => {
      document.getElementById(id).textContent = values[index];
    });
  });
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.hidden = panel.id !== 'panel-' + button.dataset.tab;
    });
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const form = document.getElementById('demo-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = 'KYBR Private Demo Request — ' + String(data.get('company') || '');
    const body = [
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Company: ' + data.get('company'),
      'Locations: ' + data.get('locations'),
      '',
      'Goals:',
      data.get('goals') || '(not provided)'
    ].join('\n');
    const note = document.getElementById('form-note');
    if (note) note.textContent = 'Your email app will open with a prepared request. You must send the message yourself.';
    window.location.href = 'mailto:hello@kybrmarketing.ai?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();