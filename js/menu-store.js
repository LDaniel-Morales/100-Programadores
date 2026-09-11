// Contenido editable de la pantalla de Menú/Espera: nombre de sesión y el
// anuncio de la próxima dinámica que se muestra en la vista Público.
window.MenuStore = (function () {
  const CONTENT_KEY = '100prog:menu:content';

  function getContent() {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) return JSON.parse(raw);
    const content = {
      sessionName: window.MENU_DEFAULTS.sessionName,
      nextDynamic: window.MENU_DEFAULTS.nextDynamic,
      waitingText: window.MENU_DEFAULTS.waitingText,
    };
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    return content;
  }

  function saveContent(content, options) {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    if (!options || options.broadcast !== false) {
      window.EventoChannel.send('menu:content', content);
    }
  }

  return { getContent, saveContent };
})();
