(function () {
  const content = window.AlgoStore.getContent();

  const el = {
    lang: document.getElementById('algoPubLang'),
    code: document.getElementById('algoPubCode'),
    ring: document.getElementById('algoTimerRing'),
    timerLabel: document.getElementById('algoTimerLabel'),
    answer: document.getElementById('algoPubAnswer'),
  };

  const header = window.PublicHeader.mount(document.getElementById('algoPubHeader'));
  const CIRCUMFERENCE = 402;

  function render(state) {
    const challenge = content.challenges[state.challengeIndex];

    header.setCounter(`RETO ${state.challengeIndex + 1} / ${content.challenges.length}`);
    el.lang.textContent = challenge.lang;

    el.code.innerHTML = '';
    challenge.lines.forEach((tokens) => {
      const line = document.createElement('div');
      line.className = 'mono tcp-code-line';
      tokens.forEach((tok) => {
        const span = document.createElement('span');
        span.style.color = tok.c;
        span.textContent = tok.t;
        line.appendChild(span);
      });
      el.code.appendChild(line);
    });

    const frac = state.timeLeft / state.duration;
    const color = frac > 0.5 ? '#4a9d5f' : frac > 0.2 ? '#CFA34E' : '#c0392b';
    el.ring.style.stroke = color;
    el.ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - frac));
    el.timerLabel.textContent = String(state.timeLeft).padStart(2, '0');

    el.answer.hidden = !state.revealed;
    el.answer.textContent = state.revealed ? challenge.answer : '';
  }

  render(window.AlgoStore.getState());
  window.EventoChannel.on('algo:state', render);
})();
