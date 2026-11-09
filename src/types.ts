/** 可插入於字與字之間的標點 */
export type InlinePunctuationId =
  | 'comma'
  | 'enumeration'
  | 'period'
  | 'colon'
  | 'semicolon'
  | 'quoteOpen'
  | 'quoteClose'
  | 'dblQuoteOpen'
  | 'dblQuoteClose'
  | 'exclamation'
  | 'ellipsis'
  | 'dash'
  | 'bookOpen'
  | 'bookClose';

/** 加在字下方的標號 */
export type SpanPunctuationId = 'properName';

export type PunctuationId = InlinePunctuationId | SpanPunctuationId;

export interface PunctuationDef {
  id: PunctuationId;
  name: string;
  symbol: string;
  kind: 'inline' | 'span';
}

export interface InlineMark {
  kind: 'inline';
  /** 插在此字元之後；-1 表示插在第一個字之前 */
  afterIndex: number;
  mark: InlinePunctuationId;
}

export interface SpanMark {
  kind: 'span';
  start: number;
  end: number;
  mark: SpanPunctuationId;
}

export type Mark = InlineMark | SpanMark;

export interface Exercise {
  id: string;
  title: string;
  difficulty: '易' | '中' | '難';
  /** 不含標點的純文字 */
  text: string;
  /** 正確答案 */
  answer: Mark[];
  /** 提示：共需填上多少個標點 */
  totalCount: number;
}

export type CheckResult = {
  correct: boolean;
  placedCount: number;
  expectedCount: number;
  missing: Mark[];
  extra: Mark[];
  wrong: Mark[];
};

export type SelectedTool =
  | { mode: 'inline'; mark: InlinePunctuationId }
  | { mode: 'span'; mark: SpanPunctuationId }
  | { mode: 'erase' }
  | null;
