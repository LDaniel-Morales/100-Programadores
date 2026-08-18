// Contenido del panel de control (menú de dinámicas) y de la pantalla de espera.
window.MENU_DEFAULTS = {
  sessionName: 'meetup-agosto-2026',
  nextDynamic: 'A PUNTO DE INICIAR: DUELO DE PROGRAMACIÓN',
  waitingText: 'preparen sus teclados',
  dynamics: [
    { id: 'trivia', name: 'Trivia Popular', icon: 'circle', count: 84, implemented: false },
    { id: 'codigo', name: '¿Qué dice el código?', icon: 'code', count: 52, implemented: false },
    { id: 'algoritmo', name: 'Adivina el Algoritmo', icon: 'diamond', count: null, implemented: true, view: 'algoritmo' },
    { id: 'duelo', name: 'Duelo de Programación', icon: 'duel', count: null, implemented: true, view: 'duelo' },
  ],
  rainSnippets: ['01001', 'const x=', 'if(err)', '=> {}', 'npm run', 'git log', 'return', '</>', 'async', 'null', 'true', 'for(;;)'],
};
