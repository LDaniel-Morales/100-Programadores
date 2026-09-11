(function () {
  const content = window.TriviaStore.getContent();

  const el = {
    title: document.getElementById('triviaPubTitle'),
    pointsValue: document.getElementById('triviaPubPointsValue'),
    grid: document.getElementById('triviaPubGrid'),
    strikes: document.getElementById('triviaPubStrikes'),
    steal: document.getElementById('triviaPubSteal'),
    strikeFlash: document.getElementById('triviaPubStrikeFlash'),
  };

  const header = window.PublicHeader.mount(document.getElementById('triviaPubHeader'));
  let prevPoints = 0;

  function playStrikeFlash() {
    el.strikeFlash.classList.remove('is-flashing');
    void el.strikeFlash.offsetWidth;
    el.strikeFlash.classList.add('is-flashing');
  }
  el.strikeFlash.addEventListener('animationend', () => {
    el.strikeFlash.classList.remove('is-flashing');
  });
  window.EventoChannel.on('trivia:strike-flash', playStrikeFlash);

  function render(state) {
    const question = content.questions[state.questionIndex];

    header.setCounter(`PREGUNTA ${state.questionIndex + 1} / ${content.questions.length}`);
    el.title.textContent = question.text;

    const points = question.answers.reduce((sum, ans, ai) => {
      const revealed = !!state.revealMap[`${state.questionIndex}-${ai}`];
      return sum + (revealed ? ans.points : 0);
    }, 0);
    el.pointsValue.textContent = points;
    if (points > prevPoints) {
      el.pointsValue.classList.remove('is-bump');
      void el.pointsValue.offsetWidth;
      el.pointsValue.classList.add('is-bump');
    }
    prevPoints = points;

    el.strikes.classList.toggle('is-empty', state.strikes === 0);
    el.strikes.innerHTML = '';
    [1, 2, 3].forEach((n) => {
      const mark = document.createElement('span');
      mark.className = 'trivia-pub__strike' + (state.strikes >= n ? ' is-active' : '');
      mark.textContent = '✕';
      el.strikes.appendChild(mark);
    });

    el.steal.hidden = !state.stealing;

    el.grid.innerHTML = '';
    question.answers.forEach((ans, ai) => {
      const revealed = !!state.revealMap[`${state.questionIndex}-${ai}`];
      const card = document.createElement('div');
      card.className = 'trivia-pub__card' + (revealed ? ' is-revealed' : '');
      card.innerHTML = `
        <div class="trivia-pub__card-front">
          <div class="mono trivia-pub__card-rank">${ai + 1}</div>
        </div>
        <div class="trivia-pub__card-back">
          <div class="trivia-pub__card-text">${ans.text}</div>
          <div class="mono trivia-pub__card-points">${ans.points}</div>
        </div>
      `;
      el.grid.appendChild(card);
    });
  }

  render(window.TriviaStore.getState());
  window.EventoChannel.on('trivia:state', render);
})();
