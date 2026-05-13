import {
  AXES,
  type AxisKey,
  type AxisOutlook,
  type Horizon,
  type Mode,
  type PredictionResult,
  type Scenario,
  type ScenarioBranch,
} from "./types";

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const horizonMul: Record<Horizon, number> = {
  "1m": 0.35,
  "6m": 0.7,
  "1y": 1,
  "3y": 1.6,
};

const modeBias: Record<Mode, { bright: number; shadow: number }> = {
  expansion: { bright: 0.08, shadow: -0.02 },
  balance: { bright: 0.0, shadow: -0.04 },
  deepening: { bright: 0.03, shadow: -0.03 },
};

const axisNotes: Record<
  AxisKey,
  { rise: string[]; flat: string[]; fall: string[] }
> = {
  mind: {
    rise: ["波が静まり、考えが澄む方へ", "判断の中心に余白が戻る", "迷いが少しずつ言葉になる"],
    flat: ["大きく動かないが、深く沈黙していく", "同じ位置で熟成していく時間", "見えないところで形が整う"],
    fall: ["疲労が表面化、整える前に削ぐ必要", "問いが多くなり、答えを急がない方が良い"],
  },
  body: {
    rise: ["呼吸が深くなり、回復の速度が上がる", "身体の声を聞ける時間が増える"],
    flat: ["維持の局面、無理せず低く保つ", "リズムは一定、変化は微細"],
    fall: ["小さな不調が信号として現れる", "休息の優先度が上がる兆し"],
  },
  relations: {
    rise: ["新しい関係が一つ、深い関係が一つ動く", "言葉にしてこなかった人と再会する"],
    flat: ["距離は変わらないが、見方が変わっていく", "近すぎず遠すぎずの位置で安定"],
    fall: ["一つの関係が静かに離れていく", "近すぎたものが適切な距離に戻る"],
  },
  work: {
    rise: ["流れが噛み合い始める局面", "小さな仕事が大きな線につながる"],
    flat: ["変化は表に出ないが、根の方で動く", "同じ仕事の見え方が変わる"],
    fall: ["やめる選択肢が見えてくる", "手放すことで初めて動き出すもの"],
  },
  money: {
    rise: ["数字以上のものが入ってくる兆し", "出入りの設計が整い始める"],
    flat: ["増減は小さいが、構造の意識が深まる", "持ち方の感覚が変化する"],
    fall: ["減らす局面、削ぎ落とすことの意味が出る", "出ていくほどに何かが残る感覚"],
  },
  learning: {
    rise: ["別領域の知が一本につながる感触", "理解の速度が静かに上がる"],
    flat: ["同じテーマを別の角度で見直す時期", "外から入れるより内で熟する"],
    fall: ["立ち止まる時期、忘却が再生になる", "焦って入れるより置いておく"],
  },
  play: {
    rise: ["余白が増える、遊びの中に発見", "何もしない時間が意味を持つ"],
    flat: ["遊びと仕事の境界が薄くなる", "日常の中の小さな遊びを見出す"],
    fall: ["遊びを忘れる局面、意識的に取り戻す", "余白の不足が他に響いてくる"],
  },
  expression: {
    rise: ["外へ出すものが形になる時期", "言葉が以前より遠くまで届く"],
    flat: ["出すより整える時期、土壌を作る", "内側で温めることに意味がある"],
    fall: ["出せないものが溜まる、内圧が上がる", "出口を一つ作ることが鍵になる"],
  },
  discovery: {
    rise: ["未知の入口が複数現れる", "予期しない出会いが線になる"],
    flat: ["既知の中に未知を見出す目が育つ", "外より内に新しさが現れる"],
    fall: ["新しさを追わない時期、既知を耕す", "刺激の手前で立ち止まる"],
  },
  trust: {
    rise: ["決断の手応えが軽くなる", "自分の感覚を信じられる場面が増える"],
    flat: ["疑いも信頼も、同じくらいの距離で抱える", "迷いを抱えたまま進むことを覚える"],
    fall: ["自分を疑う時期、誰かに頼っていい", "ゆらぐことの中に強さが育つ"],
  },
  peace: {
    rise: ["静けさが日常に戻ってくる", "外の騒がしさと距離を取れる感覚"],
    flat: ["浅い静けさだが、必要な分は保てる", "深い休息はまだだが、表面は穏やか"],
    fall: ["静けさが減る局面、意識的に確保を", "音の多さに自分が引っ張られる時期"],
  },
  resonance: {
    rise: ["響き合うものが見つかる、人・場所・本", "共鳴が次の動きを連れてくる"],
    flat: ["静かな共鳴が続いていく", "響きは小さいが、確かに残るもの"],
    fall: ["響かないものが増える、選別の時期", "響きを待つ静けさが必要"],
  },
  trace: {
    rise: ["残してきたものが意味を持ち始める", "過去の動きが今に追いついてくる"],
    flat: ["積み重ねが見えにくい局面、続けて良い", "跡は内側に深く残っている"],
    fall: ["何を残すか、選び直す時期", "過去の重さを少し降ろしていい"],
  },
};

const scenarioTemplates: Record<
  ScenarioBranch,
  { title: string; intro: (h: string) => string; turn: string[]; close: string[] }
> = {
  bright: {
    title: "Light Branch",
    intro: (h) => `${h}、いまの流れが追い風を受けたとき。`,
    turn: [
      "三週目あたりで、ひとつ「これは続けて良い」が腑に落ちる出来事",
      "誰かが見ていてくれたことを知る、その一通の連絡",
      "やめなかったことの理由が、自分以外の言葉で返ってくる瞬間",
      "予定になかった会話の中で、次の入口が一つ見える",
    ],
    close: [
      "増やすより、選び直す方が大きく効く",
      "派手な変化ではなく、深さの方向に開いていく",
      "外に出すタイミングが早すぎないこと、それだけが鍵",
    ],
  },
  median: {
    title: "Median Branch",
    intro: (h) => `${h}、今のリズムを保ったままの自然な延長線上。`,
    turn: [
      "ある朝、何でもない景色が少し違って見える日",
      "似たような問いが三度繰り返されたとき、答えが要らないと気づく",
      "やる/やらないの境界が、自分の中で静かに引き直される",
      "「もう少しこのままで」と言える落ち着きが戻ってくる",
    ],
    close: [
      "結論を急がないことが、結論より価値を持つ",
      "変化は小さいが、見方は大きく変わっていく",
      "ここでの停滞は、次の質を作っている",
    ],
  },
  shadow: {
    title: "Shadow Branch",
    intro: (h) => `${h}、いまの流れが内側で軋みを増したとき。`,
    turn: [
      "やめる/手放すという選択肢が、はっきり浮かんでくる日",
      "頑張ってきた一つが、思ったほど自分を支えていなかったと気づく瞬間",
      "断る勇気が試される会話、その直後に空く余白",
      "立ち止まりたいという声を、自分が聞き取れるかどうかの境目",
    ],
    close: [
      "戻ることは負けではなく、整え直す動き",
      "削ぐことが増やすより難しい、その難しさを引き受ける",
      "暗さの中に、次の灯りの場所が見えている",
    ],
  },
};

const whispers = [
  "未来は、いまの自分の連続。だから、いまを変えると未来も少し変わる。",
  "見える未来は、選ばれた未来。だから、別の未来も同じだけ存在する。",
  "予測は地図ではなく、コンパス。方角だけ覚えて、地形は歩いて確かめる。",
  "外れることに意味がある。外れた距離が、自分の動いた距離。",
  "ツインは未来を当てない。未来へ向かう自分の輪郭を、はっきりさせる。",
];

const intentVerbs = [
  "整える",
  "深める",
  "広げる",
  "手放す",
  "見直す",
  "重ねる",
  "結ぶ",
  "ほどく",
];

function clip(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

function avg(xs: number[]) {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function predict(
  axes: Record<AxisKey, number>,
  horizon: Horizon,
  mode: Mode,
  intent: string,
): PredictionResult {
  const seedKey =
    JSON.stringify(axes) + horizon + mode + intent.trim().toLowerCase();
  const seed = hashString(seedKey);
  const rand = mulberry32(seed);

  const baseEnergy = avg(Object.values(axes));
  const variance =
    Math.sqrt(avg(Object.values(axes).map((v) => (v - baseEnergy) ** 2))) /
    50; // 0..~1
  const tilt = horizonMul[horizon];
  const bias = modeBias[mode];

  const rawBright = clip(0.32 + (baseEnergy - 50) / 130 + bias.bright * 1.4);
  const rawShadow = clip(0.28 - (baseEnergy - 50) / 160 + Math.abs(bias.shadow) + variance * 0.2);
  const rawMedian = clip(1 - rawBright - rawShadow + 0.15);

  const sum = rawBright + rawShadow + rawMedian;
  const pBright = rawBright / sum;
  const pShadow = rawShadow / sum;
  const pMedian = rawMedian / sum;

  const horizonLabel = {
    "1m": "ひと月先",
    "6m": "半年先",
    "1y": "一年先",
    "3y": "三年先",
  }[horizon];

  function pick<T>(arr: T[]): T {
    return arr[Math.floor(rand() * arr.length)];
  }

  const scenarios: Scenario[] = (
    [
      { branch: "bright" as const, p: pBright },
      { branch: "median" as const, p: pMedian },
      { branch: "shadow" as const, p: pShadow },
    ] as { branch: ScenarioBranch; p: number }[]
  ).map(({ branch, p }) => {
    const t = scenarioTemplates[branch];
    return {
      branch,
      title: t.title,
      probability: Math.round(p * 100),
      narrative: t.intro(horizonLabel),
      turningPoint: pick(t.turn),
      oneLine: pick(t.close),
    };
  });

  const axisOutlooks: AxisOutlook[] = AXES.map(({ key }) => {
    const v = axes[key];
    const drift = (rand() - 0.5) * 8;
    const change = (v - 50) * 0.25 * tilt + drift + (bias.bright - bias.shadow) * 12;
    const trend = clip(v + change, 0, 100);
    const delta = trend - v;
    let noteSet: string[];
    if (delta > 6) noteSet = axisNotes[key].rise;
    else if (delta < -6) noteSet = axisNotes[key].fall;
    else noteSet = axisNotes[key].flat;
    return { key, trend: Math.round(trend), note: pick(noteSet) };
  });

  const verb = pick(intentVerbs);
  const dominant = [...axisOutlooks].sort((a, b) => b.trend - a.trend)[0];
  const dominantLabel =
    AXES.find((a) => a.key === dominant.key)?.jp || dominant.key;
  const oneSentence = `${horizonLabel}のあなたは、${dominantLabel}を${verb}方向にすこし傾いている。`;

  const variancePct = Math.round(variance * 100);
  const signal = `Signal · ${baseEnergy.toFixed(0)}/100 · σ ${variancePct} · ${mode}`;

  return {
    oneSentence,
    scenarios,
    axisOutlooks,
    signal,
    whisper: pick(whispers),
  };
}
