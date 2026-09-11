// Switch reutilizable "Visible en público": alterna si una vista (una
// dinámica, o el propio Menú) es lo que se está proyectando ahora mismo.
// Vive por separado de HeaderControls porque el Menú también necesita uno
// junto al campo de "próxima dinámica", sin duplicar ese campo.
//
// Atajo de teclado: barra espaciadora alterna el switch de la vista que el
// Operador tiene abierta ahora mismo (OperatorNavStore), sin tener que
// apuntar el mouse en medio del evento.
window.LiveSwitch = (function () {
  const toggleByViewId = {};

  function mount(containerEl, viewId, options) {
    const label = (options && options.label) || 'Visible en público';
    containerEl.innerHTML = `
      <span class="mono header-controls__switch-label">${label}</span>
      <button type="button" class="toggle-switch" role="switch" aria-checked="false" title="Espacio para mostrar/ocultar"><span class="toggle-switch__knob"></span></button>
    `;

    const switchEl = containerEl.querySelector('.toggle-switch');

    function renderSwitch(view) {
      const isLive = (view ?? window.PublicViewStore.getView()) === viewId;
      switchEl.classList.toggle('is-on', isLive);
      switchEl.setAttribute('aria-checked', String(isLive));
    }
    renderSwitch();
    window.PublicViewStore.onChange(renderSwitch);

    function toggle() {
      const isLive = window.PublicViewStore.getView() === viewId;
      window.PublicViewStore.setView(isLive ? 'menu' : viewId);
    }
    switchEl.addEventListener('click', toggle);
    toggleByViewId[viewId] = toggle;
  }

  function isTypingTarget(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || isTypingTarget(e.target)) return;
    const toggle = toggleByViewId[window.OperatorNavStore.getView()];
    if (!toggle) return;
    e.preventDefault();
    toggle();
  });

  return { mount };
})();
