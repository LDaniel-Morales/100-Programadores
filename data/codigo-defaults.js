// Retos de la dinámica "¿Qué dice el código?": un fragmento de código
// coloreado por tokens y lo que imprime/devuelve.
window.CODIGO_DEFAULTS = {
  challenges: [

    // 1. Java
    {
      answer: '10',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '5', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'x ', c: '#FFFFFF' }, { t: '*= ', c: '#CFA34E' }, { t: '2', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'System.out.println', c: '#FFFFFF' }, { t: '(x);', c: '#8C8C8C' }],
      ],
    },

    // 2. Python
    {
      answer: 'Hola Ana',
      lines: [
        [{ t: 'name = ', c: '#FFFFFF' }, { t: '"Ana"', c: '#A86E2E' }],
        [{ t: 'print', c: '#CFA34E' }, { t: '("Hola " + name)', c: '#8C8C8C' }],
      ],
    },

    // 3. C++
    {
      answer: '7',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'a = ', c: '#FFFFFF' }, { t: '10', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'int ', c: '#CFA34E' }, { t: 'b = ', c: '#FFFFFF' }, { t: '3', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'cout ', c: '#FFFFFF' }, { t: '<< a - b;', c: '#8C8C8C' }],
      ],
    },

    // 4. Java
    {
      answer: '4',
      lines: [
        [{ t: 'int[] ', c: '#CFA34E' }, { t: 'nums = {', c: '#FFFFFF' }, { t: '2, 4, 6', c: '#A86E2E' }, { t: '};', c: '#8C8C8C' }],
        [{ t: 'System.out.println', c: '#FFFFFF' }, { t: '(nums[1]);', c: '#8C8C8C' }],
      ],
    },

    // 5. Python
    {
      answer: '[1, 2, 3, 4]',
      lines: [
        [{ t: 'numbers = [', c: '#FFFFFF' }, { t: '1, 2, 3', c: '#A86E2E' }, { t: ']', c: '#FFFFFF' }],
        [{ t: 'numbers.append', c: '#CFA34E' }, { t: '(4)', c: '#8C8C8C' }],
        [{ t: 'print', c: '#CFA34E' }, { t: '(numbers)', c: '#8C8C8C' }],
      ],
    },

    // 6. C++
    {
      answer: '4',
      lines: [
        [{ t: 'string ', c: '#CFA34E' }, { t: 'word = ', c: '#FFFFFF' }, { t: '"Hola"', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'cout ', c: '#FFFFFF' }, { t: '<< word.length();', c: '#8C8C8C' }],
      ],
    },

    // 7. Python
    {
      answer: '9',
      lines: [
        [{ t: 'x = ', c: '#FFFFFF' }, { t: '5', c: '#A86E2E' }],
        [{ t: 'y = ', c: '#FFFFFF' }, { t: '2', c: '#A86E2E' }],
        [{ t: 'print', c: '#CFA34E' }, { t: '(x + y * 2)', c: '#8C8C8C' }],
      ],
    },

    // 8. Java
    {
      answer: '1020',
      lines: [
        [{ t: 'String ', c: '#CFA34E' }, { t: 'a = ', c: '#FFFFFF' }, { t: '"10"', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'String ', c: '#CFA34E' }, { t: 'b = ', c: '#FFFFFF' }, { t: '"20"', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'System.out.println', c: '#FFFFFF' }, { t: '(a + b);', c: '#8C8C8C' }],
      ],
    },

    // 9. C++
    {
      answer: '14',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '10', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'x', c: '#FFFFFF' }, { t: '--;', c: '#CFA34E' }],
        [{ t: 'x += ', c: '#CFA34E' }, { t: '5', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'cout ', c: '#FFFFFF' }, { t: '<< x;', c: '#8C8C8C' }],
      ],
    },

    // 10. Python
    {
      answer: '40',
      lines: [
        [{ t: 'numbers = [', c: '#FFFFFF' }, { t: '10, 20, 30', c: '#A86E2E' }, { t: ']', c: '#FFFFFF' }],
        [{ t: 'print', c: '#CFA34E' }, { t: '(numbers[0] + numbers[2])', c: '#8C8C8C' }],
      ],
    },

    // 11. Java
    {
      answer: 'true',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '3', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'int ', c: '#CFA34E' }, { t: 'y = ', c: '#FFFFFF' }, { t: '3', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'System.out.println', c: '#FFFFFF' }, { t: '(x == y);', c: '#8C8C8C' }],
      ],
    },

    // 12. C++
    {
      answer: '3',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '5', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'int ', c: '#CFA34E' }, { t: 'y = ', c: '#FFFFFF' }, { t: '2', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'cout ', c: '#FFFFFF' }, { t: '<< x / y + x % y;', c: '#8C8C8C' }],
      ],
    },

    // 13. Java
    {
      answer: '7',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '5', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'if ', c: '#CFA34E' }, { t: '(x > 3) {', c: '#8C8C8C' }],
        [{ t: '  x += ', c: '#FFFFFF' }, { t: '2', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: '} else {', c: '#8C8C8C' }],
        [{ t: '  x -= ', c: '#FFFFFF' }, { t: '2', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: '}', c: '#8C8C8C' }],
        [{ t: 'System.out.println', c: '#FFFFFF' }, { t: '(x);', c: '#8C8C8C' }],
      ],
    },

    // 14. Python
    {
      answer: '5',
      lines: [
        [{ t: 'x = ', c: '#FFFFFF' }, { t: '2', c: '#A86E2E' }],
        [{ t: 'for ', c: '#CFA34E' }, { t: 'i in range(3):', c: '#8C8C8C' }],
        [{ t: '    x += i', c: '#FFFFFF' }],
        [{ t: 'print', c: '#CFA34E' }, { t: '(x)', c: '#8C8C8C' }],
      ],
    },

    // 15. C++
    {
      answer: '7',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'x = ', c: '#FFFFFF' }, { t: '10', c: '#A86E2E' }, { t: ';', c: '#8C8C8C' }],
        [{ t: 'for ', c: '#CFA34E' }, { t: '(int i = 0; i < 3; i++) {', c: '#8C8C8C' }],
        [{ t: '    x -= i;', c: '#FFFFFF' }],
        [{ t: '}', c: '#8C8C8C' }],
        [{ t: 'cout ', c: '#FFFFFF' }, { t: '<< x;', c: '#8C8C8C' }],
      ],
    },

  ],
  durations: [10, 15, 30, 60],
};
