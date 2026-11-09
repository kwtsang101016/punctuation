import type { PunctuationDef } from './types';

export const PUNCTUATION_LIST: PunctuationDef[] = [
  { id: 'comma', name: '逗號', symbol: '，', kind: 'inline' },
  { id: 'enumeration', name: '頓號', symbol: '、', kind: 'inline' },
  { id: 'period', name: '句號', symbol: '。', kind: 'inline' },
  { id: 'colon', name: '冒號', symbol: '：', kind: 'inline' },
  { id: 'semicolon', name: '分號', symbol: '；', kind: 'inline' },
  { id: 'quoteOpen', name: '開引號', symbol: '「', kind: 'inline' },
  { id: 'quoteClose', name: '關引號', symbol: '」', kind: 'inline' },
  { id: 'dblQuoteOpen', name: '雙開引號', symbol: '『', kind: 'inline' },
  { id: 'dblQuoteClose', name: '雙關引號', symbol: '』', kind: 'inline' },
  { id: 'exclamation', name: '感嘆號', symbol: '！', kind: 'inline' },
  { id: 'ellipsis', name: '省略號', symbol: '……', kind: 'inline' },
  { id: 'dash', name: '破折號', symbol: '——', kind: 'inline' },
  { id: 'bookOpen', name: '開書名號', symbol: '《', kind: 'inline' },
  { id: 'bookClose', name: '關書名號', symbol: '》', kind: 'inline' },
  { id: 'properName', name: '專名號', symbol: '＿', kind: 'span' },
];

export const PUNCTUATION_MAP = Object.fromEntries(
  PUNCTUATION_LIST.map((p) => [p.id, p]),
) as Record<string, PunctuationDef>;

export function getSymbol(id: string): string {
  return PUNCTUATION_MAP[id]?.symbol ?? '';
}
