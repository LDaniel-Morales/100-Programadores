(function () {
  const content = window.DueloStore.getContent();
  let state = window.DueloStore.getState();
  let prevWinner = state.winner;

  const el = {
    side1: document.getElementById('side1'),
    side2: document.getElementById('side2'),
    pubPlayer1: document.getElementById('pubPlayer1'),
    pubPlayer2: document.getElementById('pubPlayer2'),
    winnerBadge1: document.getElementById('winnerBadge1'),
    winnerBadge2: document.getElementById('winnerBadge2'),
    pubChallengeName: document.getElementById('pubChallengeName'),
    pubLanguageBadge: document.getElementById('pubLanguageBadge'),
    pubChallengeStatement: document.getElementById('pubChallengeStatement'),
    pubChallengeSamples: document.getElementById('pubChallengeSamples'),
    flashOverlay: document.getElementById('flashOverlay'),
    confettiLayer: document.getElementById('confettiLayer'),
  };

  const CONFETTI_COLORS = ['#CFA34E', '#A86E2E', '#173B6C', '#FFFFFF'];
  let confettiTimeout = null;

  function playConfetti() {
    el.confettiLayer.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const piece = document.createElement('div');
      piece.className = 'duelo-pub__confetti-piece';
      piece.style.left = `${(i / 18) * 100}%`;
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDuration = `${1 + (i % 3) * 0.4}s`;
      piece.style.animationDelay = `${(i % 5) * 0.08}s`;
      el.confettiLayer.appendChild(piece);
    }

    el.flashOverlay.hidden = false;
    void el.flashOverlay.offsetWidth;
    el.flashOverlay.style.animation = 'none';
    void el.flashOverlay.offsetWidth;
    el.flashOverlay.style.animation = '';

    clearTimeout(confettiTimeout);
    confettiTimeout = setTimeout(() => {
      el.flashOverlay.hidden = true;
      el.confettiLayer.innerHTML = '';
    }, 2200);
  }

  function render() {
    const challenge = content.challenges[state.challengeIndex];

    el.pubPlayer1.textContent = state.player1;
    el.pubPlayer2.textContent = state.player2;

    el.side1.classList.toggle('is-dim', state.winner === 2);
    el.side2.classList.toggle('is-dim', state.winner === 1);
    el.pubPlayer1.classList.toggle('is-winner', state.winner === 1);
    el.pubPlayer2.classList.toggle('is-winner', state.winner === 2);
    el.winnerBadge1.hidden = state.winner !== 1;
    el.winnerBadge2.hidden = state.winner !== 2;

    el.pubChallengeName.textContent = challenge.name;
    el.pubLanguageBadge.textContent = state.language;
    el.pubChallengeStatement.textContent = challenge.statement;

    el.pubChallengeSamples.innerHTML = '';
    challenge.samples.forEach((sample) => {
      const card = document.createElement('div');
      card.className = 'mono duelo-pub__sample';
      card.innerHTML = `<div>entrada: <span>${sample.input}</span></div><div>salida: <span>${sample.output}</span></div>`;
      el.pubChallengeSamples.appendChild(card);
    });

    if (state.winner !== null && prevWinner === null) {
      playConfetti();
    }
    prevWinner = state.winner;
  }

  window.EventoChannel.on('duelo:state', (payload) => {
    state = payload;
    render();
  });

  render();
})();
