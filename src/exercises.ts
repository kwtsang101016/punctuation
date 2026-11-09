import type { Exercise, Mark } from './types';

function ex(
  id: string,
  title: string,
  difficulty: Exercise['difficulty'],
  text: string,
  answer: Mark[],
): Exercise {
  return { id, title, difficulty, text, answer, totalCount: answer.length };
}

/**
 * 香港小五程度標點練習題
 * 同一 afterIndex 可放多個標點，例如 ：「
 * 並列詞語用頓號（、）；「還有／和」前多用逗號或不用頓號
 */
export const EXERCISES: Exercise[] = [
  // 1 在這次運動會上，郭于玲成了「大贏家」。她贏得了三面金牌。
  ex('ex1', '第一題', '易', '在這次運動會上郭于玲成了大贏家她贏得了三面金牌', [
    { kind: 'inline', afterIndex: 6, mark: 'comma' },
    { kind: 'span', start: 7, end: 9, mark: 'properName' },
    { kind: 'inline', afterIndex: 11, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 14, mark: 'quoteClose' },
    { kind: 'inline', afterIndex: 14, mark: 'period' },
    { kind: 'inline', afterIndex: 22, mark: 'period' },
  ]),

  // 2 春天來了，花兒開了，鳥兒也在枝頭歌唱。
  ex('ex2', '第二題', '易', '春天來了花兒開了鳥兒也在枝頭歌唱', [
    { kind: 'inline', afterIndex: 3, mark: 'comma' },
    { kind: 'inline', afterIndex: 7, mark: 'comma' },
    { kind: 'inline', afterIndex: 15, mark: 'period' },
  ]),

  // 3 今天天氣真好，我們一起去公園散步吧！
  ex('ex3', '第三題', '易', '今天天氣真好我們一起去公園散步吧', [
    { kind: 'inline', afterIndex: 5, mark: 'comma' },
    { kind: 'inline', afterIndex: 15, mark: 'exclamation' },
  ]),

  // 4 功課有三樣：語文、數學和常識。
  ex('ex4', '第四題', '易', '功課有三樣語文數學和常識', [
    { kind: 'inline', afterIndex: 4, mark: 'colon' },
    { kind: 'inline', afterIndex: 6, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 11, mark: 'period' },
  ]),

  // 5 媽媽微笑着說：「澄澄，你今天的功課做得真好！」
  ex('ex5', '第五題', '中', '媽媽微笑着說澄澄你今天的功課做得真好', [
    { kind: 'inline', afterIndex: 5, mark: 'colon' },
    { kind: 'inline', afterIndex: 5, mark: 'quoteOpen' },
    { kind: 'span', start: 6, end: 7, mark: 'properName' },
    { kind: 'inline', afterIndex: 7, mark: 'comma' },
    { kind: 'inline', afterIndex: 17, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 17, mark: 'quoteClose' },
  ]),

  // 6 請大家明天帶來以下物品：鉛筆簿、練習簿，還有顏色筆。
  // 並列用頓號；「還有」前用逗號
  ex('ex6', '第六題', '中', '請大家明天帶來以下物品鉛筆簿練習簿還有顏色筆', [
    { kind: 'inline', afterIndex: 10, mark: 'colon' },
    { kind: 'inline', afterIndex: 13, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 16, mark: 'comma' },
    { kind: 'inline', afterIndex: 21, mark: 'period' },
  ]),

  // 7 我喜歡語文、數學、常識和音樂。
  ex('ex7', '第七題', '易', '我喜歡語文數學常識和音樂', [
    { kind: 'inline', afterIndex: 4, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 6, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 11, mark: 'period' },
  ]),

  // 8 桌上放着書本、文具盒，還有水杯。
  ex('ex8', '第八題', '易', '桌上放着書本文具盒還有水杯', [
    { kind: 'inline', afterIndex: 5, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 8, mark: 'comma' },
    { kind: 'inline', afterIndex: 12, mark: 'period' },
  ]),

  // 9 媽媽買了蘋果、香蕉、橙子和西瓜。
  ex('ex9', '第九題', '易', '媽媽買了蘋果香蕉橙子和西瓜', [
    { kind: 'inline', afterIndex: 5, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 7, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 12, mark: 'period' },
  ]),

  // 10 運動會有跑步、跳高、跳遠等項目。
  ex('ex10', '第十題', '中', '運動會有跑步跳高跳遠等項目', [
    { kind: 'inline', afterIndex: 5, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 7, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 12, mark: 'period' },
  ]),

  // 11 弟弟跑進來說：「外面下雪了！」大家連忙走到窗邊去看。
  ex('ex11', '第十一題', '中', '弟弟跑進來說外面下雪了大家連忙走到窗邊去看', [
    { kind: 'inline', afterIndex: 5, mark: 'colon' },
    { kind: 'inline', afterIndex: 5, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 10, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 10, mark: 'quoteClose' },
    { kind: 'inline', afterIndex: 20, mark: 'period' },
  ]),

  // 12 老師興奮地說：「今天我們來認識大詩人李白！」
  ex('ex12', '第十二題', '中', '老師興奮地說今天我們來認識大詩人李白', [
    { kind: 'inline', afterIndex: 5, mark: 'colon' },
    { kind: 'inline', afterIndex: 5, mark: 'quoteOpen' },
    { kind: 'span', start: 16, end: 17, mark: 'properName' },
    { kind: 'inline', afterIndex: 17, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 17, mark: 'quoteClose' },
  ]),

  // 13 夜深了，四周靜悄悄的……只有牆上的時鐘滴答作響。
  ex('ex13', '第十三題', '中', '夜深了四周靜悄悄的只有牆上的時鐘滴答作響', [
    { kind: 'inline', afterIndex: 2, mark: 'comma' },
    { kind: 'inline', afterIndex: 8, mark: 'ellipsis' },
    { kind: 'inline', afterIndex: 19, mark: 'period' },
  ]),

  // 14 他想了想，終於開口說：「我——我不是故意的。」
  ex('ex14', '第十四題', '中', '他想了想終於開口說我我不是故意的', [
    { kind: 'inline', afterIndex: 3, mark: 'comma' },
    { kind: 'inline', afterIndex: 8, mark: 'colon' },
    { kind: 'inline', afterIndex: 8, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 9, mark: 'dash' },
    { kind: 'inline', afterIndex: 15, mark: 'period' },
    { kind: 'inline', afterIndex: 15, mark: 'quoteClose' },
  ]),

  // 15 姐姐拿出一本《西遊記》，對我說：「這本書真好看！」
  ex('ex15', '第十五題', '中', '姐姐拿出一本西遊記對我說這本書真好看', [
    { kind: 'inline', afterIndex: 5, mark: 'bookOpen' },
    { kind: 'inline', afterIndex: 8, mark: 'bookClose' },
    { kind: 'inline', afterIndex: 8, mark: 'comma' },
    { kind: 'inline', afterIndex: 11, mark: 'colon' },
    { kind: 'inline', afterIndex: 11, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 17, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 17, mark: 'quoteClose' },
  ]),

  // 16 小明高興地回答：「謝謝媽媽，我會繼續努力的。」
  ex('ex16', '第十六題', '中', '小明高興地回答謝謝媽媽我會繼續努力的', [
    { kind: 'span', start: 0, end: 1, mark: 'properName' },
    { kind: 'inline', afterIndex: 6, mark: 'colon' },
    { kind: 'inline', afterIndex: 6, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 10, mark: 'comma' },
    { kind: 'inline', afterIndex: 17, mark: 'period' },
    { kind: 'inline', afterIndex: 17, mark: 'quoteClose' },
  ]),

  // 17 老師說：「詩中『明月』一詞寫得很美。」同學們都點頭同意。
  ex('ex17', '第十七題', '難', '老師說詩中明月一詞寫得很美同學們都點頭同意', [
    { kind: 'inline', afterIndex: 2, mark: 'colon' },
    { kind: 'inline', afterIndex: 2, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 4, mark: 'dblQuoteOpen' },
    { kind: 'inline', afterIndex: 6, mark: 'dblQuoteClose' },
    { kind: 'inline', afterIndex: 12, mark: 'period' },
    { kind: 'inline', afterIndex: 12, mark: 'quoteClose' },
    { kind: 'inline', afterIndex: 20, mark: 'period' },
  ]),

  // 18 爺爺常說：「讀書，要用心；做人，要誠實。」
  ex('ex18', '第十八題', '難', '爺爺常說讀書要用心做人要誠實', [
    { kind: 'inline', afterIndex: 3, mark: 'colon' },
    { kind: 'inline', afterIndex: 3, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 5, mark: 'comma' },
    { kind: 'inline', afterIndex: 8, mark: 'semicolon' },
    { kind: 'inline', afterIndex: 10, mark: 'comma' },
    { kind: 'inline', afterIndex: 13, mark: 'period' },
    { kind: 'inline', afterIndex: 13, mark: 'quoteClose' },
  ]),

  // 19 媽媽說：「澄澄剛才回答：『我做完了！』」大家都笑了。
  ex('ex19', '第十九題', '難', '媽媽說澄澄剛才回答我做完了大家都笑了', [
    { kind: 'inline', afterIndex: 2, mark: 'colon' },
    { kind: 'inline', afterIndex: 2, mark: 'quoteOpen' },
    { kind: 'span', start: 3, end: 4, mark: 'properName' },
    { kind: 'inline', afterIndex: 8, mark: 'colon' },
    { kind: 'inline', afterIndex: 8, mark: 'dblQuoteOpen' },
    { kind: 'inline', afterIndex: 12, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 12, mark: 'dblQuoteClose' },
    { kind: 'inline', afterIndex: 12, mark: 'quoteClose' },
    { kind: 'inline', afterIndex: 17, mark: 'period' },
  ]),

  // 20 博文唸着：「莫聽穿林打葉聲，何妨吟嘯且徐行……」這是蘇軾的《定風波》。
  ex(
    'ex20',
    '第二十題',
    '難',
    '博文唸着莫聽穿林打葉聲何妨吟嘯且徐行這是蘇軾的定風波',
    [
      { kind: 'span', start: 0, end: 1, mark: 'properName' },
      { kind: 'inline', afterIndex: 3, mark: 'colon' },
      { kind: 'inline', afterIndex: 3, mark: 'quoteOpen' },
      { kind: 'inline', afterIndex: 10, mark: 'comma' },
      { kind: 'inline', afterIndex: 17, mark: 'ellipsis' },
      { kind: 'inline', afterIndex: 17, mark: 'quoteClose' },
      { kind: 'span', start: 20, end: 21, mark: 'properName' },
      { kind: 'inline', afterIndex: 22, mark: 'bookOpen' },
      { kind: 'inline', afterIndex: 25, mark: 'bookClose' },
      { kind: 'inline', afterIndex: 25, mark: 'period' },
    ],
  ),

  // 21 圖書館裏有《西遊記》、《小王子》等故事書，我最喜歡《西遊記》。
  ex('ex21', '第二十一題', '中', '圖書館裏有西遊記小王子等故事書我最喜歡西遊記', [
    { kind: 'inline', afterIndex: 4, mark: 'bookOpen' },
    { kind: 'inline', afterIndex: 7, mark: 'bookClose' },
    { kind: 'inline', afterIndex: 7, mark: 'enumeration' },
    { kind: 'inline', afterIndex: 7, mark: 'bookOpen' },
    { kind: 'inline', afterIndex: 10, mark: 'bookClose' },
    { kind: 'inline', afterIndex: 14, mark: 'comma' },
    { kind: 'inline', afterIndex: 18, mark: 'bookOpen' },
    { kind: 'inline', afterIndex: 21, mark: 'bookClose' },
    { kind: 'inline', afterIndex: 21, mark: 'period' },
  ]),

  // 22 爸爸說：「這不是詩，是詞。」哥哥卻說：「我覺得兩者都美！」
  ex('ex22', '第二十二題', '難', '爸爸說這不是詩是詞哥哥卻說我覺得兩者都美', [
    { kind: 'inline', afterIndex: 2, mark: 'colon' },
    { kind: 'inline', afterIndex: 2, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 6, mark: 'comma' },
    { kind: 'inline', afterIndex: 8, mark: 'period' },
    { kind: 'inline', afterIndex: 8, mark: 'quoteClose' },
    { kind: 'inline', afterIndex: 12, mark: 'colon' },
    { kind: 'inline', afterIndex: 12, mark: 'quoteOpen' },
    { kind: 'inline', afterIndex: 19, mark: 'exclamation' },
    { kind: 'inline', afterIndex: 19, mark: 'quoteClose' },
  ]),

  // 23 清晨，陽光灑在窗台上；午後，微風吹過樹梢。多麼美好的一天啊！
  ex('ex23', '第二十三題', '中', '清晨陽光灑在窗台上午後微風吹過樹梢多麼美好的一天啊', [
    { kind: 'inline', afterIndex: 1, mark: 'comma' },
    { kind: 'inline', afterIndex: 8, mark: 'semicolon' },
    { kind: 'inline', afterIndex: 10, mark: 'comma' },
    { kind: 'inline', afterIndex: 16, mark: 'period' },
    { kind: 'inline', afterIndex: 24, mark: 'exclamation' },
  ]),

  // 24 老師笑着說：「我們來背誦李白的《靜夜思》吧！」小明站起來，大聲背誦起來。
  ex(
    'ex24',
    '第二十四題',
    '難',
    '老師笑着說我們來背誦李白的靜夜思吧小明站起來大聲背誦起來',
    [
      { kind: 'inline', afterIndex: 4, mark: 'colon' },
      { kind: 'inline', afterIndex: 4, mark: 'quoteOpen' },
      { kind: 'span', start: 10, end: 11, mark: 'properName' },
      { kind: 'inline', afterIndex: 12, mark: 'bookOpen' },
      { kind: 'inline', afterIndex: 15, mark: 'bookClose' },
      { kind: 'inline', afterIndex: 16, mark: 'exclamation' },
      { kind: 'inline', afterIndex: 16, mark: 'quoteClose' },
      { kind: 'span', start: 17, end: 18, mark: 'properName' },
      { kind: 'inline', afterIndex: 21, mark: 'comma' },
      { kind: 'inline', afterIndex: 27, mark: 'period' },
    ],
  ),
];
