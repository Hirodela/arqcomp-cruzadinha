/* =========================================================
   OVERCLOCK · Protocolo de Recuperação
   Cruzadinha de Arquitetura Computacional em forma de jogo.
   JavaScript puro, sem bibliotecas.
   ========================================================= */
(() => {
  "use strict";

  /* ---------------------------------------------------------
     1. DADOS: palavras, posições no tabuleiro, pistas e manual
     --------------------------------------------------------- */
  const ROWS = 13;
  const COLS = 16;

  const WORDS = [
    { answer: "MICROCONTROLADOR", row: 10, col: 0, dir: "H", name: "Microcontrolador",
      clue: "Chip único com processador, memória e periféricos, usado em sistemas embarcados como o Arduino.",
      info: "Um computador inteiro num só chip: CPU, RAM, memória de programa (Flash/EEPROM) e periféricos como GPIO, timers, conversor analógico-digital e serial. Está no Arduino, no controle remoto, no micro-ondas e no carro." },
    { answer: "REGISTRADORES", row: 0, col: 9, dir: "V", name: "Registradores",
      clue: "Pequenas memórias dentro do processador; as mais rápidas, guardam os valores em uso agora.",
      info: "Topo da hierarquia de memória: pouquíssimos bytes, mas lidos em um único ciclo de clock. Exemplos: o contador de programa (PC), o registrador de instrução (IR) e o acumulador." },
    { answer: "UC", row: 9, col: 2, dir: "V", name: "UC (Unidade de Controle)",
      clue: "Parte da CPU que coordena as outras, enviando sinais em cada etapa da instrução.",
      info: "A “maestra” da CPU: busca a instrução, decodifica e gera os sinais de controle que dizem à ULA, aos registradores e aos barramentos o que fazer em cada etapa do ciclo." },
    { answer: "QUADCORE", row: 5, col: 14, dir: "V", name: "Quad core",
      clue: "Processador com quatro unidades de execução independentes no mesmo chip.",
      info: "Quatro núcleos completos no mesmo encapsulamento, normalmente com cache L3 compartilhada. Aumenta a vazão em tarefas paralelas, mas não acelera um programa que roda numa única thread." },
    { answer: "RAM", row: 9, col: 12, dir: "V", name: "RAM",
      clue: "Memória principal volátil, onde ficam os programas abertos; apaga ao desligar.",
      info: "Memória principal de leitura e escrita com acesso aleatório: qualquer posição é lida no mesmo tempo. Guarda os programas e dados em execução. É volátil: sem energia, perde tudo." },
    { answer: "ROM", row: 6, col: 9, dir: "H", name: "ROM",
      clue: "Memória não volátil gravada na fábrica, cujo conteúdo original não pode ser alterado.",
      info: "Memória somente de leitura, gravada na fabricação. Historicamente guardava o firmware de inicialização (BIOS). Não perde os dados sem energia e não é reescrita pelo usuário." },
    { answer: "ULA", row: 7, col: 12, dir: "H", name: "ULA",
      clue: "Parte da CPU que faz somas, subtrações, comparações e operações como E e OU.",
      info: "Unidade Lógica e Aritmética. Recebe os operandos dos registradores, calcula o resultado (aritmético ou lógico) e sinaliza flags como zero, negativo ou overflow." },
    { answer: "DMA", row: 8, col: 9, dir: "H", name: "DMA",
      clue: "Recurso que deixa periféricos transferirem dados para a RAM sem ocupar a CPU.",
      info: "Acesso Direto à Memória. Um controlador próprio move blocos de dados entre periféricos (disco, rede, áudio) e a RAM, liberando a CPU. Ao terminar, avisa por uma interrupção." },
    { answer: "MEMORIADEMASSA", row: 1, col: 1, dir: "H", name: "Memória de massa",
      clue: "Onde os arquivos ficam guardados de forma permanente em grande volume, como HDs e SSDs.",
      info: "Armazenamento secundário (HD, SSD, cartão, fita). Muita capacidade, baixo custo por gigabyte e não volátil, mas bem mais lento que a RAM. É a base da hierarquia de memória." },
    { answer: "DUALCORE", row: 5, col: 4, dir: "V", name: "Dual core",
      clue: "Processador com um par de unidades de execução independentes no mesmo chip.",
      info: "Dois núcleos completos no mesmo chip. Executa duas tarefas ao mesmo tempo de verdade, desde que o sistema operacional e os programas saibam dividir o trabalho." },
    { answer: "ADDRESSBUS", row: 12, col: 0, dir: "H", name: "Address bus (barramento de endereço)",
      clue: "Conjunto de linhas pelas quais a CPU indica qual posição de memória quer acessar.",
      info: "Barramento de endereço, unidirecional: sai da CPU e aponta a posição a ler ou escrever. Com n linhas ele endereça 2ⁿ posições; 32 linhas chegam a 4 GiB." },
    { answer: "FLASH", row: 8, col: 3, dir: "H", name: "Flash",
      clue: "Memória permanente regravável em blocos, usada em pendrives, cartões SD e SSDs.",
      info: "Derivada da EEPROM, mas apaga em blocos inteiros, o que a deixa mais densa e barata. Está em pendrives, SSDs, cartões e na memória de programa dos microcontroladores." },
    { answer: "CPU", row: 6, col: 2, dir: "H", name: "CPU",
      clue: "O “cérebro” do computador: busca, decodifica e executa as instruções dos programas.",
      info: "Unidade Central de Processamento. Repete sem parar o ciclo busca → decodificação → execução. Reúne ULA, UC e registradores; os chips modernos também trazem cache e vários núcleos." },
    { answer: "DATABUS", row: 0, col: 7, dir: "V", name: "Data bus (barramento de dados)",
      clue: "Conjunto de linhas que transporta os valores lidos ou escritos entre CPU e memória.",
      info: "Barramento de dados, bidirecional: leva o conteúdo da memória para a CPU na leitura e da CPU para a memória na escrita. A largura (8, 16, 32, 64 bits) define quanto passa por vez." },
    { answer: "EEPROM", row: 5, col: 0, dir: "V", name: "EEPROM",
      clue: "Memória permanente que pode ser apagada e regravada byte a byte; guarda configurações.",
      info: "ROM programável e apagável eletricamente, byte a byte, sem tirar o chip da placa. Ótima para guardar pequenas configurações que mudam pouco, como calibrações de um sensor." },
    { answer: "CACHE", row: 0, col: 11, dir: "V", name: "Cache",
      clue: "Memória pequena e veloz entre a CPU e a principal, com os dados mais usados.",
      info: "Memória SRAM rápida entre CPU e RAM, organizada em níveis (L1, L2, L3). Funciona por localidade: o que foi usado agora tende a ser usado de novo logo." },
  ];

  const MODES = {
    estagiario: { label: "Estagiário", tempRate: 0, wrongHeat: 0, startCycles: 200, costMult: 0.5, scoreMult: 1, cooler: false, decode: true, glitchEvery: 0 },
    engenheiro: { label: "Engenheiro", tempRate: 0.11, wrongHeat: 7, startCycles: 80, costMult: 1, scoreMult: 1.5, cooler: true, decode: true, glitchEvery: 0 },
    overclock:  { label: "Overclock", tempRate: 0.2, wrongHeat: 11, startCycles: 40, costMult: 1.6, scoreMult: 2.5, cooler: true, decode: false, glitchEvery: 70 },
  };

  const TOOL_BASE = { probe: 25, diag: 15, cool: 40, decode: 100 };
  const START_TEMP = 35;

  const GROUPS = {
    nucleo: ["CPU", "ULA", "UC", "REGISTRADORES"],
    hierarquia: ["REGISTRADORES", "CACHE", "RAM", "MEMORIADEMASSA"],
    naoVolatil: ["ROM", "EEPROM", "FLASH"],
    barramentos: ["ADDRESSBUS", "DATABUS", "DMA"],
    multinucleo: ["DUALCORE", "QUADCORE"],
  };

  const ACHIEVEMENTS = [
    { id: "boot", icon: "⚡", name: "Primeiro sinal", desc: "Confirme a primeira palavra." },
    { id: "nucleo", icon: "🧠", name: "Núcleo central", desc: "Restaure CPU, ULA, UC e registradores." },
    { id: "hierarquia", icon: "🪜", name: "Hierarquia completa", desc: "Registradores, cache, RAM e memória de massa." },
    { id: "naoVolatil", icon: "💾", name: "Nada se perde", desc: "Restaure ROM, EEPROM e Flash." },
    { id: "barramentos", icon: "🚌", name: "Tráfego liberado", desc: "Address bus, data bus e DMA online." },
    { id: "multinucleo", icon: "🧩", name: "Paralelismo", desc: "Restaure dual core e quad core." },
    { id: "embarcado", icon: "🤖", name: "Embarcado", desc: "Restaure o microcontrolador." },
    { id: "combo5", icon: "🔥", name: "Pipeline cheio", desc: "Chegue a um combo de 5." },
    { id: "puro", icon: "🧘", name: "Sem ferramentas", desc: "Vença sem usar nenhuma ferramenta." },
    { id: "perfeito", icon: "🎯", name: "Zero defeitos", desc: "Vença sem nenhuma palavra errada no Conferir." },
    { id: "frio", icon: "🧊", name: "Sangue frio", desc: "Vença com a CPU sempre abaixo de 60 °C (com temperatura ativa)." },
    { id: "limite", icon: "🌋", name: "No limite", desc: "Vença depois de passar dos 90 °C." },
    { id: "speed", icon: "⏱", name: "Clock alto", desc: "Vença em menos de 5 minutos." },
    { id: "overclocker", icon: "👑", name: "Overclocker", desc: "Vença no modo Overclock." },
  ];

  /* ---------------------------------------------------------
     2. Armazenamento local (protegido contra falhas)
     --------------------------------------------------------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* sem armazenamento */ }
    },
  };
  const KEY_ACH = "overclock.conquistas";
  const KEY_RANK = "overclock.ranking";
  const KEY_SOUND = "overclock.som";

  /* ---------------------------------------------------------
     3. Atalhos de DOM
     --------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const el = {
    board: $("#board"), clueBarTag: $("#clueBarTag"), clueBarText: $("#clueBarText"),
    cluesH: $("#cluesH"), cluesV: $("#cluesV"), log: $("#log"),
    temp: $("#tempValue"), thermo: $("#thermoFill"), counter: $("#counter"),
    cycles: $("#cycles"), score: $("#score"), combo: $("#combo"), clock: $("#clock"),
    fan: $("#fan .fan-blades"), manualTitle: $("#manualTitle"), manualText: $("#manualText"),
    achList: $("#achList"), achCount: $("#achCount"), toasts: $("#toasts"),
  };

  /* ---------------------------------------------------------
     4. Som (Web Audio, sem arquivos)
     --------------------------------------------------------- */
  const sound = {
    on: store.get(KEY_SOUND, true),
    ctx: null,
    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    },
    tone(freq, dur = 0.1, type = "square", vol = 0.05, delay = 0) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    key() { this.tone(1200, 0.03, "square", 0.02); },
    ok() { [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.12, "triangle", 0.06, i * 0.07)); },
    bad() { this.tone(140, 0.25, "sawtooth", 0.07); this.tone(110, 0.3, "sawtooth", 0.06, 0.12); },
    tool() { this.tone(880, 0.08, "sine", 0.06); this.tone(1320, 0.1, "sine", 0.05, 0.08); },
    ach() { [784, 988, 1175, 1568].forEach((f, i) => this.tone(f, 0.16, "triangle", 0.06, i * 0.09)); },
    alarm() { this.tone(880, 0.12, "square", 0.04); this.tone(660, 0.12, "square", 0.04, 0.14); },
    glitch() { for (let i = 0; i < 6; i++) this.tone(200 + Math.random() * 1800, 0.04, "square", 0.04, i * 0.04); },
    win() { [392, 523, 659, 784, 1046, 1318].forEach((f, i) => this.tone(f, 0.22, "triangle", 0.07, i * 0.12)); },
    lose() { [600, 450, 320, 200, 120].forEach((f, i) => this.tone(f, 0.3, "sawtooth", 0.06, i * 0.18)); },
  };

  /* ---------------------------------------------------------
     5. Montagem do tabuleiro (estrutura fixa)
     --------------------------------------------------------- */
  // grid[r][c] = null (casa preta) ou { answer, words: {H, V}, num, input, wrap }
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  WORDS.forEach((w, i) => {
    w.index = i;
    w.cells = [];
    for (let k = 0; k < w.answer.length; k++) {
      const r = w.dir === "V" ? w.row + k : w.row;
      const c = w.dir === "H" ? w.col + k : w.col;
      if (!grid[r][c]) grid[r][c] = { r, c, answer: w.answer[k], words: {}, num: null };
      const cell = grid[r][c];
      if (cell.answer !== w.answer[k]) throw new Error("Cruzamento inválido em " + w.answer);
      cell.words[w.dir] = i;
      w.cells.push(cell);
    }
  });

  // Numeração padrão de cruzadinha: da esquerda para a direita, de cima para baixo
  let n = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      if (!cell) continue;
      const starts = WORDS.filter((w) => w.row === r && w.col === c);
      if (starts.length) {
        n++;
        cell.num = n;
        starts.forEach((w) => (w.num = n));
      }
    }
  }
  const BY_ANSWER = Object.fromEntries(WORDS.map((w) => [w.answer, w]));
  const ORDERED = [...WORDS].sort((a, b) => (a.dir === b.dir ? a.num - b.num : a.dir === "H" ? -1 : 1));

  function buildBoard() {
    el.board.style.setProperty("--cols", COLS);
    const frag = document.createDocumentFragment();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = grid[r][c];
        const div = document.createElement("div");
        div.className = "cell";
        if (!cell) {
          div.classList.add("block");
        } else {
          const input = document.createElement("input");
          input.type = "text";
          input.maxLength = 2;
          input.autocomplete = "off";
          input.spellcheck = false;
          input.setAttribute("autocapitalize", "characters");
          input.setAttribute("aria-label", `Linha ${r + 1}, coluna ${c + 1}`);
          input.dataset.r = r;
          input.dataset.c = c;
          div.appendChild(input);
          if (cell.num) {
            const s = document.createElement("span");
            s.className = "num";
            s.textContent = cell.num;
            div.appendChild(s);
          }
          cell.input = input;
          cell.wrap = div;
        }
        frag.appendChild(div);
      }
    }
    el.board.appendChild(frag);
  }

  function buildClues() {
    for (const w of ORDERED) {
      const li = document.createElement("li");
      li.dataset.index = w.index;
      li.innerHTML = `<span class="clue-n">${w.num}</span>
        <span class="clue-text">${w.clue} <span class="clue-len">(${w.answer.length})</span></span>
        <span class="clue-state"></span>`;
      li.addEventListener("click", () => {
        const first = w.cells.find((c) => !c.value) || w.cells[0];
        select(first.r, first.c, w.dir);
        focusSelected();
      });
      (w.dir === "H" ? el.cluesH : el.cluesV).appendChild(li);
      w.li = li;
    }
  }

  function buildAchievements() {
    const got = store.get(KEY_ACH, []);
    el.achList.innerHTML = "";
    for (const a of ACHIEVEMENTS) {
      const li = document.createElement("li");
      li.className = "ach" + (got.includes(a.id) ? " unlocked" : "");
      li.id = "ach-" + a.id;
      li.innerHTML = `<span class="ach-icon">${a.icon}</span><div><strong>${a.name}</strong><span>${a.desc}</span></div>`;
      el.achList.appendChild(li);
    }
    el.achCount.textContent = `${got.length}/${ACHIEVEMENTS.length}`;
  }

  /* ---------------------------------------------------------
     6. Estado da partida
     --------------------------------------------------------- */
  let S = null; // estado atual
  let sel = { r: -1, c: -1, dir: "H" };
  let selectedMode = "engenheiro";

  function freshState(mode) {
    const cfg = MODES[mode];
    return {
      mode, cfg,
      running: false, paused: false, over: false,
      temp: START_TEMP, maxTemp: START_TEMP,
      cycles: cfg.startCycles, score: 0, combo: 0, maxCombo: 0,
      elapsed: 0, lastTick: 0, nextGlitch: cfg.glitchEvery, glitchWarned: false,
      locked: new Set(), revealedWords: new Set(),
      revealedCells: new Set(), // "r,c"
      toolsUsed: 0, wrongTotal: 0, checks: 0, lastAlarm: 0,
    };
  }

  function newGame(mode) {
    S = freshState(mode);
    for (const row of grid) for (const cell of row) {
      if (!cell) continue;
      cell.value = "";
      cell.input.value = "";
      cell.input.readOnly = false;
      cell.wrap.className = "cell";
    }
    for (const w of WORDS) w.li.className = "";
    $$("#schematic .comp").forEach((g) => g.classList.remove("on", "revealed", "flash"));
    $$("#schematic .lbl").forEach((t) => (t.textContent = "???"));
    $(".wires").classList.remove("live");
    el.manualTitle.textContent = "MANUAL TÉCNICO";
    el.manualText.innerHTML = "Nenhum componente restaurado ainda. Resolva palavras e use o botão <strong>Conferir</strong> para religar a máquina.";
    el.log.innerHTML = "";
    document.body.classList.remove("paused", "warm", "hot");

    log(`Modo ${S.cfg.label} carregado. ${WORDS.length} componentes sem identificação.`, "info");
    if (S.cfg.tempRate) log(`A CPU aquece ${S.cfg.tempRate.toFixed(2)} °C/s. Cada acerto resfria; cada erro esquenta.`, "warn");
    else log("Temperatura desativada neste modo. Aproveite para estudar com calma.", "info");
    if (S.cfg.glitchEvery) log(`Instabilidade detectada: bit flips a cada ~${S.cfg.glitchEvery}s.`, "bad");

    updateTools();
    updateHUD();
    S.running = true;
    S.lastTick = performance.now();

    const first = BY_ANSWER.MEMORIADEMASSA.cells[0];
    select(first.r, first.c, "H");
    focusSelected();
  }

  /* ---------------------------------------------------------
     7. Seleção e destaque
     --------------------------------------------------------- */
  const cellAt = (r, c) => (r >= 0 && r < ROWS && c >= 0 && c < COLS ? grid[r][c] : null);
  // casa travada: pertence a palavra confirmada ou foi revelada pela Sonda
  const isLocked = (cell) => !!S && (Object.values(cell.words).some((i) => S.locked.has(i)) || S.revealedCells.has(cell.r + "," + cell.c));

  function currentWord() {
    const cell = cellAt(sel.r, sel.c);
    if (!cell) return null;
    const i = cell.words[sel.dir] ?? cell.words[sel.dir === "H" ? "V" : "H"];
    return WORDS[i];
  }

  function select(r, c, dir) {
    const cell = cellAt(r, c);
    if (!cell) return;
    let d = dir || sel.dir;
    if (cell.words[d] === undefined) d = d === "H" ? "V" : "H";
    sel = { r, c, dir: d };
    paintSelection();
  }

  function paintSelection() {
    $$(".cell.in-word, .cell.active").forEach((d) => d.classList.remove("in-word", "active"));
    $$(".clue-list li.current").forEach((li) => li.classList.remove("current"));
    const w = currentWord();
    if (!w) return;
    w.cells.forEach((c) => c.wrap.classList.add("in-word"));
    grid[sel.r][sel.c].wrap.classList.add("active");
    w.li.classList.add("current");
    // rola só a lista de pistas (quando ela tem rolagem própria), nunca a página
    const box = w.li.closest(".tab-page");
    if (box && box.scrollHeight > box.clientHeight + 4) {
      const top = w.li.offsetTop - box.offsetTop;
      if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - 40) box.scrollTop = top - 60;
    }
    el.clueBarTag.textContent = `${w.num} ${w.dir === "H" ? "HORIZONTAL" : "VERTICAL"}`;
    el.clueBarText.textContent = `${w.clue} (${w.answer.length} letras)`;
  }

  function focusSelected() {
    const cell = cellAt(sel.r, sel.c);
    if (cell) cell.input.focus({ preventScroll: false });
  }

  /* ---------------------------------------------------------
     8. Digitação
     --------------------------------------------------------- */
  const normalize = (ch) => ch.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");

  function setLetter(cell, ch) {
    cell.value = ch;
    cell.input.value = ch;
    // qualquer edição apaga a marcação de erro das palavras daquela casa
    Object.values(cell.words).forEach((i) => {
      WORDS[i].cells.forEach((c) => c.wrap.classList.remove("bad", "partial"));
      WORDS[i].li.classList.remove("bad", "partial");
      WORDS[i].li.querySelector(".clue-state").textContent = S.locked.has(i) ? WORDS[i].li.querySelector(".clue-state").textContent : "";
    });
  }

  function canPlay() { return S && S.running && !S.paused && !S.over && !anyModalOpen(); }

  function typeLetter(ch) {
    if (!canPlay()) return;
    const cell = cellAt(sel.r, sel.c);
    if (!cell) return;
    if (!isLocked(cell)) {
      setLetter(cell, ch);
      cell.wrap.classList.remove("pop"); void cell.wrap.offsetWidth; cell.wrap.classList.add("pop");
      sound.key();
    }
    // passa pelas casas travadas sem pular: quem digita a palavra inteira continua alinhado
    advance(1, false);
  }

  // anda dentro da palavra atual (opcionalmente pulando casas travadas)
  function advance(step, skipLocked = true) {
    const w = currentWord();
    if (!w) return;
    let k = w.cells.findIndex((c) => c.r === sel.r && c.c === sel.c) + step;
    while (skipLocked && k >= 0 && k < w.cells.length && isLocked(w.cells[k])) k += step;
    if (k >= 0 && k < w.cells.length) {
      select(w.cells[k].r, w.cells[k].c, w.dir);
      focusSelected();
    }
  }

  function backspace() {
    if (!canPlay()) return;
    const cell = cellAt(sel.r, sel.c);
    if (cell.value && !isLocked(cell)) { setLetter(cell, ""); return; }
    const w = currentWord();
    let k = w.cells.findIndex((c) => c.r === sel.r && c.c === sel.c) - 1;
    while (k >= 0 && isLocked(w.cells[k])) k--;
    if (k >= 0) {
      setLetter(w.cells[k], "");
      select(w.cells[k].r, w.cells[k].c, w.dir);
      focusSelected();
    }
  }

  function moveArrow(dr, dc) {
    const axis = dr ? "V" : "H";
    const here = cellAt(sel.r, sel.c);
    if (here && sel.dir !== axis && here.words[axis] !== undefined) {
      select(sel.r, sel.c, axis);
      return;
    }
    let r = sel.r + dr, c = sel.c + dc;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      if (grid[r][c]) { select(r, c, axis); focusSelected(); return; }
      r += dr; c += dc;
    }
  }

  function jumpWord(step) {
    const w = currentWord();
    let i = ORDERED.indexOf(w);
    for (let t = 0; t < ORDERED.length; t++) {
      i = (i + step + ORDERED.length) % ORDERED.length;
      if (!S.locked.has(ORDERED[i].index)) break;
    }
    const nw = ORDERED[i];
    const first = nw.cells.find((c) => !c.value && !isLocked(c)) || nw.cells[0];
    select(first.r, first.c, nw.dir);
    focusSelected();
  }

  function bindBoard() {
    let pressedSame = false;

    el.board.addEventListener("pointerdown", (e) => {
      const inp = e.target.closest("input");
      if (!inp) return;
      sound.ensure();
      pressedSame = +inp.dataset.r === sel.r && +inp.dataset.c === sel.c;
    });
    el.board.addEventListener("click", (e) => {
      const inp = e.target.closest("input");
      if (!inp) return;
      if (pressedSame) select(sel.r, sel.c, sel.dir === "H" ? "V" : "H");
      pressedSame = false;
    });
    el.board.addEventListener("focusin", (e) => {
      const inp = e.target.closest("input");
      if (!inp) return;
      const r = +inp.dataset.r, c = +inp.dataset.c;
      if (r !== sel.r || c !== sel.c) select(r, c, sel.dir);
    });

    el.board.addEventListener("keydown", (e) => {
      if (!e.target.matches("input")) return;
      sound.ensure();
      const k = e.key;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (k.length === 1 && normalize(k)) { e.preventDefault(); typeLetter(normalize(k)); return; }
      switch (k) {
        case "Backspace": e.preventDefault(); backspace(); break;
        case "Delete": e.preventDefault(); { const c = cellAt(sel.r, sel.c); if (canPlay() && !isLocked(c)) setLetter(c, ""); } break;
        case "ArrowLeft": e.preventDefault(); moveArrow(0, -1); break;
        case "ArrowRight": e.preventDefault(); moveArrow(0, 1); break;
        case "ArrowUp": e.preventDefault(); moveArrow(-1, 0); break;
        case "ArrowDown": e.preventDefault(); moveArrow(1, 0); break;
        case "Tab": e.preventDefault(); jumpWord(e.shiftKey ? -1 : 1); break;
        case " ": e.preventDefault(); select(sel.r, sel.c, sel.dir === "H" ? "V" : "H"); break;
        case "Enter": e.preventDefault(); checkAll(); break;
        default:
          if (k.length === 1) e.preventDefault(); // bloqueia números e símbolos
      }
    });

    // Teclados de celular nem sempre mandam a tecla no keydown: tratamos pelo "input"
    el.board.addEventListener("input", (e) => {
      const inp = e.target;
      const r = +inp.dataset.r, c = +inp.dataset.c;
      const cell = grid[r][c];
      const typed = normalize(inp.value).replace(cell.value, "").slice(-1) || normalize(inp.value).slice(-1);
      inp.value = cell.value; // estado manda no valor exibido
      if (typed) { select(r, c, sel.dir); typeLetter(typed); }
      else if (!inp.value && cell.value) backspace();
    });
  }

  /* ---------------------------------------------------------
     9. Conferência e confirmação de palavras
     --------------------------------------------------------- */
  const wordValue = (w) => w.cells.map((c) => c.value || "").join("");
  const wordFilled = (w) => w.cells.every((c) => c.value);
  const comboMult = () => Math.min(3, 1 + S.combo * 0.25);

  function checkAll() {
    if (!canPlay()) return;
    S.checks++;
    const right = [], wrong = [], partial = [];
    const open = WORDS.filter((w) => !S.locked.has(w.index));
    open.forEach((w) => { if (wordFilled(w) && wordValue(w) === w.answer) right.push(w); });
    const rightSet = new Set(right.map((w) => w.index));
    // casa "própria" = digitada pelo jogador, não herdada de uma palavra certa
    const own = (c) => c.value && !isLocked(c) && !Object.values(c.words).some((i) => rightSet.has(i));
    for (const w of open) {
      if (rightSet.has(w.index) || !w.cells.some(own)) continue;
      (wordFilled(w) ? wrong : partial).push(w);
    }

    if (!right.length && !wrong.length && !partial.length) {
      log("Nada novo para conferir. Preencha uma palavra primeiro.", "info");
      return;
    }

    const tag = (w) => `${w.num}${w.dir}`;
    let msg = `CONFERIR #${S.checks}: `;
    msg += right.length ? `✔ certas: ${right.map(tag).join(", ")}` : "✔ certas: nenhuma";
    msg += wrong.length ? ` | ✘ erradas: ${wrong.map(tag).join(", ")}` : "";
    msg += partial.length ? ` | … incompletas: ${partial.map(tag).join(", ")}` : "";
    log(msg, wrong.length ? "bad" : "ok");

    // Acertos: travam e pontuam com o combo atual
    right.forEach((w) => {
      lockWord(w, "check");
      if (!wrong.length) { S.combo++; S.maxCombo = Math.max(S.maxCombo, S.combo); }
    });

    // Erros: marcam em vermelho e esquentam a CPU
    wrong.forEach((w) => {
      w.cells.forEach((c) => { if (!isLocked(c)) c.wrap.classList.add("bad"); });
      w.li.classList.add("bad");
      w.li.querySelector(".clue-state").textContent = "✘";
    });
    partial.forEach((w) => {
      w.cells.forEach((c) => { if (!isLocked(c)) c.wrap.classList.add("partial"); });
      w.li.classList.add("partial");
      w.li.querySelector(".clue-state").textContent = "…";
    });


    if (wrong.length) {
      S.wrongTotal += wrong.length;
      if (S.combo) log(`Combo perdido (x${comboMult().toFixed(2)} → x1.00).`, "warn");
      S.combo = 0;
      if (S.cfg.wrongHeat) {
        heat(S.cfg.wrongHeat * wrong.length);
        log(`Curto-circuito! +${S.cfg.wrongHeat * wrong.length} °C`, "bad");
      }
      sound.bad();
      el.board.classList.remove("shake"); void el.board.offsetWidth; el.board.classList.add("shake");
    } else if (right.length) {
      sound.ok();
      if (S.combo >= 2) log(`Combo x${comboMult().toFixed(2)}!`, "ok");
    }
    if (S.combo >= 5) unlock("combo5");
    updateHUD();
    checkWin();
  }

  function lockWord(w, how) {
    if (S.locked.has(w.index)) return;
    S.locked.add(w.index);

    w.cells.forEach((c) => {
      c.value = c.answer;
      c.input.value = c.answer;
      c.input.readOnly = true;
      c.wrap.classList.remove("bad", "partial");
      c.wrap.classList.add(how === "decode" ? "revealed" : "ok");
    });
    w.li.classList.remove("bad", "partial");
    w.li.classList.add(how === "decode" ? "revealed" : "ok");
    w.li.querySelector(".clue-state").textContent = how === "decode" ? "◆" : "✔";

    // pontuação
    if (how === "decode") {
      S.revealedWords.add(w.index);
      log(`${w.num}${w.dir} decodificada à força: ${w.answer} (0 pontos).`, "tool");
    } else {
      const hinted = w.cells.filter((c) => S.revealedCells.has(c.r + "," + c.c)).length;
      const factor = Math.max(0.2, 1 - hinted * 0.15);
      const pts = Math.round(w.answer.length * 100 * comboMult() * S.cfg.scoreMult * factor);
      const cyc = 10 + w.answer.length * 4;
      S.score += pts;
      S.cycles += cyc;
      const cool = Math.round(4 + w.answer.length * 0.5);
      if (S.cfg.tempRate) cool && heat(-cool);
      log(`${w.num}${w.dir} ${w.answer} restaurado: +${pts} pts, +${cyc} ciclos${S.cfg.tempRate ? `, −${cool} °C` : ""}.`, "ok");
      bump("score"); bump("cycles");
    }

    // esquema da placa
    const g = $(`#schematic .comp[data-word="${w.answer}"]`);
    if (g) {
      g.classList.add("on");
      if (how === "decode") g.classList.add("revealed");
      const lbl = g.querySelector(".lbl");
      lbl.textContent = lbl.dataset.name;
      g.classList.remove("flash"); void g.getBoundingClientRect(); g.classList.add("flash");
      if (S.locked.size >= 3) $(".wires").classList.add("live");
    }
    showManual(w);

    // conquistas de grupo
    unlock("boot");
    for (const [id, list] of Object.entries(GROUPS)) {
      if (list.every((a) => S.locked.has(BY_ANSWER[a].index))) unlock(id);
    }
    if (w.answer === "MICROCONTROLADOR") unlock("embarcado");

    // se a seleção estava numa palavra travada, pula para a próxima
    const cw = currentWord();
    if (cw && S.locked.has(cw.index) && S.locked.size < WORDS.length) {
      const other = grid[sel.r][sel.c].words[sel.dir === "H" ? "V" : "H"];
      if (other !== undefined && !S.locked.has(other)) select(sel.r, sel.c, sel.dir === "H" ? "V" : "H");
      else paintSelection();
    }
    updateHUD();
  }

  function showManual(w) {
    el.manualTitle.textContent = `MANUAL · ${w.name.toUpperCase()}`;
    el.manualText.textContent = w.info;
  }

  function checkWin() {
    if (S.locked.size === WORDS.length && !S.over) setTimeout(win, 600);
  }

  /* ---------------------------------------------------------
     10. Ferramentas (power-ups)
     --------------------------------------------------------- */
  const cost = (tool) => Math.round(TOOL_BASE[tool] * S.cfg.costMult);

  function updateTools() {
    if (!S) return;
    const set = (id, tool, enabled, why) => {
      const b = $(id);
      const c = $(id.replace("tool", "cost"));
      b.disabled = !enabled || S.cycles < cost(tool);
      c.textContent = enabled ? `${cost(tool)} ciclos` : why;
    };
    set("#toolProbe", "probe", true);
    set("#toolDiag", "diag", true);
    set("#toolCool", "cool", S.cfg.cooler, "indisponível neste modo");
    set("#toolDecode", "decode", S.cfg.decode, "bloqueado no Overclock");
  }

  function pay(tool) {
    const c = cost(tool);
    if (S.cycles < c) { log("Ciclos insuficientes.", "warn"); return false; }
    S.cycles -= c;
    S.toolsUsed++;
    sound.tool();
    return true;
  }

  function useTool(tool) {
    if (!canPlay()) return;
    const cell = cellAt(sel.r, sel.c);
    const w = currentWord();
    if (!w && tool !== "cool") { log("Selecione uma casa primeiro.", "warn"); return; }

    if (tool === "probe") {
      if (isLocked(cell)) { log("Essa casa já está confirmada.", "info"); return; }
      if (!pay("probe")) return;
      setLetter(cell, cell.answer);
      cell.wrap.classList.add("revealed");
      S.revealedCells.add(cell.r + "," + cell.c);
      log(`Sonda: a casa (${cell.r + 1},${cell.c + 1}) é “${cell.answer}”. A palavra vale 15% menos.`, "tool");
      advance(1);
    }

    if (tool === "diag") {
      if (S.locked.has(w.index)) { log("Essa palavra já está confirmada.", "info"); return; }
      if (!wordFilled(w)) { log(`Diagnóstico precisa da palavra ${w.num}${w.dir} completa.`, "warn"); return; }
      if (!pay("diag")) return;
      if (wordValue(w) === w.answer) {
        log(`Diagnóstico de ${w.num}${w.dir}: correta.`, "tool");
        lockWord(w, "diag");
        sound.ok();
        checkWin();
      } else {
        w.cells.forEach((c) => { if (!isLocked(c)) c.wrap.classList.add("bad"); });
        w.li.classList.add("bad");
        w.li.querySelector(".clue-state").textContent = "✘";
        log(`Diagnóstico de ${w.num}${w.dir}: errada (sem aquecer a CPU).`, "tool");
      }
    }

    if (tool === "cool") {
      if (!S.cfg.cooler) return;
      if (S.temp <= START_TEMP + 1) { log("A CPU já está fria.", "info"); return; }
      if (!pay("cool")) return;
      heat(-20);
      log("Cooler ligado no máximo: −20 °C.", "tool");
    }

    if (tool === "decode") {
      if (!S.cfg.decode) return;
      if (S.locked.has(w.index)) { log("Essa palavra já está confirmada.", "info"); return; }
      if (!pay("decode")) return;
      lockWord(w, "decode");
      checkWin();
    }
    updateHUD();
  }

  /* ---------------------------------------------------------
     11. Temperatura, relógio e bit flips
     --------------------------------------------------------- */
  function heat(delta) {
    if (!S.cfg.tempRate && delta > 0) return;
    S.temp = Math.max(START_TEMP, Math.min(100, S.temp + delta));
    S.maxTemp = Math.max(S.maxTemp, S.temp);
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (!S || !S.running || S.over) return;
    const dt = Math.min(0.5, (now - S.lastTick) / 1000);
    S.lastTick = now;
    if (S.paused || anyModalOpen()) return;

    S.elapsed += dt;
    if (S.cfg.tempRate) {
      heat(S.cfg.tempRate * dt);
      if (S.temp >= 85 && S.elapsed - S.lastAlarm > 2.5) {
        S.lastAlarm = S.elapsed;
        sound.alarm();
        if (S.temp < 86 || Math.random() < 0.15) log(`ALERTA: ${Math.round(S.temp)} °C. Risco de desligamento térmico!`, "bad");
      }
      if (S.temp >= 100) { shutdown(); return; }
    }

    if (S.cfg.glitchEvery) {
      if (!S.glitchWarned && S.elapsed >= S.nextGlitch - 5) {
        S.glitchWarned = true;
        log("Oscilação de tensão detectada... bit flip em 5 s.", "warn");
      }
      if (S.elapsed >= S.nextGlitch) {
        bitFlip();
        S.nextGlitch += S.cfg.glitchEvery;
        S.glitchWarned = false;
      }
    }
    updateHUD(true);
  }

  function bitFlip() {
    const victims = [];
    for (const row of grid) for (const c of row) if (c && c.value && !isLocked(c)) victims.push(c);
    sound.glitch();
    if (!victims.length) { log("Bit flip atingiu casas vazias. Sem estrago.", "info"); return; }
    const v = victims[Math.floor(Math.random() * victims.length)];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".replace(v.value, "");
    const bad = letters[Math.floor(Math.random() * letters.length)];
    setLetter(v, bad);
    S.revealedCells.delete(v.r + "," + v.c);
    v.wrap.classList.remove("revealed", "flip"); void v.wrap.offsetWidth; v.wrap.classList.add("flip");
    const w = WORDS[v.words.H ?? v.words.V];
    log(`BIT FLIP! Uma letra da palavra ${w.num}${w.dir} foi corrompida.`, "bad");
  }

  /* ---------------------------------------------------------
     12. HUD
     --------------------------------------------------------- */
  const fmtTime = (s) => {
    s = Math.floor(s);
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  };

  function updateHUD(fromTick) {
    if (!S) return;
    const t = S.temp;
    const pct = (t - START_TEMP) / (100 - START_TEMP);
    el.temp.textContent = S.cfg.tempRate ? `${Math.round(t)} °C` : "OFF";
    el.thermo.style.width = (S.cfg.tempRate ? Math.max(2, pct * 100) : 0) + "%";
    el.thermo.style.backgroundPosition = `${-pct * 200}px 0`;
    document.documentElement.style.setProperty("--heat", S.cfg.tempRate ? pct.toFixed(3) : 0);
    document.body.classList.toggle("warm", S.cfg.tempRate > 0 && t >= 70 && t < 85);
    document.body.classList.toggle("hot", S.cfg.tempRate > 0 && t >= 85);
    el.fan.style.animationDuration = (1.6 - (S.cfg.tempRate ? pct : 0) * 1.4).toFixed(1) + "s";
    el.clock.textContent = fmtTime(S.elapsed);
    if (fromTick) return;
    el.counter.textContent = `${S.locked.size} de ${WORDS.length} palavras`;
    el.cycles.textContent = S.cycles;
    el.score.textContent = S.score.toLocaleString("pt-BR");
    el.combo.textContent = "x" + comboMult().toFixed(2);
    updateTools();
  }

  function bump(id) {
    const node = el[id] && el[id].closest(".stat");
    if (!node) return;
    node.classList.remove("bump"); void node.offsetWidth; node.classList.add("bump");
  }

  function log(text, kind = "info") {
    const li = document.createElement("li");
    li.className = "log-" + kind;
    li.textContent = `[${fmtTime(S ? S.elapsed : 0)}] ${text}`;
    el.log.appendChild(li);
    while (el.log.children.length > 80) el.log.firstChild.remove();
    el.log.scrollTop = el.log.scrollHeight;
  }

  function toast(title, text) {
    const div = document.createElement("div");
    div.className = "toast";
    div.innerHTML = `<b>${title}</b>${text}`;
    el.toasts.appendChild(div);
    while (el.toasts.children.length > 3) el.toasts.firstChild.remove();
    setTimeout(() => div.remove(), 4200);
  }

  /* ---------------------------------------------------------
     13. Conquistas
     --------------------------------------------------------- */
  function unlock(id) {
    const got = store.get(KEY_ACH, []);
    if (got.includes(id)) return;
    got.push(id);
    store.set(KEY_ACH, got);
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    const li = $("#ach-" + id);
    if (li) { li.classList.add("unlocked", "new"); }
    el.achCount.textContent = `${got.length}/${ACHIEVEMENTS.length}`;
    toast("CONQUISTA DESBLOQUEADA", `${a.icon} ${a.name}`);
    if (S) log(`Conquista: ${a.name}.`, "warn");
    sound.ach();
  }

  /* ---------------------------------------------------------
     14. Fim de jogo
     --------------------------------------------------------- */
  let lastResult = null;

  function typeLines(pre, lines, done) {
    pre.textContent = "";
    let i = 0;
    const step = () => {
      if (i >= lines.length) { done && done(); return; }
      pre.textContent += lines[i++] + "\n";
      pre.scrollTop = pre.scrollHeight;
      setTimeout(step, 140);
    };
    step();
  }

  function win() {
    if (S.over) return;
    S.over = true;
    S.running = false;
    document.body.classList.remove("hot", "warm");
    sound.win();

    const m = S.cfg.scoreMult;
    const timeBonus = Math.max(0, Math.round((900 - S.elapsed) * 4 * m));
    const coolBonus = S.cfg.tempRate ? Math.round((100 - S.maxTemp) * 15 * m) : 0;
    const pureBonus = S.toolsUsed === 0 ? Math.round(1500 * m) : 0;
    const perfectBonus = S.wrongTotal === 0 ? Math.round(1000 * m) : 0;
    const total = S.score + timeBonus + coolBonus + pureBonus + perfectBonus;

    if (S.toolsUsed === 0) unlock("puro");
    if (S.wrongTotal === 0) unlock("perfeito");
    if (S.cfg.tempRate && S.maxTemp < 60) unlock("frio");
    if (S.maxTemp >= 90) unlock("limite");
    if (S.elapsed < 300) unlock("speed");
    if (S.mode === "overclock") unlock("overclocker");

    lastResult = { score: total, mode: S.mode, time: S.elapsed, saved: false };

    const pre = $("#bootLog");
    pre.classList.remove("fail");
    $("#endTitle").textContent = "SISTEMA RESTAURADO";
    $("#endTitle").style.color = "";
    $("#saveForm").style.display = "";
    $("#endStats").innerHTML = "";
    openModal("modalEnd");
    typeLines(pre, [
      "POST... ok",
      "CPU: ULA ok · UC ok · registradores ok",
      "Cache L1/L2/L3 ................ ok",
      "RAM ............................ ok",
      "ROM / EEPROM / Flash ........... ok",
      "Address bus · Data bus · DMA ... ok",
      "Núcleos detectados: 2 + 4 ...... ok",
      "Memória de massa montada ....... ok",
      "Microcontrolador sincronizado .. ok",
      `Temperatura máxima registrada: ${Math.round(S.maxTemp)} °C`,
      "BOOT CONCLUÍDO. Bem-vindo de volta.",
    ], () => {
      $("#endStats").innerHTML = [
        ["Modo", S.cfg.label], ["Tempo", fmtTime(S.elapsed)], ["Combo máximo", S.maxCombo],
        ["Pontos das palavras", S.score.toLocaleString("pt-BR")],
        ["Bônus de tempo", "+" + timeBonus.toLocaleString("pt-BR")],
        ["Bônus de refrigeração", "+" + coolBonus.toLocaleString("pt-BR")],
        ["Sem ferramentas", "+" + pureBonus.toLocaleString("pt-BR")],
        ["Zero erros", "+" + perfectBonus.toLocaleString("pt-BR")],
        ["Palavras decodificadas", S.revealedWords.size],
      ].map(([k, v]) => `<div class="end-item"><span>${k}</span><strong>${v}</strong></div>`).join("")
        + `<div class="end-item total"><span>PONTUAÇÃO FINAL</span><strong>${total.toLocaleString("pt-BR")}</strong></div>`;
      $("#playerName").focus();
    });
  }

  function shutdown() {
    if (S.over) return;
    S.over = true;
    S.running = false;
    S.temp = 100;
    updateHUD();
    sound.lose();
    lastResult = null;

    const pre = $("#bootLog");
    pre.classList.add("fail");
    $("#endTitle").textContent = "THERMAL SHUTDOWN";
    $("#endTitle").style.color = "var(--red)";
    $("#saveForm").style.display = "none";
    $("#endStats").innerHTML = "";
    openModal("modalEnd");
    const missing = WORDS.filter((w) => !S.locked.has(w.index)).map((w) => w.answer);
    typeLines(pre, [
      "!! TEMPERATURA CRÍTICA: 100 °C",
      "!! Proteção térmica acionada",
      "!! Cortando energia dos núcleos...",
      `Componentes restaurados: ${S.locked.size} de ${WORDS.length}`,
      "Sistema desligado.",
    ], () => {
      $("#endStats").innerHTML =
        `<div class="end-item"><span>Tempo</span><strong>${fmtTime(S.elapsed)}</strong></div>` +
        `<div class="end-item"><span>Acertos</span><strong>${S.locked.size} de ${WORDS.length}</strong></div>` +
        `<div class="end-item"><span>Pontos</span><strong>${S.score.toLocaleString("pt-BR")}</strong></div>` +
        `<div class="end-item total"><span>FALTARAM</span><strong style="font-size:14px">${missing.length} palavras. Tente o modo Estagiário para treinar.</strong></div>`;
    });
  }

  /* ---------------------------------------------------------
     15. Ranking
     --------------------------------------------------------- */
  function renderRanking(highlight) {
    const list = store.get(KEY_RANK, []);
    const body = $("#rankBody");
    body.innerHTML = list.length ? "" : `<tr><td colspan="5" class="muted">Nenhum resultado ainda. Vença uma partida!</td></tr>`;
    list.forEach((r, i) => {
      const tr = document.createElement("tr");
      if (highlight && r.id === highlight) tr.className = "me";
      [i + 1, r.name, MODES[r.mode] ? MODES[r.mode].label : r.mode, fmtTime(r.time), r.score.toLocaleString("pt-BR")]
        .forEach((v) => { const td = document.createElement("td"); td.textContent = v; tr.appendChild(td); });
      body.appendChild(tr);
    });
  }

  function saveResult(name) {
    if (!lastResult || lastResult.saved) return;
    const list = store.get(KEY_RANK, []);
    const id = Date.now();
    list.push({ id, name: name || "Anônimo", score: lastResult.score, mode: lastResult.mode, time: lastResult.time });
    list.sort((a, b) => b.score - a.score);
    store.set(KEY_RANK, list.slice(0, 10));
    lastResult.saved = true;
    $("#saveForm").style.display = "none";
    renderRanking(id);
    openModal("modalRanking");
  }

  /* ---------------------------------------------------------
     16. Modais, pausa e botões
     --------------------------------------------------------- */
  const anyModalOpen = () => !!document.querySelector(".modal.open");
  function openModal(id) { $("#" + id).classList.add("open"); }
  function closeModal(id) {
    $("#" + id).classList.remove("open");
    if (S && S.running && !anyModalOpen()) { S.lastTick = performance.now(); focusSelected(); }
  }

  function setPaused(p) {
    if (!S || !S.running || S.over) return;
    S.paused = p;
    S.lastTick = performance.now();
    document.body.classList.toggle("paused", p);
    $("#btnPause").textContent = p ? "▶" : "❚❚";
    if (!p) focusSelected();
  }

  function bindUI() {
    // seleção de modo
    $$(".mode").forEach((b) => b.addEventListener("click", () => {
      $$(".mode").forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedMode = b.dataset.mode;
      sound.ensure(); sound.key();
    }));
    $("#btnStart").addEventListener("click", () => { sound.ensure(); closeModal("modalStart"); newGame(selectedMode); });
    $("#btnShowRanking").addEventListener("click", () => { renderRanking(); openModal("modalRanking"); });
    $("#btnShowHelp2").addEventListener("click", () => openModal("modalHelp"));
    $("#btnHelp").addEventListener("click", () => openModal("modalHelp"));
    $$("[data-close]").forEach((b) => b.addEventListener("click", () => closeModal(b.dataset.close)));

    // obrigatórios: Conferir e Reiniciar
    $("#btnCheck").addEventListener("click", () => { sound.ensure(); checkAll(); focusSelected(); });
    $("#btnReset").addEventListener("click", () => { if (S) openModal("modalReset"); });
    $("#btnResetConfirm").addEventListener("click", () => { closeModal("modalReset"); newGame(S.mode); });
    $("#btnResetMenu").addEventListener("click", () => {
      closeModal("modalReset");
      if (S) { S.running = false; }
      openModal("modalStart");
    });

    // ferramentas
    $$(".tool").forEach((b) => b.addEventListener("click", () => { useTool(b.dataset.tool); focusSelected(); }));

    // pausa e som
    $("#btnPause").addEventListener("click", () => setPaused(!(S && S.paused)));
    $("#btnResume").addEventListener("click", () => setPaused(false));
    const soundBtn = $("#btnSound");
    soundBtn.classList.toggle("off", !sound.on);
    soundBtn.addEventListener("click", () => {
      sound.on = !sound.on;
      store.set(KEY_SOUND, sound.on);
      soundBtn.classList.toggle("off", !sound.on);
      sound.ensure(); sound.key();
    });

    // abas
    $$(".tab").forEach((t) => t.addEventListener("click", () => {
      $$(".tab").forEach((x) => x.classList.toggle("active", x === t));
      $$(".tab-page").forEach((p) => p.classList.toggle("active", p.id === "tab-" + t.dataset.tab));
    }));

    // manual ao clicar num componente aceso
    $$("#schematic .comp").forEach((g) => g.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!g.classList.contains("on")) return;
      showManual(BY_ANSWER[g.dataset.word]);
    }));

    // fim de jogo
    $("#saveForm").addEventListener("submit", (e) => {
      e.preventDefault();
      saveResult($("#playerName").value.trim().slice(0, 14));
    });
    $("#btnEndRanking").addEventListener("click", () => { renderRanking(); openModal("modalRanking"); });
    $("#btnPlayAgain").addEventListener("click", () => {
      closeModal("modalEnd");
      $$(".mode").forEach((x) => x.classList.toggle("selected", x.dataset.mode === (S ? S.mode : selectedMode)));
      openModal("modalStart");
    });

    // teclado global
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const open = $$(".modal.open").filter((m) => !["modalStart", "modalEnd"].includes(m.id));
      if (open.length) { closeModal(open[open.length - 1].id); return; }
      if (S && S.running && !anyModalOpen()) setPaused(!S.paused);
    });

    // pausa automática ao trocar de aba
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && S && S.running && !S.over && !S.paused) setPaused(true);
    });
  }

  /* ---------------------------------------------------------
     17. Início
     --------------------------------------------------------- */
  buildBoard();
  buildClues();
  buildAchievements();
  bindBoard();
  bindUI();
  requestAnimationFrame(tick);

  // Exposto só para depuração no console (window.OVERCLOCK.state())
  window.OVERCLOCK = { state: () => S, words: WORDS };
})();
