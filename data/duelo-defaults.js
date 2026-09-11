// Contenido inicial de la dinámica "Duelo de Programación".
// Se copia a localStorage en el primer uso y desde ahí se puede editar/ampliar
// sin perder los datos al recargar la página.
window.DUELO_DEFAULTS = {
  player1: 'ROOT_ANA',
  player2: 'SUDO_LUIS',
  languages: ['Python', 'Java', 'JavaScript'],
  challenges: [
    {
      name: 'Suma de dígitos',
      statement: 'Recibe un número entero positivo N y calcula la suma de todos sus dígitos.',
      samples: [
        { input: '12345', output: '15' },
        { input: '908', output: '17' },
      ],
    },
    {
      name: 'Número mayor',
      statement: 'Recibe tres números enteros y determina cuál es el mayor de ellos.',
      samples: [
        { input: '8 3 5', output: '8' },
        { input: '12 25 7', output: '25' },
      ],
    },
    {
      name: 'Contador de vocales',
      statement: 'Recibe una cadena de texto y cuenta cuántas vocales (a, e, i, o, u) contiene, ignorando mayúsculas y minúsculas.',
      samples: [
        { input: '"Programacion"', output: '5' },
        { input: '"HOLA MUNDO"', output: '4' },
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
  ],
};
