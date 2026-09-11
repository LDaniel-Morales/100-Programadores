// Encabezado reutilizable para cada dinámica en la vista Público: logo,
// nombre de la sesión (editable en vivo desde el Menú del Operador) y el
// número de pregunta/reto/ejercicio de la dinámica actual.
window.PublicHeader = (function () {
  function mount(containerEl) {
    containerEl.innerHTML = `
      <div class="public-header__brand">
        <span class="mono public-header__logo">&lt;100/&gt;</span>
        <span class="mono public-header__session"></span>
      </div>
      <div class="mono public-header__counter"></div>
    `;

    const sessionEl = containerEl.querySelector('.public-header__session');
    const counterEl = containerEl.querySelector('.public-header__counter');

    function renderSession(content) {
      sessionEl.textContent = (content || window.MenuStore.getContent()).sessionName;
    }
    renderSession();
    window.EventoChannel.on('menu:content', renderSession);

    function setCounter(text) {
      counterEl.textContent = text;
    }

    return { setCounter };
  }

  return { mount };
})();
