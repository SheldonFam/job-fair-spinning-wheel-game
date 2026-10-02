import type { Prize } from "../types";

export const pickPrize = (prizes: Prize[]): Prize => {
  const total = prizes.reduce((sum, prize) => sum + prize.probability, 0);
  let random = Math.random() * total;

  for (const prize of prizes) {
    random -= prize.probability;
    if (random <= 0) return prize;
  }

  return prizes[prizes.length - 1];
};
