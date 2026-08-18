(function () {
  const pubNextDynamic = document.getElementById('pubNextDynamic');
  const pubWaitingText = document.getElementById('pubWaitingText');

  function renderMenuContent(content) {
    pubNextDynamic.textContent = content.nextDynamic;
    pubWaitingText.textContent = content.waitingText;
  }
  renderMenuContent(window.MenuStore.getContent());

  window.EventoChannel.on('menu:content', renderMenuContent);

  const rainEl = document.getElementById('menuRain');
  const snippets = window.MENU_DEFAULTS.rainSnippets;
  for (let i = 0; i < 24; i++) {
    const seed = (i * 37) % 100;
    const text = Array.from({ length: 10 }, () => snippets[Math.floor(Math.random() * snippets.length)]).join('\n');

    const col = document.createElement('div');
    col.className = 'menu-pub__rain-col';
    col.style.left = `${(i / 24) * 100}%`;

    const line = document.createElement('div');
    line.className = 'menu-pub__rain-text';
    line.style.animationDuration = `${4 + (seed % 6)}s`;
    line.style.animationDelay = `${-(seed % 8)}s`;
    line.textContent = text;

    col.appendChild(line);
    rainEl.appendChild(col);
  }
})();
