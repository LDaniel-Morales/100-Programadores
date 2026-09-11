// Retos de la dinámica "Adivina el Algoritmo": fragmento de código coloreado
// por tokens + el nombre del algoritmo que solo ve el Operador.
window.ALGO_DEFAULTS = {
  challenges: [
    {
      answer: 'Bubble Sort',
      lang: 'PYTHON',
      lines: [
        [{ t: 'for i in ', c: '#CFA34E' }, { t: 'range(len(arr)):', c: '#FFFFFF' }],
        [{ t: '    for j in ', c: '#CFA34E' }, { t: 'range(len(arr)-i-1):', c: '#FFFFFF' }],
        [{ t: '        if ', c: '#CFA34E' }, { t: 'arr[j] > arr[j+1]:', c: '#FFFFFF' }],
        [{ t: '            arr[j], arr[j+1] = arr[j+1], arr[j]', c: '#FFFFFF' }],
      ],
    },
    {
      answer: 'Binary Search',
      lang: 'JAVASCRIPT',
      lines: [
        [{ t: 'while ', c: '#CFA34E' }, { t: '(lo <= hi) {', c: '#FFFFFF' }],
        [{ t: '  const ', c: '#CFA34E' }, { t: 'mid = (lo + hi) >> 1;', c: '#FFFFFF' }],
        [{ t: '  if ', c: '#CFA34E' }, { t: '(arr[mid] === target) ', c: '#FFFFFF' }, { t: 'return ', c: '#CFA34E' }, { t: 'mid;', c: '#FFFFFF' }],
        [{ t: '  arr[mid] < target ? lo = mid+1 : hi = mid-1;', c: '#FFFFFF' }],
        [{ t: '}', c: '#8C8C8C' }],
      ],
    },
    {
      answer: 'Quicksort',
      lang: 'C',
      lines: [
        [{ t: 'int ', c: '#CFA34E' }, { t: 'partition(', c: '#FFFFFF' }, { t: 'int', c: '#CFA34E' }, { t: '* a, ', c: '#FFFFFF' }, { t: 'int ', c: '#CFA34E' }, { t: 'lo, hi) {', c: '#FFFFFF' }],
        [{ t: '  int ', c: '#CFA34E' }, { t: 'p = a[hi], i = lo;', c: '#FFFFFF' }],
        [{ t: '  for ', c: '#CFA34E' }, { t: '(int j = lo; j < hi; j++)', c: '#FFFFFF' }],
        [{ t: '    if ', c: '#CFA34E' }, { t: '(a[j] < p) swap(&a[i++], &a[j]);', c: '#FFFFFF' }],
        [{ t: '  swap(&a[i], &a[hi]); return ', c: '#FFFFFF' }, { t: 'i;', c: '#FFFFFF' }],
        [{ t: '}', c: '#8C8C8C' }],
      ],
    },
  ],
  durations: [15, 30, 60],
};
