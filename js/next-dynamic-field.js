// Campo reutilizable para editar MenuStore.nextDynamic. Puede montarse en
// varios inputs a la vez (menú y el header de cada dinámica) y todos quedan
// sincronizados entre sí, incluso dentro de la misma página, donde
// BroadcastChannel no entrega mensajes al propio documento que los envía.
window.NextDynamicField = (function () {
  const mounted = [];

  function syncAll(value) {
    mounted.forEach((el) => {
      if (document.activeElement !== el) el.value = value;
    });
  }

  function mount(inputEl) {
    inputEl.value = window.MenuStore.getContent().nextDynamic;
    mounted.push(inputEl);

    function commit() {
      const content = window.MenuStore.getContent();
      const value = inputEl.value.trim() || content.nextDynamic;
      window.MenuStore.saveContent({ ...content, nextDynamic: value });
      syncAll(value);
    }

    inputEl.addEventListener('blur', commit);
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') inputEl.blur();
    });
  }

  window.EventoChannel.on('menu:content', (content) => syncAll(content.nextDynamic));

  return { mount };
})();
