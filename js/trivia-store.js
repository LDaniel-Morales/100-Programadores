// Persistencia y estado compartido de la dinámica "Trivia Popular".
window.TriviaStore = (function () {
  const CONTENT_KEY = '100prog:trivia:content';
  const STATE_KEY = '100prog:trivia:state';

  function getContent() {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) return JSON.parse(raw);
    const content = { questions: window.TRIVIA_DEFAULTS.questions };
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    return content;
  }

  function getState() {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return JSON.parse(raw);
    const state = { questionIndex: 0, revealMap: {} };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    return state;
  }

  function saveState(state, options) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('trivia:state', state);
    }
  }

  return { getContent, getState, saveState };
})();
