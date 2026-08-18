// Contenido inicial de la dinámica "Duelo de Programación".
// Se copia a localStorage en el primer uso y desde ahí se puede editar/ampliar
// sin perder los datos al recargar la página.
window.DUELO_DEFAULTS = {
  player1: 'ROOT_ANA',
  player2: 'SUDO_LUIS',
  languages: ['Python', 'Java', 'JavaScript'],
  challenges: [
    {
      name: 'FizzBuzz',
      statement: 'Recibe un número N e imprime "Fizz" si es múltiplo de 3, "Buzz" si es múltiplo de 5, "FizzBuzz" si es múltiplo de ambos, o el número si no aplica ninguno.',
      samples: [
        { input: '15', output: 'FizzBuzz' },
        { input: '7', output: '7' },
      ],
    },
    {
      name: 'Palíndromo',
      statement: 'Recibe una cadena y determina si se lee igual al derecho y al revés, ignorando mayúsculas.',
      samples: [
        { input: '"radar"', output: 'true' },
        { input: '"hola"', output: 'false' },
      ],
    },
    {
      name: 'Fibonacci',
      statement: 'Recibe un número N e imprime el N-ésimo término de la secuencia de Fibonacci (empezando en 0, 1).',
      samples: [
        { input: '6', output: '8' },
        { input: '1', output: '1' },
      ],
    },
  ],
};
