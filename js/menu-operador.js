(function () {
  const content = window.MENU_DEFAULTS;

  const ICONS = {
    circle: '<circle cx="28" cy="28" r="24" fill="none" stroke="#CFA34E" stroke-width="3"></circle><text x="28" y="36" font-family="Space Mono, monospace" font-size="22" fill="#CFA34E" text-anchor="middle">?</text>',
    code: '<rect x="4" y="8" width="48" height="40" rx="4" fill="none" stroke="#CFA34E" stroke-width="3"></rect><text x="28" y="34" font-family="Space Mono, monospace" font-size="16" fill="#CFA34E" text-anchor="middle">&lt;/&gt;</text>',
    diamond: '<rect x="12" y="12" width="32" height="32" rx="4" fill="none" stroke="#CFA34E" stroke-width="3" transform="rotate(45 28 28)"></rect>',
    duel: '<rect x="4" y="14" width="26" height="26" rx="3" fill="none" stroke="#CFA34E" stroke-width="3"></rect><rect x="26" y="16" width="26" height="26" rx="3" fill="none" stroke="#A86E2E" stroke-width="3"></rect>',
  };

  const sessionNameEl = document.getElementById('sessionName');
  const sessionNameInput = document.getElementById('sessionNameInput');
  const nextDynamicInput = document.getElementById('nextDynamicInput');

  function commitSessionName() {
    const menuContent = window.MenuStore.getContent();
    const value = sessionNameInput.value.trim() || menuContent.sessionName;
    window.MenuStore.saveContent({ ...menuContent, sessionName: value });
    sessionNameEl.textContent = value;
    sessionNameInput.value = value;
  }

  sessionNameEl.textContent = window.MenuStore.getContent().sessionName;
  sessionNameInput.value = window.MenuStore.getContent().sessionName;
  sessionNameInput.addEventListener('blur', commitSessionName);
  sessionNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sessionNameInput.blur();
  });

  window.NextDynamicField.mount(nextDynamicInput);

  const contentCounts = {
    duelo: window.DueloStore.getContent().challenges.length,
    algoritmo: window.AlgoStore.getContent().challenges.length,
  };

  const gridEl = document.getElementById('menuDynamics');
  content.dynamics.forEach((d) => {
    const count = d.id in contentCounts ? contentCounts[d.id] : d.count;
    const card = document.createElement('button');
    card.className = 'menu-op__card' + (d.implemented ? '' : ' is-disabled');
    card.innerHTML = `
      <div class="menu-op__card-icon"><svg width="56" height="56" viewBox="0 0 56 56">${ICONS[d.icon]}</svg></div>
      <div class="menu-op__card-name">${d.name}</div>
      <div class="mono menu-op__card-count">${d.implemented ? `${count} preguntas cargadas` : 'Próximamente'}</div>
    `;
    if (d.implemented) {
      card.addEventListener('click', () => {
        window.OperatorNavStore.setView(d.view);
        window.ViewSections.activate(d.view);
      });
    } else {
      card.disabled = true;
    }
    gridEl.appendChild(card);
  });

  document.getElementById('openPublicoBtn').addEventListener('click', () => {
    window.open('publico.html', '_blank');
  });
})();
