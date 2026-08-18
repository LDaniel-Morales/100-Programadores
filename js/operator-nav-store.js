// A qué pantalla está mirando el Operador ahora mismo (menú o una dinámica).
// Es local a esta ventana: navegar en el Operador NO cambia lo que el
// Público está proyectando — eso lo controla PublicViewStore por separado.
window.OperatorNavStore = (function () {
  const STATE_KEY = '100prog:operator:nav';

  function getView() {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw).view : 'menu';
  }

  function setView(view) {
    localStorage.setItem(STATE_KEY, JSON.stringify({ view }));
  }

  return { getView, setView };
})();
