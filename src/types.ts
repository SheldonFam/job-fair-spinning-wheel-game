export type Lang = "en" | "ms" | "zh";

export type Tier = "grand" | "second" | "consolation";

export interface Prize {
  id: string;
  name: string;
  tier: Tier;
  quantity: number;
  probability: number;
  image: string;
}

export interface GameConfig {
  event: { title: string };
  theme: {
    gold: string;
    sliceColors: string[];
  };
  prizes: Prize[];
}
