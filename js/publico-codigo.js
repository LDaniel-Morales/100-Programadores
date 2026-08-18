(function () {
  const content = window.CodigoStore.getContent();

  const el = {
    code: document.getElementById('codigoPubCode'),
    ring: document.getElementById('codigoTimerRing'),
    timerLabel: document.getElementById('codigoTimerLabel'),
    answer: document.getElementById('codigoPubAnswer'),
    answerValue: document.getElementById('codigoPubAnswerValue'),
  };

  const CIRCUMFERENCE = 402;

  function render(state) {
    const challenge = content.challenges[state.challengeIndex];

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
    el.answerValue.textContent = state.revealed ? challenge.answer : '';
  }

  render(window.CodigoStore.getState());
  window.EventoChannel.on('codigo:state', render);
})();
