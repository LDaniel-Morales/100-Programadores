// Bloque reutilizable para el header de cada dinámica: un switch para
// mostrar/ocultar esa dinámica en la vista Público en cualquier momento
// (sin salir de la pantalla de control), más el campo de "próxima dinámica"
// que se anuncia en la pantalla de espera.
//
// Atajo de teclado: barra espaciadora alterna el switch de la dinámica que
// el Operador tiene abierta ahora mismo (OperatorNavStore), para no tener
// que apuntar el mouse al switch en medio del evento.
window.HeaderControls = (function () {
  const toggleByDynamicId = {};

  function mount(containerEl, dynamicId) {
    containerEl.innerHTML = `
      <div class="header-controls__switch-group">
        <span class="mono header-controls__switch-label">Visible en público</span>
        <button type="button" class="toggle-switch" role="switch" aria-checked="false" title="Espacio para mostrar/ocultar"><span class="toggle-switch__knob"></span></button>
      </div>
      <div class="header-controls__next-field">
        <label class="mono header-controls__next-label">Próxima dinámica</label>
        <input class="header-controls__next-input" type="text" spellcheck="false">
      </div>
    `;

    const switchEl = containerEl.querySelector('.toggle-switch');
    const nextInput = containerEl.querySelector('.header-controls__next-input');

    function renderSwitch(view) {
      const isLive = (view ?? window.PublicViewStore.getView()) === dynamicId;
      switchEl.classList.toggle('is-on', isLive);
      switchEl.setAttribute('aria-checked', String(isLive));
    }
    renderSwitch();
    window.PublicViewStore.onChange(renderSwitch);

    function toggle() {
      const isLive = window.PublicViewStore.getView() === dynamicId;
      window.PublicViewStore.setView(isLive ? 'menu' : dynamicId);
    }
    switchEl.addEventListener('click', toggle);
    toggleByDynamicId[dynamicId] = toggle;

    window.NextDynamicField.mount(nextInput);
  }

  function isTypingTarget(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || isTypingTarget(e.target)) return;
    const toggle = toggleByDynamicId[window.OperatorNavStore.getView()];
    if (!toggle) return;
    e.preventDefault();
    toggle();
  });

  return { mount };
})();
