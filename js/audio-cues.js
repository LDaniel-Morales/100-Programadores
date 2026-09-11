// Reproduce (o detiene) efectos de sonido de audio/ por nombre de archivo
// (sin extensión). El Operador dispara/corta un cue con
// EventoChannel.send('audio:play' | 'audio:stop', 'nombre'); esto vive en la
// vista Público, que es la que normalmente queda conectada al
// proyector/bocinas del evento.
window.AudioCues = (function () {
  // Mantiene una referencia fuerte mientras suena, agrupada por nombre: sin
  // esto, el Audio() local queda sin variables que lo referencien y el
  // recolector de basura puede destruirlo a mitad de la carga/reproducción
  // (falla intermitente); agrupar por nombre además permite detener solo
  // los cues de ese nombre (p. ej. cortar "cronometro" al revelar respuesta).
  const active = new Map();

  function play(name) {
    if (!name) return;
    const audio = new Audio(`audio/${name}.mp3`);
    if (!active.has(name)) active.set(name, new Set());
    active.get(name).add(audio);
    const release = () => {
      const set = active.get(name);
      if (set) set.delete(audio);
    };
    audio.addEventListener('ended', release);
    audio.addEventListener('error', release);
    audio.play().catch(release);
  }

  function stop(name) {
    if (!name) return;
    const set = active.get(name);
    if (!set) return;
    set.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    set.clear();
  }

  window.EventoChannel.on('audio:play', play);
  window.EventoChannel.on('audio:stop', stop);

  return { play, stop };
})();
