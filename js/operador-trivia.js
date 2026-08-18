(function () {
  const content = window.TriviaStore.getContent();
  let state = window.TriviaStore.getState();

  const el = {
    counter: document.getElementById('triviaQuestionCounter'),
    title: document.getElementById('triviaQuestionTitle'),
    answers: document.getElementById('triviaAnswers'),
    prevBtn: document.getElementById('prevQuestionBtn'),
    nextBtn: document.getElementById('nextQuestionBtn'),
    resetBtn: document.getElementById('resetBoardBtn'),
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
  }

  function goToQuestion(index) {
    const clamped = Math.max(0, Math.min(index, content.questions.length - 1));
    state = { ...state, questionIndex: clamped };
    save();
    render();
  }

  function resetBoard() {
    const revealMap = { ...state.revealMap };
    Object.keys(revealMap).forEach((key) => {
      if (key.startsWith(`${state.questionIndex}-`)) delete revealMap[key];
    });
    state = { ...state, revealMap };
    save();
    render();
  }

  el.prevBtn.addEventListener('click', () => goToQuestion(state.questionIndex - 1));
  el.nextBtn.addEventListener('click', () => goToQuestion(state.questionIndex + 1));
  el.resetBtn.addEventListener('click', resetBoard);

  render();
})();
