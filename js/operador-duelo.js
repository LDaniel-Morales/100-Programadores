(function () {
  const content = window.DueloStore.getContent();
  let state = window.DueloStore.getState();

  const el = {
    player1Name: document.getElementById('player1Name'),
    player2Name: document.getElementById('player2Name'),
    challengeName: document.getElementById('challengeName'),
    languageBadge: document.getElementById('languageBadge'),
    challengeStatement: document.getElementById('challengeStatement'),
    challengeSamples: document.getElementById('challengeSamples'),
    declareWinner1: document.getElementById('declareWinner1'),
    declareWinner2: document.getElementById('declareWinner2'),
    resetGameBtn: document.getElementById('resetGameBtnDuelo'),
  };

  window.PublicPreview.mount(document.getElementById('dueloPreview'));

  function render() {
    const challenge = content.challenges[state.challengeIndex];

    if (document.activeElement !== el.player1Name) el.player1Name.textContent = state.player1;
    if (document.activeElement !== el.player2Name) el.player2Name.textContent = state.player2;

    el.challengeName.textContent = challenge.name;
    el.languageBadge.textContent = state.language;
    el.challengeStatement.textContent = challenge.statement;

    el.challengeSamples.innerHTML = '';
    challenge.samples.forEach((sample) => {
      const row = document.createElement('div');
      row.className = 'mono duelo-op__sample';
      row.innerHTML = `<span>entrada: <span>${sample.input}</span></span><span>salida: <span>${sample.output}</span></span>`;
      el.challengeSamples.appendChild(row);
    });

    el.declareWinner1.textContent = `Ganador: ${state.player1}`;
    el.declareWinner2.textContent = `Ganador: ${state.player2}`;
    el.declareWinner1.classList.toggle('is-winner', state.winner === 1);
    el.declareWinner2.classList.toggle('is-winner', state.winner === 2);
  }

  function save() {
    window.DueloStore.saveState(state);
  }

  el.player1Name.addEventListener('blur', () => {
    state.player1 = el.player1Name.textContent.trim() || state.player1;
    save();
    render();
  });

  el.player2Name.addEventListener('blur', () => {
    state.player2 = el.player2Name.textContent.trim() || state.player2;
    save();
    render();
  });

  document.getElementById('nextChallengeBtn').addEventListener('click', () => {
    state.challengeIndex = (state.challengeIndex + 1) % content.challenges.length;
    state.winner = null;
    save();
    render();
  });

  document.getElementById('rerollLanguageBtn').addEventListener('click', () => {
    const others = content.languages.filter((l) => l !== state.language);
    state.language = others[Math.floor(Math.random() * others.length)];
    save();
    render();
  });

  el.declareWinner1.addEventListener('click', () => {
    state.winner = 1;
    save();
    render();
  });

  el.declareWinner2.addEventListener('click', () => {
    state.winner = 2;
    save();
    render();
  });

  el.resetGameBtn.addEventListener('click', () => {
    if (!confirm('¿Reiniciar el juego? Se borrará el resultado actual y se volverá al primer reto.')) return;
    state.challengeIndex = 0;
    state.winner = null;
    state.language = content.languages[Math.floor(Math.random() * content.languages.length)];
    save();
    render();
  });

  render();
})();
