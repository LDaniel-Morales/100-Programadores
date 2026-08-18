// Vista previa en vivo de lo que está mostrando la vista Público, embebida
// dentro del panel del Operador. Es literalmente publico.html cargado en un
// <iframe> a 4x, encogido con transform:scale — mismo localStorage y
// BroadcastChannel, así que refleja el estado real (temporizador, revelar
// respuesta, incluso la pantalla de espera si el switch está apagado) sin
// duplicar ninguna lógica de renderizado. Reutilizable en cualquier
// dinámica: window.PublicPreview.mount(containerEl).
window.PublicPreview = (function () {
  function mount(containerEl) {
    containerEl.innerHTML = `
      <div class="mono public-preview__label">PREVIEW · VISTA PÚBLICO</div>
      <div class="public-preview__frame">
        <iframe src="publico.html" class="public-preview__iframe" tabindex="-1" title="Vista previa de Público"></iframe>
      </div>
    `;
  }

  return { mount };
})();
