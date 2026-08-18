(function () {
  const content = window.MENU_DEFAULTS;

  const ICONS = {
    circle: '<circle cx="28" cy="28" r="24" fill="none" stroke="#CFA34E" stroke-width="3"></circle><text x="28" y="36" font-family="Space Mono, monospace" font-size="22" fill="#CFA34E" text-anchor="middle">?</text>',
    code: '<rect x="4" y="8" width="48" height="40" rx="4" fill="none" stroke="#CFA34E" stroke-width="3"></rect><text x="28" y="34" font-family="Space Mono, monospace" font-size="16" fill="#CFA34E" text-anchor="middle">&lt;/&gt;</text>',
    diamond: '<rect x="12" y="12" width="32" height="32" rx="4" fill="none" stroke="#CFA34E" stroke-width="3" transform="rotate(45 28 28)"></rect>',
    duel: '<rect x="4" y="14" width="26" height="26" rx="3" fill="none" stroke="#CFA34E" stroke-width="3"></rect><rect x="26" y="16" width="26" height="26" rx="3" fill="none" stroke="#A86E2E" stroke-width="3"></rect>',
  };

  let menuContent = window.MenuStore.getContent();

  const sessionNameEl = document.getElementById('sessionName');
  const sessionNameInput = document.getElementById('sessionNameInput');
  const nextDynamicInput = document.getElementById('nextDynamicInput');

  function renderMenuContent() {
    sessionNameEl.textContent = menuContent.sessionName;
    sessionNameInput.value = menuContent.sessionName;
    nextDynamicInput.value = menuContent.nextDynamic;
  }
  renderMenuContent();

  function commitField(key, value) {
    menuContent = { ...menuContent, [key]: value.trim() || menuContent[key] };
    window.MenuStore.saveContent(menuContent);
    renderMenuContent();
  }

  sessionNameInput.addEventListener('blur', () => commitField('sessionName', sessionNameInput.value));
  nextDynamicInput.addEventListener('blur', () => commitField('nextDynamic', nextDynamicInput.value));
  [sessionNameInput, nextDynamicInput].forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
    });
  });

  const dueloCount = window.DueloStore.getContent().challenges.length;

  const gridEl = document.getElementById('menuDynamics');
  content.dynamics.forEach((d) => {
    const count = d.id === 'duelo' ? dueloCount : d.count;
    const card = document.createElement('button');
    card.className = 'menu-op__card' + (d.implemented ? '' : ' is-disabled');
    card.innerHTML = `
      <div class="menu-op__card-icon"><svg width="56" height="56" viewBox="0 0 56 56">${ICONS[d.icon]}</svg></div>
      <div class="menu-op__card-name">${d.name}</div>
      <div class="mono menu-op__card-count">${d.implemented ? `${count} preguntas cargadas` : 'Próximamente'}</div>
    `;
    if (d.implemented) {
      card.addEventListener('click', () => window.AppView.show(d.view));
    } else {
      card.disabled = true;
    }
    gridEl.appendChild(card);
  });

  document.getElementById('openPublicoBtn').addEventListener('click', () => {
    window.open('publico.html', '_blank');
  });
})();
