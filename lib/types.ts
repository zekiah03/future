export type AxisKey =
  | "mind"
  | "body"
  | "relations"
  | "work"
  | "money"
  | "learning"
  | "play"
  | "expression"
  | "discovery"
  | "trust"
  | "peace"
  | "resonance"
  | "trace";

export type Axis = {
  key: AxisKey;
  label: string;
  jp: string;
  hint: string;
};

export const AXES: Axis[] = [
  { key: "mind", label: "Mind", jp: "心", hint: "気分・思考の落ち着き" },
  { key: "body", label: "Body", jp: "身体", hint: "身体の感覚と元気" },
  { key: "relations", label: "Relations", jp: "関係", hint: "人とのつながり" },
  { key: "work", label: "Work", jp: "働き", hint: "仕事・営みの流れ" },
  { key: "money", label: "Money", jp: "財", hint: "経済の手応え" },
  { key: "learning", label: "Learning", jp: "学び", hint: "知の進み具合" },
  { key: "play", label: "Play", jp: "遊び", hint: "余白と楽しさ" },
  { key: "expression", label: "Expression", jp: "表現", hint: "外に出す感覚" },
  { key: "discovery", label: "Discovery", jp: "発見", hint: "新しい出会い" },
  { key: "trust", label: "Trust", jp: "信", hint: "自分への信頼" },
  { key: "peace", label: "Peace", jp: "静", hint: "内なる静けさ" },
  { key: "resonance", label: "Resonance", jp: "響", hint: "響き合うもの" },
  { key: "trace", label: "Trace", jp: "跡", hint: "残してきた足跡" },
];

export type Horizon = "1m" | "6m" | "1y" | "3y";

export const HORIZONS: { key: Horizon; label: string; jp: string }[] = [
  { key: "1m", label: "1 month", jp: "1ヶ月後" },
  { key: "6m", label: "6 months", jp: "半年後" },
  { key: "1y", label: "1 year", jp: "1年後" },
  { key: "3y", label: "3 years", jp: "3年後" },
];

export type Mode = "expansion" | "balance" | "deepening";

export const MODES: { key: Mode; label: string; jp: string; desc: string }[] = [
  { key: "expansion", label: "Expansion", jp: "拡張", desc: "外へ広げていく流れ" },
  { key: "balance", label: "Balance", jp: "均衡", desc: "整え直していく流れ" },
  { key: "deepening", label: "Deepening", jp: "深化", desc: "内に深めていく流れ" },
];

export type ScenarioBranch = "bright" | "median" | "shadow";

export type Reading = {
  id: string;
  createdAt: number;
  axes: Record<AxisKey, number>;
  horizon: Horizon;
  mode: Mode;
  intent: string;
  result: PredictionResult;
};

export type AxisOutlook = {
  key: AxisKey;
  trend: number;
  note: string;
};

export type Scenario = {
  branch: ScenarioBranch;
  title: string;
  probability: number;
  narrative: string;
  turningPoint: string;
  oneLine: string;
};

export type PredictionResult = {
  oneSentence: string;
  scenarios: Scenario[];
  axisOutlooks: AxisOutlook[];
  signal: string;
  whisper: string;
};
