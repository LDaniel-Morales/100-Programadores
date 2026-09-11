// Persistencia y estado compartido de la dinámica "Adivina el Algoritmo".
window.AlgoStore = (function () {
  const CONTENT_KEY = '100prog:algo:content';
  const STATE_KEY = '100prog:algo:state';

  function getContent() {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) return JSON.parse(raw);
    const content = {
      challenges: window.ALGO_DEFAULTS.challenges,
      durations: window.ALGO_DEFAULTS.durations,
    };
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    return content;
  }

  function getState() {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return JSON.parse(raw);
    const duration = window.ALGO_DEFAULTS.durations[1];
    const state = { challengeIndex: 0, duration, timeLeft: duration, running: false, revealed: false };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    return state;
  }

  function saveState(state, options) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('algo:state', state);
    }
  }

  function saveContent(content, options) {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('algo:content', content);
    }
  }

  return { getContent, getState, saveState, saveContent };
})();
