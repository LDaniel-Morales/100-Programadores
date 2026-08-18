(function () {
  const content = window.TriviaStore.getContent();

  const el = {
    title: document.getElementById('triviaPubTitle'),
    grid: document.getElementById('triviaPubGrid'),
  };

  function render(state) {
    const question = content.questions[state.questionIndex];

    el.title.textContent = question.text;

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
