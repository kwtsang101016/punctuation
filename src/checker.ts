import type { CheckResult, InlineMark, Mark, SpanMark } from './types';

function inlineKey(m: InlineMark): string {
  return `i:${m.afterIndex}:${m.mark}`;
}

function spanKey(m: SpanMark): string {
  return `s:${m.start}:${m.end}:${m.mark}`;
}

function markKey(m: Mark): string {
  return m.kind === 'inline' ? inlineKey(m) : spanKey(m);
}

function toBag(marks: Mark[]): Map<string, Mark> {
  const bag = new Map<string, Mark>();
  for (const m of marks) {
    const key = markKey(m);
    // 同位置同符號只保留一個
    bag.set(key, m);
  }
  return bag;
}

export function checkAnswers(placed: Mark[], expected: Mark[]): CheckResult {
  const placedBag = toBag(placed);
  const expectedBag = toBag(expected);

  const missing: Mark[] = [];
  const extra: Mark[] = [];
  const wrong: Mark[] = [];

  for (const [key, mark] of expectedBag) {
    if (!placedBag.has(key)) {
      missing.push(mark);
    }
  }

  for (const [key, mark] of placedBag) {
    if (!expectedBag.has(key)) {
      // 同位置有其他標點 → 算錯；否則算多填
      const samePos =
        mark.kind === 'inline'
          ? [...expectedBag.values()].some(
              (e) => e.kind === 'inline' && e.afterIndex === mark.afterIndex,
            )
          : [...expectedBag.values()].some(
              (e) =>
                e.kind === 'span' &&
                e.start === mark.start &&
                e.end === mark.end,
            );
      if (samePos) {
        wrong.push(mark);
      } else {
        extra.push(mark);
      }
    }
  }

  const correct = missing.length === 0 && extra.length === 0 && wrong.length === 0;

  return {
    correct,
    placedCount: placedBag.size,
    expectedCount: expectedBag.size,
    missing,
    extra,
    wrong,
  };
}
