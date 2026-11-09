import { checkAnswers } from './checker';
import { EXERCISES } from './exercises';
import { getSymbol, PUNCTUATION_LIST } from './punctuation';
import type {
  CheckResult,
  InlineMark,
  InlinePunctuationId,
  Mark,
  SelectedTool,
  SpanMark,
  SpanPunctuationId,
} from './types';

interface AppState {
  exerciseIndex: number;
  placed: Mark[];
  tool: SelectedTool;
  /** 專名號選取起點 */
  spanAnchor: number | null;
  checkResult: CheckResult | null;
  showAnswer: boolean;
}

const state: AppState = {
  exerciseIndex: 0,
  placed: [],
  tool: { mode: 'inline', mark: 'comma' },
  spanAnchor: null,
  checkResult: null,
  showAnswer: false,
};

function currentExercise() {
  return EXERCISES[state.exerciseIndex];
}

function placedCount(): number {
  return state.placed.length;
}

/** 同一空隙的標點依加入順序排列（後加的永遠在右邊） */
function inlineAt(afterIndex: number): InlineMark[] {
  return state.placed.filter(
    (m): m is InlineMark => m.kind === 'inline' && m.afterIndex === afterIndex,
  );
}

function spansCovering(charIndex: number): SpanMark[] {
  return state.placed.filter(
    (m): m is SpanMark =>
      m.kind === 'span' && m.start <= charIndex && charIndex <= m.end,
  );
}

function clearFeedback(): void {
  state.checkResult = null;
  state.showAnswer = false;
}

function setExercise(index: number): void {
  state.exerciseIndex = index;
  state.placed = [];
  state.spanAnchor = null;
  clearFeedback();
  render();
}

function selectTool(tool: SelectedTool): void {
  state.tool = tool;
  state.spanAnchor = null;
  render();
}

function addInline(afterIndex: number, mark: InlinePunctuationId): void {
  const exists = state.placed.some(
    (m) => m.kind === 'inline' && m.afterIndex === afterIndex && m.mark === mark,
  );
  if (exists) return;
  state.placed.push({ kind: 'inline', afterIndex, mark });
  clearFeedback();
  render();
}

function removeInline(afterIndex: number, mark: InlinePunctuationId): void {
  state.placed = state.placed.filter(
    (m) =>
      !(m.kind === 'inline' && m.afterIndex === afterIndex && m.mark === mark),
  );
  clearFeedback();
  render();
}

function addSpan(start: number, end: number, mark: SpanPunctuationId): void {
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  // 移除重疊的同類型 span
  state.placed = state.placed.filter(
    (m) =>
      !(
        m.kind === 'span' &&
        m.mark === mark &&
        !(hi < m.start || lo > m.end)
      ),
  );
  state.placed.push({ kind: 'span', start: lo, end: hi, mark });
  state.spanAnchor = null;
  clearFeedback();
  render();
}

function removeSpanAt(charIndex: number): void {
  state.placed = state.placed.filter(
    (m) =>
      !(m.kind === 'span' && m.start <= charIndex && charIndex <= m.end),
  );
  clearFeedback();
  render();
}

function onSlotClick(afterIndex: number): void {
  if (!state.tool) return;
  if (state.tool.mode === 'erase') {
    const marks = inlineAt(afterIndex);
    if (marks.length > 0) {
      removeInline(afterIndex, marks[marks.length - 1].mark);
    }
    return;
  }
  if (state.tool.mode === 'inline') {
    addInline(afterIndex, state.tool.mark);
  }
}

function onCharClick(charIndex: number): void {
  if (!state.tool) return;

  if (state.tool.mode === 'erase') {
    removeSpanAt(charIndex);
    return;
  }

  if (state.tool.mode !== 'span') return;

  if (state.spanAnchor === null) {
    state.spanAnchor = charIndex;
    render();
    return;
  }

  addSpan(state.spanAnchor, charIndex, state.tool.mark);
}

function onCheck(): void {
  const ex = currentExercise();
  state.checkResult = checkAnswers(state.placed, ex.answer);
  state.showAnswer = false;
  render();
}

function onShowAnswer(): void {
  state.placed = structuredClone(currentExercise().answer);
  state.showAnswer = true;
  state.checkResult = checkAnswers(state.placed, currentExercise().answer);
  state.spanAnchor = null;
  render();
}

function onReset(): void {
  state.placed = [];
  state.spanAnchor = null;
  clearFeedback();
  render();
}

function onPrev(): void {
  if (state.exerciseIndex > 0) {
    setExercise(state.exerciseIndex - 1);
  }
}

function onNext(): void {
  if (state.exerciseIndex < EXERCISES.length - 1) {
    setExercise(state.exerciseIndex + 1);
  }
}

function feedbackClass(mark: Mark): string {
  if (!state.checkResult || state.showAnswer) return '';
  const { extra, wrong } = state.checkResult;
  const match = (list: Mark[]) =>
    list.some((m) => JSON.stringify(m) === JSON.stringify(mark));
  if (match(wrong) || match(extra)) return 'mark--wrong';
  return 'mark--ok';
}

function renderToolbar(root: HTMLElement): void {
  const tools = root.querySelector<HTMLElement>('#toolbar')!;
  tools.innerHTML = '';

  for (const p of PUNCTUATION_LIST) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    const active =
      state.tool &&
      ((p.kind === 'inline' &&
        state.tool.mode === 'inline' &&
        state.tool.mark === p.id) ||
        (p.kind === 'span' &&
          state.tool.mode === 'span' &&
          state.tool.mark === p.id));
    if (active) btn.classList.add('is-active');
    btn.innerHTML = `<span class="tool-symbol">${p.symbol}</span><span class="tool-name">${p.name}</span>`;
    btn.title =
      p.kind === 'span'
        ? `${p.name}：先點第一個字，再點最後一個字`
        : `${p.name}：點字與字之間的空位插入`;
    btn.addEventListener('click', () => {
      if (p.kind === 'inline') {
        selectTool({ mode: 'inline', mark: p.id as InlinePunctuationId });
      } else {
        selectTool({ mode: 'span', mark: p.id as SpanPunctuationId });
      }
    });
    tools.appendChild(btn);
  }

  const erase = document.createElement('button');
  erase.type = 'button';
  erase.className = 'tool-btn tool-btn--erase';
  if (state.tool?.mode === 'erase') erase.classList.add('is-active');
  erase.innerHTML = `<span class="tool-symbol">⌫</span><span class="tool-name">清除</span>`;
  erase.title = '清除：點標點或有底線的字來刪除';
  erase.addEventListener('click', () => selectTool({ mode: 'erase' }));
  tools.appendChild(erase);
}

function renderPassage(root: HTMLElement): void {
  const ex = currentExercise();
  const passage = root.querySelector<HTMLElement>('#passage')!;
  passage.innerHTML = '';
  passage.classList.toggle('span-mode', state.tool?.mode === 'span');
  passage.classList.toggle('erase-mode', state.tool?.mode === 'erase');

  const frag = document.createDocumentFragment();

  // 句首插槽
  frag.appendChild(makeSlot(-1));

  for (let i = 0; i < ex.text.length; i++) {
    frag.appendChild(makeChar(ex.text[i], i));
    frag.appendChild(makeSlot(i));
  }

  passage.appendChild(frag);
}

function makeSlot(afterIndex: number): HTMLElement {
  const slot = document.createElement('span');
  slot.className = 'slot';
  slot.dataset.afterIndex = String(afterIndex);

  const marks = inlineAt(afterIndex);
  if (marks.length === 0) {
    slot.classList.add('slot--empty');
  } else {
    slot.classList.add('slot--filled');
    for (const m of marks) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `placed-mark ${feedbackClass(m)}`;
      el.textContent = getSymbol(m.mark);
      el.title = '點擊移除此標點';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        removeInline(afterIndex, m.mark);
      });
      slot.appendChild(el);
    }
  }

  // 永遠保留可點擊的「再加一個」熱區，方便同一位置連續加上 ：「 等組合
  const addHit = document.createElement('button');
  addHit.type = 'button';
  addHit.className = 'slot-add';
  addHit.title = marks.length
    ? '再在此位置加上另一個標點（例如 ：「）'
    : '在此插入標點';
  addHit.setAttribute('aria-label', '插入標點');
  addHit.addEventListener('click', (e) => {
    e.stopPropagation();
    onSlotClick(afterIndex);
  });
  slot.appendChild(addHit);

  return slot;
}

function makeChar(ch: string, index: number): HTMLElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'char';
  el.textContent = ch;

  const spans = spansCovering(index);
  if (spans.some((s) => s.mark === 'properName')) {
    el.classList.add('char--proper');
  }
  if (state.spanAnchor === index) {
    el.classList.add('char--anchor');
  }

  for (const s of spans) {
    const fc = feedbackClass(s);
    if (fc) el.classList.add(fc.replace('mark', 'char'));
  }

  el.addEventListener('click', () => onCharClick(index));
  return el;
}

function renderMeta(root: HTMLElement): void {
  const ex = currentExercise();
  root.querySelector('#ex-title')!.textContent = ex.title;
  root.querySelector('#ex-diff')!.textContent = ex.difficulty;
  root.querySelector('#ex-progress')!.textContent =
    `${state.exerciseIndex + 1} / ${EXERCISES.length}`;

  const placed = placedCount();
  const total = ex.totalCount;
  const countEl = root.querySelector('#mark-count')!;
  countEl.innerHTML = `已填 <strong>${placed}</strong> / 應填 <strong>${total}</strong> 個標點符號`;
  countEl.classList.toggle('count--over', placed > total);
  countEl.classList.toggle('count--match', placed === total);

  const hint = root.querySelector('#tool-hint')!;
  if (state.tool?.mode === 'span') {
    hint.textContent = state.spanAnchor === null
      ? '專名號：先點選範圍的第一個字'
      : '再點選範圍的最後一個字';
  } else if (state.tool?.mode === 'erase') {
    hint.textContent = '清除模式：點已填標點，或點有底線的字';
  } else {
    hint.textContent =
      '點空隙插入標點；同一位置後加的會接在後面（例如先 ： 再 「 → ：「）';
  }

  const result = root.querySelector<HTMLElement>('#result')!;
  if (!state.checkResult) {
    result.hidden = true;
    result.className = 'result';
  } else if (state.checkResult.correct) {
    result.hidden = false;
    result.className = 'result result--ok';
    result.textContent = state.showAnswer
      ? '已顯示參考答案。試着自己再做一次吧！'
      : '全部正確！標點用得很好。';
  } else {
    result.hidden = false;
    result.className = 'result result--bad';
    const { missing, extra, wrong } = state.checkResult;
    const parts: string[] = [];
    if (wrong.length) parts.push(`${wrong.length} 個位置的標點不對`);
    if (missing.length) parts.push(`尚欠 ${missing.length} 個`);
    if (extra.length) parts.push(`多填了 ${extra.length} 個`);
    result.textContent = `再檢查一下：${parts.join('，')}。`;
  }

  const prev = root.querySelector<HTMLButtonElement>('#btn-prev')!;
  const next = root.querySelector<HTMLButtonElement>('#btn-next')!;
  prev.disabled = state.exerciseIndex === 0;
  next.disabled = state.exerciseIndex === EXERCISES.length - 1;
}

export function render(): void {
  const root = document.querySelector<HTMLElement>('#app');
  if (!root) return;
  renderToolbar(root);
  renderPassage(root);
  renderMeta(root);
}

export function mount(): void {
  const app = document.querySelector<HTMLElement>('#app');
  if (!app) {
    throw new Error('找不到 #app');
  }

  app.innerHTML = `
    <div class="page">
      <header class="hero">
        <p class="brand">澄澄中文</p>
        <h1>標點符號練習</h1>
        <p class="subtitle">香港小學五年級 · 在段落適當位置加上正確標點</p>
      </header>

      <nav class="ex-nav" aria-label="題目切換">
        <button type="button" id="btn-prev" class="nav-btn">上一題</button>
        <div class="ex-meta">
          <span id="ex-title"></span>
          <span class="pill" id="ex-diff"></span>
          <span class="muted" id="ex-progress"></span>
        </div>
        <button type="button" id="btn-next" class="nav-btn">下一題</button>
      </nav>

      <section class="panel instruction">
        <p>在下列段落的適當位置，加上正確的標點符號。</p>
        <p id="mark-count" class="count"></p>
        <p id="tool-hint" class="hint"></p>
      </section>

      <section class="panel toolbar-panel">
        <h2 class="panel-title">標點工具</h2>
        <div id="toolbar" class="toolbar" role="toolbar" aria-label="標點符號"></div>
      </section>

      <section class="panel passage-panel">
        <div id="passage" class="passage" lang="zh-Hant"></div>
      </section>

      <p id="result" class="result" hidden></p>

      <div class="actions">
        <button type="button" id="btn-check" class="btn btn-primary">檢查答案</button>
        <button type="button" id="btn-reset" class="btn">重設</button>
        <button type="button" id="btn-answer" class="btn btn-ghost">看參考答案</button>
      </div>

      <footer class="legend">
        <span><i class="lg lg-proper"></i>專名號（單線）</span>
        <span>書名號：《》</span>
        <span>同一空隙可連續加上多個標點</span>
      </footer>
    </div>
  `;

  app.querySelector('#btn-prev')!.addEventListener('click', onPrev);
  app.querySelector('#btn-next')!.addEventListener('click', onNext);
  app.querySelector('#btn-check')!.addEventListener('click', onCheck);
  app.querySelector('#btn-reset')!.addEventListener('click', onReset);
  app.querySelector('#btn-answer')!.addEventListener('click', onShowAnswer);

  render();
}
