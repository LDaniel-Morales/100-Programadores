// Preguntas de la dinámica "Trivia Popular" (estilo Family Feud): una
// pregunta con hasta 8 respuestas ocultas, numeradas por popularidad.
window.TRIVIA_DEFAULTS = {
  questions: [
    {
      text: 'NOMBRA UN LENGUAJE QUE ODIES DEBUGGEAR A LAS 2AM',
      answers: [
        { text: 'JavaScript', points: 32 },
        { text: 'PHP', points: 24 },
        { text: 'C++', points: 18 },
        { text: 'Assembly', points: 12 },
        { text: 'Perl', points: 8 },
        { text: 'Bash', points: 4 },
        { text: 'Regex (no es lenguaje pero igual)', points: 2 },
      ],
    },
    {
      text: '¿QUÉ HACES CUANDO EL DEPLOY ROMPE PROD?',
      answers: [
        { text: 'git push --force', points: 28 },
        { text: 'Rollback inmediato', points: 24 },
        { text: 'Culpar al DNS', points: 19 },
        { text: 'Apagar la laptop', points: 14 },
        { text: 'Llamar al on-call', points: 9 },
        { text: 'Orar al log', points: 6 },
      ],
    },
    {
      text: 'NOMBRA ALGO QUE DIGAS EN UNA DAILY QUE NO ES CIERTO',
      answers: [
        { text: '"Ya casi termino"', points: 30 },
        { text: '"Lo tengo cubierto"', points: 22 },
        { text: '"Es un one-liner"', points: 16 },
        { text: '"Ya escribí los tests"', points: 14 },
        { text: '"No tiene dependencias"', points: 10 },
        { text: '"Funciona en mi máquina"', points: 8 },
      ],
    },
  ],
};
