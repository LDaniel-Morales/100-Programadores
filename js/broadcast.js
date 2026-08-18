// Canal de sincronización entre la vista Operador y la vista Público.
// No requiere servidor: usa BroadcastChannel, disponible entre pestañas/
// ventanas del mismo navegador en la misma máquina.
window.EventoChannel = (function () {
  const CHANNEL_NAME = '100-programadores';
  const channel = new BroadcastChannel(CHANNEL_NAME);

  function send(type, payload) {
    channel.postMessage({ type, payload });
  }

  function on(type, handler) {
    channel.addEventListener('message', (event) => {
      if (event.data && event.data.type === type) {
        handler(event.data.payload);
      }
    });
  }

  return { send, on };
})();
