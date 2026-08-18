// Retos de la dinámica "¿Qué dice el código?": un fragmento de código
// coloreado por tokens y lo que imprime/devuelve.
window.CODIGO_DEFAULTS = {
  challenges: [
    {
      answer: '3',
      lines: [
        [{ t: 'let ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '1', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'x ', c: '#FFFFFF' }, { t: '+= ', c: '#CFA34E' }, { t: '2', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'console.log', c: '#FFFFFF' }, { t: '(x)', c: '#8C8C8C' }, { t: ';', c: '#8C8C8C' }],
      ],
    },
    {
      answer: 'undefined',
      lines: [
        [{ t: 'function ', c: '#CFA34E' }, { t: 'f() {}', c: '#FFFFFF' }],
        [{ t: 'console.log', c: '#FFFFFF' }, { t: '(f());', c: '#8C8C8C' }],
      ],
    },
    {
      answer: '[1, 2, 3, 4]',
      lines: [
        [{ t: 'const a = [', c: '#FFFFFF' }, { t: '1, 2', c: '#A86E2E' }, { t: '];', c: '#FFFFFF' }],
        [{ t: 'a.push', c: '#CFA34E' }, { t: '(3, 4);', c: '#FFFFFF' }],
        [{ t: 'console.log', c: '#FFFFFF' }, { t: '(a);', c: '#8C8C8C' }],
      ],
    },
  ],
  durations: [10, 15, 30, 60],
};
