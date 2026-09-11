// Preguntas de la dinámica "Trivia Popular" (estilo Family Feud): una
// pregunta con hasta 8 respuestas ocultas, numeradas por popularidad.
// Cargadas desde md/reporte-respuestas-populares.md (encuesta del evento).
window.TRIVIA_DEFAULTS = {
  questions: [
    {
      text: 'MENCIONA UN LENGUAJE DE PROGRAMACIÓN QUE TODOS DEBERÍAN DE CONOCER',
      answers: [
        { text: 'Python', points: 24 },
        { text: 'Java', points: 23 },
        { text: 'C++', points: 3 },
        { text: 'JavaScript', points: 3 },
        { text: 'C', points: 3 },
        { text: 'C#', points: 2 },
        { text: 'Rust', points: 1 },
        { text: 'Ensamblador', points: 1 },
      ],
    },
    {
      text: '¿QUÉ ES LO PRIMERO QUE HACE UN PROGRAMADOR CUANDO EL CÓDIGO NO FUNCIONA?',
      answers: [
        { text: 'Preguntarle a la IA', points: 18 },
        { text: 'Llorar', points: 8 },
        { text: 'Revisar el mensaje / línea de error', points: 7 },
        { text: 'Volver a ejecutar / compilar', points: 5 },
        { text: 'Revisar los puntos y coma', points: 4 },
        { text: 'Identificar el error', points: 3 },
      ],
    },
    {
      text: 'MENCIONA UNA HERRAMIENTA QUE TODO PROGRAMADOR USA',
      answers: [
        { text: 'IA (genérica, sin nombrar cuál)', points: 20 },
        { text: 'VS Code / Editor código', points: 16 },
        { text: 'Git / GitHub', points: 3 },
        { text: 'IDE', points: 2 },
        { text: 'Teclado / Mouse', points: 2 },
        { text: 'Stack Overflow', points: 2 },
      ],
    },
    {
      text: '¿CUÁL ES EL LENGUAJE MÁS ODIADO POR LOS PROGRAMADORES?',
      answers: [
        { text: 'Ensamblador', points: 13 },
        { text: 'JavaScript', points: 9 },
        { text: 'PHP', points: 7 },
        { text: 'C', points: 7 },
        { text: 'Java', points: 6 },
        { text: 'Python', points: 3 },
        { text: 'C++', points: 2 },
      ],
    },
    {
      text: 'SI TU PROFESOR TE PREGUNTA SOBRE EL PROYECTO FINAL, ¿QUÉ MENTIRA DIRÍAS?',
      answers: [
        { text: 'Ya casi queda / ya casi está', points: 22 },
        { text: 'Se descompuso mi laptop / está descargada', points: 5 },
        { text: 'En mi computadora sí funcionaba', points: 4 },
        { text: 'No traje la laptop', points: 3 },
        { text: 'Lo tiene mi compañero', points: 2 },
      ],
    },
    {
      text: '¿CUÁL ES EL PEOR EDITOR PARA PROGRAMAR?',
      answers: [
        { text: 'Bloc de notas', points: 15 },
        { text: 'NetBeans', points: 6 },
        { text: 'Notepad', points: 5 },
        { text: 'Eclipse', points: 4 },
        { text: 'Visual Studio', points: 3 },
        { text: 'En papel', points: 3 },
        { text: 'Word', points: 3 },
        { text: 'Android Studio', points: 2 },
      ],
    },
    {
      text: 'PEORES FORMAS DE NOMBRAR UNA VARIABLE',
      answers: [
        { text: 'Usar una sola letra (x, a, b, V1...)', points: 13 },
        { text: 'Palabras / nombres sin sentido', points: 8 },
        { text: 'Nombre genérico + número (variable1, var1...)', points: 5 },
        { text: 'Abreviaturas poco claras', points: 4 },
        { text: 'Llamarla literalmente "variable"', points: 3 },
        { text: 'Nombre de tu ex', points: 2 },
      ],
    },
    {
      text: 'MENCIONA ERRORES MÁS COMUNES EN EL CÓDIGO',
      answers: [
        { text: 'Falta el punto y coma ( ; )', points: 36 },
        { text: 'Errores de sintaxis / mal escrito', points: 13 },
        { text: 'No documentar / organizar el código', points: 5 },
        { text: 'Declarar mal una variable', points: 4 },
        { text: 'Falta de librerías / dependencias', points: 3 },
        { text: 'Mala indentación', points: 2 },
      ],
    },
    {
      text: 'RAZONES POR LA QUE TU PROYECTO FALLA JUSTO ANTES DE LA ENTREGA',
      answers: [
        { text: 'Cambios de última hora', points: 10 },
        { text: 'Le dio pena / ansiedad / miedo', points: 8 },
        { text: 'Versiones', points: 7 },
        { text: 'No hacer tests', points: 6 },
        { text: 'Dios me abandonó', points: 4 },
      ],
    },
    {
      text: 'FORMAS EN LA QUE LA IA ARRUINA TU PROYECTO',
      answers: [
        { text: 'Cambia la lógica/estructura/variables sin que se lo pidas', points: 12 },
        { text: 'Pone comentarios / emojis de más', points: 6 },
        { text: 'Confiar/copiar sin entender lo que genera', points: 3 },
        { text: 'Moviendo/borrando archivos que sirven', points: 1 },
      ],
    },
    {
      text: '¿QUÉ HACES CUANDO TU PROGRAMA FUNCIONA SOLO EN TU COMPUTADORA?',
      answers: [
        { text: 'Lo muestro / entrego en mi propia computadora', points: 14 },
        { text: 'Revisar dependencias / versiones / entorno', points: 9 },
        { text: 'Llorar', points: 8 },
        { text: 'Usar Docker', points: 7 },
      ],
    },
    {
      text: 'MENCIONA COSAS QUE UN PROGRAMADOR EVITA',
      answers: [
        { text: 'Mujeres / contacto femenino', points: 6 },
        { text: 'Socializar', points: 5 },
        { text: 'Bañarse', points: 4 },
        { text: 'Documentar / leer documentación', points: 4 },
        { text: 'Tocar pasto', points: 2 },
      ],
    },
    {
      text: 'PRIMEROS CÓDIGOS DE TODO PROGRAMADOR',
      answers: [
        { text: 'Hola Mundo', points: 40 },
        { text: 'Calculadora', points: 6 },
        { text: 'Determinar área / perímetro', points: 2 },
      ],
    },
  ],
};
