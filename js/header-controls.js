// Bloque reutilizable para el header de cada dinámica: un switch para
// mostrar/ocultar esa dinámica en la vista Público en cualquier momento
// (sin salir de la pantalla de control), más el campo de "próxima dinámica"
// que se anuncia en la pantalla de espera.
window.HeaderControls = (function () {
  function mount(containerEl, dynamicId) {
    containerEl.innerHTML = `
      <div class="header-controls__switch-group">
        <span class="mono header-controls__switch-label">Visible en público</span>
        <button type="button" class="toggle-switch" role="switch" aria-checked="false"><span class="toggle-switch__knob"></span></button>
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

    switchEl.addEventListener('click', () => {
      const isLive = window.PublicViewStore.getView() === dynamicId;
      window.PublicViewStore.setView(isLive ? 'menu' : dynamicId);
    });

    window.NextDynamicField.mount(nextInput);
  }

  return { mount };
})();
