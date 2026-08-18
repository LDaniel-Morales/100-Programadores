// Qué está mostrando ahora mismo la vista Público: el menú/espera o una
// dinámica ('duelo', etc.). Es la única fuente de verdad para el proyector,
// persistida y sincronizada entre ventanas vía BroadcastChannel. El Operador
// la cambia explícitamente con el switch "Visible en público" de cada
// dinámica — navegar por el panel de control no la toca.
window.PublicViewStore = (function () {
  const STATE_KEY = '100prog:public:view';
  const listeners = [];

  function getView() {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw).view : 'menu';
  }

  function setView(view, options) {
    localStorage.setItem(STATE_KEY, JSON.stringify({ view }));
    listeners.forEach((fn) => fn(view));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('public:view', { view });
    }
  }

  // Notifica a otros componentes de ESTA misma página (p. ej. varios
  // switches "Visible en público" de distintas dinámicas) cuando cambia,
  // sin depender de BroadcastChannel — que no entrega mensajes al mismo
  // documento que los envió.
  function onChange(fn) {
    listeners.push(fn);
  }

  return { getView, setView, onChange };
})();
