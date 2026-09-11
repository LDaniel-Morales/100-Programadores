// Editor de contenido: formularios para ver/editar las preguntas y retos de
// las 4 dinámicas (leídos de cada *Store, que a su vez parten de data/*
// la primera vez). Solo vive en el Operador; el Público no lo ve.
(function () {
  const tabsEl = document.getElementById('editorTabs');
  const panels = {
    trivia: document.getElementById('editorPanel-trivia'),
    codigo: document.getElementById('editorPanel-codigo'),
    algoritmo: document.getElementById('editorPanel-algoritmo'),
    duelo: document.getElementById('editorPanel-duelo'),
  };

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.editor-op__tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.editor-op__tab').forEach((t) => t.classList.toggle('is-active', t === btn));
    Object.keys(panels).forEach((key) => { panels[key].hidden = key !== btn.dataset.tab; });
  });

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function field(labelText, inputEl) {
    const wrap = el('div', 'editor-op__field');
    wrap.appendChild(el('label', 'editor-op__label', labelText));
    wrap.appendChild(inputEl);
    return wrap;
  }

  function textInput(value, onCommit) {
    const input = el('input', 'editor-op__input');
    input.type = 'text';
    input.value = value;
    input.spellcheck = false;
    input.addEventListener('blur', () => onCommit(input.value.trim()));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
    return input;
  }

  function numberInput(value, onCommit) {
    const input = el('input', 'editor-op__input editor-op__input--number');
    input.type = 'number';
    input.min = 0;
    input.value = value;
    input.addEventListener('blur', () => {
      const n = Number(input.value);
      onCommit(Number.isFinite(n) ? n : value);
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
    return input;
  }

  function textArea(value, onCommit) {
    const ta = el('textarea', 'editor-op__textarea');
    ta.value = value;
    ta.spellcheck = false;
    ta.addEventListener('blur', () => onCommit(ta.value));
    return ta;
  }

  function removableTag(label, onRemove) {
    const tag = el('span', 'editor-op__tag');
    tag.appendChild(document.createTextNode(label));
    const rm = el('button', 'editor-op__tag-remove', '×');
    rm.type = 'button';
    rm.title = 'Eliminar';
    rm.addEventListener('click', onRemove);
    tag.appendChild(rm);
    return tag;
  }

  function rowDeleteBtn(onDelete) {
    const btn = el('button', 'editor-op__row-delete', '×');
    btn.type = 'button';
    btn.title = 'Eliminar';
    btn.addEventListener('click', onDelete);
    return btn;
  }

  // Los retos de Algoritmo/Código guardan el código como líneas de tokens
  // con color individual (para el resaltado de sintaxis en pantalla). Al
  // editarlo como texto plano cada línea se colapsa a un solo token blanco:
  // se conserva el contenido pero se pierde el color por token.
  function linesToText(lines) {
    return lines.map((tokens) => tokens.map((t) => t.t).join('')).join('\n');
  }

  function textToLines(text) {
    return text.split('\n').map((line) => [{ t: line, c: '#FFFFFF' }]);
  }

  function renderDurations(panel, content, store, rerender) {
    const card = el('div', 'editor-op__card');
    card.appendChild(el('div', 'editor-op__card-title', 'DURACIONES DISPONIBLES (SEGUNDOS)'));

    const tags = el('div', 'editor-op__tags');
    content.durations.forEach((d, di) => {
      tags.appendChild(removableTag(`${d}s`, () => {
        if (content.durations.length <= 1) { alert('Debe quedar al menos una duración.'); return; }
        content.durations.splice(di, 1);
        store.saveContent(content);
        rerender();
      }));
    });

    const addInput = el('input', 'editor-op__tag-input');
    addInput.type = 'number';
    addInput.min = 1;
    addInput.placeholder = '+ segundos';
    addInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const n = Number(addInput.value);
      if (Number.isFinite(n) && n > 0 && !content.durations.includes(n)) {
        content.durations.push(n);
        content.durations.sort((a, b) => a - b);
        store.saveContent(content);
        rerender();
      }
    });
    tags.appendChild(addInput);

    card.appendChild(tags);
    panel.appendChild(card);
  }

  function renderTrivia() {
    const content = window.TriviaStore.getContent();
    const panel = panels.trivia;
    panel.innerHTML = '';
    panel.appendChild(el('div', 'editor-op__intro', 'Cada pregunta tiene hasta 8 respuestas ocultas, ordenadas de mayor a menor puntaje. El Operador las revela una por una.'));

    content.questions.forEach((question, qi) => {
      const card = el('div', 'editor-op__card');

      const head = el('div', 'editor-op__card-head');
      head.appendChild(el('div', 'editor-op__card-title', `PREGUNTA ${qi + 1}`));
      const delBtn = el('button', 'editor-op__delete-btn', 'Eliminar pregunta');
      delBtn.addEventListener('click', () => {
        if (content.questions.length <= 1) { alert('Debe quedar al menos una pregunta.'); return; }
        if (!confirm('¿Eliminar esta pregunta y todas sus respuestas?')) return;
        content.questions.splice(qi, 1);
        window.TriviaStore.saveContent(content);
        renderTrivia();
      });
      head.appendChild(delBtn);
      card.appendChild(head);

      card.appendChild(field('Pregunta', textInput(question.text, (v) => {
        question.text = v || question.text;
        window.TriviaStore.saveContent(content);
      })));

      const answersWrap = el('div', 'editor-op__field');
      answersWrap.appendChild(el('label', 'editor-op__label', `Respuestas (${question.answers.length}/8)`));
      question.answers.forEach((answer, ai) => {
        const row = el('div', 'editor-op__answer-row');
        row.appendChild(el('div', 'editor-op__answer-rank', String(ai + 1)));
        row.appendChild(textInput(answer.text, (v) => {
          answer.text = v || answer.text;
          window.TriviaStore.saveContent(content);
        }));
        row.appendChild(numberInput(answer.points, (v) => {
          answer.points = v;
          window.TriviaStore.saveContent(content);
        }));
        row.appendChild(rowDeleteBtn(() => {
          if (question.answers.length <= 1) { alert('Debe quedar al menos una respuesta.'); return; }
          if (!confirm('¿Eliminar esta respuesta?')) return;
          question.answers.splice(ai, 1);
          window.TriviaStore.saveContent(content);
          renderTrivia();
        }));
        answersWrap.appendChild(row);
      });
      card.appendChild(answersWrap);

      if (question.answers.length < 8) {
        const addAnswerBtn = el('button', 'editor-op__add-row-btn', '+ Agregar respuesta');
        addAnswerBtn.addEventListener('click', () => {
          question.answers.push({ text: 'Nueva respuesta', points: 1 });
          window.TriviaStore.saveContent(content);
          renderTrivia();
        });
        card.appendChild(addAnswerBtn);
      }

      panel.appendChild(card);
    });

    const addQuestionBtn = el('button', 'editor-op__add-card-btn', '+ Agregar pregunta');
    addQuestionBtn.addEventListener('click', () => {
      content.questions.push({ text: 'Nueva pregunta', answers: [{ text: 'Respuesta 1', points: 1 }] });
      window.TriviaStore.saveContent(content);
      renderTrivia();
    });
    panel.appendChild(addQuestionBtn);
  }

  function renderCodeChallenges(panel, content, store, rerender, { withLang }) {
    content.challenges.forEach((challenge, ci) => {
      const card = el('div', 'editor-op__card');

      const head = el('div', 'editor-op__card-head');
      head.appendChild(el('div', 'editor-op__card-title', `RETO ${ci + 1}`));
      const delBtn = el('button', 'editor-op__delete-btn', 'Eliminar reto');
      delBtn.addEventListener('click', () => {
        if (content.challenges.length <= 1) { alert('Debe quedar al menos un reto.'); return; }
        if (!confirm('¿Eliminar este reto?')) return;
        content.challenges.splice(ci, 1);
        store.saveContent(content);
        rerender();
      });
      head.appendChild(delBtn);
      card.appendChild(head);

      if (withLang) {
        const row = el('div', 'editor-op__field-row');
        row.appendChild(field('Lenguaje', textInput(challenge.lang, (v) => {
          challenge.lang = v || challenge.lang;
          store.saveContent(content);
        })));
        row.appendChild(field('Nombre del algoritmo (respuesta)', textInput(challenge.answer, (v) => {
          challenge.answer = v || challenge.answer;
          store.saveContent(content);
        })));
        card.appendChild(row);
      }

      card.appendChild(field('Código', textArea(linesToText(challenge.lines), (v) => {
        challenge.lines = textToLines(v);
        store.saveContent(content);
      })));

      if (!withLang) {
        card.appendChild(field('¿Qué imprime? (respuesta)', textInput(challenge.answer, (v) => {
          challenge.answer = v || challenge.answer;
          store.saveContent(content);
        })));
      }

      panel.appendChild(card);
    });
  }

  function renderAlgoritmo() {
    const content = window.AlgoStore.getContent();
    const panel = panels.algoritmo;
    panel.innerHTML = '';
    panel.appendChild(el('div', 'editor-op__intro', 'El código se edita como texto plano: al guardar se conserva el contenido pero se pierde el color por token del resaltado de sintaxis.'));

    renderCodeChallenges(panel, content, window.AlgoStore, renderAlgoritmo, { withLang: true });

    const addBtn = el('button', 'editor-op__add-card-btn', '+ Agregar reto');
    addBtn.addEventListener('click', () => {
      content.challenges.push({ answer: 'Nuevo algoritmo', lang: 'PYTHON', lines: [[{ t: '', c: '#FFFFFF' }]] });
      window.AlgoStore.saveContent(content);
      renderAlgoritmo();
    });
    panel.appendChild(addBtn);

    renderDurations(panel, content, window.AlgoStore, renderAlgoritmo);
  }

  function renderCodigo() {
    const content = window.CodigoStore.getContent();
    const panel = panels.codigo;
    panel.innerHTML = '';
    panel.appendChild(el('div', 'editor-op__intro', 'El código se edita como texto plano: al guardar se conserva el contenido pero se pierde el color por token del resaltado de sintaxis.'));

    renderCodeChallenges(panel, content, window.CodigoStore, renderCodigo, { withLang: false });

    const addBtn = el('button', 'editor-op__add-card-btn', '+ Agregar reto');
    addBtn.addEventListener('click', () => {
      content.challenges.push({ answer: '', lines: [[{ t: '', c: '#FFFFFF' }]] });
      window.CodigoStore.saveContent(content);
      renderCodigo();
    });
    panel.appendChild(addBtn);

    renderDurations(panel, content, window.CodigoStore, renderCodigo);
  }

  function renderDuelo() {
    const content = window.DueloStore.getContent();
    const panel = panels.duelo;
    panel.innerHTML = '';
    panel.appendChild(el('div', 'editor-op__intro', 'Lenguajes que se sortean por reto y los retos disponibles. Los nombres de los jugadores se editan directamente en la vista de Duelo (son del duelo en curso, no contenido precargado).'));

    const langCard = el('div', 'editor-op__card');
    langCard.appendChild(el('div', 'editor-op__card-title', 'LENGUAJES DISPONIBLES'));
    const tags = el('div', 'editor-op__tags');
    content.languages.forEach((lang, li) => {
      tags.appendChild(removableTag(lang, () => {
        if (content.languages.length <= 1) { alert('Debe quedar al menos un lenguaje.'); return; }
        content.languages.splice(li, 1);
        window.DueloStore.saveContent(content);
        renderDuelo();
      }));
    });
    const newLangInput = el('input', 'editor-op__tag-input');
    newLangInput.type = 'text';
    newLangInput.placeholder = '+ nuevo lenguaje';
    newLangInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const v = newLangInput.value.trim();
      if (v) {
        content.languages.push(v);
        window.DueloStore.saveContent(content);
        renderDuelo();
      }
    });
    tags.appendChild(newLangInput);
    langCard.appendChild(tags);
    panel.appendChild(langCard);

    content.challenges.forEach((challenge, ci) => {
      const card = el('div', 'editor-op__card');

      const head = el('div', 'editor-op__card-head');
      head.appendChild(el('div', 'editor-op__card-title', `RETO ${ci + 1}`));
      const delBtn = el('button', 'editor-op__delete-btn', 'Eliminar reto');
      delBtn.addEventListener('click', () => {
        if (content.challenges.length <= 1) { alert('Debe quedar al menos un reto.'); return; }
        if (!confirm('¿Eliminar este reto?')) return;
        content.challenges.splice(ci, 1);
        window.DueloStore.saveContent(content);
        renderDuelo();
      });
      head.appendChild(delBtn);
      card.appendChild(head);

      card.appendChild(field('Nombre del reto', textInput(challenge.name, (v) => {
        challenge.name = v || challenge.name;
        window.DueloStore.saveContent(content);
      })));
      card.appendChild(field('Enunciado', textArea(challenge.statement, (v) => {
        challenge.statement = v;
        window.DueloStore.saveContent(content);
      })));

      const samplesWrap = el('div', 'editor-op__field');
      samplesWrap.appendChild(el('label', 'editor-op__label', 'Ejemplos (entrada / salida)'));
      challenge.samples.forEach((sample, si) => {
        const row = el('div', 'editor-op__sample-row');
        row.appendChild(field('Entrada', textInput(sample.input, (v) => {
          sample.input = v;
          window.DueloStore.saveContent(content);
        })));
        row.appendChild(field('Salida', textInput(sample.output, (v) => {
          sample.output = v;
          window.DueloStore.saveContent(content);
        })));
        row.appendChild(rowDeleteBtn(() => {
          if (challenge.samples.length <= 1) { alert('Debe quedar al menos un ejemplo.'); return; }
          challenge.samples.splice(si, 1);
          window.DueloStore.saveContent(content);
          renderDuelo();
        }));
        samplesWrap.appendChild(row);
      });
      card.appendChild(samplesWrap);

      const addSampleBtn = el('button', 'editor-op__add-row-btn', '+ Agregar ejemplo');
      addSampleBtn.addEventListener('click', () => {
        challenge.samples.push({ input: '', output: '' });
        window.DueloStore.saveContent(content);
        renderDuelo();
      });
      card.appendChild(addSampleBtn);

      panel.appendChild(card);
    });

    const addChallengeBtn = el('button', 'editor-op__add-card-btn', '+ Agregar reto');
    addChallengeBtn.addEventListener('click', () => {
      content.challenges.push({ name: 'Nuevo reto', statement: '', samples: [{ input: '', output: '' }] });
      window.DueloStore.saveContent(content);
      renderDuelo();
    });
    panel.appendChild(addChallengeBtn);
  }

  renderTrivia();
  renderCodigo();
  renderAlgoritmo();
  renderDuelo();
})();
