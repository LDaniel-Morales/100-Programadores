// Muestra/oculta las secciones .view (una por dinámica) dentro de la página
// actual. No decide el "por qué" — eso lo maneja quien la llame
// (OperatorNavStore en el Operador, PublicViewStore en el Público).
window.ViewSections = (function () {
  function activate(view) {
    document.querySelectorAll('.view').forEach((el) => {
      el.hidden = el.id !== `view-${view}`;
    });
  }

  return { activate };
})();
