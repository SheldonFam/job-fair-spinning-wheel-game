const FULL_TURNS = 5;

export const nextRotation = (
  rotation: number,
  index: number,
  sliceAngle: number,
): number => {
  const offset = (Math.random() - 0.5) * sliceAngle * 0.6;
  const target = (360 - index * sliceAngle + offset + 360) % 360;
  const current = rotation % 360;
  const extra = (target - current + 360) % 360;

  return rotation + FULL_TURNS * 360 + extra;
};
