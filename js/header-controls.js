// Bloque reutilizable para el header de cada dinámica: el switch "Visible
// en público" (LiveSwitch) más el campo de "próxima dinámica" que se
// anuncia en la pantalla de espera.
window.HeaderControls = (function () {
  function mount(containerEl, dynamicId) {
    containerEl.innerHTML = `
      <div class="header-controls__switch-group"></div>
      <div class="header-controls__next-field">
        <label class="mono header-controls__next-label">Próxima dinámica</label>
        <input class="header-controls__next-input" type="text" spellcheck="false">
      </div>
    `;

    const switchGroupEl = containerEl.querySelector('.header-controls__switch-group');
    const nextInput = containerEl.querySelector('.header-controls__next-input');

    window.LiveSwitch.mount(switchGroupEl, dynamicId);
    window.NextDynamicField.mount(nextInput);
  }

  return { mount };
})();
