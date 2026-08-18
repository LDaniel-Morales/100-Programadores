(function () {
  const content = window.AlgoStore.getContent();
  let state = window.AlgoStore.getState();
  let intervalId = null;

  const el = {
    counter: document.getElementById('algoChallengeCounter'),
    lang: document.getElementById('algoLang'),
    code: document.getElementById('algoCode'),
    durationOptions: document.getElementById('algoDurationOptions'),
    startBtn: document.getElementById('startTimerBtn'),
    revealBtn: document.getElementById('revealAnswerBtn'),
    answer: document.getElementById('algoAnswer'),
    prevBtn: document.getElementById('prevChallengeBtn'),
    nextBtn: document.getElementById('nextChallengeBtnAlgo'),
  };

  function currentChallenge() {
    return content.challenges[state.challengeIndex];
  }

  function save(options) {
    window.AlgoStore.saveState(state, options);
  }

  function render() {
    const challenge = currentChallenge();

    el.counter.textContent = `RETO ${state.challengeIndex + 1} / ${content.challenges.length}`;
    el.lang.textContent = challenge.lang;

    el.code.innerHTML = '';
    challenge.lines.forEach((tokens) => {
      const line = document.createElement('div');
      line.className = 'mono tc-code-line';
      tokens.forEach((tok) => {
        const span = document.createElement('span');
        span.style.color = tok.c;
        span.textContent = tok.t;
        line.appendChild(span);
      });
      el.code.appendChild(line);
    });

    el.durationOptions.innerHTML = '';
    content.durations.forEach((d) => {
      const btn = document.createElement('button');
      btn.className = 'tc-duration-btn' + (state.duration === d ? ' is-selected' : '');
      btn.textContent = `${d}s`;
      btn.addEventListener('click', () => setDuration(d));
      el.durationOptions.appendChild(btn);
    });

    el.startBtn.textContent = state.running ? `Corriendo… ${state.timeLeft}s` : 'Iniciar timer';
    el.revealBtn.classList.toggle('is-revealed', state.revealed);
    el.answer.textContent = challenge.answer;

    el.prevBtn.disabled = state.challengeIndex === 0;
    el.nextBtn.disabled = state.challengeIndex === content.challenges.length - 1;
  }

  function tick() {
    if (state.timeLeft <= 1) {
      clearInterval(intervalId);
      intervalId = null;
      state = { ...state, timeLeft: 0, running: false, revealed: true };
    } else {
      state = { ...state, timeLeft: state.timeLeft - 1 };
    }
    save();
    render();
  }

  function startTimer() {
    clearInterval(intervalId);
    state = { ...state, timeLeft: state.duration, running: true, revealed: false };
    save();
    render();
    intervalId = setInterval(tick, 1000);
  }

  function resumeTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(tick, 1000);
  }

  function revealAnswer() {
    clearInterval(intervalId);
    intervalId = null;
    state = { ...state, revealed: true, running: false };
    save();
    render();
  }

  function setDuration(d) {
    clearInterval(intervalId);
    intervalId = null;
    state = { ...state, duration: d, timeLeft: d, running: false, revealed: false };
    save();
    render();
  }

  function goToChallenge(index) {
    clearInterval(intervalId);
    intervalId = null;
    const clamped = Math.max(0, Math.min(index, content.challenges.length - 1));
    state = { ...state, challengeIndex: clamped, timeLeft: state.duration, running: false, revealed: false };
    save();
    render();
  }

  el.startBtn.addEventListener('click', startTimer);
  el.revealBtn.addEventListener('click', revealAnswer);
  el.prevBtn.addEventListener('click', () => goToChallenge(state.challengeIndex - 1));
  el.nextBtn.addEventListener('click', () => goToChallenge(state.challengeIndex + 1));

  render();
  if (state.running) resumeTimer();
})();
