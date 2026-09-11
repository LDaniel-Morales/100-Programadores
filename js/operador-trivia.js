(function () {
  const content = window.TriviaStore.getContent();
  let state = window.TriviaStore.getState();

  const el = {
    counter: document.getElementById('triviaQuestionCounter'),
    title: document.getElementById('triviaQuestionTitle'),
    answers: document.getElementById('triviaAnswers'),
    prevBtn: document.getElementById('prevQuestionBtn'),
    nextBtn: document.getElementById('nextQuestionBtn'),
    resetGameBtn: document.getElementById('resetGameBtnTrivia'),
    strikeMarks: document.getElementById('strikeMarks'),
    strikeBtn: document.getElementById('strikeBtn'),
    stealBtn: document.getElementById('stealBtn'),
  };

  function currentQuestion() {
    return content.questions[state.questionIndex];
  }

  function isRevealed(ai) {
    return !!state.revealMap[`${state.questionIndex}-${ai}`];
  }

  function save() {
    window.TriviaStore.saveState(state);
  }

  function reveal(ai) {
    state = { ...state, revealMap: { ...state.revealMap, [`${state.questionIndex}-${ai}`]: true } };
    save();
    render();
  }

  function addStrike() {
    if (state.strikes >= 3) return;
    state = { ...state, strikes: state.strikes + 1 };
    save();
    window.EventoChannel.send('trivia:strike-flash', {});
    render();
  }

  function toggleSteal() {
    state = { ...state, stealing: !state.stealing };
    save();
    render();
  }

  function render() {
    const question = currentQuestion();

    el.counter.textContent = `PREGUNTA ${state.questionIndex + 1} / ${content.questions.length}`;
    el.title.textContent = question.text;

    el.answers.innerHTML = '';
    question.answers.forEach((ans, ai) => {
      const revealed = isRevealed(ai);
      const row = document.createElement('div');
      row.className = 'trivia-op__answer-row';
      row.innerHTML = `
        <div class="mono trivia-op__rank">${ai + 1}</div>
        <div class="trivia-op__answer-info">
          <div class="trivia-op__answer-text">${ans.text}</div>
          <div class="mono trivia-op__answer-points">${ans.points} pts</div>
        </div>
      `;
      if (revealed) {
        const badge = document.createElement('div');
        badge.className = 'mono trivia-op__revealed-badge';
        badge.innerHTML = '<span class="trivia-op__check">✓</span>revelada';
        row.appendChild(badge);
      } else {
        const btn = document.createElement('button');
        btn.className = 'trivia-op__reveal-btn';
        btn.textContent = 'Revelar';
        btn.addEventListener('click', () => reveal(ai));
        row.appendChild(btn);
      }
      el.answers.appendChild(row);
    });

    el.prevBtn.disabled = state.questionIndex === 0;
    el.nextBtn.disabled = state.questionIndex === content.questions.length - 1;

    el.strikeMarks.innerHTML = '';
    [1, 2, 3].forEach((n) => {
      const mark = document.createElement('span');
      mark.className = 'trivia-op__strike-mark' + (state.strikes >= n ? ' is-active' : '');
      mark.textContent = '✕';
      el.strikeMarks.appendChild(mark);
    });
    el.strikeBtn.disabled = state.strikes >= 3;

    el.stealBtn.classList.toggle('is-active', state.stealing);
    el.stealBtn.textContent = state.stealing ? 'Robando puntos' : 'Robar puntos';
  }

  function goToQuestion(index) {
    const clamped = Math.max(0, Math.min(index, content.questions.length - 1));
    state = { ...state, questionIndex: clamped, strikes: 0, stealing: false };
    save();
    render();
  }

  function resetGame() {
    if (!confirm('¿Reiniciar el juego? Se borrarán todas las respuestas reveladas de todas las preguntas.')) return;
    state = { questionIndex: 0, revealMap: {}, strikes: 0, stealing: false };
    save();
    render();
  }

  el.prevBtn.addEventListener('click', () => goToQuestion(state.questionIndex - 1));
  el.nextBtn.addEventListener('click', () => goToQuestion(state.questionIndex + 1));
  el.resetGameBtn.addEventListener('click', resetGame);
  el.strikeBtn.addEventListener('click', addStrike);
  el.stealBtn.addEventListener('click', toggleSteal);

  render();
})();
