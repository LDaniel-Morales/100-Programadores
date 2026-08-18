// Muestra/oculta las secciones .view (una por dinámica) dentro de la página
// actual, y mantiene el estado sincronizado vía AppStore/BroadcastChannel.
window.AppView = (function () {
  function show(view, options) {
    document.querySelectorAll('.view').forEach((el) => {
      el.hidden = el.id !== `view-${view}`;
    });
    window.AppStore.setView(view, options);
  }

  function init(listenForRemoteChanges) {
    show(window.AppStore.getView(), { broadcast: false });
    if (listenForRemoteChanges) {
      window.EventoChannel.on('app:view', (payload) => show(payload.view, { broadcast: false }));
    }
  }

  return { show, init };
})();
