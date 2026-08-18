// Estado de navegación compartido: qué dinámica está activa ahora mismo.
// El Operador decide la vista; la vista Público se sincroniza vía BroadcastChannel.
window.AppStore = (function () {
  const STATE_KEY = '100prog:app:state';

  function getView() {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw).view : 'menu';
  }

  function setView(view, options) {
    localStorage.setItem(STATE_KEY, JSON.stringify({ view }));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('app:view', { view });
    }
  }

  return { getView, setView };
})();
