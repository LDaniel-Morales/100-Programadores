// Persistencia y estado compartido de la dinámica "Duelo de Programación".
// El contenido (retos/lenguajes disponibles) y el estado en vivo del duelo
// actual se guardan en localStorage para sobrevivir a un recargo de página.
window.DueloStore = (function () {
  const CONTENT_KEY = '100prog:duelo:content';
  const STATE_KEY = '100prog:duelo:state';

  function getContent() {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) return JSON.parse(raw);
    const content = {
      languages: window.DUELO_DEFAULTS.languages,
      challenges: window.DUELO_DEFAULTS.challenges,
    };
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    return content;
  }

  function getState() {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return JSON.parse(raw);
    const content = getContent();
    const state = {
      player1: window.DUELO_DEFAULTS.player1,
      player2: window.DUELO_DEFAULTS.player2,
      challengeIndex: 0,
      language: content.languages[Math.floor(Math.random() * content.languages.length)],
      winner: null,
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    return state;
  }

  function saveState(state, options) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('duelo:state', state);
    }
  }

  return { getContent, getState, saveState };
})();
